"use client";

import * as React from "react";
import { Button } from "@/components/core/Button";
import { routes } from "@/lib/routes";

/**
 * Błąd podczas renderowania strony — najczęściej chwilowo nieosiągalne Sanity przy
 * pierwszym wejściu na podstronę dodaną po deployu. Strony już zbudowane się tu nie
 * zatrzymają: przy nieudanej rewalidacji Next dalej serwuje ostatnią dobrą wersję.
 *
 * W tej wersji Next granica błędu dostaje `retry` (ponowne pobranie danych),
 * nie `reset` jak w starszych — `reset` tylko przerysowuje bez nowego zapytania.
 */
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main>
      <section style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "96px var(--gut) 120px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
            fontSize: "var(--text-h3)",
            letterSpacing: "var(--track-display)",
            lineHeight: "var(--leading-heading)",
            margin: 0,
          }}
        >
          Coś poszło nie tak
        </h1>
        <p className="bc-prose" style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "18px 0 0" }}>
          Nie udało się wczytać tej strony. Spróbuj jeszcze raz za chwilę — a jeśli się spieszysz, po prostu zadzwoń.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
          <Button size="lg" onClick={() => retry()}>
            Spróbuj ponownie
          </Button>
          <Button href={routes.home} size="lg" variant="outline">
            Strona główna
          </Button>
        </div>
      </section>
    </main>
  );
}
