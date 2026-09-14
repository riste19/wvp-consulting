import { company, companyText } from "@/data/site/company";

import type * as Mk from "./contact";
import type { ContactMethod } from "./contact";

/** Bosnian twin of `contact.ts`. */

export const contactMethods: ContactMethod[] = [
  {
    title: "Telefonska podrška",
    description: "Razgovarajte direktno sa našim savjetnicima",
    highlights: [...company.phones],
    note: companyText.ba.workingHours,
    icon: "phone",
    href: `tel:${company.phones[0].replace(/\s/g, "")}`,
  },
  {
    title: "Email podrška",
    description: "Dobijte detaljne odgovore na vaša pitanja",
    highlights: [company.email],
    note: "Odgovaramo u roku od 24 sata",
    icon: "mail",
    href: `mailto:${company.email}`,
  },
  {
    title: "Lična konsultacija",
    description: "Zakažite sastanak u našim kancelarijama",
    highlights: ["Dostupno u našim kancelarijama"],
    note: "Samo po dogovoru",
    icon: "users",
  },
  {
    title: "Online konsultacija",
    description: "Video pozivi za klijente na daljinu",
    highlights: ["Zoom, Teams ili platforma po vašem izboru"],
    note: "Fleksibilno zakazivanje",
    icon: "calendarDays",
  },
];

export const contactIntro: typeof Mk.contactIntro = {
  title: "Spremni da odvedete svoj biznis na viši nivo?",
  subtitle: "Stupite u kontakt sa našim timom stručnjaka već danas",
  formHeading: "Postavite pitanje — riješite dilemu",
  methodsHeading: "Kako vam možemo pomoći?",
  methodsSubtitle: "Izaberite najpogodniji način da kontaktirate naš tim",
};
