/**
 * Integrazione Astro locale: toglie i commenti HTML dalle pagine SERVITE.
 *
 * Perche' esiste (decisione dello studio). I commenti di sviluppo dei nostri
 * .astro finiscono verbatim nell'HTML pubblicato: misurato su `games.html`,
 * **56 commenti per 15,3 KB su 57,9 KB, cioe' il 26% del peso della pagina**.
 * Non sono una violazione di clean-room - nessun nome di IP di terzi - ma
 * raccontano decisioni interne e difetti che abbiamo pagato (per esempio
 * "con lo slash, tutte e cinque le lingue non italiane erano 404"). Erano li'
 * da tempo, e nessuno aveva mai deciso di pubblicarli.
 *
 * I commenti restano nei SORGENTI, dove servono a chi lavora. Escono solo
 * dall'output servito. `compressHTML` di Astro non li tocca: comprime gli
 * spazi, non i commenti.
 *
 * COSA NON SI TOCCA, e perche':
 *  - `<script>`, `<style>`, `<pre>`, `<textarea>`: dentro, `<!--` non e' un
 *    commento HTML - e' codice, o testo che l'utente deve vedere com'e';
 *  - commenti CONDIZIONALI (`<!--[if ...]>`): sono markup attivo su IE, e
 *    rimuoverli cambierebbe cio' che quel browser esegue;
 *  - la dichiarazione `<!doctype>` (non e' un commento, ma la sua sintassi ci
 *    somiglia abbastanza da meritare la nota).
 *
 * Zero dipendenze: stdlib di Node, come il resto della pipeline del sito.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PROTETTI = ['script', 'style', 'pre', 'textarea'];

/**
 * Rimuove i commenti HTML preservando le regioni protette.
 * Esportata a parte perche' e' la funzione che si verifica: la prova che
 * l'integrazione non ha cambiato ALTRO e' applicarla alla build precedente e
 * ottenere byte identici alla nuova.
 */
export function togliCommenti(html) {
  const basso = html.toLowerCase();
  let out = '';
  let i = 0;
  while (i < html.length) {
    // Un TAG si consuma sempre intero, virgolette comprese: dentro il valore
    // di un attributo, `<script>` e' testo, non markup. Saltare questo passo
    // era un fail-open SILENZIOSO: `<div data-x="<script>">` faceva credere
    // di essere entrati in una regione protetta, la chiusura non arrivava
    // mai e il resto del documento usciva verbatim - commenti inclusi, da li'
    // fino a fine pagina, senza un errore. Trovato in revisione e
    // riprodotto prima di curarlo.
    const nome = nomeTag(html, i);
    if (nome !== null) {
      const fineApertura = fineTag(html, i);
      out += html.slice(i, fineApertura);
      const autoChiuso = html[fineApertura - 2] === '/';
      i = fineApertura;
      // Regione protetta: dentro, `<!--` non e' un commento. Si copia
      // verbatim fino al tag di chiusura corrispondente.
      if (!autoChiuso && PROTETTI.includes(nome)) {
        const chiusura = basso.indexOf(`</${nome}`, i);
        if (chiusura === -1) {
          out += html.slice(i);           // tag mai chiuso: non si perde nulla
          break;
        }
        const fineChiusura = fineTag(html, chiusura);
        out += html.slice(i, fineChiusura);
        i = fineChiusura;
      }
      continue;
    }
    if (html.startsWith('<!--', i)) {
      // Condizionale IE: si tiene com'e'.
      if (html.startsWith('<!--[', i)) {
        const fine = html.indexOf('-->', i);
        const stop = fine === -1 ? html.length : fine + 3;
        out += html.slice(i, stop);
        i = stop;
        continue;
      }
      const fine = html.indexOf('-->', i);
      if (fine === -1) { out += html.slice(i); break; }  // commento non chiuso
      i = fine + 3;
      continue;
    }
    out += html[i];
    i += 1;
  }
  return out;
}

/**
 * Nome del tag che si apre (o si chiude) in posizione `i`, in minuscolo.
 * `null` se li' non comincia un tag: testo, `<!doctype>`, `<!--`, o un `<`
 * solitario (che in HTML e' legale come testo).
 */
export function nomeTag(html, i) {
  if (html[i] !== '<') return null;
  let j = i + 1;
  if (html[j] === '/') j += 1;
  const primo = html[j];
  if (!primo || !/[a-zA-Z]/.test(primo)) return null;   // esclude <!doctype, <!--, <3
  let fine = j;
  while (fine < html.length && /[a-zA-Z0-9:-]/.test(html[fine])) fine += 1;
  return html.slice(j, fine).toLowerCase();
}

/**
 * Indice SUBITO DOPO il `>` che chiude il tag aperto in `i`, ignorando i `>`
 * che stanno dentro un valore di attributo virgolettato. Se il tag non viene
 * mai chiuso, la fine del documento.
 */
export function fineTag(html, i) {
  let j = i + 1;
  let virgoletta = null;
  while (j < html.length) {
    const c = html[j];
    if (virgoletta) {
      if (c === virgoletta) virgoletta = null;
    } else if (c === '"' || c === "'") {
      virgoletta = c;
    } else if (c === '>') {
      return j + 1;
    }
    j += 1;
  }
  return html.length;
}

async function* htmlNellaCartella(dir) {
  for (const voce of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, voce.name);
    if (voce.isDirectory()) yield* htmlNellaCartella(p);
    else if (extname(voce.name) === '.html') yield p;
  }
}

export default function stripHtmlComments() {
  return {
    name: 'plurifin:strip-html-comments',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const radice = typeof dir === 'string' ? dir : fileURLToPath(dir);
        let pagine = 0;
        let risparmio = 0;
        const falliti = [];
        // Ogni pagina per conto suo: un file che non si legge non deve
        // portarsi dietro le altre 90 con uno stack senza nome. La scelta e'
        // DICHIARATA: si prosegue e si conta, non si abortisce la build -
        // un deploy fermato da un singolo file illeggibile costa piu' del
        // rischio che quella pagina esca coi suoi commenti. Ma il fallimento
        // non e' silenzioso: finisce in `logger.error` col path, e il
        // riepilogo finale lo ripete anche a chi legge solo l'ultima riga.
        for await (const file of htmlNellaCartella(radice)) {
          try {
            const prima = await readFile(file, 'utf8');
            const dopo = togliCommenti(prima);
            if (dopo.length !== prima.length) {
              await writeFile(file, dopo, 'utf8');
              pagine += 1;
              risparmio += prima.length - dopo.length;
            }
          } catch (err) {
            falliti.push(file);
            logger.error(`non sono riuscito a ripulire ${file}: ${err.message}`);
          }
        }
        const riepilogo =
          `commenti rimossi da ${pagine} pagine, ${(risparmio / 1024).toFixed(1)} KB in meno`;
        if (falliti.length) {
          logger.error(
            `${riepilogo} -- ATTENZIONE: ${falliti.length} pagine NON ripulite ` +
            `(escono coi loro commenti): ${falliti.join(', ')}`
          );
        } else {
          logger.info(riepilogo);
        }
      },
    },
  };
}
