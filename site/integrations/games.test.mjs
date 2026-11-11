// I PRESIDI DELLA PAGINA GAMES (S384, corsia B2): i conti della salita e del
// dado, la coerenza fra conti e foglio di stile, lo strumento della Torre e il
// suo registro, i sorgenti della corsia. Girano con `npm test` PRIMA della
// build. I contratti sulla pagina costruita stanno in costruito/games.test.mjs.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  ASCESE, BASE, FACCE, FERMATE, MOSTRATE, RIPOSO, SOSTA, VISTA, accensione, ascesa, avanzamento, cifra,
  dadoAllaTappa, facciaInAlto, quotaBassa, soglia, tappa, toni, versoChiGuarda,
} from '../src/components/giorno/games/salita-conti.mjs';
import {
  ASCESE as ASCESE_STRUMENTO, GUGLIA, INCHIOSTRO, IN_GIOCO, MOSTRATE as MOSTRATE_STRUMENTO, SAGOMA_FUSTO,
  SEGMENTI, luce, piano, primeDiFila, sagoma, soloLuce, spegni,
} from '../strumenti/torre.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leggi = (rel) => readFileSync(path.join(SITO, rel), 'utf8');
const CSS = leggi('src/styles/games.css');

/* ------------------------------------ il dado ------------------------------------ */

test('dado: le facce opposte sommano sette', () => {
  for (const f of FACCE) {
    const opposta = FACCE.find((g) => g.n.every((v, i) => v === -f.n[i]));
    assert.ok(opposta, `${f.nome} non ha la faccia opposta`);
    assert.equal(f.punti + opposta.punti, 7, `${f.nome}: ${f.punti} + ${opposta.punti}`);
  }
  assert.deepEqual(FACCE.map((f) => f.punti).sort(), [1, 2, 3, 4, 5, 6]);
});

test('dado: alla fermata k guarda in alto la faccia con k punti, dritta', () => {
  assert.equal(FERMATE.length, 7);
  for (let k = 1; k <= 6; k++) {
    const { punti, dritta } = facciaInAlto(FERMATE[k].rx, FERMATE[k].rz);
    assert.equal(punti, k, `fermata ${k}: in alto c'e' il ${punti}`);
    assert.ok(dritta > 0.9999, `fermata ${k}: la faccia non e' orizzontale (${dritta})`);
  }
  assert.ok(facciaInAlto(FERMATE[0].rx, FERMATE[0].rz).dritta < 0.9, 'all\'apertura il dado deve stare in bilico');
});

test('dado: fra una fermata e l\'altra gira sempre in avanti, almeno tre quarti di giro', () => {
  for (let k = 1; k < FERMATE.length; k++) {
    assert.ok(FERMATE[k].rx - FERMATE[k - 1].rx >= 270, `fermata ${k}: gira troppo poco`);
  }
});

test('dado: fermo durante la sosta, in aria dopo, a terra sulla faccia giusta alla tappa dopo', () => {
  for (let k = 1; k <= 5; k++) {
    const sosta = dadoAllaTappa(k + SOSTA * 0.5);
    assert.deepEqual([sosta.rx, sosta.rz, sosta.su, sosta.fermo], [FERMATE[k].rx, FERMATE[k].rz, 0, true]);
    const volo = dadoAllaTappa(k + SOSTA + (1 - SOSTA) / 2);
    assert.ok(!volo.fermo && volo.su > 0.5, `tappa ${k}: a meta' del salto il dado non e' in aria`);
    const arrivo = dadoAllaTappa(k + 1);
    assert.equal(facciaInAlto(arrivo.rx, arrivo.rz).punti, k + 1);
    assert.ok(Math.abs(arrivo.su) < 1e-9);
  }
});

test('dado: l\'apertura e\' in bilico e sollevata; oltre l\'ultima tappa resta sul sei; un NaN non rompe', () => {
  const inizio = dadoAllaTappa(0);
  assert.ok(inizio.su > 0.2 && inizio.rx === FERMATE[0].rx);
  for (const s of [6, 6.5, 99]) {
    const d = dadoAllaTappa(s);
    assert.equal(facciaInAlto(d.rx, d.rz).punti, 6);
    assert.ok(Math.abs(d.su) < 1e-9);
  }
  const rotto = dadoAllaTappa(Number.NaN);
  assert.equal(rotto.rx, FERMATE[0].rx);
  assert.ok(!cifra(rotto.su).includes('NaN'));
});

