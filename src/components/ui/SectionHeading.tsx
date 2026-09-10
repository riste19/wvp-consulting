import type { ReactNode } from "react";

import { Reveal } from "@/components/motion";
import { cn } from "@/lib";

type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /**
   * `display` is the oversized services heading; `default` is the slightly
   * smaller heading used by the statistics and article sections.
   */
  size?: "default" | "display";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({
  title,
  subtitle,
  size = "default",
  tone = "dark",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("text-center", className)}>
      <h2
        id={id}
        className={cn(
          size === "display"
            ? "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            : "text-2xl font-bold sm:text-3xl lg:text-4xl",
          subtitle ? "mb-4" : undefined,
          tone === "light" ? "text-white" : "text-gray-900",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "text-lg sm:text-xl",
            tone === "light" ? "text-neutral-300" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
