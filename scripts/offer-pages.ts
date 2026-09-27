/**
 * Treść podstron ofertowych, przepisana dosłownie z bcoffee.pl.
 * Używana przez `npm run seed` (świeża instalacja) i `npm run migrate` (istniejący dataset).
 *
 * Zdjęć nie da się stamtąd pobrać — stary serwis ładuje je leniwie za przezroczystymi
 * podkładkami — więc każdy slot dostaje opis, co powinno tam wejść.
 */

export const photo = (placeholder: string) => ({ _type: "photo", placeholder });

const cta = (label: string, href: string) => ({ _type: "cta", label, href });

export const offerPages = [
  {
    _id: "offerPage-kawa-na-event",
    _type: "offerPage",
    title: "Kawa na event",
    slug: { _type: "slug", current: "kawa-na-event" },
    order: 1,
    eyebrow: "oferta eventowa",
    heroTitle: "Kawa",
    heroTitleHand: "na event",
    lead: "Wybierz swoją opcję — mobilna kawiarnia rowerowa albo bar kawowy. Obie przyjeżdżają z baristą, sprzętem i pełnym wyposażeniem.",
    ctaPrimary: cta("Szybka wycena", "#kontakt"),
    ctaSecondary: cta("604 372 787", "tel:+48604372787"),
    heroPhoto: photo("zdjęcie z eventu firmowego — bar kawowy wśród gości, poziome 4:5"),
    pillars: [
      "Personalizacja i jakościowy branding",
      "Kawa speciality i profesjonalny sprzęt",
      "Doświadczeni i uśmiechnięci bariści",
      "Obsługa na terenie całego kraju",
    ],
    introTitle: "Sprawdź swoje opcje",
    introBody:
      "Specjalizujemy się w kawie i oferujemy catering kawowy na miarę Twoich potrzeb. Niezależnie od wielkości wydarzenia zapewniamy profesjonalną obsługę i miłą atmosferę.",
    sections: [
      {
        _key: "rower",
        eyebrow: "Wynajmij mobilną kawiarnię",
        title: "Mobilna kawiarnia rowerowa",
        hand: "Wyróżnij się!",
        body: "Wybierz mobilny rower z kawą speciality i wyróżnij się! Kawiarnia rowerowa z Twoim brandingiem nada charakteru wydarzeniu i stworzy niesamowity klimat.",
        bullets: ["Dni otwarte", "Imprezy plenerowe", "Konferencje", "Akcje promocyjne", "Eventy firmowe", "… i wiele więcej!"],
        photo: photo("zdjęcie kawiarni rowerowej w plenerze, poziome 4:3"),
      },
      {
        _key: "bar",
        eyebrow: "Wynajmij mobilny bar kawowy",
        title: "Mobilny bar kawowy",
        hand: "To się opłaca!",
        body: "Planujesz zaaranżować przestrzeń firmową na targach? Potrzebujesz stoiska z pyszną kawą na spotkanie biznesowe? Mobilny bar to realne korzyści na Twoim wydarzeniu.",
        bullets: ["Spotkania biznesowe", "Prezentacje produktów", "Stoiska firmowe", "Imprezy branżowe"],
        photo: photo("zdjęcie mobilnego baru kawowego na stoisku, poziome 4:3"),
      },
    ],
    metaTitle: "Kawa na event",
    metaDescription:
      "Catering kawowy na eventy firmowe, konferencje i imprezy plenerowe. Mobilna kawiarnia rowerowa lub bar kawowy z baristą, obsługa w całym kraju.",
  },

  {
    _id: "offerPage-barista-na-targi",
    _type: "offerPage",
    title: "Barista na targi",
    slug: { _type: "slug", current: "barista-na-targi" },
    order: 2,
    eyebrow: "oferta targowa",
    heroTitle: "Barista",
    heroTitleHand: "na targi",
    lead: "Przyciągnij klientów z naszą kawą. Wynajem baristy z pełnym wyposażeniem na Twoje stoisko targowe.",
    ctaPrimary: cta("Wyślij zapytanie", "#kontakt"),
    ctaSecondary: cta("604 372 787", "tel:+48604372787"),
    heroPhoto: photo("zdjęcie baristy przy stoisku targowym, pionowe 4:5"),
    sections: [
      {
        _key: "korzysci",
        eyebrow: "Dlaczego warto?",
        title: "Zobacz korzyści",
        hand: "kawa otwiera rozmowę",
        body: "Targi to świetna okazja do prezentacji firmy i nawiązania cennych kontaktów biznesowych. To właśnie doskonała kawa tworzy atmosferę, która sprzyja rozmowie i przyciąga gości. Nasza oferta zawiera usługę wynajmu baristy na targi z pełnym wyposażeniem.",
        photo: photo("zdjęcie kolejki po kawę na stoisku targowym, poziome 4:3"),
      },
    ],
    introTitle: "Dopasujemy ofertę",
    introBody: "Zachęcamy do kontaktu w celu omówienia szczegółów i stworzenia dopasowanej oferty.",
    metaTitle: "Barista na targi",
    metaDescription:
      "Wynajem baristy z pełnym wyposażeniem na stoisko targowe. Kawa speciality, która przyciąga gości i otwiera rozmowę biznesową.",
  },

  {
    _id: "offerPage-bar-z-lemoniada",
    _type: "offerPage",
    title: "Bar z lemoniadą",
    slug: { _type: "slug", current: "bar-z-lemoniada" },
    order: 3,
    eyebrow: "nie tylko kawa",
    heroTitle: "Stoisko",
    heroTitleHand: "z lemoniadą",
    lead: "Solidna dawka orzeźwienia. Świeża lemoniada z sezonowych owoców — na eventy plenerowe, pikniki, wesela i imprezy rodzinne.",
    ctaPrimary: cta("Zarezerwuj", "#kontakt"),
    ctaSecondary: cta("604 372 787", "tel:+48604372787"),
    heroPhoto: photo("zdjęcie stoiska z lemoniadą, pionowe 4:5"),
    sections: [
      {
        _key: "smaki",
        eyebrow: "Nasze lemoniady",
        title: "Smakuje autentycznie",
        hand: "sezonowe owoce",
        body: "Lemoniadę oferujemy w wielu wersjach. Może być to tradycyjna lemoniada cytrynowa wzbogacona miętą, ogórkowa czy arbuzowa. Wykorzystujemy sezonowe owoce i naturalne składniki, co sprawia, że nasza lemoniada smakuje autentycznie.",
        bullets: ["Cytrynowa z miętą", "Ogórkowa", "Arbuzowa"],
        photo: photo("zdjęcie kubków z lemoniadą z bliska, poziome 4:3"),
      },
      {
        _key: "branding",
        eyebrow: "Branding",
        title: "Kubeczki z Twoim logo",
        hand: "promocja w dłoni gościa",
        body: "Kubeczki z Twoim logo i indywidualny branding to świetne narzędzie do promocji na wydarzeniu. Podaruj swoim gościom naturalną dawkę orzeźwienia i zarezerwuj termin już dziś.",
        photo: photo("zdjęcie brandowanego kubka w dłoni, poziome 4:3"),
      },
      {
        _key: "dopelnienie",
        eyebrow: "Na upalny dzień",
        title: "Świetne dopełnienie Twojej imprezy",
        hand: "klucz do sukcesu",
        body: "Orzeźwiająca lemoniada w gorące dni to klucz do sukcesu na Twoim evencie. Kiedy żar leje się z nieba, wszyscy marzą o schłodzeniu. Pięknie przystrojone stoisko z lemoniadą to doskonały pomysł, by przyciągnąć gości na zdrową dawkę ochłody i chwilę rozmowy.",
        photo: photo("zdjęcie przystrojonego stoiska w słońcu, poziome 4:3"),
      },
    ],
    metaTitle: "Bar z lemoniadą",
    metaDescription:
      "Stoisko z lemoniadą na eventy plenerowe, pikniki i wesela. Sezonowe owoce, naturalne składniki, kubeczki z Twoim logo.",
  },

  {
    _id: "offerPage-kawa-na-wesele",
    _type: "offerPage",
    title: "Kawa na wesele",
    slug: { _type: "slug", current: "kawa-na-wesele" },
    order: 4,
    eyebrow: "oferta weselna",
    heroTitle: "Kawa",
    heroTitleHand: "na wesele",
    lead: "Mobilna kawiarnia i barista na Waszym przyjęciu. Kawa dla gości od pierwszego toastu do ostatniego tańca. Ciocia będzie zachwycona.",
    ctaPrimary: cta("Zapytaj o termin", "#kontakt"),
    ctaSecondary: cta("604 372 787", "tel:+48604372787"),
    heroPhoto: photo("zdjęcie z wesela — bar w dekoracji, pionowe 4:5"),
    cardsTitle: "Co obejmuje obsługa",
    cards: [
      { _key: "s1", number: "01", title: "Barista i bar", body: "Mobilna kawiarnia, ekspres i pełne wyposażenie. Przywozimy, rozstawiamy i sprzątamy po sobie." },
      { _key: "s2", number: "02", title: "Karta kaw", body: "Espresso, cappuccino, latte i napoje mrożone. Mleko roślinne dla gości, którzy je wybierają." },
      { _key: "s3", number: "03", title: "Dopasowanie do przyjęcia", body: "Bar wpisujemy w dekorację sali. Godziny obsługi ustalamy pod plan Waszego wieczoru." },
    ],
    cardsNote: "↑ opisy do potwierdzenia — uzupełnij zakresem, który faktycznie oferujesz",
    galleryPhotos: [1, 2, 3].map((n) => ({ ...photo(`foto weselne ${n}`), _key: `wed-${n}` })),
    metaTitle: "Kawa na wesele",
    metaDescription: "Mobilna kawiarnia i barista na Waszym przyjęciu weselnym. Kawa dla gości od pierwszego toastu do ostatniego tańca.",
  },
];

/** Kafle na stronie głównej prowadzą teraz na własne podstrony, nie na stary serwis. */
export const offerHrefs: Record<string, string> = {
  "offer-kawa-na-event": "/kawa-na-event",
  "offer-barista-na-targi": "/barista-na-targi",
  "offer-kawa-na-wesele": "/kawa-na-wesele",
  "offer-bar-z-lemoniada": "/bar-z-lemoniada",
};

/** Referencja kafla do jego podstrony. Id podstrony to zawsze "offerPage-" + slug. */
export function offerPageRef(offerId: string): { _type: "reference"; _ref: string } {
  return { _type: "reference", _ref: `offerPage-${offerHrefs[offerId].replace(/^\//, "")}` };
}
