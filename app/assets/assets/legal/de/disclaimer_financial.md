# Finanz-Disclaimer -- Portfolio Manager by PluriFin

**Version**: 1.0.0
**Letzte Aktualisierung**: 2026-05-02
**Originalsprache**: Italienisch (verbindliche Fassung)

---

> **WICHTIGER HINWEIS -- VOR NUTZUNG LESEN**
>
> Portfolio Manager ist ein Informationswerkzeug. Die angezeigten
> Informationen, Daten, Diagramme, Rebalancing-Vorschläge und KI-Analysen
> stellen **in keinem Fall Finanzberatung, Anlageempfehlung, öffentliche
> Aufforderung zum Sparen oder Wertpapierdienstleistung** im Sinne des
> italienischen TUF (D.Lgs. 58/1998), der MiFID-II-Richtlinie (2014/65/EU)
> und entsprechender nationaler Vorschriften dar. Der Nutzer übernimmt
> ausschließliche Verantwortung für seine Anlageentscheidungen.

---

## 1. Informativer Charakter

Alles, was die App zeigt, hat **rein informativen, deskriptiven und
edukativen Zweck**. Die App **gibt nicht**:

- Personalisierte Anlageberatung
- Vorschläge zu konkreten Instrumenten oder Operationen
- Urteile zu Eignung für Vermögensverhältnisse / Ziele / Risikotoleranz
- Auftragsausführung oder Broker-Verbindungen
- Verwahrung von Geldern oder Instrumenten

## 2. Normative Bezüge

- **Art. 1.5-septies TUF**: Definition "consulenza in materia di
  investimenti". App **erfüllt nicht**.
- **Art. 18-bis und 18-ter TUF**: Vorbehalt für OCF-Eingetragene.
  PluriFin/Filippo Salemi **nicht eingetragen**.
- **Art. 1.5.d TUF**: Portfolioverwaltung. App **verwaltet nicht**.
- **MiFID II und MiFIR**: keine reservierten Dienstleistungen.
- **Verordnung (EU) 2017/565**: keine Eignungs-/Angemessenheitsprüfung.

## 3. KI-Analysen -- spezifische Warnungen

### 3.1 Probabilistisches Modell

LLMs erzeugen Text **probabilistisch**. Gleiche Frage -> verschiedene
Antworten.

### 3.2 Halluzinationen

Können **falsche aber plausible Aussagen** zu Instrumentennamen, ISINs,
historischer Performance, Dividenden, Steuerregeln, Indexzusammensetzung,
Ex-Dividende-Daten produzieren. **Immer mit offiziellen Quellen
prüfen**.

### 3.3 Wissens-Cutoff

Modell kennt keine Ereignisse nach seinem Cutoff-Datum.

### 3.4 Keine personalisierten Empfehlungen

Auch wenn Prompt das Portfolio enthält, sind KI-Antworten **keine
personalisierte Beratung**: Modell kennt keine Vermögenslage, Einkommen,
Liquidität, Horizont, Risikotoleranz, Steuersituation, Rentenziele.

### 3.5 Kein "Know Your Customer"

App erhebt kein Risikoprofil. Nicht der MiFID-II-Eignungs-/Angemessenheits-
prüfung unterworfen.

## 4. Rebalancing-Vorschläge

Arithmetische Berechnungen auf nutzerdefinierten Parametern. **Keine**
Kauf-/Verkaufsempfehlungen. App bewertet nicht: Markt-Timing,
Steuerwirkung, Transaktionskosten, Liquidität, Konzentration. Konsultieren
Sie **autorisierten Finanzberater**.

## 5. Marktdaten

Daten aus öffentlichen Quellen oder EODHD/FMP (Nutzer-Schlüssel). Mögliche
Verzögerungen 15-20 Min., Fehler bei Splits/Dividenden/Ticker-Änderungen.
PluriFin ohne Verantwortung.

## 6. Steuerberechnungen

App **berechnet keine** Steuern. Angezeigte Gewinne/Verluste sind
arithmetische Rohwerte ohne Berücksichtigung von: Besteuerung, bollo
titoli (IT), IVAFE, Abzügen, Holding-Period, UCITS/Non-UCITS-Behandlung,
Erbschaft. Konsultieren Sie **Steuerberater oder CAF**.

## 7. Auslandsmärkte und Währungen

Berücksichtigen: Wechselkursrisiko, Konvertierungskosten,
Doppelbesteuerung (W-8BEN USA), Auslandsmeldungen, Steuerresidenz. App
**modelliert keine**.

## 8. Persönliche Sicherheit

- API-Schlüssel im OS-Keystore -> zugänglich bei entsperrtem Gerät
- Verlorenes Gerät gesperrt: geschützt; entsperrt: Daten exponiert
- Google-Drive-Backups standardmäßig deaktiviert

PluriFin haftet nicht für: Diebstahl/Verlust mit Entsperrung, falsche
Lock-Konfiguration, Geräte-Kompromittierung, Schlüsselteilung,
manuellen Export und unkontrollierte Verteilung.

## 9. Normative Updates

Steuer- und regulatorische Regeln **ändern sich häufig**. App garantiert
keine Aktualität. Nutzer prüft jeweils geltende Regelung.

## 10. Nutzerentscheidungen -- Haftungsfreistellung

Nutzer erklärt und akzeptiert:

1. Nutzung von App, Daten, Analysen auf seine Initiative und Risiko
2. Anlageentscheidungen sind **ausschließlich seine**
3. PluriFin haftet nicht, in gesetzlichen Grenzen, für Verluste oder
   Steuerfolgen
4. Für wichtige Entscheidungen konsultiert Nutzer **autorisierten
   Finanzberater** (OCF: <https://www.organismocf.it> oder nationales
   Äquivalent)

## 11. Minderjährige

App **nicht für unter 18-Jährige**. Content Rating Play "Everyone /
18+". Eltern/Erziehungsberechtigte verantwortlich.

## 12. Geolokation

App für italienischen Markt und Eurozone. Nutzer außerhalb prüfen lokale
Konformität. PluriFin haftet nicht für abweichende Auslegungen.

## 13. Ausdrückliche Annahme

Mit Annahme dieses Disclaimers beim ersten Start (oder nach Versions-
Bump) erklärt Nutzer, gelesen, verstanden zu haben und PluriFin/Filippo
Salemi in gesetzlichen Grenzen freizustellen.

Annahme aufgezeichnet in verschlüsseltem `consent_box` (UTC-Timestamp,
Version, SHA-256-Hash).

Ohne Annahme: Rebalancing, KI, Import gesperrt; nur Lesen rechtlicher
Texte und Einstellungen.

## 14. Gerichtsstand

Italienisches Recht. Streitigkeiten: siehe ToS.

## 15. Kontakte

`plurifin.app+legal@gmail.com`. PluriFin **gibt keine Finanzberatung per
E-Mail**. Dafür autorisierter Berater (OCF oder Äquivalent).
