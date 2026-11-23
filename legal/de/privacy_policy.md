# Datenschutzerklärung -- Portfolio Manager by PluriFin

**Version**: 1.0.5
**Letzte Aktualisierung**: 2026-11-22
**Originalsprache**: Italienisch (verbindliche Fassung für die Gerichtsbarkeit)

---

## 1. Verantwortlicher

- **Name**: Filippo Salemi
- **Rechtsform**: natürliche Person (unabhängiger Entwickler)
- **Marke**: PluriFin
- **Land**: Italien
- **E-Mail für DSGVO und Datenschutz**: `gdpr@plurifin.app`
- **Allgemeine E-Mail**: `info@plurifin.app`

Kein Datenschutzbeauftragter (DSB) bestellt: natürliche Person außerhalb
der Pflichtfälle nach Art. 37 DSGVO.

## 2. Zusammenfassung (TL;DR)

- Alle Portfoliodaten (Positionen, Transaktionen, Ziele, Einstellungen)
  werden **ausschließlich auf dem Gerät** verschlüsselt gespeichert.
  Nicht an PluriFin-Server übertragen.
- App **nutzt keine aktiven Drittanbieter-Analytics** in dieser Version
  (kein Facebook SDK, AppsFlyer, Sentry, keine von der App erzeugten
  Google-Analytics-Ereignisse). Eine Google-Analytics-for-Firebase-
  Property (GA4) ist mit dem Firebase-Projekt `portfolio-manager-f6f8d`
  verknüpft, um künftige Erweiterungen vorzubereiten: Version 1.0.0+10
  bündelt kein `firebase_analytics`-SDK, daher erzeugt das App-Binary
  keine Analytics-Ereignisse. Siehe Abschnitt 4 (Auftragsverarbeiter)
  für die vollständige Erklärung.
- Auf Android integriert die App eine **optionale anonyme Crash-Diagnose via Firebase Crashlytics** (Google Ireland Limited): standardmäßig deaktiviert, vom Nutzer aktivierbar unter Einstellungen > Datenschutz. Niemals Portfolio-Daten, API-Schlüssel oder KI-Inhalt. Sie erfasst auch **Startfehler, die die App selbst abgefangen hat** (zum Beispiel einen lokalen Speicher, der nicht geöffnet werden konnte). Solange die Option deaktiviert ist, wird nichts übertragen; die Berichte werden aber auch nicht verworfen: das Crashlytics-SDK **behält sie auf dem Gerät** und sendet sie nur, wenn und sobald Sie die Option aktivieren. Sie liegen im Speicher der App, das Deinstallieren der App oder das Löschen ihrer Daten entfernt sie also. Siehe Abschnitt 4 (Auftragsverarbeiter).
- App **teilt keine Daten** mit Werbeanbietern. Keine Werbung.
- **Optionale Funktionen** existieren, die bei Aktivierung Daten an
  Drittanbieter übertragen: KI Gemini und Echtzeit-Marktpreise der Anbieter,
  die der Nutzer mit einem eigenen Schlüssel einrichtet (EODHD, FMP und die
  übrigen aus Abschnitt 3.5). Jede erfordert ausdrückliche Aktion.
- Testphase und Abonnement werden **nur auf dem Gerät** gespeichert: Die
  App sendet weder den Kaufbeleg noch eine Gerätekennung an Server von
  PluriFin (Abschnitte 3.2 und 3.3).
- Nutzer kann jederzeit alle Daten in den Einstellungen exportieren und
  löschen, ohne den Verantwortlichen zu kontaktieren.

## 3. Kategorien verarbeiteter Daten

### 3.1 Lokal auf dem Gerät

Bleiben **ausschließlich** auf dem Gerät, in einem verschlüsselten lokalen
Speicher (Hive AES-256 + Schlüssel im OS-Keystore):

