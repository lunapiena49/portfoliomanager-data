// ORACOLO DI TESTO DELLE PAGINE LEGALI, INDIPENDENTE DAL RENDERER (S398,
// rilievo del code-reviewer). Il test byte per byte di privacy-pagine.test.mjs
// confronta la pagina con l'uscita di src/lib/privacy-da-md.mjs: se il renderer
// perde una frase, pagina e resa la perdono insieme e il test resta verde.
// Qui le PAROLE del .md dell'app (markup tolto con regole proprie, senza usare
// il renderer) si confrontano con le parole della pagina .astro (tag tolti,
// entita' decodificate). Una parola persa, aggiunta o cambiata e' una differenza.
// ASCII-only: questo file e' codice.

const ENTITA = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decodifica(s) {
  return s.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (tutto, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
    const v = ENTITA[e.toLowerCase()];
    if (v === undefined) throw new Error(`legali-parole: entita' sconosciuta ${tutto}`);
    return v;
  });
}

/** Le parole di un testo gia' senza markup: punteggiatura staccata riattaccata,
 *  asterischi e barre (enfasi, tabelle) non sono parole. */
function parole(s) {
  return s
    .replace(/[*|]/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s+([.,;:])/g, '$1')
    .split(/\s+/)
    .filter((w) => w && !/^[-:]{3,}$/.test(w));
}

/** { titolo, parole } del .md dell'app: H1 a parte, il resto senza markup. */
export function paroleMd(md) {
  const righe = String(md).replace(/\r\n/g, '\n').split('\n');
  const h1 = righe.findIndex((r) => /^# /.test(r));
  if (h1 < 0) throw new Error('legali-parole: .md senza H1');
  const titolo = righe[h1].slice(2).trim();
  // Segni di elenco: "- " e "N. " a inizio riga (le sorgenti li usano anche
  // subito dopo un paragrafo). "+ " no: in fr/privacy riga 111 e' un "+" del
  // testo andato a capo, e il sito e build_legal_html.ps1 lo tengono.
  const ELENCO = /^\s*(?:-|\d+\.)\s+(?=\S)/;
  const corpo = righe.slice(h1 + 1).map((r) => {
    if (/^\s*\|?\s*:?-{3,}/.test(r) && /^[\s|:-]+$/.test(r)) return ''; // separatore di tabella
    if (/^\s*-{3,}\s*$/.test(r)) return ''; // linea orizzontale
    if (/^#{2,6}\s/.test(r)) return r.replace(/^#{2,6}\s+/, ''); // titolo: il numero e' testo
    let x = r.replace(/^\s*>\s?/, '');
    x = x.replace(ELENCO, '');
    x = x.replace(/!?\[([^\]]*)\]\(([^)\s]+)\)/g, '$1');
    x = x.replace(/<((?:https?:|mailto:)[^>\s]+)>/g, (m, u) => u.replace(/^mailto:/, ''));
    x = x.replace(/`/g, '');
    x = x.replace(/\*\*|__/g, '');
    return x;
  });
  return { titolo, parole: parole(corpo.join('\n')) };
}

/** { titolo, parole } della pagina .astro: attributo titolo, corpo dentro
 *  <Documento ...> ... </Documento> senza tag. */
export function parolePagina(astro) {
  const s = String(astro).replace(/\r\n/g, '\n');
  const apre = /<Documento\b[^>]*\btitolo="([^"]*)"[^>]*>/.exec(s);
  const chiude = s.lastIndexOf('</Documento>');
  if (!apre || chiude < apre.index) throw new Error('legali-parole: pagina senza <Documento titolo="..."> ... </Documento>');
  // I tag in riga (grassetto, codice, link) non separano le parole; quelli di
  // blocco si'.
  const corpo = s.slice(apre.index + apre[0].length, chiude)
    .replace(/<\/?(?:strong|em|code|a|b|i)\b[^>]*>/g, '')
    .replace(/<[^>]+>/g, ' ');
  return { titolo: decodifica(apre[1]), parole: parole(decodifica(corpo)) };
}

/** Le differenze fra due elenchi di parole (diff per LCS, ogni parola persa o
 *  aggiunta conta), al piu' `max` riportate con il contesto. */
export function differenze(a, b, max = 5) {
  const n = a.length;
  const m = b.length;
  // LCS a righe compatte: O(n*m) in tempo, O(m) per riga in Uint16Array.
  const tab = [];
  for (let i = 0; i <= n; i++) tab.push(new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    const r = tab[i];
    const giu = tab[i + 1];
    for (let j = m - 1; j >= 0; j--) r[j] = a[i] === b[j] ? giu[j + 1] + 1 : Math.max(giu[j], r[j + 1]);
  }
  const out = [];
  let conta = 0;
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) { i++; j++; continue; }
    conta++;
    const ctx = a.slice(Math.max(0, i - 4), i).join(' ');
    if (j < m && (i >= n || tab[i][j + 1] >= tab[i + 1][j])) {
      if (out.length < max) out.push(`in piu' nella pagina "${b[j]}" dopo "${ctx}"`);
      j++;
    } else {
      if (out.length < max) out.push(`manca nella pagina "${a[i]}" dopo "${ctx}"`);
      i++;
    }
  }
  return { conta, esempi: out };
}
