import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib";

export type ButtonVariant = "primary" | "onImage" | "pill" | "onPrimary";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  /** Solid crimson call to action — hero, blog listing, form submit. */
  primary:
    "h-10 px-8 py-3 text-sm font-semibold bg-primary focus-visible:ring-primary text-primary-foreground hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/50",
  /** Light button that sits on top of a photograph. */
  onImage:
    "h-10 px-8 py-3 text-sm font-semibold border-2 focus-visible:ring-primary border-white bg-background text-primary backdrop-blur-sm hover:bg-white hover:text-black",
  /** Larger rounded action used in the team and careers blocks. */
  pill: "rounded-lg px-8 py-3 text-base font-medium bg-primary focus-visible:ring-primary text-white shadow-lg hover:bg-primary-hover hover:scale-[1.02]",
  /**
   * Light pill for the red bands, where `pill` would be red-on-red. The focus
   * ring goes white for the same reason.
   */
  onPrimary:
    "rounded-lg px-8 py-3 text-base font-medium bg-background focus-visible:ring-white text-foreground shadow-lg hover:bg-white hover:scale-[1.02]",
};

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(BASE, VARIANTS[variant], className)} {...rest}>
      {children}
    </button>
  );
}
