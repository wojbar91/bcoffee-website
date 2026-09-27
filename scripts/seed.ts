/**
 * Wgrywa do Sanity treść, którą wcześniej mieliśmy w kodzie. Uruchamiane raz,
 * po założeniu projektu:
 *
 *   npm run seed
 *
 * Domyślnie NIC nie nadpisuje: dokumenty, które już istnieją, zostają nietknięte.
 * Dzięki temu ponowne uruchomienie jest bezpieczne i nie kasuje wgranych zdjęć
 * ani poprawek wprowadzonych w Studio.
 *
 * `npm run seed -- --force` przywraca treść domyślną — świadomie destrukcyjne,
 * kasuje wszystkie referencje do zdjęć na nadpisywanych dokumentach.
 *
 * Zdjęć nie wgrywa — każdy slot dostaje opis, co ma tam wejść.
 */
import { createClient } from "@sanity/client";
import { offerPages, offerPageRef, photo } from "./offer-pages";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Brak NEXT_PUBLIC_SANITY_PROJECT_ID lub SANITY_WRITE_TOKEN w .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-05-19", useCdn: false });

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  wordmark: "B. COFFEE",
  siteName: "B. Coffee",
  metaTitle: "B. Coffee — kawiarnia na kółkach na eventy, targi i wesela",
  metaDescription:
    "Mobilna kawiarnia i barista na Wasze wydarzenie. Targi, event firmowy, wesele — przyjeżdżamy z barem, ekspresem i dobrym humorem.",
  phone: "604 372 787",
  phoneHref: "tel:+48604372787",
  inquiryEmail: "kontakt@bcoffee.pl",
  legalName: "B. COFFEE Wojciech Baranowski",
  street: "Strzelce 4",
  city: "58-124 Marcinowice",
  nip: "8842756984",
  regon: "362425207",
  shopUrl: "https://bcoffee.shop",
  instagramUrl: "https://www.instagram.com/bcoffeebehappy/",
  instagramHandle: "@bcoffeebehappy",
  facebookUrl: "https://www.facebook.com/bcoffeebehappy",
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroVariant: "foto",
  heroEyebrow: "Kawiarnia na kółkach",
  heroTitle: "Kawa, która",
  heroTitleHand: "robi imprezę",
  heroLead: "Targi, wesele, event firmowy — przyjeżdżamy z barem, ekspresem i dobrym humorem. Wy tylko powiedzcie gdzie.",
  heroCtaPrimary: { _type: "cta", label: "Szybka wycena", href: "#kontakt" },
  heroCtaSecondary: { _type: "cta", label: "604 372 787", href: "tel:+48604372787" },
  heroPhoto: photo("zdjęcie pełnoekranowe — bar kawowy w akcji, poziome, min. 2800px"),
  stickerLines: ["be", "happy"],
  tickerItems: ["KAWA NA EVENT", "BARISTA NA TARGI", "KAWA NA WESELE", "BAR Z LEMONIADĄ", "BE HAPPY"],
  introTitle: "Kawa to prosta sprawa. My robimy ją",
  introTitleHand: "dobrze",
  introBody:
    "Nasi bariści robią kawę i dobrą atmosferę — jedno z drugim idzie w parze. Goście zapamiętają wydarzenie, a przy okazji Waszą markę.",
  clientsLabel: "parzyliśmy kawę dla",
  clientLogos: Array.from({ length: 8 }, (_, i) => ({ ...photo(`logo klienta ${i + 1}`), _key: `logo-${i}` })),
  offerTitle: "Co robimy",
  offerLead: "kawa na każdą sytuację, serio każdą",
  brewedCoffees: 50000,
  statCaption: "zaparzonych kaw",
  statBody: "Bierzemy każde wyzwanie i pilnujemy, żeby klimat imprezy był na miejscu. Na liczniku mamy już ponad:",
  aboutEyebrow: "trochę o nas",
  aboutTitle: "B. Coffee",
  aboutTitleHand: "— be happy",
  aboutLead: "To nasze motto. Nasza kawa ma czynić happy i kropka.",
  aboutBody:
    "W branży jesteśmy od lat i wiemy, że kawa to nie tylko kawa: to uśmiech, dwa miłe słowa i atmosfera. Sprzęt i ziarno traktujemy poważnie. Siebie — trochę mniej.",
  aboutQuote: "Zadbamy o klimat. Wy zadbajcie o gości.",
  aboutPhoto: photo("zdjęcie zespołu, pionowe 3:4"),
  galleryLabel: "z ostatnich realizacji",
  galleryPhotos: [1, 2, 3].map((n) => ({ ...photo(`foto z eventu ${n}`), _key: `gal-${n}` })),
  shopStickerLines: ["do", "domu"],
  shopTitle: "Nasza kawa u Ciebie w kuchni",
  shopBody: "Ziarno, które parzymy na eventach — do kupienia w sklepie.",
  shopCtaLabel: "bcoffee.shop →",
  instagramTitle: "Obserwuj nas,",
  instagramTitleHand: "bądź na bieżąco",
  instagramPhotos: Array.from({ length: 6 }, (_, i) => ({ ...photo(`foto z Instagrama ${i + 1}`), _key: `ig-${i}` })),
};

