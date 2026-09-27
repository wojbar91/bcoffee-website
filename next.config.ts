import type { NextConfig } from "next";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

// Bez tych dwóch wartości wzorzec niżej przepuszczałby adres `/images/undefined/…`,
// czyli żadne zdjęcie — strona zbudowałaby się bez błędu, tylko bez obrazów.
if (!projectId || !dataset) {
  throw new Error("Brak NEXT_PUBLIC_SANITY_PROJECT_ID lub NEXT_PUBLIC_SANITY_DATASET — bez nich next/image nie wie, które zdjęcia przepuścić.");
}

const nextConfig: NextConfig = {
  images: {
    // Zdjęcia trzymamy w Sanity — ich CDN podaje warianty, next/image je optymalizuje.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        // Tylko zdjęcia z TEGO projektu i datasetu. Bez `pathname` przez optymalizator
        // Vercela dało się przepuścić dowolny obraz z dowolnego projektu Sanity na świecie,
        // z limitu Waszego planu — a po jego wyczerpaniu przestają działać Wasze zdjęcia.
        pathname: `/images/${projectId}/${dataset}/**`,
        // `search` celowo pominięte: przycięcie ustawione w Studio dokleja do adresu `?rect=…`.
      },
    ],
  },
};

export default nextConfig;
