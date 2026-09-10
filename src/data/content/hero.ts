import { images } from "@/data/site/images";

export type HeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  /** Descriptive alt text for the slide's background photograph. */
  imageAlt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    title: "За клиентите го бираме најдоброто!",
    subtitle: "преку 4500 клиенти",
    image: images.hero[0],
    imageAlt: "Деловна зграда во која се наоѓаат канцелариите на компанијата",
  },
  {
    title: "Нашиот начин на работа",
    subtitle:
      "Запознајте се како работиме и зошто нашиот пристап дава најдобри резултати",
    image: images.hero[1],
    imageAlt: "Рецепција во канцеларијата на ВФП Плус Консалтинг",
  },
  {
    title: "Експерти во областа на финансиите",
    subtitle:
      "Стратешко бизнис планирање и финансиски советодавни услуги за забрзување на вашиот раст",
    image: images.hero[2],
    imageAlt: "Консултанти од тимот на ВФП Плус Консалтинг во работна средба",
  },
];

export const heroActions = {
  primary: { label: "Контакт", href: "/mk/kontakt" },
  secondary: { label: "Услуги", href: "/mk/uslugi" },
};

/** Autoplay interval, in milliseconds. */
export const HERO_INTERVAL = 6000;
