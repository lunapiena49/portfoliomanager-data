---
title: "Portfolio Manager ist auf drei Verboten gebaut"
summary: "Kein Archiv der Portfolios, keine Anbindung an die Depots, keine künstliche Intelligenz ohne den Schlüssel derer, die sie nutzen. Daraus folgt die Preisliste mit vier Zeilen."
publishedAt: 2026-05-07
updatedAt: 2026-11-11
author:
  name: "PluriFin"
  role: "Redaktion"
lang: de
tags: ["portfolio-manager", "datenschutz", "preise"]
---

Finanz-Apps stellen sich mit der Liste dessen vor, was sie können. Portfolio Manager, die App von PluriFin Finance, versteht man schneller über das, was sie nicht kann. Sie hat kein Archiv für Portfolios, sie verbindet sich nicht mit den Depots, und sie nutzt keine künstliche Intelligenz ohne einen Schlüssel ihrer Nutzer. Das sind drei Verbote, und die Preisliste mit vier Zeilen ist ihre Folge.

## Erstes Verbot: kein Archiv der Portfolios

Das Portfolio bleibt auf dem Telefon der Person, der es gehört, verschlüsselt mit AES-256; den Schlüssel verwahrt das Betriebssystem. PluriFin speichert keine Portfolios und verlangt kein Nutzerkonto. Um Testphase und Abo zu prüfen, genügen dem Unternehmen ein anonymer Geräte-Fingerabdruck und der Kaufbeleg.

Eine kostenlose Finanz-App, die Portfolios auf eigenen Servern speichert, hat Kosten zu decken. Vor der Installation lohnt die Frage, womit sie das tut.

Zwei Dinge gehören vollständig dazugesagt. Die Web-Demo hält ihre Daten im Browser, unverschlüsselt: Sie ist dazu da, die App kennenzulernen, nicht dazu, ein echtes Portfolio zu verwahren. Absturzberichte (Firebase Crashlytics) gehen nur hinaus, wenn Nutzer die Diagnose in den Einstellungen einschalten, und sie enthalten keine Portfoliodaten.

Der Ausgang ist ebenso vorgesehen wie der Eingang: „Meine Daten exportieren“ erzeugt eine JSON-Datei mit dem gesamten Inhalt, „Alle Daten löschen“ entfernt ihn vom Telefon.

## Zweites Verbot: keine Anbindung an die Depots

Die App fragt nicht nach den Zugangsdaten eines Brokers und führt keine Orders aus. Die Daten kommen hinein, weil ihre Besitzer sie selbst bringen, Datei für Datei. Portfolio Manager erkennt die CSV-Dateien von elf Brokern, zeigt in einer Vorschau die Zeilen, die zu korrigieren sind, und behandelt Dubletten vor dem Speichern. Für die übrigen Broker gibt es einen allgemeinen CSV-Leser, und aus PDF-Dateien versucht die App, die Tabelle zu lesen.

Das ist langsamer als eine automatische Anbindung. Es ist auch der Grund, warum niemand PluriFin die Zugangsdaten der eigenen Bank überlassen muss.

## Drittes Verbot: künstliche Intelligenz nur mit dem Schlüssel der Nutzer

Die Analyse mit künstlicher Intelligenz ist freiwillig. Sie nutzt Google Gemini mit einem Schlüssel, den Nutzer selbst eintragen und den das Betriebssystem des Telefons verwahrt. Wer sie einschaltet, schickt Google die Frage und die Zusammensetzung des Portfolios: Titel, Stückzahlen, Durchschnittskurse. Die Anfrage geht vom Telefon aus und läuft nicht über PluriFin; das Unternehmen speichert sie nicht.

Die Antworten sind Anregungen, die ein Modell erzeugt, keine individuelle Finanzberatung, und sie können Fehler enthalten. Die Entscheidungen bleiben bei denen, die investieren.

## Die Preisliste, die daraus folgt

Ein Unternehmen, das keine Portfolios speichert, zahlt nicht fürs Speichern, und eines, das keine Werbung zeigt, hat keine Anzeigenkunden zufriedenzustellen. Übrig bleibt eine App mit ihrem Preis: sieben Tage Testphase ohne Kreditkarte, danach vier Tarife, für alle dieselben, von 4,99 Euro im Jahr bis 49,99 Euro einmalig für die Familie.

Nach der Testphase bleibt eine kostenlose Version. Positionen werden von Hand eingegeben, Rebalancing und Marktdaten laufen weiter; der Import von den Brokern, die Ziele und die künstliche Intelligenz ruhen, bis ein Tarif gewählt ist. Die vollständige Preisliste mit Verlängerungen und Erstattungen steht auf der Seite [Preise](/de/pricing).

## Wo sich nachprüfen lässt, was hier steht

Der Code dieser Website und der Feed der Marktdaten sind öffentlich, im Repository [portfoliomanager-data](https://github.com/lunapiena49/portfoliomanager-data). Was die App mit den Daten macht, steht Punkt für Punkt in der [Datenschutzerklärung](/de/privacy), in sechs Sprachen. Die [Web-Demo](/app/) öffnet sich im Browser, ohne dass etwas installiert wird.

*Artikel vom 7. Mai 2026, am 11. November 2026 nach heutigem Stand der Fakten neu geschrieben.*
