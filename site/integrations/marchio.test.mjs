// I PRESIDI DEL MARCHIO DI ROLLQUEST SUL SITO (S387): il wordmark W3 AVORIO,
// scelto dall'utente per ogni superficie. Il marchio e' un'IMMAGINE, generata
// nel repo del gioco (`python art/tools/marchio_rollquest.py`) e registrata in
// src/assets/marchio/PROVENIENZA.json: qui si controlla che i file siano quelli
// del registro, che l'immagine regga il contrasto e l'area di rispetto MISURATI
// SUI PIXEL (non sui numeri che lo strumento dichiara), e che ogni lingua abbia
// il suo testo alternativo. Girano con `npm test` PRIMA della build; i
// contratti sulle pagine costruite stanno in costruito/marchio.test.mjs.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leggi = (rel) => readFileSync(path.join(SITO, rel), 'utf8');
const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];
const REGISTRO = JSON.parse(leggi('src/assets/marchio/PROVENIENZA.json'));
const INSEGNA = 'src/assets/marchio/rollquest-wordmark.webp';
const SOCIAL = 'public/assets/og-rollquest.png';
const LIBERO = 'public/assets/rollquest-wordmark.png';
const TARGA = 'public/assets/rollquest-wordmark-targa.png';
const FLOOR = 4.5;

