/**
 * Single source of truth for every image path used by the site.
 *
 * The photographs and logos are the firm's own, carried over from its previous
 * site and converted to WebP at the size each slot displays. To replace one,
 * overwrite the file (keeping its proportions) or point the entry at a new one.
 *
 * Posts written through the admin panel carry their own image path; the
 * `article` list only covers the sample posts in `articles.ts`.
 */

const ARTICLE_IMAGES = Array.from(
  { length: 11 },
  (_, index) => `/images/blog/post-${String(index + 1).padStart(2, "0")}.webp`,
);

export const images = {
  logo: "/images/brand/logo.webp",
  logoWhite: "/images/brand/logo-white.webp",
  hero: [
    "/images/hero/hero-01.webp",
    "/images/hero/hero-02.webp",
    "/images/hero/hero-03.webp",
  ],
  team: "/images/team/team.webp",
  footerBackground: "/images/footer/footer-bg.webp",
  openGraph: "/images/og/og-image.jpg",
  pageHero: {
    uslugi: "/images/page/uslugi-hero.webp",
    programi: "/images/page/programi-hero.webp",
    zaNas: "/images/page/za-nas-hero.webp",
    kontakt: "/images/page/kontakt-hero.webp",
    blog: "/images/page/blog-hero.webp",
  },
  contactMap: "/images/page/kontakt-building.webp",
  /** By position in `services.ts`. */
  service: (index: number) => `/images/services/${SERVICE_FILES[index]}.webp`,
  article: (index: number) => ARTICLE_IMAGES[index],
} as const;

const SERVICE_FILES = [
  "finansiski-konsalting",
  "pristap-do-finansii",
  "grantovi-i-kofinansiranje",
  "biznis-konsalting",
  "marketing-i-biznis-razvoj",
  "pristap-do-pazari",
  "esg-standardizacija",
];

/** Intrinsic sizes, so `next/image` can reserve space. */
export const imageSizes = {
  logo: { width: 384, height: 82 },
  logoWhite: { width: 900, height: 192 },
  hero: { width: 1920, height: 1080 },
  team: { width: 1136, height: 1686 },
  footerBackground: { width: 800, height: 550 },
  pageHero: { width: 1920, height: 720 },
  service: { width: 800, height: 800 },
  article: { width: 1040, height: 416 },
  contactMap: { width: 800, height: 550 },
} as const;
