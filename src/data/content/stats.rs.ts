import type * as Mk from "./stats";
import type { Stat } from "./stats";

/** Serbian (Latin) twin of `stats.ts`. The figures follow the Macedonian page. */

export const statsHeading: typeof Mk.statsHeading = {
  title: "Naša dostignuća u okviru grupacije",
  subtitle:
    "Zajedno sa našim klijentima postižemo izuzetne rezultate u svim sektorima!",
  footnote: "*do 30.06.2026",
};

export const stats: Stat[] = [
  {
    value: 4650,
    label: "Uspešno realizovani projekti",
    description: "Više od 4.650 uspešno realizovanih projekata",
  },
  {
    value: 40,
    prefix: "€",
    suffix: "M",
    label: "Isplaćeni grantovi",
    description: "Više od 40 miliona evra isplaćenih grantova",
  },
  {
    value: 93,
    prefix: "€",
    suffix: "M",
    label: "Isplaćeni krediti",
    description: "Više od 93 miliona evra isplaćenih finansijskih kredita",
  },
];
