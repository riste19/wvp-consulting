import type * as Mk from "./ui";

/** Croatian twin of `ui.ts`. */
export const ui: typeof Mk.ui = {
  site: {
    title: "WVP Consulting | Poslovno i financijsko savjetovanje",
    description:
      "WVP Plus Consulting pruža financijsko i poslovno savjetovanje, pristup financijama, bespovratna sredstva i sufinanciranje, marketing i pristup novim tržištima za tvrtke u Sjevernoj Makedoniji i regiji.",
    shareDescription:
      "Partner u procesu rasta: pristup financijama, bespovratna sredstva, poslovno planiranje i razvoj novih tržišta.",
    shareImageAlt: "WVP Plus Consulting",
    keywords: [
      "financijsko savjetovanje",
      "poslovno savjetovanje",
      "bespovratna sredstva",
      "sufinanciranje",
      "IPARD",
      "pristup financijama",
      "ulaganja",
      "poslovni plan",
      "Rijeka",
    ],
  },

  chrome: {
    skipToContent: "Preskoči na sadržaj",
    homeLinkLabel: "WVP Plus Consulting — početna stranica",
    mainNavLabel: "Glavna navigacija",
    openMenu: "Otvori izbornik",
    closeMenu: "Zatvori izbornik",
    allServices: "Pogledajte sve usluge",
    linkedinLabel: "WVP Plus Consulting na LinkedInu",
    rightsReserved: "Sva prava pridržana.",
    bookMeetingLines: ["Dogovorite", "sastanak"],
  },

  home: {
    metaTitle: "WVP Consulting | Poslovno i financijsko savjetovanje",
    metaDescription:
      "Za klijente biramo najbolje. Financijsko savjetovanje, pristup financijama, bespovratna sredstva i sufinanciranje, razvoj poslovanja i pristup novim tržištima — s više od 4.650 uspješno završenih projekata.",
    heroLabel: "Istaknute poruke",
    heroRoleDescription: "rotirajući natpis",
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
      "Od pristupa financijama do tržišnog i strateškog razvoja poslovanja — financijsko savjetovanje, bespovratna sredstva i sufinanciranje, poslovno savjetovanje, marketing, pristup tržištu i ESG standardizacija.",
    heroTitle: "Usluge",
    heroSubtitle:
      "Od pristupa financijama do tržišnog i strateškog razvoja poslovanja, nudimo potpunu podršku rastu i razvoju vašeg poslovanja",
    heroImageAlt: "Savjetnici analiziraju financijske grafikone na tabletu",
    serviceImageAlt: "Ilustracija za uslugu",
  },

  programmes: {
    metaTitle: "Programi",
    metaDescription:
      "Aktualni programi bespovratnih sredstava i sufinanciranja: IPARD 3, Fond za inovacije, EBRD, Kreativna Europa i nacionalne mjere za konkurentnost.",
    heroImageAlt: "Kovanice i financijski grafikoni",
    coFinancingLabel: "Stopa sufinanciranja",
    coFinancing: "Sufinanciranje",
    deadlineLabel: "Rok",
    sectorsLabel: "Sektori",
    processHeading: "Kako teče jedan projekt",
    processSubtitle:
      "Četiri koraka od provjere prihvatljivosti do isplate sredstava",
    eligibilityCta: "Provjerite jeste li prihvatljivi",
  },

  about: {
    metaTitle: "O nama",
    metaDescription:
      "WVP Plus Consulting dio je austrijske WVP GROUP s tradicijom od 1985. godine. Upoznajte našu priču, vrijednosti i tim koji stoji iza više od 4.650 ostvarenih projekata.",
    heroTitle: "Naša tvrtka",
    heroSubtitle:
      "Posvećeni pružanju sveobuhvatnog financijskog savjetovanja i pristupa tržištu.",
    heroImageAlt: "Recepcija i radni prostor u uredima tvrtke",
    historyHeading: "Povijest razvoja",
    historySubtitle:
      "Od Skopja do tržišta Europske unije — rast grupacije u regiji",
    offerHeading: "Što nudimo",
    offerSubtitle:
      "Cjelovit opseg usluga za financiranje, nastup na tržištu i izvještavanje",
    valuesHeading: "Naše vrijednosti",
    valuesSubtitle: "Načela koja vode naš rad i oblikuju naš angažman",
    teamImageAlt: "Kolaž fotografija tima WVP Plus Consulting",
  },

  contact: {
    metaTitle: "Kontakt",
    metaDescription:
      "Javite se timu WVP Plus Consulting — telefonom, e-poštom, na sastanku u uredu ili putem online konzultacija.",
    heroImageAlt: "Savjetnici na poslu u uredu tvrtke",
    openMapLabel: "Otvorite lokaciju ({city}) na Google kartama",
    mapTitle: "Karta s lokacijom našeg ureda ({city})",
  },

  contactForm: {
    subjects: [
      "Pristup financijama",
      "Bespovratna sredstva i sufinanciranje",
      "Poslovni plan ili investicijski program",
      "Marketing i razvoj poslovanja",
      "Pristup novim tržištima",
      "ESG standardizacija",
      "Ostalo",
    ],
    labels: {
      firstName: "Ime",
      lastName: "Prezime",
      company: "Tvrtka",
      email: "E-pošta",
      phone: "Telefon",
      subject: "Tema",
      message: "Poruka / pitanje",
    },
    placeholders: {
      firstName: "Vaše ime",
      lastName: "Vaše prezime",
      company: "Naziv vaše tvrtke",
      email: "ime@tvrtka.hr",
      phone: "+385 9X XXX XXXX",
      subject: "Odaberite temu",
      message: "Recite nam nešto više o svom projektu…",
    },
    errors: {
      firstName: "Unesite svoje ime.",
      lastName: "Unesite svoje prezime.",
      emailMissing: "Unesite svoju e-poštu.",
      emailInvalid: "Unesite ispravnu adresu e-pošte.",
      phone: "Unesite ispravan broj telefona.",
      subject: "Odaberite temu poruke.",
      message: "Poruka mora imati najmanje 10 znakova.",
    },
    honeypotLabel: "Web-stranica",
    challengeLoading:
      "Provjera da niste robot još se učitava. Pokušajte ponovno za trenutak.",
    send: "Pošalji poruku",
    sending: "Slanje…",
    sent: "Poruka je poslana. Javit ćemo vam se u roku od 24 sata.",
    failed: "Poruka nije poslana. Pokušajte ponovno ili nam pišite izravno e-poštom.",
    requiredBefore: "Polja označena",
    requiredStar: "zvjezdicom",
    requiredAfter: "su obavezna.",
  },

  blog: {
    metaTitle: "Financijski savjeti",
    metaDescription:
      "Financijske vijesti, otvoreni pozivi za bespovratna sredstva, iskustva s terena i priče o uspjehu tvrtki s kojima surađujemo.",
    heading: "Financijski savjeti",
    subtitle:
      "Financijske vijesti, naša iskustva i priče o uspjehu na jednom mjestu",
    sectionHeading: "Financije u svakodnevnoj praksi",
    sectionSubtitle:
      "Saznajte više o financijskim vijestima, našim iskustvima i pričama o uspjehu",
    allPosts: "Sve objave",
    readMore: "Pročitajte više",
    backToPosts: "Natrag na objave",
    related: "Povezane objave",
    notFound: "Objava nije pronađena",
    filterAll: "Sve",
    filterLabel: "Filtriraj po kategoriji",
    emptyCategory: "U ovoj kategoriji nema objava.",
    emptyList: "Još nema objava.",
    languageNote: "Objave su dostupne samo na makedonskom jeziku.",
  },

  legal: {
    languageNote: "Ovaj dokument dostupan je samo na makedonskom jeziku.",
  },
};
