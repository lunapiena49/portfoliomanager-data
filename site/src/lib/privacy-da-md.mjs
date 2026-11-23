// THE SITE LEGAL PAGES ARE THE APP DOCUMENTS, RENDERED (S343, S398).
//
// src/pages/{,en/,es/,fr/,de/,pt/}<id>.astro, for <id> in privacy, terms and
// disclaimer, must carry the SAME text, the same version and the same date as
// assets/legal/<lang>/<sorgente>.md of the app (the documents the user
// accepts; ids and source names: AVVISO_LEGALE.documenti in avviso-legale.mjs).
// Before S398 the privacy renderer lived in a session scratchpad and was lost:
// the pages stayed at 1.0.4 while the app moved to 1.0.5, and no test noticed;
// /terms and /disclaimer were a different, shorter site text "Versione 1.0"
// (user decision of 2026-11-22 on NU-S398-PM-TERMINI-SITO: render them from
// the app too). Now the renderer is here, each page is its output byte for
// byte (integrations/privacy-pagine.test.mjs), and strumenti/privacy-da-md.mjs
// rewrites the eighteen pages from the eighteen sources. The file keeps its
// S398 name: the privacy pages it generated name it in their header.
//
// STRICT on purpose: a markdown construct it does not know (nested list,
// single-asterisk emphasis, unbalanced backtick or bold, heading without its
// number, ragged table, ordered list out of sequence, raw HTML, anything but
// paragraphs inside a blockquote) THROWS. A legal text is never "rendered
// roughly": a new construct in a document means extending this file, with a
// test.
//
// ASCII-only (PM CLAUDE.md 4.1): the accents live in the .md, never here.

import { AVVISO_LEGALE } from './avviso-legale.mjs';

export const LINGUE_PRIVACY = Object.freeze(['it', 'en', 'es', 'fr', 'de', 'pt']);
export const LINGUE_LEGALI = LINGUE_PRIVACY;

/** The site pages rendered from the app: page id (= route) -> source file
 *  name in assets/legal/<lang>/ without ".md". One list, the notice's. */
export const PAGINE_LEGALI = Object.freeze(Object.fromEntries(AVVISO_LEGALE.documenti.map((d) => [d.id, d.sorgente])));

/** The source file name of a page id, or an error. */
export function sorgenteDi(id) {
  if (!Object.hasOwn(PAGINE_LEGALI, id)) throw new Error(`documento sconosciuto: ${id}`);
  return `${PAGINE_LEGALI[id]}.md`;
}

/** Escape for HTML text AND for Astro (braces would open an expression). */
function escapeTesto(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

/** Inline markdown: `code`, **bold**, [text](url), <https://autolink>.
 *  Anything else that looks like markup throws. `dove` names the line. */
export function inline(s, dove = '?') {
  let out = '';
  let i = 0;
  while (i < s.length) {
    // Image and strikethrough would pass as "!" + link and as literal "~~"
    // (S398, legal oracle): unsupported, they throw.
    if (s.startsWith('![', i)) throw new Error(`immagine non supportata (${dove}): ${s}`);
    if (s.startsWith('~~', i)) throw new Error(`barrato non supportato (${dove}): ${s}`);
    if (s[i] === '`') {
      const j = s.indexOf('`', i + 1);
      if (j < 0) throw new Error(`backtick non chiuso (${dove}): ${s}`);
      out += `<code>${escapeTesto(s.slice(i + 1, j))}</code>`;
      i = j + 1;
    } else if (s.startsWith('**', i)) {
      const j = s.indexOf('**', i + 2);
      if (j < 0) throw new Error(`grassetto non chiuso (${dove}): ${s}`);
      out += `<strong>${inline(s.slice(i + 2, j), dove)}</strong>`;
      i = j + 2;
    } else if (s[i] === '[') {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)/.exec(s.slice(i));
      if (!m) throw new Error(`parentesi quadra senza link (${dove}): ${s}`);
      if (!/^(https:\/\/|mailto:)/.test(m[2])) throw new Error(`link non https/mailto (${dove}): ${m[2]}`);
      out += `<a href="${m[2].replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">${inline(m[1], dove)}</a>`;
      i += m[0].length;
    } else if (s[i] === '*' && i > 0 && /\s/.test(s[i - 1]) && /\s/.test(s[i + 1] ?? '')) {
      // A lone "*" between spaces is no emphasis in CommonMark (it flanks
      // nothing): the disclaimer writes "(price - average) * quantity".
      out += '*';
      i += 1;
    } else if (s[i] === '*' || (s[i] === '_' && (i === 0 || /\s/.test(s[i - 1])) && /\S/.test(s[i + 1] ?? ''))) {
      throw new Error(`enfasi non supportata (${dove}): ${s}`);
    } else if (s[i] === '<') {
      // CommonMark autolink: <https://...> or <mailto:...>, shown as written.
      const m = /^<([a-z][a-z0-9+.-]*:[^\s<>]+)>/i.exec(s.slice(i));
      if (!m) throw new Error(`HTML grezzo nel testo (${dove}): ${s}`);
      if (!/^(https:\/\/|mailto:)/.test(m[1])) throw new Error(`link non https/mailto (${dove}): ${m[1]}`);
      out += `<a href="${m[1].replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">${escapeTesto(m[1])}</a>`;
      i += m[0].length;
    } else {
      out += escapeTesto(s[i]);
      i += 1;
    }
  }
  return out;
}

