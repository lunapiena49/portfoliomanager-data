// THE SITE LEGAL PAGES = THE APP DOCUMENTS (S398, PM_PRIVACY + PM_TERMINI).
// Before S398 the only check compared each language with the Italian page:
// all six stuck at 1.0.4 while the app said 1.0.5 was GREEN. Now:
//  1. every page declares the version and date of the announced policy
//     (src/lib/avviso-legale.mjs, the same values the 30-day notice links);
//  2. every page IS paginaPrivacy(<its .md>) byte for byte, where the .md is
//     reachable: assets/legal/<l>/ in portfolio_manager, legal/ (Italian at its
//     root, the others in legal/<l>/) in the public repo; elsewhere it SKIPs
//     and says so;
//  3. the renderer is strict (unknown markdown throws) and escapes for Astro;
//  4. the site copy no longer says that PluriFin receives a device
//     fingerprint and the purchase receipt (privacy 1.0.5 sez. 2, 3.2, 3.3);
//  5. (PM_TERMINI, user decision of 2026-11-22 on NU-S398-PM-TERMINI-SITO)
//     the same holds for /terms and /disclaimer: header = the announced
//     version and date, page = paginaLegale(<its .md>) byte for byte. Until
//     S398 they were a shorter site text "Versione 1.0, 28 aprile 2026".
// ASCII-only: the non-ASCII words of point 4 are written as \u escapes.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { mancaNelRepo } from './quale-repo.mjs';
import { ID_DOCUMENTI, documento } from '../src/lib/avviso-legale.mjs';
import {
  LINGUE_PRIVACY, PAGINE_LEGALI, analizza, inline, paginaLegale, paginaPrivacy, sorgenteDi, testataLegale, testataPrivacy,
} from '../src/lib/privacy-da-md.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEGALI_APP = path.resolve(SITO, '..', '..', '..', '..', '..', 'assets', 'legal');
const LEGALI_PUBBLICO = path.resolve(SITO, '..', 'legal');

const percorsoPagina = (l, id = 'privacy') => path.join(SITO, 'src', 'pages', ...(l === 'it' ? [] : [l]), `${id}.astro`);
const leggi = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

/** Where the document sources are, or null. `file(l, id)`: the .md of page
 *  `id` (default privacy) in language `l`. */
export function sorgenti() {
  if (existsSync(path.join(LEGALI_APP, 'it', 'privacy_policy.md'))) {
    return { dove: LEGALI_APP, file: (l, id = 'privacy') => path.join(LEGALI_APP, l, sorgenteDi(id)) };
  }
  if (existsSync(path.join(LEGALI_PUBBLICO, 'privacy_policy.md')) && existsSync(path.join(LEGALI_PUBBLICO, 'en', 'privacy_policy.md'))) {
    return { dove: LEGALI_PUBBLICO, file: (l, id = 'privacy') => path.join(LEGALI_PUBBLICO, ...(l === 'it' ? [] : [l]), sorgenteDi(id)) };
  }
  return null;
}

/** Version and date in the <p class="meta"> of a legal page (first two rows;
 *  a third row may follow, or the paragraph may end). */
export function testataPagina(astro) {
  const m = /<p class="meta"><strong>[^<]+<\/strong>: ([^<]+)<br \/><strong>[^<]+<\/strong>: ([^<]+)(?:<br \/>|<\/p>)/.exec(astro);
  return m ? { versione: m[1].trim(), aggiornato: m[2].trim() } : null;
}

/** Pages whose header differs from `atteso` ({versione, aggiornato}). */
export function testateDifformi(pagine, atteso) {
  const out = [];
  for (const [l, astro] of Object.entries(pagine)) {
    const h = testataPagina(astro);
    if (!h || h.versione !== atteso.versione || h.aggiornato !== atteso.aggiornato) out.push(`${l}: ${h ? `${h.versione} ${h.aggiornato}` : 'testata assente'}`);
  }
  return out;
}

