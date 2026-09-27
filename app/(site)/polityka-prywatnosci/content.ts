import { LEGAL_SUBTITLE, type LegalDoc } from "@/lib/legal";

/**
 * Przepisane 1:1 ze starej strony (bcoffee.pl/polityka-prywatnosci, WebWave).
 *
 * Dobra wiadomość przy przeprowadzce: § 3 mówi o „dostawcy hostingu / systemu do
 * budowy strony internetowej” ogólnie, bez nazwy własnej, więc zmiana WebWave na
 * Vercela niczego tu nie unieważnia.
 *
 * Odstępstwo od oryginału: dokument deklarował Google Analytics, Meta Pixel, baner zgody
 * na cookies i przekazywanie danych poza EOG. Serwis nie ma żadnego z tych narzędzi i nie
 * zapisuje ani jednego ciasteczka — sprawdzone w kodzie (brak analityki, brak
 * localStorage, brak osadzeń zewnętrznych) i na nagłówkach wdrożonej strony (żadna
 * podstrona nie odsyła Set-Cookie). Usunięte zostały:
 *   — § 1 ust. 1: człon o zasadach wykorzystywania cookies,
 *   — § 3 ust. 1: dostawcy analityki i narzędzi marketingowych,
 *   — § 3 ust. 4: przekazywanie danych poza EOG przez te narzędzia,
 *   — § 4 „Pliki cookies": cały paragraf, wraz z opisem nieistniejącego banera,
 *   — § 5 ust. 2: okres przechowywania danych z cookies.
 * Dalsze paragrafy przenumerowane o jeden w dół; nic się do nich nie odwoływało.
 *
 * Jedyny fragment napisany od nowa, nie skreślony: „Dane zbierane automatycznie" w § 2.
 * Sam adres IP jest przetwarzany naprawdę — trafia do dzienników hostingu i służy
 * ograniczaniu liczby wysyłek formularza — więc wykreślenie całej sekcji zrobiłoby
 * w dokumencie lukę. Warto dać ten akapit do sprawdzenia autorowi dokumentów.
 *
 * Do dopisania, gdy ruszy formularz: odbiorcą danych staje się dostawca wysyłki
 * e-maili (Resend).
 */
