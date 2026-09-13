import { serviceHref, services as servicesMk } from "@/data/content/services";
import { services as servicesEn } from "@/data/content/services.en";
import { services as servicesSq } from "@/data/content/services.sq";
import type { Locale } from "@/i18n/locales";

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  /** Rendered as a hover/focus dropdown in the desktop header. */
  children?: NavLink[];
  /** The reference separates the last item with a vertical rule. */
  separatorBefore?: boolean;
};

const SERVICES = { mk: servicesMk, sq: servicesSq, en: servicesEn };

const LABELS: Record<
  Locale,
  {
    home: string;
    services: string;
    programmes: string;
    about: string;
    contact: string;
    blog: string;
  }
> = {
  mk: {
    home: "Почетна",
    services: "Услуги",
    programmes: "Актуелни програми и повици",
    about: "За нас",
    contact: "Контакт",
    blog: "Финансиски совети",
  },
  sq: {
    home: "Ballina",
    services: "Shërbimet",
    programmes: "Programet dhe thirrjet aktuale",
    about: "Rreth nesh",
    contact: "Kontakti",
    blog: "Këshilla financiare",
  },
  en: {
    home: "Home",
    services: "Services",
    programmes: "Current programmes and calls",
    about: "About us",
    contact: "Contact",
    blog: "Financial advice",
  },
};

function serviceLinks(locale: Locale): NavLink[] {
  return [
    ...SERVICES[locale].map((service) => ({
      label: service.title,
      href: serviceHref(service.id, locale),
    })),
    { label: LABELS[locale].programmes, href: `/${locale}/programi` },
  ];
}

/** Desktop header. Upper case, matching the reference. */
export function getPrimaryNav(locale: Locale): NavItem[] {
  const labels = LABELS[locale];
  const upper = (label: string) => label.toLocaleUpperCase(locale);

  return [
    { label: upper(labels.home), href: `/${locale}` },
    {
      label: upper(labels.services),
      href: `/${locale}/uslugi`,
      children: serviceLinks(locale),
    },
    { label: upper(labels.about), href: `/${locale}/za-nas` },
    { label: upper(labels.contact), href: `/${locale}/kontakt` },
    {
      label: upper(labels.blog),
      href: `/${locale}/blog`,
      separatorBefore: true,
    },
  ];
}

/** The mobile panel uses sentence case, matching the reference. */
export function getMobileNav(locale: Locale): NavItem[] {
  const labels = LABELS[locale];

  return [
    { label: labels.home, href: `/${locale}` },
    {
      label: labels.services,
      href: `/${locale}/uslugi`,
      children: serviceLinks(locale),
    },
    { label: labels.blog, href: `/${locale}/blog` },
    { label: labels.about, href: `/${locale}/za-nas` },
    { label: labels.contact, href: `/${locale}/kontakt` },
  ];
}
