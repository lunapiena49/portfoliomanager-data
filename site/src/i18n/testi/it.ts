import type { Testi } from '../testi';

/* ITALIANO, la lingua sorgente del sito rifatto in S384.
 *
 * File di LOCALIZZAZIONE: UTF-8 con accenti, apostrofi e virgolette veri.
 *
 * LA VOCE (decisione dell'utente, 2026-11-11): una voce sola che fonde quattro
 * registri. L'ossatura e' del cronista: fatti, numeri, nomi, titoli col verbo.
 * La satira punge i VIZI del settore, mai gli utenti e mai un concorrente per
 * nome. Dove si parla di dati e di soldi il tono e' piano e completo. Dove si
 * parla del gioco c'e' lo slancio di uno studio che ragiona in grande, senza
 * dichiararsi cio' che non e'. Sempre terza persona: PluriFin e' "l'azienda"
 * o "la casa", Filippo Salemi e' il fondatore e CEO. Nessun virgolettato gli
 * e' attribuito.
 *
 * I FATTI: ogni affermazione verificabile di questo file ha la sua fonte in
 * storico/harness/S384/SITO_A_FATTI.md (radice dell'ombrello). Chi cambia una
 * frase che porta un fatto aggiorna quella tabella nello stesso lotto.
 *
 * PORTFOLIO MANAGER e' scritto al presente, come prodotto fatto. Cio' che
 * riguarda la scheda di Google Play sta SOLO nelle chiavi `suPlay` e
 * `azioni.play`, che il sito mostra quando `pmSuPlay` (src/lib/stato.ts) e'
 * vero. Nessun'altra frase deve nominare Google Play come luogo da cui si
 * scarica, si installa o si aggiorna l'app. Come CANALE DI PAGAMENTO Google
 * Play si nomina solo in `prezzi.nota` e nei capitoli `pagamento` e
 * `famiglia` di `prezzi`; in ogni altra chiave non compare affatto. Lo
 * presidia integrations/testi.test.mjs (S384, lotto TESTO-IT).
 */
