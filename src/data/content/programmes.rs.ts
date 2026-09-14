import type * as Mk from "./programmes";
import type { Programme } from "./programmes";

/** Serbian (Latin) twin of `programmes.ts`. Ids and statuses are shared. */

export const programmeStatusLabel: typeof Mk.programmeStatusLabel = {
  otvoren: "Otvoren poziv",
  najaven: "Najavljen poziv",
  zatvoren: "Zatvoren poziv",
};

export const programmes: Programme[] = [
  {
    id: "ipard-3-merka-1",
    name: "IPARD 3 — Mera 1",
    funder: "Evropska unija / Agencija za finansijsku podršku",
    coRate: "do 75%",
    maxAmount: "do 750.000 €",
    deadline: "Kontinuirano, nakon objave javnog poziva",
    sectors: ["Poljoprivreda", "Stočarstvo", "Voćarstvo"],
    description:
      "Investicije u osnovna sredstva poljoprivrednih gazdinstava: mehanizacija, novi zasadi, sistemi za navodnjavanje, skladišni objekti i fotonaponski sistemi za sopstvenu potrošnju.",
    status: "otvoren",
  },
  {
    id: "ipard-3-merka-3",
    name: "IPARD 3 — Mera 3",
    funder: "Evropska unija / Agencija za finansijsku podršku",
    coRate: "do 60%",
    maxAmount: "do 1.500.000 €",
    deadline: "Kontinuirano, nakon objave javnog poziva",
    sectors: ["Prehrambena industrija", "Prerada", "Izvoz"],
    description:
      "Investicije u preradu i plasman poljoprivrednih proizvoda — proizvodne linije, hladnjače, laboratorije za kontrolu kvaliteta i sertifikacija za izvozna tržišta.",
    status: "otvoren",
  },
  {
    id: "fond-za-inovacii",
    name: "INOVA — Fond za inovacije i tehnološki razvoj",
    funder: "Fond za inovacije i tehnološki razvoj",
    coRate: "do 70%",
    maxAmount: "do 100.000 €",
    deadline: "Prema godišnjem kalendaru poziva",
    sectors: ["Tehnologija", "Startapi", "Digitalizacija"],
    description:
      "Podrška za razvoj novih proizvoda i usluga, komercijalizaciju inovacija i tehnološko unapređenje postojeće proizvodnje.",
    status: "otvoren",
  },
  {
    id: "ebrd-advice",
    name: "EBRD — Saveti za mala preduzeća",
    funder: "Evropska banka za obnovu i razvoj",
    coRate: "do 70%",
    maxAmount: "do 25.000 €",
    deadline: "Otvoren kontinuirano",
    sectors: ["MSP", "Organizacioni razvoj", "ESG"],
    description:
      "Sufinansiranje projekata eksternog konsaltinga: strategija, energetska efikasnost, digitalna transformacija i uvođenje standarda i sistema kvaliteta.",
    status: "otvoren",
  },
  {
    id: "kreativna-evropa",
    name: "Kreativna Evropa — MEDIA",
    funder: "Evropska unija",
    coRate: "do 60%",
    maxAmount: "do 60.000 € po projektu",
    deadline: "Godišnji pozivi sa utvrđenim rokovima",
    sectors: ["Kultura", "Filmska produkcija", "Audiovizuelni sektor"],
    description:
      "Razvoj igranih, dokumentarnih i animiranih filmova sa međunarodnim potencijalom, uz podršku za koprodukcije i distribuciju.",
    status: "najaven",
  },
  {
    id: "nacionalni-merki",
    name: "Nacionalne mere za konkurentnost",
    funder: "Vlada Republike Severne Makedonije",
    coRate: "do 50%",
    maxAmount: "u zavisnosti od mere",
    deadline: "Prema godišnjem programu",
    sectors: ["Proizvodnja", "Izvoz", "Zapošljavanje"],
    description:
      "Nacionalni instrumenti za podršku izvozu, novom zapošljavanju, modernizaciji opreme i učešću na međunarodnim sajmovima.",
    status: "najaven",
  },
];

export const programmesIntro: typeof Mk.programmesIntro = {
  title: "Programi",
  subtitle:
    "Aktuelni izvori grantova i sufinansiranja za kompanije u Severnoj Makedoniji",
  lead: "Pratimo sve nacionalne i međunarodne instrumente podrške i obaveštavamo vas kada vaš projekat postane podoban. U nastavku je pregled programa sa kojima najčešće radimo.",
};

export const programmeProcess: typeof Mk.programmeProcess = [
  {
    step: "01",
    title: "Provera podobnosti",
    description:
      "Utvrđujemo da li kompanija i planirana investicija ispunjavaju uslove konkretnog poziva.",
  },
  {
    step: "02",
    title: "Finansijska struktura",
    description:
      "Osmišljavamo kombinaciju granta, kredita i sopstvenog učešća koja najmanje opterećuje likvidnost.",
  },
  {
    step: "03",
    title: "Priprema prijave",
    description:
      "Pripremamo biznis plan, investicioni program i kompletnu prateću dokumentaciju.",
  },
  {
    step: "04",
    title: "Praćenje i isplata",
    description:
      "Vodimo projekat sve do zahteva za isplatu i izveštavanja prema donatoru.",
  },
];
