// L'AVVISO DI 30 GIORNI SUI DOCUMENTI LEGALI DI PORTFOLIO MANAGER.
//
// Decisione dell'utente D-S397-PM-AVVISO-SITO-NUOVO-30 (S397): "dal giorno in
// cui si pubblicano informativa 1.0.5 e Termini 1.1.2 parte un nuovo avviso di
// 30 giorni sul sito". Sostituisce l'avviso del S389 (NU-S389-PM-BANNER-1-0-4,
// fine 2026-12-14), che non e' mai andato in linea: misurato in S398, il sito
// serviva ancora privacy 1.0.3, Termini 1.1.0 e disclaimer 1.0.0
// (storico/harness/S398/PM_AVVISO_MANIFEST.md). La pubblicazione porta quindi in
// linea tre documenti nuovi, e l'avviso li nomina tutti e tre con la versione.
//
// Perche' l'avviso esiste: i Termini 1.1.0 (sez. 9) e la privacy 1.0.3
// (sez. 11), i testi che gli utenti hanno accettato e che il sito serve,
// promettono un avviso sul sito per 30 giorni a ogni modifica sostanziale.
//
// UN SOLO PUNTO DI VERITA': `pubblicato`, il giorno (ora di Roma) in cui il sito
// serve per la prima volta le versioni di `documenti`. Inizio, fine e data
// mostrata derivano da li'; nessun'altra data si scrive a mano. Finche' vale
// null l'avviso non si mostra: i documenti non sono ancora in linea. Chi
// pubblica (il main loop, con la PR al repo pubblico) scrive qui il giorno del
// merge. Se se ne dimentica, il repo pubblico non costruisce: il test
// integrations/avviso-legale.test.mjs confronta `documenti` con dist/legal/ e
// pretende `pubblicato` quando le versioni coincidono.
//
// Come sparisce, senza mani: la testata lo scrive solo se `avvisoAttivo` e'
// vero all'istante della build, e il sito si ricostruisce ogni giorno
// (site-deploy.yml, cron proprio alle 23:10 UTC = 00:10 a Roma d'inverno, 01:10
// d'estate). Niente script nel browser: le pagine legali e di servizio non ne
// eseguono per contratto (integrations/costruito/servizio.test.mjs). Il ritardo
// possibile e' quello di un cron mancato: qualche ora o un giorno in PIU', mai
// uno in meno.
// ASCII-only: questo file e' codice.

export const AVVISO_LEGALE = Object.freeze({
  /** Primo giorno in cui il sito serve i documenti qui sotto, ora di Roma,
   *  'AAAA-MM-GG'. null = non ancora pubblicati (avviso spento). */
  pubblicato: '2026-11-23',
  /** Giorni promessi: Termini 1.1.0 sez. 9, privacy 1.0.3 sez. 11. */
  giorni: 30,
  /** I documenti annunciati: `id` = nome del file in /legal/<lingua>/ (lo
   *  scrive scripts/legal/build_legal_html.ps1 dell'app), `sorgente` = file in
   *  assets/legal/<lingua>/ dell'app; versione e data della sua testata. */
  documenti: Object.freeze([
    Object.freeze({ id: 'privacy', sorgente: 'privacy_policy', versione: '1.0.5', aggiornato: '2026-11-22' }),
    Object.freeze({ id: 'terms', sorgente: 'terms_of_service', versione: '1.1.2', aggiornato: '2026-11-22' }),
    Object.freeze({ id: 'disclaimer', sorgente: 'disclaimer_financial', versione: '1.0.1', aggiornato: '2026-11-22' }),
  ]),
});

export const ID_DOCUMENTI = Object.freeze(AVVISO_LEGALE.documenti.map((d) => d.id));

/** Le lingue del sito -> il locale di Intl per la data (l'inglese del sito
 *  scrive le date all'inglese: "28 April 2026"). */
const LOCALE_DATA = Object.freeze({ it: 'it-IT', en: 'en-GB', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', pt: 'pt-PT' });
const ORA = 60 * 60 * 1000;
const GIORNO = 24 * ORA;
const GIORNO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function istante(valore, nome) {
  const t = valore instanceof Date ? valore.getTime() : typeof valore === 'number' ? valore : Date.parse(String(valore));
  if (!Number.isFinite(t)) throw new Error(`avviso-legale: ${nome} non e' un istante valido: ${String(valore)}`);
  return t;
}

/** 'AAAA-MM-GG' di calendario valido (niente 2026-02-30), altrimenti errore. */
function giornoValido(valore, nome) {
  const m = GIORNO_RE.exec(String(valore));
  const [a, me, g] = m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [];
  const d = m ? new Date(Date.UTC(a, me - 1, g)) : null;
  if (!d || d.getUTCFullYear() !== a || d.getUTCMonth() !== me - 1 || d.getUTCDate() !== g) {
    throw new Error(`avviso-legale: ${nome} non e' un giorno AAAA-MM-GG: ${String(valore)}`);
  }
  return [a, me, g];
}

const ROMA = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
});

