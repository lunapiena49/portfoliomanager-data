import type { Testi } from '../testi';

/* TEDESCO (de, Germania): la resa della voce di `it.ts`, non la sua traduzione
 * parola per parola.
 *
 * File di LOCALIZZAZIONE: UTF-8, virgolette tedesche vere, spazio non
 * separabile prima di euro e di percento.
 *
 * LA VOCE e' quella descritta in testa a `it.ts`: ossatura da cronista, satira
 * sui vizi del settore (mai sugli utenti, mai su un concorrente per nome),
 * tono piano su dati e soldi, slancio da studio per il gioco. Terza persona,
 * senza "du" e senza "Sie": PluriFin e' "das Unternehmen" o "das Haus",
 * Filippo Salemi e' "Gruender und CEO". Nessun virgolettato gli e' attribuito.
 *
 * I FATTI sono quelli di `it.ts` (fonte: storico/harness/S384/SITO_A_FATTI.md):
 * qui non se ne aggiungono e non se ne tolgono. Google Play segue la stessa
 * regola dell'italiano (integrations/testi.test.mjs).
 *
 * Il lessico segue cio' che l'utente tedesco trova nei prodotti:
 *  - l'app (assets/translations/de.json): Portfolio, Markt, Rebalancing,
 *    Analyse, Ziele, "Meine Daten exportieren", "Alle Daten loeschen";
 *  - il gioco (rollquest/localization/strings/de.json): Koenig Corvax,
 *    Astraliten, Truhe, Etage, Aufstieg, Gipfel;
 *  - il marchio (company/BRAND_GUIDELINES.md): "Spiele, die zuenden".
 * Scelte di resa: estratto conto = Depotauszug, piano = Tarif, divisione =
 * Sparte, tetto = Obergrenze, la casa = das Haus, Notizie = Neues.
 */
