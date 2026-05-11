# Datenschutzerklärung -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Letzte Aktualisierung**: 2026-05-02
**Originalsprache**: Italienisch (verbindliche Fassung für die Gerichtsbarkeit)

---

## 1. Verantwortlicher

- **Name**: Filippo Salemi
- **Rechtsform**: natürliche Person (unabhängiger Entwickler)
- **Marke**: PluriFin
- **Land**: Italien
- **E-Mail für DSGVO und Datenschutz**: `plurifin.app+gdpr@gmail.com`
- **Allgemeine E-Mail**: `plurifin.app@gmail.com`

Kein Datenschutzbeauftragter (DSB) bestellt: natürliche Person außerhalb
der Pflichtfälle nach Art. 37 DSGVO.

## 2. Zusammenfassung (TL;DR)

- Alle Portfoliodaten (Positionen, Transaktionen, Ziele, Einstellungen)
  werden **ausschließlich auf dem Gerät** verschlüsselt gespeichert.
  Nicht an PluriFin-Server übertragen.
- App **nutzt keine Drittanbieter-Analytics** (kein Google Analytics,
  Firebase, Facebook SDK, AppsFlyer, Sentry standardmäßig).
- App **teilt keine Daten** mit Werbeanbietern. Keine Werbung.
- **Optionale Funktionen** existieren, die bei Aktivierung Daten an
  Drittanbieter übertragen: KI Gemini, Echtzeit-Marktpreise (EODHD/FMP),
  Abonnement-Validierung (Cloudflare Worker). Jede erfordert ausdrückliche
  Aktion.
- Nutzer kann jederzeit alle Daten in den Einstellungen exportieren und
  löschen, ohne den Verantwortlichen zu kontaktieren.

## 3. Kategorien verarbeiteter Daten

### 3.1 Lokal auf dem Gerät

Verschlüsselt mit Hive AES-256 + Schlüssel im OS-Keystore:

| Kategorie | Beispiele | Rechtsgrundlage | Aufbewahrung |
|---|---|---|---|
| Portfoliodaten | Name, Ticker, Menge, Durchschnittspreis, Broker, Datum | Art. 6.1.b DSGVO | Bis Löschung durch Nutzer |
| Finanzziele | Titel, Zielbetrag, Fälligkeit, Beiträge | Art. 6.1.b DSGVO | Bis Löschung durch Nutzer |
| Präferenzen | Sprache, Währung, Theme, Demo-Modus | Art. 6.1.b DSGVO | Bis Deinstallation |
| Einwilligungs-Audit | Timestamp, Dokumentversion, Entscheidung, Texthash | Art. 6.1.c DSGVO | Bis Löschung |
| API-Schlüssel | Schlüssel aktivierter Anbieter: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (manuell eingegeben) | Art. 6.1.b DSGVO | Bis Entfernung |

`flutter_secure_storage` (Android Keystore / iOS Keychain / DPAPI).

### 3.2 Daten via Play Store (Google)

PluriFin erhält nur: `purchaseToken`, `productId`, `device_id_hash`
(HMAC-SHA256). PluriFin **erhält kein** Name, E-Mail, Adresse,
Zahlungsdaten.

### 3.3 Abonnement-Validierung (Cloudflare Worker)

Gesendete Daten: `device_id_hash`, `purchase_token`, `product_id`,
signiertes JWT. Antwort: JWT Ed25519. Keine PII. Hash ohne Server-Salt
nicht zurückführbar.

### 3.4 Daten an Gemini (nur bei Aktivierung)

