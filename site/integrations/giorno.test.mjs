// I PRESIDI DELLE FONDAMENTA S384 ("Il giorno di PluriFin"): i conti dei
// palchi, il listino estratto in build, i testi, la configurazione.
// Girano con `npm test` PRIMA della build: non leggono dist/. I contratti sul
// sito costruito stanno in integrations/costruito/ (`npm run test:dist`).
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { avanzamento, cifra, dado, liscia, quota, stringi, tratto } from '../src/lib/palco-conti.mjs';
import { SIMBOLO, candidati, estrai, leggi, riga } from '../src/lib/listino.mjs';
import { luce, spegni } from '../strumenti/torre.mjs';
import { difettiPrezzi, prezziIn } from './prezzi-nativi.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leggiTesto = (rel) => readFileSync(path.join(SITO, rel), 'utf8');

/* ------------------------------ i conti dei palchi ------------------------------ */

test('avanzamento: 0 quando il capitolo tocca il bordo alto, 1 alla sua ultima schermata', () => {
  assert.equal(avanzamento(0, 3000, 900), 0);
  assert.equal(avanzamento(-2100, 3000, 900), 1);
  assert.equal(avanzamento(-1050, 3000, 900), 0.5);
});

test('avanzamento: resta fra 0 e 1 prima, dopo e con un capitolo piu\' corto della finestra', () => {
  assert.equal(avanzamento(500, 3000, 900), 0);
  assert.equal(avanzamento(-9000, 3000, 900), 1);
  assert.equal(avanzamento(-10, 400, 900), 1);
  assert.equal(avanzamento(0, 400, 900), 0);
});

test('stringi e cifra: un NaN non arriva mai nel CSS', () => {
  assert.equal(stringi(Number.NaN), 0);
  assert.equal(cifra(Number.NaN), '-1000000');
  assert.equal(cifra(0.123456), '0.1235');
  assert.equal(cifra(1e-9), '0');
  assert.ok(!cifra(1e-9).includes('e'));
});

test('liscia: estremi fermi, meta\' a meta\', monotona', () => {
  assert.equal(liscia(0), 0);
  assert.equal(liscia(1), 1);
  assert.equal(liscia(0.5), 0.5);
  assert.equal(liscia(-3), 0);
  assert.equal(liscia(7), 1);
  let prima = -1;
  for (let i = 0; i <= 100; i++) {
    const v = liscia(i / 100);
    assert.ok(v >= prima, `non monotona a ${i}`);
    prima = v;
  }
});

test('tratto: il pezzo fra due soglie riportato a 0..1', () => {
  assert.equal(tratto(0.2, 0.5, 0.78), 0);
  assert.equal(tratto(0.64, 0.5, 0.78), 0.5);
  assert.equal(tratto(0.9, 0.5, 0.78), 1);
  assert.equal(tratto(0.5, 0.5, 0.5), 1);
});

test('dado: rotola senza strisciare, un quarto di giro ogni lato', () => {
  const lato = 60;
  const fine = dado(1, lato, 400);
  assert.equal(fine.quarti, 6);
  assert.equal(fine.rot, 540);
  assert.equal(fine.dx, 360);
  assert.ok(fine.dx <= 400, 'il dado esce dalla pista');
  const meta = dado(0.5, lato, 400);
  assert.equal(meta.dx, (meta.rot / 90) * lato);
});

test('dado: fermo su una faccia agli estremi, alzato sullo spigolo a meta\' quarto', () => {
  const lato = 60;
  assert.ok(Math.abs(dado(0, lato, 400).dy) < 1e-9);
  assert.ok(Math.abs(dado(1, lato, 400).dy) < 1e-9);
  const sulloSpigolo = dado(0.5 / 6, lato, 400);
  assert.equal(sulloSpigolo.rot, 45);
  const atteso = -(lato / 2) * (Math.SQRT2 - 1);
  assert.ok(Math.abs(sulloSpigolo.dy - atteso) < 1e-9, `dy ${sulloSpigolo.dy} atteso ${atteso}`);
  assert.ok(sulloSpigolo.dy < 0, 'il dado si alza verso l\'alto');
});

