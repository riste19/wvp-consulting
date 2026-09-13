import type * as Mk from "./stats";
import type { Stat } from "./stats";

/**
 * English twin of `stats.ts`.
 *
 * The figures follow the Macedonian page, which the firm has confirmed. The
 * previous site's English text still carried older numbers (4,300, €35M,
 * €80M, 31.12.2025) — do not copy those back in.
 */

export const statsHeading: typeof Mk.statsHeading = {
  title: "Our achievements at Group level",
  subtitle:
    "Together with our clients, we achieve exceptional results across all sectors!",
  footnote: "*as of 30.06.2026",
};

export const stats: Stat[] = [
  {
    value: 4650,
    label: "Successfully completed projects",
    description: "Over 4,650 successfully completed projects",
  },
  {
    value: 40,
    prefix: "€",
    suffix: "M",
    label: "Grants paid out",
    description: "Over 40 million euros in grants paid out",
  },
  {
    value: 93,
    prefix: "€",
    suffix: "M",
    label: "Loans paid out",
    description: "Over 93 million euros in financial loans paid out",
  },
];
