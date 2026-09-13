import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { getContent } from "@/data/content";
import { company, images } from "@/data/site";
import { locales, ogLocale } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";

/** Only the languages in `locales` exist. Anything else is a 404, never rendered on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { site } = getContent(locale).ui;

  return {
    title: { default: site.title, template: `%s | ${company.name}` },
    description: site.description,
    keywords: site.keywords,
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: company.name,
      title: site.title,
      description: site.shareDescription,
      images: [
        {
          url: images.openGraph,
          width: 1200,
          height: 630,
          alt: site.shareImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.shareDescription,
      images: [images.openGraph],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await resolveLocale(params);

  return (
    // The root <html> is shared by both languages; this sets the real one for
    // everything on the page.
    <div lang={locale} className="flex flex-1 flex-col">
      <SiteShell locale={locale}>{children}</SiteShell>
    </div>
  );
}
