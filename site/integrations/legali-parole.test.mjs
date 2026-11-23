// LE PAGINE LEGALI DEL SITO DICONO LE STESSE PAROLE DEI .md DELL'APP (S398,
// rilievo del code-reviewer: il byte per byte di privacy-pagine.test.mjs
// confronta il renderer con se stesso). Oracolo indipendente in
// legali-parole.mjs: markup del .md e tag della pagina tolti con regole proprie,
// poi parola per parola, per privacy, terms e disclaimer nelle sei lingue.
// ASCII-only: questo file e' codice.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { AVVISO_LEGALE } from '../src/lib/avviso-legale.mjs';
import { differenze, paroleMd, parolePagina } from './legali-parole.mjs';
import { LEGALI_APP, SITO, mancaNelRepo } from './quale-repo.mjs';

const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];
/** Nel repo pubblico le sorgenti stanno in legal/ (radice = italiano). */
const LEGALI_PUBBLICO = path.resolve(SITO, '..', 'legal');

function sorgente(l, nome) {
  if (existsSync(LEGALI_APP)) return path.join(LEGALI_APP, l, `${nome}.md`);
  return path.join(LEGALI_PUBBLICO, ...(l === 'it' ? [] : [l]), `${nome}.md`);
}
const pagina = (l, id) => path.join(SITO, 'src', 'pages', ...(l === 'it' ? [] : [l]), `${id}.astro`);
const leggi = (p) => readFileSync(p, 'utf8');

test('ogni pagina legale (privacy, terms, disclaimer x6) ha le parole e il titolo del suo .md', (t) => {
  const mancanti = [];
  const diverse = [];
  let confronti = 0;
  for (const d of AVVISO_LEGALE.documenti) {
    for (const l of LINGUE) {
      const s = sorgente(l, d.sorgente);
      if (!existsSync(s)) { mancanti.push(s); continue; }
      const md = paroleMd(leggi(s));
      const pg = parolePagina(leggi(pagina(l, d.id)));
      assert.ok(md.parole.length > 400, `${l}/${d.id}: solo ${md.parole.length} parole nella sorgente`);
      const diff = differenze(md.parole, pg.parole);
      if (diff.conta > 0) diverse.push(`${l}/${d.id}: ${diff.conta} parole diverse; ${diff.esempi.join(' | ')}`);
      if (md.titolo !== pg.titolo) diverse.push(`${l}/${d.id}: titolo "${pg.titolo}" invece di "${md.titolo}"`);
      confronti++;
    }
  }
  if (mancanti.length) {
    mancaNelRepo(t, `sorgenti assenti: ${mancanti.join(', ')}`);
    return;
  }
  assert.equal(confronti, 18);
  assert.deepEqual(diverse, [], 'una pagina legale non dice le parole della sua sorgente: rigenera con node strumenti/privacy-da-md.mjs');
});

test('mutanti: una frase persa, una parola cambiata, un titolo cambiato fanno differenza', () => {
  const md = leggi(sorgente('en', 'terms_of_service'));
  const pg = leggi(pagina('en', 'terms'));
  const base = paroleMd(md);
  // Una frase della sorgente tolta dalla pagina (il renderer che perde testo).
  const frase = 'If you do not accept them, you must uninstall the App';
  assert.ok(pg.includes(frase), 'la frase del mutante non e\' nella pagina');
  const persa = parolePagina(pg.replace(frase, ''));
  const d1 = differenze(base.parole, persa.parole);
  assert.ok(d1.conta >= 10, `frase persa: ${d1.conta}`);
  assert.match(d1.esempi[0], /manca nella pagina "If"/);
  // Una parola cambiata (una cifra in un importo o una data).
  const cambiata = parolePagina(pg.replace('<strong>Version</strong>: 1.1.2', '<strong>Version</strong>: 1.1.3'));
  assert.equal(differenze(base.parole, cambiata.parole).conta, 2);
  // Una parola aggiunta.
  const aggiunta = parolePagina(pg.replace('<h2 id="s1">1. Parties</h2>', '<h2 id="s1">1. Parties</h2><p>nuova</p>'));
  assert.deepEqual(differenze(base.parole, aggiunta.parole).esempi, ['in piu\' nella pagina "nuova" dopo "for jurisdiction) 1. Parties"']);
  // Titolo diverso.
  assert.notEqual(parolePagina(pg.replace('titolo="Terms of Service', 'titolo="Terms of service')).titolo, base.titolo);
});

test('oracolo: markup tolto senza perdere parole', () => {
  const md = '# T -- X\n\n**Versione**: 1.0.5\n\n## 1. Uno\n\nTesto con **grassetto**-attaccato e `codice` e [link](https://a.b) e <https://c.d>.\n- voce uno\n2. voce due\n+ piu\' a capo\n\n> citazione\n\n| a | b |\n|---|---|\n| c | d |\n\n---\n';
  const r = paroleMd(md);
  assert.equal(r.titolo, 'T -- X');
  assert.deepEqual(r.parole, ['Versione:', '1.0.5', '1.', 'Uno', 'Testo', 'con', 'grassetto-attaccato', 'e', 'codice', 'e', 'link', 'e', 'https://c.d.',
    'voce', 'uno', 'voce', 'due', '+', 'piu\'', 'a', 'capo', 'citazione', 'a', 'b', 'c', 'd']);
  const p = parolePagina('---\nconst x = 1;\n---\n<Documento lingua="it" titolo="T -- X &amp; Y" indice={toc}>\n<p>Uno <strong>due</strong>-tre &#123;x&#125;</p></Documento>');
  assert.equal(p.titolo, 'T -- X & Y');
  assert.deepEqual(p.parole, ['Uno', 'due-tre', '{x}']);
  assert.throws(() => parolePagina('<p>senza documento</p>'), /senza <Documento/);
  assert.throws(() => paroleMd('niente titolo'), /senza H1/);
  assert.throws(() => parolePagina('<Documento titolo="a">&bogus;</Documento>'), /sconosciuta/);
});
