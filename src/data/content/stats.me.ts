import type * as Mk from "./stats";
import type { Stat } from "./stats";

/** Montenegrin twin of `stats.ts`. The figures follow the Macedonian page. */

export const statsHeading: typeof Mk.statsHeading = {
  title: "Naši uspjesi u okviru grupacije",
  subtitle:
    "Zajedno sa našim klijentima postižemo izuzetne rezultate u svim sektorima!",
  footnote: "*do 30.06.2026",
};

export const stats: Stat[] = [
  {
    value: 4650,
    label: "Uspješno završeni projekti",
    description: "Više od 4.650 uspješno završenih projekata",
  },
  {
    value: 40,
    prefix: "€",
    suffix: "M",
    label: "Isplaćeni grantovi",
    description: "Više od 40 miliona eura isplaćenih grantova",
  },
  {
    value: 93,
    prefix: "€",
    suffix: "M",
    label: "Isplaćeni krediti",
    description: "Više od 93 miliona eura isplaćenih finansijskih kredita",
  },
];
