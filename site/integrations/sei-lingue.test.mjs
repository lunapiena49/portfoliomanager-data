// I PRESIDI DELLE SEI LINGUE SUL TELAIO UNICO (S384, corsia B6).
//
// Con questa corsia le cinque lingue non italiane sono passate al telaio di
// S384 e il telaio vecchio (Layout.astro, global.css, Tailwind, i dizionari
// `Translations`, ventiquattro componenti) e' uscito. I 34 test che
// presidiavano il cablaggio di Tailwind (tailwind-wiring, tailwind-output) e i
// 5 che descrivevano la convivenza dei due telai sono SOSTITUITI da questi,
// che presidiano le superfici nuove:
//  - la matrice sei lingue x tredici pagine, tutte sul telaio nuovo;
//  - l'assenza del telaio vecchio e delle sue dipendenze;
//  - i prezzi: stessi numeri dell'italiano, forma nativa di ogni lingua;
//  - le chiavi `suPlay`: mostrate da un componente, e solo dietro `pmSuPlay`;
//  - i due punti dopo un'etichetta, nella tipografia della lingua;
//  - le sei lingue dichiarate uguali in ogni elenco del sito.
// Girano con `npm test`, prima della build. I contratti sul sito costruito
// stanno in integrations/costruito/sei-lingue.test.mjs.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { VARIANTE, difettiPrezzi, formatoNativo, prezziIn } from './prezzi-nativi.mjs';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leggi = (rel) => readFileSync(path.join(SITO, rel), 'utf8');
const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];

/** Ogni file sotto una cartella del sito, con percorso relativo al sito. */
function file(cartella) {
  return readdirSync(path.join(SITO, cartella), { recursive: true, withFileTypes: true })
    .filter((f) => f.isFile())
    .map((f) => path.relative(SITO, path.join(f.parentPath ?? f.path, f.name)).replace(/\\/g, '/'));
}

async function carica(lingua) {
  return (await import(new URL(`../src/i18n/testi/${lingua}.ts`, import.meta.url).href)).default;
}
const copia = (t) => JSON.parse(JSON.stringify(t));

/* -------------------------------------------------------------------------- */
/* LA MATRICE DELLE PAGINE                                                    */
/* -------------------------------------------------------------------------- */

/** Rotta -> il componente del telaio nuovo che la pagina deve montare. */
export const RIGHE = {
  index: ['Home', 'components/giorno/Home.astro'],
  finance: ['PaginaFinance', 'components/giorno/finance/PaginaFinance.astro'],
  games: ['Games', 'components/giorno/games/Games.astro'],
  about: ['Casa', 'components/giorno/servizio/Casa.astro'],
  press: ['Stampa', 'components/giorno/servizio/Stampa.astro'],
  pricing: ['Prezzi', 'components/giorno/servizio/Prezzi.astro'],
  faq: ['Domande', 'components/giorno/servizio/Domande.astro'],
  contact: ['Contatti', 'components/giorno/servizio/Contatti.astro'],
  'blog/index': ['Notizie', 'components/giorno/servizio/Notizie.astro'],
};
export const LEGALI = ['privacy', 'terms', 'disclaimer', 'dmca'];
const DOCUMENTO = 'components/giorno/servizio/Documento.astro';

const percorso = (lingua, rotta) => `src/pages/${lingua === 'it' ? '' : `${lingua}/`}${rotta}.astro`;

