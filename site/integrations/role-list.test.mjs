/**
 * Prove di `role-list.mjs`.
 *
 * Il criterio non e' "gira": e' che MORDA. Ogni proprieta' dichiarata nel
 * docstring dell'integrazione ha qui il suo caso, e i casi negativi (cio' che
 * NON si deve toccare) sono la meta' che conta - un'integrazione che riscrive
 * l'HTML servito puo' rompere una pagina in silenzio.
 *
 * Girare:  node --test integrations/role-list.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { aggiungiRuoloLista, listeSenzaRuolo } from './role-list.mjs';

const marca = (html) => aggiungiRuoloLista(html).html;

test('una lista nuda prende il ruolo', () => {
  assert.equal(marca('<ul><li>a</li></ul>'), '<ul role="list"><li>a</li></ul>');
  assert.equal(marca('<ol><li>a</li></ol>'), '<ol role="list"><li>a</li></ol>');
});

test('gli attributi che c erano restano, e il ruolo va in coda', () => {
  assert.equal(
    marca('<ul class="grid" data-x="1"><li>a</li></ul>'),
    '<ul class="grid" data-x="1" role="list"><li>a</li></ul>',
  );
});

test('un ruolo gia scritto NON si sovrascrive', () => {
  for (const gia of ['role="list"', 'role="menu"', 'role="tablist"',
                     'role="presentation"', "role='none'"]) {
    const html = `<ul ${gia}><li>a</li></ul>`;
    assert.equal(marca(html), html, `sovrascritto ${gia}`);
  }
});

test('il tag di CHIUSURA non viene toccato', () => {
  assert.equal(marca('</ul>'), '</ul>');
  assert.equal(marca('</ol>'), '</ol>');
});

test('dentro le regioni protette <ul> e TESTO, non markup', () => {
  // Un post che MOSTRA dell'HTML: riscriverlo cambierebbe cio' che si legge.
  const pre = '<pre><code>&lt;ul&gt;</code></pre>';
  assert.equal(marca(pre), pre);
  const script = '<script>const s = "<ul>";</script>';
  assert.equal(marca(script), script);
  const style = '<style>/* <ul> */</style>';
  assert.equal(marca(style), style);
  const textarea = '<textarea><ul></textarea>';
  assert.equal(marca(textarea), textarea);
});

test('una lista VERA dopo una regione protetta viene comunque marcata', () => {
  // Il controllo che dimostra che la regione protetta si CHIUDE: se lo scanner
  // restasse dentro <pre>, la lista dopo uscirebbe muta e nessuno lo vedrebbe.
  assert.equal(
    marca('<pre><ul></pre><ul><li>a</li></ul>'),
    '<pre><ul></pre><ul role="list"><li>a</li></ul>',
  );
});

test('un > dentro un attributo non chiude il tag', () => {
  assert.equal(
    marca('<ul data-x="a>b"><li>c</li></ul>'),
    '<ul data-x="a>b" role="list"><li>c</li></ul>',
  );
});

test('e idempotente: il secondo giro non aggiunge nulla', () => {
  const uno = aggiungiRuoloLista('<ul><li>a</li></ul><ol><li>b</li></ol>');
  assert.equal(uno.aggiunte, 2);
  const due = aggiungiRuoloLista(uno.html);
  assert.equal(due.aggiunte, 0);
  assert.equal(due.html, uno.html);
});

test('non tocca il resto del documento', () => {
  const html = '<!doctype html><html><body><p>ciao &amp; arrivederci</p>'
    + '<div><span>x</span></div></body></html>';
  assert.equal(marca(html), html);
});

test('MUTATION-SANITY: la misura vede le liste mute', () => {
  // Se `listeSenzaRuolo` tornasse sempre 0, i due test qui sopra passerebbero
  // lo stesso e il presidio della build sarebbe cieco. Qui si pretende che la
  // misura sia DIVERSA da zero su un input rotto e ZERO su uno sano.
  assert.equal(listeSenzaRuolo('<ul><li>a</li></ul><ul><li>b</li></ul>'), 2);
  assert.equal(listeSenzaRuolo('<ul role="list"><li>a</li></ul>'), 0);
});

test('menu non e una lista per questa integrazione', () => {
  // Il reset CSS colpisce anche <menu>, ma <menu> ha gia' un ruolo implicito
  // suo e non e' fra i 154 contati: si dichiara, non si allarga di nascosto.
  assert.equal(marca('<menu><li>a</li></menu>'), '<menu><li>a</li></menu>');
});
