// L'AVVISO DI 30 GIORNI SUI DOCUMENTI LEGALI (D-S397-PM-AVVISO-SITO-NUOVO-30).
// Contratti sul sorgente: un solo punto di verita' (`pubblicato`), la finestra
// derivata (30 giorni pieni, mezzanotte di Roma con l'ora legale vera), la
// regola che lo spegne alla build, la ricostruzione quotidiana che applica la
// regola, i testi nelle sei lingue, i documenti annunciati uguali a quelli
// dell'app e a quelli che il repo pubblico sta per servire. Il sito costruito si
// prova in integrations/costruito/avviso-legale.test.mjs.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { mancaNelRepo, nelRepoPubblico } from './quale-repo.mjs';
import {
  AVVISO_LEGALE,
  ID_DOCUMENTI,
  adessoDellaBuild,
  avvisoAttivo,
  dataAvviso,
  documento,
  finestraAvviso,
  giornoDiRoma,
  giornoDopo,
  indirizzoDocumento,
  mezzanotteDiRoma,
  oraDiRoma,
  pezziFrase,
  testataDocumento,
} from '../src/lib/avviso-legale.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];
const GIORNO = 24 * 60 * 60 * 1000;
const ORA = 60 * 60 * 1000;
/** Un avviso pubblicato, per provare la finestra a prescindere dallo stato
 *  del file (oggi null: il deploy non c'e' ancora stato). */
const PROVA = Object.freeze({ ...AVVISO_LEGALE, pubblicato: '2026-11-24' });
/** I .md dell'app (solo nel repo portfolio_manager) e l'HTML che il repo
 *  pubblico serve (dist/legal/ accanto a site/, solo nel repo pubblico). */
const LEGALI_APP = path.resolve(SITO, '..', '..', '..', '..', '..', 'assets', 'legal');
const LEGALI_PUBBLICATI = process.env.AVVISO_LEGALI_PUBBLICATI
  ? path.resolve(process.env.AVVISO_LEGALI_PUBBLICATI)
  : path.resolve(SITO, '..', 'dist', 'legal');

const carica = async (l) => (await import(new URL(`../src/i18n/testi/${l}.ts`, import.meta.url).href)).default;

/** Che cosa pretende il repo pubblico, dato cio' che dist/legal/ serve:
 *  - serve le versioni annunciate e `pubblicato` e' null -> errore (i
 *    documenti andrebbero in linea senza avviso);
 *  - non le serve e `pubblicato` c'e' -> errore (l'avviso annuncia documenti
 *    che il sito non serve);
 *  - altrimenti va bene. `testate`: { '<lingua>/<id>': {versione, aggiornato} | null }. */
function verdettoPubblicazione(testate, avviso = AVVISO_LEGALE) {
  // Chiavi: '<lingua>/<id>' = dist/legal/ (sempre attese, 18), e quelle in piu'
  // che il chiamante porta, '<punto>:<lingua>/<id>' (S398, oracolo: le pagine
  // /privacy, /terms, /disclaimer del sito sono un SECONDO punto di
  // pubblicazione, 'pagina:<lingua>/<id>').
  const chiavi = new Set([...LINGUE.flatMap((l) => avviso.documenti.map((d) => `${l}/${d.id}`)), ...Object.keys(testate)]);
  const difformi = [];
  const uguali = [];
  for (const k of chiavi) {
    const d = documento(k.split('/').at(-1), avviso);
    const h = testate[k];
    if (!h || h.versione !== d.versione || h.aggiornato !== d.aggiornato) {
      difformi.push(`${k}: ${h ? `${h.versione} ${h.aggiornato}` : 'assente'}`);
    } else uguali.push(k);
  }
  // Basta UN documento annunciato in linea, in dist/legal/ o in una pagina del
  // sito (17 su 18 non e' "non pubblicato"): senza `pubblicato` andrebbe in
  // linea senza avviso.
  if (uguali.length > 0 && avviso.pubblicato === null) {
    return `il sito serve documenti annunciati (${uguali.length} su ${chiavi.size}: ${uguali.join(', ')}) ma \`pubblicato\` e' null: scrivi il giorno del deploy con node strumenti/pubblica-avviso.mjs`;
  }
  // Con `pubblicato` scritto, ANCHE UN documento vecchio o assente e' rosso.
  if (difformi.length > 0 && avviso.pubblicato !== null) {
    return `l'avviso (pubblicato ${avviso.pubblicato}) annuncia documenti che il sito non serve: ${difformi.join(', ')}`;
  }
  return null;
}