Wenn Nutzer Gemini-Schlüssel eingibt und KI nutzt, wird der Prompt
(Frage + anonyme Portfoliostruktur) direkt an Google Gemini gesendet.
Es gelten die [Google Gemini API Terms](https://ai.google.dev/terms).

### 3.5 Daten an Marktdaten-Anbieter (nur bei Aktivierung)

Die App unterstützt 10 Marktdaten-Anbieter, die der Nutzer unabhängig
konfigurieren kann, indem er einen eigenen API-Schlüssel in den
Einstellungen eingibt. Bei jedem Preis-Refresh überträgt die App die
gewünschten Ticker direkt an den gewählten Anbieter. PluriFin
vermittelt nicht und speichert nicht.

Unterstützte Anbieter und ihre Datenschutzerklärungen:

- [EODHD](https://eodhd.com/financial-academy/privacy-policy/)
- [Financial Modeling Prep (FMP)](https://site.financialmodelingprep.com/privacy-policy)
- [Alpha Vantage](https://www.alphavantage.co/privacy/)
- [Twelve Data](https://twelvedata.com/privacy)
- [Finnhub](https://finnhub.io/privacy-policy)
- [Polygon.io](https://polygon.io/privacy)
- [Marketstack](https://marketstack.com/privacy)
- [Tiingo](https://www.tiingo.com/about/privacy)
- [Nasdaq Data Link](https://www.nasdaq.com/privacy-statement)
- [Stooq](https://stooq.com): öffentlicher CSV-Download ohne API-Schlüssel
  (die HTTP-Anfrage erfolgt direkt vom Gerät zu stooq.com)

Für jeden Anbieter erfolgt die Übertragung **nur**, wenn der Nutzer:
1. seinen API-Schlüssel in den Einstellungen eingegeben hat (Stooq
   ausgenommen, kostenlos);
2. den Anbieter als aktiv für den Refresh ausgewählt hat.

Der Nutzer kann den Schlüssel jederzeit entfernen oder den Anbieter
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
| Stooq | Öffentlicher CSV-Download historischer Preise | Ticker-Liste (kein API-Schlüssel) | Nur bei Aktivierung Stooq |
| Cloudflare Worker | Abonnement-Validierung | device_id_hash, JWT | Immer (Gating) |
| GitHub Pages | Hosting | IP HTTP-Request | Bei jedem Besuch |

## 5. Übertragungen außerhalb der EU

Google, Cloudflare, GitHub: US-Unternehmen. Grundlagen:

- EU-Standardvertragsklauseln 2021/914
- EU-US Data Privacy Framework (Google)
- Eigene Richtlinien (EODHD, FMP)

Wer keine Drittlandsübertragungen wünscht: optionale Funktionen nicht
aktivieren.

## 6. Betroffenenrechte (Art. 15-22 DSGVO)

| Recht | Wahrnehmung |
|---|---|
| Auskunft | Einstellungen > Datenschutz > Daten exportieren (ZIP) |
| Berichtigung | Direkte Bearbeitung in der App |
| Löschung | Einstellungen > Datenschutz > Alle Daten löschen / Deinstallation |
| Einschränkung | Optionale Funktionen deaktivieren |
| Datenübertragbarkeit | Einstellungen > Daten exportieren (JSON+CSV) |
| Widerspruch | Optionale Funktionen deaktivieren |
| Beschwerde | [Garante (Italien)](https://www.garanteprivacy.it/), BfDI (Deutschland) oder nationale Behörde |

Anfragen: `plurifin.app+gdpr@gmail.com`. Antwort innerhalb 30 Tagen
(Art. 12.3 DSGVO).

## 7. Aufbewahrung

Lokale Daten bis Nutzerlöschung. Einwilligungs-Audit: bis explizitem
Export und Löschung. Auftragsverarbeiter: eigene Richtlinien.

## 8. Sicherheit

- Hive AES-256 + HMAC-SHA256
- `flutter_secure_storage`
- Nur HTTPS (TLS 1.2+)
- `FLAG_SECURE` Android auf sensiblen Seiten
- `allowBackup=false`
- Root/Jailbreak-Erkennung mit graceful Degradation
- Dart-Obfuskation in Releases

## 9. Minderjährige (Art. 8 DSGVO)

App nicht für unter 18-Jährige. Play Store Content Rating "18+".
Eltern/Erziehungsberechtigte können Löschung anfordern an
`plurifin.app+gdpr@gmail.com`.

## 10. Cookies

Mobile App: keine Cookies. Webapp: `localStorage` + technisches
GitHub-Pages-Cookie. Marketing-Site: GoatCounter self-hosted (cookie-frei,
ohne Fingerprinting).

## 11. Änderungen

Benachrichtigung via App (Re-Consent), Site-Banner (30 Tage),
Newsletter-E-Mail. Vorherige Versionen in Repo
`lunapiena49/portfoliomanager-data`, Git-History.

## 12. Kontakte

- DSGVO: `plurifin.app+gdpr@gmail.com`
- Datenschutz: `plurifin.app+privacy@gmail.com`
- Support: `plurifin.app+support@gmail.com`
- Legal: `plurifin.app+legal@gmail.com`
- Öffentlich Play Store: `plurifin.app@gmail.com`

## 13. Gerichtsstand und anwendbares Recht

Italienisches Recht und DSGVO. Für Verbraucher: Verbrauchergerichtsstand
nach D.Lgs. 206/2005 (Italien) oder strengere nationale Regeln.
