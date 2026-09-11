"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/ui";
import type { NavItem } from "@/data/site";
import { cn } from "@/lib";

import { LanguageSelector } from "./LanguageSelector";
import { LogoPlaceholder } from "./LogoPlaceholder";
import { MobileMenu } from "./MobileMenu";

const SCROLL_THRESHOLD = 50;

/** Routes that light up the "УСЛУГИ" item. */
const SERVICE_ROUTES = ["/mk/uslugi", "/mk/programi"];

/**
 * Routes that open with a full-bleed photograph. Only these can carry the
 * transparent header; elsewhere it would be light-grey type on a light-grey
 * page.
 */
const PHOTO_HERO_ROUTES = [
  "/mk",
  "/mk/uslugi",
  "/mk/programi",
  "/mk/za-nas",
  "/mk/kontakt",
];

type HeaderProps = {
  /** Desktop navigation. */
  nav: NavItem[];
  /** Sentence-case variant for the mobile panel. */
  mobileNav: NavItem[];
};

/**
 * The navigation is handed down from the server rather than imported here.
 * `primaryNav` derives its services dropdown from `@/data/content/services`,
 * so importing it inside this client component dragged the entire services
 * catalogue — descriptions, deliverables and seven icon components — into the
 * JavaScript of every page on the site. As props it costs a dozen strings.
 */
export function Header({ nav, mobileNav }: HeaderProps) {
  const pathname = usePathname();
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

  const solid = scrolled || !PHOTO_HERO_ROUTES.includes(pathname);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/mk") return pathname === "/mk";
      if (href === "/mk/uslugi") {
        return SERVICE_ROUTES.some((route) => pathname.startsWith(route));
      }
      return pathname.startsWith(href);
    },
    [pathname],
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
          <Link href="/mk" aria-label="ВФП Плус Консалтинг — почетна страница">
            <LogoPlaceholder />
          </Link>

          <nav
            aria-label="Главна навигација"
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
                          ? "font-bold text-[#dc2626]"
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
                      ? "font-bold text-[#dc2626]"
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
              aria-label={menuOpen ? "Затвори го менито" : "Отвори го менито"}
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
          isActive={isActive}
          onNavigate={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