const it: Testi = {
  lingua: 'it',

  comune: {
    salta: 'Vai al testo',
    navEtichetta: 'Sezioni',
    nav: { finance: 'Finance', games: 'Games', casa: 'La casa', notizie: 'Notizie' },
    lingua: 'Lingua',
    azioni: {
      demo: 'Apri la demo web',
      play: 'Scarica da Google Play',
      prezzi: 'Leggi il listino completo',
      finance: 'Leggi tutto su Portfolio Manager',
      games: 'Leggi tutto su ROLLQUEST',
      notizie: 'Segui il cantiere nelle Notizie',
      scrivi: 'Scrivi a PluriFin',
    },
    avvisoFinance:
      'Portfolio Manager è uno strumento informativo: non esegue ordini. L’analisi con l’intelligenza artificiale produce spunti generati da un modello, non consulenza finanziaria personalizzata.',
    avvisoFinanceLungo:
      'Portfolio Manager è uno strumento informativo. I contenuti e le analisi mostrati, comprese quelle generate dall’intelligenza artificiale, non costituiscono consulenza finanziaria, fiscale o legale ai sensi del Testo unico della finanza (D.Lgs. 58/1998) o di norme analoghe. PluriFin non gestisce capitali e non esegue ordini. Le decisioni di investimento si prendono con un professionista abilitato.',
    datiEsempio: 'Dati di esempio.',
    colophon: {
      riga: 'PluriFin è fondata e guidata da Filippo Salemi, in Italia.',
      stampa: 'Stampa',
      informazioni: 'Informazioni',
      privacy: 'Privacy',
      giochi: 'Games',
      lingue: 'Lingue',
      pagine: 'Pagine',
      legali: 'Documenti legali',
      voci: {
        prezzi: 'Prezzi',
        domande: 'Domande frequenti',
        contatti: 'Contatti',
        stampa: 'Stampa',
        informativa: 'Informativa sulla privacy',
        termini: 'Termini di servizio',
        avvertenza: 'Avvertenza finanziaria',
        dmca: 'DMCA',
        codice: 'Codice del sito e dati di mercato',
      },
      diritti: '© 2026 PluriFin',
    },
  },

  /* ============================ LA PRIMA PAGINA ============================ */
  home: {
    meta: {
      titolo: 'PluriFin: i conti di giorno, i dadi di notte',
      descrizione:
        'PluriFin è l’azienda italiana fondata da Filippo Salemi. Portfolio Manager riunisce in un solo portafoglio gli estratti conto di undici broker; ROLLQUEST è il gioco da tavolo in cui una torre si sale un dado alla volta.',
    },
    occhiello: 'Italia, due divisioni sotto lo stesso nome',
    titolo: 'PluriFin tiene i conti di giorno e tira i dadi di notte',
    sommario:
      'L’azienda fondata e guidata da Filippo Salemi fa due mestieri che non si rivolgono la parola. Di giorno Portfolio Manager riunisce in un solo portafoglio gli estratti conto di undici broker e lo tiene sul telefono di chi lo possiede. Di notte ROLLQUEST alza una torre da salire un dado alla volta. La regola è la stessa per entrambi: non guadagnare contro chi li usa.',
    casa: {
      titolo: 'Una casa, due mestieri, una regola',
      paragrafi: [
        'PluriFin nasce in Italia. La guida Filippo Salemi, fondatore e CEO, che l’ha divisa in due: Finance costruisce strumenti per chi amministra da solo i propri risparmi, Games costruisce giochi. Le due divisioni non si prestano nemmeno le parole: nei testi di Finance non entra il lessico del gioco, in quelli di Games non entra quello della finanza.',
        'In comune hanno una regola: non si guadagna contro l’interesse di chi li usa. Nel settore è meno ovvio di quanto sembri. Esistono app di finanza gratuite perché la merce è il portafoglio di chi le installa, ed esistono giochi gratuiti senza un tetto di spesa, in cui il conto si scopre a fine mese. PluriFin dice il prezzo prima, mette un tetto alla spesa nel gioco e di chi compra non rivende niente.',
        'Ogni prodotto esce in sei lingue nello stesso momento: italiano, inglese, spagnolo, francese, tedesco e portoghese.',
      ],
    },
    finance: {
      rubrica: 'Finance, Portfolio Manager',
      titolo: 'Undici estratti conto, un solo portafoglio',
      passi: [
        [
          'Chi investe attraverso più broker riceve da ciascuno un estratto conto con un formato suo: colonne in ordine diverso, date scritte al contrario, valute date per scontate. Undici intermediari, undici modi di dire la stessa cosa.',
          'Portfolio Manager legge i CSV di undici broker, da Interactive Brokers a DEGIRO, da Fidelity a Revolut, e li riunisce in un unico portafoglio. Per gli altri c’è un lettore generico. Accetta anche i PDF, da cui prova a estrarre la tabella.',
        ],
        [
          'Il portafoglio resta sul telefono, cifrato con AES-256. PluriFin non ha un archivio in cui tenerlo e non chiede di aprire un account: non c’è niente da rubare dove non c’è niente in deposito.',
          'A PluriFin il portafoglio non arriva mai. Per verificare la prova e l’abbonamento bastano un’impronta anonima del dispositivo e la ricevuta dell’acquisto. L’analisi con l’intelligenza artificiale è facoltativa: chi la accende manda la domanda e la composizione del portafoglio a Google Gemini, con una chiave che inserisce di persona.',
        ],
        [
          'Il listino ha quattro righe. Dopo sette giorni di prova senza carta di credito si sceglie: un abbonamento annuale oppure un pagamento solo, per sempre. Il piano Famiglia vale per chi acquista e per i membri del suo gruppo Famiglia di Google, fino a cinque.',
          'Nessun piano contiene pubblicità: il prodotto è l’app, non chi la usa.',
        ],
      ],
      listinoTitolo: 'Il listino di Portfolio Manager',
      listinoNota: 'Prezzi in euro per il mercato italiano, IVA inclusa dove dovuta.',
      colonne: { piano: 'Piano', prezzo: 'Prezzo' },
      palco: {
        testa: 'Portafoglio',
        valuta: 'EUR',
        totale: 'Totale',
        sigillo: 'Cifrato, sul telefono',
      },
    },
    mercato: {
      titolo: 'Dal listino',
      nota: 'I primi tre rialzi e i primi tre ribassi di giornata dal flusso pubblico che scarica anche l’app. Il flusso tiene i titoli con almeno 20 milioni di dollari scambiati nel giorno e scarta le variazioni oltre il 25%. Dati di fine giornata, fonte EODHD, rigenerati ogni notte. È un listino, non un consiglio.',
      colonne: { titolo: 'Titolo', chiusura: 'Chiusura', variazione: 'Variazione' },
      rialzi: 'Rialzi',
      ribassi: 'Ribassi',
      seduta: 'Wall Street, seduta del',
    },
    imbrunire: 'Strumenti seri, e giochi che si accendono.',
    games: {
      rubrica: 'Games, in sviluppo',
      titolo: 'ROLLQUEST, la torre si sale un dado alla volta',
      passi: [
        [
          'ROLLQUEST è un gioco da tavolo digitale per Android. Si tira un dado e Rollo, cavaliere tondo e testardo, avanza lungo un anello di quattordici caselle intorno alla torre di Re Corvax, il corvo stregone che ha rubato le stelle.',
          'Le caselle non sono tutte uguali: su una si combatte, un’altra nasconde un forziere, un’altra offre un talismano da scegliere fra tre carte, e qualcuna è bruciata e non dà niente. Chiuso il giro, si sale di un piano.',
        ],
        [
          'Chi non spende completa ogni contenuto. Si comprano comodità, estetica e Astraliti, con un tetto di 20 euro al mese: chi compra arriva prima, non dove gli altri non possono arrivare.',
          'Detto per intero: gli Astraliti sono la valuta del gioco e pagano anche scrigni dal contenuto casuale, ed è per questo che l’etichetta è 16+. Il vizio del settore è il gioco senza tetto, in cui il conto si scopre a fine mese. PluriFin il suo tetto lo scrive qui, dove chiunque potrà rinfacciarglielo.',
        ],
        [
          'Il mondo è una fiaba oscura illustrata: pietra, vetrate, luce di lanterna, e mai l’orrore. Rollo, i nemici, la torre e i dadi sono originali, disegnati per questo gioco, che uscirà in sei lingue.',
          'Lo studio è piccolo, l’ambizione no. ROLLQUEST è in sviluppo e non ha una data: PluriFin la annuncerà quando ci sarà qualcosa da giocare.',
        ],
      ],
      palco: { ascesa: 'Ascesa', cima: 'In cima' },
    },
  },

  /* ============================ PORTFOLIO MANAGER ============================ */
  finance: {
    meta: {
      titolo: 'Portfolio Manager: undici broker, un solo portafoglio',
      descrizione:
        'Portfolio Manager legge gli estratti conto di undici broker e li riunisce in un portafoglio cifrato sul telefono. Senza account, senza pubblicità, con sette giorni di prova.',
    },
    occhiello: 'PluriFin Finance',
    titolo: 'Portfolio Manager rimette insieme i conti che i broker tengono separati',
    sommario:
      'L’app di PluriFin legge gli estratti conto di undici broker e li riunisce in un solo portafoglio, cifrato sul telefono di chi lo possiede. Non chiede un account e non mostra pubblicità. L’azienda che la produce non sa quanto possiede chi la usa, e ha fatto in modo di non poterlo sapere.',
    capitoli: [
      {
        id: 'import',
        titolo: 'Undici formati, una sola tabella',
        paragrafi: [
          'Ogni broker esporta le posizioni a modo suo. Portfolio Manager riconosce il formato dei CSV di undici broker, mostra un’anteprima delle righe da correggere e gestisce i doppioni prima di salvare. Accetta anche i PDF, da cui prova a estrarre la tabella.',
          'L’app non si collega mai al conto e non esegue ordini: i dati entrano perché li porta chi li possiede, un file alla volta. È più lento di un collegamento automatico, ed è il motivo per cui nessuno deve consegnare a PluriFin le credenziali della propria banca.',
        ],
      },
      {
        id: 'portafoglio',
        titolo: 'Che cosa si vede, una volta riuniti i conti',
        paragrafi: [
          'Riuniti i conti, l’app mostra il portafoglio intero in una sola valuta, la ripartizione fra i tipi di attivo, guadagni e perdite di ogni posizione. Gli obiettivi dicono quanto manca al traguardo e quanto versare ogni mese; il ribilanciamento propone come tornare alle quote decise.',
          'L’analisi con l’intelligenza artificiale è facoltativa e usa Google Gemini, con una chiave che l’utente inserisce di persona. Chi la accende manda a Google la domanda e la composizione del portafoglio: titoli, quantità, prezzi medi. Le risposte sono spunti generati da un modello, non consulenza personalizzata, e possono contenere errori: le decisioni restano di chi investe.',
        ],
      },
    ],
    broker: {
      titolo: 'I broker che l’app legge da sola',
      generico:
        'Per ogni altro intermediario c’è un lettore CSV generico: trova da solo la riga delle intestazioni, e gli bastano il simbolo del titolo e una colonna fra quantità, valore e prezzo.',
    },
    dati: {
      titolo: 'Dove stanno i dati, detto per esteso',
      premessa:
        'Le informative sulla privacy hanno fama di essere scritte perché nessuno le legga. Questa è la versione corta. Dove dice meno di quella lunga vale quella lunga, che è il documento legale.',
      voci: [
        {
          termine: 'Sul telefono',
          descrizione:
            'Portafogli, posizioni e obiettivi, cifrati con AES-256. La chiave è custodita dal sistema operativo, come le chiavi API inserite dall’utente. In chiaro restano alcune spunte di servizio, per esempio il consenso alla diagnostica.',
        },
        {
          termine: 'In nessun archivio di PluriFin',
          descrizione: 'L’azienda non conserva i portafogli e non chiede di aprire un account.',
        },
        {
          termine: 'A PluriFin',
          descrizione:
            'Il portafoglio, mai. Per verificare la prova di sette giorni e l’abbonamento bastano un’impronta anonima del dispositivo e la ricevuta dell’acquisto.',
        },
        {
          termine: 'A terzi, solo se l’utente lo accende',
          descrizione:
            'Con l’intelligenza artificiale accesa, la domanda e la composizione del portafoglio (titoli, quantità, prezzi medi) vanno a Google Gemini. Con i prezzi in tempo reale accesi, i simboli dei titoli vanno al fornitore scelto. In entrambi i casi la richiesta parte dal telefono e non passa da PluriFin.',
        },
        {
          termine: 'A chi ospita il sito',
          descrizione:
            'Il listino di mercato pubblico l’app lo scarica da plurifin.app. GitHub e Cloudflare, che ospitano il sito, vedono l’indirizzo IP della richiesta, come per ogni pagina web.',
        },
        {
          termine: 'Diagnostica',
          descrizione:
            'I rapporti sui crash (Firebase Crashlytics, solo su Android) partono soltanto se l’utente accende la diagnostica dalle impostazioni. Finché è spenta non viene trasmesso nulla: i rapporti raccolti nel frattempo restano sul telefono e partono se e quando la si accende. Non contengono dati di portafoglio né chiavi, e disinstallare l’app li elimina.',
        },
        {
          termine: 'Pubblicità e tracciamento',
          descrizione: 'Nessuna pubblicità. Nell’app non c’è alcun SDK di analytics.',
        },
        {
          termine: 'Uscita',
          descrizione:
            '“Esporta i miei dati” produce un file JSON con tutto il contenuto; “Cancella tutti i dati” lo elimina dal telefono.',
        },
      ],
      chiusa: 'Il testo completo è nell’informativa sulla privacy, in sei lingue.',
    },
    prezzi: {
      titolo: 'Quanto costa',
      testo:
        'Sette giorni di prova senza carta di credito. Poi quattro piani, gli stessi per tutti: da 4,99 € l’anno a 49,99 € una volta sola per la famiglia. Nessuna pubblicità in nessun piano.',
    },
    provare: {
      titolo: 'Provarla, prima di fidarsi',
      demo: 'La demo web si apre nel browser senza installare nulla. Ha limiti dichiarati: cinque posizioni inserite a mano, niente import, niente obiettivi e niente intelligenza artificiale. I suoi dati restano nel browser, senza cifratura: serve a vedere com’è fatta l’app, non a custodire un portafoglio vero.',
      suPlay: 'L’app completa è su Google Play.',
    },
    palco: {
      titolo: 'Le schermate dell’app',
      schermate: [
        {
          termine: 'Portafoglio',
          descrizione:
            'Schermata dell’app: il valore totale del portafoglio, il guadagno complessivo e la mappa delle posizioni, un riquadro per titolo.',
        },
        {
          termine: 'Mercato',
          descrizione:
            'Schermata dell’app: la panoramica del mercato e i prezzi aggiornati delle posizioni in portafoglio.',
        },
        {
          termine: 'Ribilanciamento',
          descrizione:
            'Schermata dell’app: le quote obiettivo, il valore del portafoglio e l’esito del ribilanciamento.',
        },
        {
          termine: 'Analisi',
          descrizione:
            'Schermata dell’app: le analisi rapide, gli indicatori di portafoglio e l’avviso che i contenuti non sono consulenza finanziaria.',
        },
      ],
    },
  },

  /* ================================ ROLLQUEST ================================ */
  games: {
    meta: {
      titolo: 'ROLLQUEST: la torre si sale un dado alla volta',
      descrizione:
        'ROLLQUEST è il gioco da tavolo digitale di PluriFin Games: un dado, un anello di quattordici caselle, una torre da salire. In sviluppo per Android, in sei lingue.',
    },
    occhiello: 'PluriFin Games, in sviluppo',
    titolo: 'ROLLQUEST porta il gioco da tavolo in cima a una torre',
    sommario:
      'Un dado, un anello di quattordici caselle e una torre da salire piano dopo piano. Il gioco di PluriFin è in sviluppo per Android, in sei lingue. Sui soldi ha una regola scritta, con un tetto di spesa: sta per intero nel capitolo che porta il suo nome.',
    capitoli: [
      {
        id: 'gioco',
        titolo: 'Come si gioca',
        paragrafi: [
          'Si tira il dado e Rollo avanza sull’anello. La casella decide che cosa succede: uno scontro, un forziere, un talismano da scegliere fra tre carte, oppure niente, se la casella è bruciata. Con il bottino si equipaggia l’eroe, e chiuso il giro si sale di un piano. Dieci piani fanno un’Ascesa, e all’ultimo aspetta un boss.',
          'È un gioco da tavolo che ha preso due abitudini dai videogiochi: dal roguelite la partita che riparte e non torna mai uguale, dal soulslike la sconfitta che insegna qualcosa. Una partita dura da due a cinque minuti; la progressione dell’eroe continua da una partita all’altra.',
        ],
      },
      {
        id: 'storia',
        titolo: 'La storia, in poche righe',
        paragrafi: [
          'Re Corvax, corvo e stregone, ha saccheggiato il regno delle Stelle e le ha chiuse nella sua Torre, sospesa nel cielo. Rollo, cavaliere tondo e testardo, la sale piano dopo piano per riprenderle.',
          'Lo accompagnano Lumen, lucciola fatata; Baffo, tasso e bottegaio; Bruna, orsa e fabbra. Il tono è quello di una fiaba oscura illustrata: architettura, vetrate e luce di lanterna. Mai l’orrore, mai il sangue.',
        ],
      },
      {
        id: 'soldi',
        titolo: 'La regola dei soldi',
        paragrafi: [
          'Chi non spende completa ogni contenuto del gioco. È il vincolo con cui PluriFin bilancia l’economia: ogni modifica va verificata contro di lui, con un simulatore, prima di arrivare ai giocatori.',
          'Si comprano comodità, estetica e Astraliti, con un tetto di 20 euro al mese: chi compra arriva prima, non dove gli altri non possono arrivare. Detto per intero: gli Astraliti sono la valuta del gioco e pagano tutto, compresi scrigni dal contenuto casuale. È per questo che l’etichetta è 16+, mentre il contenuto resta una fiaba senza orrore e senza sangue.',
          'Oggi ROLLQUEST è in sviluppo e non vende ancora niente. Il vizio del settore è il gioco senza tetto, in cui il conto si scopre a fine mese. Qui il tetto c’è ed è scritto in questa pagina, dove chiunque potrà rinfacciarlo a PluriFin.',
        ],
      },
      {
        id: 'mestiere',
        titolo: 'Di che cosa è fatto',
        paragrafi: [
          'Rollo, i nemici, i boss, il dado, il tabellone e l’interfaccia sono originali, disegnati per questo gioco. L’equipaggiamento può includere pezzi di autori terzi, sempre con licenza e crediti dichiarati.',
          'Il motore è Unity. I numeri dell’economia passano da un simulatore prima di arrivare sullo schermo, perché in un gioco da tavolo le regole si vedono, e una regola che si vede deve reggere.',
        ],
      },
    ],
    stato: {
      titolo: 'A che punto è',
      paragrafi: [
        'ROLLQUEST è in sviluppo. Non ha una data di uscita, e PluriFin non ne inventa una per riempire una riga: la annuncerà nelle Notizie quando ci sarà qualcosa da giocare.',
        'Su questo sito non c’è una lista d’attesa a cui iscriversi. Il gioco è dichiarato per giocatori dai sedici anni in su e uscirà in sei lingue: italiano, inglese, spagnolo, francese, tedesco e portoghese.',
        'Lo studio è piccolo e ragiona in grande: un mondo intero, una torre che non finisce al primo boss, e la pretesa di stare sullo stesso scaffale dei giochi fatti da cento persone.',
      ],
    },
    /* Corsia B2: la didascalia delle immagini della pagina. Fonte:
       strumenti/torre.mjs e src/assets/torre/PROVENIENZA.json. */
    immagini:
      'La torre di questa pagina è fatta con i fondali del gioco, ridotti per il web. Le finestre spente non vengono dal gioco: sono una resa fatta per il sito, perché si accendano salendo.',
  },

  /* ================================= LA CASA ================================= */
  casa: {
    meta: {
      titolo: 'La casa: chi guida PluriFin e come lavora',
      descrizione:
        'PluriFin è un’azienda italiana fondata e guidata da Filippo Salemi. Ha due divisioni, Finance e Games, e una regola: non guadagnare contro chi usa i suoi prodotti.',
    },
    occhiello: 'La casa',
    titolo: 'PluriFin, due divisioni e un solo modo di guadagnare',
    sommario:
      'Un’azienda italiana, fondata e guidata da Filippo Salemi, che costruisce un’app per la finanza personale e un gioco da tavolo. Quando chiede soldi dice prima quanto: un listino di quattro righe per l’app, un tetto di 20 euro al mese per il gioco.',
    capitoli: [
      {
        id: 'fondatore',
        titolo: 'Chi la guida',
        paragrafi: [
          'Filippo Salemi è il fondatore e CEO di PluriFin. Ha impostato l’azienda su due divisioni e su una regola che viene prima di entrambe: non guadagnare contro l’interesse di chi usa i prodotti.',
          'Nei documenti legali il titolare dei prodotti e del trattamento dei dati è indicato per nome, ed è la stessa persona. Chi ha una domanda sa a chi rivolgerla.',
        ],
      },
      {
        id: 'divisioni',
        titolo: 'Le due divisioni',
        paragrafi: [
          'PluriFin Finance fa Portfolio Manager, l’app che riunisce in un solo portafoglio gli estratti conto di undici broker e lo tiene cifrato sul telefono.',
          'PluriFin Games fa ROLLQUEST, un gioco da tavolo digitale per Android in cui una torre si sale un dado alla volta. È in sviluppo.',
          'Le due divisioni non si somigliano e non devono somigliarsi. Hanno in comune il metodo: si lavora finché la cosa funziona, poi si pubblica.',
        ],
      },
      {
        id: 'metodo',
        titolo: 'Come lavora',
        paragrafi: [
          'Ogni prodotto esce in sei lingue nello stesso momento. I prezzi di Portfolio Manager stanno in un listino solo, e un controllo automatico confronta con quel listino ogni pagina che li ripete, questa compresa.',
          'Il codice di questo sito e il flusso dei dati di mercato sono pubblici: chi vuole controllare come sono fatti non deve chiedere il permesso.',
        ],
      },
    ],
    /* Aggiunta dalla corsia B3: la forma giuridica detta in chiaro. Fonti:
       assets/legal/it/privacy_policy.md sez. 1, terms_of_service.md sez. 1. */
    titolare: {
      titolo: 'Chi risponde davanti alla legge',
      testo:
        'PluriFin è il marchio con cui Filippo Salemi pubblica i suoi prodotti. Nei documenti legali, dall’informativa sulla privacy ai termini di servizio, il titolare è lui: una persona fisica, in Italia, non una società.',
    },
    nonFa: {
      titolo: 'Che cosa PluriFin non fa',
      voci: [
        'Non vende i dati di chi usa i suoi prodotti, e non li raccoglie per poterlo fare.',
        'Non mostra pubblicità in Portfolio Manager né su questo sito.',
        'Su questo sito non c’è niente a cui iscriversi: nessuna lista d’attesa, nessuna newsletter.',
        'Non annuncia date che non può mantenere.',
      ],
    },
    contatti: {
      titolo: 'Scrivere a PluriFin',
      testo: 'Risponde una persona.',
    },
  },

  /* ================================= STAMPA ================================= */
  stampa: {
    meta: {
      titolo: 'Stampa: fatti, testi pronti e contatti',
      descrizione:
        'Fatti verificabili su PluriFin, Portfolio Manager e ROLLQUEST, testi pronti da citare e il contatto per la stampa.',
    },
    occhiello: 'Stampa',
    titolo: 'Per chi scrive di PluriFin',
    sommario:
      'Fatti che si possono verificare, due testi pronti da citare e un indirizzo a cui risponde una persona. Niente aggettivi: quelli li mette chi scrive.',
    inBreve: {
      titolo: 'L’azienda in breve',
      voci: [
        { termine: 'Nome', descrizione: 'PluriFin' },
        { termine: 'Fondatore e CEO', descrizione: 'Filippo Salemi' },
        { termine: 'Paese', descrizione: 'Italia' },
        {
          termine: 'Divisioni',
          descrizione: 'PluriFin Finance (Portfolio Manager) e PluriFin Games (ROLLQUEST)',
        },
        {
          termine: 'Lingue',
          descrizione: 'Sei: italiano, inglese, spagnolo, francese, tedesco e portoghese',
        },
      ],
    },
    /* Aggiunta dalla corsia B3: chi scrive deve poterla riportare giusta. */
    formaGiuridica: {
      termine: 'Forma giuridica',
      descrizione:
        'Persona fisica. Nei documenti legali il titolare è Filippo Salemi; PluriFin è il marchio.',
    },
    finance: {
      titolo: 'Portfolio Manager, i fatti',
      voci: [
        {
          termine: 'Che cos’è',
          descrizione:
            'Un’app che riunisce in un solo portafoglio gli estratti conto di più broker e lo tiene sul dispositivo.',
        },
        { termine: 'Piattaforme', descrizione: 'Android. Una demo gratuita gira nel browser.' },
        { termine: 'Broker letti', descrizione: 'Undici, più un lettore CSV generico.' },
        {
          termine: 'File',
          descrizione:
            'CSV di undici broker, più un lettore generico; anche PDF, da cui l’app prova a estrarre la tabella. Importati a mano, senza collegamento ai conti.',
        },
        { termine: 'Dati', descrizione: 'Sul dispositivo, cifrati con AES-256. Nessun account.' },
        {
          termine: 'Intelligenza artificiale',
          descrizione: 'Facoltativa: Google Gemini, con la chiave dell’utente.',
        },
        {
          termine: 'Prezzi',
          descrizione:
            'Sette giorni di prova senza carta. Quattro piani, da 4,99 € l’anno a 49,99 € una tantum.',
        },
        { termine: 'Pubblicità', descrizione: 'Nessuna.' },
        {
          termine: 'Avvertenza',
          descrizione:
            'È uno strumento informativo: non esegue ordini, e i suoi contenuti, analisi dell’intelligenza artificiale comprese, non costituiscono consulenza finanziaria. Va mantenuta in ogni articolo.',
        },
      ],
    },
    games: {
      titolo: 'ROLLQUEST, i fatti',
      voci: [
        {
          termine: 'Che cos’è',
          descrizione:
            'Un gioco da tavolo digitale: un dado, un anello di quattordici caselle, una torre da salire.',
        },
        { termine: 'Piattaforma', descrizione: 'Android.' },
        { termine: 'Motore', descrizione: 'Unity.' },
        { termine: 'Lingue', descrizione: 'Sei.' },
        { termine: 'Pubblico', descrizione: 'Giocatori dai sedici anni in su.' },
        { termine: 'Stato', descrizione: 'In sviluppo. Nessuna data annunciata.' },
        {
          termine: 'Regola',
          descrizione:
            'Chi non spende completa ogni contenuto e chi spende ha un tetto di 20 euro al mese: la regola intera, scrigni dal contenuto casuale compresi, è nel capitolo dei soldi della pagina Games.',
        },
      ],
    },
    pronti: {
      titolo: 'Testi pronti',
      premessa: 'Si possono copiare così come sono.',
      riga: 'PluriFin è un’azienda italiana, fondata da Filippo Salemi, che costruisce strumenti seri e giochi che si accendono: Portfolio Manager per la finanza personale e ROLLQUEST per il gioco.',
      paragrafo:
        'PluriFin è un’azienda italiana fondata e guidata da Filippo Salemi, con due divisioni. Finance sviluppa Portfolio Manager, un’app che riunisce in un solo portafoglio gli estratti conto di undici broker e lo tiene cifrato sul dispositivo, senza account e senza pubblicità. Games sviluppa ROLLQUEST, un gioco da tavolo digitale per Android ambientato in una torre, oggi in sviluppo. Le due divisioni condividono una regola, non guadagnare contro l’interesse di chi usa i prodotti, e pubblicano ogni prodotto in sei lingue.',
    },
    materiali: {
      titolo: 'Materiali',
      voci: [
        { termine: 'Marchio', descrizione: 'Il glifo di PluriFin, in formato SVG.' },
        { termine: 'Immagine per i social', descrizione: '1200 per 630 pixel, in formato PNG.' },
        {
          termine: 'Schermate e altro materiale',
          descrizione: 'A richiesta, scrivendo all’indirizzo della stampa.',
        },
      ],
      uso: 'Marchio e schermate si possono usare in articoli e recensioni che parlano di PluriFin. Il glifo non si ridisegna e non si ricolora.',
    },
    contatto: {
      titolo: 'Contatto per la stampa',
      testo: 'Risponde una persona.',
    },
  },

  /* ================================= PREZZI ================================= */
  prezzi: {
    meta: {
      titolo: 'Prezzi di Portfolio Manager',
      descrizione:
        'Quattro piani, gli stessi per tutti, da 4,99 € l’anno. Sette giorni di prova senza carta di credito, nessuna pubblicità.',
    },
    occhiello: 'Finance, il listino',
    titolo: 'Quanto costa Portfolio Manager, per intero',
    sommario:
      'Portfolio Manager ha quattro piani, gli stessi per tutti, e sette giorni di prova senza carta di credito. Nessun piano contiene pubblicità. Il resto di questa pagina sono dettagli, e in un listino i dettagli sono il punto.',
    colonne: { piano: 'Piano', prezzo: 'Prezzo', perChi: 'Per chi', rinnovo: 'Rinnovo' },
    piani: [
      {
        id: 'single_annual',
        nome: 'Singolo, annuale',
        prezzo: '4,99 € l’anno',
        perChi: 'Un account Google',
        rinnovo: 'Automatico ogni dodici mesi, disattivabile quando si vuole',
      },
      {
        id: 'single_lifetime',
        nome: 'Singolo, a vita',
        prezzo: '29,99 € una tantum',
        perChi: 'Un account Google',
        rinnovo: 'Nessuno: si paga una volta',
      },
      {
        id: 'family_annual',
        nome: 'Famiglia, annuale',
        prezzo: '9,99 € l’anno',
        perChi: 'Chi acquista e fino a cinque membri del suo gruppo Famiglia di Google',
        rinnovo: 'Automatico ogni dodici mesi, disattivabile quando si vuole',
      },
      {
        id: 'family_lifetime',
        nome: 'Famiglia, a vita',
        prezzo: '49,99 € una tantum',
        perChi: 'Chi acquista e fino a cinque membri del suo gruppo Famiglia di Google',
        rinnovo: 'Nessuno: si paga una volta',
      },
    ],
    nota: 'Prezzi in euro per il mercato italiano, IVA inclusa dove dovuta. Negli altri paesi Google Play applica la propria conversione.',
    capitoli: [
      {
        id: 'prova',
        titolo: 'La prova di sette giorni',
        paragrafi: [
          'Dal primo avvio l’app funziona per sette giorni con tutte le funzioni, senza chiedere una carta di credito. Nessun addebito parte da solo. La prova è legata all’installazione dell’app, non a un account: per cominciarla non serve registrarsi.',
          'Finita la prova resta la versione gratuita. Le posizioni si inseriscono a mano, ribilanciamento e dati di mercato continuano a funzionare; l’import dai broker, gli obiettivi e l’intelligenza artificiale si fermano finché non si sceglie un piano.',
        ],
      },
      {
        id: 'tutti',
        titolo: 'Che cosa c’è in ogni piano',
        paragrafi: [
          'I quattro piani sbloccano le stesse funzioni: import dai broker, obiettivi e analisi con l’intelligenza artificiale. Ribilanciamento e dati di mercato ci sono anche nella versione gratuita. Fra un piano e l’altro cambiano solo il modo di pagare e il numero di persone.',
        ],
      },
      {
        id: 'famiglia',
        titolo: 'Come funziona il piano Famiglia',
        paragrafi: [
          'Chi acquista condivide il piano con i membri del proprio gruppo Famiglia di Google, fino a cinque, che accedono dal loro account senza pagare di nuovo. Il gruppo lo gestisce Google, non PluriFin: inviti e rimozioni si fanno dagli strumenti di Google.',
        ],
      },
      {
        id: 'pagamento',
        titolo: 'Pagamento, disdetta e rimborsi',
        paragrafi: [
          'Il pagamento passa interamente da Google Play: PluriFin non riceve i dati della carta. Il rinnovo annuale si disattiva dalla pagina Abbonamenti di Google Play, senza penali, e l’accesso resta fino alla fine dell’anno già pagato.',
          'Per i piani annuali il rimborso si chiede a Google Play: entro quarantotto ore dall’acquisto dalla cronologia degli ordini, più tardi decide Google. Per i piani a vita PluriFin onora il recesso per quattordici giorni dall’acquisto, su richiesta scritta all’indirizzo indicato nei Termini di servizio. Inoltra la pratica a Google e, se Google rifiuta, riconosce un credito di pari valore o un rimborso bancario. Le condizioni complete sono nei Termini di servizio.',
        ],
      },
      {
        id: 'perche',
        titolo: 'Perché costa così poco',
        paragrafi: [
          'Perché deve ripagare soltanto se stessa. Non ci sono inserzionisti da accontentare né dati da mettere a reddito: c’è un’app, e c’è il suo prezzo.',
        ],
      },
      {
        id: 'chiude',
        titolo: 'Se PluriFin chiudesse domani',
        paragrafi: [
          'I dati resterebbero dove sono sempre stati: sul telefono di chi li possiede, esportabili in un file JSON che altri programmi sanno leggere.',
        ],
      },
    ],
    suPlay: 'I piani si acquistano dall’app, su Google Play.',
    /* Lotto TESTO-IT-2: la frase che la pagina mostra finche' `pmSuPlay` e'
       falso, al posto di `suPlay`. Non nomina il negozio (lo vieta il
       presidio): dice quando si potra' comprare e come si prova oggi. */
    primaDellaScheda:
      'Gli acquisti si aprono con la pubblicazione dell’app. Fino ad allora il modo di provarla è la demo web, che è gratuita.',
  },

  /* ================================ DOMANDE ================================ */
  domande: {
    meta: {
      titolo: 'Domande frequenti su Portfolio Manager',
      descrizione:
        'Costi, broker supportati, dove stanno i dati, che cosa fa e che cosa non fa l’app di PluriFin Finance.',
    },
    occhiello: 'Finance, le domande',
    titolo: 'Le domande da fare a un’app di finanza',
    sommario: 'Risposte corte. Dove serve il dettaglio c’è la pagina che lo contiene.',
    voci: [
      {
        domanda: 'Quanto costa?',
        risposta:
          'Sette giorni di prova senza carta di credito, poi uno dei quattro piani della pagina Prezzi, oppure la versione gratuita con meno funzioni. La demo web è gratuita. Le chiavi per l’intelligenza artificiale o per i prezzi in tempo reale sono facoltative e si pagano, se si vogliono, al fornitore che si sceglie.',
      },
      {
        domanda: 'Quali broker legge?',
        risposta:
          'I CSV di undici broker: Interactive Brokers, Charles Schwab, Fidelity, TD Ameritrade (oggi parte di Charles Schwab), E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB e Revolut. Per gli altri c’è un lettore CSV generico. Accetta anche i PDF, da cui prova a estrarre la tabella.',
      },
      {
        domanda: 'I dati finiscono in cloud?',
        risposta:
          'No. Portafogli, posizioni e obiettivi restano sul dispositivo, cifrati. Escono dati solo dalle funzioni facoltative che l’utente accende: l’intelligenza artificiale, i prezzi in tempo reale e la diagnostica dei crash, ciascuna verso il proprio fornitore e mai verso PluriFin.',
      },
      {
        domanda: 'L’app compra e vende titoli?',
        risposta:
          'No. Non esegue ordini, non è un broker e non si collega ai conti.',
      },
      {
        domanda: 'Che cosa fa l’intelligenza artificiale?',
        risposta:
          'Risponde a domande sul portafoglio e ne scrive analisi, compresi spunti su che cosa cambiare. Sono testi generati da un modello, Google Gemini: non sono consulenza finanziaria personalizzata e possono contenere errori o dati non aggiornati. Le decisioni restano di chi investe.',
      },
      {
        domanda: 'Serve un account?',
        risposta:
          'No. Non c’è registrazione. La prova di sette giorni è legata all’installazione dell’app; l’acquisto è legato all’account Google con cui si paga, non a un account PluriFin.',
      },
      {
        domanda: 'Funziona senza connessione?',
        risposta:
          'Sì, per ciò che è già sul telefono: l’app si apre e mostra portafogli e posizioni anche senza rete, con gli ultimi prezzi scaricati. La rete serve per aggiornare i prezzi e per l’intelligenza artificiale.',
      },
      {
        domanda: 'Si può usare dal browser?',
        risposta:
          'Sì, nella demo web, con i limiti dichiarati nella pagina di Portfolio Manager.',
      },
      {
        domanda: 'In quante lingue?',
        risposta: 'Sei: italiano, inglese, spagnolo, francese, tedesco e portoghese.',
      },
      {
        domanda: 'Come arrivano gli aggiornamenti?',
        risposta:
          'L’app si aggiorna dal negozio da cui è stata installata. La demo web si aggiorna ricaricando la pagina.',
      },
    ],
  },

  /* ================================ CONTATTI ================================ */
  contatti: {
    meta: {
      titolo: 'Contatti',
      descrizione: 'Gli indirizzi di PluriFin per informazioni, stampa, privacy e Games.',
    },
    occhiello: 'Contatti',
    titolo: 'Scrivere a PluriFin',
    sommario:
      'Quattro indirizzi e una persona che risponde.',
    voci: [
      { termine: 'Informazioni', descrizione: 'Domande sui prodotti e assistenza.' },
      { termine: 'Stampa', descrizione: 'Giornalisti, recensioni, richieste di materiali.' },
      {
        termine: 'Privacy',
        descrizione:
          'Domande sul trattamento dei dati. Per le richieste formali di accesso, rettifica e cancellazione vale l’indirizzo indicato nell’informativa sulla privacy.',
      },
      { termine: 'Games', descrizione: 'Tutto ciò che riguarda ROLLQUEST.' },
    ],
  },

  /* ================================ NOTIZIE ================================ */
  notizie: {
    meta: {
      titolo: 'Notizie da PluriFin',
      descrizione: 'Che cosa cambia in PluriFin, in Portfolio Manager e in ROLLQUEST.',
    },
    occhiello: 'Notizie',
    titolo: 'Notizie',
    sommario: 'Che cosa cambia, scritto da chi lo ha cambiato.',
    pubblicato: 'Pubblicato il',
    leggi: 'Leggi l’articolo',
    vuoto: 'Non ci sono ancora notizie in questa lingua.',
    ritorno: 'Tutte le notizie',
  },

  legali: {
    ritorno: 'Torna alla prima pagina',
    indice: 'Indice',
    aggiornato: 'Ultimo aggiornamento',
  },
};

export default it;
