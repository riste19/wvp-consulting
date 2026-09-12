"use client";

import { useEffect, useImperativeHandle, useRef } from "react";

/**
 * Cloudflare Turnstile — the "are you a person" check on the contact form.
 *
 * Dormant unless `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set. That is deliberate:
 * the key comes from a dashboard widget that may not exist yet, and a contact
 * form that stops working because a key is missing is far worse than one
 * protected only by the honeypot. With no key this renders nothing and the
 * form behaves exactly as it did before Turnstile existed.
 *
 * NEXT_PUBLIC_* is inlined at BUILD time, not read at runtime. Adding the key
 * in the Cloudflare dashboard does nothing until the next deploy.
 */

/** Read once, at module scope: the bundler substitutes a literal here. */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Whether the form should render the widget at all. */
export const turnstileEnabled = Boolean(SITE_KEY);

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type RenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "timeout-callback": () => void;
  "error-callback": () => void;
  theme?: "light" | "dark" | "auto";
  action?: string;
};

type TurnstileApi = {
  render: (element: HTMLElement, options: RenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Shared across every mount, so React's development double-render and any
 * future second widget cannot append two copies of the script tag.
 */
let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();

  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => {
      // Let a later mount retry rather than caching the failure forever.
      scriptPromise = null;
      reject(new Error("Turnstile script failed to load"));
    });
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export type TurnstileHandle = {
  /**
   * Discard the current token and issue a new challenge.
   *
   * Tokens are single-use and expire after about five minutes, so the form
   * must call this after every attempt that actually reached the server.
   * Without it, a visitor whose first submit fails is told they are a robot
   * on their second.
   */
  reset: () => void;
};

type Props = {
  ref?: React.Ref<TurnstileHandle>;
  /** Receives the token, or null when it expires, errors or is reset. */
  onToken: (token: string | null) => void;
};

export function TurnstileWidget({ ref, onToken }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  /**
   * Held in a ref so the render effect below can keep an empty dependency
   * list. A changing callback identity in the deps would tear down and
   * re-render the widget on every keystroke in the form.
   *
   * Written in an effect rather than during render: mutating a ref while
   * rendering is unsafe under concurrent React, and the compiler rejects it.
   * Turnstile only ever calls back asynchronously, long after commit.
   */
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  });

  useImperativeHandle(ref, () => ({
    reset: () => {
      const widgetId = widgetIdRef.current;
      if (widgetId && window.turnstile) {
        window.turnstile.reset(widgetId);
        onTokenRef.current(null);
      }
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!SITE_KEY || !container) return;

    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;

        widgetIdRef.current = window.turnstile.render(container, {
          sitekey: SITE_KEY,
          action: "contact",
          theme: "light",
          callback: (token) => onTokenRef.current(token),
          // Tokens go stale after ~5 minutes on a page someone left open.
          "expired-callback": () => onTokenRef.current(null),
          "timeout-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch((error: unknown) => {
        // A blocked script or an offline visitor. The form still submits; the
        // server decides whether a missing token is fatal.
        console.warn("Turnstile unavailable:", error);
      });

    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
        widgetIdRef.current = null;
      }
    };
  }, []);

  if (!SITE_KEY) return null;

  // Reserve the widget's height so the submit button does not jump when the
  // challenge finishes loading.
  return <div ref={containerRef} className="min-h-[65px]" />;
}
