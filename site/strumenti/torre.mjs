// Rigenera le immagini della Torre usate dal sito a partire dai fondi VIGENTI
// del gioco (rollquest/unity/Assets/Art/Fondi, selezione utente S377).
//
//   node strumenti/torre.mjs <cartella Fondi> [--verifica]
//
// La Torre ha dodici segmenti, uno per Ascesa. Il sito ne mostra col loro
// fregio SOLO le prime di fila gia' in gioco (decisione dell'utente "Solo le
// prime", S384): vedi IN_GIOCO e MOSTRATE qui sotto. Per ognuno di quei
// segmenti produce, in WebP largo 540 px:
//   <nome>_spenta.webp  il segmento con le finestre spente
//   <nome>_luce.webp    SOLO la luce delle finestre, su trasparente
// La pagina di Games sovrappone la luce alla spenta e ne guida l'opacita' con
// lo scorrimento: le finestre si accendono salendo. Spenta + luce a opacita'
// piena ridanno il segmento com'e' nel gioco (lo prova il test).
//
// Le Ascese NON mostrate non hanno immagini: lo strumento non ne legge il
// fondo e non ne scrive nessuna resa. Al loro posto la pagina mette
//   <nome>_sagoma.webp  il solo contorno, riempito di un colore piatto
// ricavata da un segmento MOSTRATO (il fusto ha lo stesso contorno a ogni
// Ascesa: cambia il fregio, che la sagoma non porta) e, per la cima, dalla
// guglia. Una sagoma non contiene nulla del disegno da cui viene.
//
// Lo "spento", la "luce" e la "sagoma" NON sono asset di gioco: sono rese per
// il solo sito, derivate e rigenerabili da qui. Nel gioco le finestre sono
// dipinte accese.
//
// Scrive anche PROVENIENZA.json: sorgente, sha256 della sorgente, sha256 delle
// uscite, e toglie dalla cartella le immagini che il piano non prevede piu'.
// Con --verifica non scrive nulla e fallisce (exit 1) se una sorgente e'
// cambiata, un'uscita non corrisponde al registro o c'e' un'immagine in piu'.
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = path.join(QUI, '..', 'src', 'assets', 'torre');
const LARGHEZZA = 540;

/** Quante Ascese ha la Torre. */
export const ASCESE = 12;
/**
 * Le Ascese GIA' IN GIOCO: quelle che hanno la loro riga di nemici in
 * `rollquest/unity/Assets/Data/Config/bestiary_config.asset` (misurato l'11
 * novembre 2026 con `python scripts/conto_nemici_ascese.py`: fuori la 9 e la
 * 10). Fonti riga per riga: storico/harness/S384/SITO_A_FATTI.md, sezione
 * "Ascese in gioco". Chi aggiorna questo elenco rilancia lo strumento.
 */
export const IN_GIOCO = [1, 2, 3, 4, 5, 6, 7, 8, 11, 12];
/** Quante Ascese di fila, dalla prima, sono nell'elenco: "le prime". */
export function primeDiFila(inGioco) {
  let n = 0;
  while (inGioco.includes(n + 1)) n++;
  return n;
}
/**
 * Quante Ascese il sito mostra col loro fregio: le prime di fila gia' in
 * gioco. Un'Ascesa in gioco sopra un buco (oggi la 11 e la 12) resta sagoma.
 */
export const MOSTRATE = Math.min(ASCESE, primeDiFila(IN_GIOCO));
/** I segmenti mostrati, dal basso: uno per Ascesa. Spenta + luce per tutti. */
export const SEGMENTI = Array.from({ length: MOSTRATE }, (_, i) => `spr_tower_seg_a${i + 1}`);
/** Il segmento da cui si ricava la sagoma del fusto: deve essere MOSTRATO. */
export const SAGOMA_FUSTO = 'spr_tower_seg_a2';
/** La guglia: intera per la prima pagina, sagoma sopra i tratti non mostrati. */
export const GUGLIA = 'spr_summit_corvax';
/** Immagini con una sola resa, larghe come i segmenti. */
export const SEMPLICI = ['spr_tower_sky', 'spr_clouds_base'];
/** Immagini con una sola resa e una larghezza propria. */
export const PICCOLE = { spr_seal_clouds: 300 };

/** Il buio dietro una finestra spenta: l'interno dell'oculo dei segmenti. */
const BUIO = [27, 21, 46];
/** La pietra in ombra accanto a una finestra: dove torna l'alone caldo. */
const PIETRA = [58, 47, 92];
/** Il colore piatto di una sagoma: l'inchiostro dei contorni (--ink, #14101F). */
export const INCHIOSTRO = [20, 16, 31];

