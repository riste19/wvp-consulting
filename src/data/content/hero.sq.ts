import { images } from "@/data/site/images";

import type * as Mk from "./hero";
import type { HeroSlide } from "./hero";

/** Albanian twin of `hero.ts`. */

export { HERO_INTERVAL } from "./hero";

export const heroSlides: HeroSlide[] = [
  {
    title: "Për klientët zgjedhim më të mirën!",
    subtitle: "mbi 4500 klientë",
    image: images.hero[0],
    imageAlt: "Ndërtesa e biznesit ku ndodhen zyrat e kompanisë",
  },
  {
    title: "Mënyra jonë e punës",
    subtitle:
      "Njihuni me mënyrën tonë të punës dhe pse qasja jonë jep rezultatet më të mira",
    image: images.hero[1],
    imageAlt: "Recepsioni në zyrën e WVP Plus Consulting",
  },
  {
    title: "Ekspertë në fushën e financave",
    subtitle:
      "Planifikim strategjik i biznesit dhe shërbime këshilluese financiare për përshpejtimin e rritjes suaj",
    image: images.hero[2],
    imageAlt: "Konsulentë nga ekipi i WVP Plus Consulting në një takim pune",
  },
];

export const heroActions: typeof Mk.heroActions = {
  primary: { label: "Kontakti", href: "/sq/kontakt" },
  secondary: { label: "Shërbimet", href: "/sq/uslugi" },
};
