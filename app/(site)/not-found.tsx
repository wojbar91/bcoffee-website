import * as React from "react";
import { Button } from "@/components/core/Button";
import { routes } from "@/lib/routes";

/**
 * 404 w szacie serwisu — z nagłówkiem, menu i stopką z layoutu `(site)`.
 *
 * Bez tego pliku Next pokazywał domyślną stronę spoza layoutu: bez nawigacji,
 * bez stylów, a przy głębszych adresach po angielsku. Kto trafił na literówkę,
 * nie miał dokąd pójść dalej.
 */
export default function NotFound() {
  return (
    <main>
      <section style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "96px var(--gut) 120px" }}>
        <p style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "var(--text-hand)", color: "var(--text-accent)", margin: 0 }}>
          ups, tu nic nie ma
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
            fontSize: "var(--text-h2)",
            letterSpacing: "var(--track-display)",
            lineHeight: "var(--leading-heading)",
            margin: "8px 0 0",
          }}
        >
          Nie znaleźliśmy tej strony
        </h1>
        <p className="bc-prose" style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "22px 0 0" }}>
          Adres mógł się zmienić albo zawierać literówkę. Całą ofertę znajdziesz w menu powyżej, a wycenę
          przygotujemy na podstawie krótkiego formularza.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}>
          <Button href={routes.home} size="lg">
            Strona główna
          </Button>
          <Button href="/#kontakt" size="lg" variant="outline">
            Zapytaj o wycenę
          </Button>
        </div>
      </section>
    </main>
  );
}
