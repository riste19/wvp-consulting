import type { Locale } from "@/i18n/locales";

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
  /** The Belgrade office's line, shown on the Serbian pages. */
  phoneSerbia: "+381 654 019 999",
  email: "info@wvpconsulting.com",
  address: {
    street: "бул. Кочо Рацин 3",
    city: "Скопје",
    country: "Република Северна Македонија",
  },
  workingHours: "Пон–Пет 08:00–17:00",
  /**
   * What the contact-page map pins. Coordinates ("41.99, 21.43") are the most
   * exact; an address works too.
   */
  mapQuery: "Булевар Кочо Рацин 3, Скопје",
  social: {
    linkedin:
      "https://www.linkedin.com/company/wvp-plus-konsalting/?originalSubdomain=mk",
  },
  /** Used for canonical URLs and Open Graph. */
  siteUrl: "https://wvpconsulting.mk",
} as const;

export type CompanyText = {
  legalName: string;
  tagline: string;
  description: string;
  address: { street: string; city: string; country: string };
  workingHours: string;
};

/**
 * The parts of `company` that are written in a language. `company` itself
 * stays Macedonian: it also feeds the structured data on the home page.
 */
export const companyText: Record<Locale, CompanyText> = {
  mk: {
    legalName: company.legalName,
    tagline: company.tagline,
    description: company.description,
    address: company.address,
    workingHours: company.workingHours,
  },
  sq: {
    legalName: "WVP Plus Consulting DOO Shkup",
    tagline: "Për klientët tanë gjithmonë zgjedhim më të mirën!",
    description:
      "Konsulencë biznesi dhe financiare, qasje në financa, grante dhe bashkëfinancim për kompanitë në Maqedoninë e Veriut dhe në rajon.",
    address: {
      street: "bul. Koço Racin 3",
      city: "Shkup",
      country: "Republika e Maqedonisë së Veriut",
    },
    workingHours: "Hën–Pre 08:00–17:00",
  },
  en: {
    legalName: "WVP Plus Consulting LLC Skopje",
    tagline: "For our clients we always choose the best!",
    description:
      "Business and financial consulting, access to finance, grants and co-financing for companies in North Macedonia and the region.",
    address: {
      street: "3 Kočo Racin Blvd.",
      city: "Skopje",
      country: "Republic of North Macedonia",
    },
    workingHours: "Mon–Fri 08:00–17:00",
  },
  rs: {
    legalName: "WVP Plus Konsalting DOO Skoplje",
    tagline: "Za naše klijente uvek biramo najbolje!",
    description:
      "Biznis i finansijski konsalting, pristup finansijama, grantovi i sufinansiranje za kompanije u Severnoj Makedoniji i regionu.",
    address: {
      street: "bul. Kočo Racin 3",
      city: "Skoplje",
      country: "Republika Severna Makedonija",
    },
    workingHours: "Pon–Pet 08:00–17:00",
  },
  ba: {
    legalName: "WVP Plus Konsalting DOO Skoplje",
    tagline: "Za naše klijente uvijek biramo najbolje!",
    description:
      "Poslovno i finansijsko savjetovanje, pristup finansijama, grantovi i sufinansiranje za kompanije u Sjevernoj Makedoniji i regionu.",
    address: {
      street: "bul. Kočo Racin 3",
      city: "Skoplje",
      country: "Republika Sjeverna Makedonija",
    },
    workingHours: "Pon–Pet 08:00–17:00",
  },
  me: {
    legalName: "WVP Plus Konsalting DOO Skoplje",
    tagline: "Za naše klijente uvijek biramo najbolje!",
    description:
      "Poslovno i finansijsko savjetovanje, pristup finansijama, grantovi i sufinansiranje za kompanije u Sjevernoj Makedoniji i regionu.",
    address: {
      street: "bul. Kočo Racin 3",
      city: "Skoplje",
      country: "Republika Sjeverna Makedonija",
    },
    workingHours: "Pon–Pet 08:00–17:00",
  },
  hr: {
    legalName: "WVP Plus Konsalting DOO Skopje",
    tagline: "Za naše klijente uvijek biramo najbolje!",
    description:
      "Poslovno i financijsko savjetovanje, pristup financijama, grantovi i sufinanciranje za tvrtke u Sjevernoj Makedoniji i regiji.",
    address: {
      street: "bul. Kočo Racin 3",
      city: "Skopje",
      country: "Republika Sjeverna Makedonija",
    },
    workingHours: "Pon–Pet 08:00–17:00",
  },
};

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
