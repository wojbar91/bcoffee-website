import { defineField, defineType } from "sanity";

export const offer = defineType({
  name: "offer",
  title: "Usługa",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nazwa", type: "string", validation: (r) => r.required() }),
    /**
     * Referencja zamiast wpisywanego adresu. Wcześniej kafel trzymał tekst "/kawa-na-event"
     * — zmiana adresu podstrony zostawiała kafel prowadzący do 404, a skasowanie podstrony
     * nie ostrzegało, że coś na nią wskazuje. Referencja idzie za zmianą adresu sama,
     * a Sanity nie pozwoli skasować podstrony, do której prowadzi kafel.
     */
    defineField({
      name: "page",
      title: "Podstrona",
      type: "reference",
      to: [{ type: "offerPage" }],
      description: "Dokąd prowadzi kafel. Adres zaktualizuje się sam, gdy zmienisz go na podstronie.",
      validation: (r) =>
        r.custom((page, ctx) => {
          const href = (ctx.parent as { href?: string } | undefined)?.href;
          return page || href ? true : "Wybierz podstronę albo podaj adres zewnętrzny.";
        }),
    }),
    defineField({
      name: "href",
      title: "Adres zewnętrzny",
      type: "string",
      description: "Tylko gdy kafel ma prowadzić poza podstrony, np. pełny adres sklepu. Przy wybranej podstronie jest pomijany.",
      hidden: ({ parent }) => Boolean(parent?.page),
    }),
    defineField({ name: "photo", title: "Zdjęcie", type: "photo", validation: (r) => r.required() }),
    defineField({
      name: "order",
      title: "Kolejność",
      type: "number",
      description: "Rosnąco. Decyduje o miejscu kafla w siatce.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tilt",
      title: "Przechył (stopnie)",
      type: "number",
      initialValue: -1.2,
      description: "Znaki naprzemiennie w rzędzie. Zakres −2…2. Na telefonie i tak jest zerowany.",
    }),
    defineField({
      name: "wide",
      title: "Kafel szeroki (złoty)",
      type: "boolean",
      initialValue: false,
      description: "Pełna szerokość pod siatką — dla usługi, która ma mieć większą wagę.",
    }),
    defineField({
      name: "eyebrow",
      title: "Nadtytuł odręczny",
      type: "string",
      description: "Tylko kafel szeroki. Np. „nie tylko kawa”.",
      hidden: ({ parent }) => !parent?.wide,
    }),
    defineField({
      name: "body",
      title: "Opis",
      type: "text",
      rows: 3,
      description: "Tylko kafel szeroki.",
      hidden: ({ parent }) => !parent?.wide,
    }),
    defineField({
      name: "ctaLabel",
      title: "Napis na przycisku",
      type: "string",
      initialValue: "Zobacz ofertę →",
      hidden: ({ parent }) => !parent?.wide,
    }),
  ],
  orderings: [{ name: "order", title: "Kolejność", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", pageSlug: "page.slug.current", href: "href", media: "photo.asset", wide: "wide" },
    prepare: ({ title, pageSlug, href, media, wide }) => ({
      title: wide ? `${title} (szeroki)` : title,
      subtitle: pageSlug ? `/${pageSlug}` : href || "⚠ brak celu",
      media,
    }),
  },
});
