/**
 * Prove di `lock-integrity.mjs`, e presidio sulla lock VERA del sito.
 *
 * Il criterio non e' "gira": e' che MORDA. La meta' che conta e' l'ultima:
 * la lock spedita deve uscire pulita, e la STESSA lock con la potatura storica
 * riapplicata deve uscire rossa. Se la seconda passasse, la prima non
 * proverebbe niente.
 *
 * Girare:  node --test integrations/lock-integrity.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { candidati, dipendenzeNonRisolte } from './lock-integrity.mjs';

const leggiLock = () => JSON.parse(
  readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'),
);

const nomi = (lock) => dipendenzeNonRisolte(lock).map((m) => `${m.da} -> ${m.nome} [${m.campo}]`);

test('candidati: la risalita e quella di Node, dal piu vicino alla radice', () => {
  assert.deepEqual(candidati('', 'x'), ['node_modules/x']);
  assert.deepEqual(candidati('node_modules/a', 'x'), [
    'node_modules/a/node_modules/x',
    'node_modules/x',
  ]);
  assert.deepEqual(candidati('node_modules/a/node_modules/@s/b', '@t/x'), [
    'node_modules/a/node_modules/@s/b/node_modules/@t/x',
    'node_modules/a/node_modules/@t/x',
    'node_modules/@t/x',
  ]);
});

test('una dipendenza al primo livello risolve', () => {
  const lock = { packages: {
    '': { dependencies: { a: '^1.0.0' } },
    'node_modules/a': { version: '1.0.0', dependencies: { b: '^2.0.0' } },
    'node_modules/b': { version: '2.0.0' },
  } };
  assert.deepEqual(nomi(lock), []);
});

test('una copia annidata sotto il PROPRIO pacchetto risolve, e vince sulla radice', () => {
  const lock = { packages: {
    '': { dependencies: { a: '^1.0.0' } },
    'node_modules/a': { version: '1.0.0', dependencies: { b: '^1.0.0' } },
    'node_modules/a/node_modules/b': { version: '1.0.0', dependencies: { c: '^1.0.0' } },
    'node_modules/c': { version: '1.0.0' },
  } };
  assert.deepEqual(nomi(lock), []);
});

test('LA FORMA STORICA: una copia annidata ALTROVE non conta', () => {
  // E' la lock potata del 2026-09-19 in miniatura: `core` esiste, ma solo sotto
  // `binding`, e da `node_modules/runtime` la risalita di Node non ci arriva.
  const lock = { packages: {
    '': { dependencies: { binding: '^1.0.0', runtime: '^1.0.0' } },
    'node_modules/binding': { version: '1.0.0', dependencies: { core: '1.0.0' } },
    'node_modules/binding/node_modules/core': { version: '1.0.0' },
    'node_modules/runtime': { version: '1.0.0', peerDependencies: { core: '^1.0.0' } },
  } };
  assert.deepEqual(nomi(lock), ['node_modules/runtime -> core [peerDependencies]']);
});

test('un peer OPZIONALE assente non e un difetto, uno richiesto si', () => {
  const lock = { packages: {
    '': { dependencies: { a: '^1.0.0' } },
    'node_modules/a': {
      version: '1.0.0',
      peerDependencies: { facoltativo: '^1.0.0', richiesto: '^1.0.0' },
      peerDependenciesMeta: { facoltativo: { optional: true } },
    },
  } };
  assert.deepEqual(nomi(lock), ['node_modules/a -> richiesto [peerDependencies]']);
});

test('un peer marcato optional:false resta RICHIESTO', () => {
  const lock = { packages: {
    '': { dependencies: { a: '^1.0.0' } },
    'node_modules/a': {
      version: '1.0.0',
      peerDependencies: { p: '^1.0.0' },
      peerDependenciesMeta: { p: { optional: false } },
    },
  } };
  assert.deepEqual(nomi(lock), ['node_modules/a -> p [peerDependencies]']);
});

test('le optionalDependencies devono esserci TUTTE: e cosi che la lock serve due piattaforme', () => {
  const lock = { packages: {
    '': { dependencies: { nativo: '^1.0.0' } },
    'node_modules/nativo': {
      version: '1.0.0',
      optionalDependencies: { 'nativo-win32-x64': '1.0.0', 'nativo-linux-x64': '1.0.0' },
    },
    'node_modules/nativo-win32-x64': { version: '1.0.0', optional: true, os: ['win32'] },
  } };
  assert.deepEqual(nomi(lock), ['node_modules/nativo -> nativo-linux-x64 [optionalDependencies]']);
});

test('le devDependencies contano per la radice e SOLO per la radice', () => {
  const lock = { packages: {
    '': { dependencies: { a: '^1.0.0' }, devDependencies: { attrezzo: '^1.0.0' } },
    'node_modules/a': { version: '1.0.0', devDependencies: { 'mai-installato': '^1.0.0' } },
  } };
  assert.deepEqual(nomi(lock), ['(radice) -> attrezzo [devDependencies]']);
});

test('una lock non verificabile LANCIA invece di sembrare sana', () => {
  for (const rotta of [null, undefined, {}, { packages: null }, { packages: {} },
                       { lockfileVersion: 1, dependencies: { a: {} } }]) {
    assert.throws(() => dipendenzeNonRisolte(rotta), /non verificabile/);
  }
});

test('PRESIDIO: la lock VERA del sito non ha dipendenze dichiarate e non risolte', () => {
  const lock = leggiLock();
  assert.ok(Object.keys(lock.packages).length > 100, 'lock troppo piccola: e davvero quella del sito?');
  assert.deepEqual(
    nomi(lock), [],
    'voci mancanti nella lock: `npm ci` FALLIREBBE sul runner Linux della CI anche se qui passa. '
    + 'Cura: rigenerarla con `npm install --package-lock-only` su LINUX (WSL o container), '
    + 'oppure rimettere verbatim le voci potate. Storia: integrations/lock-integrity.mjs',
  );
});

test('MUTATION-SANITY sulla lock VERA: togliere una dipendenza diretta fa rosso', () => {
  const lock = leggiLock();
  const diretta = Object.keys(lock.packages[''].dependencies)[0];
  delete lock.packages[`node_modules/${diretta}`];
  assert.ok(
    nomi(lock).includes(`(radice) -> ${diretta} [dependencies]`),
    `tolta ${diretta} dalla lock e il presidio non se ne e accorto`,
  );
});

test('MUTATION-SANITY sulla lock VERA: la potatura storica torna rossa', (t) => {
  const lock = leggiLock();
  const bersaglio = 'node_modules/@emnapi/core';
  if (!Object.hasOwn(lock.packages, bersaglio)) {
    t.skip('la lock non porta piu @emnapi/core al primo livello: la forma storica non e riproducibile su questo file');
    return;
  }
  delete lock.packages[bersaglio];
  delete lock.packages['node_modules/@emnapi/wasi-threads'];
  const mancanti = dipendenzeNonRisolte(lock);
  assert.ok(
    mancanti.some((m) => m.nome === '@emnapi/core' && m.campo === 'peerDependencies'),
    'riapplicata la potatura del 2026-09-19 e il presidio e rimasto verde',
  );
});
