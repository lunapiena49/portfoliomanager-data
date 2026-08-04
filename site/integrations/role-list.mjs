/**
 * Integrazione Astro locale: ridA' semantica di LISTA alle liste che il reset
 * CSS ha spogliato.
 *
 * IL DIFETTO, e perche' non e' un vezzo. Il preflight di Tailwind emette
 *
 *     ol,ul,menu{margin:0;padding:0;list-style:none}
 *
 * e su `list-style: none` Safari con VoiceOver smette di annunciare l'elemento
 * come lista: niente "elenco, 5 elementi", niente navigazione per liste. Il
 * rimedio standard e' `role="list"`, che restituisce il ruolo che il CSS ha
 * tolto senza cambiare un pixel.
 *
 * Fino a S81 il rimedio era applicato A MANO, un attributo alla volta, sui
 * contenitori che qualcuno si era ricordato: **73 liste su 227**. Le altre 154,
 * sparse su 55 pagine, restavano mute - e Lighthouse non le segnala, quindi
 * nessuna misura diventava rossa. Decisione utente S81: chiudere le 154 col
 * ruolo, senza toccare il reset (che cambierebbe la resa di tutte e 227).
 *
 * PERCHE' IN BUILD E NON NEI SORGENTI. Meta' di quelle liste non ha un sorgente
 * su cui scrivere un attributo: nascono dal markdown dei post e dei documenti
 * legali, dove `- voce` diventa `<ul>` dentro il renderer. Un rimedio applicato
 * ai soli `.astro` lascerebbe fuori proprio le pagine di testo lungo, che sono
 * quelle che si leggono con lo screen reader. Qui si tocca l'HTML servito, che
 * e' l'unico posto dove le due provenienze sono la stessa cosa.
 *
 * COSA NON SI TOCCA:
 *  - le liste che un ruolo CE L'HANNO GIA' (`role="list"`, ma anche `menu`,
 *    `tablist`, `presentation`): il ruolo esplicito e' una decisione di chi ha
 *    scritto la pagina, e sovrascriverla sarebbe peggio del difetto;
 *  - `<script>`, `<style>`, `<pre>`, `<textarea>`: li' dentro `<ul>` non e'
 *    markup ma testo - un post che MOSTRA dell'HTML ne contiene, e riscriverlo
 *    cambierebbe cio' che il lettore vede. Le regioni protette e lo scanner dei
 *    tag sono gli STESSI di `strip-html-comments.mjs`, importati e non
 *    ricopiati: due scanner che divergono sono due comportamenti diversi sullo
 *    stesso HTML.
 *
 * Idempotente per costruzione: al secondo giro le liste hanno gia' il ruolo e
 * non viene toccato nulla.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PROTETTI, nomeTag, fineTag } from './strip-html-comments.mjs';

const LISTE = ['ul', 'ol'];

/** `true` se il tag gia' scritto porta un attributo `role`. */
function haRuolo(tag) {
  return /\srole\s*=/i.test(tag);
}

/**
 * Aggiunge `role="list"` alle liste che non hanno un ruolo.
 * Esportata a parte perche' e' la funzione che si verifica: l'integrazione
 * intorno e' solo attraversamento di cartelle.
 */
export function aggiungiRuoloLista(html) {
  const basso = html.toLowerCase();
  let out = '';
  let i = 0;
  let aggiunte = 0;
  while (i < html.length) {
    const nome = nomeTag(html, i);
    if (nome === null) {
      out += html[i];
      i += 1;
      continue;
    }
    const fine = fineTag(html, i);
    const tag = html.slice(i, fine);
    const chiusura = html[i + 1] === '/';
    const autoChiuso = html[fine - 2] === '/';

    if (!chiusura && LISTE.includes(nome) && !haRuolo(tag)) {
      // Si inserisce PRIMA del `>` finale (o del `/>`), mai in coda al nome:
      // il tag puo' portare attributi, e `<ul class="x">` deve restare valido.
      const taglio = autoChiuso ? fine - 2 : fine - 1;
      out += html.slice(i, taglio) + ' role="list"' + html.slice(taglio, fine);
      aggiunte += 1;
    } else {
      out += tag;
    }
    i = fine;

    if (!chiusura && !autoChiuso && PROTETTI.includes(nome)) {
      const chiude = basso.indexOf(`</${nome}`, i);
      if (chiude === -1) {
        out += html.slice(i);              // tag mai chiuso: non si perde nulla
        break;
      }
      const fineChiusura = fineTag(html, chiude);
      out += html.slice(i, fineChiusura);
      i = fineChiusura;
    }
  }
  return { html: out, aggiunte };
}

/** Quante liste restano senza ruolo. E' la misura che il test pretende a zero. */
export function listeSenzaRuolo(html) {
  return aggiungiRuoloLista(html).aggiunte;
}

async function* htmlNellaCartella(dir) {
  for (const voce of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, voce.name);
    if (voce.isDirectory()) yield* htmlNellaCartella(p);
    else if (extname(voce.name) === '.html') yield p;
  }
}

export default function roleList() {
  return {
    name: 'plurifin:role-list',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const radice = typeof dir === 'string' ? dir : fileURLToPath(dir);
        let pagine = 0;
        let aggiunte = 0;
        const falliti = [];
        // Stessa scelta dichiarata di `strip-html-comments`: una pagina che non
        // si legge non ferma le altre 91, ma non passa in silenzio.
        for await (const file of htmlNellaCartella(radice)) {
          try {
            const prima = await readFile(file, 'utf8');
            const esito = aggiungiRuoloLista(prima);
            if (esito.aggiunte > 0) {
              await writeFile(file, esito.html, 'utf8');
              pagine += 1;
              aggiunte += esito.aggiunte;
            }
          } catch (err) {
            falliti.push(file);
            logger.error(`non sono riuscito a marcare le liste di ${file}: ${err.message}`);
          }
        }
        const riepilogo = `role="list" aggiunto a ${aggiunte} liste su ${pagine} pagine`;
        if (falliti.length) {
          logger.error(
            `${riepilogo} -- ATTENZIONE: ${falliti.length} pagine NON marcate ` +
            `(le loro liste restano mute allo screen reader): ${falliti.join(', ')}`
          );
        } else {
          logger.info(riepilogo);
        }
      },
    },
  };
}
