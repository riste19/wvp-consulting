import { images } from "@/data/site/images";

import { homeServices as homeServicesMk, type Service } from "./services";

/** English twin of `services.ts`. Ids are shared, so anchors work in every language. */

export { serviceHref } from "./services";

export const services: Service[] = [
  {
    id: "finansiski-konsalting",
    cardTitle: "FINANCIAL CONSULTING",
    title: "Financial consulting",
    tagline: "Credit diagnostics • Business planning • Investment structuring",
    description:
      "Comprehensive analysis tailored to your business model, aimed at optimizing your financial operations, preparing credit business diagnostics and ensuring a quality structure of your financial statements.",
    deliverables: [
      "Business plan",
      "Due diligence",
      "Investment programme",
      "Feasibility and cost-benefit analysis report",
    ],
    icon: "handCoins",
    image: images.service(0),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-finansii",
    cardTitle: "ACCESS TO FINANCE",
    title: "Access to finance",
    tagline: "Credit advisors • Structured financing",
    description:
      "Through our credit promoter and credit advisor services, we provide credit diagnostics and recommendations for a financial structure suited to existing and future investments. Our credit advisors research market offers and recommend the optimal maturity, currency, dynamics and financial arrangements.",
    deliverables: [
      "Banking credit products",
      "Leasing",
      "Factoring",
      "Accounts receivable insurance",
      "Alternative financing",
    ],
    icon: "euro",
    image: images.service(1),
    featuredOnHome: true,
  },
  {
    id: "grantovi-i-kofinansiranje",
    cardTitle: "GRANTS AND CO-FINANCING",
    title: "Grants and co-financing",
    tagline: "Project preparation • Grant monitoring",
    description:
      "Monitoring calls and fully preparing applications for grants and co-financing available through national and international instruments, including IPARD, IPA, GIZ, INOVA and European Union funds — maximizing the opportunities to obtain “soft” or fully non-refundable financial resources.",
    deliverables: [
      "IPARD, IPA, GIZ",
      "INOVA and national programmes",
      "EBRD blended finance",
      "EU structural instruments",
      "Up to 90% return potential",
    ],
    icon: "receiptEuro",
    image: images.service(2),
    featuredOnHome: true,
  },
  {
    id: "biznis-konsalting",
    cardTitle: "BUSINESS CONSULTING",
    title: "Business consulting",
    tagline: "Organizational diagnostics • Team development",
    description:
      "Using a specialized method, we diagnose organizational culture, employee well-being and management effectiveness, then propose and organize coaching and employee development programmes.",
    deliverables: [
      "Diagnostics using a specialized method",
      "Coaching and leadership programmes",
      "Employee development plans",
      "Long-term organizational monitoring",
    ],
    icon: "chartLine",
    image: images.service(3),
    featuredOnHome: true,
  },
  {
    id: "marketing-i-biznis-razvoj",
    cardTitle: "MARKETING AND BUSINESS DEVELOPMENT",
    title: "Marketing and business development",
    tagline: "Branding • Growth strategy • Digitalization",
    description:
      "Integrated marketing and business development that increases brand visibility and drives measurable growth — from market research and strategic planning to campaign implementation and optimization of investments (ROI).",
    deliverables: [
      "Strategic planning",
      "Market research",
      "Branding and identity",
      "Digital campaigns and analytics",
    ],
    icon: "chartNetwork",
    image: images.service(4),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-pazari",
    cardTitle: "MARKET ACCESS",
    title: "Market access",
    tagline: "Export strategy • Buyer identification",
    description:
      "Support for companies seeking new international markets: research, export planning, digital readiness, energy audits and buyer discovery for a low-risk entry into export markets.",
    deliverables: [
      "Market research and potential analysis",
      "Digitalization readiness",
      "Energy efficiency audit (PiNE)",
      "Export plan and buyer sourcing",
    ],
    icon: "globe",
    image: images.service(5),
    featuredOnHome: true,
  },
  {
    id: "esg-standardizacija",
    cardTitle: "ESG STANDARDIZATION",
    title: "ESG standardization",
    tagline: "Non-financial reporting • Compliance roadmap",
    description:
      "Diagnostics and software-supported implementation of ESG standards: environmental, social and governance metrics, risk mapping and non-financial reporting aligned with legal requirements.",
    deliverables: [
      "ESG diagnostics and reporting",
      "Environmental and social indicators",
      "Governance mapping",
      "Compliance roadmap",
    ],
    icon: "leaf",
    image: images.service(6),
    featuredOnHome: true,
  },
];

/** Same order as the Macedonian homepage grid, taken from it rather than repeated. */
export const homeServices: Service[] = homeServicesMk.map(
  ({ id }) => services.find((service) => service.id === id)!,
);
