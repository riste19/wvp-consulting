/**
 * All visible copy, one module per page or section. Changing text on the site
 * means editing a file here — never a component.
 *
 * Every translated module has an Albanian twin beside it (`about.ts` and
 * `about.sq.ts`) exporting the same names in the same shape. `getContent`
 * hands a page the set for its language, and the `sq` object below is typed
 * against the Macedonian one, so a missing or misshapen translation fails the
 * build instead of rendering blank.
 *
 * Where the firm's previous site already had Albanian wording, it was reused.
 * Everything else in the `.sq.ts` files was translated for this rebuild and
 * should be read by a native speaker before launch.
 *
 * The blog and the legal documents are Macedonian only, in every language.
 *
 * Modules inside `src/data` must import each other by direct path rather than
 * through this barrel — going via the barrel would make the two data folders
 * circular.
 */
import type { Locale } from "@/i18n/locales";

import * as aboutMk from "./about";
import * as aboutSq from "./about.sq";
import * as contactMk from "./contact";
import * as contactSq from "./contact.sq";
import * as heroMk from "./hero";
import * as heroSq from "./hero.sq";
import * as programmesMk from "./programmes";
import * as programmesSq from "./programmes.sq";
import * as servicesMk from "./services";
import * as servicesSq from "./services.sq";
import * as statsMk from "./stats";
import * as statsSq from "./stats.sq";
import * as uiMk from "./ui";
import * as uiSq from "./ui.sq";

const mk = {
  ...aboutMk,
  ...contactMk,
  ...heroMk,
  ...programmesMk,
  ...servicesMk,
  ...statsMk,
  ...uiMk,
};

const sq: typeof mk = {
  ...aboutSq,
  ...contactSq,
  ...heroSq,
  ...programmesSq,
  ...servicesSq,
  ...statsSq,
  ...uiSq,
};

const content: Record<Locale, typeof mk> = { mk, sq };

/** Every translated string on the site, in one language. Server components only. */
export const getContent = (locale: Locale) => content[locale];

export type {
  OfferGroup,
  RegionalOffice,
  TimelineEntry,
  Value,
} from "./about";
export { categoryTone } from "./categories";
export {
  articleCategories,
  articles,
  formatArticleDate,
  getArticle,
  latestArticles,
  sortedArticles,
  type Article,
  type ArticleBlock,
} from "./articles";
export type { ContactMethod } from "./contact";
export type { HeroSlide } from "./hero";
export {
  privacyPolicy,
  termsOfUse,
  type LegalDocument,
  type LegalSection,
} from "./legal";
export type { Programme } from "./programmes";
export { serviceHref, type Service } from "./services";
export type { Stat } from "./stats";
export type { ContactFormCopy } from "./ui";