const PAGINE = Object.fromEntries(LINGUE_PRIVACY.map((l) => [l, leggi(percorsoPagina(l))]));

test('ogni pagina privacy dichiara la versione e la data dell\'informativa annunciata (sei lingue)', () => {
  const p = documento('privacy');
  assert.deepEqual(testateDifformi(PAGINE, p), [], `attese ${p.versione} ${p.aggiornato} (src/lib/avviso-legale.mjs)`);
});

test('mutante: una pagina rimasta a 1.0.4, o senza testata, fa rosso', () => {
  const p = documento('privacy');
  const vecchia = { ...PAGINE, de: PAGINE.de.replace(`: ${p.versione}<br />`, ': 1.0.4<br />') };
  assert.notEqual(vecchia.de, PAGINE.de, 'il mutante deve cambiare la pagina');
  assert.deepEqual(testateDifformi(vecchia, p), [`de: 1.0.4 ${p.aggiornato}`]);
  const datata = { ...PAGINE, pt: PAGINE.pt.replace(`: ${p.aggiornato}<br />`, ': 2026-11-13<br />') };
  assert.deepEqual(testateDifformi(datata, p), [`pt: ${p.versione} 2026-11-13`]);
  const senza = { ...PAGINE, it: PAGINE.it.replace('<p class="meta">', '<p>') };
  assert.deepEqual(testateDifformi(senza, p), ['it: testata assente']);
});

test('ogni pagina privacy E\' la resa della sua sorgente, byte per byte (sei lingue)', (t) => {
  const s = sorgenti();
  if (!s) {
    mancaNelRepo(t, `sorgenti assenti (${LEGALI_APP} e ${LEGALI_PUBBLICO})`);
    return;
  }
  const diverse = [];
  for (const l of LINGUE_PRIVACY) {
    const md = readFileSync(s.file(l), 'utf8');
    const h = testataPrivacy(md);
    const p = documento('privacy');
    if (h.versione !== p.versione || h.aggiornato !== p.aggiornato) diverse.push(`${l}: sorgente ${h.versione} ${h.aggiornato}`);
    if (paginaPrivacy(md, l) !== PAGINE[l]) diverse.push(`${l}: pagina diversa dalla resa di ${s.file(l)}`);
  }
  assert.deepEqual(diverse, [], `rigenera: node strumenti/privacy-da-md.mjs ${s.dove}`);
});

const MINIMO = [
  '# Titolo -- Prova',
  '',
  '**Versione**: 9.9.9',
  '**Ultimo aggiornamento**: 2030-01-31',
  '',
  '---',
  '',
  '## 1. Primo',
  '',
  'Testo su due',
  'righe con `codice` e **grassetto** e [un link](https://example.org/a?b=1&c=2).',
  'Se l\'utente:',
  '1. fa una cosa;',
  '2. ne fa un\'altra.',
  '',
  '### 1.1 Sotto',
  '',
  '- voce uno',
  '  che continua',
  '- voce > due & {tre}',
  '',
  '| A | B |',
  '|---|---|',
  '| a1 | **b1** |',
  '',
  '## 2. Secondo',
  '',
  'Fine.',
  '',
].join('\n');