/** Il giorno e l'ora di Roma di un istante: 'AAAA-MM-GG HH:MM:SS'. */
export function oraDiRoma(t) {
  const p = Object.fromEntries(ROMA.formatToParts(new Date(istante(t, 'istante'))).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

/** L'istante della mezzanotte di Roma che apre il giorno 'AAAA-MM-GG'
 *  (+01:00 d'inverno, +02:00 d'estate: lo dice Intl, non una costante). */
export function mezzanotteDiRoma(giorno) {
  const [a, me, g] = giornoValido(giorno, 'giorno');
  for (const scarto of [1, 2]) {
    const t = Date.UTC(a, me - 1, g) - scarto * ORA;
    if (oraDiRoma(t) === `${giorno} 00:00:00`) return t;
  }
  throw new Error(`avviso-legale: nessuna mezzanotte di Roma per ${giorno}`);
}

/** Il giorno 'AAAA-MM-GG' che viene `n` giorni di calendario dopo `giorno`. */
export function giornoDopo(giorno, n) {
  const [a, me, g] = giornoValido(giorno, 'giorno');
  return new Date(Date.UTC(a, me - 1, g + n)).toISOString().slice(0, 10);
}

/** La finestra dell'avviso, o null se non e' ancora pubblicato.
 *  inizio = mezzanotte di Roma del giorno `pubblicato`;
 *  fine = primo istante in cui NON si mostra: la mezzanotte di Roma che chiude
 *  il trentesimo giorno dopo `pubblicato` (pubblicato + 31 giorni di
 *  calendario), o quella del giorno dopo se l'ora legale toglie un'ora alla
 *  finestra. Garanzia: pubblicato a qualunque ora del primo giorno, anche
 *  all'ultimo secondo, resta su almeno 30 x 24 ore. */
export function finestraAvviso(avviso = AVVISO_LEGALE) {
  if (avviso.pubblicato === null) return null;
  giornoValido(avviso.pubblicato, 'pubblicato');
  if (!Number.isInteger(avviso.giorni) || avviso.giorni < 30) {
    throw new Error(`avviso-legale: giorni ${String(avviso.giorni)}: la promessa in vigore dice 30`);
  }
  for (const d of avviso.documenti) {
    giornoValido(d.aggiornato, `aggiornato di ${d.id}`);
    if (d.aggiornato > avviso.pubblicato) {
      throw new Error(`avviso-legale: pubblicato ${avviso.pubblicato} prima di ${d.id} ${d.aggiornato}`);
    }
  }
  const fineGiorno0 = mezzanotteDiRoma(giornoDopo(avviso.pubblicato, 1));
  let fine = mezzanotteDiRoma(giornoDopo(avviso.pubblicato, avviso.giorni + 1));
  if (fine - fineGiorno0 < avviso.giorni * GIORNO) fine = mezzanotteDiRoma(giornoDopo(avviso.pubblicato, avviso.giorni + 2));
  return { inizio: mezzanotteDiRoma(avviso.pubblicato), fine };
}

/** Vero finche' l'avviso va mostrato: da `inizio` compreso (mezzanotte di
 *  Roma di pubblicato) a `fine` esclusa. Prima di inizio e' falso: un
 *  `pubblicato` scritto in anticipo non fa dire al sito "ha pubblicato" con una
 *  data futura (strumenti/pubblica-avviso.mjs scrive solo il giorno di Roma di
 *  adesso). Non pubblicato = falso. Un valore illeggibile ferma la build invece
 *  di far sparire (o restare) l'avviso. */
export function avvisoAttivo(adesso = new Date(), avviso = AVVISO_LEGALE) {
  const t = istante(adesso, 'adesso');
  const f = finestraAvviso(avviso);
  return f !== null && t >= f.inizio && t < f.fine;
}

/** L'istante della build. `PLURIFIN_AVVISO_ADESSO` (ISO 8601) serve SOLO a
 *  provare il sito costruito a un'altra data: valore illeggibile = errore. */
export function adessoDellaBuild(ambiente = {}) {
  const forzato = ambiente.PLURIFIN_AVVISO_ADESSO;
  if (forzato === undefined || forzato === '') return new Date();
  return new Date(istante(forzato, 'PLURIFIN_AVVISO_ADESSO'));
}

/** Il giorno di calendario di Roma di un istante, 'AAAA-MM-GG'. E' il giorno
 *  che strumenti/pubblica-avviso.mjs scrive in `pubblicato`: preso da Intl, non
 *  dal fuso della macchina (S398: in Git Bash `TZ=Europe/Rome date` da' l'UTC
 *  perche' manca la zoneinfo, e fra le 23 e le 24 UTC scrive il giorno prima). */
export function giornoDiRoma(t) {
  return oraDiRoma(t).slice(0, 10);
}

/** Il giorno di pubblicazione scritto nella lingua della pagina (Intl, Roma).
 *  Il francese scrive il primo del mese "1er" (Intl da' "1 decembre"). */
export function dataAvviso(lingua, avviso = AVVISO_LEGALE) {
  const locale = LOCALE_DATA[lingua];
  if (!locale) throw new Error(`avviso-legale: lingua sconosciuta "${lingua}"`);
  const f = finestraAvviso(avviso);
  if (f === null) throw new Error('avviso-legale: nessuna data: pubblicato e\' null');
  const testo = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'Europe/Rome' }).format(new Date(f.inizio + 12 * ORA));
  return lingua === 'fr' ? testo.replace(/^1 /, '1er ') : testo;
}

