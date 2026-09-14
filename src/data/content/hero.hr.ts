import { images } from "@/data/site/images";

import type * as Mk from "./hero";
import type { HeroSlide } from "./hero";

/** Croatian twin of `hero.ts`. */

export { HERO_INTERVAL } from "./hero";

export const heroSlides: HeroSlide[] = [
  {
    title: "Za klijente biramo najbolje!",
    subtitle: "više od 4.500 klijenata",
    image: images.hero[0],
    imageAlt: "Poslovna zgrada u kojoj se nalaze uredi tvrtke",
  },
  {
    title: "Naš način rada",
    subtitle:
      "Upoznajte kako radimo i saznajte zašto naš pristup daje najbolje rezultate",
    image: images.hero[1],
    imageAlt: "Recepcija u uredu WVP Plus Consulting",
  },
  {
    title: "Stručnjaci u području financija",
    subtitle:
      "Strateško poslovno planiranje i financijsko savjetovanje za ubrzanje vašeg rasta",
    image: images.hero[2],
    imageAlt: "Savjetnici WVP Plus Consulting na poslovnom sastanku",
  },
];

export const heroActions: typeof Mk.heroActions = {
  primary: { label: "Kontakt", href: "/hr/kontakt" },
  secondary: { label: "Usluge", href: "/hr/uslugi" },
};