test('dado: pista piu\' corta del dado e lato zero non rompono i conti', () => {
  const corta = dado(1, 60, 10);
  assert.equal(corta.quarti, 2);
  assert.ok(Number.isFinite(corta.dx) && Number.isFinite(corta.dy));
  const zero = dado(0.3, 0, 0);
  assert.ok(Number.isFinite(zero.rot) && Number.isFinite(zero.dx) && Number.isFinite(zero.dy));
});

test('quota: tre tratti e la cima', () => {
  assert.equal(quota(0, 3), 1);
  assert.equal(quota(0.29, 3), 1);
  assert.equal(quota(0.31, 3), 2);
  assert.equal(quota(0.61, 3), 3);
  assert.equal(quota(0.89, 3), 3);
  assert.equal(quota(0.9, 3), 0);
  assert.equal(quota(1, 3), 0);
  assert.equal(quota(-1, 3), 1);
});

/* --------------------------------- il listino --------------------------------- */

const voce = (symbol, change_percent, altro = {}) =>
  ({ symbol, price: 27.62, currency: 'USD', change_percent, ...altro });
const flussoBuono = () => ({
  as_of_date: '2026-11-10',
  gainers: [voce('AMRC', 16.29), voce('BRK.B', 9.1), voce('X-1', 4.5), voce('ZZZ', 1.2)],
  losers: [voce('PAYS', -22.65), voce('AAA', -9.1), voce('BBB', -4.5)],
});

test('listino: tre rialzi e tre ribassi, nell\'ordine del flusso', () => {
  const l = estrai(flussoBuono());
  assert.equal(l.data, '2026-11-10');
  assert.deepEqual(l.rialzi.map((r) => r.simbolo), ['AMRC', 'BRK.B', 'X-1']);
  assert.deepEqual(l.ribassi.map((r) => r.simbolo), ['PAYS', 'AAA', 'BBB']);
  assert.deepEqual(Object.keys(l.rialzi[0]).sort(), ['prezzo', 'simbolo', 'valuta', 'variazione']);
});

test('listino: un simbolo con markup non entra MAI nella pagina (rilievo M2)', () => {
  const ostili = ['<img src=x onerror=alert(1)>', 'A"B', "A'B", 'A B', 'abc', '', 'A'.repeat(13), 'A&B', 'A<B'];
  for (const s of ostili) {
    assert.equal(SIMBOLO.test(s), false, `il simbolo ${JSON.stringify(s)} passa`);
    assert.equal(riga(voce(s, 5)), null);
  }
  const f = flussoBuono();
  f.gainers[0].symbol = '<script>alert(1)</script>';
  const l = estrai(f);
  assert.deepEqual(l.rialzi.map((r) => r.simbolo), ['BRK.B', 'X-1', 'ZZZ']);
  assert.ok(!JSON.stringify(l).includes('<'));
});

test('listino: prezzo, variazione e valuta fuori regola scartano la riga', () => {
  assert.equal(riga(voce('OK', 5, { price: 0 })), null);
  assert.equal(riga(voce('OK', 5, { price: -1 })), null);
  assert.equal(riga(voce('OK', 5, { price: '27' })), null);
  assert.equal(riga(voce('OK', Number.NaN)), null);
  assert.equal(riga(voce('OK', Number.POSITIVE_INFINITY)), null);
  assert.equal(riga(voce('OK', -100)), null);
  assert.equal(riga(voce('OK', 5, { currency: 'usd' })), null);
  assert.equal(riga(voce('OK', 5, { currency: '<b>' })), null);
  assert.equal(riga(null), null);
  assert.equal(riga('AMRC'), null);
  assert.notEqual(riga(voce('OK', 5)), null);
});

test('listino: mai un listino a meta\' (righe insufficienti, data rotta, forma rotta)', () => {
  const pochi = flussoBuono();
  pochi.losers.pop();
  assert.equal(estrai(pochi), null);
  const senzaData = flussoBuono();
  senzaData.as_of_date = '10/11/2026';
  assert.equal(estrai(senzaData), null);
  assert.equal(estrai(null), null);
  assert.equal(estrai({ as_of_date: '2026-11-10', gainers: 'x', losers: [] }), null);
  const segnoSbagliato = flussoBuono();
  segnoSbagliato.gainers = [voce('A', -1), voce('B', -2), voce('C', -3)];
  assert.equal(estrai(segnoSbagliato), null);
});

