// SCRIVE IL GIORNO DI PUBBLICAZIONE DELL'AVVISO LEGALE (S398).
//
// `pubblicato` in src/lib/avviso-legale.mjs e' il giorno di ROMA in cui il sito
// serve per la prima volta i documenti annunciati. Questo script lo calcola da
// Intl (fuso 'Europe/Rome'), non dal fuso della macchina: in Git Bash
// `TZ=Europe/Rome date +%F` da' l'UTC (la zoneinfo non c'e') e fra le 23 e le
// 24 UTC scriveva il giorno prima, cioe' un avviso piu' corto della promessa.
//
// Uso (cwd site/):
//   node strumenti/pubblica-avviso.mjs            scrive il giorno di Roma di adesso
//   node strumenti/pubblica-avviso.mjs --prova    dice che cosa scriverebbe, non scrive
//   node strumenti/pubblica-avviso.mjs --sposta-avanti
//        gia' scritto un giorno PRIMA di oggi (merge dopo la mezzanotte di Roma):
//        lo porta a oggi. La fine si sposta solo in avanti, mai indietro.
//   --adesso <ISO 8601>   istante di riferimento (solo per le prove)
//   --file <percorso>     il file da scrivere (solo per le prove)
// Uscita: rc 0 scritto o gia' uguale; rc 1 errore, file intatto.
// ASCII-only: questo file e' codice.
import { readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const QUI = path.dirname(fileURLToPath(import.meta.url));
export const FILE_AVVISO = path.resolve(QUI, '..', 'src', 'lib', 'avviso-legale.mjs');
const RIGA = /^  pubblicato: (null|'(\d{4}-\d{2}-\d{2})'),$/gm;

/** Importa il modulo dell'avviso da `file` (copia fresca, niente cache). */
async function modulo(file) {
  return import(`${pathToFileURL(file).href}?v=${Date.now()}-${Math.random()}`);
}

/** Il nuovo testo del file con `pubblicato` = `giorno`, o un errore.
 *  `attuale` = il valore che c'e' (null o 'AAAA-MM-GG'). */
export function nuovoTesto(testo, giorno, { spostaAvanti = false } = {}) {
  const righe = [...String(testo).matchAll(RIGA)];
  if (righe.length !== 1) {
    throw new Error(`pubblica-avviso: attesa UNA riga "  pubblicato: null," o "  pubblicato: 'AAAA-MM-GG',", trovate ${righe.length}`);
  }
  const attuale = righe[0][2] ?? null;
  if (attuale === giorno) return { testo, attuale, cambiato: false };
  if (attuale !== null && attuale > giorno) {
    throw new Error(`pubblica-avviso: pubblicato e' ${attuale}, dopo oggi ${giorno}: mai indietro`);
  }
  if (attuale !== null && !spostaAvanti) {
    throw new Error(`pubblica-avviso: pubblicato e' gia' ${attuale} (oggi ${giorno}): per portarlo a oggi serve --sposta-avanti`);
  }
  const nuovo = String(testo).replace(RIGA, `  pubblicato: '${giorno}',`);
  return { testo: nuovo, attuale, cambiato: true };
}

/** Calcola il giorno di Roma di `adesso`, controlla che la finestra regga
 *  (giorno valido, non prima dei documenti) e scrive il file in modo atomico.
 *  Ritorna { giorno, attuale, cambiato, fine, oraRoma }. */
export async function pubblica({ adesso = new Date(), file = FILE_AVVISO, prova = false, spostaAvanti = false } = {}) {
  const m = await modulo(file);
  const giorno = m.giornoDiRoma(adesso);
  const finestra = m.finestraAvviso({ ...m.AVVISO_LEGALE, pubblicato: giorno });
  const prima = readFileSync(file, 'utf8');
  const esito = nuovoTesto(prima, giorno, { spostaAvanti });
  if (esito.cambiato && !prova) {
    const tmp = `${file}.tmp-${process.pid}`;
    writeFileSync(tmp, esito.testo, 'utf8');
    renameSync(tmp, file);
    const dopo = await modulo(file);
    if (dopo.AVVISO_LEGALE.pubblicato !== giorno) {
      writeFileSync(file, prima, 'utf8');
      throw new Error(`pubblica-avviso: riletto ${String(dopo.AVVISO_LEGALE.pubblicato)} invece di ${giorno}: file ripristinato`);
    }
  }
  return { giorno, attuale: esito.attuale, cambiato: esito.cambiato, fine: finestra.fine, oraRoma: m.oraDiRoma(adesso) };
}

function argomenti(argv) {
  const o = { prova: false, spostaAvanti: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--prova') o.prova = true;
    else if (a === '--sposta-avanti') o.spostaAvanti = true;
    else if (a === '--adesso' || a === '--file') {
      const v = argv[++i];
      if (v === undefined) throw new Error(`pubblica-avviso: ${a} senza valore`);
      if (a === '--adesso') {
        const t = Date.parse(v);
        if (!Number.isFinite(t)) throw new Error(`pubblica-avviso: --adesso illeggibile: ${v}`);
        o.adesso = new Date(t);
      } else o.file = path.resolve(v);
    } else throw new Error(`pubblica-avviso: argomento sconosciuto ${a}`);
  }
  return o;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const o = argomenti(process.argv.slice(2));
    const r = await pubblica(o);
    const verbo = !r.cambiato ? 'gia' + "'" + ' scritto' : o.prova ? 'DA SCRIVERE (--prova, file intatto)' : 'scritto';
    console.log(`pubblicato: ${r.giorno} (${verbo}; prima: ${String(r.attuale)}; ora di Roma ${r.oraRoma})`);
    console.log(`fine dell'avviso: ${new Date(r.fine).toISOString()} (primo istante spento)`);
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
