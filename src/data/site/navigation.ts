import { serviceHref, services } from "@/data/content/services";

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  /** Rendered as a hover/focus dropdown in the desktop header. */
  children?: NavLink[];
  /** The reference separates the last item with a vertical rule. */
  separatorBefore?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "ПОЧЕТНА", href: "/mk" },
  {
    label: "УСЛУГИ",
    href: "/mk/uslugi",
    children: [
      ...services.map((service) => ({
        label: service.title,
        href: serviceHref(service.id),
      })),
      { label: "Актуелни програми и повици", href: "/mk/programi" },
    ],
  },
  { label: "ЗА НАС", href: "/mk/za-nas" },
  { label: "КОНТАКТ", href: "/mk/kontakt" },
  { label: "ФИНАНСИСКИ СОВЕТИ", href: "/mk/blog", separatorBefore: true },
];

/** The mobile panel uses sentence case, matching the reference. */
export const mobileNav: NavItem[] = [
  { label: "Почетна", href: "/mk" },
  {
    label: "Услуги",
    href: "/mk/uslugi",
    children: primaryNav[1].children,
  },
  { label: "Финансиски совети", href: "/mk/blog" },
  { label: "За нас", href: "/mk/za-nas" },
  { label: "Контакт", href: "/mk/kontakt" },
];

export const languages = [{ code: "MK", label: "Македонски", href: "/mk" }];
