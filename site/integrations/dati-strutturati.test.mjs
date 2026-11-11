// I PRESIDI DEI DATI STRUTTURATI (S384, revisione di chiusura). Il JSON-LD di
// ogni pagina esce da `datiStrutturati` (src/lib/dati-strutturati.mjs), che
// scappa ogni `<`: senza, un `</script>` dentro un testo chiuderebbe il blocco
// e il resto diventerebbe HTML della pagina. Girano con `npm test` PRIMA della
// build: provano la funzione e leggono i sorgenti. Il contratto sul costruito
// sta in integrations/costruito/sito.test.mjs.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { datiStrutturati } from '../src/lib/dati-strutturati.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Quello che fa il lettore di HTML con un blocco di dati: lo chiude al primo
 * `</script` seguito da spazio, `/` o `>`, maiuscole comprese. Rende il corpo
 * che ne ricava e l'HTML che avanza dopo la chiusura.
 */
function comeLoLeggeIlBrowser(testo) {
  const html = `<script type="application/ld+json">${testo}</script>`;
  const m = html.match(/^<script type="application\/ld\+json">([\s\S]*?)<\/script[\s/>]/i);
  return { corpo: m[1], avanzo: html.slice(m[0].length) };
}

/** I file `.astro` sotto src/, a ogni profondita'. */
function sorgentiAstro(dir = 'src') {
  const trovati = [];
  for (const f of readdirSync(path.join(SITO, dir), { withFileTypes: true })) {
    const rel = `${dir}/${f.name}`;
    if (f.isDirectory()) trovati.push(...sorgentiAstro(rel));
    else if (f.name.endsWith('.astro')) trovati.push(rel);
  }
  return trovati;
}

const OSTILI = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Chiude il blocco? </script><script>alert(1)</script> e poi?',
      acceptedAnswer: { '@type': 'Answer', text: 'Maiuscole e spazi: </SCRIPT >, </script/x>, <!-- <script> -->' },
    },
    { '@type': 'Question', name: 'a < b, e una coda <', acceptedAnswer: { '@type': 'Answer', text: '<<<' } },
  ],
  '<chiave>': ['</script>', { '<': '<' }],
};

test('un </script> in un testo non esce dal blocco: nessun "<" nel testo scritto, e i dati tornano identici', () => {
  const testo = datiStrutturati(OSTILI);
  assert.equal(testo.includes('<'), false, `resta un "<": ${testo.slice(0, 160)}`);
  const { corpo, avanzo } = comeLoLeggeIlBrowser(testo);
  assert.equal(corpo, testo, 'il lettore di HTML chiude il blocco prima della fine');
  assert.equal(avanzo, '', 'dopo il blocco avanza HTML');
  assert.deepEqual(JSON.parse(corpo), OSTILI);
});

test('il lettore simulato e\' fedele: lo stesso testo senza la cura esce dal blocco', () => {
  // Controprova dell'oracolo qui sopra: se questa non fosse vera, la prova di
  // prima passerebbe anche con un lettore che non chiude mai.
  const { corpo, avanzo } = comeLoLeggeIlBrowser(JSON.stringify(OSTILI));
  assert.throws(() => JSON.parse(corpo), SyntaxError);
  assert.ok(avanzo.startsWith('<script>alert(1)</script>'), `avanzo: ${avanzo.slice(0, 80)}`);
});

test('senza "<" il testo e\' quello di JSON.stringify, byte per byte', () => {
  const casi = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: 'PluriFin', inLanguage: ['it', 'en'] },
    { a: 'virgolette " e barre \\ e a capo \n', b: 'accenti: perch\u00e9, soci\u00e9t\u00e9, Gr\u00f6\u00dfe', c: 'a > b & c', d: null, e: 1.5, f: [true, false] },
    {},
    [],
    'testo',
    7,
  ];
  for (const dati of casi) assert.equal(datiStrutturati(dati), JSON.stringify(dati));
});

test('si scappa soltanto "<", e soltanto come \\u003c', () => {
  assert.equal(datiStrutturati('<'), '"\\u003c"');
  assert.equal(datiStrutturati({ t: '</script>' }), '{"t":"\\u003c/script>"}');
  // Un testo che contiene gia' i sei caratteri `\u003c` resta quel testo.
  const letterale = { t: 'scritto a mano: \\u003c e poi <' };
  assert.deepEqual(JSON.parse(datiStrutturati(letterale)), letterale);
  assert.equal(JSON.parse(datiStrutturati(letterale)).t.includes('\\u003c'), true);
});

test('sorgenti: ogni blocco ld+json e\' scritto con datiStrutturati, nessuno con JSON.stringify', () => {
  const file = sorgentiAstro();
  assert.ok(file.length >= 40, `sorgenti .astro letti: ${file.length}`);
  let blocchi = 0;
  for (const f of file) {
    const s = readFileSync(path.join(SITO, f), 'utf8');
    const nominati = s.split('application/ld+json').length - 1;
    const scritti = [...s.matchAll(/<script type="application\/ld\+json"([^\n]*)/g)];
    assert.equal(scritti.length, nominati, `${f}: un blocco ld+json scritto in una forma che il presidio non legge`);
    for (const m of scritti) {
      assert.ok(m[1].startsWith(' set:html={datiStrutturati('), `${f}: blocco ld+json senza datiStrutturati:${m[1].slice(0, 60)}`);
      blocchi += 1;
    }
    assert.ok(!/set:html=\{\s*JSON\.stringify/.test(s), `${f}: JSON.stringify dentro un set:html`);
  }
  assert.ok(blocchi >= 2, `blocchi ld+json nei sorgenti: ${blocchi}`);
});
