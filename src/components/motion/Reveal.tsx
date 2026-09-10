"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * The single scroll-reveal wrapper used across the site: a short fade with a
 * small upward translate, played once.
 *
 * Both states are expressed in CSS (`.reveal` in `globals.css`), so the server
 * and client render identical markup and `prefers-reduced-motion` is honoured
 * by the stylesheet rather than by branching during render. A `<noscript>`
 * rule in the root layout keeps the content visible without JavaScript.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        // Also unhide content the visitor has already scrolled past, so a jump
        // to an anchor never leaves a section blank.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={cn("reveal", visible && "reveal--visible", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