| Kategorie | Beispiele | Rechtsgrundlage | Aufbewahrung |
|---|---|---|---|
| Portfoliodaten | Name, Ticker, Menge, Durchschnittspreis, Broker, Datum | Art. 6.1.b DSGVO | Bis Löschung durch Nutzer |
| Finanzziele | Titel, Zielbetrag, Fälligkeit, Beiträge | Art. 6.1.b DSGVO | Bis Löschung durch Nutzer |
| Präferenzen | Sprache, Währung, Theme, Demo-Modus | Art. 6.1.b DSGVO | Bis Deinstallation |
| Einwilligungs-Audit | Timestamp, Dokumentversion, Entscheidung, Texthash | Art. 6.1.c DSGVO | Bis Löschung |
| API-Schlüssel | Schlüssel aktivierter Anbieter: Gemini, EODHD, FMP, Alpha Vantage, Twelve Data, Finnhub, Polygon.io, Marketstack, Tiingo, Nasdaq Data Link (manuell eingegeben) | Art. 6.1.b DSGVO | Bis Entfernung |

Verschlüsselung AES-256 im CBC-Modus; der 32-Byte-Schlüssel liegt im
System-Keystore (Android Keystore / iOS Keychain / DPAPI). Die Integrität
jedes Datensatzes wird mit einem CRC32-Code geprüft: Er erkennt einen
beschädigten oder mit dem falschen Schlüssel gelesenen Datensatz. Er ist
keine kryptografische Signatur (kein HMAC) und schützt nicht vor einer
absichtlichen Änderung durch jemanden, der bereits Zugriff auf die Dateien
der App hat. API-Schlüssel werden in `flutter_secure_storage` gespeichert,
das denselben Keystore nutzt.

**Unverschlüsselt** bleiben dagegen, in den der App vorbehaltenen
Systemeinstellungen (SharedPreferences), einige technische Einstellungen
ohne Portfoliodaten: die gewählte Sprache (die die Übersetzungsbibliothek easy_localization auch hier speichert), die Wahl zur Absturzdiagnose, der Abschluss der
Einführung, die Kenntnisnahme der Informationsbildschirme, die Marker
bereits ausgeführter interner Migrationen und die Zähler, nach denen die App
entscheidet, wann sie um eine Bewertung bei Google Play bittet (Anzahl der
Importe, Anzahl der von Hand eingegebenen Positionen, Datum der letzten
Anfrage).

### 3.2 Käufe über Google Play

Die Zahlung wird vollständig von Google Play abgewickelt: PluriFin
**erhält keine** Namen, E-Mail-Adressen, Anschriften oder Zahlungsdaten.

Nach einem Kauf teilt Google Play der App auf dem Gerät das Ergebnis und die
Kennung des gekauften Produkts mit (`productId`: eine der vier
Premium-Varianten, jährlich oder lebenslang, Einzel oder Familie). Die App
speichert das aktive Abonnement im verschlüsselten lokalen Speicher
(Abschnitt 3.1). In dieser Version sendet die App den Kaufbeleg
(`purchaseToken`) und andere Kaufdaten **nicht** an Server von PluriFin: Der
Beleg geht nur an Google Play zurück, das damit den Kauf bestätigt.

### 3.3 Testphase und Gerätefingerabdruck (nur Android)

Beim ersten Start beginnt die App die 7-tägige kostenlose Testphase und
speichert sie nur auf dem Gerät. Dafür berechnet sie einen
`device_id_hash`: den SHA-256-Fingerabdruck eines zufälligen 32-Byte-Werts,
der bei der ersten Ausführung erzeugt und im System-Keystore
(`flutter_secure_storage`) aufbewahrt wird. Der Fingerabdruck wird **nicht**
aus der Android-ID oder anderen Kennungen des Geräts oder des Nutzers
abgeleitet und verwendet keine von einem Server gelieferten Werte.

