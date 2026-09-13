import type * as Mk from "./about";
import type { OfferGroup, RegionalOffice, TimelineEntry, Value } from "./about";

/** Albanian twin of `about.ts`: same exports, same shape, same order. */

export const aboutIntro: typeof Mk.aboutIntro = {
  heading: "Kush jemi ne",
  paragraphs: [
    "WVP Plus Consulting është pjesë e grupit të njohur austriak WVP GROUP, me traditë që daton nga viti 1985. Me seli në Grac, Austri, grupi sot është i pranishëm në 10 vende në Evropën Juglindore, duke sjellë ekspertizë, besim dhe zgjidhje inovative në fushën e këshillimit financiar.",
    "Në Maqedoni, grupi është aktiv nga viti 2005, ndërsa WVP Plus Consulting fillon punën në vitin 2019 si kompania e tretë e grupit (nga gjithsej gjashtë) e pranishme në tregun maqedonas.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    company: "WVP Plus Consulting DOO",
    location: "Shkup, Republika e Maqedonisë së Veriut",
    note: "Kompania mëmë",
  },
  {
    year: "2022",
    company: "WVP Plus Consulting DOO",
    location: "Beograd, Republika e Serbisë",
  },
  {
    year: "2023",
    company: "WVP Kontabilitet DOO",
    location: "Shkup, Republika e Maqedonisë së Veriut",
  },
  {
    year: "2024",
    company: "WVP Plus Consulting DOO",
    location: "Brçko, Bosnjë dhe Hercegovinë",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting DOO",
    location: "Podgoricë, Republika e Malit të Zi",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting DOO",
    location: "Rijekë, Republika e Kroacisë",
  },
];

/** See the note on `regionalOffices` in `about.ts` — the same links are temporary here. */
export const regionalOffices: RegionalOffice[] = [
  { id: "North_Macedonia", name: "Maqedonia e Veriut", href: "/sq" },
  { id: "Serbia", name: "Serbia", href: "https://wvpconsulting.com/rs" },
  { id: "Bosnia_and_Herzegovina", name: "Bosnja dhe Hercegovina", href: "https://wvpconsulting.com/ba" },
  { id: "Montenegro", name: "Mali i Zi", href: "https://wvpconsulting.com/me" },
  { id: "Croatia", name: "Kroacia", href: "https://wvpconsulting.com/hr" },
];

export const regionalMap: typeof Mk.regionalMap = {
  heading: "Zhvillimi rajonal",
  hint: "Klikoni mbi një shtet për të vizituar faqen e tij të internetit",
  mapLabel: "Harta e shteteve ku vepron grupi",
  dialogTitle: "Ridrejtim…",
  dialogBody: "Po ju ridrejtojmë te faqja e internetit për",
  countdown: "Ridrejtim për",
  secondsSuffix: "s",
  cancel: "Anulo",
};

export const offerGroups: OfferGroup[] = [
  {
    title: "Qasja në financa",
    icon: "walletCards",
    items: [
      "Grante dhe bashkëfinancim",
      "Produkte kreditore bankare",
      "Lizing",
      "Faktoring",
      "Instrumente qeveritare për mbështetje",
      "Mbështetje financiare jobankare",
      "Bashkime dhe blerje",
      "Financim grupor i kapitalit (equity crowdfunding)",
      "Engjëj biznesi",
      "Instrumente kapitale",
    ],
  },
  {
    title: "Qasja në treg",
    icon: "globe",
    items: [
      "Digjitalizimi i kompanisë",
      "Auditim i efiçencës energjetike (modeli PiNE)",
      "Zhvillimi i ekonomisë qarkore",
      "Matrica e mbrojtjes së punëtorëve",
      "Strategji dhe planifikim i eksportit",
      "Dizajn dhe zhvillim i produkteve",
      "Strategji marketingu dhe brendim",
      "Diagnostikim i kapacitetit financiar",
    ],
  },
  {
    title: "Raporte të specializuara",
    icon: "fileText",
    items: [
      "Plane biznesi",
      "Programe investimi",
      "Analizë e thellë (due diligence)",
      "Analizë e shpenzimeve dhe përfitimeve (cost-benefit analysis)",
    ],
  },
];

export const missionStatement: string =
  "Misioni ynë është të mundësojmë qasje të plotë në financa për kompanitë dhe qytetarët, duke rritur konkurrueshmërinë dhe qëndrueshmërinë e tyre.";

export const values: Value[] = [
  {
    title: "Orientim drejt rezultateve",
    description:
      "Fokusohemi në ofrimin e rezultateve të matshme dhe vlerës konkrete për klientët tanë.",
    icon: "target",
  },
  {
    title: "Fokus te klienti",
    description:
      "Suksesi juaj është prioriteti ynë. Ndërtojmë partneritete afatgjata të bazuara në besim.",
    icon: "handshake",
  },
  {
    title: "Përsosmëri",
    description:
      "Mbajmë standardet më të larta të profesionalizmit dhe ekspertizës.",
    icon: "award",
  },
  {
    title: "Inovacion",
    description:
      "Përdorim teknologji dhe metodologji bashkëkohore për të arritur rezultate.",
    icon: "lightbulb",
  },
];

export const teamSection: typeof Mk.teamSection = {
  eyebrow: "EKIPI YNË",
  heading: "Ekipi më i madh i ekspertëve",
  paragraphs: [
    "Ekipi ynë multidisiplinar sjell përvojë të pasur në konsulencë financiare dhe zhvillim të investimeve në industri të ndryshme, me fokus të veçantë në kompanitë prodhuese, sektorin bujqësor, zhvillimin rural, turizmin dhe „investimet e gjelbra“. U ndihmojmë klientëve të qasen në programet shtetërore për mbështetje financiare dhe fondet e Bashkimit Evropian, dhe t'i kthejnë idetë e tyre në investime të qëndrueshme dhe të realizuara. Detyra jonë është të krijojmë së bashku rritje të qëndrueshme dhe kompani të orientuara drejt eksportit.",
    "Për klientët tanë — ne jemi partnerë në procesin e rritjes.",
  ],
  ctaLabel: "Caktoni takim",
  ctaHref: "/sq/kontakt",
};

export const careers: typeof Mk.careers = {
  heading: "Bashkohuni me ekipin tonë",
  description:
    "Gjithmonë kërkojmë profesionistë të talentuar që duan të rriten së bashku me ne.",
  ctaLabel: "Na kontaktoni",
  ctaHref: "/sq/kontakt",
};
