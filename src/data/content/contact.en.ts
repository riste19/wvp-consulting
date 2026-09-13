import { company, companyText } from "@/data/site/company";

import type * as Mk from "./contact";
import type { ContactMethod } from "./contact";

/** English twin of `contact.ts`. */

export const contactMethods: ContactMethod[] = [
  {
    title: "Phone support",
    description: "Speak directly with our consultants",
    highlights: [...company.phones],
    note: companyText.en.workingHours,
    icon: "phone",
    href: `tel:${company.phones[0].replace(/\s/g, "")}`,
  },
  {
    title: "Email support",
    description: "Get detailed answers to your questions",
    highlights: [company.email],
    note: "We reply within 24 hours",
    icon: "mail",
    href: `mailto:${company.email}`,
  },
  {
    title: "In-person consultation",
    description: "Book a meeting at our offices",
    highlights: ["Available at our offices"],
    note: "By appointment only",
    icon: "users",
  },
  {
    title: "Online consultation",
    description: "Video calls for remote clients",
    highlights: ["Zoom, Teams or your preferred platform"],
    note: "Flexible scheduling",
    icon: "calendarDays",
  },
];

export const contactIntro: typeof Mk.contactIntro = {
  title: "Ready to take your business to the next level?",
  subtitle: "Get in touch with our team of experts today",
  formHeading: "Ask a question — solve your dilemma",
  methodsHeading: "How can we help you?",
  methodsSubtitle: "Choose the most convenient way to reach our team",
};
