// strumenti/pubblica-avviso.mjs: scrive in `pubblicato` il giorno di ROMA, non
// quello della macchina (S398: in Git Bash `TZ=Europe/Rome date` da' l'UTC e
// alle 23:30 UTC scriveva il giorno prima). Le prove girano su COPIE del file
// in una cartella temporanea: il file vero non si tocca.
// ASCII-only: questo file e' codice.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { nuovoTesto, pubblica } from '../strumenti/pubblica-avviso.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERO = path.join(SITO, 'src', 'lib', 'avviso-legale.mjs');
const CLI = path.join(SITO, 'strumenti', 'pubblica-avviso.mjs');

/** Una copia del file vero con `pubblicato` = valore (null o 'AAAA-MM-GG'). */
function copia(t, valore = null) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'pubblica-avviso-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const f = path.join(dir, 'avviso-legale.mjs');
  copyFileSync(VERO, f);
  const testo = readFileSync(f, 'utf8').replace(/^  pubblicato: (null|'[^']*'),$/m, `  pubblicato: ${valore === null ? 'null' : `'${valore}'`},`);
  writeFileSync(f, testo, 'utf8');
  return f;
}
const pubblicatoIn = async (f) => (await import(`${pathToFileURL(f).href}?v=${Date.now()}-${Math.random()}`)).AVVISO_LEGALE.pubblicato;

function cli(args, tz) {
  const env = { ...process.env };
  if (tz === undefined) delete env.TZ; else env.TZ = tz;
  return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8', env });
}

test('il file vero ha una sola riga pubblicato, nella forma che lo script riscrive', () => {
  const r = nuovoTesto(readFileSync(VERO, 'utf8'), '2026-12-01', { spostaAvanti: true });
  assert.ok(r.cambiato || r.attuale === '2026-12-01');
});

test('23:30 UTC d\'inverno = giorno dopo a Roma: scrive quello, con qualunque TZ della macchina', async (t) => {
  for (const tz of [undefined, 'UTC', 'Europe/Rome', 'America/Los_Angeles', 'Pacific/Kiritimati']) {
    const f = copia(t);
    const r = cli(['--adesso', '2026-11-30T23:30:00Z', '--file', f], tz);
    assert.equal(r.status, 0, `TZ=${tz}: ${r.stderr}`);
    assert.equal(await pubblicatoIn(f), '2026-12-01', `TZ=${tz}`);
    assert.match(r.stdout, /pubblicato: 2026-12-01 \(scritto; prima: null; ora di Roma 2026-12-01 00:30:00\)/);
    // 1 dicembre + 31 giorni di calendario = mezzanotte di Roma del 1 gennaio.
    assert.match(r.stdout, /fine dell'avviso: 2026-12-31T23:00:00\.000Z/);
  }
});

test('bordi della mezzanotte di Roma, inverno ed estate', async (t) => {
  const casi = [
    ['2026-11-30T22:59:59.999Z', '2026-11-30'],
    ['2026-11-30T23:00:00Z', '2026-12-01'],
    ['2027-06-30T21:59:59Z', '2027-06-30'],
    ['2027-06-30T22:30:00Z', '2027-07-01'],
    ['2026-12-31T23:30:00Z', '2027-01-01'],
  ];
  for (const [adesso, atteso] of casi) {
    const f = copia(t);
    const r = await pubblica({ adesso: new Date(adesso), file: f });
    assert.equal(r.giorno, atteso, adesso);
    assert.equal(await pubblicatoIn(f), atteso, adesso);
  }
});

test('--prova non scrive; stesso giorno = nulla da fare; un giorno gia\' scritto si sposta solo in avanti e solo se chiesto', async (t) => {
  const f = copia(t);
  const prova = cli(['--adesso', '2026-12-08T10:00:00Z', '--file', f, '--prova']);
  assert.equal(prova.status, 0, prova.stderr);
  assert.match(prova.stdout, /DA SCRIVERE/);
  assert.equal(await pubblicatoIn(f), null, '--prova ha scritto');

  const g = copia(t, '2026-12-08');
  const uguale = cli(['--adesso', '2026-12-08T22:00:00Z', '--file', g]);
  assert.equal(uguale.status, 0, uguale.stderr);
  assert.match(uguale.stdout, /gia' scritto/);

  const dopo = cli(['--adesso', '2026-12-08T23:30:00Z', '--file', g]);
  assert.equal(dopo.status, 1, 'un giorno gia\' scritto cambiato senza --sposta-avanti');
  assert.match(dopo.stderr, /--sposta-avanti/);
  assert.equal(await pubblicatoIn(g), '2026-12-08', 'file toccato da un errore');

  const avanti = cli(['--adesso', '2026-12-08T23:30:00Z', '--file', g, '--sposta-avanti']);
  assert.equal(avanti.status, 0, avanti.stderr);
  assert.equal(await pubblicatoIn(g), '2026-12-09');

  const indietro = cli(['--adesso', '2026-12-08T12:00:00Z', '--file', g, '--sposta-avanti']);
  assert.equal(indietro.status, 1, 'spostato indietro');
  assert.match(indietro.stderr, /mai indietro/);
  assert.equal(await pubblicatoIn(g), '2026-12-09');
});

test('errori: file intatto e rc 1', async (t) => {
  const f = copia(t);
  const prima = readFileSync(f, 'utf8');
  // Prima dei documenti annunciati (privacy e Termini del 2026-11-22).
  const presto = cli(['--adesso', '2026-11-21T12:00:00Z', '--file', f]);
  assert.equal(presto.status, 1);
  assert.match(presto.stderr, /prima di/);
  for (const args of [['--adesso', 'ieri', '--file', f], ['--adesso'], ['--boh', '--file', f]]) {
    const r = cli(args);
    assert.equal(r.status, 1, args.join(' '));
  }
  assert.equal(readFileSync(f, 'utf8'), prima, 'file cambiato da un errore');
  // Righe pubblicato mancanti o doppie.
  assert.throws(() => nuovoTesto('export const x = 1;\n', '2026-12-01'), /trovate 0/);
  assert.throws(() => nuovoTesto("  pubblicato: null,\n  pubblicato: '2026-12-01',\n", '2026-12-01'), /trovate 2/);
  assert.throws(() => nuovoTesto('  pubblicato: "2026-12-01",\n', '2026-12-01'), /trovate 0/);
});