test('resa: testata, indice, paragrafi, elenchi, tabella, link e caratteri speciali', () => {
  const out = paginaPrivacy(MINIMO, 'en');
  assert.ok(out.startsWith("---\nimport Documento from '../../components/giorno/servizio/Documento.astro';\n"));
  assert.ok(paginaPrivacy(MINIMO, 'it').includes("import Documento from '../components/giorno/servizio/Documento.astro';"));
  assert.ok(out.includes('  { id: "s1", label: "1. Primo" },\n  { id: "s2", label: "2. Secondo" },\n];'));
  assert.ok(out.includes('<Documento lingua="en" rotta="privacy" titolo="Titolo -- Prova" indice={toc}>'));
  assert.ok(out.includes('  <p class="meta"><strong>Versione</strong>: 9.9.9<br /><strong>Ultimo aggiornamento</strong>: 2030-01-31</p>\n  <hr />'));
  assert.ok(out.includes('  <p>Testo su due righe con <code>codice</code> e <strong>grassetto</strong> e <a href="https://example.org/a?b=1&amp;c=2">un link</a>. Se l\'utente:</p>\n  <ol>\n    <li>fa una cosa;</li>\n    <li>ne fa un\'altra.</li>\n  </ol>'));
  assert.ok(out.includes('  <h3 id="s1-1">1.1 Sotto</h3>\n  <ul>\n    <li>voce uno che continua</li>\n    <li>voce &gt; due &amp; &#123;tre&#125;</li>\n  </ul>'));
  assert.ok(out.includes('<tr><th>A</th><th>B</th></tr>') && out.includes('<tr><td>a1</td><td><strong>b1</strong></td></tr>'));
  assert.ok(out.endsWith('  <p>Fine.</p>\n</Documento>\n'));
  assert.deepEqual(testataPrivacy(MINIMO), { versione: '9.9.9', aggiornato: '2030-01-31' });
  assert.equal(paginaPrivacy(MINIMO.replace(/\n/g, '\r\n'), 'en'), out, 'CRLF e LF danno la stessa pagina');
  assert.ok(!/[^\x00-\x7f]/.test(readFileSync(path.join(SITO, 'src', 'lib', 'privacy-da-md.mjs'), 'utf8')), 'renderer ASCII-only');
});

test('resa rigida: ogni costrutto sconosciuto o irregolare lancia', () => {
  const con = (da, a) => { assert.ok(MINIMO.includes(da), da); return MINIMO.replace(da, a); };
  // The expected regex is the ERROR PHRASE of the renderer, never a word of
  // the input: an input word echoed in a different error would pass (the S398
  // mutant M3 lived that way).
  const casi = [
    [con('Fine.', '> - riga riportata'), /citazione: ammessi solo paragrafi/],
    [con('- voce uno', '- voce uno\n  - dentro'), /elenco annidato non supportato/],
    [con('Fine.', 'una *parola* sola'), /enfasi non supportata/],
    [con('Fine.', 'una _parola_ sola'), /enfasi non supportata/],
    [con('Fine.', 'apre `e non chiude'), /backtick non chiuso/],
    [con('Fine.', 'apre **e non chiude'), /grassetto non chiuso/],
    [con('## 2. Secondo', '## Secondo'), /sezione senza numero/],
    [con('## 2. Secondo', '## 3. Secondo'), /sezione 3 fuori sequenza/],
    [con('### 1.1 Sotto', '### 1.2 Sotto'), /sottosezione 1\.2 fuori sequenza/],
    [con('### 1.1 Sotto', '### Sotto'), /sottosezione senza numero/],
    [con('Fine.', '##### quinta'), /livello di titolo non supportato/],
    [con('Fine.', '#### quarta'), /paragrafo senza numero/],
    [con('| a1 | **b1** |', '| a1 | b1 | c1 |'), /riga di tabella irregolare/],
    [con('|---|---|', ''), /tabella senza separatore/],
    [con('2. ne fa', '3. ne fa'), /elenco numerato fuori sequenza/],
    [con('Fine.', 'un <b>x</b>'), /HTML grezzo/],
    [con('Fine.', '[qui](http://example.org)'), /link non https/],
    [con('Fine.', '[solo parentesi] e basta'), /parentesi quadra senza link/],
    [con('## 1. Primo', '## 1. Primo **forte**'), /markup in un titolo/],
    // S398, oracolo legale: quattro costrutti che passavano come testo letterale.
    [con('Fine.', '![logo](https://example.org/a.png)'), /immagine non supportata/],
    [con('Fine.', 'testo ~~barrato~~ qui'), /barrato non supportato/],
    [con('Fine.', '```\ncodice\n```'), /blocco di codice non supportato/],
    [con('Fine.', '~~~\ncodice\n~~~'), /blocco di codice non supportato/],
    [con('Fine.', 'Titolo setext\n==='), /titolo setext non supportato/],
    [con('Fine.', 'Titolo setext\n---'), /titolo setext non supportato/],
    [con('# Titolo -- Prova', '# Titolo "Prova"'), /virgolette doppie o barra rovescia nel titolo \(H1\)/],
    [con('# Titolo -- Prova', '# Titolo \\ Prova'), /virgolette doppie o barra rovescia nel titolo \(H1\)/],
    [con('**Versione**: 9.9.9', 'Versione: 9.9.9'), /testata: riga/],
    [con('---\n', '***\n'), /dopo la testata serve/],
    [con('Fine.', '---'), /secondo separatore/],
    [con('Fine.', '* punto'), /marcatore di elenco non supportato/],
    ['riga qualsiasi', /manca il titolo/],
  ];
  for (const [md, atteso] of casi) {
    assert.throws(() => analizza(md), atteso, md.slice(-60));
  }
  assert.throws(() => paginaPrivacy(MINIMO, 'xx'), /lingua sconosciuta/);
  assert.throws(() => inline('a < b'), /HTML grezzo/);
  // Le virgolette restano ammesse nei titoli di sezione (Termini 3.5 "Know Your
  // Customer"): diventano testo dell'elemento e stringa JS dell'indice.
  const citato = paginaPrivacy(con('## 1. Primo', '## 1. Primo "citato"'), 'it');
  assert.match(citato, /<h2 id="s1">1\. Primo &quot;citato&quot;<\/h2>|<h2 id="s1">1\. Primo "citato"<\/h2>/);
  assert.match(citato, /label: "1\. Primo \\"citato\\""/);
});