const stringi = (v) => Math.min(1, Math.max(0, v));

/**
 * Quanto un pixel e' luce, in due misure da 0 a 1: `alone` (il riverbero caldo
 * sulla pietra) e `vetro` (l'interno acceso della finestra). Le finestre del
 * canone sono ambra (#FFC24B e dintorni): rosso alto, blu basso. La pietra e'
 * viola: blu maggiore del rosso. La misura e' la distanza rosso-blu.
 */
export function luce(r, g, b) {
  const d = r - b;
  if (r < 70 || d <= 12) return { alone: 0, vetro: 0 };
  return { alone: stringi((d - 12) / 58), vetro: stringi((d - 70) / 50) };
}

/** Spegne un buffer RGBA in posto: l'alone torna pietra, il vetro va al buio. */
export function spegni(rgba) {
  let toccati = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    const { alone, vetro } = luce(rgba[i], rgba[i + 1], rgba[i + 2]);
    if (alone === 0) continue;
    toccati++;
    for (let c = 0; c < 3; c++) {
      const pietra = rgba[i + c] + (PIETRA[c] - rgba[i + c]) * alone;
      rgba[i + c] = Math.round(pietra + (BUIO[c] - pietra) * vetro);
    }
  }
  return toccati;
}

/**
 * Tiene in un buffer RGBA, in posto, SOLO i pixel che `spegni` toccherebbe:
 * tutto il resto diventa trasparente. E' il complemento esatto di `spegni`:
 * la luce sovrapposta alla spenta ridisegna ogni pixel cambiato col suo
 * colore d'origine. Rende quanti pixel restano.
 */
export function soloLuce(rgba) {
  let tenuti = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    const { alone } = luce(rgba[i], rgba[i + 1], rgba[i + 2]);
    if (alone === 0 || rgba[i + 3] === 0) {
      rgba[i] = 0; rgba[i + 1] = 0; rgba[i + 2] = 0; rgba[i + 3] = 0;
    } else {
      tenuti++;
    }
  }
  return tenuti;
}

/**
 * Riduce un buffer RGBA, in posto, alla sua SAGOMA: ogni pixel non trasparente
 * prende il colore piatto, la trasparenza resta com'e'. Del disegno non
 * sopravvive niente: ne' il fregio, ne' le finestre, ne' i mattoni. Rende
 * quanti pixel ha riempito.
 */
export function sagoma(rgba) {
  let pieni = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    if (rgba[i + 3] === 0) {
      rgba[i] = 0; rgba[i + 1] = 0; rgba[i + 2] = 0;
      continue;
    }
    pieni++;
    rgba[i] = INCHIOSTRO[0]; rgba[i + 1] = INCHIOSTRO[1]; rgba[i + 2] = INCHIOSTRO[2];
  }
  return pieni;
}

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

async function webp(buffer, info) {
  return sharp(buffer, { raw: info }).webp({ quality: 82, effort: 6 }).toBuffer();
}
async function webpLuce(buffer, info) {
  return sharp(buffer, { raw: info }).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toBuffer();
}
/** Senza perdita: un colore solo si comprime bene, e resta DAVVERO un colore solo. */
async function webpSagoma(buffer, info) {
  return sharp(buffer, { raw: info }).webp({ lossless: true, effort: 6 }).toBuffer();
}

/**
 * Elabora un fondo. `rese` dice che cosa produrre: `intera` (com'e' nel gioco),
 * `spenta`, `luce`, `sagoma`. Rende sorgente, misure e i buffer delle uscite.
 */
export async function elabora(fondi, nome, rese, larghezza = LARGHEZZA) {
  const sorgente = path.join(fondi, `${nome}.png`);
  const grezzo = await readFile(sorgente);
  const { data, info } = await sharp(grezzo)
    .resize({ width: larghezza })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const raw = { width: info.width, height: info.height, channels: 4 };
  const uscite = {};
  if (rese.intera) uscite[`${nome}.webp`] = await webp(Buffer.from(data), raw);
  if (rese.spenta) {
    const copia = Buffer.from(data);
    if (spegni(copia) === 0) throw new Error(`${nome}: nessuna finestra trovata, la soglia non morde`);
    uscite[`${nome}_spenta.webp`] = await webp(copia, raw);
  }
  if (rese.luce) {
    const copia = Buffer.from(data);
    if (soloLuce(copia) === 0) throw new Error(`${nome}: nessuna luce trovata, la soglia non morde`);
    uscite[`${nome}_luce.webp`] = await webpLuce(copia, raw);
  }
  if (rese.sagoma) {
    const copia = Buffer.from(data);
    if (sagoma(copia) === 0) throw new Error(`${nome}: nessun pixel pieno, la sagoma e' vuota`);
    uscite[`${nome}_sagoma.webp`] = await webpSagoma(copia, raw);
  }
  return {
    sorgente: `rollquest/unity/Assets/Art/Fondi/${nome}.png`,
    sha256_sorgente: sha(grezzo),
    larghezza: info.width,
    altezza: info.height,
    uscite,
  };
}

