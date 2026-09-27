"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { INQUIRY_LABELS, inquirySchema, type InquiryInput } from "@/lib/inquiry-schema";

export interface InquiryResult {
  ok: boolean;
  /** Komunikat ogólny — problem po naszej stronie, nie z danymi. */
  message?: string;
  /** Błędy przypisane do pól, gdy dane nie przeszły walidacji na serwerze. */
  fieldErrors?: Record<string, string>;
}

/**
 * Limiter po IP, trzymany w pamięci procesu. Na Vercelu działa per instancja
 * funkcji, nie globalnie — tłumi zapętlone skrypty, ale nie jest zaporą przed
 * atakiem rozproszonym. Przy pierwszych oznakach nadużycia przenieść liczniki
 * do współdzielonego magazynu z TTL (Upstash Redis) albo dołożyć captchę.
 *
 * Slot jest naliczany dopiero tuż przed wysyłką maila — nie przy błędzie
 * walidacji. Inaczej ktoś, kto pięć razy pomyli się w adresie, blokowałby sobie
 * formularz na dziesięć minut, nie wysławszy ani jednej wiadomości.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED = 5000;
const PRUNE_EVERY_MS = 60 * 1000;
const hits = new Map<string, number[]>();
let lastPrune = 0;

/** Usuwa wygasłe wpisy. Wcześniej mapa była czyszczona w całości po przekroczeniu
 *  progu, co kasowało też liczniki tym, którzy właśnie wyczerpali limit —
 *  wystarczyło zalać ją kluczami, żeby wyzerować limiter dla siebie. */
function prune(now: number): void {
  for (const [key, times] of hits) {
    const recent = times.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  return recent.length >= MAX_PER_WINDOW;
}

function recordHit(key: string): void {
  const now = Date.now();
  // Najwyżej raz na minutę. Gdy wszystkie wpisy są świeże — czyli przy zalewie z wielu
  // adresów naraz — sprzątanie nic nie usuwa, a bez tego progu przechodziłoby całą mapę
  // przy każdym kolejnym żądaniu, spowalniając limiter akurat wtedy, gdy jest potrzebny.
  if (hits.size >= MAX_TRACKED && now - lastPrune >= PRUNE_EVERY_MS) {
    prune(now);
    lastPrune = now;
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
}

/**
 * Identyfikator klienta do limitowania. `x-forwarded-for` jest wiarygodny tylko
 * wtedy, gdy nadpisuje go zaufane proxy — na Vercelu tak jest.
 *
 * Gdy nagłówka nie ma, zwracamy `null` i limiter jest pomijany. Wrzucenie całego
 * ruchu do jednego wspólnego kubka oznaczałoby, że piąty odwiedzający w oknie
 * dziesięciu minut dostaje blokadę, choć sam nic wcześniej nie wysyłał — a taka
 * awaria jest cicha i nie do zdiagnozowania z logów.
 */
function clientKey(forwardedFor: string | null): string | null {
  const first = forwardedFor?.split(",")[0]?.trim();
  return first ? first : null;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]!);
}

export async function sendInquiry(input: InquiryInput): Promise<InquiryResult> {
  // Ta sama schema co w przeglądarce. Klient mógł ją ominąć — tu jest rozstrzygająca.
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors, message: "Popraw zaznaczone pola." };
  }

  const values = parsed.data;

  // Pułapka na boty: udajemy sukces, żeby skrypt nie wiedział, że go odrzucono.
  // Nie zużywa slotu — bot nie ma jak wyczerpać limitu prawdziwym użytkownikom.
  if (values.firma) {
    return { ok: true };
  }

  const hdrs = await headers();
  const key = clientKey(hdrs.get("x-forwarded-for"));
  if (key === null) {
    console.warn("Brak nagłówka x-forwarded-for — limiter pominięty. Za zaufanym proxy nie powinno się zdarzać.");
  } else if (isRateLimited(key)) {
    return { ok: false, message: "Za dużo prób pod rząd. Odczekaj chwilę albo po prostu zadzwoń." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Brak RESEND_API_KEY lub INQUIRY_FROM_EMAIL — zapytanie nie zostało wysłane.");
    return { ok: false, message: "Wysyłka jest chwilowo niedostępna. Zadzwoń albo napisz bezpośrednio." };
  }

  const settings = await sanityFetch<SiteSettings | null>({ query: siteSettingsQuery });
  if (!settings?.inquiryEmail) {
    console.error("siteSettings.inquiryEmail nie jest ustawione w Sanity.");
    return { ok: false, message: "Wysyłka jest chwilowo niedostępna. Zadzwoń albo napisz bezpośrednio." };
  }

  const rows = INQUIRY_LABELS.map(([name, label]) => {
    const value = values[name];
    if (value === undefined || value === "") return "";
    return `<tr><td style="padding:4px 12px 4px 0;color:#666">${label}</td><td><strong>${escapeHtml(String(value))}</strong></td></tr>`;
  }).join("");

  // Slot naliczamy dopiero teraz: dane są poprawne, konfiguracja jest, mail idzie.
  if (key !== null) recordHit(key);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: settings.inquiryEmail,
      replyTo: values.email,
      subject: `Zapytanie o wycenę — ${values.typ ?? "wydarzenie"}`,
      html: `<h2 style="font-family:sans-serif">Nowe zapytanie ze strony</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    });

    if (error) {
      console.error("Resend odrzucił wysyłkę:", error);
      return { ok: false, message: "Nie udało się wysłać. Spróbuj ponownie albo zadzwoń." };
    }

    return { ok: true };
  } catch (err) {
    console.error("Błąd wysyłki zapytania:", err);
    return { ok: false, message: "Nie udało się wysłać. Spróbuj ponownie albo zadzwoń." };
  }
}
