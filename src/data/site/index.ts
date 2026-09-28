/**
 * Site-wide wiring: who we are, how the site is linked together, where the
 * images live. Used by nearly every route.
 *
 * Modules inside `src/data` must import each other by direct path rather than
 * through this barrel — going via the barrel would make the two data folders
 * circular.
 */
export {
  company,
  companyText,
  currentYear,
  linkedinByLocale,
  type CompanyText,
} from "./company";
export { getFooterColumns, getLegalLinks, type FooterColumn } from "./footer";
export { images, imageSizes } from "./images";
export { languages, type Language } from "./languages";
export {
  getMobileNav,
  getPrimaryNav,
  type NavItem,
  type NavLink,
} from "./navigation";