const contactSection = {
  _id: "contactSection",
  _type: "contactSection",
  eyebrow: "szybka wycena",
  title: "Powiedz, co planujesz",
  submitLabel: "Wyślij zapytanie",
  successTitle: "dzięki!",
  successBody: "Odezwiemy się z wyceną. A jeśli sprawa pilna — dzwoń:",
  ownerName: "Wojciech Baranowski",
  ownerRole: "Właściciel, B. Coffee",
  ownerPhoto: photo("zdjęcie Wojtka, kwadrat"),
  revealPhoneLabel: "Pokaż numer",
  eventTypes: ["Event firmowy", "Targi / wystawa", "Wesele", "Impreza prywatna", "Coś innego"],
};

const offers = [
  {
    _id: "offer-kawa-na-event",
    _type: "offer",
    title: "Kawa na event",
    page: offerPageRef("offer-kawa-na-event"),
    photo: photo("foto — kawa na event"),
    order: 1,
    tilt: -1.2,
    wide: false,
  },
  {
    _id: "offer-barista-na-targi",
    _type: "offer",
    title: "Barista na targi",
    page: offerPageRef("offer-barista-na-targi"),
    photo: photo("foto — barista na targach"),
    order: 2,
    tilt: 1,
    wide: false,
  },
  {
    _id: "offer-kawa-na-wesele",
    _type: "offer",
    title: "Kawa na wesele",
    page: offerPageRef("offer-kawa-na-wesele"),
    photo: photo("foto — bar na weselu"),
    order: 3,
    tilt: 1.4,
    wide: false,
  },
  {
    _id: "offer-bar-z-lemoniada",
    _type: "offer",
    title: "Bar z lemoniadą",
    page: offerPageRef("offer-bar-z-lemoniada"),
    photo: photo("foto — bar z lemoniadą"),
    order: 4,
    wide: true,
    eyebrow: "nie tylko kawa",
    body: "Latem kawa nie zawsze wygrywa. Wtedy przyjeżdżamy z lemoniadą.",
    ctaLabel: "Zobacz ofertę →",
  },
];

/** Dokumenty budujemy jako literały, więc TS wnioskuje z nich unie — klient chce jednego kształtu. */
type SeedDoc = { _id: string; _type: string } & Record<string, unknown>;

const force = process.argv.includes("--force");

async function main() {
  const singletons = [siteSettings, homePage, contactSection] as SeedDoc[];

  if (force) {
    const ids = singletons.map((d) => d._id);
    const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, { ids });
    if (existing.length) {
      console.warn(`UWAGA: --force nadpisze ${existing.length} istniejących dokumentów: ${existing.join(", ")}.`);
      console.warn("Wszystkie podpięte zdjęcia i ręczne poprawki na nich przepadną.\n");
    }
  }

  const tx = client.transaction();

  for (const doc of singletons) {
    if (force) tx.createOrReplace(doc);
    else tx.createIfNotExists(doc);
  }

  // Usługi i podstrony zostawiamy w spokoju, jeśli już istnieją — mogły zostać ręcznie poprawione.
  // Podstrony przed kaflami: kafel trzyma twardą referencję do podstrony, więc musi
  // ją zastać, a nie odwrotnie.
  for (const doc of offerPages as unknown as SeedDoc[]) {
    tx.createIfNotExists(doc);
  }
  for (const doc of offers as SeedDoc[]) {
    tx.createIfNotExists(doc);
  }

  await tx.commit();
  console.log(`Gotowe. Dataset "${dataset}": strona główna, ${offerPages.length} podstron, ${offers.length} kafli usług.`);
  console.log(
    force
      ? "Tryb --force: istniejące dokumenty zostały nadpisane treścią domyślną."
      : "Istniejące dokumenty zostały nietknięte. Aby przywrócić treść domyślną: npm run seed -- --force",
  );
  console.log("Zdjęcia trzeba wrzucić ręcznie w Studio — każdy slot ma opis, co powinno tam być.");
}

main().catch((err) => {
  console.error("Zasilanie nie powiodło się:", err.message);
  process.exit(1);
});
