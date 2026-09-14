import type * as Mk from "./ui";

/** Serbian (Latin) twin of `ui.ts`. */
export const ui: typeof Mk.ui = {
  site: {
    title: "WVP Consulting | Biznis i finansijski konsalting",
    description:
      "WVP Plus Consulting pruža finansijski i biznis konsalting, pristup finansijama, grantove i sufinansiranje, marketing i pristup novim tržištima za kompanije u Severnoj Makedoniji i regionu.",
    shareDescription:
      "Partner u procesu rasta: pristup finansijama, grantovi, biznis planiranje i razvoj novih tržišta.",
    shareImageAlt: "WVP Plus Consulting",
    keywords: [
      "finansijski konsalting",
      "biznis konsalting",
      "grantovi",
      "sufinansiranje",
      "IPARD",
      "pristup finansijama",
      "investicije",
      "biznis plan",
      "Beograd",
    ],
  },

  chrome: {
    skipToContent: "Preskoči na sadržaj",
    homeLinkLabel: "WVP Plus Consulting — početna stranica",
    mainNavLabel: "Glavna navigacija",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    allServices: "Pogledajte sve usluge",
    linkedinLabel: "WVP Plus Consulting na LinkedIn-u",
    rightsReserved: "Sva prava zadržana.",
    bookMeetingLines: ["Zakažite", "sastanak"],
  },

  home: {
    metaTitle: "WVP Consulting | Biznis i finansijski konsalting",
    metaDescription:
      "Za klijente biramo najbolje. Finansijski konsalting, pristup finansijama, grantovi i sufinansiranje, razvoj poslovanja i pristup novim tržištima — sa više od 4.650 uspešno realizovanih projekata.",
    heroLabel: "Istaknute poruke",
    heroRoleDescription: "rotirajući baner",
    previousSlide: "Prethodni slajd",
    nextSlide: "Sledeći slajd",
    slide: "Slajd",
    servicesHeading: "Pogledajte kako vam možemo pomoći",
    learnMore: "Saznajte više",
    learnMoreAbout: "o usluzi",
  },

  services: {
    metaTitle: "Usluge",
    metaDescription:
      "Od pristupa finansijama do tržišnog i strateškog razvoja poslovanja — finansijski konsalting, grantovi i sufinansiranje, biznis konsalting, marketing, pristup tržištu i ESG standardizacija.",
    heroTitle: "Usluge",
    heroSubtitle:
      "Od pristupa finansijama do tržišnog i strateškog razvoja poslovanja, nudimo potpunu podršku za rast i razvoj vašeg biznisa",
    heroImageAlt: "Konsultanti analiziraju finansijske grafikone na tabletu",
    serviceImageAlt: "Ilustracija za uslugu",
  },

  programmes: {
    metaTitle: "Programi",
    metaDescription:
      "Aktuelni programi bespovratnih sredstava i sufinansiranja: IPARD 3, Fond za inovacije, EBRD, Kreativna Evropa i nacionalne mere za konkurentnost.",
    heroImageAlt: "Novčići i finansijski grafikoni",
    coFinancingLabel: "Stopa sufinansiranja",
    coFinancing: "Sufinansiranje",
    deadlineLabel: "Rok",
    sectorsLabel: "Sektori",
    processHeading: "Kako teče jedan projekat",
    processSubtitle: "Četiri koraka od provere podobnosti do isplate sredstava",
    eligibilityCta: "Proverite da li ste podobni",
  },

  about: {
    metaTitle: "O nama",
    metaDescription:
      "WVP Plus Consulting je deo austrijske WVP GROUP sa tradicijom od 1985. godine. Upoznajte našu priču, vrednosti i tim koji stoji iza više od 4.650 realizovanih projekata.",
    heroTitle: "Naša kompanija",
    heroSubtitle:
      "Posvećeni pružanju sveobuhvatnog finansijskog i tržišnog konsaltinga.",
    heroImageAlt: "Recepcija i radni prostor u kancelarijama kompanije",
    historyHeading: "Istorijat razvoja",
    historySubtitle:
      "Od Skoplja do tržišta Evropske unije — rast grupacije u regionu",
    offerHeading: "Šta nudimo",
    offerSubtitle:
      "Potpun obuhvat usluga za finansiranje, nastup na tržištu i izveštavanje",
    valuesHeading: "Naše vrednosti",
    valuesSubtitle: "Principi koji vode naš rad i oblikuju naš angažman",
    teamImageAlt: "Kolaž fotografija tima WVP Plus Consulting",
  },

  contact: {
    metaTitle: "Kontakt",
    metaDescription:
      "Stupite u kontakt sa timom WVP Plus Consulting — telefonom, emailom, na sastanku u kancelariji ili putem online konsultacije.",
    heroImageAlt: "Konsultanti na poslu u kancelariji kompanije",
    openMapLabel: "Otvorite lokaciju ({city}) na Google mapama",
    mapImageAlt: "Poslovna zgrada u kojoj se nalazi kancelarija ({city})",
  },

  contactForm: {
    subjects: [
      "Pristup finansijama",
      "Grantovi i sufinansiranje",
      "Biznis plan ili investicioni program",
      "Marketing i razvoj poslovanja",
      "Pristup novim tržištima",
      "ESG standardizacija",
      "Drugo",
    ],
    labels: {
      firstName: "Ime",
      lastName: "Prezime",
      company: "Kompanija",
      email: "Email",
      phone: "Telefon",
      subject: "Tema",
      message: "Poruka / pitanje",
    },
    placeholders: {
      firstName: "Vaše ime",
      lastName: "Vaše prezime",
      company: "Naziv vaše kompanije",
      email: "ime@kompanija.com",
      phone: "+381 6X XXX XXXX",
      subject: "Izaberite temu",
      message: "Recite nam nešto više o vašem projektu…",
    },
    errors: {
      firstName: "Unesite vaše ime.",
      lastName: "Unesite vaše prezime.",
      emailMissing: "Unesite vaš email.",
      emailInvalid: "Unesite ispravnu email adresu.",
      phone: "Unesite ispravan broj telefona.",
      subject: "Izaberite temu poruke.",
      message: "Poruka mora imati najmanje 10 znakova.",
    },
    honeypotLabel: "Veb-sajt",
    challengeLoading:
      "Provera da niste robot se još učitava. Pokušajte ponovo za trenutak.",
    send: "Pošalji poruku",
    sending: "Slanje…",
    sent: "Poruka je poslata. Kontaktiraćemo vas u roku od 24 sata.",
    failed: "Poruka nije poslata. Pokušajte ponovo ili nam pišite direktno na email.",
    requiredBefore: "Polja označena",
    requiredStar: "zvezdicom",
    requiredAfter: "su obavezna.",
  },

  blog: {
    metaTitle: "Finansijski saveti",
    metaDescription:
      "Finansijske vesti, otvoreni pozivi za grantove, iskustva sa terena i uspešne priče kompanija sa kojima radimo.",
    heading: "Finansijski saveti",
    subtitle: "Finansijske vesti, naša iskustva i uspešne priče na jednom mestu",
    sectionHeading: "Finansije u svakodnevnoj praksi",
    sectionSubtitle:
      "Saznajte više o finansijskim novostima, našim iskustvima i uspešnim pričama",
    allPosts: "Sve objave",
    readMore: "Pročitaj više",
    backToPosts: "Nazad na objave",
    related: "Povezane objave",
    notFound: "Objava nije pronađena",
    filterAll: "Sve",
    filterLabel: "Filtriraj po kategoriji",
    emptyCategory: "Nema objava u ovoj kategoriji.",
    languageNote: "Objave su dostupne samo na makedonskom jeziku.",
  },

  legal: {
    languageNote: "Ovaj dokument je dostupan samo na makedonskom jeziku.",
  },
};
