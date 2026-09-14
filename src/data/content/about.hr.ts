import type * as Mk from "./about";
import type { OfferGroup, RegionalOffice, TimelineEntry, Value } from "./about";

/** Croatian twin of `about.ts`: same exports, same shape, same order. */

export const aboutIntro: typeof Mk.aboutIntro = {
  heading: "Tko smo mi",
  paragraphs: [
    "WVP Plus Consulting dio je renomirane austrijske WVP GROUP, s tradicijom koja traje od 1985. godine. Sa sjedištem u Grazu, u Austriji, grupa je danas prisutna u 10 zemalja jugoistočne Europe i donosi stručnost, povjerenje i inovativna rješenja u području financijskog savjetovanja.",
    "U Makedoniji je grupa aktivna od 2005. godine, a WVP Plus Consulting počinje s radom 2019. godine kao treća tvrtka grupacije (od ukupno šest) prisutna na makedonskom tržištu.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    company: "WVP Plus Consulting d.o.o.",
    location: "Skopje, Republika Sjeverna Makedonija",
    note: "Matična tvrtka",
  },
  {
    year: "2022",
    company: "WVP Plus Consulting d.o.o.",
    location: "Beograd, Republika Srbija",
  },
  {
    year: "2023",
    company: "WVP Accounting d.o.o.",
    location: "Skopje, Republika Sjeverna Makedonija",
  },
  {
    year: "2024",
    company: "WVP Plus Consulting d.o.o.",
    location: "Brčko, Bosna i Hercegovina",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting d.o.o.",
    location: "Podgorica, Crna Gora",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting d.o.o.",
    location: "Rijeka, Republika Hrvatska",
  },
];

export const regionalOffices: RegionalOffice[] = [
  { id: "North_Macedonia", name: "Sjeverna Makedonija", href: "/mk" },
  { id: "Serbia", name: "Srbija", href: "/rs" },
  { id: "Bosnia_and_Herzegovina", name: "Bosna i Hercegovina", href: "/ba" },
  { id: "Montenegro", name: "Crna Gora", href: "/me" },
  { id: "Croatia", name: "Hrvatska", href: "/hr" },
];

export const regionalMap: typeof Mk.regionalMap = {
  heading: "Regionalni razvoj",
  hint: "Kliknite na državu kako biste posjetili njezinu web-stranicu",
  mapLabel: "Karta država u kojima posluje grupacija",
  dialogTitle: "Preusmjeravanje…",
  dialogBody: "Preusmjeravamo vas na web-stranicu za",
  countdown: "Preusmjeravanje za",
  secondsSuffix: "s",
  cancel: "Odustani",
};

export const offerGroups: OfferGroup[] = [
  {
    title: "Pristup financijama",
    icon: "walletCards",
    items: [
      "Bespovratna sredstva i sufinanciranje",
      "Bankovni kreditni proizvodi",
      "Leasing",
      "Faktoring",
      "Instrumenti državne potpore",
      "Nebankovna financijska potpora",
      "Spajanja i preuzimanja",
      "Equity crowdfunding",
      "Poslovni anđeli",
      "Vlasnički instrumenti",
    ],
  },
  {
    title: "Pristup tržištu",
    icon: "globe",
    items: [
      "Digitalizacija tvrtke",
      "Audit energetske učinkovitosti (PiNE model)",
      "Razvoj kružnog gospodarstva",
      "Matrica zaštite zaposlenika",
      "Strategija i planiranje izvoza",
      "Dizajn i razvoj proizvoda",
      "Marketinška strategija i brendiranje",
      "Dijagnostika financijskog kapaciteta",
    ],
  },
  {
    title: "Specijalizirana izvješća",
    icon: "fileText",
    items: [
      "Poslovni planovi",
      "Investicijski programi",
      "Dubinska analiza (due diligence)",
      "Analiza troškova i koristi",
    ],
  },
];

export const missionStatement: string =
  "Naša je misija tvrtkama i građanima omogućiti potpun pristup financijama i tako povećati njihovu konkurentnost i održivost.";

export const values: Value[] = [
  {
    title: "Usmjerenost na rezultate",
    description:
      "Usredotočeni smo na mjerljive rezultate i konkretnu vrijednost za naše klijente.",
    icon: "target",
  },
  {
    title: "Usmjerenost na klijenta",
    description:
      "Vaš uspjeh naš je prioritet. Gradimo dugoročna partnerstva utemeljena na povjerenju.",
    icon: "handshake",
  },
  {
    title: "Izvrsnost",
    description:
      "Održavamo najviše standarde profesionalnosti i stručnosti.",
    icon: "award",
  },
  {
    title: "Inovativnost",
    description:
      "Koristimo suvremene tehnologije i metodologije za postizanje rezultata.",
    icon: "lightbulb",
  },
];

export const teamSection: typeof Mk.teamSection = {
  eyebrow: "NAŠ TIM",
  heading: "Najveći tim stručnjaka",
  paragraphs: [
    "Naš multidisciplinarni tim donosi bogato iskustvo u financijskom savjetovanju i razvoju ulaganja u različitim industrijama, s posebnim naglaskom na proizvodne tvrtke, poljoprivredni sektor, ruralni razvoj, turizam i „zelena ulaganja“. Pomažemo klijentima pristupiti državnim programima financijske potpore i fondovima Europske unije te svoje ideje pretvoriti u održiva, ostvarena ulaganja. Naš je zadatak zajedno graditi održiv rast i izvozno usmjerene tvrtke.",
    "Za naše klijente — partneri smo u procesu rasta.",
  ],
  ctaLabel: "Dogovorite sastanak",
  ctaHref: "/hr/kontakt",
};

export const careers: typeof Mk.careers = {
  heading: "Pridružite se našem timu",
  description:
    "Uvijek tražimo talentirane stručnjake koji žele rasti zajedno s nama.",
  ctaLabel: "Kontaktirajte nas",
  ctaHref: "/hr/kontakt",
};