/** Le testate che il repo pubblico sta per servire: dist/legal/<l>/<id>.html
 *  ('<l>/<id>') e le pagine del sito src/pages/{,<l>/}<id>.astro
 *  ('pagina:<l>/<id>'). Un file mancante vale null. */
function testateServite(legali = LEGALI_PUBBLICATI, sito = SITO) {
  const testate = {};
  for (const l of LINGUE) {
    for (const d of AVVISO_LEGALE.documenti) {
      const f = path.join(legali, l, `${d.id}.html`);
      testate[`${l}/${d.id}`] = existsSync(f) ? testataDocumento(readFileSync(f, 'utf8')) : null;
      const p = path.join(sito, 'src', 'pages', ...(l === 'it' ? [] : [l]), `${d.id}.astro`);
      testate[`pagina:${l}/${d.id}`] = existsSync(p) ? testataDocumento(readFileSync(p, 'utf8')) : null;
    }
  }
  return testate;
}

test('un solo punto di verita\': pubblicato e\' null o un giorno; nessuna data di inizio o fine scritta a mano', () => {
  assert.ok(AVVISO_LEGALE.pubblicato === null || /^\d{4}-\d{2}-\d{2}$/.test(AVVISO_LEGALE.pubblicato), String(AVVISO_LEGALE.pubblicato));
  assert.equal(AVVISO_LEGALE.giorni, 30, 'la promessa in vigore dice 30 giorni');
  assert.deepEqual(Object.keys(AVVISO_LEGALE).sort(), ['documenti', 'giorni', 'pubblicato'], 'una seconda data accanto a pubblicato');
  assert.deepEqual(ID_DOCUMENTI, ['privacy', 'terms', 'disclaimer']);
  assert.deepEqual(AVVISO_LEGALE.documenti.map((d) => d.versione), ['1.0.5', '1.1.2', '1.0.1'], 'versioni della decisione');
  if (AVVISO_LEGALE.pubblicato === null) {
    assert.equal(finestraAvviso(), null);
    for (const t of ['2026-11-22T12:00:00Z', '2026-12-31T12:00:00Z', '2030-01-01T00:00:00Z']) {
      assert.equal(avvisoAttivo(new Date(t)), false, `non pubblicato ma attivo il ${t}`);
    }
  }
});

test('finestra: inizio alla mezzanotte di Roma di pubblicato, fine 31 mezzanotti dopo, 30 giorni pieni', () => {
  const f = finestraAvviso(PROVA);
  assert.equal(f.inizio, Date.parse('2026-11-24T00:00:00+01:00'));
  assert.equal(f.fine, Date.parse('2026-12-25T00:00:00+01:00'));
  assert.equal(f.fine - f.inizio, 31 * GIORNO);
  // Pubblicato all'ultimo secondo del primo giorno, resta su almeno 30x24 ore.
  assert.ok(f.fine - (f.inizio + GIORNO - 1000) >= 30 * GIORNO, 'meno di 30 giorni pieni');
});

test('bordi: giorno 0, giorno 30, giorno 31, millisecondo prima e dopo la fine', () => {
  const f = finestraAvviso(PROVA);
  // Giorno -1: pubblicato scritto in anticipo, la build del giorno prima non annuncia una data futura.
  assert.equal(avvisoAttivo(new Date('2026-11-23T12:00:00+01:00'), PROVA), false, 'giorno -1');
  assert.equal(avvisoAttivo(new Date(f.inizio - 1), PROVA), false, 'un millisecondo prima della mezzanotte di Roma del giorno 0');
  assert.equal(avvisoAttivo(new Date('2026-11-23T23:30:00Z'), PROVA), true, '23:30Z del 23 = 00:30 di Roma del giorno 0');
  assert.equal(avvisoAttivo(new Date('2026-01-01T00:00:00Z'), PROVA), false, 'mesi prima');
  assert.equal(avvisoAttivo(new Date(f.inizio), PROVA), true, 'giorno 0 alle 00:00 di Roma');
  assert.equal(avvisoAttivo(new Date('2026-11-24T23:59:59+01:00'), PROVA), true, 'giorno 0 alle 23:59:59');
  assert.equal(giornoDopo(PROVA.pubblicato, 30), '2026-12-24');
  assert.equal(avvisoAttivo(new Date('2026-12-24T12:00:00+01:00'), PROVA), true, 'giorno 30');
  assert.equal(avvisoAttivo(new Date('2026-12-24T23:59:59.999+01:00'), PROVA), true, 'ultimo istante del giorno 30');
  assert.equal(avvisoAttivo(new Date(f.fine - 1), PROVA), true, 'un millisecondo prima della fine');
  assert.equal(avvisoAttivo(new Date(f.fine), PROVA), false, 'giorno 31 alle 00:00 di Roma');
  assert.equal(avvisoAttivo(new Date('2026-12-25T12:00:00+01:00'), PROVA), false, 'giorno 31');
  assert.equal(avvisoAttivo(new Date('2027-06-01T12:00:00Z'), PROVA), false, 'mesi dopo');
});

