/**
 * Jednorazowa migracja istniejącego datasetu na generyczne podstrony ofertowe.
 *
 *   npm run migrate
 *
 * Co robi:
 *   1. Przenosi treść z `weddingPage` do `offerPage` o slugu "kawa-na-wesele",
 *      zachowując wszystko, co zdążyłeś poprawić w Studio (łącznie z wgranymi zdjęciami).
 *   2. Zakłada trzy pozostałe podstrony z treścią przepisaną z bcoffee.pl.
 *   3. Przestawia kafle usług na stronie głównej ze starego serwisu na własne podstrony.
 *   4. Kasuje `weddingPage`, który nie ma już odpowiednika w schemie.
 *
 * Historyczna — dla datasetu sprzed podstron ofertowych. Istniejących podstron nie
 * nadpisuje, ale punkt 3 przy każdym uruchomieniu ustawia adresy kafli na nowo, więc
 * na żywym datasecie lepiej jej nie puszczać. Bieżące porządki są w fix-dataset.ts.
 */
import { createClient } from "@sanity/client";
import { offerPages, offerHrefs } from "./offer-pages";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Brak NEXT_PUBLIC_SANITY_PROJECT_ID lub SANITY_WRITE_TOKEN w .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2026-05-19", useCdn: false });

type Doc = Record<string, unknown>;

/** Pola weselne mają inne nazwy w nowym typie — mapujemy je, zamiast gubić poprawki. */
function fromWeddingPage(old: Doc): Doc {
  const base = offerPages.find((p) => p._id === "offerPage-kawa-na-wesele")!;
  const keep = <T,>(value: T, fallback: T): T => (value === undefined || value === null ? fallback : value);

  return {
    ...base,
    eyebrow: keep(old.eyebrow as string, base.eyebrow),
    heroTitle: keep(old.title as string, base.heroTitle),
    heroTitleHand: keep(old.titleHand as string, base.heroTitleHand),
    lead: keep(old.lead as string, base.lead),
    ctaPrimary: keep(old.ctaPrimary as Doc, base.ctaPrimary),
    ctaSecondary: keep(old.ctaSecondary as Doc, base.ctaSecondary),
    heroPhoto: keep(old.heroPhoto as Doc, base.heroPhoto),
    cardsTitle: keep(old.servicesTitle as string, base.cardsTitle),
    cards: keep(
      (old.services as Array<Doc> | undefined)?.map((s, i) => ({
        _key: (s._key as string) ?? `card-${i}`,
        number: s.number,
        title: s.title,
        body: s.body,
      })),
      base.cards,
    ),
    cardsNote: keep(old.servicesNote as string, base.cardsNote),
    galleryPhotos: keep(old.galleryPhotos as Doc[], base.galleryPhotos),
    metaTitle: keep(old.metaTitle as string, base.metaTitle),
    metaDescription: keep(old.metaDescription as string, base.metaDescription),
  };
}

async function main() {
  const oldWedding = await client.fetch<Doc | null>(`*[_type == "weddingPage"][0]`);

  const docs = offerPages.map((page) =>
    page._id === "offerPage-kawa-na-wesele" && oldWedding ? fromWeddingPage(oldWedding) : (page as unknown as Doc),
  );

  // Patch na nieistniejącym dokumencie wywala CAŁĄ transakcję, więc najpierw
  // sprawdzamy, które kafle faktycznie są — któryś mógł zostać skasowany w Studio.
  const wantedIds = Object.keys(offerHrefs);
  const presentIds = await client.fetch<string[]>(`*[_id in $ids]._id`, { ids: wantedIds });
  const missingIds = wantedIds.filter((id) => !presentIds.includes(id));

  const tx = client.transaction();
  for (const doc of docs) {
    tx.createIfNotExists(doc as never);
  }
  for (const id of presentIds) {
    tx.patch(id, (p) => p.set({ href: offerHrefs[id] }));
  }
  await tx.commit();

  console.log(
    oldWedding
      ? "Treść podstrony weselnej przeniesiona (z zachowaniem Twoich poprawek i zdjęć)."
      : "Nie znaleziono starej podstrony weselnej — założono ją z domyślnej treści.",
  );
  console.log(`Podstrony ofertowe: ${docs.length}`);
  console.log(`Kafle usług przestawione na wewnętrzne adresy: ${presentIds.length}`);
  if (missingIds.length) {
    console.warn(`Pominięto ${missingIds.length} kafli, których nie ma w datasecie: ${missingIds.join(", ")}.`);
    console.warn("Jeśli istnieją pod innym id, popraw ich adres ręcznie w Studio → Kafle usług.");
  }

  if (oldWedding) {
    await client.delete({ query: `*[_type == "weddingPage"]` });
    console.log("Stary dokument weddingPage skasowany.");
  }

  console.log("\nGotowe. Zdjęcia do nowych podstron wrzuć w Studio — każdy slot ma opis, co tam wchodzi.");
}

main().catch((err) => {
  console.error("Migracja nie powiodła się:", err.message);
  process.exit(1);
});