/**
 * Il piano: che cosa si produce per ogni fondo, nell'ordine del registro. Dei
 * segmenti entrano SOLO quelli mostrati: di un'Ascesa non mostrata lo
 * strumento non apre nemmeno il fondo. Le sagome servono solo se c'e' almeno
 * un'Ascesa non mostrata.
 */
export function piano() {
  const celate = MOSTRATE < ASCESE;
  if (celate && !SEGMENTI.includes(SAGOMA_FUSTO)) {
    throw new Error(`${SAGOMA_FUSTO} non e' fra i segmenti mostrati: la sagoma rivelerebbe un'Ascesa nascosta`);
  }
  const voci = [];
  for (const nome of SEGMENTI) {
    const rese = { spenta: true, luce: true };
    if (celate && nome === SAGOMA_FUSTO) rese.sagoma = true;
    voci.push({ nome, rese, larghezza: LARGHEZZA });
  }
  voci.push({ nome: GUGLIA, rese: celate ? { intera: true, sagoma: true } : { intera: true }, larghezza: LARGHEZZA });
  for (const nome of SEMPLICI) voci.push({ nome, rese: { intera: true }, larghezza: LARGHEZZA });
  for (const [nome, larghezza] of Object.entries(PICCOLE)) voci.push({ nome, rese: { intera: true }, larghezza });
  return voci;
}

async function main() {
  const args = process.argv.slice(2);
  const verifica = args.includes('--verifica');
  const fondi = args.find((a) => !a.startsWith('--'));
  if (!fondi) {
    console.error('uso: node strumenti/torre.mjs <cartella Fondi> [--verifica]');
    process.exit(2);
  }
  const registro = { larghezza: LARGHEZZA, immagini: {} };
  const file = {};
  for (const voce of piano()) {
    const r = await elabora(fondi, voce.nome, voce.rese, voce.larghezza);
    for (const [f, buf] of Object.entries(r.uscite)) file[f] = buf;
    registro.immagini[voce.nome] = {
      sorgente: r.sorgente,
      sha256_sorgente: r.sha256_sorgente,
      larghezza: r.larghezza,
      altezza: r.altezza,
      uscite: Object.fromEntries(Object.entries(r.uscite).map(([f, b]) => [f, sha(b)])),
    };
  }
  const testo = JSON.stringify(registro, null, 2) + '\n';
  const registroPath = path.join(USCITA, 'PROVENIENZA.json');
  if (verifica) {
    const atteso = await readFile(registroPath, 'utf8');
    if (atteso !== testo) {
      console.error('PROVENIENZA.json non corrisponde: una sorgente o la resa sono cambiate');
      process.exit(1);
    }
    for (const [f, buf] of Object.entries(file)) {
      const disco = await readFile(path.join(USCITA, f));
      if (sha(disco) !== sha(buf)) {
        console.error(`${f}: il file su disco non e' quello che lo strumento produce`);
        process.exit(1);
      }
    }
    const inPiu = (await readdir(USCITA)).filter((f) => f.endsWith('.webp') && !(f in file));
    if (inPiu.length > 0) {
      console.error(`immagini fuori dal piano in src/assets/torre: ${inPiu.join(', ')}`);
      process.exit(1);
    }
    console.log(`ok: ${Object.keys(file).length} immagini corrispondono al registro`);
    return;
  }
  await mkdir(USCITA, { recursive: true });
  // Un'immagine che il piano non prevede piu' (un'Ascesa tolta dalle mostrate)
  // non deve restare sul disco: la build la porterebbe nel sito.
  for (const f of await readdir(USCITA)) {
    if (f.endsWith('.webp') && !(f in file)) {
      await unlink(path.join(USCITA, f));
      console.log(`${f}  tolta: fuori dal piano`);
    }
  }
  let totale = 0;
  for (const [f, buf] of Object.entries(file)) {
    await writeFile(path.join(USCITA, f), buf);
    totale += buf.length;
    console.log(`${f}  ${buf.length} byte`);
  }
  await writeFile(registroPath, testo);
  console.log(`PROVENIENZA.json scritto; ${Object.keys(file).length} immagini, ${totale} byte`);
}

const diretto = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (diretto) main().catch((e) => { console.error(e.message); process.exit(1); });
