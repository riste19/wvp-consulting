import type { LegalDocument } from "./legal";

/** Croatian twin of `legal.ts`. */

export const privacyPolicy: LegalDocument = {
  title: "Politika privatnosti",
  description:
    "Kako prikupljamo, koristimo i štitimo osobne podatke posjetitelja i klijenata tvrtke WVP Plus Consulting.",
  updated: "12. rujna 2026.",
  intro:
    "Ova politika objašnjava koje osobne podatke obrađujemo kada koristite našu web-stranicu ili kada stupite u kontakt s nama, u koju svrhu ih obrađujemo i koja prava imate.",
  sections: [
    {
      heading: "Koje podatke prikupljamo",
      paragraphs: [
        "Prikupljamo samo podatke koji su nam potrebni kako bismo odgovorili na vaš upit i pružili dogovorenu uslugu.",
      ],
      items: [
        "Podaci koje unosite u kontaktni obrazac: ime, prezime, tvrtka, e-pošta, telefon i sadržaj poruke",
        "Podaci dobiveni izravnom komunikacijom e-poštom ili telefonom",
        "Osnovni tehnički podaci o posjetu stranici",
      ],
    },
    {
      heading: "U koju svrhu ih koristimo",
      paragraphs: [
        "Podatke koristimo isključivo kako bismo odgovorili na vaše pitanje, pripremili ponudu i proveli dogovorenu savjetodavnu uslugu. Ne koristimo ih za automatizirano donošenje odluka.",
      ],
    },
    {
      heading: "Dijeljenje s trećim stranama",
      paragraphs: [
        "Ne prodajemo i ne iznajmljujemo osobne podatke. Podatke dijelimo isključivo kada je to nužno za provedbu usluge — primjerice s bankom, fondom ili državnom institucijom kojoj se podnosi vaša prijava — i to samo uz vašu privolu ili na temelju zakonske obveze.",
      ],
    },
    {
      heading: "Rok čuvanja",
      paragraphs: [
        "Podatke čuvamo dok traje poslovni odnos i tijekom razdoblja propisanog zakonskim propisima o arhiviranju. Nakon isteka tog razdoblja podaci se brišu ili anonimiziraju.",
      ],
    },
    {
      heading: "Kolačići (cookies)",
      paragraphs: [
        "Ova web-stranica ne koristi kolačiće za praćenje, profiliranje ili oglašavanje. Ne postavljamo analitičke ni marketinške kolačiće i ne ugrađujemo sadržaje s društvenih mreža ili karte koji bi vas pratili po internetu.",
        "Stranica ne pohranjuje podatke u vašem pregledniku, ni putem kolačića ni putem drugih sličnih tehnologija. Upravo zato ne prikazujemo obavijest o privoli — ne postoji obrada za koju bi ona bila potrebna.",
        "Ako u budućnosti uvedemo statistiku posjeta ili drugu tehnologiju koja zahtijeva privolu, ova će politika biti ažurirana prije nego što se takva tehnologija aktivira.",
      ],
    },
    {
      heading: "Vaša prava",
      paragraphs: [
        "U svakom trenutku imate pravo na pristup, ispravak, ograničenje obrade i brisanje svojih osobnih podataka, kao i pravo na prigovor na njihovu obradu.",
      ],
      items: [
        "Pravo zatražiti kopiju podataka koje o vama čuvamo",
        "Pravo zatražiti ispravak netočnih podataka",
        "Pravo zatražiti brisanje kada više ne postoji osnova za obradu",
        "Pravo na pritužbu nadležnom tijelu za zaštitu osobnih podataka",
      ],
    },
    {
      heading: "Nadzorno tijelo",
      paragraphs: [
        "Nadzor nad obradom osobnih podataka u Republici Sjevernoj Makedoniji provodi Agencija za zaštitu osobnih podataka, u skladu sa Zakonom o zaštiti osobnih podataka („Službeni glasnik RSM“ br. 42/2020).",
        "Ako smatrate da su vam prilikom obrade osobnih podataka povrijeđena prava, imate pravo Agenciji podnijeti zahtjev za utvrđivanje povrede:",
      ],
      items: [
        "Agencija za zaštitu osobnih podataka",
        "bul. „Goce Delčev“ br. 18 (zgrada MRT-a, 14. kat), poštanski pretinac 417, 1000 Skopje",
        "Telefon: +389 2 3230 635",
        "E-pošta: info@privacy.mk",
        "Web-stranica: azlp.mk",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "Za sva pitanja u vezi s obradom osobnih podataka obratite nam se na info@wvpconsulting.com.",
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: "Uvjeti korištenja",
  description:
    "Uvjeti pod kojima možete koristiti web-stranicu i sadržaje tvrtke WVP Plus Consulting.",
  updated: "1. siječnja 2025.",
  intro:
    "Pristupanjem i korištenjem ove web-stranice prihvaćate uvjete navedene u nastavku. Ako se s njima ne slažete, molimo vas da ne koristite stranicu.",
  sections: [
    {
      heading: "Namjena sadržaja",
      paragraphs: [
        "Sadržaj stranice ima informativni karakter i ne predstavlja financijski, pravni ili investicijski savjet. Svaku poslovnu odluku treba donijeti nakon individualne analize i savjetovanja s našim timom.",
      ],
    },
    {
      heading: "Točnost informacija",
      paragraphs: [
        "Informacije o otvorenim pozivima, rokovima, stopama sufinanciranja i iznosima često se mijenjaju. Trudimo se održavati ih ažurnima, ali zadržavamo pravo izmjena bez prethodne najave. Uvijek provjerite aktualne uvjete kod nadležne institucije ili kod nas.",
      ],
    },
    {
      heading: "Intelektualno vlasništvo",
      paragraphs: [
        "Tekstovi, grafički elementi, logotip i ostali materijali na ovoj stranici zaštićeni su. Nije dopušteno njihovo preuzimanje, umnožavanje ili objavljivanje bez prethodne pisane suglasnosti.",
      ],
    },
    {
      heading: "Vanjske poveznice",
      paragraphs: [
        "Stranica može sadržavati poveznice na vanjske stranice. Ne odgovaramo za sadržaj i prakse zaštite privatnosti tih stranica.",
      ],
    },
    {
      heading: "Ograničenje odgovornosti",
      paragraphs: [
        "Ne odgovaramo za izravnu ili neizravnu štetu nastalu korištenjem informacija objavljenih na stranici bez prethodnog stručnog savjetovanja.",
      ],
    },
    {
      heading: "Izmjene uvjeta",
      paragraphs: [
        "Zadržavamo pravo u svakom trenutku izmijeniti ove uvjete. Važeća je verzija objavljena na ovoj stranici s navedenim datumom posljednjeg ažuriranja.",
      ],
    },
  ],
};
