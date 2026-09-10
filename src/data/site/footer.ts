import { serviceHref } from "@/data/content/services";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Услуги",
    links: [
      { label: "Финансиски консалтинг", href: serviceHref("finansiski-konsalting") },
      {
        label: "Пристап до финансии преку кредитни производи",
        href: serviceHref("pristap-do-finansii"),
      },
      { label: "Бизнис консалтинг", href: serviceHref("biznis-konsalting") },
      {
        label: "Маркетинг и бизнис развој",
        href: serviceHref("marketing-i-biznis-razvoj"),
      },
      { label: "Пристап до пазари", href: serviceHref("pristap-do-pazari") },
      {
        label: "Грантови и кофинансирање",
        href: serviceHref("grantovi-i-kofinansiranje"),
      },
    ],
  },
  {
    title: "Компанија",
    links: [
      { label: "За нас", href: "/mk/za-nas" },
      { label: "Нашиот тим", href: "/mk/za-nas#tim" },
      { label: "Актуелни програми", href: "/mk/programi" },
      { label: "Кариера", href: "/mk/za-nas#kariera" },
      { label: "Контакт", href: "/mk/kontakt" },
    ],
  },
];

export const legalLinks = [
  { label: "Политика за приватност", href: "/mk/politika-za-privatnost" },
  { label: "Услови за користење", href: "/mk/uslovi-za-koristenje" },
];