test('le sei sorgenti si rendono senza errori e con 13 sezioni', (t) => {
  const s = sorgenti();
  if (!s) {
    mancaNelRepo(t, `sorgenti assenti (${LEGALI_PUBBLICO})`);
    return;
  }
  for (const l of LINGUE_PRIVACY) {
    const { blocchi } = analizza(readFileSync(s.file(l), 'utf8'));
    assert.equal(blocchi.filter((b) => b.tipo === 'h2').length, 13, `${l}: sezioni`);
  }
});

// Point 4. The words of the old claim (PluriFin needs a device fingerprint and
// the purchase receipt to verify trial and subscription), one per language.
const VECCHIA_PROMESSA = [
  'impronta anonima',
  'device fingerprint',
  'huella an\u00f3nima',
  'empreinte anonyme',
  'Fingerabdruck',
  'identificador an\u00f3nimo',
];

function testiDelSito(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = path.join(dir, n);
    if (statSync(p).isDirectory()) testiDelSito(p, out);
    else if (/\.(ts|astro|md|mjs)$/.test(n) && !/privacy\.astro$/.test(n)) out.push(p);
  }
  return out;
}

export function vecchiaPromessa(file) {
  const out = [];
  for (const f of file) {
    const t = readFileSync(f, 'utf8');
    for (const w of VECCHIA_PROMESSA) if (t.includes(w)) out.push(`${path.relative(SITO, f)}: "${w}"`);
  }
  return out;
}

test('il sito non dice piu\' che a PluriFin arrivano impronta del dispositivo e ricevuta (privacy 1.0.5 sez. 2, 3.2, 3.3)', () => {
  const file = testiDelSito(path.join(SITO, 'src'));
  assert.ok(file.length > 50, `file letti: ${file.length}`);
  assert.deepEqual(vecchiaPromessa(file), []);
});

