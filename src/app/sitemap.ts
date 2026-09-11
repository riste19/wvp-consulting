import type { MetadataRoute } from "next";

import { articles } from "@/data/content";
import { company } from "@/data/site";

const STATIC_ROUTES = [
  "/mk",
  "/mk/uslugi",
  "/mk/programi",
  "/mk/za-nas",
  "/mk/blog",
  "/mk/kontakt",
  "/mk/politika-za-privatnost",
  "/mk/uslovi-za-koristenje",
];

/** Baked at build time into `out/sitemap.xml`; see the note in `robots.ts`. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Frozen at build time, so `lastModified` on the static routes moves only
  // when the site is redeployed.
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${company.siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "/mk" ? 1 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${company.siteUrl}/mk/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
