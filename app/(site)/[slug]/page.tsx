import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferPageScreen } from "@/components/site/OfferPageScreen";
import { ContactSection } from "@/components/site/ContactSection";
import { requireDoc, sanityFetch } from "@/sanity/lib/fetch";
import { NOT_FOUND_METADATA, pageMetadata } from "@/lib/seo";
import { isValidSlug } from "@/lib/slug";
import { contactSectionQuery, offerPageQuery, offerPageSlugsQuery, siteSettingsQuery } from "@/sanity/queries";
import type { ContactSection as ContactSectionData, OfferPage, SiteSettings } from "@/sanity/types";

/** Wszystkie podstrony ofertowe prerenderujemy — jest ich kilka i się nie zmieniają często. */
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[] | null>({ query: offerPageSlugsQuery });
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  // Bez tego 404 dziedziczyło tytuł strony głównej — zakładka i wynik wyszukiwania
  // udawały, że trafiłeś na stronę główną.
  if (!isValidSlug(slug)) return NOT_FOUND_METADATA;

  // Ustawienia dopiero po sprawdzeniu, czy podstrona w ogóle istnieje — tak samo jak
  // niżej w komponencie. Inaczej nieznany adres kosztowałby dwa zapytania na metadane
  // i trzecie na render, mimo że i tak kończy się na 404.
  const page = await sanityFetch<OfferPage | null>({ query: offerPageQuery, params: { slug } });
  if (!page) return NOT_FOUND_METADATA;

  const settings = await sanityFetch<SiteSettings | null>({ query: siteSettingsQuery });

  return pageMetadata({
    title: page.metaTitle ?? page.title,
    description: page.metaDescription,
    path: `/${slug}`,
    photo: page.heroPhoto,
    siteName: requireDoc(settings, "siteSettings").siteName,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  /**
   * Najpierw sama podstrona, dopiero potem reszta. Nieznany adres kończy się więc
   * na jednym zapytaniu zamiast trzech — a takich adresów nikt nie ogranicza,
   * bo `dynamicParams` musi zostać włączone: `generateStaticParams` wykonuje się
   * przy budowaniu, więc podstrona dodana w Studio po deployu byłaby inaczej
   * nieosiągalna aż do kolejnego wdrożenia.
   *
   * Adres, który nie może być slugiem (`/wp-login.php`, `/.env` — codzienność każdej
   * publicznej strony), odpada, zanim w ogóle zapytamy Sanity.
   */
  if (!isValidSlug(slug)) notFound();

  const page = await sanityFetch<OfferPage | null>({ query: offerPageQuery, params: { slug } });
  if (!page) notFound();

  const [contact, settings] = await Promise.all([
    sanityFetch<ContactSectionData | null>({ query: contactSectionQuery }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }),
  ]);

  return (
    <main>
      <OfferPageScreen page={page} />
      <ContactSection data={requireDoc(contact, "contactSection")} settings={requireDoc(settings, "siteSettings")} />
    </main>
  );
}
