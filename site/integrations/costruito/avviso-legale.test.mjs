// L'AVVISO DI 30 GIORNI SUL SITO COSTRUITO (D-S397-PM-AVVISO-SITO-NUOVO-30).
// Legge dist/ (o SITO_DIST): si lancia dopo la build con `npm run test:dist`.
// Che cosa si aspetta lo decide la stessa regola della build, allo stesso
// istante: prima della fine l'avviso c'e' su ogni pagina con la testata, nelle
// sei lingue; dalla fine in poi, e finche' `pubblicato` e' null, non c'e' su
// nessuna. Per provare il sito a
// un'altra data: `PLURIFIN_AVVISO_ADESSO=<ISO>` sia sulla build sia qui.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { AVVISO_LEGALE, ID_DOCUMENTI, adessoDellaBuild, avvisoAttivo, documento, pezziFrase } from '../../src/lib/avviso-legale.mjs';

const DIST = process.env.SITO_DIST
  ? path.resolve(process.env.SITO_DIST)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];
const ATTESO = avvisoAttivo(adessoDellaBuild(process.env));
const carica = async (l) => (await import(new URL(`../../src/i18n/testi/${l}.ts`, import.meta.url).href)).default;

/** Le pagine Astro costruite: fuori le cartelle che il sito riceve da altri. */
function pagine(dir = DIST, rel = '') {
  const out = [];
  for (const nome of readdirSync(dir)) {
    const r = rel ? `${rel}/${nome}` : nome;
    if (!rel && ['legal', 'market-data', 'app', '_assets', 'assets'].includes(nome)) continue;
    const p = path.join(dir, nome);
    if (statSync(p).isDirectory()) out.push(...pagine(p, r));
    else if (nome.endsWith('.html')) out.push(r);
  }
  return out;
}
/** Il testo dell'avviso come lo legge chi lo guarda: i tag in linea (a, time)
 *  non aggiungono spazi, altrimenti "Policy</a>," diventerebbe "Policy ,". */
const testoVisibile = (h) =>
  h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, '').replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const avvisi = (h) => [...h.matchAll(/<aside class="margini avviso-legale"[\s\S]*?<\/aside>/g)].map((m) => m[0]);
const lingua = (h) => (h.match(/<html lang="([a-z]{2})"/) ?? [])[1];

test('avviso: il sito costruito esiste e ha pagine con la testata in sei lingue', () => {
  assert.ok(existsSync(DIST), `manca ${DIST}: lancia prima la build`);
  const conTestata = pagine().filter((p) => readFileSync(path.join(DIST, p), 'utf8').includes('class="salta"'));
  const lingue = new Set(conTestata.map((p) => lingua(readFileSync(path.join(DIST, p), 'utf8'))));
  assert.deepEqual([...lingue].sort(), [...LINGUE].sort(), 'lingue delle pagine con la testata');
});

test(`avviso: ${ATTESO ? 'PRESENTE (pubblicato, prima della fine)' : 'ASSENTE (non pubblicato o dalla fine in poi)'} su ogni pagina con la testata, sei lingue`, async () => {
  const testi = Object.fromEntries(await Promise.all(LINGUE.map(async (l) => [l, (await carica(l)).comune.avvisoLegale])));
  const difetti = [];
  const perLingua = Object.fromEntries(LINGUE.map((l) => [l, 0]));
  for (const p of pagine()) {
    const h = readFileSync(path.join(DIST, p), 'utf8');
    if (!h.includes('class="salta"')) continue;
    const l = lingua(h);
    const a = avvisi(h);
    if (!ATTESO) {
      if (a.length || h.includes('avviso-legale')) difetti.push(`${p}: avviso presente fuori dalla finestra`);
      continue;
    }
    if (a.length !== 1) { difetti.push(`${p}: ${a.length} avvisi`); continue; }
    const av = a[0];
    const t = testi[l];
    // Elisione it ("L'8") e "1er" fr: la regola e le attese letterali sono in
    // integrations/avviso-legale.test.mjs; qui si prova che la pagina la usa.
    const { prima, data, dopo } = pezziFrase(l, t.frase);
    const n = (id) => `${t.documenti[id]} ${documento(id).versione}`;
    const atteso = `${prima}${data}${dopo} ${n('privacy')}, ${n('terms')}${t.e}${n('disclaimer')}.`;
    if (!testoVisibile(av).includes(atteso.replace(/\s+/g, ' '))) difetti.push(`${p}: testo diverso da "${atteso}"`);
    if (!av.includes(`aria-label="${t.etichetta}"`)) difetti.push(`${p}: etichetta`);
    if (!av.includes(`<time datetime="${AVVISO_LEGALE.pubblicato}">`)) difetti.push(`${p}: time`);
    const link = [...av.matchAll(/<a href="([^"]+)"/g)].map((m) => m[1]);
    const attesi = ID_DOCUMENTI.map((d) => `/legal/${l}/${d}.html`);
    if (JSON.stringify(link) !== JSON.stringify(attesi)) difetti.push(`${p}: link ${link.join(' ')}`);
    // Ordine: "salta al testo" resta il primo, l'avviso viene dopo la testata e prima del testo.
    const i = h.indexOf('<aside class="margini avviso-legale"');
    if (!(h.indexOf('class="salta"') < i && h.indexOf('</header>') < i)) difetti.push(`${p}: avviso prima della testata`);
    const testo = h.indexOf('id="testo"');
    if (testo >= 0 && testo < i) difetti.push(`${p}: avviso dopo l'inizio del testo`);
    perLingua[l] += 1;
  }
  assert.deepEqual(difetti, [], `${difetti.length} difetti`);
  if (ATTESO) for (const l of LINGUE) assert.ok(perLingua[l] >= 5, `${l}: avviso su ${perLingua[l]} pagine`);
});