Der Fingerabdruck bleibt zusammen mit Beginn- und Enddatum der Testphase im
verschlüsselten lokalen Speicher; in dieser Version wird er **nicht** an
PluriFin oder Dritte gesendet. Beim Deinstallieren der App wird der
Zufallswert gelöscht, und eine neue Installation erzeugt einen anderen
Fingerabdruck.

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
| Google Play Billing | Zahlung Abonnement | Zahlungs- und Kaufdaten, von Google verarbeitet: PluriFin erhält sie nicht | Nur bei Kauf |
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
| Google Ireland Limited -- Firebase Crashlytics | Anonyme Crash-Diagnose | Verschlüsselter Stack Trace, Gerätemodell, OS, App-Version, anonyme Firebase Installation ID | Nur wenn der Nutzer "Anonyme Crash-Diagnose" unter Einstellungen > Datenschutz aktiviert. Standardmäßig deaktiviert. Berichte, die bei deaktivierter Option entstehen (Abstürze und abgefangene Startfehler), verbleiben durch das SDK auf dem Gerät und werden erst nach dem Aktivieren durch den Nutzer übertragen. |
| Google LLC -- Google Analytics for Firebase (GA4) | Vorbereitung für künftige aggregierte Stabilitäts-Analytics (GA4-Property mit dem Firebase-Projekt verknüpft) | **Keine Datenübertragung in Version 1.0.0+10** (das `firebase_analytics`-SDK ist nicht in pubspec). Sobald `firebase_analytics` in einer zukünftigen Version integriert wird, erhält GA4 automatisch erfasste Ereignisse (Screen Views, app_start/app_foreground, `app_exception` aggregiert aus Crashlytics). Der Nutzer wird zu diesem Zeitpunkt neu eingewilligt | Inaktiv in Version 1.0.0+10. Wird erst nach einem zukünftigen App-Update + erneuter Nutzereinwilligung aktiviert. |
| Cloudflare, Inc. -- Netzwerk vor der Domain `plurifin.app` | Auslieferung von Website, Rechtsdokumenten, Demo-Webapp und öffentlichen Marktdaten | Technische Zugriffsprotokolle (IP, User-Agent, Uhrzeit) | Jedes Mal, wenn App oder Browser eine Ressource der Domain `plurifin.app` laden |
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

Anfragen: `gdpr@plurifin.app`. Antwort innerhalb 30 Tagen
(Art. 12.3 DSGVO).

## 7. Aufbewahrung

Lokale Daten bis Nutzerlöschung. Einwilligungs-Audit: bis explizitem
Export und Löschung. Testphase und Abonnement: nur auf dem Gerät
(Abschnitte 3.2 und 3.3), keine Kopie bei PluriFin. Auftragsverarbeiter:
eigene Richtlinien.

## 8. Sicherheit

- Hive AES-256 (CBC) mit CRC32-Integritätsprüfung (kein HMAC)
- `flutter_secure_storage`
- Nur HTTPS (TLS 1.2+)
- `FLAG_SECURE` Android auf sensiblen Seiten
- `allowBackup=false`
- Root/Jailbreak-Erkennung mit graceful Degradation
- Dart-Obfuskation in Releases

## 9. Minderjährige (Art. 8 DSGVO)

App nicht für unter 18-Jährige. Zielgruppe: nur Erwachsene (18+).
Eltern/Erziehungsberechtigte können Löschung anfordern an
`gdpr@plurifin.app`.

## 10. Cookies

Mobile App: keine Cookies. Webapp: `localStorage` + technisches
GitHub-Pages-Cookie. Marketing-Site: GoatCounter self-hosted (cookie-frei,
ohne Fingerprinting).

## 11. Änderungen

Benachrichtigung via App (Re-Consent). Vorherige Versionen in Repo
`lunapiena49/portfoliomanager-data`, Git-History.

## 12. Kontakte

- DSGVO: `gdpr@plurifin.app`
- Datenschutz: `privacy@plurifin.app`
- Support: `support@plurifin.app`
- Legal: `legal@plurifin.app`
- Öffentlich Play Store: `info@plurifin.app`

## 13. Gerichtsstand und anwendbares Recht

Italienisches Recht und DSGVO. Für Verbraucher: Verbrauchergerichtsstand
nach D.Lgs. 206/2005 (Italien) oder strengere nationale Regeln.

Bei Abweichungen zwischen den Sprachfassungen dieses Dokuments hat der italienische Text Vorrang.
