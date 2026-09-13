"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DURATION_MS = 2000;

/** `useLayoutEffect` warns during SSR; on the server there is nothing to do. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Macedonian and Albanian group thousands with a full stop (4.650), English
 * with a comma (4,650). `Intl` disagrees on some engines, so the separator is
 * passed in and applied directly.
 */
const formatNumber = (value: number, separator: string) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, separator);

/** Fast start, long settle — reads as precise rather than playful. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  prefixClassName?: string;
  /** Thousands separator. Defaults to the Macedonian full stop. */
  separator?: string;
};

/**
 * Counts up to `value` the first time the element scrolls into view.
 *
 * The server renders the final figure, so crawlers and visitors without
 * JavaScript read the real number rather than a zero — and if the count-up
 * never gets to run, the stat is still correct instead of stuck at 0. The
 * client resets it to 0 before the first paint, so there is no flash of the
 * final value ahead of the animation.
 *
 * Unlike the rest of the motion in this folder, the count-up deliberately runs
 * even under `prefers-reduced-motion: reduce`, matching the live site. It is
 * text changing in place — no movement, no parallax — so it does not carry the
 * vestibular risk that rule is meant to guard against.
 */
export function AnimatedCounter({
  value,
  prefix,
  suffix,
  className,
  prefixClassName,
  separator = ".",
}: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState(value);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (hasRun.current) return;
    if (typeof IntersectionObserver === "undefined") return;
    // Hydration matched the server's final figure; rewind before painting.
    setDisplayed(0);
  }, [value]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || hasRun.current) return;
    if (typeof IntersectionObserver === "undefined") return;

    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        setDisplayed(Math.round(easeOutExpo(progress) * value));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || hasRun.current) return;
        // Count anything already scrolled past as seen, so a deep link or a
        // fast scroll never leaves the figure sitting at zero.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          hasRun.current = true;
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={wrapperRef} className="flex items-start">
      {prefix ? (
        <span className={prefixClassName} aria-hidden>
          {prefix}
        </span>
      ) : null}
      <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
        {formatNumber(displayed, separator)}
        {suffix}
      </span>
    </span>
  );
}
