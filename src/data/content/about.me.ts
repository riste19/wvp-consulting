import type * as Mk from "./about";
import type { OfferGroup, RegionalOffice, TimelineEntry, Value } from "./about";

/** Montenegrin twin of `about.ts`: same exports, same shape, same order. */

export const aboutIntro: typeof Mk.aboutIntro = {
  heading: "Ko smo mi",
  paragraphs: [
    "WVP Plus Consulting je dio renomirane austrijske WVP GROUP, sa tradicijom koja traje od 1985. godine. Sa sjedištem u Gracu, u Austriji, grupa je danas prisutna u 10 zemalja jugoistočne Evrope i donosi stručnost, povjerenje i inovativna rješenja u oblasti finansijskog savjetovanja.",
    "U Makedoniji je grupa aktivna od 2005. godine, a WVP Plus Consulting počinje sa radom 2019. godine kao treća kompanija grupacije (od ukupno šest) prisutna na makedonskom tržištu.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    company: "WVP Plus Consulting DOO",
    location: "Skoplje, Republika Sjeverna Makedonija",
    note: "Matična kompanija",
  },
  {
    year: "2022",
    company: "WVP Plus Consulting DOO",
    location: "Beograd, Republika Srbija",
  },
  {
    year: "2023",
    company: "WVP Accounting DOO",
    location: "Skoplje, Republika Sjeverna Makedonija",
  },
  {
    year: "2024",
    company: "WVP Plus Consulting DOO",
    location: "Brčko, Bosna i Hercegovina",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting DOO",
    location: "Podgorica, Crna Gora",
  },
  {
    year: "2025",
    company: "WVP Plus Consulting DOO",
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
  hint: "Kliknite na državu da biste posjetili njenu veb-stranicu",
  mapLabel: "Mapa država u kojima posluje grupacija",
  dialogTitle: "Preusmjeravanje…",
  dialogBody: "Preusmjeravamo vas na veb-stranicu za",
  countdown: "Preusmjeravanje za",
  secondsSuffix: "s",
  cancel: "Otkaži",
};

export const offerGroups: OfferGroup[] = [
  {
    title: "Pristup finansijama",
    icon: "walletCards",
    items: [
      "Grantovi i sufinansiranje",
      "Bankarski kreditni proizvodi",
      "Lizing",
      "Faktoring",
      "Instrumenti državne podrške",
      "Nebankarska finansijska podrška",
      "Spajanja i akvizicije",
      "Equity crowdfunding",
      "Biznis anđeli",
      "Kapitalni instrumenti",
    ],
  },
  {
    title: "Pristup tržištu",
    icon: "globe",
    items: [
      "Digitalizacija kompanije",
      "Audit energetske efikasnosti (PiNE model)",
      "Razvoj cirkularne ekonomije",
      "Matrica zaštite zaposlenih",
      "Izvozna strategija i planiranje",
      "Dizajn i razvoj proizvoda",
      "Marketing strategija i brendiranje",
      "Dijagnostika finansijskog kapaciteta",
    ],
  },
  {
    title: "Specijalizovani izvještaji",
    icon: "fileText",
    items: [
      "Poslovni planovi",
      "Investicioni programi",
      "Due diligence",
      "Cost-benefit analiza",
    ],
  },
];

export const missionStatement: string =
  "Naša misija je da kompanijama i građanima omogućimo pun pristup finansijama i time povećamo njihovu konkurentnost i održivost.";

export const values: Value[] = [
  {
    title: "Orijentisanost ka rezultatima",
    description:
      "Fokusiramo se na mjerljive rezultate i konkretnu vrijednost za naše klijente.",
    icon: "target",
  },
  {
    title: "Fokus na klijenta",
    description:
      "Vaš uspjeh je naš prioritet. Gradimo dugoročna partnerstva zasnovana na povjerenju.",
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
      "Koristimo savremene tehnologije i metodologije za postizanje rezultata.",
    icon: "lightbulb",
  },
];

export const teamSection: typeof Mk.teamSection = {
  eyebrow: "NAŠ TIM",
  heading: "Najveći tim stručnjaka",
  paragraphs: [
    "Naš multidisciplinarni tim donosi bogato iskustvo u finansijskom savjetovanju i razvoju investicija u različitim industrijama, sa posebnim fokusom na proizvodne kompanije, poljoprivredni sektor, ruralni razvoj, turizam i „zelene investicije“. Pomažemo klijentima da pristupe državnim programima finansijske podrške i fondovima Evropske unije i da svoje ideje pretvore u održive, realizovane investicije. Naš zadatak je da zajedno gradimo održiv rast i izvozno orijentisane kompanije.",
    "Za naše klijente — partneri smo u procesu rasta.",
  ],
  ctaLabel: "Zakažite sastanak",
  ctaHref: "/me/kontakt",
};

export const careers: typeof Mk.careers = {
  heading: "Pridružite se našem timu",
  description:
    "Uvijek tražimo talentovane profesionalce koji žele da rastu sa nama.",
  ctaLabel: "Kontaktirajte nas",
  ctaHref: "/me/kontakt",
};
