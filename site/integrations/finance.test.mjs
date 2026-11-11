// I PRESIDI DELLA PAGINA FINANCE (S384, corsia B1): i conti del palco del
// telefono, le schermate vere e il loro registro, i sorgenti della pagina.
// Girano con `npm test` PRIMA della build: non leggono dist/. I contratti sul
// sito costruito stanno in integrations/costruito/finance.test.mjs.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { corrente, elenco, gruppo, linea, passato, schermata } from '../src/components/giorno/finance/telefono-conti.mjs';
import { LARGHEZZA, LINGUE, SCHERMATE, sorgente } from '../strumenti/schermate.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leggiTesto = (rel) => readFileSync(path.join(SITO, rel), 'utf8');
const FINANCE = 'src/components/giorno/finance';

/* --------------------------- i conti del telefono --------------------------- */

test('passato: 0 quando la cima del passo tocca la riga, 1 quando la tocca il fondo, non stretto', () => {
  assert.equal(passato(500, 400, 500), 0);
  assert.equal(passato(100, 400, 500), 1);
  assert.equal(passato(300, 400, 500), 0.5);
  assert.equal(passato(900, 400, 500), -1);
  assert.equal(passato(-300, 400, 500), 2);
});

test('passato: un passo senza altezza non divide per zero', () => {
  assert.equal(passato(100, 0, 500), 1);
  assert.equal(passato(900, 0, 500), 0);
  assert.equal(passato(100, Number.NaN, 500), 1);
});

test('gruppo: dalla cima del primo passo al fondo dell\'ultimo, stretto fra 0 e 1', () => {
  assert.equal(gruppo(500, 1500, 500), 0);
  assert.equal(gruppo(-500, 500, 500), 1);
  assert.equal(gruppo(0, 1000, 500), 0.5);
  assert.equal(gruppo(2000, 3000, 500), 0);
  assert.equal(gruppo(-9000, -8000, 500), 1);
});

test('corrente: l\'ultimo passo la cui cima ha superato la riga', () => {
  assert.equal(corrente([600, 1200, 1800], 500), -1);
  assert.equal(corrente([500, 1200, 1800], 500), 0);
  assert.equal(corrente([-700, -100, 500], 500), 2);
  assert.equal(corrente([-700, -100, 501], 500), 1);
  assert.equal(corrente([], 500), -1);
});

test('schermata: il passo si divide in parti uguali, una per schermata', () => {
  assert.equal(schermata([0, 1, 2], 0), 0);
  assert.equal(schermata([0, 1, 2], 0.34), 1);
  assert.equal(schermata([0, 1, 2], 0.67), 2);
  assert.equal(schermata([0, 1, 2], 1), 2);
  assert.equal(schermata([0, 1, 2], 7), 2);
  assert.equal(schermata([0, 1, 2], -3), 0);
  assert.equal(schermata([3], 0.5), 3);
});

test('schermata ed elenco: una lista vuota o rotta non chiede una schermata che non esiste', () => {
  assert.equal(schermata([], 0.5), -1);
  assert.equal(schermata(null, 0.5), -1);
  assert.deepEqual(elenco('0 1 2', 4), [0, 1, 2]);
  assert.deepEqual(elenco('3', 4), [3]);
  assert.deepEqual(elenco('0 9 x -1 2.5 3', 4), [0, 3]);
  assert.deepEqual(elenco('', 4), []);
  assert.deepEqual(elenco(undefined, 4), []);
  assert.deepEqual(elenco('0 1', 0), []);
});

test('linea: la riga di lettura resta dentro la finestra', () => {
  assert.equal(linea(' .76'), 0.76);
  assert.equal(linea('0.55'), 0.55);
  assert.equal(linea(''), 0.55);
  assert.equal(linea('1.4'), 0.55);
  assert.equal(linea('0'), 0.55);
  assert.equal(linea('-0.2', 0.6), 0.6);
});

/* ----------------------------- le schermate vere ----------------------------- */

test('schermate: quattro, nell\'ordine del palco, da catture che esistono per nome', () => {
  assert.deepEqual(Object.keys(SCHERMATE), ['portafoglio', 'mercato', 'ribilanciamento', 'analisi']);
  assert.equal(sorgente('it', 'portafoglio'), 'it_01_home_populated.png');
  assert.equal(sorgente('de', 'analisi'), 'de_08_ai_analysis.png');
  assert.throws(() => sorgente('xx', 'portafoglio'), /lingua sconosciuta/);
  assert.throws(() => sorgente('it', 'impostazioni'), /schermata sconosciuta/);
  assert.equal(LINGUE.length, 6);
  // Le impostazioni mostrano i campi delle chiavi API: non devono entrare mai.
  assert.ok(!Object.values(SCHERMATE).some((s) => /settings|paywall/.test(s)));
});

