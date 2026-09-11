/**
 * All visible copy, one module per page or section. Changing text on the site
 * means editing a file here — never a component.
 *
 * Modules inside `src/data` must import each other by direct path rather than
 * through this barrel — going via the barrel would make the two data folders
 * circular.
 */
export {
  aboutIntro,
  careers,
  missionStatement,
  offerGroups,
  teamSection,
  timeline,
  values,
  type OfferGroup,
  type TimelineEntry,
  type Value,
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
export { contactIntro, contactMethods, type ContactMethod } from "./contact";
export {
  HERO_INTERVAL,
  heroActions,
  heroSlides,
  type HeroSlide,
} from "./hero";
export {
  privacyPolicy,
  termsOfUse,
  type LegalDocument,
  type LegalSection,
} from "./legal";
export {
  programmeProcess,
  programmeStatusLabel,
  programmes,
  programmesIntro,
  type Programme,
} from "./programmes";
export {
  homeServices,
  serviceHref,
  services,
  type Service,
} from "./services";
export { stats, statsHeading, type Stat } from "./stats";
