/**
 * Category chips. Only "Туризам" carries an accent colour, matching the
 * reference; every other category uses the muted chip.
 *
 * Kept out of `articles.ts` on purpose. `CategoryChip` is rendered inside the
 * client-side `ArticleGrid`, and `articles.ts` builds its image paths at module
 * scope — so nothing in it can be tree-shaken away. Reading this three-line map
 * from there shipped the entire article corpus, body prose and all, as
 * JavaScript to the homepage and every blog page.
 */
export const categoryTone: Record<string, "muted" | "accent"> = {
  Туризам: "accent",
};
