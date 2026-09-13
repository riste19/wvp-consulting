import type * as Mk from "./programmes";
import type { Programme } from "./programmes";

/** Albanian twin of `programmes.ts`. Ids and statuses are shared. */

export const programmeStatusLabel: typeof Mk.programmeStatusLabel = {
  otvoren: "Thirrje e hapur",
  najaven: "Thirrje e paralajmëruar",
  zatvoren: "Thirrje e mbyllur",
};

export const programmes: Programme[] = [
  {
    id: "ipard-3-merka-1",
    name: "IPARD 3 — Masa 1",
    funder: "Bashkimi Evropian / Agjencia për Mbështetje Financiare",
    coRate: "deri në 75%",
    maxAmount: "deri në 750.000 €",
    deadline: "Vazhdimisht, pas shpalljes së thirrjes publike",
    sectors: ["Bujqësi", "Blegtori", "Pemëtari"],
    description:
      "Investime në mjete themelore të ekonomive bujqësore: mekanizim, ngritje të mbjelljeve, sisteme ujitjeje, objekte magazinimi dhe sisteme fotovoltaike për konsum vetjak.",
    status: "otvoren",
  },
  {
    id: "ipard-3-merka-3",
    name: "IPARD 3 — Masa 3",
    funder: "Bashkimi Evropian / Agjencia për Mbështetje Financiare",
    coRate: "deri në 60%",
    maxAmount: "deri në 1.500.000 €",
    deadline: "Vazhdimisht, pas shpalljes së thirrjes publike",
    sectors: ["Industria ushqimore", "Përpunim", "Eksport"],
    description:
      "Investime në përpunimin dhe tregtimin e produkteve bujqësore — linja prodhimi, kapacitete ftohëse, laboratorë për kontrollin e cilësisë dhe certifikim për tregjet e eksportit.",
    status: "otvoren",
  },
  {
    id: "fond-za-inovacii",
    name: "INOVA — Fondi për Inovacione dhe Zhvillim Teknologjik",
    funder: "Fondi për Inovacione dhe Zhvillim Teknologjik",
    coRate: "deri në 70%",
    maxAmount: "deri në 100.000 €",
    deadline: "Sipas kalendarit vjetor të thirrjeve",
    sectors: ["Teknologji", "Startupe", "Digjitalizim"],
    description:
      "Mbështetje për zhvillimin e produkteve dhe shërbimeve të reja, komercializimin e inovacioneve dhe përmirësimin teknologjik të prodhimit ekzistues.",
    status: "otvoren",
  },
  {
    id: "ebrd-advice",
    name: "EBRD — Këshillim për ndërmarrjet e vogla",
    funder: "Banka Evropiane për Rindërtim dhe Zhvillim",
    coRate: "deri në 70%",
    maxAmount: "deri në 25.000 €",
    deadline: "E hapur vazhdimisht",
    sectors: ["NVM", "Zhvillim organizativ", "ESG"],
    description:
      "Bashkëfinancim i projekteve të konsulencës së jashtme: strategji, efiçencë energjetike, transformim digjital, futje të standardeve dhe sistemeve të cilësisë.",
    status: "otvoren",
  },
  {
    id: "kreativna-evropa",
    name: "Evropa Krijuese — MEDIA",
    funder: "Bashkimi Evropian",
    coRate: "deri në 60%",
    maxAmount: "deri në 60.000 € për projekt",
    deadline: "Thirrje vjetore me afate fikse",
    sectors: ["Kulturë", "Prodhim filmik", "Sektori audiovizual"],
    description:
      "Zhvillim i filmave artistikë, dokumentarë dhe të animuar me potencial ndërkombëtar, si dhe mbështetje për bashkëprodhime dhe shpërndarje.",
    status: "najaven",
  },
  {
    id: "nacionalni-merki",
    name: "Masat kombëtare për konkurrueshmëri",
    funder: "Qeveria e Republikës së Maqedonisë së Veriut",
    coRate: "deri në 50%",
    maxAmount: "sipas masës",
    deadline: "Sipas programit vjetor",
    sectors: ["Prodhim", "Eksport", "Punësim"],
    description:
      "Instrumente kombëtare për mbështetjen e eksportit, punësime të reja, modernizim të pajisjeve dhe pjesëmarrje në panaire ndërkombëtare.",
    status: "najaven",
  },
];

export const programmesIntro: typeof Mk.programmesIntro = {
  title: "Programet",
  subtitle:
    "Burime aktuale të mjeteve të pakthyeshme dhe bashkëfinancimit për kompanitë në Maqedoninë e Veriut",
  lead: "I ndjekim të gjitha instrumentet kombëtare dhe ndërkombëtare të mbështetjes dhe ju njoftojmë kur projekti juaj bëhet i përshtatshëm. Më poshtë është pasqyra e programeve me të cilat punojmë më shpesh.",
};

export const programmeProcess: typeof Mk.programmeProcess = [
  {
    step: "01",
    title: "Kontrolli i përshtatshmërisë",
    description:
      "Përcaktojmë nëse kompania dhe investimi i planifikuar i plotësojnë kushtet e thirrjes konkrete.",
  },
  {
    step: "02",
    title: "Konstruksioni financiar",
    description:
      "Hartojmë kombinimin e grantit, kredisë dhe pjesëmarrjes vetjake që e rëndon më pak likuiditetin.",
  },
  {
    step: "03",
    title: "Hartimi i aplikacionit",
    description:
      "Përgatisim planin e biznesit, programin e investimit dhe dokumentacionin e plotë shoqërues.",
  },
  {
    step: "04",
    title: "Monitorimi dhe pagesa",
    description:
      "E udhëheqim projektin deri te kërkesa për pagesë dhe raportimi ndaj donatorit.",
  },
];
