// IL LISTINO DELLA PRIMA PAGINA: tre rialzi e tre ribassi, estratti in BUILD
// dal flusso pubblico `top_movers.json`.
//
// Perche' in build e non nel browser (S384):
//  - la home scaricava il file intero, 1,41 MB, per mostrarne dieci righe;
//  - lo scriveva nella pagina con `innerHTML` senza controllare i simboli: un
//    simbolo alterato a monte diventava codice sull'origine dove la demo tiene
//    chiavi e portafogli (audit di sicurezza S384, rilievo M2).
// Qui il file si legge una volta, sul server di build, ogni riga passa da una
// validazione, e nell'HTML finiscono solo testo e numeri.
//
// Il file sta in posti diversi nei due repo:
//  - repo pubblico (da cui il sito si pubblica):  <radice>/dist/market-data/
//  - repo dell'app (dove vive questo sorgente):    <radice>/dist/market-data/
// e la cartella del sito sta a profondita' diverse: per questo i candidati
// sono due, piu' la variabile MARKET_DATA_DIR che li scavalca.
import { readFileSync } from 'node:fs';
import path from 'node:path';

/** Un simbolo di borsa: lettere maiuscole, cifre, punto e trattino. */
export const SIMBOLO = /^[A-Z0-9.-]{1,12}$/;
const DATA = /^\d{4}-\d{2}-\d{2}$/;
const VALUTA = /^[A-Z]{3}$/;

/** Una riga del flusso -> una riga pulita, oppure null se non regge. */
export function riga(m) {
  if (m === null || typeof m !== 'object') return null;
  const simbolo = typeof m.symbol === 'string' ? m.symbol : m.ticker;
  if (typeof simbolo !== 'string' || !SIMBOLO.test(simbolo)) return null;
  const prezzo = m.price;
  if (typeof prezzo !== 'number' || !Number.isFinite(prezzo) || prezzo <= 0) return null;
  const variazione = m.change_percent;
  if (typeof variazione !== 'number' || !Number.isFinite(variazione)) return null;
  if (variazione <= -100 || variazione > 1000) return null;
  const valuta = typeof m.currency === 'string' && VALUTA.test(m.currency) ? m.currency : null;
  if (valuta === null) return null;
  return { simbolo, prezzo, valuta, variazione };
}

/**
 * Dal flusso intero al listino della pagina. Rende null, mai un listino a
 * meta': se mancano la data o `quanti` righe valide per parte, il blocco non
 * si pubblica.
 */
export function estrai(flusso, quanti = 3) {
  if (flusso === null || typeof flusso !== 'object') return null;
  const data = flusso.as_of_date;
  if (typeof data !== 'string' || !DATA.test(data)) return null;
  if (!Array.isArray(flusso.gainers) || !Array.isArray(flusso.losers)) return null;
  const rialzi = flusso.gainers.map(riga).filter((r) => r !== null && r.variazione > 0);
  const ribassi = flusso.losers.map(riga).filter((r) => r !== null && r.variazione < 0);
  if (rialzi.length < quanti || ribassi.length < quanti) return null;
  return {
    data,
    rialzi: rialzi.slice(0, quanti),
    ribassi: ribassi.slice(0, quanti),
  };
}

/** I posti dove cercare `top_movers.json`, in ordine. */
export function candidati(radiceSito, ambiente = process.env) {
  const posti = [];
  if (ambiente.MARKET_DATA_DIR) posti.push(path.resolve(ambiente.MARKET_DATA_DIR));
  posti.push(path.resolve(radiceSito, '..', 'dist', 'market-data'));
  posti.push(path.resolve(radiceSito, '..', '..', '..', '..', '..', 'dist', 'market-data'));
  return posti.map((cartella) => path.join(cartella, 'top_movers.json'));
}

/**
 * Legge il primo candidato che esiste e regge. Rende
 * `{ listino, percorso }` oppure `{ listino: null, motivo }`.
 */
export function leggi(percorsi, quanti = 3) {
  const motivi = [];
  for (const percorso of percorsi) {
    let testo;
    try {
      testo = readFileSync(percorso, 'utf8');
    } catch {
      motivi.push(`${percorso}: assente`);
      continue;
    }
    let flusso;
    try {
      flusso = JSON.parse(testo);
    } catch {
      motivi.push(`${percorso}: JSON non valido`);
      continue;
    }
    const listino = estrai(flusso, quanti);
    if (listino === null) {
      motivi.push(`${percorso}: contenuto non valido`);
      continue;
    }
    return { listino, percorso };
  }
  return { listino: null, motivo: motivi.join('; ') };
}
