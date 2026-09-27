import { LEGAL_SUBTITLE, type LegalDoc } from "@/lib/legal";

/**
 * Przepisane 1:1 ze starej strony (bcoffee.pl/regulamin-strony, WebWave), bez zmian
 * w treści. Adres celowo został ten sam — dokument jest zaindeksowany w Google,
 * a linki w stopce już na niego wskazują.
 *
 * Odstępstwo od oryginału: § 5 mówił o cookies „w celach statystycznych, funkcjonalnych
 * oraz marketingowych" i o zgodzie wyrażanej ustawieniami przeglądarki. Serwis nie
 * zapisuje żadnych ciasteczek i nie ma analityki ani pikseli reklamowych — sprawdzone
 * w kodzie i na nagłówkach wdrożonej strony — więc oba ustępy opisywały stan, który nie
 * istnieje. Zastąpione jednym zdaniem stwierdzającym, jak jest.
 *
 * Gdyby kiedyś doszła analityka, mapa Google, film z YouTube albo widget z Instagrama,
 * trzeba wrócić i do tego paragrafu, i do polityki prywatności — a wtedy potrzebny jest
 * też baner zgody.
 */
export const regulamin: LegalDoc = {
  title: "Regulamin strony internetowej",
  description:
    "Zasady korzystania ze strony bcoffee.pl: formularz wyceny, prawa autorskie, reklamacje i odpowiedzialność.",
  subtitle: LEGAL_SUBTITLE,
  effectiveFrom: "2024-10-10",
  sections: [
    {
      heading: "§1. Postanowienia ogólne",
      blocks: [
        { kind: "para", text: "1. Niniejszy Regulamin określa zasady korzystania ze strony internetowej dostępnej pod adresem bcoffee.pl (dalej: „Serwis”)." },
        { kind: "para", text: "2. Właścicielem Serwisu jest B. Coffee Wojciech Baranowski, Strzelce 4, 58-124 Marcinowice, NIP 8842756984, REGON 362425207 (dalej: „Usługodawca”)." },
        { kind: "para", text: "3. Kontakt z Usługodawcą możliwy jest telefonicznie pod numerem 604 372 787 oraz za pośrednictwem formularza kontaktowego dostępnego w Serwisie." },
        { kind: "para", text: "4. Serwis ma charakter informacyjno-ofertowy i służy prezentacji usług Usługodawcy w zakresie obsługi kawowej i baristycznej wydarzeń (m.in. eventów firmowych, wesel, targów) oraz baru z lemoniadą, a także umożliwia przesłanie zapytania o wycenę." },
        { kind: "para", text: "5. Korzystanie z Serwisu jest bezpłatne i nie wymaga rejestracji konta." },
        { kind: "para", text: "6. Regulamin jest udostępniony nieodpłatnie w Serwisie w formie umożliwiającej jego pozyskanie, odtwarzanie i utrwalanie." },
      ],
    },
    {
      heading: "§2. Definicje",
      blocks: [
        { kind: "para", text: "1. Serwis – strona internetowa dostępna pod adresem bcoffee.pl." },
        { kind: "para", text: "2. Usługodawca – B. Coffee Wojciech Baranowski, wskazany w § 1 ust. 2." },
        { kind: "para", text: "3. Użytkownik – każda osoba korzystająca z Serwisu." },
        { kind: "para", text: "4. Formularz kontaktowy – formularz „Szybka wycena” dostępny w Serwisie, służący do przesyłania zapytań ofertowych." },
        { kind: "para", text: "5. Usługi – usługi obsługi kawowej/baristycznej oraz baru z lemoniadą świadczone przez Usługodawcę poza Serwisem, na podstawie odrębnych ustaleń z klientem." },
      ],
    },
    {
      heading: "§3. Zasady korzystania z Serwisu",
      blocks: [
        { kind: "para", text: "1. Do korzystania z Serwisu niezbędne jest posiadanie urządzenia z dostępem do sieci Internet oraz przeglądarki internetowej." },
        { kind: "para", text: "2. Użytkownik zobowiązany jest do korzystania z Serwisu w sposób zgodny z prawem, dobrymi obyczajami oraz niniejszym Regulaminem, w szczególności do niedostarczania treści o charakterze bezprawnym." },
        { kind: "para", text: "3. Usługodawca dokłada starań, aby Serwis działał poprawnie i był dostępny w sposób ciągły, jednak nie gwarantuje nieprzerwanego i niezakłóconego dostępu do Serwisu, w szczególności w przypadku prac konserwacyjnych, aktualizacji lub okoliczności niezależnych od Usługodawcy." },
      ],
    },
    {
      heading: "§4. Formularz kontaktowy i zapytania o wycenę",
      blocks: [
        { kind: "para", text: "1. Serwis umożliwia przesłanie zapytania o wycenę usługi za pośrednictwem Formularza kontaktowego, w którym Użytkownik podaje co najmniej dane kontaktowe (np. imię, numer telefonu i/lub adres e-mail) oraz informacje dotyczące planowanego wydarzenia." },
        { kind: "para", text: "2. Przesłanie Formularza kontaktowego nie stanowi zawarcia umowy o świadczenie Usług. Umowa dotycząca konkretnego wydarzenia (zakres usługi, termin, cena, warunki płatności) ustalana jest indywidualnie pomiędzy Usługodawcą a klientem, w formie odrębnych ustaleń (np. telefonicznie, e-mailowo lub pisemnie) poza Serwisem." },
        { kind: "para", text: "3. Wysłanie Formularza kontaktowego jest bezpłatne i nie rodzi po stronie Użytkownika żadnych zobowiązań finansowych." },
        { kind: "para", text: "4. Usługodawca dokłada starań, aby odpowiedzieć na przesłane zapytanie w rozsądnym terminie." },
      ],
    },
    {
      heading: "§5. Dane osobowe",
      blocks: [
        { kind: "para", text: "1. Administratorem danych osobowych przetwarzanych w związku z korzystaniem z Serwisu, w tym danych podanych w Formularzu kontaktowym, jest Usługodawca." },
        { kind: "para", text: "2. Zasady przetwarzania danych osobowych, cele i podstawy prawne przetwarzania oraz prawa przysługujące Użytkownikom określa Polityka Prywatności dostępna w Serwisie." },
        { kind: "para", text: "3. Serwis nie wykorzystuje plików cookies ani podobnych technologii i nie zapisuje żadnych informacji na urządzeniu Użytkownika." },
      ],
    },
    {
      heading: "§6. Prawa własności intelektualnej",
      blocks: [
        { kind: "para", text: "1. Treści zamieszczone w Serwisie (w tym teksty, zdjęcia, grafiki, logo) stanowią własność Usługodawcy lub są wykorzystywane przez niego na podstawie odrębnych praw i podlegają ochronie prawnej, w szczególności na gruncie ustawy o prawie autorskim i prawach pokrewnych." },
        { kind: "para", text: "2. Kopiowanie, rozpowszechnianie lub wykorzystywanie treści Serwisu w celach komercyjnych bez zgody Usługodawcy jest zabronione." },
      ],
    },
    {
      heading: "§7. Reklamacje dotyczące funkcjonowania Serwisu",
      blocks: [
        { kind: "para", text: "1. Reklamacje dotyczące technicznego funkcjonowania Serwisu Użytkownik może zgłaszać za pośrednictwem danych kontaktowych wskazanych w § 1 ust. 3." },
        { kind: "para", text: "2. Reklamacja powinna zawierać opis zgłaszanego problemu oraz dane kontaktowe umożliwiające udzielenie odpowiedzi." },
        { kind: "para", text: "3. Usługodawca rozpatrzy reklamację i udzieli odpowiedzi w terminie 14 dni od jej otrzymania." },
        { kind: "para", text: "4. Niniejszy paragraf nie dotyczy reklamacji związanych z jakością wykonanych Usług (obsługa wydarzeń) – te rozpatrywane są na zasadach ustalonych indywidualnie z klientem w ramach odrębnej umowy." },
      ],
    },
    {
      heading: "§8. Odpowiedzialność",
      blocks: [
        { kind: "para", text: "1. Usługodawca nie ponosi odpowiedzialności za przerwy w dostępności Serwisu wynikające z przyczyn niezależnych od niego, w tym z działania siły wyższej, awarii sprzętu lub sieci internetowej." },
        { kind: "para", text: "2. Usługodawca nie ponosi odpowiedzialności za skutki korzystania z Serwisu niezgodnie z jego przeznaczeniem lub Regulaminem." },
        { kind: "para", text: "3. Postanowienia niniejszego paragrafu nie wyłączają ani nie ograniczają odpowiedzialności Usługodawcy wobec konsumentów w zakresie, w jakim takie wyłączenie lub ograniczenie byłoby sprzeczne z bezwzględnie obowiązującymi przepisami prawa." },
      ],
    },
    {
      heading: "§9. Postanowienia końcowe",
      blocks: [
        { kind: "para", text: "1. Usługodawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie. Zmieniony Regulamin wchodzi w życie z dniem publikacji w Serwisie." },
        { kind: "para", text: "2. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy powszechnie obowiązującego prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną." },
        { kind: "para", text: "3. Wszelkie spory wynikłe w związku z korzystaniem z Serwisu rozstrzygane będą przez sąd powszechny właściwy zgodnie z obowiązującymi przepisami." },
        { kind: "para", text: "4. Regulamin wchodzi w życie z dniem 10.10.2024 r." },
      ],
    },
  ],
};