const de: Testi = {
  lingua: 'de',

  comune: {
    salta: 'Zum Text',
    navEtichetta: 'Rubriken',
    nav: { finance: 'Finance', games: 'Games', casa: 'Das Haus', notizie: 'Neues' },
    lingua: 'Sprache',
    azioni: {
      demo: 'Web-Demo öffnen',
      play: 'Bei Google Play laden',
      prezzi: 'Die ganze Preisliste lesen',
      finance: 'Alles über Portfolio Manager',
      games: 'Alles über ROLLQUEST',
      notizie: 'Neues von der Baustelle lesen',
      scrivi: 'PluriFin schreiben',
    },
    avvisoFinance:
      'Portfolio Manager ist ein Informationswerkzeug: Die App führt keine Orders aus. Die Analyse mit künstlicher Intelligenz liefert Anregungen, die ein Modell erzeugt, keine individuelle Finanzberatung.',
    avvisoFinanceLungo:
      'Portfolio Manager ist ein Informationswerkzeug. Die gezeigten Inhalte und Analysen, auch die von künstlicher Intelligenz erzeugten, sind keine Finanz-, Steuer- oder Rechtsberatung im Sinne des italienischen Finanzmarktgesetzes Testo unico della finanza (D.Lgs. 58/1998) oder vergleichbarer Vorschriften. PluriFin verwaltet kein Kapital und führt keine Orders aus. Anlageentscheidungen trifft man gemeinsam mit einer zugelassenen Fachperson.',
    datiEsempio: 'Beispieldaten.',
    colophon: {
      riga: 'Filippo Salemi hat PluriFin in Italien gegründet und führt das Haus.',
      stampa: 'Presse',
      informazioni: 'Anfragen',
      privacy: 'Datenschutz',
      giochi: 'Games',
      lingue: 'Sprachen',
      pagine: 'Seiten',
      legali: 'Rechtliches',
      voci: {
        prezzi: 'Preise',
        domande: 'Häufige Fragen',
        contatti: 'Kontakt',
        stampa: 'Presse',
        informativa: 'Datenschutzerklärung',
        termini: 'Nutzungsbedingungen',
        avvertenza: 'Finanz-Disclaimer',
        dmca: 'DMCA',
        codice: 'Code der Website und Marktdaten',
      },
      diritti: '© 2026 PluriFin',
    },
  },

  /* ============================ DIE TITELSEITE ============================ */
  home: {
    meta: {
      titolo: 'PluriFin: tagsüber die Bücher, nachts die Würfel',
      descrizione:
        'PluriFin ist das italienische Unternehmen, das Filippo Salemi gegründet hat. Portfolio Manager führt die Depotauszüge von elf Brokern in einem einzigen Portfolio zusammen; ROLLQUEST ist das Brettspiel, in dem man einen Turm Wurf für Wurf erklimmt.',
    },
    occhiello: 'Italien, zwei Sparten unter einem Namen',
    titolo: 'PluriFin führt tagsüber Buch und würfelt nachts',
    sommario:
      'Das Unternehmen, das Filippo Salemi gegründet hat und führt, geht zwei Metiers nach, die kein Wort miteinander wechseln. Tagsüber führt Portfolio Manager die Depotauszüge von elf Brokern in einem einzigen Portfolio zusammen und belässt es auf dem Telefon der Person, der es gehört. Nachts baut ROLLQUEST einen Turm, den man Wurf für Wurf erklimmt. Für beide gilt dieselbe Regel: nie gegen die verdienen, die sie nutzen.',
    casa: {
      titolo: 'Ein Haus, zwei Metiers, eine Regel',
      paragrafi: [
        'PluriFin kommt aus Italien. Filippo Salemi, Gründer und CEO, führt das Haus und hat es in zwei Sparten geteilt: Finance baut Werkzeuge für alle, die ihr Erspartes selbst verwalten, Games baut Spiele. Die beiden Sparten leihen einander nicht einmal die Wörter: In die Texte von Finance kommt kein Spielvokabular, in die von Games kein Finanzvokabular.',
        'Gemeinsam haben sie eine Regel: Verdient wird nie gegen das Interesse derer, die die Produkte nutzen. In der Branche ist das weniger selbstverständlich, als es klingt. Es gibt Finanz-Apps, die nichts kosten, weil die Ware das Portfolio derer ist, die sie installieren. Und es gibt Gratisspiele ohne Obergrenze für die Ausgaben, bei denen die Rechnung erst am Monatsende auffällt. PluriFin nennt den Preis vorher, setzt den Ausgaben im Spiel eine Obergrenze und verkauft nichts über die weiter, die bei ihm kaufen.',
        'Jedes Produkt erscheint in sechs Sprachen zugleich: Italienisch, Englisch, Spanisch, Französisch, Deutsch und Portugiesisch.',
      ],
    },
    finance: {
      rubrica: 'Finance, Portfolio Manager',
      titolo: 'Elf Depotauszüge, ein Portfolio',
      passi: [
        [
          'Wer über mehrere Broker investiert, bekommt von jedem einen Depotauszug im hauseigenen Format: Spalten in anderer Reihenfolge, Datumsangaben verkehrt herum, Währungen stillschweigend vorausgesetzt. Elf Broker, elf Arten, dasselbe zu sagen.',
          'Portfolio Manager liest die CSV-Dateien von elf Brokern, von Interactive Brokers bis DEGIRO, von Fidelity bis Revolut, und führt sie in einem einzigen Portfolio zusammen. Für alle anderen gibt es einen allgemeinen CSV-Leser. Auch PDF-Dateien nimmt die App an und versucht, die Tabelle daraus zu lesen.',
        ],
        [
          'Das Portfolio bleibt auf dem Telefon, verschlüsselt mit AES-256. PluriFin hat kein Archiv, in dem es liegen könnte, und verlangt kein Nutzerkonto: Wo nichts lagert, gibt es nichts zu stehlen.',
          'Bei PluriFin kommt das Portfolio nie an. Um Testphase und Abo zu prüfen, genügen ein anonymer Geräte-Fingerabdruck und der Kaufbeleg. Die Analyse mit künstlicher Intelligenz ist freiwillig: Wer sie einschaltet, schickt die Frage und die Zusammensetzung des Portfolios an Google Gemini, mit einem selbst eingetragenen Schlüssel.',
        ],
        [
          'Die Preisliste hat vier Zeilen. Nach sieben Tagen Testphase ohne Kreditkarte wird gewählt: ein Jahresabo oder eine einzige Zahlung, für immer. Der Familientarif gilt für die Person, die kauft, und für bis zu fünf Mitglieder ihrer Google-Familiengruppe.',
          'Kein Tarif enthält Werbung: Das Produkt ist die App, nicht wer sie nutzt.',
        ],
      ],
      listinoTitolo: 'Preisliste von Portfolio Manager',
      listinoNota: 'Preise in Euro für den italienischen Markt, inklusive Mehrwertsteuer, wo sie anfällt.',
      colonne: { piano: 'Tarif', prezzo: 'Preis' },
      palco: {
        testa: 'Portfolio',
        valuta: 'EUR',
        totale: 'Gesamt',
        sigillo: 'Verschlüsselt, im Telefon',
      },
    },
    mercato: {
      titolo: 'Vom Kurszettel',
      nota: 'Die drei größten Gewinner und die drei größten Verlierer des Tages aus dem öffentlichen Datenfeed, den auch die App lädt. Der Feed führt Titel mit mindestens 20 Millionen Dollar Tagesumsatz und verwirft Kursänderungen über 25 %. Schlusskurse, Quelle EODHD, jede Nacht neu erzeugt. Das ist ein Kurszettel, keine Empfehlung.',
      colonne: { titolo: 'Titel', chiusura: 'Schluss', variazione: 'Änderung' },
      rialzi: 'Gewinner',
      ribassi: 'Verlierer',
      seduta: 'Wall Street, Handelstag vom',
    },
    imbrunire: 'Ernsthafte Werkzeuge, und Spiele, die zünden.',
    games: {
      rubrica: 'Games, in Entwicklung',
      titolo: 'ROLLQUEST: Den Turm erklimmt man Wurf für Wurf',
      passi: [
        [
          'ROLLQUEST ist ein digitales Brettspiel für Android. Man würfelt, und Rollo, ein Ritter, rund und stur, zieht über einen Ring aus vierzehn Feldern um den Turm von König Corvax, dem Raben und Hexenmeister, der die Sterne gestohlen hat.',
          'Die Felder sind nicht alle gleich: Auf einem wird gekämpft, ein anderes verbirgt eine Truhe, ein weiteres bietet einen Talisman zur Wahl aus drei Karten, und manches ist verbrannt und gibt nichts her. Ist die Runde geschlossen, geht es eine Etage höher.',
        ],
        [
          'Wer nichts ausgibt, spielt jeden Inhalt durch. Kaufen lassen sich Komfort, Optik und Astraliten, bis zu einer Obergrenze von 20 Euro im Monat: Wer kauft, kommt früher an, aber nirgends hin, wo die anderen nicht auch hinkommen.',
          'Im Klartext: Astraliten sind die Währung des Spiels und bezahlen auch Truhen mit zufälligem Inhalt, deshalb trägt das Spiel die Alterskennzeichnung 16+. Das Laster der Branche ist das Spiel ohne Obergrenze, bei dem die Rechnung erst am Monatsende auffällt. PluriFin schreibt seine Obergrenze hierhin, wo sie dem Haus jeder vorhalten kann.',
        ],
        [
          'Die Welt ist ein dunkles, illustriertes Märchen: Stein, Buntglas, Laternenlicht, und nie das Grauen. Rollo, die Gegner, der Turm und die Würfel sind Originale, gezeichnet für dieses Spiel, das in sechs Sprachen erscheinen wird.',
          'Das Studio ist klein, der Ehrgeiz nicht. ROLLQUEST ist in Entwicklung und hat keinen Termin: PluriFin nennt ihn, sobald es etwas zu spielen gibt.',
        ],
      ],
      palco: { ascesa: 'Aufstieg', cima: 'Am Gipfel' },
    },
  },

  /* ============================ PORTFOLIO MANAGER ============================ */
  finance: {
    meta: {
      titolo: 'Portfolio Manager: elf Broker, ein Portfolio',
      descrizione:
        'Portfolio Manager liest die Depotauszüge von elf Brokern und führt sie in einem verschlüsselten Portfolio auf dem Telefon zusammen. Ohne Nutzerkonto, ohne Werbung, mit sieben Tagen Testphase.',
    },
    occhiello: 'PluriFin Finance',
    titolo: 'Portfolio Manager führt zusammen, was die Broker getrennt halten',
    sommario:
      'Die App von PluriFin liest die Depotauszüge von elf Brokern und führt sie in einem einzigen Portfolio zusammen, verschlüsselt auf dem Telefon der Person, der es gehört. Sie verlangt kein Nutzerkonto und zeigt keine Werbung. Das Unternehmen dahinter weiß nicht, wie viel seine Nutzer besitzen, und hat dafür gesorgt, dass es das auch nicht wissen kann.',
    capitoli: [
      {
        id: 'import',
        titolo: 'Elf Formate, eine Tabelle',
        paragrafi: [
          'Jeder Broker exportiert die Positionen auf seine Art. Portfolio Manager erkennt das CSV-Format von elf Brokern, zeigt in einer Vorschau die Zeilen, die zu korrigieren sind, und behandelt Dubletten vor dem Speichern. Auch PDF-Dateien nimmt die App an und versucht, die Tabelle daraus zu lesen.',
          'Die App verbindet sich nie mit dem Depot und führt keine Orders aus: Die Daten kommen hinein, weil ihre Besitzer sie selbst bringen, Datei für Datei. Das ist langsamer als eine automatische Anbindung, und es ist der Grund, warum niemand PluriFin die Zugangsdaten der eigenen Bank überlassen muss.',
        ],
      },
      {
        id: 'portafoglio',
        titolo: 'Was man sieht, sobald die Depots vereint sind',
        paragrafi: [
          'Sind die Depots vereint, zeigt die App das ganze Portfolio in einer einzigen Währung, die Aufteilung nach Anlageklassen sowie Gewinn und Verlust jeder Position. Die Ziele sagen, wie viel bis zur Zielmarke fehlt und wie viel jeden Monat einzuzahlen ist; das Rebalancing schlägt vor, wie man zu den festgelegten Anteilen zurückkehrt.',
          'Die Analyse mit künstlicher Intelligenz ist freiwillig und nutzt Google Gemini, mit einem Schlüssel, den Nutzer selbst eintragen. Wer sie einschaltet, schickt Google die Frage und die Zusammensetzung des Portfolios: Titel, Stückzahlen, Durchschnittskurse. Die Antworten sind Anregungen, die ein Modell erzeugt, keine individuelle Beratung, und sie können Fehler enthalten: Die Entscheidungen bleiben bei denen, die investieren.',
        ],
      },
    ],
    broker: {
      titolo: 'Diese Broker liest die App selbst',
      generico:
        'Für jeden anderen Broker gibt es einen allgemeinen CSV-Leser: Er findet die Kopfzeile selbst, und ihm genügen das Symbol des Titels und eine der Spalten Stückzahl, Wert oder Kurs.',
    },
    dati: {
      titolo: 'Wo die Daten liegen, Punkt für Punkt',
      premessa:
        'Datenschutzerklärungen stehen im Ruf, so geschrieben zu sein, dass niemand sie liest. Dies ist die Kurzfassung. Wo sie weniger sagt als die lange, gilt die lange: Sie ist das rechtlich maßgebliche Dokument.',
      voci: [
        {
          termine: 'Auf dem Telefon',
          descrizione:
            'Portfolios, Positionen und Ziele, verschlüsselt mit AES-256. Den Schlüssel verwahrt das Betriebssystem, ebenso die API-Schlüssel, die Nutzer eintragen. Unverschlüsselt bleiben einige technische Einstellungen, zum Beispiel die Einwilligung in die Diagnose.',
        },
        {
          termine: 'In keinem Archiv von PluriFin',
          descrizione: 'Das Unternehmen speichert keine Portfolios und verlangt kein Nutzerkonto.',
        },
        {
          termine: 'An PluriFin',
          descrizione:
            'Das Portfolio: nie. Um die siebentägige Testphase und das Abo zu prüfen, genügen ein anonymer Geräte-Fingerabdruck und der Kaufbeleg.',
        },
        {
          termine: 'An Dritte, nur wenn Nutzer es einschalten',
          descrizione:
            'Ist die künstliche Intelligenz eingeschaltet, gehen die Frage und die Zusammensetzung des Portfolios (Titel, Stückzahlen, Durchschnittskurse) an Google Gemini. Sind die Echtzeitkurse eingeschaltet, gehen die Symbole der Titel an den gewählten Anbieter. In beiden Fällen geht die Anfrage vom Telefon aus und läuft nicht über PluriFin.',
        },
        {
          termine: 'An die Website-Hoster',
          descrizione:
            'Den öffentlichen Kurszettel lädt die App von plurifin.app. GitHub und Cloudflare, die die Website hosten, sehen dabei die IP-Adresse der Anfrage, wie bei jeder Webseite.',
        },
        {
          termine: 'Diagnose',
          descrizione:
            'Absturzberichte (Firebase Crashlytics, nur auf Android) gehen nur hinaus, wenn Nutzer die Diagnose in den Einstellungen einschalten. Solange sie aus ist, wird nichts übertragen: Berichte, die in der Zwischenzeit entstehen, bleiben auf dem Telefon und gehen erst hinaus, falls und sobald die Diagnose eingeschaltet wird. Sie enthalten weder Portfoliodaten noch Schlüssel, und wer die App deinstalliert, löscht sie.',
        },
        {
          termine: 'Werbung und Tracking',
          descrizione: 'Keine Werbung. In der App steckt kein Analytics-SDK.',
        },
        {
          termine: 'Ausgang',
          descrizione:
            '„Meine Daten exportieren“ erzeugt eine JSON-Datei mit dem gesamten Inhalt; „Alle Daten löschen“ entfernt ihn vom Telefon.',
        },
      ],
      chiusa: 'Der vollständige Text steht in der Datenschutzerklärung, in sechs Sprachen.',
    },
    prezzi: {
      titolo: 'Was es kostet',
      testo:
        'Sieben Tage Testphase ohne Kreditkarte. Danach vier Tarife, für alle dieselben: von 4,99 € im Jahr bis 49,99 € einmalig für die Familie. Keine Werbung, in keinem Tarif.',
    },
    provare: {
      titolo: 'Erst testen, dann vertrauen',
      demo: 'Die Web-Demo öffnet sich im Browser, ohne dass etwas installiert wird. Ihre Grenzen sind benannt: fünf von Hand eingegebene Positionen, kein Import, keine Ziele und keine künstliche Intelligenz. Ihre Daten bleiben im Browser, unverschlüsselt: Die Demo ist dazu da, die App kennenzulernen, nicht dazu, ein echtes Portfolio zu verwahren.',
      suPlay: 'Die ganze App gibt es bei Google Play.',
    },
    palco: {
      titolo: 'Die Ansichten der App',
      schermate: [
        {
          termine: 'Portfolio',
          descrizione:
            'Ansicht der App: der Gesamtwert des Portfolios, der Gesamtgewinn und die Karte der Positionen, ein Feld je Titel.',
        },
        {
          termine: 'Markt',
          descrizione:
            'Ansicht der App: der Marktüberblick und die aktuellen Kurse der Positionen im Portfolio.',
        },
        {
          termine: 'Rebalancing',
          descrizione:
            'Ansicht der App: die Zielanteile, der Wert des Portfolios und das Ergebnis des Rebalancings.',
        },
        {
          termine: 'Analyse',
          descrizione:
            'Ansicht der App: die Schnellanalysen, die Kennzahlen des Portfolios und der Hinweis, dass die Inhalte keine Finanzberatung sind.',
        },
      ],
    },
  },

  /* ================================ ROLLQUEST ================================ */
  games: {
    meta: {
      titolo: 'ROLLQUEST: Den Turm erklimmt man Wurf für Wurf',
      descrizione:
        'ROLLQUEST ist das digitale Brettspiel von PluriFin Games: ein Würfel, ein Ring aus vierzehn Feldern, ein Turm zum Erklimmen. In Entwicklung für Android, in sechs Sprachen.',
    },
    occhiello: 'PluriFin Games, in Entwicklung',
    titolo: 'ROLLQUEST bringt das Brettspiel auf die Spitze eines Turms',
    sommario:
      'Ein Würfel, ein Ring aus vierzehn Feldern und ein Turm, den man Etage für Etage erklimmt. Das Spiel von PluriFin ist in Entwicklung für Android, in sechs Sprachen. Fürs Geld hat es eine geschriebene Regel mit einer Obergrenze für die Ausgaben: Sie steht vollständig im Kapitel, das ihren Namen trägt.',
    capitoli: [
      {
        id: 'gioco',
        titolo: 'So wird gespielt',
        paragrafi: [
          'Man würfelt, und Rollo zieht über den Ring. Das Feld entscheidet, was geschieht: ein Kampf, eine Truhe, ein Talisman zur Wahl aus drei Karten oder gar nichts, wenn das Feld verbrannt ist. Mit der Beute wird der Held ausgerüstet, und ist die Runde geschlossen, geht es eine Etage höher. Zehn Etagen ergeben einen Aufstieg, und auf der letzten wartet ein Boss.',
          'Es ist ein Brettspiel, das sich zwei Gewohnheiten von den Videospielen abgeschaut hat: vom Roguelite die Partie, die neu beginnt und nie gleich wiederkehrt, vom Soulslike die Niederlage, die etwas lehrt. Eine Partie dauert zwei bis fünf Minuten; der Fortschritt des Helden geht von Partie zu Partie weiter.',
        ],
      },
      {
        id: 'storia',
        titolo: 'Die Geschichte, kurz erzählt',
        paragrafi: [
          'König Corvax, Rabe und Hexenmeister, hat das Reich der Sterne geplündert und die Sterne in seinem Turm eingeschlossen, der am Himmel schwebt. Rollo, ein Ritter, rund und stur, erklimmt ihn Etage für Etage, um sie zurückzuholen.',
          'Ihn begleiten Lumen, ein verzaubertes Glühwürmchen; Baffo, Dachs und Krämer; Bruna, Bärin und Schmiedin. Der Ton ist der eines dunklen, illustrierten Märchens: Architektur, Buntglas und Laternenlicht. Nie das Grauen, nie Blut.',
        ],
      },
      {
        id: 'soldi',
        titolo: 'Die Regel fürs Geld',
        paragrafi: [
          'Wer nichts ausgibt, spielt jeden Inhalt des Spiels durch. Das ist die Vorgabe, nach der PluriFin die Spielökonomie austariert: Jede Änderung wird mit einem Simulator an genau diesem Spieler geprüft, bevor sie bei den Spielern ankommt.',
          'Kaufen lassen sich Komfort, Optik und Astraliten, bis zu einer Obergrenze von 20 Euro im Monat: Wer kauft, kommt früher an, aber nirgends hin, wo die anderen nicht auch hinkommen. Im Klartext: Astraliten sind die Währung des Spiels und bezahlen alles, auch Truhen mit zufälligem Inhalt. Deshalb trägt das Spiel die Alterskennzeichnung 16+, während der Inhalt ein Märchen ohne Grauen und ohne Blut bleibt.',
          'Heute ist ROLLQUEST in Entwicklung und verkauft noch nichts. Das Laster der Branche ist das Spiel ohne Obergrenze, bei dem die Rechnung erst am Monatsende auffällt. Hier gibt es die Obergrenze, und sie steht auf dieser Seite, wo jeder sie PluriFin vorhalten kann.',
        ],
      },
      {
        id: 'mestiere',
        titolo: 'Woraus es gemacht ist',
        paragrafi: [
          'Rollo, die Gegner, die Bosse, der Würfel, das Spielbrett und die Oberfläche sind Originale, gezeichnet für dieses Spiel. Die Ausrüstung kann Werke Dritter enthalten, stets mit Lizenz und mit genannten Urhebern.',
          'Die Engine ist Unity. Die Zahlen der Spielökonomie laufen durch einen Simulator, bevor sie auf den Bildschirm kommen, denn in einem Brettspiel sind die Regeln sichtbar, und eine sichtbare Regel muss halten.',
        ],
      },
    ],
    stato: {
      titolo: 'Wo es steht',
      paragrafi: [
        'ROLLQUEST ist in Entwicklung. Einen Erscheinungstermin gibt es nicht, und PluriFin erfindet keinen, um eine Zeile zu füllen: Das Haus gibt ihn unter „Neues“ bekannt, sobald es etwas zu spielen gibt.',
        'Auf dieser Website gibt es keine Warteliste, in die man sich eintragen könnte. Das Spiel ist für Spieler ab sechzehn Jahren ausgewiesen und erscheint in sechs Sprachen: Italienisch, Englisch, Spanisch, Französisch, Deutsch und Portugiesisch.',
        'Das Studio ist klein und denkt groß: eine ganze Welt, ein Turm, der nicht beim ersten Boss endet, und der Anspruch, im selben Regal zu stehen wie Spiele, an denen hundert Leute gebaut haben.',
      ],
    },
    /* Corsia B2: la didascalia delle immagini della pagina. Fonte:
       strumenti/torre.mjs e src/assets/torre/PROVENIENZA.json. */
    immagini:
      'Der Turm auf dieser Seite besteht aus den Hintergründen des Spiels, fürs Web verkleinert. Die dunklen Fenster stammen nicht aus dem Spiel: Sie sind eine Fassung eigens für die Website, damit sie beim Aufstieg aufleuchten.',
  },

  /* ================================= DAS HAUS ================================= */
  casa: {
    meta: {
      titolo: 'Das Haus: Wer PluriFin führt, wie es arbeitet',
      descrizione:
        'PluriFin ist ein italienisches Unternehmen, gegründet und geführt von Filippo Salemi. Es hat zwei Sparten, Finance und Games, und eine Regel: nie gegen die verdienen, die seine Produkte nutzen.',
    },
    occhiello: 'Das Haus',
    titolo: 'PluriFin, zwei Sparten und nur eine Art zu verdienen',
    sommario:
      'Ein italienisches Unternehmen, gegründet und geführt von Filippo Salemi, das eine App für die privaten Finanzen und ein Brettspiel baut. Wenn es Geld verlangt, sagt es vorher, wie viel: eine Preisliste mit vier Zeilen für die App, eine Obergrenze von 20 Euro im Monat für das Spiel.',
    capitoli: [
      {
        id: 'fondatore',
        titolo: 'Wer es führt',
        paragrafi: [
          'Filippo Salemi ist Gründer und CEO von PluriFin. Er hat das Unternehmen auf zwei Sparten gestellt und auf eine Regel, die vor beiden kommt: nie gegen das Interesse derer verdienen, die die Produkte nutzen.',
          'Die Rechtsdokumente nennen den Anbieter der Produkte und den Verantwortlichen für die Datenverarbeitung beim Namen, und es ist dieselbe Person. Wer eine Frage hat, weiß, an wen sie geht.',
        ],
      },
      {
        id: 'divisioni',
        titolo: 'Die beiden Sparten',
        paragrafi: [
          'PluriFin Finance macht Portfolio Manager, die App, die die Depotauszüge von elf Brokern in einem einzigen Portfolio zusammenführt und es verschlüsselt auf dem Telefon hält.',
          'PluriFin Games macht ROLLQUEST, ein digitales Brettspiel für Android, in dem man einen Turm Wurf für Wurf erklimmt. Es ist in Entwicklung.',
          'Die beiden Sparten ähneln einander nicht und müssen es auch nicht. Gemeinsam ist ihnen die Methode: Gearbeitet wird, bis die Sache funktioniert, dann wird veröffentlicht.',
        ],
      },
      {
        id: 'metodo',
        titolo: 'Wie es arbeitet',
        paragrafi: [
          'Jedes Produkt erscheint in sechs Sprachen zugleich. Die Preise von Portfolio Manager stehen in einer einzigen Preisliste, und eine automatische Prüfung gleicht jede Seite, die sie wiederholt, mit dieser Liste ab, diese hier eingeschlossen.',
          'Der Code dieser Website und der Feed der Marktdaten sind öffentlich: Wer nachsehen will, wie sie gebaut sind, muss niemanden um Erlaubnis fragen.',
        ],
      },
    ],
    /* Aggiunta dalla corsia B3: la forma giuridica detta in chiaro. Fonti:
       assets/legal/de/privacy_policy.md sez. 1, terms_of_service.md sez. 1. */
    titolare: {
      titolo: 'Wer vor dem Gesetz einsteht',
      testo:
        'PluriFin ist die Marke, unter der Filippo Salemi seine Produkte veröffentlicht. In den Rechtsdokumenten, von der Datenschutzerklärung bis zu den Nutzungsbedingungen, ist er der Anbieter und Verantwortliche: eine natürliche Person in Italien, keine Gesellschaft.',
    },
    nonFa: {
      titolo: 'Was PluriFin nicht tut',
      voci: [
        'PluriFin verkauft keine Daten derer, die seine Produkte nutzen, und sammelt sie auch nicht, um es zu können.',
        'PluriFin zeigt keine Werbung, weder in Portfolio Manager noch auf dieser Website.',
        'Auf dieser Website gibt es nichts, wofür man sich anmelden könnte: keine Warteliste, keinen Newsletter.',
        'PluriFin kündigt keine Termine an, die es nicht halten kann.',
      ],
    },
    contatti: {
      titolo: 'An PluriFin schreiben',
      testo: 'Es antwortet ein Mensch.',
    },
  },

  /* ================================= PRESSE ================================= */
  stampa: {
    meta: {
      titolo: 'Presse: Fakten, fertige Texte und Kontakt',
      descrizione:
        'Überprüfbare Fakten zu PluriFin, Portfolio Manager und ROLLQUEST, zitierfertige Texte und der Pressekontakt.',
    },
    occhiello: 'Presse',
    titolo: 'Wer über PluriFin schreibt',
    sommario:
      'Fakten, die sich überprüfen lassen, zwei zitierfertige Texte und eine Adresse, unter der ein Mensch antwortet. Keine Adjektive: Die steuert bei, wer schreibt.',
    inBreve: {
      titolo: 'Das Haus in Kürze',
      voci: [
        { termine: 'Name', descrizione: 'PluriFin' },
        { termine: 'Gründer und CEO', descrizione: 'Filippo Salemi' },
        { termine: 'Land', descrizione: 'Italien' },
        {
          termine: 'Sparten',
          descrizione: 'PluriFin Finance (Portfolio Manager) und PluriFin Games (ROLLQUEST)',
        },
        {
          termine: 'Sprachen',
          descrizione: 'Sechs: Italienisch, Englisch, Spanisch, Französisch, Deutsch und Portugiesisch',
        },
      ],
    },
    /* Aggiunta dalla corsia B3: chi scrive deve poterla riportare giusta. */
    formaGiuridica: {
      termine: 'Rechtsform',
      descrizione:
        'Natürliche Person. In den Rechtsdokumenten ist Filippo Salemi der Anbieter und Verantwortliche; PluriFin ist die Marke.',
    },
    finance: {
      titolo: 'Portfolio Manager, die Fakten',
      voci: [
        {
          termine: 'Was es ist',
          descrizione:
            'Eine App, die die Depotauszüge mehrerer Broker in einem einzigen Portfolio zusammenführt und es auf dem Gerät hält.',
        },
        { termine: 'Plattformen', descrizione: 'Android. Eine kostenlose Demo läuft im Browser.' },
        { termine: 'Gelesene Broker', descrizione: 'Elf, dazu ein allgemeiner CSV-Leser.' },
        {
          termine: 'Dateien',
          descrizione:
            'CSV-Dateien von elf Brokern, dazu ein allgemeiner CSV-Leser; auch PDF-Dateien, aus denen die App die Tabelle zu lesen versucht. Von Hand importiert, ohne Anbindung an die Depots.',
        },
        { termine: 'Daten', descrizione: 'Auf dem Gerät, verschlüsselt mit AES-256. Kein Nutzerkonto.' },
        {
          termine: 'Künstliche Intelligenz',
          descrizione: 'Freiwillig: Google Gemini, mit dem eigenen Schlüssel der Nutzer.',
        },
        {
          termine: 'Preise',
          descrizione:
            'Sieben Tage Testphase ohne Karte. Vier Tarife, von 4,99 € im Jahr bis 49,99 € einmalig.',
        },
        { termine: 'Werbung', descrizione: 'Keine.' },
        {
          termine: 'Hinweis',
          descrizione:
            'Die App ist ein Informationswerkzeug: Sie führt keine Orders aus, und ihre Inhalte, die Analysen der künstlichen Intelligenz eingeschlossen, sind keine Finanzberatung. Dieser Hinweis gehört in jeden Artikel.',
        },
      ],
    },
    games: {
      titolo: 'ROLLQUEST, die Fakten',
      voci: [
        {
          termine: 'Was es ist',
          descrizione:
            'Ein digitales Brettspiel: ein Würfel, ein Ring aus vierzehn Feldern, ein Turm zum Erklimmen.',
        },
        { termine: 'Plattform', descrizione: 'Android.' },
        { termine: 'Engine', descrizione: 'Unity.' },
        { termine: 'Sprachen', descrizione: 'Sechs.' },
        { termine: 'Zielgruppe', descrizione: 'Spieler ab sechzehn Jahren.' },
        { termine: 'Stand', descrizione: 'In Entwicklung. Kein Termin angekündigt.' },
        {
          termine: 'Regel',
          descrizione:
            'Wer nichts ausgibt, spielt jeden Inhalt durch, und wer Geld ausgibt, hat eine Obergrenze von 20 Euro im Monat: Die ganze Regel, Truhen mit zufälligem Inhalt eingeschlossen, steht im Geldkapitel der Games-Seite.',
        },
      ],
    },
    pronti: {
      titolo: 'Fertige Texte',
      premessa: 'Sie lassen sich übernehmen, wie sie sind.',
      riga: 'PluriFin ist ein italienisches Unternehmen, gegründet von Filippo Salemi, das ernsthafte Werkzeuge baut und Spiele, die zünden: Portfolio Manager für die privaten Finanzen und ROLLQUEST zum Spielen.',
      paragrafo:
        'PluriFin ist ein italienisches Unternehmen mit zwei Sparten, gegründet und geführt von Filippo Salemi. Finance entwickelt Portfolio Manager, eine App, die die Depotauszüge von elf Brokern in einem einzigen Portfolio zusammenführt und es verschlüsselt auf dem Gerät hält, ohne Nutzerkonto und ohne Werbung. Games entwickelt ROLLQUEST, ein digitales Brettspiel für Android, das in einem Turm spielt und derzeit in Entwicklung ist. Beide Sparten teilen eine Regel, nie gegen das Interesse derer zu verdienen, die die Produkte nutzen, und veröffentlichen jedes Produkt in sechs Sprachen.',
    },
    materiali: {
      titolo: 'Material',
      voci: [
        { termine: 'Logo', descrizione: 'Das Signet von PluriFin, im SVG-Format.' },
        { termine: 'Bild für soziale Medien', descrizione: '1200 × 630 Pixel, im PNG-Format.' },
        {
          termine: 'Screenshots und Weiteres',
          descrizione: 'Auf Anfrage, per E-Mail an die Presseadresse.',
        },
      ],
      uso: 'Logo und Screenshots dürfen in Artikeln und Rezensionen über PluriFin verwendet werden. Das Signet wird weder nachgezeichnet noch umgefärbt.',
    },
    contatto: {
      titolo: 'Pressekontakt',
      testo: 'Es antwortet ein Mensch.',
    },
  },

  /* ================================= PREISE ================================= */
  prezzi: {
    meta: {
      titolo: 'Preise von Portfolio Manager',
      descrizione:
        'Vier Tarife, für alle dieselben, ab 4,99 € im Jahr. Sieben Tage Testphase ohne Kreditkarte, keine Werbung.',
    },
    occhiello: 'Finance, die Preisliste',
    titolo: 'Was Portfolio Manager kostet, vollständig',
    sommario:
      'Portfolio Manager hat vier Tarife, für alle dieselben, und sieben Tage Testphase ohne Kreditkarte. Kein Tarif enthält Werbung. Der Rest dieser Seite sind Einzelheiten, und in einer Preisliste kommt es auf die Einzelheiten an.',
    colonne: { piano: 'Tarif', prezzo: 'Preis', perChi: 'Für wen', rinnovo: 'Verlängerung' },
    piani: [
      {
        id: 'single_annual',
        nome: 'Einzeln, jährlich',
        prezzo: '4,99 € im Jahr',
        perChi: 'Ein Google-Konto',
        rinnovo: 'Automatisch alle zwölf Monate, jederzeit abschaltbar',
      },
      {
        id: 'single_lifetime',
        nome: 'Einzeln, lebenslang',
        prezzo: '29,99 € einmalig',
        perChi: 'Ein Google-Konto',
        rinnovo: 'Keine: Gezahlt wird einmal',
      },
      {
        id: 'family_annual',
        nome: 'Familie, jährlich',
        prezzo: '9,99 € im Jahr',
        perChi: 'Wer kauft, und bis zu fünf Mitglieder der eigenen Google-Familiengruppe',
        rinnovo: 'Automatisch alle zwölf Monate, jederzeit abschaltbar',
      },
      {
        id: 'family_lifetime',
        nome: 'Familie, lebenslang',
        prezzo: '49,99 € einmalig',
        perChi: 'Wer kauft, und bis zu fünf Mitglieder der eigenen Google-Familiengruppe',
        rinnovo: 'Keine: Gezahlt wird einmal',
      },
    ],
    nota: 'Preise in Euro für den italienischen Markt, inklusive Mehrwertsteuer, wo sie anfällt. In anderen Ländern rechnet Google Play selbst um.',
    capitoli: [
      {
        id: 'prova',
        titolo: 'Die sieben Tage Testphase',
        paragrafi: [
          'Vom ersten Start an läuft die App sieben Tage lang mit allen Funktionen, ohne eine Kreditkarte zu verlangen. Keine Abbuchung startet von selbst. Die Testphase hängt an der Installation der App, nicht an einem Nutzerkonto: Um sie zu beginnen, muss sich niemand registrieren.',
          'Nach der Testphase bleibt die kostenlose Version. Positionen werden von Hand eingegeben, Rebalancing und Marktdaten laufen weiter; der Import von den Brokern, die Ziele und die künstliche Intelligenz ruhen, bis ein Tarif gewählt ist.',
        ],
      },
      {
        id: 'tutti',
        titolo: 'Was in jedem Tarif steckt',
        paragrafi: [
          'Die vier Tarife schalten dieselben Funktionen frei: Import von den Brokern, Ziele und Analyse mit künstlicher Intelligenz. Rebalancing und Marktdaten gibt es auch in der kostenlosen Version. Von Tarif zu Tarif ändern sich nur die Zahlungsweise und die Zahl der Personen.',
        ],
      },
      {
        id: 'famiglia',
        titolo: 'So funktioniert der Familientarif',
        paragrafi: [
          'Wer kauft, teilt den Tarif mit bis zu fünf Mitgliedern der eigenen Google-Familiengruppe; sie nutzen ihn über ihr eigenes Konto, ohne noch einmal zu zahlen. Die Gruppe verwaltet Google, nicht PluriFin: Eingeladen und entfernt wird in den Werkzeugen von Google.',
        ],
      },
      {
        id: 'pagamento',
        titolo: 'Zahlung, Kündigung und Erstattung',
        paragrafi: [
          'Die Zahlung läuft vollständig über Google Play: PluriFin erhält keine Kartendaten. Die jährliche Verlängerung lässt sich auf der Seite „Abos“ von Google Play abschalten, ohne Strafgebühren, und der Zugang bleibt bis zum Ende des bereits bezahlten Jahres.',
          'Bei den Jahrestarifen wird die Erstattung bei Google Play beantragt: innerhalb von achtundvierzig Stunden nach dem Kauf über den Bestellverlauf, später entscheidet Google. Bei den lebenslangen Tarifen erkennt PluriFin den Widerruf vierzehn Tage lang ab dem Kauf an, auf schriftliche Anfrage an die Adresse, die in den Nutzungsbedingungen steht. Das Haus leitet den Vorgang an Google weiter und gewährt, falls Google ablehnt, ein Guthaben in gleicher Höhe oder eine Erstattung per Banküberweisung. Die vollständigen Bedingungen stehen in den Nutzungsbedingungen.',
        ],
      },
      {
        id: 'perche',
        titolo: 'Warum es so wenig kostet',
        paragrafi: [
          'Weil die App nur sich selbst tragen muss. Es gibt keine Anzeigenkunden zufriedenzustellen und keine Daten zu Geld zu machen: Es gibt eine App, und es gibt ihren Preis.',
        ],
      },
      {
        id: 'chiude',
        titolo: 'Falls PluriFin morgen schließt',
        paragrafi: [
          'Die Daten blieben, wo sie immer waren: auf dem Telefon derer, denen sie gehören, exportierbar als JSON-Datei, die andere Programme lesen können.',
        ],
      },
    ],
    suPlay: 'Die Tarife werden in der App gekauft, über Google Play.',
    /* Lotto TESTO-IT-2: la frase che la pagina mostra finche' `pmSuPlay` e'
       falso, al posto di `suPlay`. Non nomina il negozio (lo vieta il
       presidio): dice quando si potra' comprare e come si prova oggi. */
    primaDellaScheda:
      'Der Kauf beginnt mit der Veröffentlichung der App. Bis dahin lässt sie sich in der Web-Demo ausprobieren, und die ist kostenlos.',
  },

  /* ================================ FRAGEN ================================ */
  domande: {
    meta: {
      titolo: 'Häufige Fragen zu Portfolio Manager',
      descrizione:
        'Kosten, unterstützte Broker, Speicherort der Daten, was die App von PluriFin Finance tut und was nicht.',
    },
    occhiello: 'Finance, die Fragen',
    titolo: 'Was man eine Finanz-App fragen sollte',
    sommario: 'Kurze Antworten. Wo es auf die Einzelheiten ankommt, gibt es die Seite, auf der sie stehen.',
    voci: [
      {
        domanda: 'Was kostet die App?',
        risposta:
          'Sieben Tage Testphase ohne Kreditkarte, danach einer der vier Tarife von der Seite „Preise“ oder die kostenlose Version mit weniger Funktionen. Die Web-Demo ist kostenlos. Schlüssel für die künstliche Intelligenz oder für Echtzeitkurse sind freiwillig und werden, wenn gewünscht, beim gewählten Anbieter bezahlt.',
      },
      {
        domanda: 'Welche Broker liest sie?',
        risposta:
          'Die CSV-Dateien von elf Brokern: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (heute Teil von Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB und Revolut. Für alle anderen gibt es einen allgemeinen CSV-Leser. Auch PDF-Dateien nimmt die App an und versucht, die Tabelle daraus zu lesen.',
      },
      {
        domanda: 'Landen die Daten in der Cloud?',
        risposta:
          'Nein. Portfolios, Positionen und Ziele bleiben verschlüsselt auf dem Gerät. Daten verlassen es nur über die freiwilligen Funktionen, die Nutzer einschalten: die künstliche Intelligenz, die Echtzeitkurse und die Absturzdiagnose, jede an ihren eigenen Anbieter und nie an PluriFin.',
      },
      {
        domanda: 'Handelt die App mit Wertpapieren?',
        risposta:
          'Nein. Sie führt keine Orders aus, ist kein Broker und verbindet sich nicht mit den Depots.',
      },
      {
        domanda: 'Was macht die künstliche Intelligenz?',
        risposta:
          'Sie beantwortet Fragen zum Portfolio und schreibt Analysen dazu, einschließlich Anregungen, was sich ändern ließe. Es sind Texte, die ein Modell erzeugt, Google Gemini: Sie sind keine individuelle Finanzberatung und können Fehler oder veraltete Daten enthalten. Die Entscheidungen bleiben bei denen, die investieren.',
      },
      {
        domanda: 'Braucht man ein Konto?',
        risposta:
          'Nein. Es gibt keine Registrierung. Die siebentägige Testphase hängt an der Installation der App; der Kauf hängt am Google-Konto, mit dem gezahlt wird, nicht an einem Konto bei PluriFin.',
      },
      {
        domanda: 'Läuft sie ohne Netz?',
        risposta:
          'Ja, für alles, was schon auf dem Telefon liegt: Die App öffnet sich und zeigt Portfolios und Positionen auch ohne Netz, mit den zuletzt geladenen Kursen. Das Netz braucht sie, um die Kurse zu aktualisieren, und für die künstliche Intelligenz.',
      },
      {
        domanda: 'Läuft sie im Browser?',
        risposta:
          'Ja, in der Web-Demo, mit den Grenzen, die auf der Seite von Portfolio Manager benannt sind.',
      },
      {
        domanda: 'In wie vielen Sprachen?',
        risposta: 'Sechs: Italienisch, Englisch, Spanisch, Französisch, Deutsch und Portugiesisch.',
      },
      {
        domanda: 'Wie kommen die Updates?',
        risposta:
          'Die App aktualisiert sich über den Store, aus dem sie installiert wurde. Die Web-Demo aktualisiert sich, wenn man die Seite neu lädt.',
      },
    ],
  },

  /* ================================ KONTAKT ================================ */
  contatti: {
    meta: {
      titolo: 'Kontakt',
      descrizione: 'Die Adressen von PluriFin für Anfragen, Presse, Datenschutz und Games.',
    },
    occhiello: 'Kontakt',
    titolo: 'An PluriFin schreiben',
    sommario:
      'Vier Adressen und ein Mensch, der antwortet.',
    voci: [
      { termine: 'Anfragen', descrizione: 'Fragen zu den Produkten und Hilfe.' },
      { termine: 'Presse', descrizione: 'Journalisten, Rezensionen, Materialanfragen.' },
      {
        termine: 'Datenschutz',
        descrizione:
          'Fragen zur Datenverarbeitung. Für förmliche Anträge auf Auskunft, Berichtigung und Löschung gilt die Adresse, die in der Datenschutzerklärung steht.',
      },
      { termine: 'Games', descrizione: 'Alles rund um ROLLQUEST.' },
    ],
  },

  /* ================================= NEUES ================================= */
  notizie: {
    meta: {
      titolo: 'Neues von PluriFin',
      descrizione: 'Was sich bei PluriFin, bei Portfolio Manager und bei ROLLQUEST ändert.',
    },
    occhiello: 'Neues',
    titolo: 'Neues',
    sommario: 'Was sich ändert, aufgeschrieben von denen, die es geändert haben.',
    pubblicato: 'Erschienen am',
    leggi: 'Artikel lesen',
    vuoto: 'In dieser Sprache gibt es noch keine Artikel.',
    ritorno: 'Alle Artikel',
  },

  legali: {
    ritorno: 'Zurück zur Titelseite',
    indice: 'Inhalt',
    aggiornato: 'Zuletzt aktualisiert',
  },
};

export default de;
