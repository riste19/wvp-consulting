import type { Locale } from "@/i18n/locales";

/**
 * Kept out of `navigation.ts` on purpose. The language selector is a client
 * component, and `navigation.ts` derives its dropdown from
 * `@/data/content/services` — importing the two together would pull the whole
 * services catalogue across the client boundary on every page.
 */
export type Language = {
  locale: Locale;
  code: string;
  /** The language's name, written in that language. */
  label: string;
  /** The word "language" in that language, for the switcher's accessible name. */
  languageWord: string;
};

export const languages: Language[] = [
  { locale: "mk", code: "MK", label: "Македонски", languageWord: "Јазик" },
  { locale: "sq", code: "SQ", label: "Shqip", languageWord: "Gjuha" },
];