/** I difetti di una pagina rispetto al telaio nuovo: `[]` se regge. */
export function difettiPagina(lingua, rotta, sorgente) {
  const nome = `${lingua}/${rotta}`;
  if (typeof sorgente !== 'string') return [`${nome}: la pagina manca`];
  const difetti = [];
  const importati = [...sorgente.matchAll(/^import\s+(?:type\s+)?[^;]*?from\s+'([^']+)';/gm)].map((m) => m[1]);
  const legale = LEGALI.includes(rotta);
  const [componente, modulo] = legale ? ['Documento', DOCUMENTO] : RIGHE[rotta] ?? [];
  if (!componente) return [`${nome}: rotta non prevista dalla matrice`];
  if (importati.length !== 1 || !importati[0].endsWith(modulo)) {
    difetti.push(`${nome}: importa [${importati.join(', ')}], atteso solo ${modulo}`);
  }
  if (/layouts\/|i18n\/|LegalLayout|<Layout\b|global\.css/.test(sorgente.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, ''))) {
    difetti.push(`${nome}: resti del telaio vecchio`);
  }
  const apre = legale
    ? new RegExp(`<Documento lingua="${lingua}" rotta="${rotta}" titolo=("[^"]+"|\\{[^}]+\\}) indice=\\{toc\\}>`)
    : new RegExp(`<${componente} lingua="${lingua}" />`);
  if (!apre.test(sorgente)) difetti.push(`${nome}: non monta ${componente} con la lingua "${lingua}"${legale ? ` e la rotta "${rotta}"` : ''}`);
  const lingueDichiarate = [...sorgente.matchAll(/\blingua="([a-z]{2})"/g)].map((m) => m[1]);
  if (lingueDichiarate.some((l) => l !== lingua)) difetti.push(`${nome}: dichiara un'altra lingua (${lingueDichiarate.join(', ')})`);
  return difetti;
}

test('pagine: sei lingue per tredici pagine, tutte sul telaio nuovo e ognuna con la sua lingua', () => {
  let viste = 0;
  for (const lingua of LINGUE) {
    for (const rotta of [...Object.keys(RIGHE), ...LEGALI]) {
      const p = percorso(lingua, rotta);
      assert.deepEqual(difettiPagina(lingua, rotta, existsSync(path.join(SITO, p)) ? leggi(p) : undefined), [], p);
      viste += 1;
    }
  }
  assert.equal(viste, 78);
});

test('pagine: sotto src/pages non c\'e\' nulla fuori dalla matrice (nessuna pagina orfana del telaio vecchio)', () => {
  const attese = new Set(['src/pages/404.astro', 'src/pages/blog/[...articolo].astro']);
  for (const lingua of LINGUE) for (const rotta of [...Object.keys(RIGHE), ...LEGALI]) attese.add(percorso(lingua, rotta));
  const trovate = file('src/pages').filter((f) => f.endsWith('.astro'));
  assert.deepEqual(trovate.filter((f) => !attese.has(f)), [], 'pagine non previste');
  assert.equal(trovate.length, attese.size);
  for (const lingua of LINGUE) assert.ok(!trovate.some((f) => /(^|\/)home\.astro$/.test(f)), 'una pagina /home: ora e\' un rimando');
});

test('mutante: lingua sbagliata, componente vecchio, pagina mancante e legale con la rotta sbagliata vengono fermati', () => {
  const buona = "---\nimport Home from '../../components/giorno/Home.astro';\n---\n<Home lingua=\"en\" />\n";
  assert.deepEqual(difettiPagina('en', 'index', buona), []);
  assert.equal(difettiPagina('en', 'index', buona.replace('lingua="en"', 'lingua="it"')).length, 2);
  const vecchia = "---\nimport en from '../../i18n/en';\nimport LandingPage from '../../components/LandingPage.astro';\n---\n<LandingPage t={en} lang=\"en\" />\n";
  assert.ok(difettiPagina('en', 'finance', vecchia).length >= 3);
  assert.deepEqual(difettiPagina('pt', 'games', undefined), ['pt/games: la pagina manca']);
  const legale = "---\nimport Documento from '../../components/giorno/servizio/Documento.astro';\nconst toc = [];\n---\n<Documento lingua=\"de\" rotta=\"terms\" titolo=\"Nutzungsbedingungen\" indice={toc}>\n</Documento>\n";
  assert.deepEqual(difettiPagina('de', 'terms', legale), []);
  assert.equal(difettiPagina('de', 'privacy', legale).length, 1);
  assert.equal(difettiPagina('de', 'terms', legale.replace('<Documento lingua="de"', '<LegalLayout t={de} lang="de"')).length, 2);
  assert.deepEqual(difettiPagina('de', 'home', buona), ['de/home: rotta non prevista dalla matrice']);
});

