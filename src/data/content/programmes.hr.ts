import type * as Mk from "./programmes";
import type { Programme } from "./programmes";

/** Croatian twin of `programmes.ts`. Ids and statuses are shared. */

export const programmeStatusLabel: typeof Mk.programmeStatusLabel = {
  otvoren: "Otvoren poziv",
  najaven: "Najavljen poziv",
  zatvoren: "Zatvoren poziv",
};

export const programmes: Programme[] = [
  {
    id: "ipard-3-merka-1",
    name: "IPARD 3 — Mjera 1",
    funder: "Europska unija / Agencija za financijsku potporu",
    coRate: "do 75%",
    maxAmount: "do 750.000 €",
    deadline: "Kontinuirano, nakon objave javnog poziva",
    sectors: ["Poljoprivreda", "Stočarstvo", "Voćarstvo"],
    description:
      "Ulaganja u dugotrajnu imovinu poljoprivrednih gospodarstava: mehanizacija, novi nasadi, sustavi za navodnjavanje, skladišni objekti i fotonaponski sustavi za vlastitu potrošnju.",
    status: "otvoren",
  },
  {
    id: "ipard-3-merka-3",
    name: "IPARD 3 — Mjera 3",
    funder: "Europska unija / Agencija za financijsku potporu",
    coRate: "do 60%",
    maxAmount: "do 1.500.000 €",
    deadline: "Kontinuirano, nakon objave javnog poziva",
    sectors: ["Prehrambena industrija", "Prerada", "Izvoz"],
    description:
      "Ulaganja u preradu i stavljanje na tržište poljoprivrednih proizvoda — proizvodne linije, hladnjače, laboratoriji za kontrolu kvalitete i certificiranje za izvozna tržišta.",
    status: "otvoren",
  },
  {
    id: "fond-za-inovacii",
    name: "INOVA — Fond za inovacije i tehnološki razvoj",
    funder: "Fond za inovacije i tehnološki razvoj",
    coRate: "do 70%",
    maxAmount: "do 100.000 €",
    deadline: "Prema godišnjem kalendaru poziva",
    sectors: ["Tehnologija", "Startupi", "Digitalizacija"],
    description:
      "Potpora razvoju novih proizvoda i usluga, komercijalizaciji inovacija i tehnološkom unapređenju postojeće proizvodnje.",
    status: "otvoren",
  },
  {
    id: "ebrd-advice",
    name: "EBRD — Savjetovanje za mala poduzeća",
    funder: "Europska banka za obnovu i razvoj",
    coRate: "do 70%",
    maxAmount: "do 25.000 €",
    deadline: "Otvoren kontinuirano",
    sectors: ["MSP", "Organizacijski razvoj", "ESG"],
    description:
      "Sufinanciranje projekata vanjskog savjetovanja: strategija, energetska učinkovitost, digitalna transformacija te uvođenje normi i sustava kvalitete.",
    status: "otvoren",
  },
  {
    id: "kreativna-evropa",
    name: "Kreativna Europa — MEDIA",
    funder: "Europska unija",
    coRate: "do 60%",
    maxAmount: "do 60.000 € po projektu",
    deadline: "Godišnji pozivi s utvrđenim rokovima",
    sectors: ["Kultura", "Filmska produkcija", "Audiovizualni sektor"],
    description:
      "Razvoj igranih, dokumentarnih i animiranih filmova s međunarodnim potencijalom, uz potporu koprodukcijama i distribuciji.",
    status: "najaven",
  },
  {
    id: "nacionalni-merki",
    name: "Nacionalne mjere za konkurentnost",
    funder: "Vlada Republike Sjeverne Makedonije",
    coRate: "do 50%",
    maxAmount: "ovisno o mjeri",
    deadline: "Prema godišnjem programu",
    sectors: ["Proizvodnja", "Izvoz", "Zapošljavanje"],
    description:
      "Nacionalni instrumenti za potporu izvozu, novom zapošljavanju, modernizaciji opreme i sudjelovanju na međunarodnim sajmovima.",
    status: "najaven",
  },
];

export const programmesIntro: typeof Mk.programmesIntro = {
  title: "Programi",
  subtitle:
    "Aktualni izvori bespovratnih sredstava i sufinanciranja za tvrtke u Sjevernoj Makedoniji",
  lead: "Pratimo sve nacionalne i međunarodne instrumente potpore i obavještavamo vas kada vaš projekt postane prihvatljiv. U nastavku je pregled programa s kojima najčešće radimo.",
};

export const programmeProcess: typeof Mk.programmeProcess = [
  {
    step: "01",
    title: "Provjera prihvatljivosti",
    description:
      "Utvrđujemo ispunjavaju li tvrtka i planirano ulaganje uvjete konkretnog poziva.",
  },
  {
    step: "02",
    title: "Financijska struktura",
    description:
      "Osmišljavamo kombinaciju bespovratnih sredstava, kredita i vlastitog udjela koja najmanje opterećuje likvidnost.",
  },
  {
    step: "03",
    title: "Priprema prijave",
    description:
      "Pripremamo poslovni plan, investicijski program i cjelokupnu popratnu dokumentaciju.",
  },
  {
    step: "04",
    title: "Praćenje i isplata",
    description:
      "Vodimo projekt sve do zahtjeva za isplatu i izvješćivanja prema davatelju sredstava.",
  },
];