export const politykaPrywatnosci: LegalDoc = {
  title: "Polityka prywatności",
  description:
    "Zasady przetwarzania danych osobowych użytkowników bcoffee.pl: formularz wyceny, podstawy prawne, okres przechowywania i prawa osób, których dane dotyczą.",
  subtitle: LEGAL_SUBTITLE,
  effectiveFrom: "2024-10-10",
  sections: [
    {
      heading: "§1. Postanowienia ogólne",
      blocks: [
        { kind: "para", text: "1. Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych Użytkowników strony internetowej bcoffee.pl (dalej: „Serwis”)." },
        { kind: "para", text: "2. Administratorem danych osobowych jest B. Coffee Wojciech Baranowski, Strzelce 4, 58-124 Marcinowice, NIP 8842756984, REGON 362425207 (dalej: „Administrator”)." },
        { kind: "para", text: "3. Kontakt z Administratorem w sprawach dotyczących ochrony danych osobowych możliwy jest telefonicznie pod numerem 604 372 787 oraz za pośrednictwem formularza kontaktowego dostępnego w Serwisie." },
        { kind: "para", text: "4. Administrator dokłada szczególnej staranności w celu ochrony interesów osób, których dane dotyczą, a w szczególności zapewnia, że dane te są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) oraz ustawą o ochronie danych osobowych." },
      ],
    },
    {
      heading: "§2. Jakie dane są zbierane i w jakim celu",
      blocks: [
        { kind: "subheading", text: "Formularz kontaktowy „Szybka wycena”" },
        { kind: "para", text: "1. W przypadku skorzystania z formularza kontaktowego przetwarzane są dane podane dobrowolnie przez Użytkownika, w szczególności: imię, numer telefonu i/lub adres e-mail oraz treść zapytania (np. informacje o planowanym wydarzeniu)." },
        { kind: "para", text: "2. Dane te są przetwarzane w celu udzielenia odpowiedzi na zapytanie, przygotowania wyceny oraz ewentualnego zawarcia i realizacji umowy o świadczenie usług (podstawa prawna: art. 6 ust. 1 lit. b RODO – działania podejmowane na żądanie osoby, której dane dotyczą, przed zawarciem umowy; a w zakresie danych podanych dodatkowo – art. 6 ust. 1 lit. a RODO, tj. zgoda)." },
        { kind: "para", text: "3. Podanie danych jest dobrowolne, lecz niezbędne do uzyskania odpowiedzi na przesłane zapytanie." },
        { kind: "subheading", text: "Dane zbierane automatycznie" },
        { kind: "para", text: "1. Serwis nie wykorzystuje plików cookies, narzędzi analitycznych ani marketingowych i nie zapisuje żadnych informacji na urządzeniu Użytkownika." },
        { kind: "para", text: "2. Dostawca hostingu rejestruje w dziennikach serwera standardowe dane techniczne połączenia, w tym adres IP. Adres IP jest ponadto przetwarzany doraźnie przy ograniczaniu liczby zapytań wysyłanych przez Formularz kontaktowy i nie jest w tym celu utrwalany." },
        { kind: "para", text: "3. Podstawą prawną jest art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora polegający na zapewnieniu bezpieczeństwa i prawidłowego działania Serwisu." },
      ],
    },
    {
      heading: "§3. Komu udostępniane są dane",
      blocks: [
        { kind: "para", text: "1. Dane osobowe mogą być przekazywane podmiotom wspierającym Administratora w prowadzeniu Serwisu i działalności, w szczególności: dostawcy hostingu / systemu do budowy strony internetowej, a także biuru rachunkowemu – wyłącznie w zakresie niezbędnym do realizacji celów wskazanych w § 2." },
        { kind: "para", text: "2. Dane mogą być przekazywane podmiotom uprawnionym do ich otrzymania na podstawie przepisów prawa, w tym organom państwowym." },
        { kind: "para", text: "3. Administrator nie sprzedaje danych osobowych Użytkowników podmiotom trzecim." },
      ],
    },
    {
      heading: "§4. Okres przechowywania danych",
      blocks: [
        { kind: "para", text: "1. Dane podane w formularzu kontaktowym przechowywane są przez okres niezbędny do udzielenia odpowiedzi na zapytanie, a w przypadku zawarcia umowy – przez okres jej realizacji oraz okres przedawnienia ewentualnych roszczeń i wynikający z przepisów prawa (np. podatkowych)." },
      ],
    },
    {
      heading: "§5. Prawa osób, których dane dotyczą",
      blocks: [
        { kind: "para", text: "Każdej osobie, której dane są przetwarzane, przysługuje prawo do:" },
        {
          kind: "bullets",
          items: [
            "dostępu do swoich danych osobowych oraz otrzymania ich kopii;",
            "sprostowania (poprawienia) danych;",
            "usunięcia danych („prawo do bycia zapomnianym”), w zakresie przewidzianym przepisami prawa;",
            "ograniczenia przetwarzania danych;",
            "przenoszenia danych;",
            "wniesienia sprzeciwu wobec przetwarzania danych opartego na prawnie uzasadnionym interesie Administratora;",
            "cofnięcia zgody na przetwarzanie danych w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem;",
            "wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, jeśli Użytkownik uzna, że przetwarzanie jego danych narusza przepisy RODO.",
          ],
        },
        { kind: "para", text: "W celu realizacji powyższych praw należy skontaktować się z Administratorem, korzystając z danych kontaktowych wskazanych w § 1 ust. 3." },
      ],
    },
    {
      heading: "§6. Bezpieczeństwo danych",
      blocks: [
        { kind: "para", text: "1. Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych, w szczególności przed ich udostępnieniem osobom nieupoważnionym, utratą lub zniszczeniem." },
        { kind: "para", text: "2. Administrator nie przetwarza danych w sposób zautomatyzowany, który skutkowałby podejmowaniem decyzji wywołujących skutki prawne wobec Użytkownika (profilowanie w rozumieniu art. 22 RODO nie jest stosowane)." },
      ],
    },
    {
      heading: "§7. Postanowienia końcowe",
      blocks: [
        { kind: "para", text: "1. Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności, w szczególności w związku ze zmianą przepisów prawa lub sposobu funkcjonowania Serwisu. Aktualna wersja Polityki Prywatności publikowana jest w Serwisie." },
        { kind: "para", text: "2. W sprawach nieuregulowanych niniejszą Polityką Prywatności zastosowanie mają przepisy RODO oraz właściwe przepisy prawa polskiego." },
        { kind: "para", text: "3. Polityka Prywatności wchodzi w życie z dniem 10.10.2024 r." },
      ],
    },
  ],
};
