/**
 * Kept out of `navigation.ts` on purpose. The language selector is a client
 * component, and `navigation.ts` derives its dropdown from
 * `@/data/content/services` — importing the two together would pull the whole
 * services catalogue across the client boundary on every page.
 */
export const languages = [{ code: "MK", label: "Македонски", href: "/mk" }];
