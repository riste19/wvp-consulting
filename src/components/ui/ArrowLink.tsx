import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib";

type ArrowLinkProps = {
  href: string;
  children: string;
  /** `brand` is the darker red used on service cards. */
  tone?: "primary" | "brand";
  /**
   * Hides the link from assistive tech and the tab order — for cards where the
   * heading already links to the same place.
   */
  decorative?: boolean;
  /** Extra context read out after the label, e.g. the service name. */
  srSuffix?: string;
  className?: string;
};

/**
 * Red text link with a trailing arrow that nudges right when the surrounding
 * card (`group`) is hovered.
 */
export function ArrowLink({
  href,
  children,
  tone = "brand",
  decorative = false,
  srSuffix,
  className,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 transition-colors",
        tone === "brand"
          ? "text-[#b91c1c] hover:text-primary hover:underline"
          : "text-primary hover:text-primary/80",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      />
      {srSuffix ? <span className="sr-only"> {srSuffix}</span> : null}
    </Link>
  );
}
