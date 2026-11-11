// Rigenera le SCHERMATE VERE di Portfolio Manager usate dalla pagina Finance,
// a partire dalle catture dell'app (marketing/screenshots/v9 del repo dell'app:
// 1080x2400, emulatore, portafoglio dimostrativo "Portafoglio Demo").
//
//   node strumenti/schermate.mjs <cartella v9> [lingua ...] [--verifica]
//
// Per ogni lingua (predefinita: it) produce quattro WebP larghi 488 px in
// src/assets/pm/<lingua>/ e il registro PROVENIENZA.json della lingua: sorgente,
// sha256 della sorgente, sha256 dell'uscita. Con --verifica non scrive nulla e
// fallisce (exit 1) se una sorgente e' cambiata o un'uscita non corrisponde.
//
// Le catture NON sono ritoccate: solo ridotte. Sono quattro e non dieci per
// scelta: `06_position_detail` e' la schermata del portafoglio con un fumetto
// sopra, `04/05_goals_*` sono stati vuoti ("Nessun obiettivo"), `07_settings`
// mostra i campi delle chiavi API, `09_paywall` e `10_add_position_form` non
// raccontano il prodotto. Una lingua nuova si aggiunge passandola qui, e le sue
// quattro catture vanno GUARDATE prima di pubblicarle (v9/README.md: in fr, es
// e pt alcune catture degli obiettivi sono doppioni).
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const USCITA = path.join(QUI, '..', 'src', 'assets', 'pm');
export const LARGHEZZA = 488;
export const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];

/** Nome dell'uscita -> suffisso della cattura sorgente. L'ordine e' quello
 *  delle schede del palco (PalcoTelefono.astro). */
export const SCHERMATE = {
  portafoglio: '01_home_populated',
  mercato: '02_market',
  ribilanciamento: '03_rebalance',
  analisi: '08_ai_analysis',
};

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

/** Il nome del file sorgente di una schermata in una lingua. */
export function sorgente(lingua, nome) {
  if (!LINGUE.includes(lingua)) throw new Error(`lingua sconosciuta: ${lingua}`);
  const suffisso = SCHERMATE[nome];
  if (!suffisso) throw new Error(`schermata sconosciuta: ${nome}`);
  return `${lingua}_${suffisso}.png`;
}

async function elabora(cartella, lingua, nome) {
  const { default: sharp } = await import('sharp');
  const file = sorgente(lingua, nome);
  const grezzo = await readFile(path.join(cartella, file));
  const meta = await sharp(grezzo).metadata();
  if (meta.width !== 1080 || meta.height !== 2400) {
    throw new Error(`${file}: ${meta.width}x${meta.height}, attesa 1080x2400`);
  }
  const uscita = await sharp(grezzo).resize({ width: LARGHEZZA }).webp({ quality: 80, effort: 6 }).toBuffer();
  return {
    uscita,
    voce: {
      sorgente: `marketing/screenshots/v9/${file}`,
      sha256_sorgente: sha(grezzo),
      larghezza: LARGHEZZA,
      altezza: Math.round((LARGHEZZA * meta.height) / meta.width),
      sha256_uscita: sha(uscita),
    },
  };
}

async function main() {
  const args = process.argv.slice(2);
  const verifica = args.includes('--verifica');
  const liberi = args.filter((a) => !a.startsWith('--'));
  const cartella = liberi[0];
  const lingue = liberi.slice(1).length > 0 ? liberi.slice(1) : ['it'];
  if (!cartella) {
    console.error('uso: node strumenti/schermate.mjs <cartella v9> [lingua ...] [--verifica]');
    process.exit(2);
  }
  for (const lingua of lingue) {
    const dir = path.join(USCITA, lingua);
    const registro = { larghezza: LARGHEZZA, schermate: {} };
    const file = {};
    for (const nome of Object.keys(SCHERMATE)) {
      const r = await elabora(cartella, lingua, nome);
      file[`${nome}.webp`] = r.uscita;
      registro.schermate[nome] = r.voce;
    }
    const testo = JSON.stringify(registro, null, 2) + '\n';
    const registroPath = path.join(dir, 'PROVENIENZA.json');
    if (verifica) {
      const atteso = await readFile(registroPath, 'utf8');
      if (atteso !== testo) {
        console.error(`${lingua}: PROVENIENZA.json non corrisponde, una cattura o la resa sono cambiate`);
        process.exit(1);
      }
      for (const [f, buf] of Object.entries(file)) {
        const disco = await readFile(path.join(dir, f));
        if (sha(disco) !== sha(buf)) {
          console.error(`${lingua}/${f}: il file su disco non e' quello che lo strumento produce`);
          process.exit(1);
        }
      }
      console.log(`ok ${lingua}: ${Object.keys(file).length} schermate corrispondono al registro`);
      continue;
    }
    await mkdir(dir, { recursive: true });
    for (const [f, buf] of Object.entries(file)) {
      await writeFile(path.join(dir, f), buf);
      console.log(`${lingua}/${f}  ${buf.length} byte`);
    }
    await writeFile(registroPath, testo);
    console.log(`${lingua}/PROVENIENZA.json scritto`);
  }
}

const diretto = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (diretto) main().catch((e) => { console.error(e.message); process.exit(1); });
