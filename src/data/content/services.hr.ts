import { images } from "@/data/site/images";

import { homeServices as homeServicesMk, type Service } from "./services";

/** Croatian twin of `services.ts`. Ids are shared, so anchors work in every language. */

export { serviceHref } from "./services";

export const services: Service[] = [
  {
    id: "finansiski-konsalting",
    cardTitle: "FINANCIJSKO SAVJETOVANJE",
    title: "Financijsko savjetovanje",
    tagline: "Kreditna dijagnostika • Poslovno planiranje • Strukturiranje ulaganja",
    description:
      "Sveobuhvatna analiza prilagođena vašem poslovnom modelu, s ciljem optimizacije financijskog poslovanja, pripreme kreditne poslovne dijagnostike i osiguranja kvalitetne strukture financijskih izvještaja.",
    deliverables: [
      "Poslovni plan",
      "Dubinska analiza (due diligence)",
      "Investicijski program",
      "Studija izvedivosti i analiza troškova i koristi",
    ],
    icon: "handCoins",
    image: images.service(0),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-finansii",
    cardTitle: "PRISTUP FINANCIJAMA",
    title: "Pristup financijama",
    tagline: "Kreditni savjetnici • Strukturirano financiranje",
    description:
      "Kroz usluge kreditnog promotora i kreditnog savjetnika pružamo kreditnu dijagnostiku i preporuke za financijsku strukturu prikladnu za postojeća i buduća ulaganja. Naši kreditni savjetnici istražuju ponude na tržištu i preporučuju optimalno dospijeće, valutu, dinamiku i financijske aranžmane.",
    deliverables: [
      "Bankovni kreditni proizvodi",
      "Leasing",
      "Faktoring",
      "Osiguranje potraživanja",
      "Alternativno financiranje",
    ],
    icon: "euro",
    image: images.service(1),
    featuredOnHome: true,
  },
  {
    id: "grantovi-i-kofinansiranje",
    cardTitle: "BESPOVRATNA SREDSTVA I SUFINANCIRANJE",
    title: "Bespovratna sredstva i sufinanciranje",
    tagline: "Priprema projekata • Praćenje natječaja",
    description:
      "Praćenje poziva i cjelovita priprema prijava za bespovratna sredstva i sufinanciranje dostupne kroz nacionalne i međunarodne instrumente, uključujući IPARD, IPA, GIZ, INOVA i fondove Europske unije — uz najbolje iskorištavanje prilika za dobivanje „mekih“ ili potpuno bespovratnih financijskih sredstava.",
    deliverables: [
      "IPARD, IPA, GIZ",
      "INOVA i nacionalni programi",
      "EBRD blended finance",
      "Strukturni instrumenti EU-a",
      "Potencijal povrata do 90%",
    ],
    icon: "receiptEuro",
    image: images.service(2),
    featuredOnHome: true,
  },
  {
    id: "biznis-konsalting",
    cardTitle: "POSLOVNO SAVJETOVANJE",
    title: "Poslovno savjetovanje",
    tagline: "Organizacijska dijagnostika • Razvoj tima",
    description:
      "Specijaliziranom metodom dijagnosticiramo organizacijsku kulturu, dobrobit zaposlenika i učinkovitost menadžmenta, a zatim predlažemo i organiziramo coaching i programe razvoja zaposlenika.",
    deliverables: [
      "Dijagnostika specijaliziranom metodom",
      "Coaching i programi razvoja vodstva",
      "Planovi razvoja zaposlenika",
      "Dugoročno organizacijsko praćenje",
    ],
    icon: "chartLine",
    image: images.service(3),
    featuredOnHome: true,
  },
  {
    id: "marketing-i-biznis-razvoj",
    cardTitle: "MARKETING I RAZVOJ POSLOVANJA",
    title: "Marketing i razvoj poslovanja",
    tagline: "Brendiranje • Strategija rasta • Digitalizacija",
    description:
      "Integrirani marketing i razvoj poslovanja koji povećava vidljivost brenda i donosi mjerljiv rast — od istraživanja tržišta i strateškog planiranja do provedbe kampanja i optimizacije ulaganja (ROI).",
    deliverables: [
      "Strateško planiranje",
      "Istraživanje tržišta",
      "Brendiranje i identitet",
      "Digitalne kampanje i analitika",
    ],
    icon: "chartNetwork",
    image: images.service(4),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-pazari",
    cardTitle: "PRISTUP TRŽIŠTU",
    title: "Pristup tržištu",
    tagline: "Izvozna strategija • Pronalaženje kupaca",
    description:
      "Potpora tvrtkama koje traže nova međunarodna tržišta: istraživanje, planiranje izvoza, digitalna spremnost, energetski auditi i pronalaženje kupaca za ulazak na izvozna tržišta uz nizak rizik.",
    deliverables: [
      "Istraživanje tržišta i analiza potencijala",
      "Spremnost za digitalizaciju",
      "Audit energetske učinkovitosti (PiNE)",
      "Izvozni plan i pronalaženje kupaca",
    ],
    icon: "globe",
    image: images.service(5),
    featuredOnHome: true,
  },
  {
    id: "esg-standardizacija",
    cardTitle: "ESG STANDARDIZACIJA",
    title: "ESG standardizacija",
    tagline: "Nefinancijsko izvještavanje • Plan usklađenosti",
    description:
      "Dijagnostika i softverski podržana primjena ESG standarda: okolišni, društveni i upravljački pokazatelji, mapiranje rizika i nefinancijsko izvještavanje usklađeno sa zakonskim zahtjevima.",
    deliverables: [
      "ESG dijagnostika i izvještavanje",
      "Okolišni i društveni pokazatelji",
      "Mapiranje upravljanja",
      "Plan usklađenosti",
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
