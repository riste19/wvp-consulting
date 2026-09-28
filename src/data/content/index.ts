/**
 * All visible copy, one module per page or section. Changing text on the site
 * means editing a file here — never a component.
 *
 * Every translated module has a twin per language beside it (`about.ts`,
 * `about.sq.ts`, `about.en.ts`, `about.rs.ts`, …) exporting the same names in
 * the same shape. `getContent` hands a page the set for its language, and every
 * other language's object below is typed against the Macedonian one, so a
 * missing or misshapen translation fails the build instead of rendering blank.
 *
 * Where the firm's previous site already had wording in a language, it was
 * reused. Everything else in the twins was translated for this rebuild and
 * should be read by a native speaker before launch.
 *
 * Blog posts are the exception: each is written in one language, chosen in
 * the admin panel, and appears as written wherever it is published.
 *
 * Modules inside `src/data` must import each other by direct path rather than
 * through this barrel — going via the barrel would make the two data folders
 * circular.
 */
import type { Locale } from "@/i18n/locales";

import * as aboutMk from "./about";
import * as aboutBa from "./about.ba";
import * as aboutEn from "./about.en";
import * as aboutHr from "./about.hr";
import * as aboutMe from "./about.me";
import * as aboutRs from "./about.rs";
import * as aboutSq from "./about.sq";
import * as contactMk from "./contact";
import * as contactBa from "./contact.ba";
import * as contactEn from "./contact.en";
import * as contactHr from "./contact.hr";
import * as contactMe from "./contact.me";
import * as contactRs from "./contact.rs";
import * as contactSq from "./contact.sq";
import * as heroMk from "./hero";
import * as heroBa from "./hero.ba";
import * as heroEn from "./hero.en";
import * as heroHr from "./hero.hr";
import * as heroMe from "./hero.me";
import * as heroRs from "./hero.rs";
import * as heroSq from "./hero.sq";
import * as legalMk from "./legal";
import * as legalBa from "./legal.ba";
import * as legalEn from "./legal.en";
import * as legalHr from "./legal.hr";
import * as legalMe from "./legal.me";
import * as legalRs from "./legal.rs";
import * as legalSq from "./legal.sq";
import * as programmesMk from "./programmes";
import * as programmesBa from "./programmes.ba";
import * as programmesEn from "./programmes.en";
import * as programmesHr from "./programmes.hr";
import * as programmesMe from "./programmes.me";
import * as programmesRs from "./programmes.rs";
import * as programmesSq from "./programmes.sq";
import * as servicesMk from "./services";
import * as servicesBa from "./services.ba";
import * as servicesEn from "./services.en";
import * as servicesHr from "./services.hr";
import * as servicesMe from "./services.me";
import * as servicesRs from "./services.rs";
import * as servicesSq from "./services.sq";
import * as statsMk from "./stats";
import * as statsBa from "./stats.ba";
import * as statsEn from "./stats.en";
import * as statsHr from "./stats.hr";
import * as statsMe from "./stats.me";
import * as statsRs from "./stats.rs";
import * as statsSq from "./stats.sq";
import * as uiMk from "./ui";
import * as uiBa from "./ui.ba";
import * as uiEn from "./ui.en";
import * as uiHr from "./ui.hr";
import * as uiMe from "./ui.me";
import * as uiRs from "./ui.rs";
import * as uiSq from "./ui.sq";

const mk = {
  ...aboutMk,
  ...contactMk,
  ...heroMk,
  ...legalMk,
  ...programmesMk,
  ...servicesMk,
  ...statsMk,
  ...uiMk,
};

type Content = typeof mk;

const sq: Content = {
  ...aboutSq,
  ...contactSq,
  ...heroSq,
  ...legalSq,
  ...programmesSq,
  ...servicesSq,
  ...statsSq,
  ...uiSq,
};

const en: Content = {
  ...aboutEn,
  ...contactEn,
  ...heroEn,
  ...legalEn,
  ...programmesEn,
  ...servicesEn,
  ...statsEn,
  ...uiEn,
};

const rs: Content = {
  ...aboutRs,
  ...contactRs,
  ...heroRs,
  ...legalRs,
  ...programmesRs,
  ...servicesRs,
  ...statsRs,
  ...uiRs,
};

const ba: Content = {
  ...aboutBa,
  ...contactBa,
  ...heroBa,
  ...legalBa,
  ...programmesBa,
  ...servicesBa,
  ...statsBa,
  ...uiBa,
};

const me: Content = {
  ...aboutMe,
  ...contactMe,
  ...heroMe,
  ...legalMe,
  ...programmesMe,
  ...servicesMe,
  ...statsMe,
  ...uiMe,
};

const hr: Content = {
  ...aboutHr,
  ...contactHr,
  ...heroHr,
  ...legalHr,
  ...programmesHr,
  ...servicesHr,
  ...statsHr,
  ...uiHr,
};

const content: Record<Locale, Content> = { mk, sq, en, rs, ba, me, hr };

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
  articles,
  articlesFor,
  canonicalLocaleOf,
  categoriesFor,
  formatArticleDate,
  getArticle,
  getArticleIn,
  isPublishedIn,
  languageOf,
  latestArticlesFor,
  sortedArticles,
  type Article,
  type ArticleBlock,
} from "./articles";
export type { ContactMethod } from "./contact";
export type { HeroSlide } from "./hero";
export type { LegalDocument, LegalSection } from "./legal";
export type { Programme } from "./programmes";
export { serviceHref, type Service } from "./services";
export type { Stat } from "./stats";
export type { ContactFormCopy } from "./ui";
