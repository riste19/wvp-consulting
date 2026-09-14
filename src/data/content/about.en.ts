import type * as Mk from "./about";
import type { OfferGroup, RegionalOffice, TimelineEntry, Value } from "./about";

/** English twin of `about.ts`: same exports, same shape, same order. */

export const aboutIntro: typeof Mk.aboutIntro = {
  heading: "Who we are",
  paragraphs: [
    "WVP Plus Consulting is part of the renowned Austrian WVP GROUP, with a tradition dating back to 1985. Headquartered in Graz, Austria, the group is now present in 10 countries across Southeastern Europe, bringing expertise, trust and innovative solutions in financial consulting.",
    "The group has been active in Macedonia since 2005, while WVP Plus Consulting started operating in 2019 as the third company of the group (out of six in total) present on the Macedonian market.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    company: "WVP Plus Consulting LLC",
    location: "Skopje, Republic of North Macedonia",
    note: "Parent company",
  },
  {
    year: "2022",
    company: "WVP Plus Consulting LLC",
    location: "Belgrade, Republic of Serbia",
  },
  {
    year: "2023",
    company: "WVP Accounting LLC",
    location: "Skopje, Republic of North Macedonia",
  },
  {
    year: "2024",
    company: "WVP Plus Consulting LLC",
    location: "Brčko, Bosnia and Herzegovina",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting LLC",
    location: "Podgorica, Montenegro",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting LLC",
    location: "Rijeka, Republic of Croatia",
  },
];

export const regionalOffices: RegionalOffice[] = [
  { id: "North_Macedonia", name: "North Macedonia", href: "/en" },
  { id: "Serbia", name: "Serbia", href: "/rs" },
  { id: "Bosnia_and_Herzegovina", name: "Bosnia and Herzegovina", href: "/ba" },
  { id: "Montenegro", name: "Montenegro", href: "/me" },
  { id: "Croatia", name: "Croatia", href: "/hr" },
];

export const regionalMap: typeof Mk.regionalMap = {
  heading: "Regional development",
  hint: "Click a country to visit its website",
  mapLabel: "Map of the countries where the group operates",
  dialogTitle: "Redirecting…",
  dialogBody: "Taking you to the website for",
  countdown: "Redirecting in",
  secondsSuffix: "s",
  cancel: "Cancel",
};

export const offerGroups: OfferGroup[] = [
  {
    title: "Access to finance",
    icon: "walletCards",
    items: [
      "Grants and co-financing",
      "Banking credit products",
      "Leasing",
      "Factoring",
      "Government support instruments",
      "Non-banking financial support",
      "Mergers and acquisitions",
      "Equity crowdfunding",
      "Business angels",
      "Capital instruments",
    ],
  },
  {
    title: "Market access",
    icon: "globe",
    items: [
      "Company digitalization",
      "Energy efficiency audit (PiNE model)",
      "Circular economy development",
      "Employee protection matrix",
      "Export strategy and planning",
      "Product design and development",
      "Marketing strategy and branding",
      "Financial capacity diagnostics",
    ],
  },
  {
    title: "Specialized reports",
    icon: "fileText",
    items: [
      "Business plans",
      "Investment programmes",
      "Due diligence",
      "Cost-benefit analysis",
    ],
  },
];

export const missionStatement: string =
  "Our mission is to provide companies and citizens with full access to finance, increasing their competitiveness and sustainability.";

export const values: Value[] = [
  {
    title: "Results-oriented",
    description:
      "We focus on delivering measurable outcomes and tangible value to our clients.",
    icon: "target",
  },
  {
    title: "Client-centric",
    description:
      "Your success is our priority. We build long-term partnerships based on trust.",
    icon: "handshake",
  },
  {
    title: "Excellence",
    description:
      "We maintain the highest standards of professionalism and expertise.",
    icon: "award",
  },
  {
    title: "Innovation",
    description:
      "We use modern technologies and methodologies to achieve results.",
    icon: "lightbulb",
  },
];

export const teamSection: typeof Mk.teamSection = {
  eyebrow: "OUR TEAM",
  heading: "The largest team of experts",
  paragraphs: [
    "Our multidisciplinary team brings extensive experience in financial consulting and investment development across a range of industries, with a particular focus on manufacturing companies, the agricultural sector, rural development, tourism and “green investments”. We help clients access government financial support programmes and European Union funds, and turn their ideas into sustainable, completed investments. Our task is to build sustainable growth and export-oriented companies together.",
    "For our clients — we are partners in the growth process.",
  ],
  ctaLabel: "Book a meeting",
  ctaHref: "/en/kontakt",
};

export const careers: typeof Mk.careers = {
  heading: "Join our team",
  description:
    "We are always looking for talented professionals who want to grow with us.",
  ctaLabel: "Contact us",
  ctaHref: "/en/kontakt",
};
