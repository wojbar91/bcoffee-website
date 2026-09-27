/**
 * Porządki na żywym datasecie. Bezpieczne do wielokrotnego uruchomienia —
 * za drugim razem nie ma już nic do zrobienia.
 *
 *   npm run fix-dataset -- --dry   # tylko pokazuje, co by zmienił
 *   npm run fix-dataset            # zmienia
 *
 * Uruchamiać PO wdrożeniu kodu, który zna pole `page` na kaflu. Wcześniej Studio
 * pokazałoby je jako pole spoza schemy, czyli dokładnie ten problem, który punkt 2
 * sprząta.
 *
 * Co robi:
 *   1. Podpina każdy kafel usługi pod jego podstronę referencją, zamiast trzymać
 *      adres jako tekst. Dopasowanie po adresie: kafel z "/kawa-na-event" dostaje
 *      referencję do podstrony o tym slugu. Stare pole `href` zostaje nietknięte —
 *      przy wybranej podstronie Studio je ukrywa, a zapytanie pomija, więc nic nie
 *      psuje. Dzięki temu kolejność „skrypt przed deployem" też jest bezpieczna.
 *   2. Usuwa z ustawień `termsUrl` i `privacyUrl`. Regulamin i polityka są stronami
 *      serwisu, a ich adresy stoją w lib/routes.ts; zostawione w danych pola Studio
 *      pokazuje jako błąd.
 *   3. Wypisuje podstrony, do których nie prowadzi żaden kafel na stronie głównej —
 *      tylko informacyjnie. Kafel to osobna decyzja: zdjęcie, opis, miejsce w siatce.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;
const dry = process.argv.includes("--dry");

if (!projectId || !token) {
  console.error("Brak NEXT_PUBLIC_SANITY_PROJECT_ID lub SANITY_WRITE_TOKEN w .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-05-19",
  useCdn: false,
  // Tylko opublikowane dokumenty — referencja do szkicu nie przeszłaby walidacji.
  perspective: "published",
});

interface Tile {
  _id: string;
  title: string;
  href?: string;
  pageId?: string;
}
interface Page {
  _id: string;
  slug: string;
}

async function main() {
  const [tiles, pages, settings] = await Promise.all([
    client.fetch<Tile[]>(`*[_type == "offer"] | order(order asc){_id, title, href, "pageId": page._ref}`),
    client.fetch<Page[]>(`*[_type == "offerPage" && defined(slug.current)]{_id, "slug": slug.current}`),
    client.fetch<{ _id: string; termsUrl?: string; privacyUrl?: string } | null>(
      `*[_type == "siteSettings"][0]{_id, termsUrl, privacyUrl}`,
    ),
  ]);

  const bySlug = new Map(pages.map((p) => [p.slug, p._id]));
  const tx = client.transaction();
  let changes = 0;

  console.log(dry ? "TRYB PODGLĄDU — nic nie zostanie zapisane.\n" : "");
  console.log("1. Kafle → podstrony");
  for (const t of tiles) {
    if (t.pageId) {
      console.log(`   ✓ ${t.title}: już podpięty`);
      continue;
    }
    const slug = t.href?.startsWith("/") ? t.href.slice(1).replace(/[#?].*$/, "") : null;
    const pageId = slug ? bySlug.get(slug) : undefined;
    if (!pageId) {
      console.log(`   – ${t.title}: ${t.href ?? "(brak adresu)"} — nie pasuje do żadnej podstrony, zostaje jak jest`);
      continue;
    }
    console.log(`   → ${t.title}: ${t.href} ⇒ referencja do ${pageId}`);
    tx.patch(t._id, (p) => p.set({ page: { _type: "reference", _ref: pageId } }));
    changes++;
  }

  console.log("\n2. Osierocone pola ustawień");
  if (settings && (settings.termsUrl || settings.privacyUrl)) {
    // Wartości wypisujemy w całości — gdyby ktoś chciał je przywrócić, ma je w logu.
    console.log(`   → usuwam termsUrl (${settings.termsUrl ?? "—"}) i privacyUrl (${settings.privacyUrl ?? "—"})`);
    tx.patch(settings._id, (p) => p.unset(["termsUrl", "privacyUrl"]));
    changes++;
  } else {
    console.log("   ✓ nic do sprzątania");
  }

  console.log("\n3. Podstrony bez kafla na stronie głównej");
  const linked = new Set(
    tiles.map((t) => t.pageId ?? bySlug.get(t.href?.startsWith("/") ? t.href.slice(1).replace(/[#?].*$/, "") : "")),
  );
  const orphans = pages.filter((p) => !linked.has(p._id));
  console.log(
    orphans.length
      ? orphans.map((p) => `   • /${p.slug} — jest w menu, ale na stronie głównej nie ma do niej kafla`).join("\n")
      : "   ✓ każda podstrona ma kafel",
  );

  if (dry || changes === 0) {
    console.log(dry ? `\nPodgląd: ${changes} zmian do zapisania.` : "\nNic do zmiany.");
    return;
  }

  await tx.commit();
  console.log(`\nGotowe: zapisano ${changes} zmian.`);
}

main().catch((err) => {
  console.error("Porządki nie powiodły się:", err.message);
  process.exit(1);
});