test('listino: leggi prende il primo file che regge e dice perche\' gli altri no', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'listino-'));
  const rotto = path.join(dir, 'rotto.json');
  const vuoto = path.join(dir, 'vuoto.json');
  const buono = path.join(dir, 'buono.json');
  writeFileSync(rotto, '{ non e json');
  writeFileSync(vuoto, JSON.stringify({ as_of_date: '2026-11-10', gainers: [], losers: [] }));
  writeFileSync(buono, JSON.stringify(flussoBuono()));
  const esito = leggi([path.join(dir, 'assente.json'), rotto, vuoto, buono]);
  assert.equal(esito.percorso, buono);
  assert.equal(esito.listino.rialzi.length, 3);
  const nessuno = leggi([path.join(dir, 'assente.json'), rotto, vuoto]);
  assert.equal(nessuno.listino, null);
  assert.match(nessuno.motivo, /assente/);
  assert.match(nessuno.motivo, /JSON non valido/);
  assert.match(nessuno.motivo, /contenuto non valido/);
});

test('listino: i candidati coprono il repo pubblico, il repo dell\'app e la variabile', () => {
  const c = candidati('/x/site', {});
  assert.equal(c.length, 2);
  assert.ok(c[0].replaceAll('\\', '/').endsWith('/x/dist/market-data/top_movers.json'));
  const conVar = candidati('/x/site', { MARKET_DATA_DIR: '/dati' });
  assert.equal(conVar.length, 3);
  assert.ok(conVar[0].replaceAll('\\', '/').endsWith('/dati/top_movers.json'));
});

/* ----------------------------- le finestre della torre ----------------------------- */

test('torre: l\'ambra e\' luce, la pietra viola no; spegni tocca solo la luce', () => {
  assert.equal(luce(255, 194, 75).vetro, 1);
  assert.equal(luce(72, 58, 110).alone, 0);
  assert.equal(luce(30, 24, 48).alone, 0);
  const px = Buffer.from([255, 194, 75, 255, 72, 58, 110, 255]);
  assert.equal(spegni(px), 1);
  assert.deepEqual([...px.subarray(4)], [72, 58, 110, 255]);
  assert.ok(px[0] < 60 && px[2] > px[0], 'la finestra spenta e\' ancora calda');
  assert.equal(px[3], 255);
});

/* ------------------------------------ i testi ------------------------------------ */

const dizionari = readdirSync(path.join(SITO, 'src/i18n/testi')).filter((f) => f.endsWith('.ts'));
async function carica(file) {
  return (await import(new URL(`../src/i18n/testi/${file}`, import.meta.url).href)).default;
}
function foglie(o, prefisso = '', uscita = []) {
  if (typeof o === 'string') uscita.push([prefisso, o]);
  else if (Array.isArray(o)) o.forEach((v, i) => foglie(v, `${prefisso}[${i}]`, uscita));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) foglie(v, prefisso ? `${prefisso}.${k}` : k, uscita);
  return uscita;
}
/** La forma delle chiavi, senza gli indici di lista: due lingue possono avere
 *  paragrafi in numero diverso, non chiavi diverse. */
const forma = (t) => [...new Set(foglie(t).map(([k]) => k.replace(/\[\d+\]/g, '[]')))].sort();

test('testi: l\'italiano c\'e\' ed e\' la lingua sorgente', async () => {
  assert.ok(dizionari.includes('it.ts'));
  const it = await carica('it.ts');
  assert.equal(it.lingua, 'it');
});

test('testi: ogni dizionario presente ha le stesse chiavi dell\'italiano', async () => {
  const attesa = forma(await carica('it.ts'));
  for (const file of dizionari) {
    const t = await carica(file);
    assert.equal(t.lingua, file.replace('.ts', ''), `${file}: lingua dichiarata diversa dal nome`);
    assert.deepEqual(forma(t), attesa, `${file}: chiavi diverse da it.ts`);
  }
});

