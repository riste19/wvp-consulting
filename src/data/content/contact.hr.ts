import { company, companyText } from "@/data/site/company";

import type * as Mk from "./contact";
import type { ContactMethod } from "./contact";

/** Croatian twin of `contact.ts`. */

export const contactMethods: ContactMethod[] = [
  {
    title: "Telefonska podrška",
    description: "Razgovarajte izravno s našim savjetnicima",
    highlights: [...company.phones],
    note: companyText.hr.workingHours,
    icon: "phone",
    href: `tel:${company.phones[0].replace(/\s/g, "")}`,
  },
  {
    title: "Podrška e-poštom",
    description: "Dobijte detaljne odgovore na svoja pitanja",
    highlights: [company.email],
    note: "Odgovaramo u roku od 24 sata",
    icon: "mail",
    href: `mailto:${company.email}`,
  },
  {
    title: "Osobne konzultacije",
    description: "Dogovorite sastanak u našim uredima",
    highlights: ["Dostupno u našim uredima"],
    note: "Samo uz prethodni dogovor",
    icon: "users",
  },
  {
    title: "Online konzultacije",
    description: "Videopozivi za klijente na daljinu",
    highlights: ["Zoom, Teams ili platforma po vašem izboru"],
    note: "Fleksibilno zakazivanje",
    icon: "calendarDays",
  },
];

export const contactIntro: typeof Mk.contactIntro = {
  title: "Spremni podići svoje poslovanje na višu razinu?",
  subtitle: "Javite se našem timu stručnjaka već danas",
  formHeading: "Postavite pitanje — riješite dilemu",
  methodsHeading: "Kako vam možemo pomoći?",
  methodsSubtitle: "Odaberite najprikladniji način da kontaktirate naš tim",
};
