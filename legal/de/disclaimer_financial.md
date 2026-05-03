# Finanz-Disclaimer -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Letzte Aktualisierung**: 2026-05-02
**Originalsprache**: Italienisch (verbindliche Fassung)

---

> **WICHTIGER HINWEIS -- VOR NUTZUNG LESEN**
>
> Portfolio Manager ist ein Informationswerkzeug. Die angezeigten
> Informationen, Daten, Diagramme, Rebalancing-Vorschlage und KI-Analysen
> stellen **in keinem Fall Finanzberatung, Anlageempfehlung, offentliche
> Aufforderung zum Sparen oder Wertpapierdienstleistung** im Sinne des
> italienischen TUF (D.Lgs. 58/1998), der MiFID-II-Richtlinie (2014/65/EU)
> und entsprechender nationaler Vorschriften dar. Der Nutzer ubernimmt
> ausschliessliche Verantwortung fur seine Anlageentscheidungen.

---

## 1. Informativer Charakter

Alles, was die App zeigt, hat **rein informativen, deskriptiven und
edukativen Zweck**. Die App **gibt nicht**:

- Personalisierte Anlageberatung
- Vorschlage zu konkreten Instrumenten oder Operationen
- Urteile zu Eignung fur Vermogensverhaltnisse / Ziele / Risikotoleranz
- Auftragsausfuhrung oder Broker-Verbindungen
- Verwahrung von Geldern oder Instrumenten

## 2. Normative Bezuge

- **Art. 1.5-septies TUF**: Definition "consulenza in materia di
  investimenti". App **erfullt nicht**.
- **Art. 18-bis und 18-ter TUF**: Vorbehalt fur OCF-Eingetragene.
  PluriFin/Filippo Salemi **nicht eingetragen**.
- **Art. 1.5.d TUF**: Portfolioverwaltung. App **verwaltet nicht**.
- **MiFID II und MiFIR**: keine reservierten Dienstleistungen.
- **Verordnung (EU) 2017/565**: keine Eignungs-/Angemessenheitsprufung.

## 3. KI-Analysen -- spezifische Warnungen

### 3.1 Probabilistisches Modell

LLMs erzeugen Text **probabilistisch**. Gleiche Frage -> verschiedene
Antworten.

### 3.2 Halluzinationen

Konnen **falsche aber plausible Aussagen** zu Instrumentennamen, ISINs,
historischer Performance, Dividenden, Steuerregeln, Indexzusammensetzung,
Ex-Dividende-Daten produzieren. **Immer mit offiziellen Quellen
prufen**.

### 3.3 Wissens-Cutoff

Modell kennt keine Ereignisse nach seinem Cutoff-Datum.

### 3.4 Keine personalisierten Empfehlungen

Auch wenn Prompt das Portfolio enthalt, sind KI-Antworten **keine
personalisierte Beratung**: Modell kennt keine Vermogenslage, Einkommen,
Liquiditat, Horizont, Risikotoleranz, Steuersituation, Rentenziele.

### 3.5 Kein "Know Your Customer"

App erhebt kein Risikoprofil. Nicht der MiFID-II-Eignungs-/Angemessenheits-
prufung unterworfen.

## 4. Rebalancing-Vorschlage

Arithmetische Berechnungen auf nutzerdefinierten Parametern. **Keine**
Kauf-/Verkaufsempfehlungen. App bewertet nicht: Markt-Timing,
Steuerwirkung, Transaktionskosten, Liquiditat, Konzentration. Konsultieren
Sie **autorisierten Finanzberater**.

## 5. Marktdaten

Daten aus offentlichen Quellen oder EODHD/FMP (Nutzer-Schlussel). Mogliche
Verzogerungen 15-20 Min., Fehler bei Splits/Dividenden/Ticker-Anderungen.
PluriFin ohne Verantwortung.

## 6. Steuerberechnungen

App **berechnet keine** Steuern. Angezeigte Gewinne/Verluste sind
arithmetische Rohwerte ohne Berucksichtigung von: Besteuerung, bollo
titoli (IT), IVAFE, Abzugen, Holding-Period, UCITS/Non-UCITS-Behandlung,
Erbschaft. Konsultieren Sie **Steuerberater oder CAF**.

## 7. Auslandsmarkte und Wahrungen

Berucksichtigen: Wechselkursrisiko, Konvertierungskosten,
Doppelbesteuerung (W-8BEN USA), Auslandsmeldungen, Steuerresidenz. App
**modelliert keine**.

## 8. Personliche Sicherheit

- API-Schlussel im OS-Keystore -> zuganglich bei entsperrtem Gerat
- Verlorenes Gerat gesperrt: geschutzt; entsperrt: Daten exponiert
- Google-Drive-Backups standardmassig deaktiviert

PluriFin haftet nicht fur: Diebstahl/Verlust mit Entsperrung, falsche
Lock-Konfiguration, Gerate-Kompromittierung, Schlusselteilung,
manuellen Export und unkontrollierte Verteilung.

## 9. Normative Updates

Steuer- und regulatorische Regeln **andern sich haufig**. App garantiert
keine Aktualitat. Nutzer pruft jeweils geltende Regelung.

## 10. Nutzerentscheidungen -- Haftungsfreistellung

Nutzer erklart und akzeptiert:

1. Nutzung von App, Daten, Analysen auf seine Initiative und Risiko
2. Anlageentscheidungen sind **ausschliesslich seine**
3. PluriFin haftet nicht, in gesetzlichen Grenzen, fur Verluste oder
   Steuerfolgen
4. Fur wichtige Entscheidungen konsultiert Nutzer **autorisierten
   Finanzberater** (OCF: <https://www.organismocf.it> oder nationales
   Aquivalent)

## 11. Minderjahrige

App **nicht fur unter 18-Jahrige**. Content Rating Play "Everyone /
18+". Eltern/Erziehungsberechtigte verantwortlich.

## 12. Geolokation

App fur italienischen Markt und Eurozone. Nutzer ausserhalb prufen lokale
Konformitat. PluriFin haftet nicht fur abweichende Auslegungen.

## 13. Ausdruckliche Annahme

Mit Annahme dieses Disclaimers beim ersten Start (oder nach Versions-
Bump) erklart Nutzer, gelesen, verstanden zu haben und PluriFin/Filippo
Salemi in gesetzlichen Grenzen freizustellen.

Annahme aufgezeichnet in verschlusseltem `consent_box` (UTC-Timestamp,
Version, SHA-256-Hash).

Ohne Annahme: Rebalancing, KI, Import gesperrt; nur Lesen rechtlicher
Texte und Einstellungen.

## 14. Gerichtsstand

Italienisches Recht. Streitigkeiten: siehe ToS.

## 15. Kontakte

`plurifin.app+legal@gmail.com`. PluriFin **gibt keine Finanzberatung per
E-Mail**. Dafur autorisierter Berater (OCF oder Aquivalent).
