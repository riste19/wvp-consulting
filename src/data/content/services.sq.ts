import { images } from "@/data/site/images";

import { homeServices as homeServicesMk, type Service } from "./services";

/** Albanian twin of `services.ts`. Ids are shared, so anchors work in both languages. */

export { serviceHref } from "./services";

export const services: Service[] = [
  {
    id: "finansiski-konsalting",
    cardTitle: "KONSULENCË FINANCIARE",
    title: "Konsulencë financiare",
    tagline:
      "Diagnostikim kreditor • Planifikim biznesi • Strukturim investimesh",
    description:
      "Analizë gjithëpërfshirëse e përshtatur ndaj modelit tuaj të biznesit me qëllim optimizimin e funksionimit financiar, hartimin e diagnostikimit kreditor të biznesit dhe sigurimin e strukturës cilësore të raporteve financiare.",
    deliverables: [
      "Plan biznesi",
      "Analizë e thellë (due diligence)",
      "Program investimi",
      "Raport i fizibilitetit dhe arsyeshmërisë së investimit (cost-benefit analysis)",
    ],
    icon: "handCoins",
    image: images.service(0),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-finansii",
    cardTitle: "QASJA NË FINANCA",
    title: "Qasja në financa",
    tagline: "Këshilltarë kreditorë • Financim i strukturuar",
    description:
      "Përmes shërbimeve promovues kreditor dhe këshilltar kreditor mundësohet diagnostikim kreditor dhe rekomandime për konstruksion financiar të përshtatshëm për investimet ekzistuese dhe të ardhshme. Këshilltarët tanë kreditorë hulumtojnë ofertat e tregut dhe rekomandojnë afat optimal, valutë, dinamikë dhe aranzhime financiare.",
    deliverables: [
      "Produkte kreditore bankare",
      "Lizing",
      "Faktoring",
      "Sigurim i kërkesave",
      "Financim alternativ",
    ],
    icon: "euro",
    image: images.service(1),
    featuredOnHome: true,
  },
  {
    id: "grantovi-i-kofinansiranje",
    cardTitle: "GRANTE DHE BASHKËFINANCIM",
    title: "Grante dhe bashkëfinancim",
    tagline: "Përgatitja e projekteve • Monitorim i granteve",
    description:
      "Ndjekja e thirrjeve dhe përgatitja e plotë e aplikacioneve për grante dhe bashkëfinancim të disponueshme përmes instrumenteve kombëtare dhe ndërkombëtare, duke përfshirë IPARD, IPA, GIZ, INOVA dhe fondet e Bashkimit Evropian — duke maksimizuar mundësitë për marrjen e mjeteve financiare „të buta“ ose plotësisht të pakthyeshme.",
    deliverables: [
      "IPARD, IPA, GIZ",
      "INOVA dhe programe kombëtare",
      "EBRD financim i kombinuar",
      "Instrumente strukturore të BE-së",
      "Potencial për kthim deri në 90%",
    ],
    icon: "receiptEuro",
    image: images.service(2),
    featuredOnHome: true,
  },
  {
    id: "biznis-konsalting",
    cardTitle: "KONSULENCË BIZNESI",
    title: "Konsulencë biznesi",
    tagline: "Diagnostikim organizativ • Zhvillim i ekipeve",
    description:
      "Duke përdorur një metodë të specializuar diagnostikojmë kulturën organizative, mirëqenien e punëtorëve dhe efektivitetin e menaxhimit, e pastaj propozojmë dhe organizojmë coaching dhe programe për zhvillimin e punëtorëve.",
    deliverables: [
      "Diagnostikim përmes metodës së specializuar",
      "Coaching dhe programe udhëheqjeje",
      "Plane për zhvillimin e punëtorëve",
      "Monitorim afatgjatë organizativ",
    ],
    icon: "chartLine",
    image: images.service(3),
    featuredOnHome: true,
  },
  {
    id: "marketing-i-biznis-razvoj",
    cardTitle: "MARKETING DHE ZHVILLIM BIZNESI",
    title: "Marketing dhe zhvillim biznesi",
    tagline: "Brendim • Strategji për rritje • Digjitalizim",
    description:
      "Marketing i integruar dhe zhvillim biznesi që rrit dukshmërinë e brendit dhe sjell rritje të matshme — nga hulumtimi i tregut dhe planifikimi strategjik deri te zbatimi i fushatave dhe optimizimi i investimeve (ROI).",
    deliverables: [
      "Planifikim strategjik",
      "Hulumtim i tregut",
      "Brendim dhe identitet",
      "Fushata digjitale dhe analitikë",
    ],
    icon: "chartNetwork",
    image: images.service(4),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-pazari",
    cardTitle: "QASJA NË TREGJE",
    title: "Qasja në tregje",
    tagline: "Strategji eksporti • Identifikim i blerësve",
    description:
      "Mbështetje për kompanitë që kërkojnë tregje të reja ndërkombëtare: hulumtim, planifikim i eksportit, gatishmëri digjitale, auditime energjetike dhe gjetje blerësish për hyrje në tregun e eksportit me risk të ulët.",
    deliverables: [
      "Hulumtim i tregut dhe analizë e potencialit",
      "Gatishmëri për digjitalizim",
      "Auditim i efiçencës energjetike (PiNE)",
      "Plan eksporti dhe gjetje blerësish",
    ],
    icon: "globe",
    image: images.service(5),
    featuredOnHome: true,
  },
  {
    id: "esg-standardizacija",
    cardTitle: "STANDARDIZIM ESG",
    title: "Standardizim ESG",
    tagline: "Raportim jofinanciar • Udhërrëfyes pajtueshmërie",
    description:
      "Diagnostikim dhe implementim i mbështetur me softuer i standardeve ESG: metrika mjedisore, sociale dhe të qeverisjes, hartëzim i risqeve dhe raportim jofinanciar i harmonizuar me kërkesat ligjore.",
    deliverables: [
      "Diagnostikim dhe raportim ESG",
      "Tregues mjedisorë dhe socialë",
      "Hartëzim i qeverisjes",
      "Udhërrëfyes pajtueshmërie",
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
