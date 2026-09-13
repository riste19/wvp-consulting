import { images } from "@/data/site/images";

import type * as Mk from "./hero";
import type { HeroSlide } from "./hero";

/** English twin of `hero.ts`. */

export { HERO_INTERVAL } from "./hero";

export const heroSlides: HeroSlide[] = [
  {
    title: "For our clients we choose the best!",
    subtitle: "over 4,500 clients",
    image: images.hero[0],
    imageAlt: "The business building that houses the company's offices",
  },
  {
    title: "Our way of working",
    subtitle:
      "See how we work and why our approach delivers the best results",
    image: images.hero[1],
    imageAlt: "Reception at the WVP Plus Consulting office",
  },
  {
    title: "Experts in the field of finance",
    subtitle:
      "Strategic business planning and financial advisory services to accelerate your growth",
    image: images.hero[2],
    imageAlt: "WVP Plus Consulting consultants at a business meeting",
  },
];

export const heroActions: typeof Mk.heroActions = {
  primary: { label: "Contact", href: "/en/kontakt" },
  secondary: { label: "Services", href: "/en/uslugi" },
};