/** Plain text of a heading for the table of contents (no markup allowed). */
function testoTitolo(s, dove) {
  if (/[`*[\]<_]/.test(s)) throw new Error(`markup in un titolo (${dove}): ${s}`);
  return s;
}

// The H1 becomes the attribute titolo="..." of <Documento>, written with
// JSON.stringify: a double quote or a backslash would break it (S398,
// code-reviewer), so the H1 refuses both. Section headings may keep them
// (terms 3.5 "Know Your Customer"): they become element text, escaped, and
// toc labels inside a JS string literal, where JSON.stringify is correct.
function testoTitoloH1(s) {
  const t = testoTitolo(s, 'H1');
  if (/["\\]/.test(t)) throw new Error(`virgolette doppie o barra rovescia nel titolo (H1): ${t}`);
  return t;
}

const RIGA_TABELLA = /^\|(.*)\|$/;
const SEPARATORE = /^\|(\s*:?-{3,}:?\s*\|)+$/;

function celle(riga) {
  return RIGA_TABELLA.exec(riga)[1].split('|').map((c) => c.trim());
}

/** Paragraph lines from `righe[n]` on, up to a blank line. A list starting
 *  with "- " or "1. " may interrupt it (CommonMark); `soloParagrafi` forbids
 *  that (inside a blockquote only paragraphs exist). Returns [testo, n]. */
function paragrafo(righe, n, soloParagrafi) {
  const pezzi = [];
  const inizio = n;
  while (n < righe.length && righe[n].trim() !== '') {
    const x = righe[n];
    // Constructs this renderer does not support would pass as literal text
    // (S398, legal oracle): a fenced code block, and a setext heading (a line
    // of "=" or "-" under a paragraph line). They throw instead.
    if (/^\s*(```|~~~)/.test(x)) throw new Error(`blocco di codice non supportato (riga ${n + 1}): ${x}`);
    if (pezzi.length > 0 && /^\s*(=+|-+)\s*$/.test(x)) throw new Error(`titolo setext non supportato (riga ${n + 1}): ${x}`);
    // As in CommonMark: a list starting with "- " or "1. " may follow a
    // paragraph without a blank line ("... se l'utente:\n1. ..."). The
    // paragraph ends there; the list is the next block.
    if (!soloParagrafi && pezzi.length > 0 && /^(- |1\. )/.test(x)) break;
    if (/^(#|\||- |\d+\. |>|\s)/.test(x)) {
      throw new Error(soloParagrafi
        ? `citazione: ammessi solo paragrafi (riga ${n + 1}): ${x}`
        : `paragrafo attaccato ad altro blocco (riga ${n + 1}): ${x}`);
    }
    pezzi.push(x.trim());
    n += 1;
  }
  return [inline(pezzi.join(' '), `riga ${inizio + 1}`), n];
}

