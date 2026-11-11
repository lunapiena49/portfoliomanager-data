// I PALCHI DELLA PRIMA PAGINA, rifinitura S384 (corsia B4): inerzia, fogli che
// atterrano e totale che si somma, i tre tiri del dado, la luce sulle facce, e
// i contratti fra lo script, il foglio di stile e il markup dei palchi.
// Si lancia con `npm test`, prima della build.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  FACCE_DADO, SCALA_FOGLI, TIRI, alzata, andatura, atterrato, facciaInAlto, insegui, luciDado,
  quota, sommaAtterrata, tiri,
} from '../src/lib/palco-conti.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leggi = (f) => readFileSync(path.join(SITO, f), 'utf8');
const CENTESIMI = [2140800, 498735, 824010, 611572, 302000, 125040, 1233090, 987025, 241560, 566000, 198015];
const TOTALE = CENTESIMI.reduce((a, b) => a + b, 0);

// ------------------------------- inerzia -------------------------------

test('insegui: si avvicina senza passare oltre e alla fine si posa esattamente', () => {
  let v = 0;
  let prima = 0;
  let fotogrammi = 0;
  while (v !== 1 && fotogrammi < 400) {
    v = insegui(v, 1, 16.7);
    assert.ok(v >= prima && v <= 1, `fotogramma ${fotogrammi}: ${v}`);
    prima = v;
    fotogrammi += 1;
  }
  assert.equal(v, 1, 'non si posa mai: il ciclo dei fotogrammi non si fermerebbe');
  assert.ok(fotogrammi > 10 && fotogrammi < 120, `inerzia fuori misura: ${fotogrammi} fotogrammi`);
});

test('insegui: fermo se il tempo non passa, salvo se rotto, mai un NaN', () => {
  assert.equal(insegui(0.3, 0.9, 0), 0.3);
  assert.equal(insegui(0.3, 0.9, -50), 0.3);
  assert.equal(insegui(Number.NaN, 0.4, 16), 0.4);
  assert.equal(insegui(0.4, Number.NaN, 16), 0.4);
  assert.ok(Math.abs(insegui(0, 1, 1e9) - 1) < 1e-9, 'un fotogramma lunghissimo arriva, non scavalca');
});

// ---------------------- fogli che atterrano, totale ----------------------

test('fogli: atterrano uno dopo l\'altro, l\'ultimo esattamente a p = 1', () => {
  for (let i = 0; i < 11; i += 1) {
    assert.equal(atterrato(0, i), 0);
    assert.equal(atterrato(1, i), 1, `il foglio ${i} non e' atterrato a fine corsa`);
  }
  assert.ok(atterrato(0.999, 10) < 1, 'l\'ultimo foglio atterra prima della fine: scala sbagliata');
  for (let i = 1; i < 11; i += 1) {
    assert.ok(atterrato(0.5, i) <= atterrato(0.5, i - 1), 'un foglio atterra prima di quello che lo precede');
  }
});

test('totale: zero all\'inizio, la somma ESATTA alla fine, mai in discesa', () => {
  assert.equal(sommaAtterrata(0, CENTESIMI), 0);
  assert.equal(sommaAtterrata(1, CENTESIMI), TOTALE);
  let prima = 0;
  for (let k = 0; k <= 200; k += 1) {
    const s = sommaAtterrata(k / 200, CENTESIMI);
    assert.ok(Number.isInteger(s), 'il totale deve restare in centesimi interi');
    assert.ok(s >= prima, `il totale scende a p = ${k / 200}`);
    prima = s;
  }
  assert.equal(sommaAtterrata(0.5, []), 0);
});

test('gemelli: la scala dei fogli nello script e\' quella del foglio di stile', () => {
  const css = leggi('src/styles/giorno.css');
  const m = css.match(/--t: clamp\(0, calc\(var\(--p\) \* ([0-9.]+) - var\(--i\) \* ([0-9.]+)\), 1\);/);
  assert.ok(m, 'giorno.css non ha piu\' la riga di --t dei fogli');
  assert.equal(Number(m[1]), SCALA_FOGLI.k);
  assert.equal(Number(m[2]), SCALA_FOGLI.d);
  assert.ok(Math.abs(SCALA_FOGLI.k - 10 * SCALA_FOGLI.d - 1) < 1e-9, 'con undici fogli l\'ultimo deve posarsi a p = 1');
});

