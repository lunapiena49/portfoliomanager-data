---
title: "Warum ich PluriFin gebaut habe"
summary: "Die persoenliche Geschichte hinter einer privacy-first App fuer Privatanleger, und warum ein einzelner Entwickler sich einen 0,99 EUR/Jahr-Tarif leisten kann."
publishedAt: 2026-05-07
author:
  name: "Filippo Salemi"
  role: "Founder, PluriFin"
lang: de
tags: ["founder", "story", "personal-finance"]
---

Ich arbeite seit etwa 18 Monaten in Teilzeit an PluriFin, waehrend mein
Hauptberuf weiterhin Software-Entwickler in einem italienischen Unternehmen
ist. Die App ist nicht als kommerzielles Produkt entstanden: sie ist als
persoenliches Werkzeug entstanden, um ein Multi-Broker-Portfolio zu verfolgen,
das mit generischen Werkzeugen jedes Jahr schwerer zu verwalten wurde.

## Das Problem

Ich hatte Positionen verteilt auf 4 Brokern (Interactive Brokers, Trade
Republic, Fineco und Directa) in 3 Waehrungen (EUR, USD, GBP), mit gemischten
Asset-Klassen (Einzelaktien, in den USA gelistete ETFs, UCITS-ETFs, einige
Krypto-ETPs, Anleihenfonds). Jeder Broker exportiert in einem anderen
CSV-Format, jeder Broker hat seine eigene Transaktions-Granularitaet, und
jeder Broker hat seine eigene Interpretation von "durchschnittlicher
Anschaffungskostenbasis" und "realisiertem P&amp;L".

Die generischen Werkzeuge, die ich ausprobiert hatte (Google-Sheets-Templates,
einige italienische Webdienste), verstanden entweder die Multi-Broker-CSVs
nicht, oder verlangten, API-Zugangsdaten an einen Cloud-Drittanbieter
weiterzugeben. Beides war fuer mich inakzeptabel: Tabellen werden ueber ~30
Positionen hinaus unverwaltbar, und einem nicht auditierbaren Dienst einen
Read-only-API-Token zu geben, ist ein Trade-off, den ich nicht eingehen will.

## Die persoenliche Antwort, dann das Produkt

PluriFin entstand als internes Projekt unter drei harten Bedingungen:

1. **Die Daten leben auf dem Geraet des Nutzers**, in AES-256 verschluesseltem
   Speicher. Keine PluriFin-Cloud-Pflicht. Der GDPR-Export ist nur einen
   Klick entfernt.
2. **Die App spricht nie im Namen des Nutzers mit einem Broker**. Alles laeuft
   ueber CSV/PDF-Imports, die der Nutzer von seinem Broker herunterladt.
   Keine Drittanbieter-API-Keys werden von PluriFin verwahrt.
3. **KI-Funktionen sind optional und verwenden Nutzerschluessel**. Wenn ihr die
   Gemini-Analyse wollt, gebt ihr euren API-Schluessel ein; er bleibt im
   Keystore eures Geraets.

Als ich erkannte, dass das Produkt mehr als nur mir nuetzlich sein konnte,
entschied ich mich es zu veroeffentlichen. Das Geschaeftsmodell ist bewusst
low-friction:

- 7 Tage kostenlose Testversion ohne Karte
- 0,99 EUR/Jahr fuer Single, 1,99 EUR/Jahr fuer Familie
- Lifetime Einmalzahlung 4,99 EUR (Single) oder 9,99 EUR (Familie)

Kein "Early Bird", kein "erste N Nutzer", keine Aktionen, die segmentieren.
Gleicher Preis fuer alle, heute und in Zukunft.

## Warum so guenstig

Die App kostet 25 USD einmalig fuer Play Console und ~0 EUR Hosting
(Cloudflare-Free-Tier fuer den Worker und GitHub Pages fuer die Webseite).
Es gibt keine Investoren, an die Kapital zurueckzugeben waere, kein Churn,
das mit Rabatten bekaempft werden muesste, kein Team zu bezahlen. Das Ziel
ist, die Betriebskosten zu decken und eine Community von Nutzern am Leben zu
erhalten, die einen ehrlichen Ansatz zum Sparen schaetzen.

Sollte PluriFin eines Tages den Betrieb einstellen, gibt euch der GDPR-Export
alle eure Daten in einem einzelnen portablen JSON zurueck -- und die
Lifetime-Plaene bleiben auf eurem Google-Konto fuer immer zugaenglich.

## Was in den naechsten Monaten zu erwarten ist

- **Q2 2026**: Play-Store-Launch (Android), kostenlose Webapp bereits live
- **Q3 2026**: Feedback aus dem Closed Testing, Hotfixes fuer verbleibende Crashes
- **Q4 2026 / Q1 2027**: mehr unterstuetzte Broker (Prioritaet: Nutzerfeedback)
- **Phase 2 (nach Umsatz)**: iOS, Apple Pay, EUIPO-Marke, eventuelle RC-Tech-Versicherung

Wer die Entwicklung in Echtzeit verfolgen moechte: das oeffentliche Repo
[portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data)
hostet die Marktdaten-Pipeline und die Webseite, die ihr gerade lest. Der Code
der Android-App bleibt aus Compliance-Gruenden closed-source (Signaturschluessel,
Anti-Piracy, Integritaet des Play-Billing-Kontexts), aber die Broker-CSV-Format-
Spezifikationen und die Vorlagen der Rechtsdokumente sind oeffentlich.

Bis bald.