/** I giorni del mese davanti ai quali l'italiano elide l'articolo:
 *  "l'1", "l'8", "l'11" (si leggono "uno", "otto", "undici"). */
const ELISI_IT = new Set([1, 8, 11]);
const APOSTROFO = '\u2019';

/** La frase dell'avviso divisa attorno alla data: { prima, data, dopo }.
 *  `frase` contiene {data} una volta sola. In italiano la frase apre con
 *  l'articolo ("Il {data}"), che davanti a 1, 8 e 11 diventa "L'": qualunque
 *  altro attacco della frase italiana e' un errore, perche' la regola
 *  dell'elisione non saprebbe dove applicarsi. */
export function pezziFrase(lingua, frase, avviso = AVVISO_LEGALE) {
  const pezzi = String(frase).split('{data}');
  if (pezzi.length !== 2) throw new Error(`avviso-legale: la frase "${lingua}" deve contenere {data} una volta sola: ${frase}`);
  let [prima, dopo] = pezzi;
  const data = dataAvviso(lingua, avviso);
  if (lingua === 'it') {
    if (!/(^|\s)[Ii]l $/.test(prima)) {
      throw new Error(`avviso-legale: la frase it deve avere l'articolo "il" davanti a {data}: ${frase}`);
    }
    if (ELISI_IT.has(Number(avviso.pubblicato.slice(8, 10)))) {
      prima = prima.replace(/([Ii])l $/, (_, i) => `${i === 'I' ? 'L' : 'l'}${APOSTROFO}`);
    }
  }
  return { prima, data, dopo };
}

/** Il documento annunciato (id, versione, ...), o errore. */
export function documento(id, avviso = AVVISO_LEGALE) {
  const d = avviso.documenti.find((x) => x.id === id);
  if (!d) throw new Error(`avviso-legale: documento sconosciuto "${id}"`);
  return d;
}

/** Il documento pubblicato, nella lingua della pagina. */
export function indirizzoDocumento(lingua, id) {
  documento(id);
  return `/legal/${lingua}/${id}.html`;
}

/** Versione e data dalla testata di un documento legale: il .md dell'app
 *  ("**Versione**: 1.0.5" a capo "**Ultimo aggiornamento**: 2026-11-22") o
 *  l'HTML di build_legal_html.ps1 ("<strong>Versione</strong>: 1.0.5
 *  <strong>Ultimo aggiornamento</strong>: 2026-11-22"). La testata e' la PRIMA
 *  coppia "campo: versione" seguita subito (solo spazi o un <br>) da "campo:
 *  data", ovunque stia nel file: nessun taglio a lunghezza fissa (S398: il
 *  vecchio taglio a 4000 caratteri rendeva null una testata piu' in basso, e
 *  versione e data potevano venire da due punti diversi). null se manca. */
const TESTATA = /\*\*[^*\n]+\*\*:\s*(\d+\.\d+\.\d+)\b\s*(?:<br\s*\/?>\s*)?\*\*[^*\n]+\*\*:\s*(\d{4}-\d{2}-\d{2})\b/;
export function testataDocumento(testo) {
  const m = String(testo).replace(/<\/?strong>/g, '**').match(TESTATA);
  return m ? { versione: m[1], aggiornato: m[2] } : null;
}
