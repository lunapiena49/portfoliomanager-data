---
title: "Fünf Fragen an eine App, bevor man ihr das Portfolio anvertraut"
summary: "Wo die Daten landen, wie die Depotauszüge hineinkommen, wer die Fragen an die künstliche Intelligenz liest, was die App nicht tut und was sie kostet. Mit den Antworten von Portfolio Manager."
publishedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redaktion"
lang: "de"
tags: ["portfolio-tracker", "geldanlage", "ratgeber", "datenschutz"]
draft: false
---

Wer ein Portfolio, das über mehrere Broker verteilt ist, in einer Tabellenkalkulation führt, schreibt von Hand ab, was jeder Depotauszug auf seine Art sagt. Wer dessen müde wird, sucht eine App, und bevor die Depotauszüge dort landen, lohnen fünf Fragen an sie. Unter jeder steht die Antwort von Portfolio Manager, der App von PluriFin Finance: Wer liest, kann sie an der Web-Demo und an der Datenschutzerklärung überprüfen und von den anderen dieselbe Klarheit verlangen.

## 1. Wo die Daten landen

Drei Antworten sind möglich:

- **Auf den Servern des App-Herstellers**: bequem für alle, die mehrere Geräte nutzen, aber das Portfolio wohnt in einem fremden Haus
- **Auf dem Gerät, unverschlüsselt**: So ist es bei der Tabellenkalkulation, lesbar für jedes Programm, das Zugriff auf die Dateien hat
- **Auf dem Gerät, verschlüsselt**: Der Schlüssel entsteht auf dem Telefon und bleibt dort

Portfolio Manager gehört zur dritten. Portfolios, Positionen und Ziele bleiben auf dem Telefon, verschlüsselt mit AES-256; den Schlüssel verwahrt das Betriebssystem. PluriFin hat kein Archiv, in dem sie liegen könnten, und verlangt kein Nutzerkonto. Die Ausnahme ist die Web-Demo, und sie sagt es selbst: Ihre Daten bleiben im Browser, unverschlüsselt.

Eine kostenlose App, die Portfolios auf eigenen Servern speichert, hat Kosten zu decken. Die nächste Frage lautet, womit sie das tut.

## 2. Wie die Depotauszüge hineinkommen

Es gibt zwei Wege: der App die Zugangsdaten des Brokers überlassen oder die Dateien importieren, die der Broker exportiert. Portfolio Manager kennt nur den zweiten: Die App verbindet sich nicht mit den Depots und führt keine Orders aus.

Die App liest die CSV-Dateien von elf Brokern: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (heute Teil von Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB und Revolut. Für alle anderen gibt es einen allgemeinen CSV-Leser, dem das Symbol des Titels und eine der Spalten Stückzahl, Wert oder Kurs genügen. Auch PDF-Dateien nimmt die App an und versucht, die Tabelle daraus zu lesen.

Jede App sollte man fragen, ob sich der Import des eigenen Depotauszugs vor dem Bezahlen ausprobieren lässt. Bei Portfolio Manager ja: Die sieben Tage Testphase haben alle Funktionen und verlangen keine Kreditkarte. In der Web-Demo nein: Dort werden Positionen von Hand eingegeben, höchstens fünf.

## 3. Wer die Fragen an die künstliche Intelligenz liest

Soll ein Modell eine Analyse des Portfolios schreiben, muss das Portfolio an den Betreiber des Modells gehen. Es lohnt sich zu wissen, über welche Server es läuft und wer es speichert.

Bei Portfolio Manager ist die Analyse freiwillig und nutzt Google Gemini, mit einem Schlüssel, den Nutzer selbst eintragen. Die Frage und die Zusammensetzung des Portfolios (Titel, Stückzahlen, Durchschnittskurse) gehen vom Telefon an Google, ohne über PluriFin zu laufen; das Unternehmen speichert sie nicht. Dasselbe gilt für die Echtzeitkurse: Die Symbole der Titel gehen an den Anbieter, den die Nutzer wählen.

## 4. Was die App nicht tut

Portfolio Manager führt keine Orders aus und ist kein Broker. Die Analysen der künstlichen Intelligenz sind Anregungen, die ein Modell erzeugt: Sie sind keine individuelle Finanzberatung und können Fehler enthalten.

Steuern berechnet die App ebenfalls nicht. Die angezeigten Gewinne und Verluste sind reine Arithmetik: aktueller Kurs minus Durchschnittskurs, mal Stückzahl. Sie berücksichtigen weder die Besteuerung von Kursgewinnen noch die italienische Stempelsteuer auf Wertpapiere noch die Verrechnung von Verlusten. Für die Steuererklärung verweist der Finanz-Disclaimer der App an eine Steuerberatung oder an ein zugelassenes CAF, ein italienisches Steuerbeistandszentrum.

Wer die Daten woandershin mitnehmen will, nutzt „Meine Daten exportieren“: Die Funktion erzeugt eine JSON-Datei mit dem gesamten Inhalt.

## 5. Was es kostet, und was passiert, wenn man aufhört zu zahlen

Das Laster der Branche ist die Testphase, die nach der Karte fragt, und das Abo, das von selbst losläuft, wenn niemand hinsieht. Bei Portfolio Manager dauert die Testphase sieben Tage und kennt die Karte ihrer Nutzer nicht: Wenn sie endet, startet keine Abbuchung von selbst.

Danach gibt es vier Tarife, für alle dieselben, von 4,99 Euro im Jahr bis 49,99 Euro einmalig für die Familie. Kein Tarif enthält Werbung. Verlängerung, Kündigung und Erstattung stehen auf der Seite [Preise](/de/pricing).

Nach der Testphase bleibt eine kostenlose Version. Positionen werden von Hand eingegeben, Rebalancing und Marktdaten laufen weiter; der Import von den Brokern, die Ziele und die künstliche Intelligenz ruhen, bis ein Tarif gewählt ist. In jedem Fall bleiben die Daten auf dem Telefon und lassen sich exportieren.

## Womit anfangen

Die [Web-Demo](/app/) öffnet sich im Browser, ohne dass etwas installiert wird, und nennt ihre Grenzen: fünf von Hand eingegebene Positionen, kein Import, keine Ziele und keine künstliche Intelligenz. Wer bei der Tabellenkalkulation bleibt, kann die fünf Fragen mitnehmen: Sie gelten für jede App.

*Der Artikel erschien am 3. Mai 2026 auf Italienisch und wurde am 11. November 2026 nach heutigem Stand der Fakten neu geschrieben; dies ist seine deutsche Fassung vom selben Tag. Portfolio Manager ist ein Informationswerkzeug: Seine Inhalte sind keine Finanz-, Steuer- oder Rechtsberatung.*