async function testi(lingua) {
  return (await import(new URL(`../src/i18n/testi/${lingua}.ts`, import.meta.url).href)).default;
}
async function pixel(rel) {
  const { data, info } = await sharp(path.join(SITO, rel)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height, in: (x, y) => { const i = (y * info.width + x) * 4; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; } };
}
/** Luminanza relativa e contrasto WCAG 2.x: scritti qui, non letti dallo strumento. */
export function luminanza([r, g, b]) {
  const lin = (v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
export function contrasto(a, b) {
  const [alto, basso] = [luminanza(a), luminanza(b)].sort((x, y) => y - x);
  return (alto + 0.05) / (basso + 0.05);
}
/** Il riquadro dei pixel non trasparenti: [x0, y0, x1, y1], estremi compresi. */
function riquadro(p) {
  let x0 = p.w, y0 = p.h, x1 = -1, y1 = -1;
  for (let y = 0; y < p.h; y++) for (let x = 0; x < p.w; x++) {
    if (p.data[(y * p.w + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  return [x0, y0, x1, y1];
}
/** Il fronte delle lettere: il colore piu' frequente fra i pixel opachi e chiari. */
function fronte(p) {
  const conta = new Map();
  for (let i = 0; i < p.data.length; i += 4) {
    if (p.data[i + 3] < 255 || p.data[i] < 200) continue;
    const k = `${p.data[i]},${p.data[i + 1]},${p.data[i + 2]}`;
    conta.set(k, (conta.get(k) ?? 0) + 1);
  }
  const [k, n] = [...conta.entries()].sort((a, b) => b[1] - a[1])[0];
  return { colore: k.split(',').map(Number), pixel: n };
}

test('conti: il contrasto e\' quello della norma (bianco su nero 21, uguale su uguale 1)', () => {
  assert.equal(Math.round(contrasto([255, 255, 255], [0, 0, 0]) * 100) / 100, 21);
  assert.equal(contrasto([30, 24, 48], [30, 24, 48]), 1);
  // Crema su Notte: il numero del canone del gioco (BRAND_GUIDELINES 4.4).
  assert.equal(Math.round(contrasto([255, 246, 234], [30, 24, 48]) * 100) / 100, 15.97);
  // Crema su Carta: il motivo per cui sul giorno il marchio va sulla targa.
  assert.ok(contrasto([255, 246, 234], [238, 242, 234]) < 1.2);
});

test('registro: ogni file del marchio e\' sul disco col suo sha256, e nessuno e\' fuori registro', () => {
  assert.match(REGISTRO.decisione, /D-S387-SPLASH-WORDMARK-SCELTO/);
  assert.equal(REGISTRO.generato_da, 'rollquest/art/tools/marchio_rollquest.py');
  assert.match(REGISTRO.sorgente.sha256, /^[0-9a-f]{64}$/);
  assert.deepEqual(Object.keys(REGISTRO.file).sort(), [INSEGNA, SOCIAL, LIBERO, TARGA].sort());
  for (const [file, voce] of Object.entries(REGISTRO.file)) {
    assert.ok(existsSync(path.join(SITO, file)), `manca ${file}: lancia lo strumento del marchio`);
    const disco = createHash('sha256').update(readFileSync(path.join(SITO, file))).digest('hex');
    assert.equal(disco, voce.sha256, `${file}: il file non e' quello del registro`);
  }
  const cartella = readdirSync(path.join(SITO, 'src/assets/marchio')).sort();
  assert.deepEqual(cartella, ['PROVENIENZA.json', 'rollquest-wordmark.webp'], 'file fuori registro in src/assets/marchio');
});

test('immagini: taglie del registro, social 1200 per 630 senza trasparenza, insegna a doppia densita\'', async () => {
  for (const [file, voce] of Object.entries(REGISTRO.file)) {
    const m = await sharp(path.join(SITO, file)).metadata();
    assert.deepEqual([m.width, m.height], [voce.larghezza, voce.altezza], file);
  }
  const social = await sharp(path.join(SITO, SOCIAL)).metadata();
  assert.deepEqual([social.width, social.height, social.hasAlpha], [1200, 630, false]);
  // La regola di stile mostra l'insegna a 420 px al massimo: il file ne porta almeno il doppio.
  const css = leggi('src/styles/giorno.css');
  const massima = Number((css.match(/\.notte \.insegna img \{[^}]*width: min\(100%, (\d+)px\)/) ?? [])[1]);
  assert.ok(massima >= REGISTRO.larghezza_minima_px_css, `l'insegna a ${massima} px sta sotto la taglia minima del marchio`);
  assert.ok(REGISTRO.file[INSEGNA].larghezza >= 2 * massima, 'insegna sotto la doppia densita\'');
  // La piu' stretta che il telaio le da' (finestra da 320 px meno i margini) resta sopra la minima.
  assert.ok(320 - 48 >= REGISTRO.larghezza_minima_px_css);
  assert.ok((await sharp(path.join(SITO, INSEGNA)).metadata()).hasAlpha, 'insegna senza trasparenza');
});

test('contrasto, misurato sui pixel: il fronte del marchio tiene il floor su ogni fondo su cui il sito lo mette', async () => {
  // L'immagine social: il fronte contro OGNI pixel del bordo (il cielo sfumato, dal piu' scuro al piu' chiaro).
  const s = await pixel(SOCIAL);
  const f = fronte(s);
  // WMFIX (S387): il marchio passa da 880 a 800 px per far posto alla firma sotto (area x 0,826):
  // misurati 18.299 pixel di fronte; la soglia segue la taglia (20.000 x 0,826 = 16.500), non si allarga oltre.
  assert.ok(f.pixel > 16500, `fronte troppo piccolo nell'immagine social: ${f.pixel} pixel`);
  let peggiore = Infinity;
  for (let y = 0; y < s.h; y++) for (const x of [0, s.w - 1]) peggiore = Math.min(peggiore, contrasto(f.colore, s.in(x, y)));
  assert.ok(peggiore >= FLOOR, `immagine social: fronte a ${peggiore.toFixed(2)}:1 sul cielo`);
  // La firma della divisione (D-S387-MARCHIO-SOCIAL-CON-GLIFO): il quadrato ink del glifo, il rombo menta,
  // "Games" in Ember; e la firma sta SOTTO il marchio (il quadrato ink nella meta' bassa).
  let ink = 0, menta = 0, ember = 0, inkAlto = s.h;
  for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) {
    const [r, g, b] = s.in(x, y);
    if (r === 10 && g === 14 && b === 20) { ink++; inkAlto = Math.min(inkAlto, y); }
    if (g > 190 && r < 140 && b > 120 && b < 200) menta++;
    if (r > 230 && g > 110 && g < 165 && b < 90) ember++;
  }
  assert.ok(ink > 2000 && menta > 5 && ember > 300, `firma: ink ${ink}, menta ${menta}, ember ${ember}`);
  assert.ok(inkAlto > s.h / 2, `la firma non sta sotto il marchio (glifo da y=${inkAlto})`);
  // La targa: il fronte contro la targa stessa, lungo il suo asse verticale sinistro (dentro l'area di rispetto).
  const t = await pixel(TARGA);
  const ft = fronte(t);
  let sullaTarga = Infinity;
  for (let y = 40; y < t.h - 40; y++) sullaTarga = Math.min(sullaTarga, contrasto(ft.colore, t.in(24, y)));
  assert.ok(sullaTarga >= FLOOR, `targa: fronte a ${sullaTarga.toFixed(2)}:1`);
  assert.equal(t.in(0, 0)[3], 0, 'la targa non ha gli angoli stondati');
  // L'insegna sta sulla notte del sito: i fondi veri sono nel foglio di stile.
  const i = await pixel(INSEGNA);
  const fi = fronte(i);
  const css = leggi('src/styles/giorno.css') + leggi('src/styles/games.css');
  const hex = (nome) => (css.match(new RegExp(`--${nome}: (#[0-9A-Fa-f]{6})`)) ?? [])[1];
  for (const fondo of [hex('notte'), '#2A2344', '#332B52']) {
    assert.match(fondo ?? '', /^#[0-9A-Fa-f]{6}$/, 'fondo della notte non trovato nei fogli di stile');
    const c = contrasto(fi.colore, [1, 3, 5].map((k) => parseInt(fondo.slice(k, k + 2), 16)));
    assert.ok(c >= FLOOR, `insegna su ${fondo}: ${c.toFixed(2)}:1`);
  }
  // E il motivo della regola: sul giorno (Carta) lo stesso fronte NON regge.
  const carta = (css.match(/--carta: (#[0-9A-Fa-f]{6})/) ?? [])[1];
  assert.ok(contrasto(fi.colore, [1, 3, 5].map((k) => parseInt(carta.slice(k, k + 2), 16))) < FLOOR, 'su Carta il marchio reggerebbe: la regola della targa non serve piu\'');
});

test('area di rispetto, misurata sui pixel: almeno meta\' maiuscola (5% della larghezza) sui quattro lati', async () => {
  for (const file of [LIBERO, TARGA]) {
    const p = await pixel(file);
    if (file === TARGA) {
      // Sulla targa il fondo e' opaco: il marchio e' cio' che e' piu' chiaro del cielo.
      for (let k = 0; k < p.data.length; k += 4) if (luminanza([p.data[k], p.data[k + 1], p.data[k + 2]]) < 0.12) p.data[k + 3] = 0;
    }
    const [x0, y0, x1, y1] = riquadro(p);
    const larghezza = x1 - x0 + 1;
    const margini = [x0, y0, p.w - 1 - x1, p.h - 1 - y1];
    for (const m of margini) assert.ok(m >= 0.05 * larghezza, `${file}: margine di ${m} px su un marchio largo ${larghezza}`);
  }
  // L'insegna e' ritagliata a filo: l'area di rispetto la da' il foglio di stile (24 px sotto, a 420 px ne servono 22).
  const i = await pixel(INSEGNA);
  const [x0, y0, x1, y1] = riquadro(i);
  assert.ok(x0 <= 1 && y0 <= 1 && i.w - 1 - x1 <= 1 && i.h - 1 - y1 <= 1, 'insegna non ritagliata a filo');
  const css = leggi('src/styles/giorno.css');
  assert.match(css, /\.notte \.insegna \{ margin: 0 0 var\(--s4\);/);
  // La regola e' legata alla notte: nessuna regola dell'insegna fuori da .notte.
  assert.equal((css.match(/(^|\n)\.insegna\b/g) ?? []).length, 0, 'regola .insegna non legata a .notte');
  assert.match(css, /--s4: 24px/);
});

test('sei lingue: l\'alt del marchio e\' il nome che il marchio scrive, e ogni lingua ha i suoi due materiali per la stampa', async () => {
  for (const lingua of LINGUE) {
    const t = await testi(lingua);
    // L'alt di un logo e' cio' che il logo scrive (revisione di design S387, WMFIX): il nome, uguale nelle sei lingue.
    assert.equal(t.games.marchio, 'ROLLQUEST', `${lingua}: alt del marchio`);
    // Stampa.astro collega i primi quattro materiali per posizione: 3 e 4 sono il marchio del gioco.
    const voci = t.stampa.materiali.voci;
    assert.equal(voci.length, 5, `${lingua}: materiali`);
    assert.ok(voci[2].descrizione.includes('ROLLQUEST') && /PNG/.test(voci[2].descrizione), `${lingua}: terzo materiale`);
    assert.ok(/PNG/.test(voci[3].descrizione) && voci[3].termine.startsWith(voci[2].termine), `${lingua}: quarto materiale`);
    assert.ok((t.stampa.materiali.uso.match(/ROLLQUEST/g) ?? []).length === 1, `${lingua}: regola d'uso del marchio`);
  }
});

test('sorgenti: il marchio e\' un\'immagine col suo alt, il nome resta testo vero nei titoli', () => {
  const games = leggi('src/components/giorno/games/Games.astro');
  const home = leggi('src/components/giorno/Home.astro');
  assert.match(games, /<p class="insegna"><img src=\{insegna\.src\} width=\{insegna\.width\} height=\{insegna\.height\} alt=\{g\.marchio\}/);
  assert.match(home, /<p class="insegna"><img src=\{insegna\.src\} width=\{insegna\.width\} height=\{insegna\.height\} alt=\{t\.games\.marchio\} loading="lazy"/);
  // Il titolo resta testo: chi non vede l'immagine legge comunque il nome.
  assert.match(games, /<h1><Prosa testo=\{g\.titolo\} \/><\/h1>/);
  // L'insegna vive solo sulla notte: nessun componente del giorno la usa.
  for (const f of ['finance/Finance.astro', 'servizio/Stampa.astro', 'Testata.astro', 'Colophon.astro']) {
    const p = path.join(SITO, 'src/components/giorno', f);
    if (existsSync(p)) assert.ok(!/class="insegna"/.test(readFileSync(p, 'utf8')), `${f}: insegna fuori dalla notte`);
  }
  const telaio = leggi('src/layouts/Pagina.astro');
  assert.match(telaio, /tipo === 'gioco' \? 'og-rollquest\.png' : 'og-image\.png'/);
  const stampa = leggi('src/components/giorno/servizio/Stampa.astro');
  assert.match(stampa, /rollquest-wordmark-targa\.png`,\s*`\$\{base\}\/assets\/rollquest-wordmark\.png`/);
});
