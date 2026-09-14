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
  });

  return value as Article[];
}

export const articles: Article[] = checkArticles(posts);

/** Newest first, matching the reference listing order. */
export const sortedArticles = [...articles].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);

/** The homepage shows the five most recent posts. */
export const latestArticles = sortedArticles.slice(0, 5);

export const articleCategories = Array.from(
  new Set(articles.map((article) => article.category)),
);

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);

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

export function formatArticleDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return `${date.getUTCDate()} ${MONTHS_MK[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
