import type { IconName } from "@/components/icons";
import { images } from "@/data/site/images";

export type Service = {
  /** Anchor id on /mk/uslugi, also used for deep links from the header. */
  id: string;
  /** Uppercase form used on the homepage cards. */
  cardTitle: string;
  /** Sentence-case form used in menus, the footer and page headings. */
  title: string;
  /** Short bullet-separated summary shown under the heading. */
  tagline: string;
  description: string;
  deliverables: string[];
  icon: IconName;
  image: string;
  /** The homepage grid shows six of the seven service areas. */
  featuredOnHome: boolean;
};

export const services: Service[] = [
  {
    id: "finansiski-konsalting",
    cardTitle: "ФИНАНСИСКИ КОНСАЛТИНГ",
    title: "Финансиски консалтинг",
    tagline:
      "Кредитна дијагностика • Бизнис планирање • Структуирање на инвестиции",
    description:
      "Сеопфатна анализа прилагодена кон вашиот бизнис модел со цел оптимизација на финансиското работење, изработка на кредитна бизнис дијагностика и обезбедување квалитетна структура на финансиските извештаи.",
    deliverables: [
      "Бизнис план",
      "Длабинска анализа (Due diligence)",
      "Инвестициска програма",
      "Извештај за исплатливост и оправданост на инвестицијата (cost-benefit analysis)",
    ],
    icon: "handCoins",
    image: images.service(0),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-finansii",
    cardTitle: "ПРИСТАП ДО ФИНАНСИИ",
    title: "Пристап до финансии",
    tagline: "Кредитни советници • Структурирано финансирање",
    description:
      "Преку услугите кредитен промотор и кредитен советник се овозможува кредитна дијагностика и препораки за финансиска конструкција соодветна за постоечките и идните инвестиции. Нашите кредитни советници ги истражуваат понудите на пазарот и препорачуваат оптимална рочност, валута, динамика и финансиски аранжмани.",
    deliverables: [
      "Банкарски кредитни производи",
      "Лизинг",
      "Факторинг",
      "Осигурување на побарувања",
      "Алтернативно финансирање",
    ],
    icon: "euro",
    image: images.service(1),
    featuredOnHome: true,
  },
  {
    id: "grantovi-i-kofinansiranje",
    cardTitle: "ГРАНТОВИ И КОФИНАНСИРАЊЕ",
    title: "Грантови и кофинансирање",
    tagline: "Подготовка на проекти • Мониторинг на грантови",
    description:
      "Следење на повици и целосна подготовка на апликации за грантови и кофинансирање достапни преку национални и меѓународни инструменти, вклучувајќи ИПАРД, ИПА, ГИЗ, ИНОВА и фондовите на Европската Унија — максимизирајќи ги можностите за добивање „меки“ или целосно бесповратни финансиски средства.",
    deliverables: [
      "ИПАРД, ИПА, ГИЗ",
      "ИНОВА и национални програми",
      "ЕБРД комбинирано финансирање",
      "ЕУ структурни инструменти",
      "Потенцијал за поврат до 90%",
    ],
    icon: "receiptEuro",
    image: images.service(2),
    featuredOnHome: true,
  },
  {
    id: "biznis-konsalting",
    cardTitle: "БИЗНИС КОНСАЛТИНГ",
    title: "Бизнис консалтинг",
    tagline: "Организациска дијагностика • Развој на тимови",
    description:
      "Со примена на специјализирана метода ја дијагностицираме организациската култура, благосостојбата на вработените и ефективноста на менаџментот, а потоа предлагаме и организираме коучинг и програми за развој на вработените.",
    deliverables: [
      "Дијагностика преку специјализирана метода",
      "Коучинг и лидерски програми",
      "Планови за развој на вработените",
      "Долгорочен организациски мониторинг",
    ],
    icon: "chartLine",
    image: images.service(3),
    featuredOnHome: true,
  },
  {
    id: "marketing-i-biznis-razvoj",
    cardTitle: "МАРКЕТИНГ И БИЗНИС РАЗВОЈ",
    title: "Маркетинг и бизнис развој",
    tagline: "Брендирање • Стратегија за раст • Дигитализација",
    description:
      "Интегриран маркетинг и бизнис развој што ја зголемува видливоста на брендот и носи мерлив раст — од истражување на пазарот и стратешко планирање до спроведување кампањи и оптимизација на вложувањата (ROI).",
    deliverables: [
      "Стратешко планирање",
      "Истражување на пазарот",
      "Брендирање и идентитет",
      "Дигитални кампањи и аналитика",
    ],
    icon: "chartNetwork",
    image: images.service(4),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-pazari",
    cardTitle: "ПРИСТАП ДО ПАЗАРИ",
    title: "Пристап до пазари",
    tagline: "Извозна стратегија • Идентификација на купувачи",
    description:
      "Поддршка за компании што бараат нови меѓународни пазари: истражување, планирање на извозот, дигитална подготвеност, енергетски ревизии и пронаоѓање купувачи за влез на извозниот пазар со низок ризик.",
    deliverables: [
      "Истражување на пазарот и анализа на потенцијал",
      "Подготвеност за дигитализација",
      "Ревизија на енергетска ефикасност (PiNE)",
      "Извозен план и наоѓање купувачи",
    ],
    icon: "globe",
    image: images.service(5),
    featuredOnHome: true,
  },
  {
    id: "esg-standardizacija",
    cardTitle: "ESG СТАНДАРДИЗАЦИЈА",
    title: "ESG Стандардизација",
    tagline: "Нефинансиско известување • Патоказ за усогласеност",
    description:
      "Дијагностика и софтверски поддржана имплементација на ESG стандарди: еколошки, социјални и управувачки метрики, мапирање на ризици и нефинансиско известување усогласено со законските барања.",
    deliverables: [
      "ESG дијагностика и известување",
      "Еколошки и социјални индикатори",
      "Мапирање на управувањето",
      "Патоказ за усогласеност",
    ],
    icon: "leaf",
    image: images.service(6),
    featuredOnHome: true,
  },
];

/** Order used by the homepage grid — ESG is not shown there. */
const HOME_ORDER = [
  "finansiski-konsalting",
  "pristap-do-finansii",
  "biznis-konsalting",
  "marketing-i-biznis-razvoj",
  "pristap-do-pazari",
  "grantovi-i-kofinansiranje",
];

export const homeServices: Service[] = HOME_ORDER.map(
  (id) => services.find((service) => service.id === id)!,
);

export const serviceHref = (id: string) => `/mk/uslugi#${id}`;