test('mutante: la frase vecchia rimessa in un testo fa rosso', async () => {
  const { mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
  const os = await import('node:os');
  const d = mkdtempSync(path.join(os.tmpdir(), 'privacy-pagine-'));
  try {
    const f = path.join(d, 'de.ts');
    writeFileSync(f, "x: 'Um Testphase und Abo zu pruefen, genuegen ein anonymer Geraete-Fingerabdruck und der Kaufbeleg.'", 'utf8');
    assert.equal(vecchiaPromessa([f]).length, 1);
  } finally {
    rmSync(d, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// Point 5 (PM_TERMINI): /terms and /disclaimer, six languages each, rendered
// from terms_of_service.md and disclaimer_financial.md of the app.
const ALTRI = ID_DOCUMENTI.filter((id) => id !== 'privacy');
const PAGINE_ALTRE = Object.fromEntries(ALTRI.map((id) => [id, Object.fromEntries(LINGUE_PRIVACY.map((l) => [l, leggi(percorsoPagina(l, id))]))]));

test('le pagine del sito rese dall\'app sono quelle dei documenti annunciati, ne\' una di piu\' ne\' una di meno', () => {
  assert.deepEqual(Object.keys(PAGINE_LEGALI), [...ID_DOCUMENTI]);
  assert.deepEqual(ALTRI, ['terms', 'disclaimer']);
  assert.deepEqual([sorgenteDi('privacy'), sorgenteDi('terms'), sorgenteDi('disclaimer')], ['privacy_policy.md', 'terms_of_service.md', 'disclaimer_financial.md']);
  assert.throws(() => sorgenteDi('dmca'), /documento sconosciuto/);
  assert.throws(() => paginaLegale(MINIMO, 'it', 'dmca'), /documento sconosciuto/);
});

test('ogni pagina /terms e /disclaimer dichiara la versione e la data del documento annunciato (sei lingue)', () => {
  for (const id of ALTRI) {
    const d = documento(id);
    assert.deepEqual(testateDifformi(PAGINE_ALTRE[id], d), [], `${id}: attese ${d.versione} ${d.aggiornato} (src/lib/avviso-legale.mjs)`);
  }
});

test('mutante: /terms tornato al testo del sito "Versione 1.0", o a una versione vecchia, fa rosso', () => {
  const d = documento('terms');
  const vecchia = `<p class="meta">Ultimo aggiornamento: 28 aprile 2026 ${String.fromCharCode(0xb7)} Versione 1.0</p>`;
  const tornata = { ...PAGINE_ALTRE.terms, it: PAGINE_ALTRE.terms.it.replace(/<p class="meta">[^\n]*<\/p>/, vecchia) };
  assert.notEqual(tornata.it, PAGINE_ALTRE.terms.it);
  assert.deepEqual(testateDifformi(tornata, d), ['it: testata assente']);
  const indietro = { ...PAGINE_ALTRE.terms, fr: PAGINE_ALTRE.terms.fr.replace(`: ${d.versione}<br />`, ': 1.1.0<br />') };
  assert.deepEqual(testateDifformi(indietro, d), [`fr: 1.1.0 ${d.aggiornato}`]);
  const disc = documento('disclaimer');
  const datata = { ...PAGINE_ALTRE.disclaimer, es: PAGINE_ALTRE.disclaimer.es.replace(`: ${disc.aggiornato}<br />`, ': 2026-07-14<br />') };
  assert.deepEqual(testateDifformi(datata, disc), [`es: ${disc.versione} 2026-07-14`]);
});

/** The pages of `id` that are not paginaLegale(<their .md>), or whose source
 *  declares another version/date than the announced one. */
export function pagineDifformiDallaSorgente(id, pagine, file) {
  const d = documento(id);
  const out = [];
  for (const l of LINGUE_PRIVACY) {
    const md = readFileSync(file(l, id), 'utf8');
    const h = testataLegale(md);
    if (h.versione !== d.versione || h.aggiornato !== d.aggiornato) out.push(`${l}/${id}: sorgente ${h.versione} ${h.aggiornato}`);
    if (paginaLegale(md, l, id) !== pagine[l]) out.push(`${l}/${id}: pagina diversa dalla resa di ${file(l, id)}`);
  }
  return out;
}

test('ogni pagina /terms e /disclaimer E\' la resa della sua sorgente, byte per byte (sei lingue)', (t) => {
  const s = sorgenti();
  if (!s) {
    mancaNelRepo(t, `sorgenti assenti (${LEGALI_APP} e ${LEGALI_PUBBLICO})`);
    return;
  }
  for (const id of ALTRI) {
    assert.deepEqual(pagineDifformiDallaSorgente(id, PAGINE_ALTRE[id], s.file), [], `rigenera: node strumenti/privacy-da-md.mjs ${s.dove}`);
  }
});

test('mutante: un byte cambiato nella pagina, o la sorgente avanzata senza ri-rendere, fa rosso', async (t) => {
  const s = sorgenti();
  if (!s) {
    mancaNelRepo(t, `sorgenti assenti (${LEGALI_PUBBLICO})`);
    return;
  }
  const parola = { ...PAGINE_ALTRE.disclaimer, de: PAGINE_ALTRE.disclaimer.de.replace('</h2>', ' </h2>') };
  assert.notEqual(parola.de, PAGINE_ALTRE.disclaimer.de);
  assert.deepEqual(pagineDifformiDallaSorgente('disclaimer', parola, s.file).map((x) => x.split(':')[0]), ['de/disclaimer']);
  const { mkdtempSync, writeFileSync, rmSync, mkdirSync } = await import('node:fs');
  const os = await import('node:os');
  const d = mkdtempSync(path.join(os.tmpdir(), 'legali-pagine-'));
  try {
    for (const l of LINGUE_PRIVACY) {
      mkdirSync(path.join(d, l));
      let md = readFileSync(s.file(l, 'terms'), 'utf8');
      if (l === 'pt') md = md.replace(`: ${documento('terms').versione}`, ': 1.1.3');
      writeFileSync(path.join(d, l, 'terms_of_service.md'), md, 'utf8');
    }
    const file = (l, id) => path.join(d, l, sorgenteDi(id));
    assert.deepEqual(pagineDifformiDallaSorgente('terms', PAGINE_ALTRE.terms, file).map((x) => x.split(':')[0]), ['pt/terms', 'pt/terms']);
  } finally {
    rmSync(d, { recursive: true, force: true });
  }
});

test('le sorgenti di Termini e disclaimer si rendono senza errori, con le stesse sezioni in ogni lingua', (t) => {
  const s = sorgenti();
  if (!s) {
    mancaNelRepo(t, `sorgenti assenti (${LEGALI_PUBBLICO})`);
    return;
  }
  for (const [id, sezioni] of [['terms', 18], ['disclaimer', 15]]) {
    for (const l of LINGUE_PRIVACY) {
      const { blocchi } = analizza(readFileSync(s.file(l, id), 'utf8'));
      assert.equal(blocchi.filter((b) => b.tipo === 'h2').length, sezioni, `${l}/${id}: sezioni`);
    }
  }
});

const ESTESO = [
  '# Termini -- Prova',
  '',
  '**Versione**: 2.0.0',
  '**Ultimo aggiornamento**: 2031-02-28',
  '**Lingua originale**: Italiano',
  '',
  '---',
  '',
  '> **AVVISO -- LEGGERE**',
  '>',
  '> Prima riga',
  '> seconda riga.',
  '',
  '---',
  '',
  '## 1. Uno',
  '',
  '### 1.1 Sotto',
  '',
  '#### 1.1.1 Piu\' sotto',
  '',
  '(prezzo - medio) * quantita, sito: <https://example.org/odr/?a=1&b=2>.',
  '',
  '#### 1.1.2 Ancora',
  '',
  '### 1.2 Altro',
  '',
  '#### 1.2.1 Di nuovo uno',
  '',
  'Fine.',
  '',
].join('\n');

test('resa estesa: citazione in testa, filo dopo, paragrafi di terzo livello, autolink e asterisco tra spazi', () => {
  const out = paginaLegale(ESTESO, 'fr', 'terms');
  assert.ok(out.includes('<Documento lingua="fr" rotta="terms" titolo="Termini -- Prova" indice={toc}>'));
  assert.ok(out.includes('// assets/legal/fr/terms_of_service.md: same version, same text, rendered'));
  assert.ok(out.includes('  <p class="meta"><strong>Versione</strong>: 2.0.0<br /><strong>Ultimo aggiornamento</strong>: 2031-02-28<br /><strong>Lingua originale</strong>: Italiano</p>\n  <hr />\n  <blockquote>\n    <p><strong>AVVISO -- LEGGERE</strong></p>\n    <p>Prima riga seconda riga.</p>\n  </blockquote>\n  <hr />\n  <h2 id="s1">1. Uno</h2>'));
  assert.ok(out.includes('  <h4 id="s1-1-1">1.1.1 Piu\' sotto</h4>\n  <p>(prezzo - medio) * quantita, sito: <a href="https://example.org/odr/?a=1&amp;b=2">https://example.org/odr/?a=1&amp;b=2</a>.</p>\n  <h4 id="s1-1-2">1.1.2 Ancora</h4>'));
  assert.ok(out.includes('  <h3 id="s1-2">1.2 Altro</h3>\n  <h4 id="s1-2-1">1.2.1 Di nuovo uno</h4>'), 'il terzo livello riparte da 1 a ogni sottosezione');
  assert.ok(out.includes('  { id: "s1", label: "1. Uno" },\n];'), 'indice: solo le sezioni');
  assert.deepEqual(testataLegale(ESTESO), { versione: '2.0.0', aggiornato: '2031-02-28' });
  assert.deepEqual(testataPagina(out), { versione: '2.0.0', aggiornato: '2031-02-28' });
  assert.ok(paginaLegale(ESTESO, 'it', 'disclaimer').includes('<Documento lingua="it" rotta="disclaimer"'));
  assert.equal(paginaPrivacy(MINIMO, 'en'), paginaLegale(MINIMO, 'en', 'privacy'));
});

test('resa estesa rigida: citazione, terzo livello, filo e autolink fuori regola lanciano', () => {
  const con = (da, a) => { assert.ok(ESTESO.includes(da), da); return ESTESO.replace(da, a); };
  const casi = [
    [con('#### 1.1.2 Ancora', '#### 1.1.3 Ancora'), /paragrafo 1\.1\.3 fuori sequenza/],
    [con('#### 1.1.1 Piu', '#### 1.2.1 Piu'), /paragrafo 1\.2\.1 fuori sequenza/],
    [con('#### 1.1.2 Ancora', '#### Ancora'), /paragrafo senza numero/],
    [con('#### 1.1.2 Ancora', '##### 1.1.2.1 Ancora'), /livello di titolo non supportato/],
    [con('### 1.1 Sotto\n\n#### 1.1.1', '#### 1.0.1'), /paragrafo 1\.0\.1 fuori sequenza/],
    [con('> Prima riga', '> - voce'), /citazione: ammessi solo paragrafi/],
    [con('> Prima riga', '>Prima riga'), /citazione: dopo ">" serve uno spazio/],
    [con('> seconda riga.\n', '> seconda riga.\ntesto pigro\n'), /citazione seguita da testo senza riga vuota/],
    [con('> **AVVISO -- LEGGERE**\n>\n> Prima riga\n> seconda riga.', '>\n>'), /citazione vuota/],
    [con('Fine.', 'Fine.\n\n---'), /secondo separatore non supportato/],
    [con('> seconda riga.\n\n---', '> seconda riga.\n\n***'), /secondo separatore non supportato/],
    [con('<https://example.org/odr/?a=1&b=2>', '<http://example.org/odr/>'), /link non https\/mailto/],
    [con('<https://example.org/odr/?a=1&b=2>', '<span>x</span>'), /HTML grezzo/],
    [con('(prezzo - medio) * quantita', '(prezzo - medio) *quantita'), /enfasi non supportata/],
  ];
  for (const [md, atteso] of casi) {
    assert.throws(() => analizza(md), atteso, md.slice(0, 400));
  }
});
