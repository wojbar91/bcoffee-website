import type { Metadata } from "next";
import { absoluteUrl } from "./site-url";
import { cdnImage, imageSource } from "./sanity-image";
import type { Photo, SiteSettings } from "@/sanity/types";

/** Format zalecany przez Facebooka i LinkedIn dla dużego kafelka. */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Nazwa firmy, gdy dokument ustawień jest niedostępny. Ten sam wzorzec co logo niżej. */
export const FALLBACK_SITE_NAME = "B. Coffee";

/**
 * Tytuł strony 404. `noindex` dokłada Next sam dla każdej odpowiedzi 404,
 * więc wystarczy, żeby zakładka mówiła prawdę.
 */
export const NOT_FOUND_METADATA: Metadata = { title: "Nie znaleziono strony" };

/**
 * Zdjęcie do podglądu linku. Bierzemy hero danej strony i każemy CDN-owi Sanity
 * przyciąć je do 1200×630 — bez tego serwowalibyśmy oryginał, często kilka MB,
 * którego i tak żaden komunikator nie pokaże w pełnej rozdzielczości.
 */
export function ogImage(photo: Photo | null | undefined, alt: string) {
  if (!photo?.url) return undefined;

  // Najpierw przycięcie ustawione w Studio, dopiero na nim kadr pod podgląd linku.
  const { url: base, focal } = imageSource(photo);

  const url = cdnImage(base, {
    w: String(OG_WIDTH),
    h: String(OG_HEIGHT),
    fit: "crop",
    // Jawny JPEG, nie `auto=format`. Ten drugi zależy od nagłówka Accept, a scrapery
    // Facebooka czy WhatsAppa go nie wysyłają — dostawały wtedy oryginalny PNG
    // ważący 1,8 MB. JPEG q=80 rozumie każdy komunikator i waży ułamek tego.
    fm: "jpg",
    q: "80",
    // Kadr 1,91:1 obcina zdjęciu 4:3 jakieś 40% wysokości. Bez punktu ostrości CDN
    // tnie od środka i ucina głowy — dlatego oddajemy decyzję temu, kto ustawił
    // celownik w Studio. Gdy go nie ma, zostaje kadrowanie od środka.
    ...(focal ? { crop: "focalpoint", "fp-x": String(focal.x), "fp-y": String(focal.y) } : {}),
  });

  return { url, width: OG_WIDTH, height: OG_HEIGHT, alt: photo.alt || alt };
}

interface PageSeo {
  title: string;
  description?: string | null;
  path: string;
  photo?: Photo | null;
  siteName: string;
}

/**
 * Komplet metadanych jednej strony: adres kanoniczny, Open Graph i karta Twittera.
 *
 * Wcześniej `openGraph` żyło wyłącznie w layoucie, więc podstrony nadpisywały
 * `title`, ale `og:title` zostawał tytułem strony głównej — link do „Kawa na event"
 * wrzucony na Facebooka podpisywał się jak strona główna.
 */
export function pageMetadata({ title, description, path, photo, siteName }: PageSeo): Metadata {
  const image = ogImage(photo, title);
  const url = absoluteUrl(path);

  // Layout dokleja „ — {siteName}" do każdego tytułu. Jeśli ktoś w Studio dopisał nazwę
  // firmy już sam („… | B. Coffee"), szablon zdublowałby ją — wtedy tytuł idzie bez szablonu.
  const hasBrand = title.toLocaleLowerCase("pl").includes(siteName.toLocaleLowerCase("pl"));

  return {
    title: hasBrand ? { absolute: title } : title,
    description: description ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName,
      title,
      description: description ?? undefined,
      url,
      images: image ? [image] : undefined,
    },
    twitter: {
      // Duży kafelek ma sens tylko wtedy, gdy jest co w nim pokazać.
      card: image ? "summary_large_image" : "summary",
      title,
      description: description ?? undefined,
      images: image ? [image.url] : undefined,
    },
  };
}

/**
 * Dane strukturalne dla wyszukiwarek. Firma świadczy usługi w miejscu klienta,
 * więc `LocalBusiness` z adresem siedziby i obszarem działania — nie `Restaurant`,
 * bo nie ma lokalu, do którego można przyjść.
 */
export function localBusinessJsonLd(settings: SiteSettings) {
  // Pole miasta trzyma kod i miejscowość razem: "58-124 Marcinowice".
  const match = settings.city?.match(/^\s*(\d{2}-\d{3})\s+(.+?)\s*$/);

  const sameAs = [settings.facebookUrl, settings.instagramUrl, settings.shopUrl].filter(Boolean);

  // Pole NIP w Studio jest zwykłym tekstem, więc równie dobrze może przyjść
  // "884-275-69-84" albo "PL8842756984". Zostawiamy same cyfry i dokładamy prefiks raz.
  const nip = settings.nip?.replace(/\D/g, "");

  // Ten sam fallback co w nagłówku: dopóki logo nie jest wgrane do Sanity, bierzemy
  // plik z public/. Wgrane przepuszczamy przez CDN — inaczej Google dostawałby
  // oryginał w takim rozmiarze i formacie, w jakim ktoś go wrzucił.
  const logoUrl = settings.logo?.url
    ? cdnImage(settings.logo.url, { w: "512", h: "512", fit: "max", fm: "png", q: "80" })
    : absoluteUrl("/logo-bcoffee.webp");

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.siteName,
    legalName: settings.legalName,
    description: settings.metaDescription,
    url: absoluteUrl("/"),
    telephone: settings.phoneHref?.replace(/^tel:/, ""),
    email: settings.inquiryEmail,
    image: [logoUrl],
    logo: logoUrl,
    ...(nip ? { vatID: `PL${nip}` } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.street ?? undefined,
      postalCode: match?.[1],
      addressLocality: match?.[2] ?? settings.city ?? undefined,
      addressCountry: "PL",
    },
    areaServed: { "@type": "Country", name: "Polska" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/**
 * Serializacja do wnętrza `<script type="application/ld+json">`.
 *
 * `JSON.stringify` nie ucieka znaku `<`, więc opis wpisany w Studio zawierający
 * `</script>` zamknąłby tag i wysypał resztę JSON-a do dokumentu jako HTML.
 * `<` jest w JSON-ie równoważne, a przeglądarka nie widzi już nawiasu.
 * Zalecenie prosto z dokumentacji Next: node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
