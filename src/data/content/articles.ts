import { defaultLocale, isLocale, languageTag, locales, type Locale } from "@/i18n/locales";

import posts from "./posts.json";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, formatted for display by `formatArticleDate`. */
  date: string;
  image: string;
  body: ArticleBlock[];
  /**
   * The country sites this post appears on, chosen in the admin panel. A post
   * written before the chooser existed has no list, and that means every
   * language — which is what those posts already did.
   */
  locales?: Locale[];
  /**
   * The language the post is actually written in, which is not the language of
   * the page it appears on: each country's editor writes in their own. Absent
   * means Macedonian, which every post was until editors outside Macedonia got
   * their own sign-in.
   */
  language?: Locale;
};

const isText = (value: unknown): value is string =>
  typeof value === "string" && value.trim() !== "";

const isBlock = (value: unknown): value is ArticleBlock => {
  const block = value as Partial<Record<"type" | "text" | "items", unknown>>;
  if (block?.type === "p" || block?.type === "h2") return isText(block.text);
  return (
    block?.type === "ul" &&
    Array.isArray(block.items) &&
    block.items.length > 0 &&
    block.items.every(isText)
  );
};

/**
 * The posts are data, not code: `posts.json` is written by the admin panel
 * (`/admin`), which commits it to the repository. The admin API validates every
 * save, but this runs at build time too, so a file that was edited by hand and
 * broken fails the build — and Cloudflare keeps the last good version live —
 * instead of publishing a page that crashes.
 */
function checkArticles(value: unknown): Article[] {
  if (!Array.isArray(value)) throw new Error("posts.json must be an array");

  const slugs = new Set<string>();
  value.forEach((post: Partial<Record<keyof Article, unknown>>, index) => {
    const where = `posts.json, post ${index + 1}`;
    if (!isText(post.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
      throw new Error(`${where}: invalid slug`);
    }
    if (slugs.has(post.slug)) throw new Error(`${where}: duplicate slug ${post.slug}`);
    slugs.add(post.slug);
    for (const field of ["title", "excerpt", "category", "image"] as const) {
      if (!isText(post[field])) throw new Error(`${where}: missing ${field}`);
    }
    if (!isText(post.date) || Number.isNaN(Date.parse(post.date))) {
      throw new Error(`${where}: invalid date`);
    }
    if (!Array.isArray(post.body) || post.body.length === 0 || !post.body.every(isBlock)) {
      throw new Error(`${where}: invalid body`);
    }
    if (
      post.locales !== undefined &&
      (!Array.isArray(post.locales) ||
        post.locales.length === 0 ||
        !post.locales.every((locale) => typeof locale === "string" && isLocale(locale)))
    ) {
      throw new Error(`${where}: invalid locales`);
    }
    if (
      post.language !== undefined &&
      (typeof post.language !== "string" || !isLocale(post.language))
    ) {
      throw new Error(`${where}: invalid language`);
    }
  });

  return value as Article[];
}

export const articles: Article[] = checkArticles(posts);

/** Newest first, matching the reference listing order. */
export const sortedArticles = [...articles].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);

/**
 * Whether a post was published to this country site. A post with no list
 * predates the chooser and belongs to all of them.
 */
export const isPublishedIn = (article: Article, locale: Locale) =>
  article.locales === undefined || article.locales.includes(locale);

/** Newest first, and only what this country site is meant to show. */
export const articlesFor = (locale: Locale) =>
  sortedArticles.filter((article) => isPublishedIn(article, locale));

/** The homepage shows the five most recent posts of its own country site. */
export const latestArticlesFor = (locale: Locale) => articlesFor(locale).slice(0, 5);

/** Only the categories that have a post here, so no filter comes up empty. */
export const categoriesFor = (locale: Locale) =>
  Array.from(new Set(articlesFor(locale).map((article) => article.category)));

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);

/** The same post on this country site, or nothing if it was not published here. */
export const getArticleIn = (locale: Locale, slug: string) => {
  const article = getArticle(slug);
  return article && isPublishedIn(article, locale) ? article : undefined;
};

/**
 * The address that represents a post to search engines. Macedonian where the
 * post was published there, and otherwise the first country site that has it —
 * a post can now be published to Serbia alone, and /mk would be a 404.
 */
export const canonicalLocaleOf = (article: Article): Locale =>
  locales.find((locale) => isPublishedIn(article, locale)) ?? locales[0];

/** What a post is written in. Everything written before the field existed is Macedonian. */
export const languageOf = (article: Article): Locale => article.language ?? defaultLocale;

const MONTHS_MK = [
  "јануари",
  "февруари",
  "март",
  "април",
  "мај",
  "јуни",
  "јули",
  "август",
  "септември",
  "октомври",
  "ноември",
  "декември",
];

/**
 * The date in the language the post is written in. Macedonian is spelled out
 * here rather than left to `Intl`, which renders it "23 септември 2026 г." —
 * correct, but not how the rest of the site has always written it.
 */
export function formatArticleDate(isoDate: string, language: Locale = defaultLocale): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (language === defaultLocale) {
    return `${date.getUTCDate()} ${MONTHS_MK[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  }
  return new Intl.DateTimeFormat(languageTag[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