test('fuso orario: conta l\'ora di Roma, non l\'UTC, e l\'ora legale la dice Intl', () => {
  // 2026-12-24T23:30Z e' gia' il 25 a Roma (00:30): spento, anche se in UTC e' il 24.
  assert.equal(avvisoAttivo(new Date('2026-12-24T23:30:00Z'), PROVA), false, '00:30 di Roma del giorno 31');
  assert.equal(avvisoAttivo(new Date('2026-12-24T22:59:59Z'), PROVA), true, '23:59:59 di Roma del giorno 30');
  assert.equal(oraDiRoma(Date.parse('2026-12-24T23:30:00Z')), '2026-12-25 00:30:00');
  // Mezzanotte d'estate (+02:00) e d'inverno (+01:00).
  assert.equal(mezzanotteDiRoma('2027-07-01'), Date.parse('2027-07-01T00:00:00+02:00'));
  assert.equal(mezzanotteDiRoma('2027-01-01'), Date.parse('2027-01-01T00:00:00+01:00'));
  // Finestra a cavallo dell'ora legale (28/3/2027): 31 mezzanotti fanno
  // 31 x 24 ore meno una, e chi pubblica alle 23:59:59 del primo giorno ne
  // avrebbe 30 x 24 meno un'ora. La fine passa alla mezzanotte dopo.
  const primavera = finestraAvviso({ ...PROVA, pubblicato: '2027-03-01' });
  assert.equal(primavera.fine, Date.parse('2027-04-02T00:00:00+02:00'));
  assert.equal(primavera.fine - primavera.inizio, 32 * GIORNO - ORA);
  assert.ok(primavera.fine - (primavera.inizio + GIORNO - 1000) >= 30 * GIORNO);
  assert.equal(avvisoAttivo(new Date('2027-04-01T12:00:00+02:00'), { ...PROVA, pubblicato: '2027-03-01' }), true);
  // Pubblicato il giorno stesso del cambio d'ora (giorno 0 di 23 ore).
  const cambio = finestraAvviso({ ...PROVA, pubblicato: '2027-03-28' });
  assert.ok(cambio.fine - mezzanotteDiRoma('2027-03-29') >= 30 * GIORNO);
  assert.equal(cambio.fine, Date.parse('2027-04-28T00:00:00+02:00'));
  // ...e a cavallo dell'ora solare (25/10/2026): un'ora in piu'.
  const autunno = finestraAvviso({ ...PROVA, pubblicato: '2026-10-01', documenti: [] });
  assert.equal(autunno.fine, Date.parse('2026-11-01T00:00:00+01:00'));
  assert.equal(autunno.fine - autunno.inizio, 31 * GIORNO + ORA);
});

test('errore: un valore illeggibile ferma la build, non spegne ne\' accende l\'avviso', () => {
  assert.throws(() => avvisoAttivo(new Date('non una data'), PROVA), /adesso/);
  assert.throws(() => avvisoAttivo(new Date(), { ...PROVA, pubblicato: '24/11/2026' }), /pubblicato/);
  assert.throws(() => avvisoAttivo(new Date(), { ...PROVA, pubblicato: '2026-02-30' }), /pubblicato/);
  assert.throws(() => avvisoAttivo(new Date(), { ...PROVA, pubblicato: '' }), /pubblicato/);
  assert.throws(() => avvisoAttivo(new Date(), { ...PROVA, giorni: 29 }), /giorni/);
  assert.throws(() => avvisoAttivo(new Date(), { ...PROVA, pubblicato: '2026-11-21' }), /prima di privacy/);
  assert.throws(() => adessoDellaBuild({ PLURIFIN_AVVISO_ADESSO: 'domani' }), /PLURIFIN_AVVISO_ADESSO/);
  assert.throws(() => dataAvviso('xx', PROVA), /lingua/);
  assert.throws(() => dataAvviso('it', { ...PROVA, pubblicato: null }), /null/);
  assert.throws(() => indirizzoDocumento('it', 'cookie'), /documento/);
  assert.throws(() => documento('cookie'), /documento/);
  assert.throws(() => mezzanotteDiRoma('2026-13-01'), /giorno/);
});

