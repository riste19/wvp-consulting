import type { MetadataRoute } from "next";

import { articles, canonicalLocaleOf } from "@/data/content";
import { company } from "@/data/site";
import { languageUrls, locales } from "@/i18n/locales";

/** Pages translated into every language. "" is the home page. */
const TRANSLATED_ROUTES = [
  "",
  "/uslugi",
  "/programi",
  "/za-nas",
  "/blog",
  "/kontakt",
];

/** Also in every language, but rarely changed and of little search value. */
const LEGAL_ROUTES = [
  "/politika-za-privatnost",
  "/uslovi-za-koristenje",
];

/** Baked at build time into `out/sitemap.xml`; see the note in `robots.ts`. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Frozen at build time, so `lastModified` on the static routes moves only
  // when the site is redeployed.
  const now = new Date();
  const url = (path: string) => `${company.siteUrl}${path}`;

  return [
    ...TRANSLATED_ROUTES.flatMap((route) =>
      locales.map((locale) => ({
        url: url(`/${locale}${route}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.7,
        alternates: { languages: languageUrls(route, company.siteUrl) },
      })),
    ),
    ...LEGAL_ROUTES.flatMap((route) =>
      locales.map((locale) => ({
        url: url(`/${locale}${route}`),
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.3,
        alternates: { languages: languageUrls(route, company.siteUrl) },
      })),
    ),
    // A post is only listed at the country site it is canonical on; it may
    // not have been published to Macedonia at all.
    ...articles.map((article) => ({
      url: url(`/${canonicalLocaleOf(article)}/blog/${article.slug}`),
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
