# Datenschutzerklarung -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Letzte Aktualisierung**: 2026-05-02
**Originalsprache**: Italienisch (verbindliche Fassung fur die Gerichtsbarkeit)

---

## 1. Verantwortlicher

- **Name**: Filippo Salemi
- **Rechtsform**: naturliche Person (unabhangiger Entwickler)
- **Marke**: PluriFin
- **Land**: Italien
- **E-Mail fur DSGVO und Datenschutz**: `plurifin.app+gdpr@gmail.com`
- **Allgemeine E-Mail**: `plurifin.app@gmail.com`

Kein Datenschutzbeauftragter (DSB) bestellt: naturliche Person ausserhalb
der Pflichtfalle nach Art. 37 DSGVO.

## 2. Zusammenfassung (TL;DR)

- Alle Portfoliodaten (Positionen, Transaktionen, Ziele, Einstellungen)
  werden **ausschliesslich auf dem Gerat** verschlusselt gespeichert.
  Nicht an PluriFin-Server ubertragen.
- App **nutzt keine Drittanbieter-Analytics** (kein Google Analytics,
  Firebase, Facebook SDK, AppsFlyer, Sentry standardmassig).
- App **teilt keine Daten** mit Werbeanbietern. Keine Werbung.
- **Optionale Funktionen** existieren, die bei Aktivierung Daten an
  Drittanbieter ubertragen: KI Gemini, Echtzeit-Marktpreise (EODHD/FMP),
  Abonnement-Validierung (Cloudflare Worker). Jede erfordert ausdruckliche
  Aktion.
- Nutzer kann jederzeit alle Daten in den Einstellungen exportieren und
  loschen, ohne den Verantwortlichen zu kontaktieren.

## 3. Kategorien verarbeiteter Daten

### 3.1 Lokal auf dem Gerat

Verschlusselt mit Hive AES-256 + Schlussel im OS-Keystore:

| Kategorie | Beispiele | Rechtsgrundlage | Aufbewahrung |
|---|---|---|---|
| Portfoliodaten | Name, Ticker, Menge, Durchschnittspreis, Broker, Datum | Art. 6.1.b DSGVO | Bis Loschung durch Nutzer |
| Finanzziele | Titel, Zielbetrag, Falligkeit, Beitrage | Art. 6.1.b DSGVO | Bis Loschung durch Nutzer |
| Praferenzen | Sprache, Wahrung, Theme, Demo-Modus | Art. 6.1.b DSGVO | Bis Deinstallation |
| Einwilligungs-Audit | Timestamp, Dokumentversion, Entscheidung, Texthash | Art. 6.1.c DSGVO | Bis Loschung |
| API-Schlussel | Schlussel aktivierter Anbieter: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (manuell eingegeben) | Art. 6.1.b DSGVO | Bis Entfernung |

`flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Daten via Play Store (Google)

PluriFin erhalt nur: `purchaseToken`, `productId`, `device_id_hash`
(HMAC-SHA256). PluriFin **erhalt kein** Name, E-Mail, Adresse,
Zahlungsdaten.

### 3.3 Abonnement-Validierung (Cloudflare Worker)

Gesendete Daten: `device_id_hash`, `purchase_token`, `product_id`,
signiertes JWT. Antwort: JWT Ed25519. Keine PII. Hash ohne Server-Salt
nicht zuruckfuhrbar.

### 3.4 Daten an Gemini (nur bei Aktivierung)

Wenn Nutzer Gemini-Schlussel eingibt und KI nutzt, wird der Prompt
(Frage + anonyme Portfoliostruktur) direkt an Google Gemini gesendet.
Es gelten die [Google Gemini API Terms](https://ai.google.dev/terms).

### 3.5 Daten an Marktdaten-Anbieter (nur bei Aktivierung)

Die App unterstutzt 10 Marktdaten-Anbieter, die der Nutzer unabhangig
konfigurieren kann, indem er einen eigenen API-Schlussel in den
Einstellungen eingibt. Bei jedem Preis-Refresh ubertragt die App die
gewunschten Ticker direkt an den gewahlten Anbieter. PluriFin
vermittelt nicht und speichert nicht.

Unterstutzte Anbieter und ihre Datenschutzerklarungen:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): offentlicher CSV-Download ohne API-Schlussel
  (die HTTP-Anfrage erfolgt direkt vom Gerat zu stooq.com)

Fur jeden Anbieter erfolgt die Ubertragung **nur**, wenn der Nutzer:
1. seinen API-Schlussel in den Einstellungen eingegeben hat (Stooq
   ausgenommen, kostenlos);
2. den Anbieter als aktiv fur den Refresh ausgewahlt hat.

Der Nutzer kann den Schlussel jederzeit entfernen oder den Anbieter
deaktivieren.

## 4. Auftragsverarbeiter

| Auftragsverarbeiter | Zweck | Daten | Wann |
|---|---|---|---|
| Google Play Billing | Zahlung Abonnement | purchaseToken, productId | Nur bei Kauf |
| Google Gemini API | KI-Analyse | Prompt + anonymes Portfolio | Nur bei Aktivierung |
| EODHD | Echtzeit- und historische Preise | Ticker-Liste | Nur bei Aktivierung |
| FMP | Echtzeit-Preise, Fundamentaldaten | Ticker-Liste | Nur bei Aktivierung |
| Alpha Vantage | Historische Preise | Ticker-Liste | Nur bei Aktivierung |
| Twelve Data | Echtzeit- und historische Preise | Ticker-Liste | Nur bei Aktivierung |
| Finnhub | Echtzeit-Preise | Ticker-Liste | Nur bei Aktivierung |
| Polygon.io | Historische Preise | Ticker-Liste | Nur bei Aktivierung |
| Marketstack | End-of-Day-Preise | Ticker-Liste | Nur bei Aktivierung |
| Tiingo | Echtzeit- und historische Preise | Ticker-Liste | Nur bei Aktivierung |
| Nasdaq Data Link | Historische Preise | Ticker-Liste | Nur bei Aktivierung |
| Stooq | Offentlicher CSV-Download historischer Preise | Ticker-Liste (kein API-Schlussel) | Nur bei Aktivierung Stooq |
| Cloudflare Worker | Abonnement-Validierung | device_id_hash, JWT | Immer (Gating) |
| GitHub Pages | Hosting | IP HTTP-Request | Bei jedem Besuch |

## 5. Ubertragungen ausserhalb der EU

Google, Cloudflare, GitHub: US-Unternehmen. Grundlagen:

- EU-Standardvertragsklauseln 2021/914
- EU-US Data Privacy Framework (Google)
- Eigene Richtlinien (EODHD, FMP)

Wer keine Drittlandsubertragungen wunscht: optionale Funktionen nicht
aktivieren.

## 6. Betroffenenrechte (Art. 15-22 DSGVO)

| Recht | Wahrnehmung |
|---|---|
| Auskunft | Einstellungen > Datenschutz > Daten exportieren (ZIP) |
| Berichtigung | Direkte Bearbeitung in der App |
| Loschung | Einstellungen > Datenschutz > Alle Daten loschen / Deinstallation |
| Einschrankung | Optionale Funktionen deaktivieren |
| Datenubertragbarkeit | Einstellungen > Daten exportieren (JSON+CSV) |
| Widerspruch | Optionale Funktionen deaktivieren |
| Beschwerde | [Garante (Italien)](https://www.garanteprivacy.it/), BfDI (Deutschland) oder nationale Behorde |

Anfragen: `plurifin.app+gdpr@gmail.com`. Antwort innerhalb 30 Tagen
(Art. 12.3 DSGVO).

## 7. Aufbewahrung

Lokale Daten bis Nutzerloschung. Einwilligungs-Audit: bis explizitem
Export und Loschung. Auftragsverarbeiter: eigene Richtlinien.

## 8. Sicherheit

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage`
- Nur HTTPS (TLS 1.2+)
- `FLAG_SECURE` Android auf sensiblen Seiten
- `allowBackup=false`
- Root/Jailbreak-Erkennung mit graceful Degradation
- Dart-Obfuskation in Releases

## 9. Minderjahrige (Art. 8 DSGVO)

App nicht fur unter 18-Jahrige. Play Store Content Rating "18+".
Eltern/Erziehungsberechtigte konnen Loschung anfordern an
`plurifin.app+gdpr@gmail.com`.

## 10. Cookies

Mobile App: keine Cookies. Webapp: `localStorage` + technisches
GitHub-Pages-Cookie. Marketing-Site: GoatCounter self-hosted (cookie-frei,
ohne Fingerprinting).

## 11. Anderungen

Benachrichtigung via App (Re-Consent), Site-Banner (30 Tage),
Newsletter-E-Mail. Vorherige Versionen in Repo
`lunapiena49/portfoliomanager-data`, Git-History.

## 12. Kontakte

- DSGVO: `plurifin.app+gdpr@gmail.com`
- Datenschutz: `plurifin.app+privacy@gmail.com`
- Support: `plurifin.app+support@gmail.com`
- Offentlich Play Store: `plurifin.app@gmail.com`

## 13. Gerichtsstand und anwendbares Recht

Italienisches Recht und DSGVO. Fur Verbraucher: Verbrauchergerichtsstand
nach D.Lgs. 206/2005 (Italien) oder strengere nationale Regeln.
