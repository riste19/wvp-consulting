/**
 * The site's languages.
 *
 * Client-safe on purpose — no data and no server-only imports — so the header
 * and the language switcher can use it without pulling content into the
 * browser bundle.
 *
 * Every page lives under its locale with the same slug in each: /mk/uslugi and
 * /sq/uslugi. Macedonian is the default, and the only language the blog and
 * the legal pages are written in.
 */
export const locales = ["mk", "sq", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "mk";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

const PREFIX = new RegExp(`^/(?:${locales.join("|")})(?=[/?#]|$)`);

/** The locale a path belongs to: "/sq/uslugi" → "sq". Unprefixed paths are Macedonian. */
export function localeFromPath(path: string): Locale {
  const first = path.split("/")[1] ?? "";
  return isLocale(first) ? first : defaultLocale;
}

/**
 * The same page in another language: "/mk/uslugi" → "/sq/uslugi". A path with
 * no locale (the root 404) goes to that language's home page.
 */
export function switchLocale(path: string, locale: Locale): string {
  return PREFIX.test(path) ? path.replace(PREFIX, `/${locale}`) : `/${locale}`;
}

/** The route without its locale: "/sq/uslugi" → "/uslugi", "/sq" → "/". */
export function stripLocale(path: string): string {
  return path.replace(PREFIX, "") || "/";
}

export const ogLocale: Record<Locale, string> = {
  mk: "mk_MK",
  sq: "sq_MK",
  en: "en_US",
};

/**
 * Canonical and hreflang links for a page that exists in every language.
 * `path` excludes the locale: "" for the home page, "/uslugi" otherwise.
 */
export function localeAlternates(locale: Locale, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(
      locales.map((language) => [language, `/${language}${path}`]),
    ),
  };
}