test('dado: a ogni fermata le tre facce che si vedono hanno tre toni diversi, la piu\' chiara in alto', () => {
  for (let k = 1; k <= 6; k++) {
    const { rx, rz } = FERMATE[k];
    const t = toni(rx, rz);
    const viste = FACCE.map((f, i) => ({ f, tono: t[i] })).filter(({ f }) => versoChiGuarda(f.n, rx, rz) > 0.05);
    assert.equal(viste.length, 3, `fermata ${k}: si vedono ${viste.length} facce`);
    assert.deepEqual(viste.map((v) => v.tono).sort(), ['alto', 'medio', 'ombra'], `fermata ${k}`);
    assert.equal(viste.find((v) => v.tono === 'alto').f.punti, k, `fermata ${k}: la faccia in luce non e' quella in alto`);
  }
});

/* ------------------------------ le tappe e la quota ------------------------------ */

test('tappa: prima della prima, a meta\' fra due, dall\'ultima in poi, lista vuota', () => {
  const cime = [100, 900, 1700];
  assert.equal(tappa(cime, 50), 0);
  assert.equal(tappa(cime, 100), 0);
  assert.equal(tappa(cime, 500), 0.5);
  assert.equal(tappa(cime, 900), 1);
  assert.equal(tappa(cime, 5000), 2);
  assert.equal(tappa([], 10), 0);
  assert.equal(tappa(cime, Number.NaN), 0);
});

test('quota: la camera parte sotto il primo segmento e finisce con la cima al centro', () => {
  const torre = 9152, palco = 900, segmento = 704;
  assert.ok(Math.abs(quotaBassa(0, torre, palco, segmento) + (torre * BASE) / segmento) < 1e-9);
  assert.ok(quotaBassa(0, torre, palco, segmento) < 0, 'alla partenza si deve guardare la base');
  assert.equal(quotaBassa(0.5, torre, palco, 0), 0);
  assert.equal(ascesa(quotaBassa(0, torre, palco, segmento), palco, segmento, 12), 1);
  assert.equal(ascesa(quotaBassa(1, torre, palco, segmento), palco, segmento, 12), 0);
  // Salendo l'etichetta passa per tutte le dodici Ascese, in ordine, poi la cima.
  const viste = [];
  for (let i = 0; i <= 2000; i++) {
    const n = ascesa(quotaBassa(i / 2000, torre, palco, segmento), palco, segmento, 12);
    if (viste[viste.length - 1] !== n) viste.push(n);
  }
  assert.deepEqual(viste, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0]);
});

test('finestre: alla base sono tutte spente, in cima tutte accese, e si accendono dal basso', () => {
  const torre = 9152, palco = 900, segmento = 704;
  const q0 = quotaBassa(0, torre, palco, segmento);
  const q1 = quotaBassa(1, torre, palco, segmento);
  for (let i = 1; i <= 12; i++) {
    assert.equal(accensione(q0, i), 0, `Ascesa ${i} accesa alla partenza`);
    assert.equal(accensione(q1, i), 1, `Ascesa ${i} spenta in cima`);
    if (i > 1) assert.ok(soglia(i) > soglia(i - 1));
  }
  assert.equal(avanzamento(0, 3000, 900), 0);
  assert.equal(avanzamento(-2100, 3000, 900), 1);
});

/* ------------------------- i conti e il foglio di stile ------------------------- */

test('stile: le soglie per posizione sono quelle dei conti (il primo tratto e\' l\'Ascesa 12)', () => {
  for (let posto = 1; posto <= 12; posto++) {
    const m = CSS.match(new RegExp(`\\.tratto:nth-of-type\\(${posto}\\), \\.tacca:nth-of-type\\(${posto}\\) \\{ --soglia: ([\\d.]+); \\}`));
    assert.ok(m, `manca la soglia del posto ${posto}`);
    assert.ok(Math.abs(Number(m[1]) - soglia(13 - posto)) < 1e-9, `posto ${posto}: ${m[1]} contro ${soglia(13 - posto)}`);
  }
  assert.equal((CSS.match(/opacity: clamp\(0, calc\(\(var\(--q\) - var\(--soglia\)\) \* 4\), 1\)/g) ?? []).length, 2);
});

