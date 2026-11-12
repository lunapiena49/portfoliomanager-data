/**
 * LO SCHEMA DEI TESTI del sito rifatto in S384 ("Il giorno di PluriFin").
 *
 * Dalla corsia B6 e' l'unico: lo schema `Translations` e i sei dizionari
 * del telaio vecchio sono usciti. Restano questo file, la cartella `testi/`
 * e `lingue.ts` (l'elenco delle lingue e la costruzione degli indirizzi).
 *
 * Regole dello schema:
 *  - una chiave, una frase: niente HTML dentro le stringhe. I nomi propri
 *    (PluriFin, Portfolio Manager, ROLLQUEST) li marca `Prosa.astro` con
 *    `translate="no"`; i collegamenti sono campi a parte.
 *  - i prezzi sono stringhe gia' formattate nella lingua (virgola o punto,
 *    spazio non separabile prima del simbolo): il listino canonico e'
 *    `legal/play_console/LISTINO_CANONICO.md` del repo dell'app.
 *  - `it` e' la lingua sorgente. Una lingua nuova si aggiunge creando
 *    `testi/<lingua>.ts` con lo stesso identico insieme di chiavi: lo verifica
 *    `integrations/giorno.test.mjs` (parita' delle chiavi) e
 *    `integrations/sei-lingue.test.mjs` (pagine, prezzi, tipografia).
 */
import type { Locale } from './lingue';

export interface Meta {
  titolo: string;
  descrizione: string;
}

/** Un capitolo di un articolo: titolo e paragrafi in ordine. */
export interface Capitolo {
  id: string;
  titolo: string;
  paragrafi: string[];
}

/** Una riga di elenco descrittivo: termine e sua spiegazione. */
export interface Voce {
  termine: string;
  descrizione: string;
}

export interface Domanda {
  domanda: string;
  risposta: string;
}

/** Gli identificativi dei quattro piani: quelli del listino canonico. */
export type IdPiano = 'single_annual' | 'single_lifetime' | 'family_annual' | 'family_lifetime';

export interface Piano {
  id: IdPiano;
  nome: string;
  prezzo: string;
  perChi: string;
  rinnovo: string;
}

/** Un articolo: l'ossatura comune delle pagine lunghe. */
export interface Articolo {
  meta: Meta;
  occhiello: string;
  titolo: string;
  sommario: string;
  capitoli: Capitolo[];
}

export interface Testi {
  lingua: Locale;

  comune: {
    salta: string;
    navEtichetta: string;
    nav: { finance: string; games: string; casa: string; notizie: string };
    lingua: string;
    azioni: {
      demo: string;
      play: string;
      prezzi: string;
      finance: string;
      games: string;
      notizie: string;
      scrivi: string;
    };
    avvisoFinance: string;
    avvisoFinanceLungo: string;
    datiEsempio: string;
    colophon: {
      riga: string;
      stampa: string;
      informazioni: string;
      privacy: string;
      giochi: string;
      lingue: string;
      pagine: string;
      legali: string;
      voci: {
        prezzi: string;
        domande: string;
        contatti: string;
        stampa: string;
        informativa: string;
        termini: string;
        avvertenza: string;
        dmca: string;
        codice: string;
      };
      diritti: string;
    };
  };

  home: {
    meta: Meta;
    occhiello: string;
    titolo: string;
    sommario: string;
    casa: { titolo: string; paragrafi: string[] };
    finance: {
      rubrica: string;
      titolo: string;
      passi: string[][];
      listinoTitolo: string;
      listinoNota: string;
      colonne: { piano: string; prezzo: string };
      palco: { testa: string; valuta: string; totale: string; sigillo: string };
    };
    mercato: {
      titolo: string;
      nota: string;
      colonne: { titolo: string; chiusura: string; variazione: string };
      rialzi: string;
      ribassi: string;
      seduta: string;
    };
    imbrunire: string;
    games: {
      rubrica: string;
      titolo: string;
      passi: string[][];
      palco: { ascesa: string; cima: string };
    };
  };

