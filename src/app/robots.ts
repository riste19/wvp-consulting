import type { MetadataRoute } from "next";

import { company } from "@/data/site";

/**
 * Metadata routes compile to route handlers, and `output: "export"` refuses to
 * collect one that has not declared how it renders. Nothing here varies per
 * request, so it is baked at build time into `out/robots.txt`.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${company.siteUrl}/sitemap.xml`,
  };
}
