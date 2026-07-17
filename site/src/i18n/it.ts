import type { Translations } from './index';

/* ITALIANO - la lingua sorgente. Le altre cinque derivano da questa.
 *
 * File di LOCALIZZAZIONE, non di codice: UTF-8 con gli accenti veri
 * (invariante 4 del CLAUDE.md di radice). "Funzionalita'" su un sito
 * pubblico italiano e' un errore di ortografia, non una scelta di encoding.
 *
 * NUMERI E PREZZI: qui si scrive solo cio' che e' stato VERIFICATO nel
 * codice, non cio' che il press kit sperava. In S11 tre affermazioni sono
 * risultate false e sono state corrette:
 *   - "dodici broker": i parser nativi sono UNDICI (parser_factory.dart);
 *     il dodicesimo era il lettore CSV generico, che non e' un broker.
 *   - "non integra SDK di crash reporting": l'app integra Crashlytics
 *     (pubspec.yaml). E' opt-in e spento di default: e' questo che va detto.
 *   - "l'app e' gratuita": e' a pagamento, con 7 giorni di prova.
 */
const it: Translations = {
  lang: 'it',
  dir: 'ltr',
  meta: {
    title: 'PluriFin — Il tuo portafoglio, sotto controllo',
    description: 'Portfolio Manager: workspace multipiattaforma per intelligence di portafoglio. Privacy-first, no-cloud, multi-broker.',
    ogTitle: 'Portfolio Manager by PluriFin',
    ogDescription: 'Workspace privacy-first per intelligence di portafoglio. Import CSV da 11 broker, analisi AI, obiettivi.',
  },
  nav: {
    features: 'Funzionalità',
    privacy: 'Privacy',
    brokers: 'Broker',
    faq: 'FAQ',
    openApp: 'Apri webapp',
    notifyLaunch: 'Avvisami al lancio',
    langLabel: 'Lingua',
  },
  hero: {
    h1Line1: 'Il tuo portafoglio,',
    h1Line2: 'sotto controllo.',
    sub: "Workspace professionale multipiattaforma per intelligence di portafoglio. Importi gli estratti dei tuoi broker, fai analisi con l'AI e pianifichi i tuoi obiettivi — tutto sul tuo dispositivo.",
    ctaPre1: 'Avvisami al lancio',
    ctaPre2: 'Apri webapp',
    ctaPre3: 'Presto su Google Play',
    ctaLive1: 'Disponibile su Google Play',
    ctaLive2: 'Apri webapp',
    ctaLive3: 'Iscriviti agli aggiornamenti',
    trust1: '7 giorni di prova, senza carta',
    trust2: 'Dati solo sul tuo dispositivo',
    trust3: '11 broker supportati',
    comingSoon: 'In arrivo',
    availableOn: 'Disponibile su',
  },
  features: {
    eyebrow: 'Funzionalità',
    h2: 'Quattro strumenti, un unico portafoglio.',
    lede: "Importi gli estratti, fai domande all'AI, pianifichi gli obiettivi e mantieni le chiavi al sicuro. Senza account, senza cloud.",
    card1Title: 'Importa dal tuo broker',
    card1Body: "Importi file CSV da broker supportati, controlli l'anteprima delle righe e gestisci i duplicati prima del salvataggio.",
    card2Title: 'Analisi AI e chat',
    card2Body: 'Analisi basata su Gemini. Fai domande sul portafoglio e generi valutazioni su rischio, allocazione e performance.',
    card3Title: 'Obiettivi di investimento',
    card3Body: 'Pianifichi obiettivi finanziari di breve, medio e lungo termine. Vedi i contributi mensili necessari.',
    card4Title: 'Privacy by design',
    card4Body: 'Le chiavi API sono gestite localmente. Decidi tu provider, aggiornamento dei dati e quando inviare richieste esterne.',
  },
  brokers: {
    eyebrow: 'Broker supportati',
    h2: 'Undici broker letti nativamente, più il lettore CSV generico.',
    lede: "L'app riconosce il formato dell'estratto, mappa i campi e gestisce i duplicati con strategie di merge configurabili.",
    foot: "Non vedi il tuo broker? L'import generico CSV permette di mappare qualsiasi estratto.",
  },
  privacy: {
    eyebrow: 'Privacy e sicurezza',
    h2: 'La tua privacy, prima di tutto.',
    intro: 'Portfolio Manager è progettato per vivere sul tuo dispositivo. Prima di iniziare, leggi i principi che guidano il trattamento dei tuoi dati.',
    b1Title: 'Dati solo sul tuo dispositivo',
    b1Body: "Portafogli, posizioni, obiettivi e impostazioni restano in locale. Non esiste un server dell'app a cui vengono inviati.",
    b2Title: 'Chiavi API protette dal sistema',
    b2Body: 'Le chiavi Gemini, EODHD e FMP sono cifrate tramite il keystore del sistema operativo (Keychain, Android Keystore, DPAPI).',
    /* Prima qui c'era scritto: "non integra SDK di analytics o crash reporting
       di terze parti". Falso: l'app integra Firebase Crashlytics. La verita' e'
       piu' precisa e, per chi legge, migliore: c'e', ma e' SPENTO finche' non
       lo accendi tu (crash_service.dart, _defaultEnabled = false). */
    b3Title: 'Nessun tracciamento, diagnostica solo se la accendi tu',
    b3Body: "L'app non invia eventi d'uso e non raccoglie identificativi pubblicitari: nessun SDK di analytics è integrato. La diagnostica dei crash (Firebase Crashlytics, solo Android) è disattivata di default e si accende solo se la attivi tu dalle Impostazioni.",
    b4Title: 'Controllo totale sui tuoi dati',
    b4Body: 'Puoi cancellare tutto in qualsiasi momento dalle Impostazioni: una singola azione rimuove portafogli, obiettivi, cache e chiavi.',
    techCallout: 'Storage Hive cifrato AES-256 + HMAC-SHA256. Chiave a 32 byte custodita nel keystore del sistema operativo.',
    cta: 'Leggi la Privacy Policy completa',
  },
  how: {
    eyebrow: 'Come funziona',
    h2: 'Tre passi, dal CSV al tuo piano.',
    step1Title: 'Importa il tuo CSV',
    step1Body: "Esporti l'estratto dal tuo broker, l'app riconosce il formato e ti mostra l'anteprima.",
    step2Title: '(Opzionale) Analizza con l\'AI',
    step2Body: "Aggiungi la tua chiave Gemini e fai domande sul portafoglio. Vedi sempre il prompt prima dell'invio.",
    step3Title: 'Imposta gli obiettivi',
    step3Body: "Pianifichi i target, l'app calcola i contributi mensili e suggerisce i ribilanciamenti.",
  },
  faq: {
    h2: 'Domande frequenti',
    /* "E' gratuito? / Si'." era falso: l'app e' a pagamento (quattro piani).
       Gratuita e' la web demo, che e' un'altra cosa e va detto quale. */
    q1: 'Quanto costa?',
    a1: "L'app Android ha 7 giorni di prova senza carta di credito, poi si sceglie un piano (prezzi su /pricing). La web demo è gratuita, con funzioni ridotte. Le chiavi API per l'AI o per i prezzi in tempo reale sono opzionali e si pagano al provider che scegli.",
    q2: 'Quali broker supportate?',
    a2: 'Undici letti nativamente: IBKR, Charles Schwab, Fidelity, TD Ameritrade, E*TRADE, Robinhood, Vanguard, DEGIRO, Trading 212, XTB, Revolut. Più un lettore generico per qualsiasi altro CSV.',
    q3: 'I miei dati vanno in cloud?',
    a3: 'No. Portafogli, posizioni e obiettivi restano sul tuo dispositivo, cifrati. Dati escono solo se attivi funzioni opzionali (AI Gemini, prezzi in tempo reale) e con la tua chiave API.',
    q4: "L'app fa trading?",
    a4: "No. Portfolio Manager non esegue ordini, non è un broker e non si collega a conti reali. È uno strumento di monitoraggio e analisi.",
    q5: "L'AI dà consigli?",
    a5: 'No. Le risposte di Gemini sono informative e possono contenere errori o dati non aggiornati. Le decisioni di investimento restano tue.',
    q6: 'Quante lingue?',
    a6: 'Sei: italiano, inglese, spagnolo, francese, tedesco, portoghese.',
    q7: 'Posso usarla dal web?',
    a7: 'Sì. La web demo è gratuita su plurifin.app/app/',
    q8: 'Come ricevo gli aggiornamenti?',
    a8: 'Tramite Google Play (aggiornamento automatico) o ricaricando la web demo. Le note di rilascio sono pubblicate sul repository GitHub.',
  },
  disclaimer: {
    h3: 'Avviso importante',
    body: "Portfolio Manager è uno strumento informativo. I contenuti e le analisi mostrati non costituiscono consulenza finanziaria, fiscale o legale ai sensi del TUF (D.Lgs. 58/1998) o di norme analoghe. PluriFin non gestisce capitali e non esegue ordini. Decidi sempre con un professionista abilitato.",
    cta: 'Leggi il disclaimer completo',
  },
  about: {
    eyebrow: 'Chi è',
    h2: 'PluriFin.',
    body: "PluriFin è Filippo Salemi, sviluppatore indipendente con base in Italia. Persona fisica, nessun conflitto d'interesse con i broker, nessuna consulenza, nessuna intermediazione. L'obiettivo è costruire strumenti che gli investitori possano possedere e controllare interamente.",
    role: 'Sviluppatore indipendente',
    location: 'Italia',
    type: 'Persona fisica',
    conflict: 'Nessun conflitto di interessi',
  },
  newsletter: {
    h2: 'Pronto al lancio?',
    sub: 'Una sola email, al lancio. Zero spam, nessun altra comunicazione — promesso.',
    cta: 'Avvisami al lancio',
  },
  modal: {
    title: 'Avvisami al lancio',
    sub: "Riceverai una sola email quando l'app sarà disponibile su Google Play. Nient'altro.",
    emailLabel: 'Email',
    langLabel: 'Lingua preferita',
    gdpr: 'Acconsento al trattamento della mia email per ricevere una notifica al lancio. Posso revocare il consenso scrivendo a gdpr@plurifin.app.',
    submit: 'Avvisami',
    success: 'Grazie! Ti scriveremo solo una volta, al lancio.',
  },
  footer: {
    tagline: 'Il tuo portafoglio, sotto controllo.',
    copyright: '© 2026 PluriFin · Filippo Salemi',
    colProduct: 'Prodotto',
    colLegal: 'Legali',
    colContact: 'Contatti',
    linkWebapp: 'Apri webapp',
    linkPlayStore: 'Google Play',
    linkChangelog: 'Changelog',
    linkPrivacy: 'Privacy Policy',
    linkTerms: 'Termini di servizio',
    linkDisclaimer: 'Disclaimer',
    linkGdpr: 'Contatto GDPR',
    linkContact: 'Contattaci',
    linkEmail: 'Email',
    linkGithub: 'GitHub',
    linkAbout: 'Chi siamo',
    bundleId: 'app.plurifin.portfoliomanager',
  },
  legal: {
    backHome: 'Torna alla home',
  },
  contact: {
    eyebrow: 'Contatti',
    h1: 'Scrivici',
    intro: 'Per supporto tecnico, domande o richieste GDPR. Rispondiamo entro 2-3 giorni lavorativi.',
    generalTitle: 'Email generale',
    gdprTitle: 'Richieste GDPR e privacy',
    githubTitle: 'GitHub',
    pressTitle: 'Stampa e media',
  },  webdemo: {
    eyebrow: 'Prova subito',
    h2: 'Web demo gratuita o app Android completa: scegli da dove partire.',
    lede: "Stessa app, due percorsi. Provala nel browser senza installare nulla, oppure usa l'app Android per sbloccare import, AI e mercato in tempo reale.",
    demo: {
      title: 'Web demo gratuita',
      subtitle: 'Senza installazione. Resta nel browser.',
      limits: [
        'Massimo 5 posizioni inserite manualmente',
        'Niente import CSV/PDF dai broker',
        'Dati di mercato aggiornati settimanalmente',
        'Obiettivi e analisi AI non disponibili',
        'Tutti i dati restano nel tuo browser, mai sui nostri server',
      ],
      cta: 'Apri la web demo',
    },
    android: {
      title: 'App Android completa',
      subtitle: '7 giorni di prova senza carta, poi scegli il piano',
      features: [
        'Import CSV/PDF da 11 broker (IBKR, Schwab, DEGIRO, Revolut, …) più il lettore CSV generico',
        'Dati di mercato in tempo reale con la tua chiave',
        'Obiettivi finanziari e grafici di avanzamento',
        'Analisi e chat AI con la tua chiave Gemini',
        'Posizioni illimitate, multi-portafoglio, export PDF',
        'Tutti i dati cifrati AES-256 in locale',
        'Piani annuali o una tantum, anche per la famiglia',
      ],
      cta_pre: 'Avvisami al lancio',
      cta_live: 'Scarica per Android',
      pricing: 'Vedi i piani',
    },
  },

  /* ===================== PLURIFIN, LO STUDIO ===================== */
  company: {
    gate: {
      kicker: 'Studio di software indipendente',
      line1: 'PluriFin progetta e sviluppa applicazioni per Android: codice, grafica e testi, in sei lingue.',
      line2: 'Ha due divisioni. <span class="f">Finance</span> costruisce strumenti per gestire il proprio denaro. <span class="g">Games</span> costruisce giochi.',
      line3: 'Mestieri diversi, stesso metodo: <b>si lavora finché la cosa funziona davvero, poi si pubblica</b>.',
      enter: 'Entra',
      skip: "Salta l'introduzione",
      divFinance: '<b>Finance</b> — Portfolio Manager',
      divGames: '<b>Games</b> — ROLLQUEST',
    },
    nav: {
      finance: 'Finance',
      games: 'Games',
      studio: 'Lo studio',
    },
    hero: {
      h1a: 'Due divisioni.',
      h1b: 'Due mestieri diversi.',
      lede: 'PluriFin è uno studio indipendente con base in Italia. Progetta, scrive, disegna e traduce ogni applicazione internamente, poi la pubblica. Le due divisioni non si somigliano: scegli quella che ti riguarda.',
    },
    financeBand: {
      lab: 'PluriFin Finance',
      h2: 'Portfolio Manager',
      lede: 'Un patrimonio distribuito su più broker e più valute non si legge da nessuna parte: per sapere quanto c\'è davvero bisogna aprire quattro applicazioni e rimettere insieme i numeri a mano. <b>Portfolio Manager li rimette insieme lui</b>, direttamente sul telefono.',
      /* "I dati non escono dal dispositivo" era troppo largo: l'app SCARICA i
         dati di mercato (traffico in entrata) e, se accendi la diagnostica,
         invia i crash. Cio' che non esce e' il PORTAFOGLIO - ed e' l'unica
         cosa che al lettore interessa davvero. */
      fact1: "<b>Il tuo portafoglio non esce dal dispositivo.</b> Resta cifrato sul telefono: non esiste un server PluriFin a cui consegnarlo, e l'export in un file portabile è sempre a un tocco.",
      fact2: '<b>Undici broker letti nativamente</b>, dagli statunitensi agli europei, più un lettore CSV per tutti gli altri. Anteprima delle righe e controllo dei duplicati prima di salvare.',
      fact3: '<b>Sette giorni di prova, senza carta di credito.</b> Poi scegli un piano annuale oppure paghi una volta sola, per sempre.',
      statBrokers: 'broker letti nativamente',
      statLangs: 'lingue',
      statServers: 'dati sui nostri server',
      cta: 'Vedi Portfolio Manager',
      tickerCap: "Prezzi aggiornati ogni notte e lasciati pubblici: sono gli stessi che scarica l'app.",
    },
    gamesBand: {
      lab: 'PluriFin Games',
      h2: 'ROLLQUEST',
      lede: 'Si tira un dado, si sale una torre, si diventa più forti. Cinque eroi, quattro minigiochi, e una regola scritta prima di ogni altra cosa: <b>chi non spende deve poter arrivare in cima</b>.',
      fact1: '<b>Le monete comprano tempo, mai potere.</b> Chi gioca gratis resta competitivo: se un bilanciamento tradisce la regola, si cambia il bilanciamento.',
      fact2: '<b>Disegnato a mano, in alta definizione.</b> Nessun asset comprato, nessuna scorciatoia: la Torre, gli eroi e i dadi nascono qui.',
      fact3: '<b>Sei lingue dal primo giorno.</b> Non a lancio avvenuto: dal primo giorno, perché tradurre dopo vuol dire non tradurre mai.',
      cta: 'Entra nel cantiere',
      dieHint: 'muovi il mouse per girarlo · clicca per lanciarlo',
      dieAria: 'Lancia il dado',
      sceneAlt: 'Rollo e Re Corvax davanti alla Torre, con il dado sospeso a mezz\'aria.',
    },
    studio: {
      h3: 'Lo studio',
      body: "Dietro PluriFin c'è una persona sola: Filippo Salemi, sviluppatore indipendente, in Italia. Nessun investitore alle spalle, nessun consiglio di amministrazione da accontentare. Si costruisce, si pubblica, si risponde alle email.",
      press: 'press@plurifin.app',
      pressKit: 'Press kit',
    },
  },

  /* ===================== ROLLQUEST (divisione Games) ===================== */
  games: {
    meta: {
      title: 'ROLLQUEST — PluriFin Games',
      description: 'Un dado, una torre, cinque eroi. Il gioco in sviluppo della divisione Games di PluriFin: chi non spende deve poter arrivare in cima.',
    },
    hero: {
      eyebrow: 'PluriFin Games',
      h1: 'ROLLQUEST',
      lede: 'Si tira un dado, si sale una torre, si diventa più forti. <b>Chi non spende deve poter arrivare in cima</b>: è la regola scritta prima del resto, ed è quella che decide ogni bilanciamento.',
      /* IN SVILUPPO. Nessuna data, nessuno store, nessun "preordina": il
         progetto Unity non ha ancora nemmeno una scena. Dire altro sarebbe
         la stessa bugia dei prezzi di un prodotto che non esiste. */
      status: 'In sviluppo. Non c\'è ancora una data, e non la inventiamo: quando ci sarà qualcosa da giocare, lo si dirà qui.',
    },
    pillars: {
      h2: 'Tre regole, scritte prima del codice.',
      p1Title: 'Le monete comprano tempo, mai potere',
      p1Body: 'Chi gioca senza spendere resta competitivo. Non è una promessa di marketing: è un vincolo di progetto. Se un bilanciamento la tradisce, si cambia il bilanciamento, non la regola.',
      p2Title: 'Disegnato a mano, da zero',
      p2Body: 'Nessun asset comprato, nessuna scorciatoia. La Torre, gli eroi, i dadi e le animazioni nascono qui: originali, e visivamente distinti da qualsiasi altra cosa.',
      p3Title: 'Sei lingue dal primo giorno',
      p3Body: 'Italiano, inglese, spagnolo, francese, tedesco, portoghese — tutte insieme, dal primo commit. Tradurre dopo vuol dire non tradurre mai.',
    },
    cast: {
      h2: 'Chi ci trovi dentro',
      lede: 'Personaggi originali, disegnati per questo gioco. La Torre si sale un piano alla volta: i piani si contano, perché salirli è il gioco.',
      rolloName: 'Rollo',
      rolloBody: "Corpo a pera, elmo semisferico con visiera a una fessura, scudo esagonale sulla schiena. È l'unità di misura della scena: tutto il resto è alto in Rollo.",
      corvaxName: 'Re Corvax',
      corvaxBody: 'Becco lungo, corona a tre punte storta, mantello di piume che finisce a zig-zag. Alto e triangolare: la massa si apre solo sotto le spalle.',
    },
    followUp: {
      h2: 'Vuoi sapere quando si gioca?',
      body: 'Non c\'è una newsletter di Games, e non ne apriamo una per raccogliere indirizzi. Quando ci sarà un teaser vero, verrà pubblicato sul blog e annunciato qui.',
      cta: 'Leggi il blog',
    },
  },
};

export default it;
