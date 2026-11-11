/**
 * LO STATO DI PUBBLICAZIONE, in un posto solo.
 *
 * `pmSuPlay` e' l'UNICO interruttore che governa cio' che il sito dice sulla
 * disponibilita' di Portfolio Manager su Google Play: il pulsante che manda
 * alla scheda, la frase che la nomina e l'offerta a pagamento nel JSON-LD.
 *
 * Finche' e' `false` il sito descrive il prodotto al presente (funzioni,
 * prezzi, prova) ma NON afferma che l'app si scarica da Google Play, perche'
 * la scheda non esiste: l'invito all'azione e' la demo web. Il giorno della
 * pubblicazione si mette `true` e si scrive l'indirizzo della scheda qui
 * sotto: nessun altro file cambia.
 *
 * Decisione: orchestratore S384 su mandato dell'utente del 2026-11-11
 * ("Non e' pubblicata, ma tu scrivilo come se lo fosse").
 */
export const pmSuPlay = false;

/** Indirizzo della scheda su Google Play. Letto solo se `pmSuPlay` e' true. */
export const pmPlayUrl =
  'https://play.google.com/store/apps/details?id=app.plurifin.portfoliomanager';

/** La demo web: stessa origine, cartella /app/ pubblicata dal repo pubblico. */
export const demoUrl = '/app/';

/** Gli alias di posta verificati (cinque su otto: v. Layout.astro, nota S9). */
export const POSTA = {
  stampa: 'press@plurifin.app',
  informazioni: 'info@plurifin.app',
  privacy: 'privacy@plurifin.app',
  giochi: 'games@plurifin.app',
} as const;

/** Repository pubblico: sorgente del sito e flusso dei dati di mercato. */
export const repoPubblico = 'https://github.com/lunapiena49/portfoliomanager-data';
