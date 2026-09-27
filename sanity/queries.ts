import { defineQuery } from "next-sanity";

/**
 * Rozwinięcie obiektu `photo`. Pole `asset` bywa puste — wtedy front rysuje
 * PhotoSlot z tekstem `placeholder`, zamiast dziury w layoucie.
 */
const photoFields = /* groq */ `
  placeholder,
  alt,
  "hotspot": asset.hotspot,
  "crop": asset.crop,
  "url": asset.asset->url,
  "mimeType": asset.asset->mimeType,
  "lqip": asset.asset->metadata.lqip,
  "width": asset.asset->metadata.dimensions.width,
  "height": asset.asset->metadata.dimensions.height
`;

const ctaFields = /* groq */ `label, href`;

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  logo{${photoFields}},
  wordmark, siteName, metaTitle, metaDescription,
  phone, phoneHref, inquiryEmail,
  legalName, street, city, nip, regon,
  shopUrl, instagramUrl, instagramHandle, facebookUrl
}`);

/**
 * Kafle usług (`offers`): adres bierzemy z referencji do podstrony, a dopiero gdy jej
 * nie ma — z pola tekstowego (link zewnętrzny albo kafel sprzed migracji). Filtr
 * odrzuca kafel bez żadnego celu, np. wskazujący na podstronę zapisaną tylko jako
 * szkic: bez niego `href` byłby null, a AppLink wywaliłby render całej strony głównej.
 */
export const homePageQuery = defineQuery(`{
  "page": *[_type == "homePage"][0]{
    heroVariant, heroEyebrow, heroTitle, heroTitleHand, heroLead,
    heroCtaPrimary{${ctaFields}},
    heroCtaSecondary{${ctaFields}},
    heroPhoto{${photoFields}},
    stickerLines,
    tickerItems,
    introTitle, introTitleHand, introBody,
    clientsLabel,
    clientLogos[]{${photoFields}},
    offerTitle, offerLead,
    brewedCoffees, statCaption, statBody,
    aboutEyebrow, aboutTitle, aboutTitleHand, aboutLead, aboutBody, aboutQuote,
    aboutPhoto{${photoFields}},
    galleryLabel,
    galleryPhotos[]{${photoFields}},
    shopStickerLines, shopTitle, shopBody, shopCtaLabel,
    instagramTitle, instagramTitleHand,
    instagramPhotos[]{${photoFields}}
  },
  "offers": *[_type == "offer" && (defined(page->slug.current) || defined(href))] | order(order asc){
    _id, title, tilt, wide, eyebrow, body, ctaLabel,
    "href": coalesce("/" + page->slug.current, href),
    photo{${photoFields}}
  }
}`);

/** Lekka lista do nawigacji — tylko to, co potrzebne na rozwijane menu. */
export const navOfferPagesQuery = defineQuery(`*[_type == "offerPage" && defined(slug.current)] | order(order asc){
  title, "slug": slug.current
}`);

/**
 * Do mapy strony: adres + data ostatniej zmiany.
 *
 * `home` zbiera daty dokumentów, z których strona główna jest złożona — jej własnej
 * treści i kafli oferty (`offer`, nie `offerPage` — to dwa różne typy). Bez tego edycja
 * hero czy licznika kaw nie ruszałaby `lastmod` dla `/`.
 *
 * Ustawień i sekcji kontaktowej celowo tu nie ma: to belka, stopka i formularz obecne
 * na każdej stronie. Google prosi, żeby `lastmod` znaczyło istotną zmianę treści,
 * a nie poprawkę numeru telefonu w stopce.
 */
export const sitemapQuery = defineQuery(`{
  "home": *[_type in ["homePage", "offer"]]._updatedAt,
  "pages": *[_type == "offerPage" && defined(slug.current)] | order(order asc){
    "slug": slug.current, _updatedAt
  }
}`);

export const offerPageSlugsQuery = defineQuery(`*[_type == "offerPage" && defined(slug.current)].slug.current`);

export const offerPageQuery = defineQuery(`*[_type == "offerPage" && slug.current == $slug][0]{
  title, "slug": slug.current,
  eyebrow, heroTitle, heroTitleHand, lead,
  ctaPrimary{${ctaFields}},
  ctaSecondary{${ctaFields}},
  heroPhoto{${photoFields}},
  pillars,
  introTitle, introTitleHand, introBody,
  sections[]{
    _key, eyebrow, title, hand, body, bullets,
    photo{${photoFields}}
  },
  cardsTitle,
  cards[]{_key, number, title, body},
  cardsNote,
  galleryPhotos[]{${photoFields}},
  metaTitle, metaDescription
}`);

export const contactSectionQuery = defineQuery(`*[_type == "contactSection"][0]{
  eyebrow, title, submitLabel,
  successTitle, successBody,
  ownerName, ownerRole,
  ownerPhoto{${photoFields}},
  revealPhoneLabel,
  eventTypes
}`);