test('build: senza variabile vale l\'ora vera, con la variabile l\'istante dichiarato', () => {
  const prima = Date.now();
  const t = adessoDellaBuild({}).getTime();
  assert.ok(t >= prima && t <= Date.now(), 'l\'ora della build non e\' adesso');
  assert.equal(adessoDellaBuild({ PLURIFIN_AVVISO_ADESSO: '' }).getTime() >= prima, true);
  assert.equal(adessoDellaBuild({ PLURIFIN_AVVISO_ADESSO: '2026-12-25T00:00:00+01:00' }).getTime(), finestraAvviso(PROVA).fine);
});

test('ricostruzione: site-deploy.yml si ricostruisce da solo ogni giorno, dopo la mezzanotte di Roma tutto l\'anno', () => {
  // Senza una build dopo la fine l'avviso resterebbe: la regola vive solo se
  // il sito si ricostruisce. Il cron proprio non dipende da market-data.
  const wf = readFileSync(path.join(SITO, '..', '.github', 'workflows', 'site-deploy.yml'), 'utf8');
  const on = wf.slice(wf.indexOf('\non:'), wf.indexOf('\njobs:'));
  const cron = [...on.matchAll(/^\s*-\s*cron:\s*'([^']+)'/gm)].map((m) => m[1]);
  assert.ok(/^\s*schedule:/m.test(on), 'site-deploy.yml senza schedule');
  assert.equal(cron.length, 1, `cron: ${cron.join(' | ')}`);
  const [minuto, ora, giorno, mese, settimana] = cron[0].split(/\s+/);
  assert.deepEqual([giorno, mese, settimana], ['*', '*', '*'], 'non ogni giorno');
  // La fine e' una mezzanotte di Roma: 23:00 UTC d'inverno, 22:00 d'estate.
  // Il cron deve cadere dopo entrambe e prima della mezzanotte UTC.
  const cronMin = Number(ora) * 60 + Number(minuto);
  for (const giornoFine of ['2026-12-25', '2027-07-01']) {
    const fine = new Date(mezzanotteDiRoma(giornoFine));
    assert.ok(cronMin >= fine.getUTCHours() * 60 + fine.getUTCMinutes() && cronMin < 24 * 60,
      `il cron ${cron[0]} cade prima della mezzanotte di Roma del ${giornoFine}`);
  }
});

