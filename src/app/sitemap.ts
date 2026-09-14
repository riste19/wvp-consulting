import type { MetadataRoute } from "next";

import { articles } from "@/data/content";
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

/**
 * Written in Macedonian only. Their other-language URLs exist but declare the
 * Macedonian page canonical, so only that one is listed.
 */
const MACEDONIAN_ONLY_ROUTES = [
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
    ...MACEDONIAN_ONLY_ROUTES.map((route) => ({
      url: url(`/mk${route}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...articles.map((article) => ({
      url: url(`/mk/blog/${article.slug}`),
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
