"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/ui";
import type { NavItem } from "@/data/site";
import { stripLocale } from "@/i18n/locales";
import { cn } from "@/lib";

import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const SCROLL_THRESHOLD = 50;

/** Routes, without their locale, that light up the services item. */
const SERVICE_ROUTES = ["/uslugi", "/programi"];

/**
 * Routes, without their locale, that open with a full-bleed photograph. Only
 * these can carry the transparent header; elsewhere it would be light-grey
 * type on a light-grey page.
 */
const PHOTO_HERO_ROUTES = ["/", "/uslugi", "/programi", "/za-nas", "/kontakt"];

export type HeaderLabels = {
  homeHref: string;
  homeLinkLabel: string;
  mainNavLabel: string;
  openMenu: string;
  closeMenu: string;
  allServices: string;
};

type HeaderProps = {
  /** Desktop navigation. */
  nav: NavItem[];
  /** Sentence-case variant for the mobile panel. */
  mobileNav: NavItem[];
  /** Copy in the page's language. */
  labels: HeaderLabels;
};

/**
 * The navigation and copy are handed down from the server rather than imported
 * here. `primaryNav` derives its services dropdown from
 * `@/data/content/services`, so importing it inside this client component
 * dragged the entire services catalogue — descriptions, deliverables and seven
 * icon components — into the JavaScript of every page on the site. As props
 * it costs a dozen strings.
 */
export function Header({ nav, mobileNav, labels }: HeaderProps) {
  const pathname = usePathname();
  const route = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const solid = scrolled || !PHOTO_HERO_ROUTES.includes(route);

  const isActive = useCallback(
    (href: string) => {
      const target = stripLocale(href);
      if (target === "/") return route === "/";
      if (target === "/uslugi") {
        return SERVICE_ROUTES.some((serviceRoute) =>
          route.startsWith(serviceRoute),
        );
      }
      return route.startsWith(target);
    },
    [route],
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        solid
          ? "bg-gray-50 text-foreground shadow-md"
          : "bg-transparent text-white backdrop-blur-sm",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={labels.homeHref} aria-label={labels.homeLinkLabel}>
            <Logo tone={solid ? "color" : "white"} />
          </Link>

          <nav
            aria-label={labels.mainNavLabel}
            className="hidden items-center space-x-8 lg:flex"
          >
            {nav.map((item, index) => {
              const active = isActive(item.href);
              const nextHasSeparator = nav[index + 1]?.separatorBefore;
              const edgeClasses = nextHasSeparator
                ? cn(
                    "border-r pr-8",
                    solid ? "border-gray-300" : "border-white/60",
                  )
                : undefined;

              if (item.children) {
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1 transition-colors hover:text-primary",
                        active
                          ? "font-bold text-primary"
                          : solid
                            ? "text-foreground"
                            : "text-gray-400",
                        edgeClasses,
                      )}
                    >
                      {item.label}
                      <ChevronDown aria-hidden className="ml-1 h-4 w-4" />
                    </Link>

                    <div className="invisible absolute left-0 top-full z-50 mt-2 w-80 -translate-y-2 overflow-hidden rounded-lg border border-border bg-card opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="bg-gray-100 p-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors hover:text-primary",
                    active
                      ? "font-bold text-primary"
                      : solid
                        ? "text-foreground"
                        : "text-gray-400",
                    edgeClasses,
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <LanguageSelector />
          </nav>

          <div className="lg:hidden">
            <button
              type="button"
              aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-black/10"
            >
              {menuOpen ? (
                <X aria-hidden className="h-6 w-6" />
              ) : (
                <Menu aria-hidden className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen ? (
        <MobileMenu
          nav={mobileNav}
          allServicesLabel={labels.allServices}
          isActive={isActive}
          onNavigate={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