test('stile: base, vista del dado e numeri di riposo sono quelli dei conti', () => {
  assert.ok(CSS.includes(`(${cifra((1 + BASE) * 100)}% - var(--palco-h))`), 'la corsa della torre non conta la base');
  assert.ok(CSS.includes(`rotateX(${VISTA.x}deg) rotateY(${VISTA.y}deg) rotateX(var(--rx)) rotateZ(var(--rz))`));
  const riposo = FERMATE[6], apertura = FERMATE[0];
  const zero = (v) => cifra(v).replace(/^0\./, '.');
  assert.ok(
    CSS.includes(`--p: ${zero(RIPOSO.p)}; --q: ${zero(RIPOSO.q)}; --rx: ${riposo.rx}deg; --rz: ${riposo.rz}deg; --su: 0;`),
    'stato di riposo',
  );
  assert.ok(CSS.includes(`--p: 0; --q: 0; --rx: ${apertura.rx}deg; --rz: ${apertura.rz}deg;`), 'stato di partenza');
  assert.match(CSS, /@media \(scripting: enabled\) and \(prefers-reduced-motion: no-preference\)/);
});

/* ------------------------------ lo stato di riposo ------------------------------ */

test('riposo: la camera e\' ferma sull\'ultima Ascesa mostrata, accesa lei e nessuna oltre', () => {
  // Con tutte le Ascese mostrate il riposo torna in cima (--p: 1; --q: 13,
  // etichetta "In cima"): RIPOSO e games.css vanno riscritti insieme.
  assert.ok(MOSTRATE < ASCESE, 'tutte le Ascese mostrate: riscrivere RIPOSO e lo stato di riposo di games.css');
  assert.equal(RIPOSO.ascesa, MOSTRATE);
  assert.ok(RIPOSO.centro > MOSTRATE - 1 && RIPOSO.centro < MOSTRATE, 'al centro del palco deve stare l\'ultima mostrata');
  for (let i = 1; i <= ASCESE; i++) {
    assert.equal(accensione(RIPOSO.q, i), i <= MOSTRATE ? 1 : 0, `Ascesa ${i}: a riposo la luce e' sbagliata`);
  }
  // L'etichetta scritta in build ("Ascesa 8") e' quella che lo script
  // scriverebbe a quella quota: a 1440 x 900, 390 x 844 e 320 x 640 (palco e
  // tratto in px: il fusto e' largo 380, 234 e 192 px, il tratto 1000/540 di lui).
  for (const [palco, segmento] of [[900, 704], [473, 433], [358, 356]]) {
    assert.equal(ascesa(RIPOSO.q, palco, segmento, ASCESE), MOSTRATE, `palco ${palco}: etichetta`);
    // La sagoma si vede: sopra il centro resta in vista piu' di un quarto di segmento.
    assert.ok(RIPOSO.centro + palco / (2 * segmento) > MOSTRATE + 0.25, `palco ${palco}: la sagoma non entra`);
    // `--p` muove cielo, nubi e lume del binario: a riposo sta sulla tacca
    // dell'ultima Ascesa mostrata, a meno di un decimo dall'avanzamento che la
    // pagina viva ha quando la camera inquadra quel punto.
    const torre = segmento * (ASCESE + 1);
    const corsa = torre * (1 + BASE) - palco;
    const vivo = ((RIPOSO.centro - palco / (2 * segmento)) * segmento + torre * BASE) / corsa;
    assert.ok(Math.abs(quotaBassa(vivo, torre, palco, segmento) + palco / (2 * segmento) - RIPOSO.centro) < 1e-9, 'il conto inverso');
    assert.ok(Math.abs(RIPOSO.p - vivo) < 0.1, `palco ${palco}: --p di riposo ${RIPOSO.p} lontano dal vivo ${vivo}`);
  }
  // Il binario ha la cima e dodici tacche a distanze uguali, la prima in
  // fondo: la tacca dell'Ascesa k sta a (k - 1) dodicesimi della corsa, e il
  // lume scorre in linea con --p (lo dice il foglio di stile).
  assert.equal(RIPOSO.p, (MOSTRATE - 1) / ASCESE, 'il lume del binario non sta sulla tacca dell\'ultima Ascesa mostrata');
  assert.ok(CSS.includes('transform: translateY(calc((1 - var(--p)) * 100%));'), 'il lume del binario non segue piu\' --p in linea');
  // Il cielo a riposo sta un dodicesimo piu' su della camera, e solo a riposo.
  assert.ok(Math.abs(RIPOSO.cielo - (RIPOSO.p + 1 / ASCESE)) < 1e-12 && RIPOSO.cielo < 1);
  const zero = (v) => cifra(v).replace(/^0\./, '.');
  assert.ok(CSS.includes(`--cielo: ${zero(RIPOSO.cielo)};`), 'il cielo di riposo non e\' quello dei conti');
  assert.ok(CSS.includes('transform: translateY(calc((var(--cielo) - 1) * 39.4%));'), 'il cielo lontano non segue --cielo');
  assert.equal(CSS.split('--cielo: var(--p);').length - 1, 2, 'il cielo vivo deve seguire --p: a script partito e prima che parta');
});

