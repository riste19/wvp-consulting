import type * as Mk from "./stats";
import type { Stat } from "./stats";

/**
 * Albanian twin of `stats.ts`.
 *
 * The figures follow the Macedonian page, which the firm has confirmed. The
 * previous site's Albanian text still carried older numbers (4.300, €35M,
 * €80M, 31.12.2025) — do not copy those back in.
 */

export const statsHeading: typeof Mk.statsHeading = {
  title: "Arritjet tona në nivel Grupi",
  subtitle:
    "Së bashku me klientët tanë, arrijmë rezultate të jashtëzakonshme në të gjithë sektorët!",
  footnote: "*deri më 30.06.2026",
};

export const stats: Stat[] = [
  {
    value: 4650,
    label: "Projekte të përfunduara me sukses",
    description: "Mbi 4.650 projekte të përfunduara me sukses",
  },
  {
    value: 40,
    prefix: "€",
    suffix: "M",
    label: "Grante të paguara",
    description: "Mbi 40 milionë euro në grante të paguara",
  },
  {
    value: 93,
    prefix: "€",
    suffix: "M",
    label: "Kredi të paguara",
    description: "Mbi 93 milionë euro në kredi financiare të paguara",
  },
];
