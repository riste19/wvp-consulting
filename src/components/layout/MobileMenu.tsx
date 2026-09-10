"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { mobileNav } from "@/data/site";
import { cn } from "@/lib";

import { LanguageSelector } from "./LanguageSelector";

type MobileMenuProps = {
  onNavigate: () => void;
  isActive: (href: string) => boolean;
};

/** Dark panel that drops below the header on small screens. */
export function MobileMenu({ onNavigate, isActive }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      id="mobile-menu"
      className="border-t border-border bg-foreground lg:hidden"
    >
      <div className="space-y-1 px-2 pb-3 pt-2">
        {mobileNav.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                type="button"
                aria-expanded={expanded === item.label}
                aria-controls={`mobile-submenu-${item.href.replace(/\W/g, "")}`}
                onClick={() =>
                  setExpanded((value) => (value === item.label ? null : item.label))
                }
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors hover:bg-white/10 hover:text-primary",
                  isActive(item.href) ? "text-primary" : "text-white",
                )}
              >
                {item.label}
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    expanded === item.label && "rotate-180",
                  )}
                />
              </button>

              {expanded === item.label ? (
                <div
                  id={`mobile-submenu-${item.href.replace(/\W/g, "")}`}
                  className="mt-1 space-y-1 border-l border-white/20 pl-3"
                >
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="block rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-primary"
                  >
                    Преглед на сите услуги
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      className="block rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "block rounded-md px-3 py-2 transition-colors hover:bg-white/10 hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-white",
              )}
            >
              {item.label}
            </Link>
          ),
        )}

        <div className="px-3 py-2">
          <LanguageSelector className="text-white hover:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