test('riposo: il foglio di stile mette quel punto del fusto alla mezzeria del palco, e lo script lo scavalca', () => {
  // La cima e' alta come un tratto: il fusto e' ASCESE + 1 immagini uguali.
  const registro = JSON.parse(leggi('src/assets/torre/PROVENIENZA.json')).immagini;
  const misure = (nome) => `${registro[nome].larghezza}x${registro[nome].altezza}`;
  for (const nome of SEGMENTI) assert.equal(misure(nome), misure(GUGLIA), `${nome}: misure diverse dalla cima`);
  assert.ok(Math.abs(RIPOSO.fusto - ((ASCESE + 1 - RIPOSO.centro) / (ASCESE + 1)) * 100) < 1e-9);
  const viva = `calc((var(--p) - 1) * (${cifra((1 + BASE) * 100)}% - var(--palco-h)))`;
  const ferma = `calc(var(--palco-h) * .5 - ${cifra(RIPOSO.fusto)}%)`;
  assert.ok(CSS.includes(`--camera: ${ferma};`), `manca la camera di riposo: ${ferma}`);
  assert.ok(CSS.includes(`.volta[data-viva] { --camera: ${viva}; --cielo: var(--p); }`), 'lo script partito non riprende la camera');
  assert.equal(CSS.split(`--camera: ${viva};`).length - 1, 2, 'la camera viva: una volta a script partito, una prima che parta');
  assert.ok(CSS.includes('transform: translate(-50%, var(--camera));'), 'il fusto non segue --camera');
  // Il riposo e' la regola di base: fuori da ogni @media e senza [data-viva].
  const base = CSS.slice(CSS.indexOf('.volta {'), CSS.indexOf('}', CSS.indexOf('.volta {')));
  assert.ok(base.includes(ferma) && !base.includes('--p: 0'), 'la regola di base di .volta non e\' il riposo');
});

/* ------------------------------ la Torre e il registro ------------------------------ */

test('torre: la sola luce e\' il complemento esatto della spenta', () => {
  const px = () => Buffer.from([255, 194, 75, 255, 72, 58, 110, 255, 200, 120, 90, 255, 255, 194, 75, 0]);
  const spenta = px(), sola = px();
  assert.equal(spegni(spenta), 3);
  assert.equal(soloLuce(sola), 2, 'un pixel di luce trasparente non si tiene');
  const origine = px();
  for (let i = 0; i < 16; i += 4) {
    const eLuce = luce(origine[i], origine[i + 1], origine[i + 2]).alone > 0 && origine[i + 3] > 0;
    assert.equal(sola[i + 3], eLuce ? 255 : 0, `pixel ${i / 4}`);
    if (eLuce) assert.deepEqual([...sola.subarray(i, i + 3)], [...origine.subarray(i, i + 3)], 'la luce tiene il colore d\'origine');
  }
  // Il pixel di pietra non lo tocca nessuno dei due: resta nella spenta, manca nella luce.
  assert.deepEqual([...spenta.subarray(4, 8)], [72, 58, 110, 255]);
  assert.equal(sola[7], 0);
});

