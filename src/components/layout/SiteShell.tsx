import type { ReactNode } from "react";

import { getContent } from "@/data/content";
import { getMobileNav, getPrimaryNav } from "@/data/site";
import type { Locale } from "@/i18n/locales";

import { Footer } from "./Footer";
import { Header } from "./Header";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

/**
 * Skip link, header, main landmark and footer, in one language. Shared by the
 * locale layout and the root 404, which has no locale of its own.
 */
export function SiteShell({ locale, children }: SiteShellProps) {
  const { chrome } = getContent(locale).ui;

  return (
    <>
      <a
        href="#glavna-sodrzina"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {chrome.skipToContent}
      </a>
      <Header
        nav={getPrimaryNav(locale)}
        mobileNav={getMobileNav(locale)}
        labels={{
          homeHref: `/${locale}`,
          homeLinkLabel: chrome.homeLinkLabel,
          mainNavLabel: chrome.mainNavLabel,
          openMenu: chrome.openMenu,
          closeMenu: chrome.closeMenu,
          allServices: chrome.allServices,
        }}
      />
      <main id="glavna-sodrzina" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