// ------------------------------ il dado ------------------------------

test('dado: e\' un dado vero, le facce opposte sommano sette', () => {
  const [davanti, destra, dietro, sinistra, sopra, sotto] = FACCE_DADO;
  assert.equal(davanti + dietro, 7);
  assert.equal(destra + sinistra, 7);
  assert.equal(sopra + sotto, 7);
  assert.deepEqual([...FACCE_DADO].sort(), [1, 2, 3, 4, 5, 6]);
});

test('dado: da fermo mostra il numero dell\'Ascesa, e il sei in cima', () => {
  const inAlto = (p) => {
    const d = tiri(p, 60, 400);
    return facciaInAlto(d.r1, d.r2, d.r3);
  };
  assert.equal(inAlto(0), 1);
  assert.equal(inAlto(0.1), 1);
  assert.equal(inAlto(0.3), 2);
  assert.equal(inAlto(0.45), 2);
  assert.equal(inAlto(0.6), 3);
  assert.equal(inAlto(0.75), 3);
  assert.equal(inAlto(0.9), 6);
  assert.equal(inAlto(1), 6);
  assert.equal(inAlto(0.23), 0, 'a meta\' tiro nessuna faccia e\' in piano');
});

test('dado: ogni tiro finisce quando cambia l\'etichetta dell\'Ascesa', () => {
  // quota() cambia tratto a 0.3 e 0.6 e va in cima a 0.9: i tiri finiscono li'.
  assert.deepEqual(TIRI.map((t) => t.a), [0.3, 0.6, 0.9]);
  for (const t of TIRI) {
    assert.ok(t.da < t.a && t.da >= 0);
    assert.notEqual(quota(t.a - 0.001, 3), quota(t.a, 3), `a ${t.a} l'etichetta non cambia`);
  }
});

test('dado: rotola senza strisciare, non esce dalla pista, si alza solo sullo spigolo', () => {
  const lato = 60;
  const fine = tiri(1, lato, 400);
  assert.equal(fine.r1, 270);
  assert.equal(fine.r2, 90);
  assert.equal(fine.r3, 270);
  assert.equal(fine.dx, 6 * lato);
  assert.equal(fine.fondo, 1);
  assert.ok(Math.abs(fine.dy) < 1e-9, 'a fine corsa il dado e\' posato');
  assert.ok(Math.abs(tiri(0, lato, 400).dy) < 1e-9);
  assert.ok(tiri(0.23, lato, 400).dy < -1, 'a meta\' tiro il dado non si alza');
  // Pista corta: il passo si accorcia (un sesto di pista a quarto di giro) e il dado resta dentro.
  assert.ok(Math.abs(tiri(0.3, lato, 200).dx - 100) < 1e-9, 'su una pista corta il primo tiro deve fermarsi a meta pista');
  assert.ok(Math.abs(tiri(1, lato, 200).dx - 200) < 1e-9);
  for (let k = 0; k <= 100; k += 1) {
    const d = tiri(k / 100, lato, 200);
    assert.ok(d.dx >= 0 && d.dx <= 200 + 1e-9, `fuori pista a p = ${k / 100}: ${d.dx}`);
  }
  const zero = tiri(0.5, 0, 0);
  assert.ok(Number.isFinite(zero.dx) && Number.isFinite(zero.dy));
});

test('andatura: ferma agli estremi, dondola di poco oltre la faccia e torna', () => {
  assert.equal(andatura(0, 3), 0);
  assert.equal(andatura(1, 3), 3);
  assert.equal(andatura(-1, 3), 0);
  assert.equal(andatura(2, 3), 3);
  const picco = Math.max(...Array.from({ length: 101 }, (_, k) => andatura(k / 100, 3)));
  assert.ok(picco > 3.01 && picco < 3.12, `dondolo fuori misura: ${picco}`);
  assert.ok(Math.abs(alzata(0, 60)) < 1e-9 && Math.abs(alzata(90, 60)) < 1e-9);
  assert.ok(Math.abs(alzata(45, 60) - 30 * (Math.SQRT2 - 1)) < 1e-9, 'sullo spigolo il centro sale di (radice di 2 - 1) mezzi lati');
});

