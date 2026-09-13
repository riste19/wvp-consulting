import { serviceHref } from "@/data/content/services";
import type { Locale } from "@/i18n/locales";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const SERVICE_IDS = [
  "finansiski-konsalting",
  "pristap-do-finansii",
  "biznis-konsalting",
  "marketing-i-biznis-razvoj",
  "pristap-do-pazari",
  "grantovi-i-kofinansiranje",
];

const COPY: Record<
  Locale,
  {
    servicesTitle: string;
    /** In the same order as `SERVICE_IDS`. */
    services: string[];
    companyTitle: string;
    about: string;
    team: string;
    programmes: string;
    careers: string;
    contact: string;
    privacy: string;
    terms: string;
  }
> = {
  mk: {
    servicesTitle: "Услуги",
    services: [
      "Финансиски консалтинг",
      "Пристап до финансии преку кредитни производи",
      "Бизнис консалтинг",
      "Маркетинг и бизнис развој",
      "Пристап до пазари",
      "Грантови и кофинансирање",
    ],
    companyTitle: "Компанија",
    about: "За нас",
    team: "Нашиот тим",
    programmes: "Актуелни програми",
    careers: "Кариера",
    contact: "Контакт",
    privacy: "Политика за приватност",
    terms: "Услови за користење",
  },
  sq: {
    servicesTitle: "Shërbimet",
    services: [
      "Konsulencë financiare",
      "Qasje në financa përmes produkteve kreditore",
      "Konsulencë biznesi",
      "Marketing dhe zhvillim biznesi",
      "Qasje në tregje",
      "Grante dhe bashkëfinancim",
    ],
    companyTitle: "Kompania",
    about: "Rreth nesh",
    team: "Ekipi ynë",
    programmes: "Programet aktuale",
    careers: "Karriera",
    contact: "Kontakti",
    privacy: "Politika e privatësisë",
    terms: "Kushtet e përdorimit",
  },
};

export function getFooterColumns(locale: Locale): FooterColumn[] {
  const copy = COPY[locale];

  return [
    {
      title: copy.servicesTitle,
      links: SERVICE_IDS.map((id, index) => ({
        label: copy.services[index],
        href: serviceHref(id, locale),
      })),
    },
    {
      title: copy.companyTitle,
      links: [
        { label: copy.about, href: `/${locale}/za-nas` },
        { label: copy.team, href: `/${locale}/za-nas#tim` },
        { label: copy.programmes, href: `/${locale}/programi` },
        { label: copy.careers, href: `/${locale}/za-nas#kariera` },
        { label: copy.contact, href: `/${locale}/kontakt` },
      ],
    },
  ];
}

export function getLegalLinks(locale: Locale) {
  const copy = COPY[locale];

  return [
    { label: copy.privacy, href: `/${locale}/politika-za-privatnost` },
    { label: copy.terms, href: `/${locale}/uslovi-za-koristenje` },
  ];
}