/* -------------------------------------------------------------------------- */
/* IL TELAIO VECCHIO NON C'E' PIU'                                            */
/* -------------------------------------------------------------------------- */

const VIETATI = [
  /^src\/layouts\/(Layout|LegalLayout)\.astro$/,
  /^src\/components\/[^/]+\.astro$/, // i componenti vivono in components/giorno/
  /^src\/styles\/global\.css$/,
  /^src\/i18n\/(index|it|en|es|fr|de|pt)\.ts$/,
  /^src\/assets\/scena\//,
  /^src\/pages\/blog\/\[\.\.\.slug\]\.astro$/,
  /^public\/assets\/tema\.js$/,
  /^tailwind\.config\.[cm]?js$/,
  /^postcss\.config\.[cm]?js$/,
  /^integrations\/tailwind-/,
];
const PACCHETTI_VIETATI = /^(tailwindcss|@tailwindcss\/.+|autoprefixer|postcss-[\w-]+)$/;

/** Cio' che resta del telaio vecchio fra file e dipendenze: `[]` se nulla. */
export function restiDelTelaioVecchio(elenco, pacchetto, lock) {
  const resti = [];
  for (const f of elenco) if (VIETATI.some((r) => r.test(f))) resti.push(`file: ${f}`);
  for (const campo of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const nome of Object.keys(pacchetto?.[campo] ?? {})) {
      if (PACCHETTI_VIETATI.test(nome)) resti.push(`package.json ${campo}: ${nome}`);
    }
  }
  for (const voce of Object.keys(lock?.packages ?? {})) {
    const nome = voce.split('node_modules/').pop();
    if (PACCHETTI_VIETATI.test(nome)) resti.push(`package-lock.json: ${voce}`);
  }
  return resti;
}

test('telaio vecchio: nessun file, nessuna dipendenza, nessuna voce della lock', () => {
  const elenco = [...file('src'), ...file('public'), ...file('integrations'), ...readdirSync(SITO).filter((f) => /\.(m?js|cjs|json)$/.test(f))];
  assert.ok(elenco.length >= 200, `file letti: ${elenco.length}`);
  const lock = JSON.parse(leggi('package-lock.json'));
  assert.ok(Object.keys(lock.packages).length >= 300, 'lock troppo corta per essere quella vera');
  assert.deepEqual(restiDelTelaioVecchio(elenco, JSON.parse(leggi('package.json')), lock), []);
});