test('luce: a riposo tre toni distinti sulle tre facce che si vedono', () => {
  // Si vedono: sopra, davanti, sinistra (la vista ruota il dado di 24 gradi).
  const inizio = luciDado(0, 0, 0);
  assert.equal(inizio[4], 2, 'la faccia in alto e\' in piena luce');
  assert.equal(inizio[0], 1, 'la faccia davanti e\' di taglio');
  assert.equal(inizio[3], 0, 'la faccia di sinistra e\' in ombra');
  const fine = luciDado(270, 90, 270);
  assert.equal(fine.filter((l) => l === 2).length, 1, 'a riposo una sola faccia in piena luce');
  for (const l of [...inizio, ...fine]) assert.ok([0, 1, 2].includes(l));
});

// ------------------- contratti con markup e foglio di stile -------------------

test('markup: i palchi non hanno attributi style ne\' HTML scritto da script', () => {
  for (const f of ['src/components/giorno/Home.astro', 'src/components/giorno/PalcoEstratti.astro', 'src/components/giorno/PalcoTorre.astro']) {
    const s = leggi(f);
    assert.ok(!/\sstyle=/.test(s), `${f}: attributo style`);
    assert.ok(!/is:inline|define:vars/.test(s), `${f}: stile o script in linea`);
  }
  const script = leggi('src/lib/palco.ts');
  assert.ok(!/innerHTML|insertAdjacentHTML|document\.write|setAttribute\('style'/.test(script));
  assert.ok(/prefers-reduced-motion: reduce/.test(script), 'lo script deve fermarsi col movimento ridotto');
});

test('markup: le scene sono decorative, la frase dell\'imbrunire resta testo vero', () => {
  assert.match(leggi('src/components/giorno/PalcoEstratti.astro'), /<div class="palco" aria-hidden="true">/);
  assert.match(leggi('src/components/giorno/PalcoTorre.astro'), /<div class="cielo" data-scena aria-hidden="true">/);
  const casa = leggi('src/components/giorno/Home.astro');
  assert.match(casa, /<div class="sera" aria-hidden="true">/);
  // Lo strato decorativo ha sette figli vuoti: la sua chiusura e' l'ottavo </div>.
  const sera = casa.slice(casa.indexOf('<div class="sera" aria-hidden="true">'));
  let chiusura = -1;
  for (let k = 0; k < 8; k += 1) chiusura = sera.indexOf('</div>', chiusura + 1);
  assert.equal((sera.slice(0, chiusura).match(/<div /g) ?? []).length, 8, 'lo strato della sera non ha sette figli: aggiorna questo test');
  const frase = sera.indexOf('<p>{h.imbrunire}</p>');
  assert.ok(frase > chiusura, 'la frase deve stare FUORI dallo strato decorativo (aria-hidden)');
});

test('stile: senza script le scene sono a riposo, e l\'imbrunire e\' una fascia', () => {
  const css = leggi('src/styles/giorno.css');
  assert.match(css, /\.estratti \{\s*--a: 1; --p: 1; --q: 1;/, 'i fogli devono nascere riuniti');
  assert.match(css, /\.cielo \{\s*--p: 1;/, 'la camera deve nascere in cima');
  assert.match(css, /rotateZ\(var\(--r3, 270deg\)\) rotateX\(var\(--r2, 90deg\)\) rotateZ\(var\(--r1, 270deg\)\)/, 'il dado deve nascere fermo sul sei');
  assert.match(css, /\.sera \{ display: none; \}/, 'gli strati della sera si vedono solo con lo script');
  assert.match(css, /\.palchi-vivi \.imbrunire-scena \{/);
  assert.ok(/classList\.add\('palchi-vivi'\)/.test(leggi('src/lib/palco.ts')));
  assert.ok(!/transition:\s*all/.test(css), 'transition: all');
});

test('stile: le facce del dado e gli angoli di riposo sono quelli dei conti', () => {
  const css = leggi('src/styles/giorno.css');
  assert.deepEqual(TIRI.map((t) => 90 * t.quarti), [270, 90, 270], 'gli angoli di riposo nel CSS vanno aggiornati con TIRI');
  assert.match(css, /\.faccia\[data-luce='1'\] \{ background: var\(--astrale\); \}/);
  assert.match(css, /\.faccia\[data-luce='2'\] \{ background: var\(--astrale-alto\); \}/);
  assert.match(leggi('src/components/giorno/PalcoTorre.astro'), /data-luce=\{riposo\[i\]\}/);
});
