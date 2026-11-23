// Rewrites the site legal pages from the app documents (S398): privacy,
// terms and disclaimer, six languages each.
//
//   node strumenti/privacy-da-md.mjs <cartella assets/legal> [--verifica] [--documento <id>]
//
// <cartella assets/legal> = the app sources (in portfolio_manager:
// ../../../../../assets/legal from site/). Each src/pages/<l>/<id>.astro
// (Italian: src/pages/<id>.astro) becomes paginaLegale(<l>/<sorgente>.md),
// with <id> -> <sorgente> from PAGINE_LEGALI (privacy -> privacy_policy,
// terms -> terms_of_service, disclaimer -> disclaimer_financial).
// --documento limits the run to one id. --verifica writes nothing: it lists
// the pages that differ and exits 1 if any.
// The renderer and its rules: src/lib/privacy-da-md.mjs. ASCII-only.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LINGUE_LEGALI, PAGINE_LEGALI, paginaLegale, sorgenteDi, testataLegale } from '../src/lib/privacy-da-md.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function percorsoPagina(sito, lingua, id) {
  return path.join(sito, 'src', 'pages', ...(lingua === 'it' ? [] : [lingua]), `${id}.astro`);
}

const argomenti = process.argv.slice(2);
const verifica = argomenti.includes('--verifica');
const iDoc = argomenti.indexOf('--documento');
const solo = iDoc >= 0 ? argomenti[iDoc + 1] : null;
const cartella = argomenti.find((a, i) => !a.startsWith('--') && (iDoc < 0 || i !== iDoc + 1));
if (!cartella || !existsSync(cartella) || (iDoc >= 0 && !Object.hasOwn(PAGINE_LEGALI, solo ?? ''))) {
  console.error(`uso: node strumenti/privacy-da-md.mjs <cartella assets/legal> [--verifica] [--documento ${Object.keys(PAGINE_LEGALI).join('|')}]`);
  process.exit(2);
}
const documenti = solo ? [solo] : Object.keys(PAGINE_LEGALI);
// Tutte le pagine si rendono PRIMA di scriverne una (S398, code-reviewer): una
// sorgente illeggibile o un costrutto non supportato fermano il giro con rc 1 e
// nessun file toccato, invece di lasciare il sito mezzo vecchio e mezzo nuovo.
const rese = [];
try {
  for (const id of documenti) {
    for (const l of LINGUE_LEGALI) {
      const sorgente = path.join(cartella, l, sorgenteDi(id));
      const md = readFileSync(sorgente, 'utf8');
      const nuova = paginaLegale(md, l, id);
      const file = percorsoPagina(SITO, l, id);
      const vecchia = existsSync(file) ? readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : null;
      rese.push({ nome: `${l}/${id}`, file, nuova, vecchia, ...testataLegale(md) });
    }
  }
} catch (e) {
  console.error(`resa fallita, nessuna pagina scritta: ${e.message}`);
  process.exit(1);
}
const diverse = [];
for (const r of rese) {
  if (r.vecchia === r.nuova) {
    console.log(`${r.nome}: uguale (${r.versione} ${r.aggiornato})`);
    continue;
  }
  diverse.push(r.nome);
  if (verifica) console.log(`${r.nome}: DIVERSA dalla sorgente (${r.versione} ${r.aggiornato})`);
  else {
    try {
      writeFileSync(r.file, r.nuova, 'utf8');
    } catch (e) {
      console.error(`${r.nome}: scrittura fallita (${e.message}); scritte prima: ${diverse.slice(0, -1).join(', ') || 'nessuna'}`);
      process.exit(1);
    }
    console.log(`${r.nome}: riscritta (${r.versione} ${r.aggiornato})`);
  }
}
console.log(`pagine diverse: ${diverse.length} su ${documenti.length * LINGUE_LEGALI.length}`);
process.exit(verifica && diverse.length ? 1 : 0);
