import { notFound } from "next/navigation";
import { NOT_FOUND_METADATA } from "@/lib/seo";

/**
 * Łapie adresy wielosegmentowe (`/oferta/cos/glebiej`) i kieruje je do 404 w szacie
 * serwisu. Podstrony mają tylko jeden segment, więc tu nic poprawnego nie trafi.
 *
 * Bez tej trasy taki adres nie pasował do niczego w `(site)`, więc Next pokazywał
 * swoją domyślną stronę — poza layoutem, bez menu i po angielsku. `not-found.tsx`
 * z grupy łapie tylko `notFound()` rzucone wewnątrz niej, nie adresy bez trasy.
 */
export const metadata = NOT_FOUND_METADATA;

export default function CatchAll() {
  notFound();
}
