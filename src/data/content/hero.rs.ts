import { images } from "@/data/site/images";

import type * as Mk from "./hero";
import type { HeroSlide } from "./hero";

/** Serbian (Latin) twin of `hero.ts`. */

export { HERO_INTERVAL } from "./hero";

export const heroSlides: HeroSlide[] = [
  {
    title: "Za klijente biramo najbolje!",
    subtitle: "više od 4.500 klijenata",
    image: images.hero[0],
    imageAlt: "Poslovna zgrada u kojoj se nalaze kancelarije kompanije",
  },
  {
    title: "Naš način rada",
    subtitle:
      "Upoznajte način na koji radimo i zašto naš pristup daje najbolje rezultate",
    image: images.hero[1],
    imageAlt: "Recepcija u kancelariji WVP Plus Consulting",
  },
  {
    title: "Eksperti u oblasti finansija",
    subtitle:
      "Strateško planiranje poslovanja i finansijski saveti za ubrzan rast vašeg biznisa",
    image: images.hero[2],
    imageAlt: "Konsultanti WVP Plus Consulting na poslovnom sastanku",
  },
];

export const heroActions: typeof Mk.heroActions = {
  primary: { label: "Kontakt", href: "/rs/kontakt" },
  secondary: { label: "Usluge", href: "/rs/uslugi" },
};
