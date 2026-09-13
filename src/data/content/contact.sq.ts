import { company, companyText } from "@/data/site/company";

import type * as Mk from "./contact";
import type { ContactMethod } from "./contact";

/** Albanian twin of `contact.ts`. */

export const contactMethods: ContactMethod[] = [
  {
    title: "Mbështetje telefonike",
    description: "Bisedoni drejtpërdrejt me konsulentët tanë",
    highlights: [...company.phones],
    note: companyText.sq.workingHours,
    icon: "phone",
    href: `tel:${company.phones[0].replace(/\s/g, "")}`,
  },
  {
    title: "Mbështetje me e-postë",
    description: "Merrni përgjigje të detajuara për pyetjet tuaja",
    highlights: [company.email],
    note: "Përgjigjemi brenda 24 orëve",
    icon: "mail",
    href: `mailto:${company.email}`,
  },
  {
    title: "Konsultime në person",
    description: "Caktoni një takim në zyrat tona",
    highlights: ["E disponueshme në zyrat tona"],
    note: "Vetëm me caktim paraprak",
    icon: "users",
  },
  {
    title: "Konsultime online",
    description: "Video thirrje për klientë në distancë",
    highlights: ["Zoom, Teams ose platforma e preferuar"],
    note: "Caktim fleksibël",
    icon: "calendarDays",
  },
];

export const contactIntro: typeof Mk.contactIntro = {
  title: "A jeni gati ta çoni biznesin tuaj në nivelin e ardhshëm?",
  subtitle: "Kontaktoni ekipin tonë të profesionistëve që sot",
  formHeading: "Bëni një pyetje — zgjidhni dilemën",
  methodsHeading: "Si mund t'ju ndihmojmë?",
  methodsSubtitle: "Zgjidhni mënyrën më të përshtatshme për kontakt me ekipin tonë",
};