test('torre: si mostrano solo le prime Ascese di fila gia\' in gioco, e lo strumento non tocca le altre', () => {
  // "Le prime": di fila dalla prima. Un'Ascesa in gioco sopra un buco non conta.
  assert.equal(primeDiFila([1, 2, 3]), 3);
  assert.equal(primeDiFila([1, 2, 4, 5]), 2);
  assert.equal(primeDiFila([2, 3]), 0);
  assert.equal(primeDiFila([]), 0);
  assert.equal(primeDiFila([3, 1, 2]), 3, 'l\'ordine dell\'elenco non conta');
  // L'elenco di oggi: fuori la 9 e la 10 (fonti in SITO_A_FATTI.md).
  assert.equal(ASCESE_STRUMENTO, ASCESE);
  assert.ok(IN_GIOCO.every((n) => Number.isInteger(n) && n >= 1 && n <= ASCESE), 'un\'Ascesa che non esiste');
  assert.equal(new Set(IN_GIOCO).size, IN_GIOCO.length);
  assert.equal(MOSTRATE_STRUMENTO, primeDiFila(IN_GIOCO));
  assert.equal(MOSTRATE, MOSTRATE_STRUMENTO, 'salita-conti.mjs e strumenti/torre.mjs non mostrano le stesse Ascese');
  assert.equal(MOSTRATE, 8);
  for (let n = 1; n <= MOSTRATE; n++) assert.ok(IN_GIOCO.includes(n), `l'Ascesa ${n} e' mostrata ma non e' in gioco`);
  // Il piano: spenta e luce per le mostrate, nessuna voce per le altre.
  assert.deepEqual(SEGMENTI, Array.from({ length: MOSTRATE }, (_, i) => `spr_tower_seg_a${i + 1}`));
  const voci = piano();
  for (const nome of SEGMENTI) {
    const v = voci.find((x) => x.nome === nome);
    assert.deepEqual(v.rese, nome === SAGOMA_FUSTO ? { spenta: true, luce: true, sagoma: true } : { spenta: true, luce: true });
  }
  for (let n = MOSTRATE + 1; n <= ASCESE; n++) {
    assert.ok(!voci.some((v) => v.nome === `spr_tower_seg_a${n}`), `il piano legge il fondo dell'Ascesa ${n}`);
  }
  assert.ok(SEGMENTI.includes(SAGOMA_FUSTO), 'la sagoma del fusto viene da un\'Ascesa non mostrata');
  assert.deepEqual(voci.find((v) => v.nome === GUGLIA).rese, { intera: true, sagoma: true });
  assert.ok(!voci.some((v) => v.rese.intera && SEGMENTI.includes(v.nome)), 'un segmento intero che nessuna pagina usa');
});