  finance: Articolo & {
    broker: { titolo: string; generico: string };
    dati: { titolo: string; premessa: string; voci: Voce[]; chiusa: string };
    prezzi: { titolo: string; testo: string };
    provare: { titolo: string; demo: string; suPlay: string };
    /** Il palco del telefono (S384, corsia B1): il nome del gruppo di schede e,
     *  per ogni schermata vera dell'app, `termine` = l'etichetta della scheda,
     *  `descrizione` = il testo alternativo dell'immagine. L'ordine e' quello di
     *  `strumenti/schermate.mjs`: portafoglio, mercato, ribilanciamento, analisi. */
    palco: { titolo: string; schermate: Voce[] };
  };

  games: Articolo & {
    /** L'alt dell'insegna: l'immagine del marchio del gioco (W3 AVORIO, S387),
     *  in testa alla pagina di Games e alla sezione Games della prima pagina.
     *  E' il NOME, uguale nelle sei lingue (l'alt di un logo dice cio' che il
     *  logo scrive, non "il logo di": revisione di design S387, WMFIX). */
    marchio: string;
    stato: { titolo: string; paragrafi: string[] };
    /** La didascalia delle immagini della pagina (corsia B2): da dove
     *  vengono e che cosa e' una resa fatta per il sito. */
    immagini: string;
  };

  casa: Articolo & {
    /** Chi risponde davanti alla legge: la forma giuridica, detta in chiaro
     *  (corsia B3). Nessuna forma societaria che i registri non riportano. */
    titolare: { titolo: string; testo: string };
    nonFa: { titolo: string; voci: string[] };
    contatti: { titolo: string; testo: string };
  };

  stampa: {
    meta: Meta;
    occhiello: string;
    titolo: string;
    sommario: string;
    inBreve: { titolo: string; voci: Voce[] };
    /** La forma giuridica, per chi deve scriverla giusta (corsia B3). */
    formaGiuridica: Voce;
    finance: { titolo: string; voci: Voce[] };
    games: { titolo: string; voci: Voce[] };
    pronti: { titolo: string; premessa: string; riga: string; paragrafo: string };
    materiali: { titolo: string; voci: Voce[]; uso: string };
    contatto: { titolo: string; testo: string };
  };

  prezzi: {
    meta: Meta;
    occhiello: string;
    titolo: string;
    sommario: string;
    colonne: { piano: string; prezzo: string; perChi: string; rinnovo: string };
    piani: Piano[];
    nota: string;
    capitoli: Capitolo[];
    suPlay: string;
    /** Mostrata al posto di `suPlay` finche' `pmSuPlay` e' falso: quando si
     *  potra' comprare e come si prova oggi. Non nomina il negozio. */
    primaDellaScheda: string;
  };

  domande: {
    meta: Meta;
    occhiello: string;
    titolo: string;
    sommario: string;
    voci: Domanda[];
  };

  contatti: {
    meta: Meta;
    occhiello: string;
    titolo: string;
    sommario: string;
    voci: Voce[];
  };

  notizie: {
    meta: Meta;
    occhiello: string;
    titolo: string;
    sommario: string;
    pubblicato: string;
    leggi: string;
    vuoto: string;
    ritorno: string;
  };

  legali: {
    ritorno: string;
    indice: string;
    aggiornato: string;
  };
}

/** I dizionari presenti. Si importano staticamente: una lingua mancante e'
 *  un errore di build, non una pagina che esce in un'altra lingua. */
const DIZIONARI = import.meta.glob<{ default: Testi }>('./testi/*.ts', { eager: true });

export const LINGUE_PRONTE: Locale[] = Object.keys(DIZIONARI)
  .map((percorso) => percorso.replace(/^\.\/testi\//, '').replace(/\.ts$/, '') as Locale)
  .sort();

export function testi(lingua: Locale): Testi {
  const modulo = DIZIONARI[`./testi/${lingua}.ts`];
  if (!modulo) {
    throw new Error(
      `testi mancanti per la lingua "${lingua}": crea src/i18n/testi/${lingua}.ts ` +
        `con le stesse chiavi di it.ts (pronte oggi: ${LINGUE_PRONTE.join(', ')})`,
    );
  }
  return modulo.default;
}
