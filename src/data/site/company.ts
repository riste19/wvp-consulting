/** Company details shown across the header, footer and contact page. */
export const company = {
  name: "WVP Plus Consulting",
  nameMk: "ВФП Плус Консалтинг",
  legalName: "ВФП Плус Консалтинг ДОО Скопје",
  tagline: "За нашите клиенти секогаш го избираме најдоброто!",
  description:
    "Бизнис и финансиски консалтинг, пристап до финансии, грантови и кофинансирање за компании во Северна Македонија и регионот.",
  founded: 2019,
  group: "WVP Group",
  groupFounded: 1985,
  phones: ["+389 76 337 800", "+389 76 337 801"],
  email: "info@wvpconsulting.com",
  address: {
    street: "бул. Партизански одреди",
    city: "Скопје",
    country: "Република Северна Македонија",
  },
  workingHours: "Пон–Пет 08:00–17:00",
  social: {
    linkedin:
      "https://www.linkedin.com/company/wvp-plus-konsalting/?originalSubdomain=mk",
  },
  /** Used for canonical URLs and Open Graph. */
  siteUrl: "https://wvpconsulting.mk",
} as const;

/**
 * Footer copyright year.
 *
 * Evaluated when the site is BUILT, not when it is viewed — this is a static
 * export, so there is no request-time render to recompute it. Cloudflare
 * rebuilds on every push, which keeps it right in practice. The one gap is a
 * site that goes a whole calendar year without a deploy; a January redeploy
 * fixes it. Do not hardcode it again: it was stuck at 2025 well into 2026.
 */
export const currentYear = new Date().getFullYear();