test('testi: nessuna stringa vuota, nessun markup, tipografia vera', async () => {
  for (const file of dizionari) {
    for (const [chiave, v] of foglie(await carica(file))) {
      if (chiave === 'lingua' || /\.id$/.test(chiave)) continue;
      assert.ok(v.trim().length > 0, `${file} ${chiave}: vuota`);
      assert.ok(!/[<>]/.test(v), `${file} ${chiave}: contiene markup`);
      assert.ok(!v.includes('...'), `${file} ${chiave}: tre punti invece dell'ellissi`);
      assert.ok(!/[—–]/.test(v), `${file} ${chiave}: trattino lungo come punteggiatura`);
      assert.ok(!/[\u0000-\u001f]/.test(v), `${file} ${chiave}: carattere di controllo`);
      assert.ok(!/\p{L}'\p{L}/u.test(v), `${file} ${chiave}: apostrofo dritto`);
      assert.ok(!/\d [€]/.test(v), `${file} ${chiave}: spazio separabile prima di euro`);
    }
  }
});

// S384, corsia B6: il presidio debole che stava qui ("Google Play come luogo
// di scaricamento...", quattro forme fisse, solo l'italiano) e' SOSTITUITO da
// integrations/testi.test.mjs, che vieta il nome ovunque fuori dalle chiavi
// ammesse e ragiona sulle sei lingue. Qui resta il controllo dell'interruttore.
test('testi: l\'interruttore pmSuPlay esiste ed e\' un booleano scritto in chiaro', () => {
  assert.match(leggiTesto('src/lib/stato.ts'), /export const pmSuPlay = (true|false);/);
  assert.equal((leggiTesto('src/lib/stato.ts').match(/export const pmSuPlay\b/g) ?? []).length, 1);
});

test('testi: i quattro piani hanno gli identificativi del listino canonico e un prezzo nel formato della lingua', async () => {
  // La COPPIA (piano, importo) la verifica il presidio del listino dell'app
  // (scripts/legal/check_listino.py, regola R1, che legge anche questo sito):
  // qui non si ricopiano gli importi, per non farne un'altra sede da tenere
  // allineata. Si verificano identificativi e ordine; i NUMERI contro
  // l'italiano e la FORMA contro il formato nativo di ogni lingua li giudica
  // integrations/prezzi-nativi.mjs (S384, corsia B6: prima qui si imponeva a
  // tutte le lingue la forma italiana, e l'inglese usciva col simbolo dopo la cifra).
  const it = await carica('it.ts');
  for (const file of dizionari) {
    const t = await carica(file);
    assert.deepEqual(t.prezzi.piani.map((p) => p.id), ['single_annual', 'single_lifetime', 'family_annual', 'family_lifetime']);
    assert.deepEqual(difettiPrezzi(t.lingua, t, it), [], `${file}: prezzi`);
    const importi = t.prezzi.piani.map((p) => prezziIn(p.prezzo)[0].importo);
    assert.ok(importi[0] < importi[1] && importi[2] < importi[3], `${file}: un piano a vita costa meno del suo annuale`);
    assert.ok(importi[0] < importi[2] && importi[1] < importi[3], `${file}: un piano Famiglia costa meno del Singolo`);
  }
});

test('testi: undici broker, come il parser dell\'app', () => {
  const sorgente = leggiTesto('src/lib/broker.ts');
  assert.equal((sorgente.match(/\{ nome: '/g) ?? []).length, 11);
});

/* -------------------------------- la configurazione -------------------------------- */

test('configurazione: la politica di sicurezza e\' accesa e non ammette script in linea', () => {
  const cfg = leggiTesto('astro.config.mjs');
  assert.match(cfg, /security:\s*\{\s*csp:\s*\{/);
  assert.match(cfg, /"default-src 'self'"/);
  assert.match(cfg, /"object-src 'none'"/);
  assert.ok(!/unsafe-inline|unsafe-eval/.test(cfg), 'astro.config.mjs ammette unsafe-*');
});

test('configurazione: il telaio nuovo non ha script in linea ne\' attributi style', () => {
  // S384, fase B: i componenti del telaio nuovo stanno anche in sottocartelle
  // (finance/, games/, servizio/). Si leggono tutti, a ogni profondita': prima
  // la lista prendeva una cartella per un file e il test cadeva in lettura.
  const componenti = readdirSync(path.join(SITO, 'src/components/giorno'), { recursive: true })
    .map((f) => String(f).replace(/\\/g, '/'))
    .filter((f) => f.endsWith('.astro'))
    .map((f) => `src/components/giorno/${f}`);
  assert.ok(componenti.length >= 7, `componenti del telaio nuovo trovati: ${componenti.length}`);
  // S384, corsia B6: non piu' due pagine a campione, ma ogni pagina di ogni lingua.
  const pagine = readdirSync(path.join(SITO, 'src/pages'), { recursive: true })
    .map((f) => String(f).replace(/\\/g, '/'))
    .filter((f) => f.endsWith('.astro'))
    .map((f) => `src/pages/${f}`);
  assert.ok(pagine.length >= 80, `pagine trovate: ${pagine.length}`);
  const file = ['src/layouts/Pagina.astro', ...componenti, ...pagine];
  for (const f of file) {
    const s = leggiTesto(f);
    assert.ok(!/is:inline/.test(s), `${f}: is:inline`);
    assert.ok(!/\sstyle=/.test(s), `${f}: attributo style`);
    assert.ok(!/define:vars/.test(s), `${f}: define:vars genera stile in linea`);
    assert.ok(!/innerHTML|insertAdjacentHTML|document\.write/.test(s), `${f}: scrittura di HTML da script`);
  }
  assert.ok(!/innerHTML|insertAdjacentHTML/.test(leggiTesto('src/lib/palco.ts')));
});

/** I sorgenti che allargano la politica di sicurezza: `[]` se nessuno lo fa. */
function derogheAllaPolitica(sorgenti) {
  const difetti = [];
  for (const [nome, s] of Object.entries(sorgenti)) {
    if (/insertStyleResource|insertScriptResource|insertDirective/.test(s)) difetti.push(`${nome}: allarga la politica dalla pagina`);
    if (/unsafe-inline|unsafe-eval|unsafe-hashes|style-src-attr\s+'/.test(s)) difetti.push(`${nome}: nomina una sorgente unsafe`);
  }
  return difetti;
}

test('configurazione: nessun sorgente allarga la politica di sicurezza (la deroga del telaio vecchio e\' uscita)', () => {
  // S384, corsia B6: fino a ieri Layout.astro si prendeva `style-src-attr` con
  // la sorgente unsafe per i suoi attributi style. Tolto il telaio vecchio, la
  // politica e' una sola: nessun file sotto src/ la tocca piu'.
  const sorgenti = {};
  for (const f of readdirSync(path.join(SITO, 'src'), { recursive: true })) {
    const rel = `src/${String(f).replace(/\\/g, '/')}`;
    if (/\.(astro|ts|mjs)$/.test(rel)) sorgenti[rel] = leggiTesto(rel);
  }
  assert.ok(Object.keys(sorgenti).length >= 100, `sorgenti letti: ${Object.keys(sorgenti).length}`);
  assert.deepEqual(derogheAllaPolitica(sorgenti), []);
  assert.ok(!readdirSync(path.join(SITO, 'src/layouts')).includes('Layout.astro'), 'il telaio vecchio e\' tornato');
});

test('mutante: la deroga rimessa in un telaio, in una delle due forme, viene fermata', () => {
  assert.deepEqual(derogheAllaPolitica({ 'a.astro': '<slot />' }), []);
  assert.equal(derogheAllaPolitica({ 'a.astro': "Astro.csp?.insertStyleResource({ resource: \"'x'\", kind: 'attribute' });" }).length, 1);
  assert.equal(derogheAllaPolitica({ 'a.astro': "<meta content=\"style-src-attr 'unsafe-inline'\">" }).length, 1);
  assert.equal(derogheAllaPolitica({ 'a.ts': "const csp = \"script-src 'unsafe-eval'\";" }).length, 1);
});

test('configurazione: /home rimanda alla prima pagina e la pagina vecchia non c\'e\' piu\'', () => {
  assert.match(leggiTesto('astro.config.mjs'), /'\/home': '\/'/);
  assert.ok(!readdirSync(path.join(SITO, 'src/pages')).includes('home.astro'));
  assert.ok(!readdirSync(path.join(SITO, 'src/pages')).some((f) => f.startsWith('provino')));
});
