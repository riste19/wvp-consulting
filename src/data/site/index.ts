/**
 * Site-wide wiring: who we are, how the site is linked together, where the
 * images live. Used by nearly every route.
 *
 * Modules inside `src/data` must import each other by direct path rather than
 * through this barrel — going via the barrel would make the two data folders
 * circular.
 */
export { company, currentYear } from "./company";
export { footerColumns, legalLinks, type FooterColumn } from "./footer";
export { images, imageSizes } from "./images";
export { languages } from "./languages";
export {
  mobileNav,
  primaryNav,
  type NavItem,
  type NavLink,
} from "./navigation";
