/**
 * Single source of truth for every image path used by the site.
 *
 * Everything here currently points at a generated placeholder (see
 * `scripts/generate-placeholders.mjs`). Swapping in licensed artwork is a
 * one-line change per entry — keep the replacement at the same intrinsic size
 * so no layout shifts.
 */

export const images = {
  hero: [
    "/images/hero/hero-01-placeholder.png",
    "/images/hero/hero-02-placeholder.png",
    "/images/hero/hero-03-placeholder.png",
  ],
  team: "/images/team/team-collage-placeholder.png",
  footerBackground: "/images/footer/footer-bg-placeholder.png",
  openGraph: "/images/og/og-image-placeholder.png",
  pageHero: {
    uslugi: "/images/page/uslugi-hero-placeholder.png",
    programi: "/images/page/programi-hero-placeholder.png",
    zaNas: "/images/page/za-nas-hero-placeholder.png",
    kontakt: "/images/page/kontakt-hero-placeholder.png",
    blog: "/images/page/blog-hero-placeholder.png",
  },
  contactMap: "/images/page/kontakt-map-placeholder.png",
  service: (index: number) =>
    `/images/services/service-0${index + 1}-placeholder.png`,
  article: (index: number) =>
    `/images/blog/blog-${String(index + 1).padStart(2, "0")}-placeholder.png`,
} as const;

/** Intrinsic sizes of the placeholders, so `next/image` can reserve space. */
export const imageSizes = {
  hero: { width: 1920, height: 1080 },
  team: { width: 1136, height: 1270 },
  footerBackground: { width: 1920, height: 970 },
  pageHero: { width: 1920, height: 720 },
  service: { width: 800, height: 600 },
  article: { width: 1040, height: 416 },
  contactMap: { width: 1040, height: 800 },
} as const;
