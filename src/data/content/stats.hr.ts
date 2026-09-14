import type * as Mk from "./stats";
import type { Stat } from "./stats";

/** Croatian twin of `stats.ts`. The figures follow the Macedonian page. */

export const statsHeading: typeof Mk.statsHeading = {
  title: "Naši uspjesi u sklopu grupacije",
  subtitle:
    "Zajedno s našim klijentima postižemo izvanredne rezultate u svim sektorima!",
  footnote: "*do 30. 6. 2026.",
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
    label: "Isplaćena bespovratna sredstva",
    description: "Više od 40 milijuna eura isplaćenih bespovratnih sredstava",
  },
  {
    value: 93,
    prefix: "€",
    suffix: "M",
    label: "Isplaćeni krediti",
    description: "Više od 93 milijuna eura isplaćenih kredita",
  },
];
