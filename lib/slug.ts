import { routes } from "./routes";

/**
 * Kształt adresu podstrony: małe litery, cyfry i pojedyncze myślniki.
 *
 * Jedna reguła w dwóch miejscach. Studio odrzuca slug, który jej nie spełnia,
 * a trasa `[slug]` odrzuca taki adres od razu, bez pytania Sanity — dzięki temu
 * skanery pukające w `/wp-login.php` czy `/.env` nie uruchamiają zapytania do CMS-u.
 * Gdyby reguły się rozjechały, trasa zaczęłaby zwracać 404 dla podstron, które
 * Studio uznało za poprawne.
 */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Adresy zajęte przez stałe trasy aplikacji. Stała trasa wygrywa z dynamiczną,
 * więc podstrona z takim slugiem zapisałaby się w Studio bez błędu i nigdy nie
 * pojawiła na stronie.
 */
export const RESERVED_SLUGS: readonly string[] = [
  "studio",
  "api",
  routes.terms.slice(1),
  routes.privacy.slice(1),
];

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug) && !RESERVED_SLUGS.includes(slug);
}