test('telaio vecchio: nessun sorgente lo cita, e i fogli di stile non hanno direttive di Tailwind', () => {
  const sorgenti = file('src').filter((f) => /\.(astro|ts|mjs|css)$/.test(f));
  for (const f of [...sorgenti, 'astro.config.mjs']) {
    const vivo = leggi(f).replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, '');
    assert.ok(!/layouts\/(Layout|LegalLayout)\.astro|styles\/global\.css|i18n\/(index|it|en|es|fr|de|pt)'|@tailwindcss|from 'tailwindcss/.test(vivo), `${f}: cita il telaio vecchio`);
  }
  const fogli = file('src/styles');
  assert.deepEqual(fogli.sort(), ['src/styles/finance.css', 'src/styles/games.css', 'src/styles/giorno.css', 'src/styles/servizio.css']);
  for (const f of fogli) {
    const css = leggi(f).replace(/\/\*[\s\S]*?\*\//g, '');
    assert.ok(!/@tailwind\b|@apply\b|@config\b|@import\s+["']tailwindcss|--tw-/.test(css), `${f}: direttiva di Tailwind`);
    assert.ok(!/@import\s+(url\()?["']?https?:|url\(["']?https?:|url\(["']?\/\//.test(css), `${f}: carica qualcosa da un altro host`);
  }
});

test('mutante: un file del telaio vecchio, una dipendenza o una voce della lock che tornano vengono fermati', () => {
  assert.deepEqual(restiDelTelaioVecchio(['src/layouts/Pagina.astro', 'src/components/giorno/Home.astro'], { dependencies: { astro: '^7' } }, { packages: { 'node_modules/astro': {} } }), []);
  assert.equal(restiDelTelaioVecchio(['src/layouts/Layout.astro'], {}, {}).length, 1);
  assert.equal(restiDelTelaioVecchio(['src/components/Modal.astro', 'src/components/NewsletterBand.astro', 'src/components/LandingPage.astro'], {}, {}).length, 3);
  assert.equal(restiDelTelaioVecchio(['src/styles/global.css', 'tailwind.config.mjs', 'src/i18n/de.ts', 'src/pages/blog/[...slug].astro'], {}, {}).length, 4);
  assert.equal(restiDelTelaioVecchio([], { dependencies: { tailwindcss: '^4' }, devDependencies: { '@tailwindcss/vite': '^4' } }, {}).length, 2);
  assert.equal(restiDelTelaioVecchio([], {}, { packages: { 'node_modules/@tailwindcss/oxide': {}, 'node_modules/a/node_modules/tailwindcss': {} } }).length, 2);
  // confine: i dizionari nuovi stanno in i18n/testi/ e non sono il telaio vecchio
  assert.deepEqual(restiDelTelaioVecchio(['src/i18n/testi/de.ts', 'src/i18n/lingue.ts', 'src/i18n/testi.ts'], {}, {}), []);
});

/* -------------------------------------------------------------------------- */
/* I PREZZI: STESSI NUMERI, FORMA NATIVA                                      */
/* -------------------------------------------------------------------------- */

test('prezzi: in ogni lingua gli importi sono quelli dell\'italiano, scritti come li scrive la lingua', async () => {
  const it = await carica('it');
  const quanti = JSON.stringify(it).match(/\d,\d{2}/g)?.length ?? 0;
  assert.ok(quanti >= 9, `prezzi nell'italiano: ${quanti}`);
  for (const lingua of LINGUE) assert.deepEqual(difettiPrezzi(lingua, await carica(lingua), it), [], lingua);
});

test('prezzi: il formato nativo viene da Intl, e solo l\'inglese mette il simbolo davanti', () => {
  assert.deepEqual(Object.keys(VARIANTE).sort(), [...LINGUE].sort());
  const forma = (lingua) => formatoNativo(lingua, 12.5).replace(/\d/g, '0');
  assert.equal(forma('en'), '€00.00');
  for (const lingua of ['it', 'es', 'fr', 'de', 'pt']) assert.equal(forma(lingua), '00,00\u00a0€', lingua);
  assert.throws(() => formatoNativo('xx', 1), /variante/);
  assert.throws(() => formatoNativo('it', Number.NaN), /numerico/);
});

test('mutante: la forma italiana imposta all\'inglese (il difetto di prima) viene fermata', async () => {
  const it = await carica('it');
  const en = copia(await carica('en'));
  const giusto = en.prezzi.piani[0].prezzo;
  const importo = prezziIn(giusto)[0];
  // "cifra col punto, spazio non separabile, simbolo": cio' che il presidio vecchio pretendeva
  en.prezzi.piani[0].prezzo = giusto.replace(importo.grezzo, `${importo.importo.toFixed(2)}\u00a0€`);
  const d = difettiPrezzi('en', en, it);
  assert.equal(d.length, 1);
  assert.match(d[0], /^prezzi\.piani\[0\]\.prezzo: .* non e' il formato di en/);
});

test('mutante: punto decimale in tedesco, spazio separabile in francese, simbolo davanti in portoghese', async () => {
  const it = await carica('it');
  for (const [lingua, sfigura] of [
    ['de', (g) => g.replace(',', '.')],
    ['fr', (g) => g.replace('\u00a0', ' ')],
    ['pt', (g) => `€\u00a0${g.replace(/\u00a0€$/, '')}`],
    ['es', (g) => g.replace('\u00a0€', '\u00a0euros')],
    ['it', (g) => g.replace('\u00a0', '')],
  ]) {
    const t = copia(await carica(lingua));
    const cella = t.prezzi.piani[1];
    const grezzo = prezziIn(cella.prezzo)[0].grezzo;
    cella.prezzo = cella.prezzo.replace(grezzo, sfigura(grezzo));
    const d = difettiPrezzi(lingua, t, it);
    assert.equal(d.length, 1, `${lingua}: ${JSON.stringify(d)}`);
    assert.match(d[0], new RegExp(`non e' il formato di ${lingua}`));
  }
});

test('mutante: un importo cambiato, tolto o aggiunto in traduzione viene fermato anche se la forma e\' giusta', async () => {
  const it = await carica('it');
  const pt = copia(await carica('pt'));
  const cella = pt.prezzi.piani[0];
  const p = prezziIn(cella.prezzo)[0];
  cella.prezzo = cella.prezzo.replace(p.grezzo, formatoNativo('pt', p.importo + 1));
  let d = difettiPrezzi('pt', pt, it);
  assert.equal(d.length, 1);
  assert.match(d[0], /^prezzi\.piani\[0\]\.prezzo: importi/);

  const de = copia(await carica('de'));
  de.finance.prezzi.testo = de.finance.prezzi.testo.replace(prezziIn(de.finance.prezzi.testo)[0].grezzo, 'wenig');
  d = difettiPrezzi('de', de, it);
  assert.equal(d.length, 1);
  assert.match(d[0], /^finance\.prezzi\.testo: importi/);

  const es = copia(await carica('es'));
  es.casa.sommario += ` ${formatoNativo('es', 0.99)}`;
  assert.equal(difettiPrezzi('es', es, it).length, 1);
});

test('confine ed errore: l\'inglese nel suo formato passa; una sorgente senza prezzi fa cadere il presidio', async () => {
  const it = await carica('it');
  assert.deepEqual(difettiPrezzi('en', await carica('en'), it), []);
  assert.deepEqual(prezziIn('nessun importo, solo 20 euro al mese e il 25%'), []);
  assert.equal(prezziIn(`da ${formatoNativo('it', 4.5)} a ${formatoNativo('en', 49.5)}`).length, 2);
  assert.throws(() => difettiPrezzi('en', {}, { home: { titolo: 'niente' } }), /nessun prezzo/);
  assert.throws(() => prezziIn(42), /stringa/);
  // una chiave coi prezzi sparita in traduzione non passa in silenzio
  const fr = copia(await carica('fr'));
  delete fr.prezzi.meta.descrizione;
  assert.ok(difettiPrezzi('fr', fr, it).some((x) => /^prezzi\.meta\.descrizione: la chiave coi prezzi manca/.test(x)));
});

/* -------------------------------------------------------------------------- */
/* LE CHIAVI suPlay: MOSTRATE, E SOLO DIETRO pmSuPlay                         */
/* -------------------------------------------------------------------------- */

function chiaviSuPlay(t, prefisso = '', uscita = []) {
  for (const [k, v] of Object.entries(t)) {
    const chiave = prefisso ? `${prefisso}.${k}` : k;
    if (typeof v === 'string') {
      if (k === 'suPlay') uscita.push(chiave);
    } else if (v && typeof v === 'object' && !Array.isArray(v)) chiaviSuPlay(v, chiave, uscita);
  }
  return uscita;
}

/**
 * I difetti di resa delle chiavi `suPlay`: `[]` se ogni chiave e' mostrata da
 * almeno un componente e nessuna resa sta fuori da `pmSuPlay &&`.
 * `sorgenti` = { percorso: testo del componente }.
 */
export function difettiSuPlay(chiavi, sorgenti) {
  const difetti = [];
  const mostrate = new Set();
  for (const [nome, sorgente] of Object.entries(sorgenti)) {
    // `const p = t.prezzi;` -> p = prezzi: serve a ricondurre `p.suPlay` alla sua chiave
    const alias = new Map([['t', '']]);
    for (const m of sorgente.matchAll(/const (\w+) = t\.([\w.]+);/g)) alias.set(m[1], m[2]);
    const righe = sorgente.split(/\r?\n/);
    righe.forEach((riga, i) => {
      if (/^\s*(\*|\/\/|\/\*|import\b)/.test(riga)) return;
      for (const m of riga.matchAll(/\{(\w+)((?:\.\w+)*)\.suPlay\}/g)) {
        const radice = alias.get(m[1]);
        if (radice === undefined) {
          difetti.push(`${nome}:${i + 1}: \`${m[0]}\` non si riconduce a una chiave dei testi`);
          continue;
        }
        const chiave = [radice, m[2].replace(/^\./, ''), 'suPlay'].filter(Boolean).join('.');
        if (!/\{pmSuPlay && <p>\{[\w.]+\.suPlay\}<\/p>\}/.test(riga)) {
          difetti.push(`${nome}:${i + 1}: ${chiave} e' mostrata fuori da pmSuPlay`);
          continue;
        }
        mostrate.add(chiave);
      }
      // il pulsante verso la scheda: sempre dietro l'interruttore, sempre con l'indirizzo di stato.ts
      if (/azioni\.play\b/.test(riga) && !/\{pmSuPlay && <a [^>]*href=\{pmPlayUrl\}[^>]*>\{t\.comune\.azioni\.play\}<\/a>\}/.test(riga)) {
        difetti.push(`${nome}:${i + 1}: il pulsante di Google Play non sta dietro pmSuPlay`);
      }
    });
  }
  for (const chiave of chiavi) if (!mostrate.has(chiave)) difetti.push(`${chiave}: nessun componente la mostra`);
  return difetti;
}

const componenti = () => Object.fromEntries(file('src/components/giorno').filter((f) => f.endsWith('.astro')).map((f) => [f, leggi(f)]));

test('suPlay: ogni chiave e\' mostrata da un componente quando pmSuPlay e\' vero, e mai senza', async () => {
  const chiavi = chiaviSuPlay(await carica('it'));
  assert.deepEqual(chiavi.sort(), ['finance.provare.suPlay', 'prezzi.suPlay']);
  for (const lingua of LINGUE) assert.deepEqual(chiaviSuPlay(await carica(lingua)).sort(), chiavi, lingua);
  const sorgenti = componenti();
  assert.ok(Object.keys(sorgenti).length >= 20, `componenti letti: ${Object.keys(sorgenti).length}`);
  assert.deepEqual(difettiSuPlay(chiavi, sorgenti), []);
  // il pulsante c'e' nelle tre pagine che invitano a provare l'app
  const colPulsante = Object.entries(sorgenti).filter(([, s]) => /azioni\.play\b/.test(s)).map(([f]) => path.basename(f)).sort();
  assert.deepEqual(colPulsante, ['Home.astro', 'PaginaFinance.astro', 'Prezzi.astro']);
});

test('mutante: frase tolta dal componente, mostrata sempre, o pulsante senza interruttore vengono fermati', () => {
  const buono = [
    'const p = t.prezzi;',
    '{pmSuPlay && <p>{p.suPlay}</p>}',
    '{pmSuPlay && <a class="azione" href={pmPlayUrl} rel="noopener noreferrer">{t.comune.azioni.play}</a>}',
  ].join('\n');
  assert.deepEqual(difettiSuPlay(['prezzi.suPlay'], { 'Prezzi.astro': buono }), []);
  assert.deepEqual(difettiSuPlay(['prezzi.suPlay'], { 'Prezzi.astro': buono.replace('{pmSuPlay && <p>{p.suPlay}</p>}', '') }), ['prezzi.suPlay: nessun componente la mostra']);
  assert.equal(difettiSuPlay(['prezzi.suPlay'], { 'Prezzi.astro': buono.replace('{pmSuPlay && <p>{p.suPlay}</p>}', '<p>{p.suPlay}</p>') }).length, 2);
  assert.equal(difettiSuPlay(['prezzi.suPlay'], { 'Prezzi.astro': buono.replace('{pmSuPlay && <a class="azione" href={pmPlayUrl}', '{<a class="azione" href={pmPlayUrl}') }).length, 1);
  // una chiave nuova nei testi senza un componente che la mostri (il rilievo del doc-reviewer)
  assert.deepEqual(difettiSuPlay(['prezzi.suPlay', 'games.stato.suPlay'], { 'Prezzi.astro': buono }), ['games.stato.suPlay: nessun componente la mostra']);
  // un alias sconosciuto non passa per buono
  assert.equal(difettiSuPlay([], { 'X.astro': '{pmSuPlay && <p>{boh.suPlay}</p>}' }).length, 1);
});

/* -------------------------------------------------------------------------- */
/* I DUE PUNTI DOPO UN'ETICHETTA                                              */
/* -------------------------------------------------------------------------- */

/** Dove un componente scrive i due punti a mano dopo un testo tradotto. */
export function duePuntiAMano(nome, sorgente) {
  const corpo = sorgente.replace(/^---[\s\S]*?^---/m, (testata) => testata.replace(/[^\n]/g, ' '));
  const difetti = [];
  corpo.split(/\r?\n/).forEach((riga, i) => {
    if (/\}:\s*(\{|<|\$\{)/.test(riga)) difetti.push(`${nome}:${i + 1}: due punti scritti a mano dopo un'etichetta (usa duePunti(lingua))`);
  });
  return difetti;
}

test('due punti: il francese ha lo spazio insecabile, le altre no, e nessun componente li scrive a mano', async () => {
  const { duePunti, LOCALES } = await import(new URL('../src/i18n/lingue.ts', import.meta.url).href);
  assert.deepEqual([...LOCALES], LINGUE);
  assert.equal(duePunti('fr'), '\u00a0:');
  for (const lingua of ['it', 'en', 'es', 'de', 'pt']) assert.equal(duePunti(lingua), ':', lingua);
  for (const [nome, sorgente] of Object.entries(componenti())) assert.deepEqual(duePuntiAMano(nome, sorgente), []);
  assert.match(leggi('src/components/giorno/Colophon.astro'), /\{c\.lingue\}\{dp\} /);
  // la tipografia dei testi francesi usa gia' lo stesso carattere: la resa e' coerente
  const fr = await carica('fr');
  assert.ok(JSON.stringify(fr).includes('\u00a0:'), 'testi francesi senza spazio insecabile prima dei due punti');
  assert.ok(!/\p{L}:(\s|$)/u.test(fr.comune.colophon.lingue), 'l\'etichetta porta gia\' i suoi due punti');
});

test('mutante: "Langues:" rimesso com\'era, nel colophon o in un attributo, viene fermato', () => {
  const buono = "---\nconst a: { b: string } = x;\n---\n<p>{c.lingue}{dp} {nome}</p>\n";
  assert.deepEqual(duePuntiAMano('C.astro', buono), []);
  assert.equal(duePuntiAMano('C.astro', buono.replace('{c.lingue}{dp} {nome}', '{c.lingue}: {nome}')).length, 1);
  assert.equal(duePuntiAMano('C.astro', buono.replace('{c.lingue}{dp} {nome}', '{p.etichetta}: <a href="x">y</a>')).length, 1);
  assert.equal(duePuntiAMano('T.astro', '---\n---\n<summary aria-label={`${t.comune.lingua}: ${nome}`}>x</summary>').length, 1);
});

/* -------------------------------------------------------------------------- */
/* LE SEI LINGUE, UGUALI IN OGNI ELENCO                                       */
/* -------------------------------------------------------------------------- */

test('lingue: dizionari, configurazione, 404, feed e schermate dichiarano le stesse sei', async () => {
  const dizionari = readdirSync(path.join(SITO, 'src/i18n/testi')).map((f) => f.replace(/\.ts$/, '')).sort();
  const attese = [...LINGUE].sort();
  assert.deepEqual(dizionari, attese);
  const cfg = leggi('astro.config.mjs');
  const locali = cfg.match(/locales: \[([^\]]+)\]/)[1].match(/[a-z]{2}/g).sort();
  assert.deepEqual(locali, attese);
  const { SMARRITA } = await import(new URL('../src/i18n/smarrita.ts', import.meta.url).href);
  assert.deepEqual(Object.keys(SMARRITA).sort(), attese);
  for (const lingua of LINGUE) for (const campo of ['titolo', 'testo', 'ritorno']) assert.ok(SMARRITA[lingua][campo].length > 5, `404 ${lingua}.${campo}`);
  for (const lingua of LINGUE) assert.ok(existsSync(path.join(SITO, `src/pages/blog/rss-${lingua}.xml.ts`)), `feed ${lingua}`);
  const { LINGUE: delleSchermate } = await import('../strumenti/schermate.mjs');
  assert.deepEqual([...delleSchermate].sort(), attese);
});

test('lingue: ogni lingua ha le sue quattro schermate vere di Finance, e sono quelle del registro', () => {
  for (const lingua of LINGUE) {
    const dir = `src/assets/pm/${lingua}`;
    const registro = JSON.parse(leggi(`${dir}/PROVENIENZA.json`));
    const voci = registro.schermate ?? registro.file ?? registro;
    const nomi = ['portafoglio', 'mercato', 'ribilanciamento', 'analisi'];
    for (const nome of nomi) {
      const voce = voci[nome] ?? voci[`${nome}.webp`];
      assert.ok(voce, `${lingua}: ${nome} non e' nel registro`);
      const sha = createHash('sha256').update(readFileSync(path.join(SITO, dir, `${nome}.webp`))).digest('hex');
      assert.equal(sha, voce.sha256_uscita, `${lingua}/${nome}.webp non e' il file del registro`);
      assert.match(voce.sorgente, new RegExp(`/${lingua}_\\d\\d_`), `${lingua}/${nome}: cattura di un'altra lingua`);
      assert.ok(!/settings|paywall/.test(voce.sorgente), `${lingua}/${nome}: cattura vietata`);
    }
  }
});

test('configurazione: i rimandi di /home valgono per ogni lingua, niente Tailwind, niente stile in linea dal markdown', () => {
  const cfg = leggi('astro.config.mjs');
  assert.match(cfg, /const LINGUE_COL_PREFISSO = \['en', 'es', 'fr', 'de', 'pt'\];/);
  assert.match(cfg, /'\/home': '\/',\s*\n\s*\.\.\.Object\.fromEntries\(LINGUE_COL_PREFISSO\.map\(\(l\) => \[`\/\$\{l\}\/home`, `\/\$\{l\}`\]\)\),/);
  assert.match(cfg, /markdown: \{ syntaxHighlight: false \}/);
  const vivo = cfg.replace(/^\s*\/\/.*$/gm, '');
  assert.ok(!/tailwind/i.test(vivo), 'astro.config.mjs usa ancora Tailwind');
  assert.match(vivo, /cssTarget: \['chrome87', 'firefox78', 'safari14', 'edge88'\]/);
});
