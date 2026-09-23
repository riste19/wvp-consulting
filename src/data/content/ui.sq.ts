import type * as Mk from "./ui";

/** Albanian twin of `ui.ts`. */
export const ui: typeof Mk.ui = {
  site: {
    title: "WVP Consulting | Konsulencë biznesi dhe financiare",
    description:
      "WVP Plus Consulting ofron konsulencë financiare dhe biznesi, qasje në financa, grante dhe bashkëfinancim, marketing dhe qasje në tregje të reja për kompanitë në Maqedoninë e Veriut dhe në rajon.",
    shareDescription:
      "Partner në procesin e rritjes: qasje në financa, grante, planifikim biznesi dhe zhvillim i tregjeve të reja.",
    shareImageAlt: "WVP Plus Consulting",
    keywords: [
      "konsulencë financiare",
      "konsulencë biznesi",
      "grante",
      "bashkëfinancim",
      "IPARD",
      "qasje në financa",
      "investime",
      "plan biznesi",
      "Shkup",
    ],
  },

  chrome: {
    skipToContent: "Kalo te përmbajtja",
    homeLinkLabel: "WVP Plus Consulting — faqja kryesore",
    mainNavLabel: "Navigimi kryesor",
    openMenu: "Hap menunë",
    closeMenu: "Mbyll menunë",
    allServices: "Shiko të gjitha shërbimet",
    linkedinLabel: "WVP Plus Consulting në LinkedIn",
    rightsReserved: "Të gjitha të drejtat e rezervuara.",
    bookMeetingLines: ["Caktoni", "takim"],
  },

  home: {
    metaTitle: "WVP Consulting | Konsulencë biznesi dhe financiare",
    metaDescription:
      "Për klientët zgjedhim më të mirën. Konsulencë financiare, qasje në financa, grante dhe bashkëfinancim, zhvillim biznesi dhe qasje në tregje të reja — me mbi 4.650 projekte të përfunduara me sukses.",
    heroLabel: "Mesazhe të veçuara",
    heroRoleDescription: "baner rrotullues",
    previousSlide: "Slajdi i mëparshëm",
    nextSlide: "Slajdi i ardhshëm",
    slide: "Slajdi",
    servicesHeading: "Shikoni si mund t'ju ndihmojmë",
    learnMore: "Mësoni më shumë",
    learnMoreAbout: "për",
  },

  services: {
    metaTitle: "Shërbimet",
    metaDescription:
      "Nga qasja në financa deri te zhvillimi i tregut dhe strategjik i biznesit — konsulencë financiare, grante dhe bashkëfinancim, konsulencë biznesi, marketing, qasje në tregje dhe standardizim ESG.",
    heroTitle: "Shërbimet",
    heroSubtitle:
      "Nga qasja në financa deri te zhvillimi i tregut dhe strategjik i biznesit, ne ofrojmë mbështetje të plotë për rritjen dhe zhvillimin e biznesit tuaj",
    heroImageAlt: "Konsulentë që analizojnë grafikë financiarë në tablet",
    serviceImageAlt: "Ilustrim për shërbimin",
  },

  programmes: {
    metaTitle: "Programet",
    metaDescription:
      "Programe aktuale për mjete të pakthyeshme dhe bashkëfinancim: IPARD 3, Fondi për Inovacione, EBRD, Evropa Krijuese dhe masat kombëtare për konkurrueshmëri.",
    heroImageAlt: "Monedha dhe grafikë financiarë",
    coFinancingLabel: "Shkalla e bashkëfinancimit",
    coFinancing: "Bashkëfinancim",
    deadlineLabel: "Afati",
    sectorsLabel: "Sektorët",
    processHeading: "Si ecën një projekt",
    processSubtitle:
      "Katër hapa nga kontrolli i përshtatshmërisë deri te pagesa e mjeteve",
    eligibilityCta: "Kontrolloni nëse jeni të përshtatshëm",
  },

  about: {
    metaTitle: "Rreth nesh",
    metaDescription:
      "WVP Plus Consulting është pjesë e WVP GROUP austriake me traditë që nga viti 1985. Njihuni me historinë, vlerat dhe ekipin tonë që qëndron pas mbi 4.650 projekteve të realizuara.",
    heroTitle: "Kompania jonë",
    heroSubtitle:
      "Të përkushtuar në ofrimin e konsulencës gjithëpërfshirëse financiare dhe të qasjes në treg.",
    heroImageAlt: "Recepsioni dhe hapësira e punës në zyrat e kompanisë",
    historyHeading: "Historiku i zhvillimit",
    historySubtitle:
      "Nga Shkupi deri te tregu i Bashkimit Evropian — rritja e grupit në rajon",
    offerHeading: "Çfarë ofrojmë",
    offerSubtitle:
      "Gamë e plotë shërbimesh për financim, prezantim në treg dhe raportim",
    valuesHeading: "Vlerat tona",
    valuesSubtitle:
      "Parimet që udhëheqin punën tonë dhe formësojnë angazhimin tonë",
    teamImageAlt: "Kolazh fotografish të ekipit të WVP Plus Consulting",
  },

  contact: {
    metaTitle: "Kontakti",
    metaDescription:
      "Kontaktoni ekipin e WVP Plus Consulting — telefon, e-postë, takim në zyrë ose konsultim online.",
    heroImageAlt: "Konsulentë në punë në zyrën e kompanisë",
    openMapLabel: "Hapni vendndodhjen në {city} në Google Maps",
    mapTitle: "Harta me vendndodhjen e zyrës sonë në {city}",
  },

  contactForm: {
    subjects: [
      "Qasje në financa",
      "Grante dhe bashkëfinancim",
      "Plan biznesi ose program investimi",
      "Marketing dhe zhvillim biznesi",
      "Qasje në tregje të reja",
      "Standardizim ESG",
      "Tjetër",
    ],
    labels: {
      firstName: "Emri",
      lastName: "Mbiemri",
      company: "Kompania",
      email: "E-posta",
      phone: "Telefoni",
      subject: "Tema",
      message: "Mesazhi / pyetja",
    },
    placeholders: {
      firstName: "Emri juaj",
      lastName: "Mbiemri juaj",
      company: "Emri i kompanisë suaj",
      email: "emri@kompania.mk",
      phone: "+389 7X XXX XXX",
      subject: "Zgjidhni temën",
      message: "Na tregoni diçka më shumë për projektin tuaj…",
    },
    errors: {
      firstName: "Shkruani emrin tuaj.",
      lastName: "Shkruani mbiemrin tuaj.",
      emailMissing: "Shkruani e-postën tuaj.",
      emailInvalid: "Shkruani një adresë të vlefshme e-poste.",
      phone: "Shkruani një numër telefoni të vlefshëm.",
      subject: "Zgjidhni temën e mesazhit.",
      message: "Mesazhi duhet të ketë të paktën 10 karaktere.",
    },
    honeypotLabel: "Faqja e internetit",
    challengeLoading:
      "Verifikimi se nuk jeni robot ende po ngarkohet. Provoni përsëri pas pak.",
    send: "Dërgo mesazhin",
    sending: "Duke u dërguar…",
    sent: "Mesazhi u dërgua. Do t'ju kontaktojmë brenda 24 orëve.",
    failed:
      "Mesazhi nuk u dërgua. Provoni përsëri ose na shkruani në e-postë.",
    requiredBefore: "Fushat e shënuara me",
    requiredStar: "yll",
    requiredAfter: "janë të detyrueshme.",
  },

  blog: {
    metaTitle: "Këshilla financiare",
    metaDescription:
      "Lajme financiare, thirrje të hapura për grante, përvoja nga terreni dhe histori suksesi të kompanive me të cilat punojmë.",
    heading: "Këshilla financiare",
    subtitle:
      "Lajmet financiare, përvojat tona dhe historitë e suksesit në një vend",
    sectionHeading: "Financat në praktikën e përditshme",
    sectionSubtitle:
      "Mësoni më shumë për lajmet financiare, përvojat tona dhe historitë e suksesit",
    allPosts: "Të gjitha postimet",
    readMore: "Lexoni më shumë",
    backToPosts: "Kthehu te postimet",
    related: "Postime të ngjashme",
    notFound: "Postimi nuk u gjet",
    filterAll: "Të gjitha",
    filterLabel: "Filtro sipas kategorisë",
    emptyCategory: "Nuk ka postime në këtë kategori.",
    emptyList: "Ende nuk ka postime.",
    languageNote: "Postimet janë në dispozicion vetëm në gjuhën maqedonase.",
  },

  legal: {
    languageNote: "Ky dokument është në dispozicion vetëm në gjuhën maqedonase.",
  },
};
