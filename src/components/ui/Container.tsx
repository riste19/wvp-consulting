import type { ReactNode } from "react";

import { cn } from "@/lib";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** The site-wide content column: 1280px max, 16/24/32px gutters. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
