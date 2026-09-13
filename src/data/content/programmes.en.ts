import type * as Mk from "./programmes";
import type { Programme } from "./programmes";

/** English twin of `programmes.ts`. Ids and statuses are shared. */

export const programmeStatusLabel: typeof Mk.programmeStatusLabel = {
  otvoren: "Open call",
  najaven: "Announced call",
  zatvoren: "Closed call",
};

export const programmes: Programme[] = [
  {
    id: "ipard-3-merka-1",
    name: "IPARD 3 — Measure 1",
    funder: "European Union / Agency for Financial Support",
    coRate: "up to 75%",
    maxAmount: "up to €750,000",
    deadline: "Ongoing, once the public call is announced",
    sectors: ["Agriculture", "Livestock", "Fruit growing"],
    description:
      "Investments in the fixed assets of agricultural holdings: machinery, new plantations, irrigation systems, storage facilities and photovoltaic systems for own consumption.",
    status: "otvoren",
  },
  {
    id: "ipard-3-merka-3",
    name: "IPARD 3 — Measure 3",
    funder: "European Union / Agency for Financial Support",
    coRate: "up to 60%",
    maxAmount: "up to €1,500,000",
    deadline: "Ongoing, once the public call is announced",
    sectors: ["Food industry", "Processing", "Export"],
    description:
      "Investments in processing and marketing agricultural products — production lines, cold storage, quality control laboratories and certification for export markets.",
    status: "otvoren",
  },
  {
    id: "fond-za-inovacii",
    name: "INOVA — Fund for Innovation and Technology Development",
    funder: "Fund for Innovation and Technology Development",
    coRate: "up to 70%",
    maxAmount: "up to €100,000",
    deadline: "According to the annual calendar of calls",
    sectors: ["Technology", "Startups", "Digitalization"],
    description:
      "Support for developing new products and services, commercializing innovation and upgrading the technology of existing production.",
    status: "otvoren",
  },
  {
    id: "ebrd-advice",
    name: "EBRD — Advice for Small Businesses",
    funder: "European Bank for Reconstruction and Development",
    coRate: "up to 70%",
    maxAmount: "up to €25,000",
    deadline: "Open continuously",
    sectors: ["SMEs", "Organizational development", "ESG"],
    description:
      "Co-financing of external consulting projects: strategy, energy efficiency, digital transformation, and introducing standards and quality systems.",
    status: "otvoren",
  },
  {
    id: "kreativna-evropa",
    name: "Creative Europe — MEDIA",
    funder: "European Union",
    coRate: "up to 60%",
    maxAmount: "up to €60,000 per project",
    deadline: "Annual calls with fixed deadlines",
    sectors: ["Culture", "Film production", "Audiovisual sector"],
    description:
      "Development of feature, documentary and animated films with international potential, plus support for co-productions and distribution.",
    status: "najaven",
  },
  {
    id: "nacionalni-merki",
    name: "National competitiveness measures",
    funder: "Government of the Republic of North Macedonia",
    coRate: "up to 50%",
    maxAmount: "depending on the measure",
    deadline: "According to the annual programme",
    sectors: ["Manufacturing", "Export", "Employment"],
    description:
      "National instruments supporting exports, new hires, equipment modernization and participation in international trade fairs.",
    status: "najaven",
  },
];

export const programmesIntro: typeof Mk.programmesIntro = {
  title: "Programmes",
  subtitle:
    "Current sources of grants and co-financing for companies in North Macedonia",
  lead: "We follow every national and international support instrument and let you know when your project becomes eligible. Below is an overview of the programmes we work with most often.",
};

export const programmeProcess: typeof Mk.programmeProcess = [
  {
    step: "01",
    title: "Eligibility check",
    description:
      "We determine whether the company and the planned investment meet the conditions of the specific call.",
  },
  {
    step: "02",
    title: "Financial structure",
    description:
      "We design the combination of grant, loan and own contribution that puts the least strain on liquidity.",
  },
  {
    step: "03",
    title: "Preparing the application",
    description:
      "We prepare the business plan, the investment programme and the complete supporting documentation.",
  },
  {
    step: "04",
    title: "Monitoring and payout",
    description:
      "We guide the project through to the payment request and reporting to the donor.",
  },
];