test('sei lingue: la frase ha {data} una volta, i tre documenti e la congiunzione; niente trattini ne\' tre punti', async () => {
  for (const l of LINGUE) {
    const a = (await carica(l)).comune.avvisoLegale;
    assert.ok(a, `${l}: manca comune.avvisoLegale`);
    assert.equal(a.frase.split('{data}').length, 2, `${l}: {data} non compare una volta sola`);
    assert.match(a.frase, /Portfolio Manager/, `${l}: la frase non nomina l'app`);
    assert.match(a.frase, /:$/, `${l}: la frase non introduce l'elenco con i due punti`);
    for (const k of ['etichetta', 'e']) assert.ok(typeof a[k] === 'string' && a[k].trim(), `${l}: ${k} vuota`);
    assert.deepEqual(Object.keys(a.documenti).sort(), [...ID_DOCUMENTI].sort(), `${l}: documenti`);
    for (const d of ID_DOCUMENTI) assert.ok(a.documenti[d]?.trim(), `${l}: ${d} vuoto`);
    const tutto = [a.etichetta, a.frase, a.e, ...Object.values(a.documenti)].join(' ');
    assert.ok(!/—|–|\.\.\.| - |"/.test(tutto), `${l}: trattino, tre punti o virgolette dritte: ${tutto}`);
    assert.ok(!/google play|play store/i.test(tutto), `${l}: nomina il negozio`);
    // La data mostrata e' quella di pubblicazione: la frase dice "pubblicato",
    // non "aggiornato" (le date di aggiornamento dei tre documenti possono differire).
    assert.ok(!/aggiornat|updated|actualiz|mis à jour|aktualisiert|atualiz/i.test(a.frase), `${l}: la frase data un aggiornamento`);
  }
  // Le sei frasi sono sei: una lingua copiata dall'altra non passa.
  const frasi = await Promise.all(LINGUE.map(async (l) => (await carica(l)).comune.avvisoLegale.frase));
  assert.equal(new Set(frasi).size, 6, 'due lingue con la stessa frase');
});

test('sei lingue: la data esce da Intl nella forma lunga della lingua, ora di Roma', () => {
  const attese = {
    it: '24 novembre 2026',
    en: '24 November 2026',
    es: '24 de noviembre de 2026',
    fr: '24 novembre 2026',
    de: '24. November 2026',
    pt: '24 de novembro de 2026',
  };
  for (const l of LINGUE) assert.equal(dataAvviso(l, PROVA), attese[l], l);
  assert.equal(indirizzoDocumento('de', 'terms'), '/legal/de/terms.html');
});

test('sei lingue: l\'attacco della frase nei giorni 1, 8, 11 (it elide l\'articolo, fr scrive 1er) e in quelli normali', async () => {
  // Attese scritte a mano, frase vera di ogni lingua: prima + data + inizio di dopo.
  const attese = {
    '2026-12-01': {
      it: 'L’1 dicembre 2026 PluriFin', en: 'On 1 December 2026, PluriFin', es: 'El 1 de diciembre de 2026, PluriFin',
      fr: 'Le 1er décembre 2026, PluriFin', de: 'Am 1. Dezember 2026 hat', pt: 'Em 1 de dezembro de 2026, a PluriFin',
    },
    '2026-12-08': {
      it: 'L’8 dicembre 2026 PluriFin', en: 'On 8 December 2026, PluriFin', es: 'El 8 de diciembre de 2026, PluriFin',
      fr: 'Le 8 décembre 2026, PluriFin', de: 'Am 8. Dezember 2026 hat', pt: 'Em 8 de dezembro de 2026, a PluriFin',
    },
    '2026-12-11': {
      it: 'L’11 dicembre 2026 PluriFin', en: 'On 11 December 2026, PluriFin', es: 'El 11 de diciembre de 2026, PluriFin',
      fr: 'Le 11 décembre 2026, PluriFin', de: 'Am 11. Dezember 2026 hat', pt: 'Em 11 de dezembro de 2026, a PluriFin',
    },
    '2027-01-01': {
      it: 'L’1 gennaio 2027 PluriFin', en: 'On 1 January 2027, PluriFin', es: 'El 1 de enero de 2027, PluriFin',
      fr: 'Le 1er janvier 2027, PluriFin', de: 'Am 1. Januar 2027 hat', pt: 'Em 1 de janeiro de 2027, a PluriFin',
    },
    '2026-11-24': {
      it: 'Il 24 novembre 2026 PluriFin', en: 'On 24 November 2026, PluriFin', es: 'El 24 de noviembre de 2026, PluriFin',
      fr: 'Le 24 novembre 2026, PluriFin', de: 'Am 24. November 2026 hat', pt: 'Em 24 de novembro de 2026, a PluriFin',
    },
    // 18 e 21: consonante iniziale ("diciotto", "ventuno"), l'articolo resta; 21 in francese non e' 1er.
    '2026-12-18': { it: 'Il 18 dicembre 2026 PluriFin', fr: 'Le 18 décembre 2026, PluriFin' },
    '2026-12-21': { it: 'Il 21 dicembre 2026 PluriFin', fr: 'Le 21 décembre 2026, PluriFin' },
  };
  const frasi = Object.fromEntries(await Promise.all(LINGUE.map(async (l) => [l, (await carica(l)).comune.avvisoLegale.frase])));
  for (const [giorno, perLingua] of Object.entries(attese)) {
    const avviso = { ...AVVISO_LEGALE, pubblicato: giorno };
    for (const [l, atteso] of Object.entries(perLingua)) {
      const { prima, data, dopo } = pezziFrase(l, frasi[l], avviso);
      const resa = `${prima}${data}${dopo}`;
      assert.ok(resa.startsWith(atteso), `${giorno} ${l}: "${resa}" non apre con "${atteso}"`);
      // Il resto della frase non cambia: solo l'articolo italiano davanti alla data.
      const [primaFrase, dopoFrase] = frasi[l].split('{data}');
      assert.equal(dopo, dopoFrase, `${giorno} ${l}: il seguito della frase`);
      if (l !== 'it') assert.equal(prima, primaFrase, `${giorno} ${l}: l'attacco della frase`);
    }
  }
  // Errori: l'italiano senza articolo davanti alla data, {data} doppia o assente.
  const p = { ...AVVISO_LEGALE, pubblicato: '2026-12-08' };
  assert.throws(() => pezziFrase('it', 'Dal {data} PluriFin ha pubblicato:', p), /articolo/);
  assert.throws(() => pezziFrase('fr', 'Le {data} et {data} :', p), /una volta sola/);
  assert.throws(() => pezziFrase('en', 'PluriFin published:', p), /una volta sola/);
  assert.throws(() => pezziFrase('it', frasi.it, { ...AVVISO_LEGALE, pubblicato: null }), /null/);
});

test('giorno di Roma: conta il calendario di Roma, non quello della macchina ne\' l\'UTC', () => {
  // Il rilievo S398: alle 23:30 UTC Roma e' gia' al giorno dopo.
  assert.equal(giornoDiRoma(new Date('2026-11-30T23:30:00Z')), '2026-12-01', 'inverno, 23:30Z');
  assert.equal(giornoDiRoma(new Date('2026-11-30T22:59:59Z')), '2026-11-30', 'inverno, un secondo prima della mezzanotte di Roma');
  assert.equal(giornoDiRoma(new Date('2026-11-30T23:00:00Z')), '2026-12-01', 'inverno, la mezzanotte di Roma');
  assert.equal(giornoDiRoma(new Date('2027-06-30T22:30:00Z')), '2027-07-01', 'estate, 22:30Z');
  assert.equal(giornoDiRoma(new Date('2027-06-30T21:59:59Z')), '2027-06-30', 'estate, un secondo prima');
  assert.equal(giornoDiRoma(new Date('2026-12-31T23:30:00Z')), '2027-01-01', 'cambio d\'anno');
  assert.throws(() => giornoDiRoma('ieri'), /istante/);
});

test('testata: versione e data si leggono dal .md dell\'app e dall\'HTML di build_legal_html.ps1', () => {
  assert.deepEqual(testataDocumento('# T\n\n**Versione**: 1.0.5\n**Ultimo aggiornamento**: 2026-11-22\n'), { versione: '1.0.5', aggiornato: '2026-11-22' });
  assert.deepEqual(
    testataDocumento('<p><strong>Versão</strong>: 1.1.2 <strong>Última atualização</strong>: 2026-11-22 <strong>Idioma</strong>: x</p>'),
    { versione: '1.1.2', aggiornato: '2026-11-22' });
  assert.equal(testataDocumento('<p>nessuna testata</p>'), null);
  // Nessun taglio a lunghezza fissa: la testata dopo 5000 caratteri si legge.
  const lungo = `<style>${'x'.repeat(5000)}</style><p><strong>Version</strong>: 1.0.5 <strong>Last update</strong>: 2026-11-22</p>`;
  assert.deepEqual(testataDocumento(lungo), { versione: '1.0.5', aggiornato: '2026-11-22' });
  // Versione e data vengono dalla STESSA testata, non da due punti diversi del file.
  assert.equal(testataDocumento('**Versione**: 1.0.5\n\ntesto\n\n**Data**: 2026-11-22\n'), null);
  assert.deepEqual(
    testataDocumento('**Versione app**: 1.0.0\n\n**Versione**: 1.0.5\n**Ultimo aggiornamento**: 2026-11-22\n'),
    { versione: '1.0.5', aggiornato: '2026-11-22' });
  assert.deepEqual(testataDocumento('<strong>V</strong>: 1.1.2<br /><strong>D</strong>: 2026-11-22'), { versione: '1.1.2', aggiornato: '2026-11-22' });
});

test('documenti annunciati = documenti dell\'app (versione e data, tre documenti, sei lingue)', (t) => {
  // Nel repo pubblico (che riceve solo il sito) assets/legal/ non c'e': li' il
  // confronto non si puo' fare e il test lo DICE invece di passare in silenzio.
  if (!existsSync(LEGALI_APP)) {
    t.skip(`documenti dell'app assenti (${LEGALI_APP}): confronto possibile solo nel repo portfolio_manager`);
    return;
  }
  const difformi = [];
  for (const l of LINGUE) {
    for (const d of AVVISO_LEGALE.documenti) {
      const h = testataDocumento(readFileSync(path.join(LEGALI_APP, l, `${d.sorgente}.md`), 'utf8'));
      if (!h || h.versione !== d.versione || h.aggiornato !== d.aggiornato) difformi.push(`${l}/${d.sorgente}: ${JSON.stringify(h)}`);
    }
  }
  assert.deepEqual(difformi, [], 'l\'avviso annuncia versioni diverse da quelle dell\'app');
});

test('regola di pubblicazione: documenti in linea senza pubblicato, o pubblicato senza documenti, sono rossi', () => {
  const nuove = Object.fromEntries(LINGUE.flatMap((l) => AVVISO_LEGALE.documenti.map((d) => [`${l}/${d.id}`, { versione: d.versione, aggiornato: d.aggiornato }])));
  // Il servito misurato il 2026-11-22 (PM_AVVISO_MANIFEST): nessuno dei tre e' quello annunciato.
  const SERVITO = { privacy: ['1.0.3', '2026-09-21'], terms: ['1.1.0', '2026-08-15'], disclaimer: ['1.0.0', '2026-07-14'] };
  const vecchie = Object.fromEntries(Object.keys(nuove).map((k) => {
    const [versione, aggiornato] = SERVITO[k.split('/')[1]];
    return [k, { versione, aggiornato }];
  }));
  const nulla = { ...AVVISO_LEGALE, pubblicato: null };
  assert.match(verdettoPubblicazione(nuove, nulla), /pubblicato` e' null/);
  assert.equal(verdettoPubblicazione(nuove, PROVA), null);
  assert.equal(verdettoPubblicazione(vecchie, nulla), null);
  assert.match(verdettoPubblicazione(vecchie, PROVA), /de\/privacy: 1\.0\.3/);
  assert.match(verdettoPubblicazione({}, PROVA), /assente/);
  // In linea solo una parte (17 su 18, o 1 su 18) con pubblicato null: rosso.
  const parziale = { ...nuove, 'pt/disclaimer': { versione: '1.0.0', aggiornato: '2026-07-14' } };
  assert.match(verdettoPubblicazione(parziale, nulla), /17 su 18/);
  const uno = Object.fromEntries(Object.keys(nuove).map((k) => [k, k === 'fr/terms' ? nuove[k] : { versione: '0.0.1', aggiornato: '2026-01-01' }]));
  assert.match(verdettoPubblicazione(uno, nulla), /1 su 18: fr\/terms/);
  assert.match(verdettoPubblicazione(parziale, PROVA), /pt\/disclaimer: 1\.0\.0/);
  assert.equal(verdettoPubblicazione({}, nulla), null, 'niente in linea e niente pubblicato: va bene');
});

test('repo pubblico: cio\' che dist/legal/ serve e pubblicato vanno d\'accordo', (t) => {
  // Nel repo pubblico dist/legal/ sta accanto a site/ (site-deploy.yml lo copia
  // nel sito costruito). Nel modello del repo dell'app non c'e': lo si DICE.
  // Nel repo pubblico la sua mancanza e' ROSSA (quale-repo.mjs).
  if (!existsSync(LEGALI_PUBBLICATI)) {
    mancaNelRepo(t, `dist/legal/ assente (${LEGALI_PUBBLICATI})`);
    return;
  }
  assert.equal(verdettoPubblicazione(testateServite()), null);
});

test('le testate servite si leggono da dist/legal/ E dalle pagine del sito (36 punti)', () => {
  const t = testateServite(path.join(SITO, 'nessun-dist-legal-s398'));
  assert.equal(Object.keys(t).length, 36);
  // Le pagine del modello sono la resa dei .md annunciati: 18 testate uguali.
  for (const l of LINGUE) {
    for (const d of AVVISO_LEGALE.documenti) {
      assert.deepEqual(t[`pagina:${l}/${d.id}`], { versione: d.versione, aggiornato: d.aggiornato }, `pagina ${l}/${d.id}`);
      assert.equal(t[`${l}/${d.id}`], null);
    }
  }
});

test('gambe dell\'oracolo S398: le due vie verdi per errore ora sono rosse', () => {
  const nuove = Object.fromEntries(LINGUE.flatMap((l) => AVVISO_LEGALE.documenti.map((d) => [`${l}/${d.id}`, { versione: d.versione, aggiornato: d.aggiornato }])));
  const pagineNuove = Object.fromEntries(Object.entries(nuove).map(([k, v]) => [`pagina:${k}`, v]));
  const VECCHIE = { privacy: ['1.0.3', '2026-09-21'], terms: ['1.1.0', '2026-08-15'], disclaimer: ['1.0.0', '2026-07-14'] };
  const vecchia = (k) => { const [versione, aggiornato] = VECCHIE[k.split('/').at(-1)]; return { versione, aggiornato }; };
  const legaliVecchi = Object.fromEntries(Object.keys(nuove).map((k) => [k, vecchia(k)]));
  const pagineVecchie = Object.fromEntries(Object.keys(pagineNuove).map((k) => [k, vecchia(k)]));
  const nulla = { ...AVVISO_LEGALE, pubblicato: null };
  // (a) pubblicato null, dist/legal nuovo tranne de/privacy (e pagine vecchie).
  const a = { ...nuove, 'de/privacy': vecchia('de/privacy'), ...pagineVecchie };
  assert.match(verdettoPubblicazione(a, nulla), /17 su 36/);
  // (b) pubblicato null, dist/legal vecchio, pagine del sito nuove.
  assert.match(verdettoPubblicazione({ ...legaliVecchi, ...pagineNuove }, nulla), /18 su 36: pagina:it\/privacy/);
  // (b') una sola pagina nuova basta.
  assert.match(verdettoPubblicazione({ ...legaliVecchi, ...pagineVecchie, 'pagina:pt/terms': nuove['pt/terms'] }, nulla), /1 su 36: pagina:pt\/terms/);
  // Tutto vecchio e null: va bene (oggi, prima del deploy).
  assert.equal(verdettoPubblicazione({ ...legaliVecchi, ...pagineVecchie }, nulla), null);
  // pubblicato scritto: tutto nuovo va bene; anche UNA pagina o UN documento vecchio e' rosso.
  assert.equal(verdettoPubblicazione({ ...nuove, ...pagineNuove }, PROVA), null);
  assert.match(verdettoPubblicazione({ ...nuove, ...pagineNuove, 'pagina:de/disclaimer': vecchia('de/disclaimer') }, PROVA), /pagina:de\/disclaimer: 1\.0\.0/);
  assert.match(verdettoPubblicazione({ ...nuove, ...pagineNuove, 'es/terms': vecchia('es/terms') }, PROVA), /es\/terms: 1\.1\.0/);
  assert.match(verdettoPubblicazione({ ...nuove, ...pagineNuove, 'pagina:fr/privacy': null }, PROVA), /pagina:fr\/privacy: assente/);
});

test('telaio: la testata porta l\'avviso dopo il collegamento "salta" e dopo la testata stessa', () => {
  const testata = readFileSync(path.join(SITO, 'src/components/giorno/Testata.astro'), 'utf8');
  const salta = testata.indexOf('class="salta"');
  const chiusa = testata.indexOf('</header>');
  const avviso = testata.indexOf('<AvvisoLegale');
  assert.ok(salta >= 0 && chiusa > salta && avviso > chiusa, 'ordine salta -> testata -> avviso');
});

test('quale repo: nel modello la mancanza salta e lo dice, nel repo pubblico fa rosso', (t) => {
  // Questo file gira nel modello (assets/legal/ c'e'): il caso pubblico si prova
  // con una cartella dell'app che non esiste.
  assert.equal(nelRepoPubblico(), !existsSync(LEGALI_APP));
  const inesistente = path.join(SITO, 'nessuna-cartella-app-s398');
  assert.equal(nelRepoPubblico(inesistente), true);
  const finto = { skip: (m) => { finto.saltato = m; } };
  assert.throws(() => mancaNelRepo(finto, 'dist/legal/ assente', inesistente), /repo pubblico non puo' mancare/);
  assert.equal(finto.saltato, undefined, 'nel repo pubblico ha saltato invece di fare rosso');
  if (!nelRepoPubblico()) {
    mancaNelRepo(finto, 'prova', LEGALI_APP);
    assert.match(finto.saltato, /prova: nel modello/);
  }
});
