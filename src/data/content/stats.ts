export type Stat = {
  /** Final value the counter animates towards. */
  value: number;
  /** Rendered before the number, e.g. the euro sign. */
  prefix?: string;
  /** Rendered immediately after the number, e.g. the millions marker. */
  suffix?: string;
  label: string;
  description: string;
};

export const statsHeading = {
  title: "Нашите достигнувања на ниво на Групација",
  subtitle:
    "Заедно со нашите клиенти, постигнуваме исклучителни резултати во сите сектори!",
  footnote: "*до 30.06.2026",
};

export const stats: Stat[] = [
  {
    value: 4650,
    label: "Успешно завршени проекти",
    description: "Над 4.650 успешно завршени проекти",
  },
  {
    value: 40,
    prefix: "€",
    suffix: "M",
    label: "Исплатени грантови",
    description: "Над 40 милиони евра во исплатени грантови",
  },
  {
    value: 93,
    prefix: "€",
    suffix: "M",
    label: "Исплатени кредити",
    description: "Над 93 милиони евра во исплатени финансиски кредити",
  },
];
