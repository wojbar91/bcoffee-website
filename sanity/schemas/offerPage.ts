import { defineField, defineType } from "sanity";
// Ścieżka względna, nie alias `@/`: schemy czyta też CLI Sanity, który aliasów z tsconfig nie zna.
import { RESERVED_SLUGS, SLUG_PATTERN } from "../../lib/slug";

/**
 * Podstrona ofertowa. Jeden typ obsługuje wszystkie cztery (event, targi,
 * wesele, lemoniada), bo różnią się doborem sekcji, nie ich naturą.
 *
 * Sekcje są opcjonalne i mają stałą kolejność — to celowo NIE jest page builder.
 * Puste zniknie ze strony, więc każda podstrona pokazuje tylko to, co ma wypełnione.
 */
export const offerPage = defineType({
  name: "offerPage",
  title: "Podstrona ofertowa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "pillars", title: "Filary" },
    { name: "intro", title: "Wstęp" },
    { name: "sections", title: "Sekcje" },
    { name: "cards", title: "Karty numerowane" },
    { name: "gallery", title: "Galeria" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Nazwa podstrony",
      type: "string",
      group: "hero",
      description: "Do listy w tym panelu i do nawigacji.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Adres",
      type: "slug",
      group: "hero",
      options: { source: "title", maxLength: 60 },
      description: 'Fragment URL-a, np. "kawa-na-event" → bcoffee.pl/kawa-na-event',
      validation: (r) =>
        r.required().custom((value: { current?: string } | undefined) => {
          const current = value?.current;
          if (!current) return true;
          if (!SLUG_PATTERN.test(current)) {
            return "Tylko małe litery bez polskich znaków, cyfry i pojedyncze myślniki, np. kawa-na-event.";
          }
          if (RESERVED_SLUGS.includes(current)) {
            return `Adres „${current}" jest zajęty przez inną część serwisu — podstrona byłaby niewidoczna.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "order",
      title: "Kolejność",
      type: "number",
      group: "hero",
      description: "Rosnąco. Używane tam, gdzie podstrony są wyliczane.",
    }),

    defineField({ name: "eyebrow", title: "Nadtytuł odręczny", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Nagłówek — pierwsza linia", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroTitleHand", title: "Nagłówek — linia odręczna", type: "string", group: "hero" }),
    defineField({ name: "lead", title: "Akapit pod nagłówkiem", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "ctaPrimary", title: "Przycisk główny", type: "cta", group: "hero" }),
    defineField({ name: "ctaSecondary", title: "Przycisk drugi", type: "cta", group: "hero" }),
    defineField({ name: "heroPhoto", title: "Zdjęcie hero", type: "photo", group: "hero" }),

    defineField({
      name: "pillars",
      title: "Filary",
      type: "array",
      of: [{ type: "string" }],
      group: "pillars",
      description: "Krótkie hasła w rzędzie kafli, np. „Doświadczeni i uśmiechnięci bariści”.",
    }),

    defineField({ name: "introTitle", title: "Nagłówek", type: "string", group: "intro" }),
    defineField({ name: "introTitleHand", title: "Linia odręczna", type: "string", group: "intro" }),
    defineField({ name: "introBody", title: "Akapit", type: "text", rows: 4, group: "intro" }),

    defineField({
      name: "sections",
      title: "Sekcje",
      type: "array",
      group: "sections",
      description: "Bloki tekst + zdjęcie, ułożone naprzemiennie. Lista punktów jest opcjonalna.",
      of: [
        {
          type: "object",
          name: "offerSection",
          fields: [
            defineField({ name: "eyebrow", title: "Nadtytuł wersalikami", type: "string" }),
            defineField({ name: "title", title: "Nagłówek", type: "string", validation: (r) => r.required() }),
            defineField({ name: "hand", title: "Linia odręczna", type: "string" }),
            defineField({ name: "body", title: "Akapit", type: "text", rows: 4 }),
            defineField({ name: "bullets", title: "Lista zastosowań", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "photo", title: "Zdjęcie", type: "photo" }),
          ],
          preview: { select: { title: "title", subtitle: "eyebrow", media: "photo.asset" } },
        },
      ],
    }),

    defineField({ name: "cardsTitle", title: "Nagłówek sekcji", type: "string", group: "cards" }),
    defineField({
      name: "cards",
      title: "Karty",
      type: "array",
      group: "cards",
      description: "Numerowane karty zakresu — używa ich podstrona weselna.",
      of: [
        {
          type: "object",
          name: "numberedCard",
          fields: [
            defineField({ name: "number", title: "Numer", type: "string", validation: (r) => r.required() }),
            defineField({ name: "title", title: "Tytuł", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Opis", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
    }),
    defineField({
      name: "cardsNote",
      title: "Notka pod kartami",
      type: "string",
      group: "cards",
      description: "Zostaw puste, gdy zakres jest potwierdzony — notka zniknie ze strony.",
    }),

    defineField({ name: "galleryPhotos", title: "Zdjęcia", type: "array", of: [{ type: "photo" }], group: "gallery" }),

    defineField({
      name: "metaTitle",
      title: "Tytuł w Google",
      type: "string",
      group: "seo",
      description: "Bez nazwy firmy — „ — B. Coffee” dopisuje się na końcu sama. Puste pole = tytuł podstrony.",
    }),
    defineField({ name: "metaDescription", title: "Opis w Google", type: "text", rows: 3, group: "seo", validation: (r) => r.max(200) }),
  ],
  orderings: [{ name: "order", title: "Kolejność", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroPhoto.asset" },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle ? `/${subtitle}` : "brak adresu", media }),
  },
});
