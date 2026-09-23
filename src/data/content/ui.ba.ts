import type * as Mk from "./ui";

/** Bosnian twin of `ui.ts`. */
export const ui: typeof Mk.ui = {
  site: {
    title: "WVP Consulting | Poslovno i finansijsko savjetovanje",
    description:
      "WVP Plus Consulting pruža finansijsko i poslovno savjetovanje, pristup finansijama, grantove i sufinansiranje, marketing i pristup novim tržištima za kompanije u Sjevernoj Makedoniji i regionu.",
    shareDescription:
      "Partner u procesu rasta: pristup finansijama, grantovi, poslovno planiranje i razvoj novih tržišta.",
    shareImageAlt: "WVP Plus Consulting",
    keywords: [
      "finansijsko savjetovanje",
      "poslovno savjetovanje",
      "grantovi",
      "sufinansiranje",
      "IPARD",
      "pristup finansijama",
      "investicije",
      "poslovni plan",
      "Brčko",
    ],
  },

  chrome: {
    skipToContent: "Preskoči na sadržaj",
    homeLinkLabel: "WVP Plus Consulting — početna stranica",
    mainNavLabel: "Glavna navigacija",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    allServices: "Pogledajte sve usluge",
    linkedinLabel: "WVP Plus Consulting na LinkedInu",
    rightsReserved: "Sva prava zadržana.",
    bookMeetingLines: ["Zakažite", "sastanak"],
  },

  home: {
    metaTitle: "WVP Consulting | Poslovno i finansijsko savjetovanje",
    metaDescription:
      "Za klijente biramo najbolje. Finansijsko savjetovanje, pristup finansijama, grantovi i sufinansiranje, razvoj poslovanja i pristup novim tržištima — s više od 4.650 uspješno završenih projekata.",
    heroLabel: "Istaknute poruke",
    heroRoleDescription: "rotirajući baner",
    previousSlide: "Prethodni slajd",
    nextSlide: "Sljedeći slajd",
    slide: "Slajd",
    servicesHeading: "Pogledajte kako vam možemo pomoći",
    learnMore: "Saznajte više",
    learnMoreAbout: "o usluzi",
  },

  services: {
    metaTitle: "Usluge",
    metaDescription:
      "Od pristupa finansijama do tržišnog i strateškog razvoja poslovanja — finansijsko savjetovanje, grantovi i sufinansiranje, poslovno savjetovanje, marketing, pristup tržištu i ESG standardizacija.",
    heroTitle: "Usluge",
    heroSubtitle:
      "Od pristupa finansijama do tržišnog i strateškog razvoja poslovanja, nudimo potpunu podršku za rast i razvoj vašeg biznisa",
    heroImageAlt: "Konsultanti analiziraju finansijske grafikone na tabletu",
    serviceImageAlt: "Ilustracija za uslugu",
  },

  programmes: {
    metaTitle: "Programi",
    metaDescription:
      "Aktuelni programi bespovratnih sredstava i sufinansiranja: IPARD 3, Fond za inovacije, EBRD, Kreativna Evropa i nacionalne mjere za konkurentnost.",
    heroImageAlt: "Kovanice i finansijski grafikoni",
    coFinancingLabel: "Stopa sufinansiranja",
    coFinancing: "Sufinansiranje",
    deadlineLabel: "Rok",
    sectorsLabel: "Sektori",
    processHeading: "Kako teče jedan projekat",
    processSubtitle:
      "Četiri koraka od provjere prihvatljivosti do isplate sredstava",
    eligibilityCta: "Provjerite da li ste prihvatljivi",
  },

  about: {
    metaTitle: "O nama",
    metaDescription:
      "WVP Plus Consulting je dio austrijske WVP GROUP s tradicijom od 1985. godine. Upoznajte našu priču, vrijednosti i tim koji stoji iza više od 4.650 realizovanih projekata.",
    heroTitle: "Naša kompanija",
    heroSubtitle:
      "Posvećeni pružanju sveobuhvatnog finansijskog savjetovanja i pristupa tržištu.",
    heroImageAlt: "Recepcija i radni prostor u kancelarijama kompanije",
    historyHeading: "Historijat razvoja",
    historySubtitle:
      "Od Skoplja do tržišta Evropske unije — rast grupacije u regionu",
    offerHeading: "Šta nudimo",
    offerSubtitle:
      "Potpun obuhvat usluga za finansiranje, nastup na tržištu i izvještavanje",
    valuesHeading: "Naše vrijednosti",
    valuesSubtitle: "Principi koji vode naš rad i oblikuju naš angažman",
    teamImageAlt: "Kolaž fotografija tima WVP Plus Consulting",
  },

  contact: {
    metaTitle: "Kontakt",
    metaDescription:
      "Stupite u kontakt s timom WVP Plus Consulting — telefonom, emailom, na sastanku u kancelariji ili putem online konsultacije.",
    heroImageAlt: "Konsultanti na poslu u kancelariji kompanije",
    openMapLabel: "Otvorite lokaciju ({city}) na Google mapama",
    mapTitle: "Mapa s lokacijom naše kancelarije ({city})",
  },

  contactForm: {
    subjects: [
      "Pristup finansijama",
      "Grantovi i sufinansiranje",
      "Poslovni plan ili investicioni program",
      "Marketing i razvoj poslovanja",
      "Pristup novim tržištima",
      "ESG standardizacija",
      "Ostalo",
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
      email: "ime@kompanija.ba",
      phone: "+387 6X XXX XXX",
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
    honeypotLabel: "Web-stranica",
    challengeLoading:
      "Provjera da niste robot se još učitava. Pokušajte ponovo za trenutak.",
    send: "Pošalji poruku",
    sending: "Slanje…",
    sent: "Poruka je poslana. Kontaktirat ćemo vas u roku od 24 sata.",
    failed: "Poruka nije poslana. Pokušajte ponovo ili nam pišite direktno na email.",
    requiredBefore: "Polja označena",
    requiredStar: "zvjezdicom",
    requiredAfter: "su obavezna.",
  },

  blog: {
    metaTitle: "Finansijski savjeti",
    metaDescription:
      "Finansijske vijesti, otvoreni pozivi za grantove, iskustva s terena i priče o uspjehu kompanija s kojima radimo.",
    heading: "Finansijski savjeti",
    subtitle: "Finansijske vijesti, naša iskustva i priče o uspjehu na jednom mjestu",
    sectionHeading: "Finansije u svakodnevnoj praksi",
    sectionSubtitle:
      "Saznajte više o finansijskim vijestima, našim iskustvima i pričama o uspjehu",
    allPosts: "Sve objave",
    readMore: "Pročitajte više",
    backToPosts: "Nazad na objave",
    related: "Povezane objave",
    notFound: "Objava nije pronađena",
    filterAll: "Sve",
    filterLabel: "Filtriraj po kategoriji",
    emptyCategory: "U ovoj kategoriji nema objava.",
    emptyList: "Još nema objava.",
    languageNote: "Objave su dostupne samo na makedonskom jeziku.",
  },

  legal: {
    languageNote: "Ovaj dokument je dostupan samo na makedonskom jeziku.",
  },
};