test('torre: la sagoma riempie di un colore piatto e non tiene niente del disegno', async () => {
  const px = Buffer.from([255, 194, 75, 255, 72, 58, 110, 128, 9, 9, 9, 0, 200, 120, 90, 1]);
  assert.equal(sagoma(px), 3);
  for (const i of [0, 4, 12]) assert.deepEqual([...px.subarray(i, i + 3)], INCHIOSTRO, `pixel ${i / 4}: colore`);
  assert.deepEqual([px[3], px[7], px[11], px[15]], [255, 128, 0, 1], 'la trasparenza deve restare com\'e\'');
  assert.deepEqual([...px.subarray(8, 11)], [0, 0, 0], 'un pixel trasparente non deve portare colore');
  // I due file sul disco (compressi senza perdita): ogni pixel non
  // trasparente ha ESATTAMENTE il colore piatto. Se vi restasse un fregio,
  // una finestra o un mattone, i colori sarebbero piu' di uno.
  for (const nome of [`${SAGOMA_FUSTO}_sagoma`, `${GUGLIA}_sagoma`]) {
    const { data, info } = await sharp(path.join(SITO, 'src/assets/torre', `${nome}.webp`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let pieni = 0;
    const colori = new Set();
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue;
      pieni++;
      colori.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
    }
    assert.ok(pieni > info.width * info.height * 0.15, `${nome}: sagoma quasi vuota (${pieni} pixel)`);
    assert.deepEqual([...colori], [INCHIOSTRO.join(',')], `${nome}: non e' un colore solo`);
  }
});

test('registro: ogni immagine della Torre e\' sul disco col suo sha256, e nessuna e\' fuori registro', () => {
  const registro = JSON.parse(leggi('src/assets/torre/PROVENIENZA.json'));
  const attese = new Set();
  for (const [nome, voce] of Object.entries(registro.immagini)) {
    assert.match(voce.sorgente, /^rollquest\/unity\/Assets\/Art\/Fondi\/[a-z0-9_]+\.png$/, `${nome}: sorgente fuori dai fondi vigenti`);
    assert.match(voce.sha256_sorgente, /^[0-9a-f]{64}$/);
    for (const [file, sha] of Object.entries(voce.uscite)) {
      attese.add(file);
      const disco = createHash('sha256').update(readFileSync(path.join(SITO, 'src/assets/torre', file))).digest('hex');
      assert.equal(disco, sha, `${file}: il file non e' quello del registro`);
    }
  }
  for (const nome of SEGMENTI) {
    assert.ok(attese.has(`${nome}_spenta.webp`) && attese.has(`${nome}_luce.webp`), `${nome}: manca una resa`);
  }
  const sulDisco = readdirSync(path.join(SITO, 'src/assets/torre')).filter((f) => f.endsWith('.webp'));
  assert.deepEqual(sulDisco.sort(), [...attese].sort(), 'immagini fuori registro in src/assets/torre');
  // Il conto: due rese per Ascesa mostrata, le due sagome, la cima, il cielo,
  // le nubi della base e quelle del sigillo.
  assert.equal(sulDisco.length, 2 * MOSTRATE + 6, `immagini della Torre: ${sulDisco.length}`);
  assert.deepEqual(Object.keys(registro.immagini).sort(), [...SEGMENTI, GUGLIA, 'spr_tower_sky', 'spr_clouds_base', 'spr_seal_clouds'].sort());
});

test('registro: di un\'Ascesa non mostrata non c\'e\' nulla, ne\' sul disco ne\' nel registro ne\' nei sorgenti', () => {
  const celata = (testo) => {
    for (const m of testo.matchAll(/spr_tower_seg_a(\d+)/g)) if (Number(m[1]) > MOSTRATE) return m[0];
    return null;
  };
  assert.equal(celata('spr_tower_seg_a8_luce spr_tower_seg_a2_sagoma'), null);
  assert.equal(celata('x spr_tower_seg_a9_spenta.webp'), 'spr_tower_seg_a9', 'la sonda non vede un\'Ascesa nascosta');
  assert.equal(celata('spr_tower_seg_a12'), 'spr_tower_seg_a12');
  for (const f of readdirSync(path.join(SITO, 'src/assets/torre'))) {
    assert.equal(celata(f), null, `src/assets/torre/${f}: immagine di un'Ascesa non mostrata`);
  }
  assert.equal(celata(leggi('src/assets/torre/PROVENIENZA.json')), null, 'il registro nomina un\'Ascesa non mostrata');
  // I due palchi (prima pagina e Games) e i fogli di stile.
  for (const f of ['src/components/giorno/PalcoTorre.astro', 'src/components/giorno/games/Salita.astro', 'src/styles/games.css', 'src/styles/giorno.css']) {
    assert.equal(celata(leggi(f)), null, `${f}: nomina l'immagine di un'Ascesa non mostrata`);
  }
  // La prima pagina importa una per una le sue immagini: tutte di Ascese mostrate.
  const prima = [...leggi('src/components/giorno/PalcoTorre.astro').matchAll(/assets\/torre\/([a-z0-9_]+)\.webp/g)].map((m) => m[1]);
  assert.ok(prima.length >= 9, `la prima pagina importa ${prima.length} immagini della Torre`);
  const sulDisco = new Set(readdirSync(path.join(SITO, 'src/assets/torre')));
  for (const nome of prima) assert.ok(sulDisco.has(`${nome}.webp`), `la prima pagina importa ${nome}.webp, che non c'e'`);
});

/* ------------------------------------ i sorgenti ------------------------------------ */

test('sorgenti: la corsia non ha script in linea, attributi style ne\' scritture di HTML', () => {
  const cartella = 'src/components/giorno/games';
  const file = [...readdirSync(path.join(SITO, cartella)).map((f) => `${cartella}/${f}`), 'src/pages/games.astro'];
  assert.ok(file.length >= 7);
  for (const f of file) {
    const s = leggi(f);
    assert.ok(!/is:inline/.test(s), `${f}: is:inline`);
    assert.ok(!/\sstyle=/.test(s), `${f}: attributo style`);
    assert.ok(!/define:vars/.test(s), `${f}: define:vars genera stile in linea`);
    assert.ok(!/set:html|innerHTML|insertAdjacentHTML|document\.write/.test(s), `${f}: scrittura di HTML`);
    assert.ok(!/https?:\/\//.test(s.replace(/\/\*[\s\S]*?\*\//g, '')), `${f}: indirizzo esterno`);
  }
  const salita = leggi(`${cartella}/Salita.astro`);
  assert.match(salita, /class="volta" data-scena-salita aria-hidden="true"/);
  // Il tratto di un'Ascesa non mostrata porta la sagoma e nient'altro: niente luce.
  assert.match(salita, /n <= MOSTRATE\s*\?\s*\{ spenta: immagine\(`spr_tower_seg_a\$\{n\}_spenta`\), luce: immagine\(`spr_tower_seg_a\$\{n\}_luce`\) \}\s*:\s*null/);
  assert.match(salita, /<div class="tratto tratto-celato">\s*<img src=\{sagoma\.src\}[^>]*alt=""[^>]*\/>\s*<\/div>/);
  assert.match(salita, /import \{ ASCESE, MOSTRATE \} from '\.\/salita-conti\.mjs'/);
  assert.ok(!/const ASCESE = \d+/.test(salita + leggi(`${cartella}/salita.ts`)), 'un secondo conto delle Ascese, fuori da salita-conti.mjs');
  assert.match(leggi(`${cartella}/salita.ts`), /prefers-reduced-motion: reduce\)'\)\.matches\) return;/);
});

test('sorgenti: /games sta sul telaio nuovo in tutte e sei le lingue, in sei tappe piu\' l\'apertura', async () => {
  assert.match(leggi('src/pages/games.astro'), /components\/giorno\/games\/Games\.astro/);
  const pagina = leggi('src/components/giorno/games/Games.astro');
  assert.match(pagina, /import Pagina from '\.\.\/\.\.\/\.\.\/layouts\/Pagina\.astro'/);
  assert.ok(!/Layout\.astro|GamesPage/.test(pagina.replace(/\/\*[\s\S]*?\*\//g, '')));
  const it = (await import(new URL('../src/i18n/testi/it.ts', import.meta.url).href)).default;
  assert.equal(it.games.capitoli.length + 2, FERMATE.length - 1, 'capitoli, stato e scheda devono essere sei: uno per faccia');
  assert.equal(new Set(it.games.capitoli.map((c) => c.id)).size, it.games.capitoli.length);
  assert.ok(it.games.immagini.length > 40 && /non vengono dal gioco/.test(it.games.immagini));
  // S384, corsia B6: le cinque gemelle erano su GamesPage (telaio vecchio); ora
  // ognuna e' la stessa riga dell'italiana, con la sua lingua.
  for (const l of ['en', 'es', 'fr', 'de', 'pt']) {
    const riga = leggi(`src/pages/${l}/games.astro`);
    assert.match(riga, /components\/giorno\/games\/Games\.astro/, `${l}: non usa la pagina nuova`);
    assert.match(riga, new RegExp(`<Games lingua="${l}" />`), `${l}: lingua sbagliata`);
    assert.ok(!/GamesPage|i18n\/|layouts\//.test(riga.replace(/\/\*[\s\S]*?\*\//g, '')), `${l}: resti del telaio vecchio`);
    const t = (await import(new URL(`../src/i18n/testi/${l}.ts`, import.meta.url).href)).default;
    assert.equal(t.games.capitoli.length, it.games.capitoli.length, `${l}: i capitoli devono essere quanti le facce del dado`);
  }
});
