import type { Locale } from "@/i18n/locales";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

/**
 * Anti-spam evidence that travels with the payload but is not part of it.
 *
 * Kept separate from `ContactPayload` so the form's own state, validation and
 * reset logic stay about the fields a visitor actually fills in.
 */
export type ContactChallenge = {
  /** Contents of the hidden field. Always "" for a human. */
  honeypot: string;
  /** Turnstile token, or "" when the widget is disabled or still loading. */
  turnstileToken: string;
};

export type ContactContext = {
  /** The page's language. The server replies in it. */
  locale: Locale;
  /** Shown when the endpoint is unreachable or answers with something odd. */
  fallbackError: string;
};

/**
 * Single integration point for the contact form.
 *
 * Posts to `/api/contact`, which is a Cloudflare Pages Function
 * (`functions/api/contact.ts`) that validates the submission again and hands
 * it to Resend. The site is a static export, so this endpoint does not exist
 * under `next dev` — use `npm run preview` to exercise the real thing.
 *
 * @param challenge Anti-spam evidence. Passed through untouched — the server
 *   is the only place that gets to decide what either value means.
 */
export async function submitContactForm(
  payload: ContactPayload,
  challenge: ContactChallenge,
  context: ContactContext,
): Promise<ContactResult> {
  let response: Response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...payload,
        locale: context.locale,
        website: challenge.honeypot,
        turnstileToken: challenge.turnstileToken,
      }),
    });
  } catch {
    // Offline, DNS failure, request blocked by an extension.
    return { ok: false, error: context.fallbackError };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // A non-JSON response means something upstream answered instead of the
    // function — a 404 HTML page under `next dev`, or a proxy error page.
    // The first case is the common one and costs an afternoon if unexplained.
    if (response.status === 404) {
      console.warn(
        "/api/contact returned 404. `next dev` does not run Cloudflare Pages " +
          "Functions — use `npm run preview` and open localhost:8788 instead.",
      );
    }
    return { ok: false, error: context.fallbackError };
  }

  const result = body as Partial<ContactResult> | null;

  if (response.ok && result?.ok === true) {
    return { ok: true };
  }

  const error =
    result && "error" in result && typeof result.error === "string"
      ? result.error
      : context.fallbackError;

  return { ok: false, error };
}
