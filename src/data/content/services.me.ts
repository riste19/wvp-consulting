import { images } from "@/data/site/images";

import { homeServices as homeServicesMk, type Service } from "./services";

/** Montenegrin twin of `services.ts`. Ids are shared, so anchors work in every language. */

export { serviceHref } from "./services";

export const services: Service[] = [
  {
    id: "finansiski-konsalting",
    cardTitle: "FINANSIJSKO SAVJETOVANJE",
    title: "Finansijsko savjetovanje",
    tagline: "Kreditna dijagnostika • Poslovno planiranje • Strukturiranje investicija",
    description:
      "Sveobuhvatna analiza prilagođena vašem poslovnom modelu, sa ciljem optimizacije finansijskog poslovanja, pripreme kreditne poslovne dijagnostike i obezbjeđivanja kvalitetne strukture finansijskih izvještaja.",
    deliverables: [
      "Poslovni plan",
      "Due diligence",
      "Investicioni program",
      "Studija izvodljivosti i cost-benefit analiza",
    ],
    icon: "handCoins",
    image: images.service(0),
    featuredOnHome: true,
  },
  {
    id: "pristap-do-finansii",
    cardTitle: "PRISTUP FINANSIJAMA",
    title: "Pristup finansijama",
    tagline: "Kreditni savjetnici • Strukturirano finansiranje",
    description:
      "Kroz usluge kreditnog promotera i kreditnog savjetnika obezbjeđujemo kreditnu dijagnostiku i preporuke za finansijsku strukturu pogodnu za postojeće i buduće investicije. Naši kreditni savjetnici istražuju ponude na tržištu i preporučuju optimalnu dospjelost, valutu, dinamiku i finansijske aranžmane.",
    deliverables: [
      "Bankarski kreditni proizvodi",
      "Lizing",
      "Faktoring",
      "Osiguranje potraživanja",
      "Alternativno finansiranje",
    ],
    icon: "euro",
    image: images.service(1),
    featuredOnHome: true,
  },
  {
    id: "grantovi-i-kofinansiranje",
    cardTitle: "GRANTOVI I SUFINANSIRANJE",
    title: "Grantovi i sufinansiranje",
    tagline: "Priprema projekata • Praćenje grantova",
    description:
      "Praćenje poziva i kompletna priprema prijava za grantove i sufinansiranje dostupne kroz nacionalne i međunarodne instrumente, uključujući IPARD, IPA, GIZ, INOVA i fondove Evropske unije — uz maksimalno korišćenje prilika za dobijanje „mekih“ ili potpuno bespovratnih finansijskih sredstava.",
    deliverables: [
      "IPARD, IPA, GIZ",
      "INOVA i nacionalni programi",
      "EBRD blended finance",
      "Strukturni instrumenti EU",
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
    tagline: "Organizaciona dijagnostika • Razvoj tima",
    description:
      "Specijalizovanom metodom dijagnostikujemo organizacionu kulturu, dobrobit zaposlenih i efikasnost menadžmenta, a zatim predlažemo i organizujemo coaching i programe razvoja zaposlenih.",
    deliverables: [
      "Dijagnostika specijalizovanom metodom",
      "Coaching i programi liderstva",
      "Planovi razvoja zaposlenih",
      "Dugoročno organizaciono praćenje",
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
      "Integrisani marketing i razvoj poslovanja koji povećava vidljivost brenda i donosi mjerljiv rast — od istraživanja tržišta i strateškog planiranja do sprovođenja kampanja i optimizacije ulaganja (ROI).",
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
    tagline: "Izvozna strategija • Identifikacija kupaca",
    description:
      "Podrška kompanijama koje traže nova međunarodna tržišta: istraživanje, planiranje izvoza, digitalna spremnost, energetski auditi i pronalaženje kupaca za ulazak na izvozna tržišta uz nizak rizik.",
    deliverables: [
      "Istraživanje tržišta i analiza potencijala",
      "Spremnost za digitalizaciju",
      "Audit energetske efikasnosti (PiNE)",
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
    tagline: "Nefinansijsko izvještavanje • Plan usklađenosti",
    description:
      "Dijagnostika i softverski podržana primjena ESG standarda: ekološki, društveni i upravljački pokazatelji, mapiranje rizika i nefinansijsko izvještavanje usklađeno sa zakonskim zahtjevima.",
    deliverables: [
      "ESG dijagnostika i izvještavanje",
      "Ekološki i društveni pokazatelji",
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