/** Parse the document markdown into { titolo, meta: [[k, v]], blocchi }. */
export function analizza(md) {
  const righe = md.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  let n = 0;
  const salta = () => { while (n < righe.length && righe[n].trim() === '') n += 1; };
  salta();
  const h1 = /^# (\S.*)$/.exec(righe[n] ?? '');
  if (!h1) throw new Error(`manca il titolo "# ..." in testa (riga ${n + 1})`);
  const titolo = testoTitoloH1(h1[1].trim());
  n += 1;
  salta();
  const meta = [];
  while (n < righe.length && righe[n].trim() !== '') {
    const m = /^\*\*([^*]+)\*\*: (\S.*)$/.exec(righe[n]);
    if (!m) throw new Error(`testata: riga che non e' "**Chiave**: valore" (riga ${n + 1}): ${righe[n]}`);
    meta.push([m[1], m[2].trimEnd()]);
    n += 1;
  }
  if (meta.length < 2) throw new Error('testata: servono almeno versione e data');
  salta();
  if (righe[n] !== '---') throw new Error(`dopo la testata serve "---" (riga ${n + 1})`);
  n += 1;

  const blocchi = [];
  let ultimoH2 = 0;
  let ultimoH3 = 0;
  let ultimoH4 = 0;
  while (n < righe.length) {
    const r = righe[n];
    const dove = `riga ${n + 1}`;
    if (r.trim() === '') { n += 1; continue; }
    let m;
    if (/^\s+\S/.test(r)) throw new Error(`riga rientrata fuori da un elenco (${dove}): ${r}`);
    if (/^>/.test(r)) {
      // A blockquote of paragraphs only ("> text", ">" between paragraphs),
      // closed by a blank line. The disclaimer opens with one (S398).
      const dentro = [];
      while (n < righe.length && /^>/.test(righe[n])) {
        if (!/^>( |$)/.test(righe[n])) throw new Error(`citazione: dopo ">" serve uno spazio (riga ${n + 1})`);
        dentro.push(righe[n].slice(2));
        n += 1;
      }
      if (n < righe.length && righe[n].trim() !== '') throw new Error(`citazione seguita da testo senza riga vuota (riga ${n + 1}): ${righe[n]}`);
      const paragrafi = [];
      let k = 0;
      while (k < dentro.length) {
        if (dentro[k].trim() === '') { k += 1; continue; }
        const [testo, dopo] = paragrafo(dentro, k, true);
        paragrafi.push(testo);
        k = dopo;
      }
      if (paragrafi.length === 0) throw new Error(`citazione vuota (${dove})`);
      blocchi.push({ tipo: 'citazione', paragrafi });
      continue;
    }
    if (/^(---+|\*\*\*+|___+)\s*$/.test(r)) {
      // Only "---" right after a blockquote: it closes the notice that opens
      // the disclaimer. Anywhere else a second rule is unknown.
      if (r !== '---' || blocchi.at(-1)?.tipo !== 'citazione') throw new Error(`secondo separatore non supportato (${dove})`);
      blocchi.push({ tipo: 'hr' });
      n += 1;
      continue;
    }
    if (/^#{5,} /.test(r) || /^# /.test(r)) throw new Error(`livello di titolo non supportato (${dove}): ${r}`);
    if ((m = /^## (\d+)\. (\S.*)$/.exec(r))) {
      const k = Number(m[1]);
      if (k !== ultimoH2 + 1) throw new Error(`sezione ${k} fuori sequenza dopo ${ultimoH2} (${dove})`);
      ultimoH2 = k;
      ultimoH3 = 0;
      ultimoH4 = 0;
      blocchi.push({ tipo: 'h2', id: `s${k}`, testo: testoTitolo(`${k}. ${m[2].trim()}`, dove) });
      n += 1;
      continue;
    }
    if (/^## /.test(r)) throw new Error(`sezione senza numero (${dove}): ${r}`);
    if ((m = /^### (\d+)\.(\d+) (\S.*)$/.exec(r))) {
      const a = Number(m[1]);
      const b = Number(m[2]);
      if (a !== ultimoH2 || b !== ultimoH3 + 1) throw new Error(`sottosezione ${a}.${b} fuori sequenza (${dove})`);
      ultimoH3 = b;
      ultimoH4 = 0;
      blocchi.push({ tipo: 'h3', id: `s${a}-${b}`, testo: testoTitolo(`${a}.${b} ${m[3].trim()}`, dove) });
      n += 1;
      continue;
    }
    if (/^### /.test(r)) throw new Error(`sottosezione senza numero (${dove}): ${r}`);
    if ((m = /^#### (\d+)\.(\d+)\.(\d+) (\S.*)$/.exec(r))) {
      const [a, b, c] = [Number(m[1]), Number(m[2]), Number(m[3])];
      if (a !== ultimoH2 || b !== ultimoH3 || b === 0 || c !== ultimoH4 + 1) throw new Error(`paragrafo ${a}.${b}.${c} fuori sequenza (${dove})`);
      ultimoH4 = c;
      blocchi.push({ tipo: 'h4', id: `s${a}-${b}-${c}`, testo: testoTitolo(`${a}.${b}.${c} ${m[4].trim()}`, dove) });
      n += 1;
      continue;
    }
    if (/^#### /.test(r)) throw new Error(`paragrafo senza numero (${dove}): ${r}`);
    if (RIGA_TABELLA.test(r)) {
      const testa = celle(r);
      if (!SEPARATORE.test(righe[n + 1] ?? '')) throw new Error(`tabella senza separatore (${dove})`);
      if (celle(righe[n + 1]).length !== testa.length) throw new Error(`separatore di tabella irregolare (${dove})`);
      n += 2;
      const corpo = [];
      while (n < righe.length && RIGA_TABELLA.test(righe[n])) {
        const c = celle(righe[n]);
        if (c.length !== testa.length) throw new Error(`riga di tabella irregolare (riga ${n + 1}): ${c.length} celle, attese ${testa.length}`);
        corpo.push(c.map((x) => inline(x, `riga ${n + 1}`)));
        n += 1;
      }
      if (n < righe.length && righe[n].trim() !== '') throw new Error(`tabella seguita da testo senza riga vuota (riga ${n + 1})`);
      blocchi.push({ tipo: 'tabella', testa: testa.map((x) => inline(x, dove)), corpo });
      continue;
    }
    const voce = /^(- |(\d+)\. )(.*)$/;
    if ((m = voce.exec(r))) {
      const ordinato = m[2] !== undefined;
      const voci = [];
      let atteso = 1;
      while (n < righe.length && (m = voce.exec(righe[n])) && (m[2] !== undefined) === ordinato) {
        if (ordinato && Number(m[2]) !== atteso) throw new Error(`elenco numerato fuori sequenza (riga ${n + 1}): ${m[2]}, atteso ${atteso}`);
        atteso += 1;
        const pezzi = [m[3].trim()];
        const inizio = n;
        n += 1;
        while (n < righe.length && /^\s+\S/.test(righe[n])) {
          if (/^\s+(- |\d+\. |\* )/.test(righe[n])) throw new Error(`elenco annidato non supportato (riga ${n + 1})`);
          pezzi.push(righe[n].trim());
          n += 1;
        }
        voci.push(inline(pezzi.join(' '), `riga ${inizio + 1}`));
      }
      if (n < righe.length && righe[n].trim() !== '' && !voce.test(righe[n])) {
        throw new Error(`testo attaccato a un elenco senza riga vuota (riga ${n + 1}): ${righe[n]}`);
      }
      if (n < righe.length && voce.test(righe[n])) throw new Error(`elenco puntato e numerato attaccati (riga ${n + 1})`);
      blocchi.push({ tipo: ordinato ? 'ol' : 'ul', voci });
      continue;
    }
    if (/^(\* |\+ )/.test(r)) throw new Error(`marcatore di elenco non supportato (${dove}): ${r}`);
    const [testo, dopo] = paragrafo(righe, n, false);
    n = dopo;
    blocchi.push({ tipo: 'p', testo });
  }
  if (ultimoH2 === 0) throw new Error('nessuna sezione "## 1. ..."');
  return { titolo, meta, blocchi };
}

/** Version and date as the page header declares them (first two meta rows). */
export function testataPrivacy(md) {
  const { meta } = analizza(md);
  return { versione: meta[0][1], aggiornato: meta[1][1] };
}
export const testataLegale = testataPrivacy;

/** The comment heading each generated page. The privacy one is the S343/S398
 *  text, unchanged: the six privacy pages stay byte-identical. */
function commento(id, lingua) {
  if (id === 'privacy') {
    return [
      `// CONTENT = the privacy policy bundled in the app, assets/legal/${lingua}/privacy_policy.md:`,
      '// same version, same text, rendered block by block (S343). Never edit the',
      '// policy here: change the .md (and its version), then re-render this page',
      '// from it. Until v1.0.3 this page carried a different, shorter text under',
      '// the same version number as the app document - that was the defect.',
    ];
  }
  return [
    `// CONTENT = the ${id === 'terms' ? 'terms of service' : 'financial disclaimer'} bundled in the app,`,
    `// assets/legal/${lingua}/${sorgenteDi(id)}: same version, same text, rendered`,
    '// block by block (S398, as the privacy page). Never edit the text here:',
    '// change the .md (and its version), then re-render this page from it.',
    '// Until S398 this page carried a different, shorter site text marked',
    '// "Versione 1.0, 28 aprile 2026" next to the app document - that was the defect.',
  ];
}

/** The whole <id>.astro for `lingua`, from the document markdown. */
export function paginaLegale(md, lingua, id) {
  if (!LINGUE_LEGALI.includes(lingua)) throw new Error(`lingua sconosciuta: ${lingua}`);
  sorgenteDi(id);
  const { titolo, meta, blocchi } = analizza(md);
  const su = lingua === 'it' ? '..' : '../..';
  const toc = blocchi.filter((b) => b.tipo === 'h2').map((b) => `  { id: ${JSON.stringify(b.id)}, label: ${JSON.stringify(b.testo)} },`);
  const corpo = [];
  corpo.push(`  <p class="meta">${meta.map(([k, v]) => `<strong>${inline(k, 'testata')}</strong>: ${inline(v, 'testata')}`).join('<br />')}</p>`);
  corpo.push('  <hr />');
  for (const b of blocchi) {
    if (b.tipo === 'h2' || b.tipo === 'h3' || b.tipo === 'h4') corpo.push(`  <${b.tipo} id="${b.id}">${escapeTesto(b.testo)}</${b.tipo}>`);
    else if (b.tipo === 'p') corpo.push(`  <p>${b.testo}</p>`);
    else if (b.tipo === 'hr') corpo.push('  <hr />');
    else if (b.tipo === 'citazione') {
      corpo.push('  <blockquote>');
      for (const p of b.paragrafi) corpo.push(`    <p>${p}</p>`);
      corpo.push('  </blockquote>');
    }
    else if (b.tipo === 'ul' || b.tipo === 'ol') {
      corpo.push(`  <${b.tipo}>`);
      for (const v of b.voci) corpo.push(`    <li>${v}</li>`);
      corpo.push(`  </${b.tipo}>`);
    } else {
      corpo.push('  <div class="table-wrap">', '    <table>', '      <thead>');
      corpo.push(`        <tr>${b.testa.map((c) => `<th>${c}</th>`).join('')}</tr>`);
      corpo.push('      </thead>', '      <tbody>');
      for (const r of b.corpo) corpo.push(`        <tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`);
      corpo.push('      </tbody>', '    </table>', '  </div>');
    }
  }
  return [
    '---',
    `import Documento from '${su}/components/giorno/servizio/Documento.astro';`,
    '',
    ...commento(id, lingua),
    '// GENERATED by strumenti/privacy-da-md.mjs (renderer src/lib/privacy-da-md.mjs);',
    '// integrations/privacy-pagine.test.mjs fails if this file differs from it.',
    'const toc = [',
    ...toc,
    '];',
    '---',
    `<Documento lingua="${lingua}" rotta="${id}" titolo=${JSON.stringify(titolo)} indice={toc}>`,
    ...corpo,
    '</Documento>',
    '',
  ].join('\n');
}

/** The whole privacy.astro for `lingua`, from the policy markdown. */
export function paginaPrivacy(md, lingua) {
  return paginaLegale(md, lingua, 'privacy');
}