test('schermate: ogni lingua presente ha le quattro immagini che il registro dichiara', () => {
  const radice = path.join(SITO, 'src/assets/pm');
  const lingue = readdirSync(radice);
  assert.ok(lingue.includes('it'), 'mancano le schermate italiane');
  for (const lingua of lingue) {
    assert.ok(LINGUE.includes(lingua), `cartella estranea in src/assets/pm: ${lingua}`);
    const registro = JSON.parse(readFileSync(path.join(radice, lingua, 'PROVENIENZA.json'), 'utf8'));
    assert.equal(registro.larghezza, LARGHEZZA);
    assert.deepEqual(Object.keys(registro.schermate), Object.keys(SCHERMATE));
    for (const [nome, voce] of Object.entries(registro.schermate)) {
      assert.equal(voce.sorgente, `marketing/screenshots/v9/${sorgente(lingua, nome)}`);
      const disco = readFileSync(path.join(radice, lingua, `${nome}.webp`));
      assert.equal(createHash('sha256').update(disco).digest('hex'), voce.sha256_uscita, `${lingua}/${nome}.webp non e' quella del registro`);
      assert.ok(disco.length < 60 * 1024, `${lingua}/${nome}.webp pesa ${disco.length} byte`);
    }
  }
});

test('testi: le schede del palco sono quattro, una per schermata, con etichetta e descrizione', async () => {
  const it = (await import(new URL('../src/i18n/testi/it.ts', import.meta.url).href)).default;
  assert.equal(it.finance.palco.schermate.length, Object.keys(SCHERMATE).length);
  for (const s of it.finance.palco.schermate) {
    assert.ok(s.termine.length > 0 && s.termine.length <= 18, `etichetta lunga: ${s.termine}`);
    assert.ok(s.descrizione.length >= 40, `descrizione corta: ${s.descrizione}`);
  }
  assert.ok(it.finance.palco.titolo.length > 0);
});

/* ---------------------------- i sorgenti della pagina ---------------------------- */

test('sorgenti: la pagina Finance non ha script in linea, attributi style ne\' HTML scritto da script', () => {
  const file = [...readdirSync(path.join(SITO, FINANCE)).map((f) => `${FINANCE}/${f}`), 'src/pages/finance.astro'];
  assert.ok(file.length >= 6, `pochi file in ${FINANCE}: ${file.length}`);
  for (const f of file) {
    const s = leggiTesto(f);
    assert.ok(!/is:inline/.test(s), `${f}: is:inline`);
    assert.ok(!/\sstyle=/.test(s), `${f}: attributo style`);
    assert.ok(!/define:vars/.test(s), `${f}: define:vars genera stile in linea`);
    assert.ok(!/innerHTML|insertAdjacentHTML|document\.write|set:html/.test(s), `${f}: scrittura di HTML`);
    assert.ok(!/https?:\/\/(?!plurifin\.app)/.test(s), `${f}: indirizzo esterno`);
  }
  assert.match(leggiTesto('src/pages/finance.astro'), /PaginaFinance/);
  assert.ok(!/LandingPage/.test(leggiTesto('src/pages/finance.astro')), '/finance e\' ancora sul telaio vecchio');
});

test('sorgenti: Google Play esce solo dietro pmSuPlay', () => {
  const s = leggiTesto(`${FINANCE}/PaginaFinance.astro`);
  const righe = s.split('\n').filter((r) => /pmPlayUrl|azioni\.play|provare\.suPlay/.test(r) && !/^import /.test(r.trim()));
  assert.ok(righe.length >= 3, 'attese almeno tre righe che mandano a Google Play');
  for (const r of righe) assert.match(r, /pmSuPlay &&/, `non governata da pmSuPlay: ${r.trim()}`);
});

test('stile: undici estratti con posizione propria, riposo a estratti dentro, quattro schede', () => {
  const css = leggiTesto('src/styles/finance.css');
  assert.equal((css.match(/\.fin-foglio:nth-child\(\d+\)\s*\{ --d:/g) ?? []).length, 11);
  assert.match(css, /\.fin-scena \{\s*--u: 1; --v: 0;/);
  assert.equal((css.match(/:checked ~ \.fin-spazio \.fin-schermata:nth-of-type\(\d\)/g) ?? []).length, 4);
  assert.equal((css.match(/:focus-visible ~ \.fin-schede label:nth-of-type\(\d\)/g) ?? []).length, 4);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.ok(!/transition:\s*all/.test(css), 'transition: all');
  assert.ok(!/filter:/.test(css), 'un filtro appiattisce la scena 3D');
});

test('script: movimento ridotto rispettato, nessuna scrittura di stile fuori dalle due variabili', () => {
  const s = leggiTesto(`${FINANCE}/telefono.ts`);
  assert.match(s, /prefers-reduced-motion: reduce\)'\)\.matches\) return;/);
  const scritture = [...s.matchAll(/style\.setProperty\('([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(scritture.sort(), ['--u', '--v']);
  assert.ok(!/setAttribute\('style'|cssText/.test(s));
});
