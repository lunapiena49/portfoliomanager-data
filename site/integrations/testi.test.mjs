// IL PRESIDIO DI GOOGLE PLAY NEI TESTI (S384, lotto TESTO-IT).
//
// Portfolio Manager NON e' pubblicata su Google Play: il sito la descrive al
// presente, ma non deve affermare che l'app si scarica, si installa o si
// aggiorna da li'. Il presidio di prima (giorno.test.mjs, "Google Play come
// luogo di scaricamento...") cercava quattro forme fisse e lasciava passare
// "Da Google Play, in automatico" (rilievo del doc-reviewer S384, riga 592).
// Questo ragiona al contrario: Google Play e' VIETATO ovunque, tranne
//  1. nelle chiavi governate da `pmSuPlay` (`*.suPlay`, `comune.azioni.play`);
//  2. come CANALE DI PAGAMENTO, in tre posti dichiarati: `prezzi.nota` e i
//     capitoli `pagamento` e `famiglia` di `prezzi`. Li' pero' restano
//     vietate le forme che ne fanno un luogo da cui si prende l'app.
// Vale per ogni dizionario presente in src/i18n/testi/.
//
// S384, lotto TESTO-IT-2: il presidio copre anche gli ARTICOLI delle Notizie
// (src/content/blog/**/*.md). Un articolo non ha chiavi governate da
// `pmSuPlay`: nelle lingue pronte (quelle che hanno un dizionario) un articolo
// pubblicato non nomina Google Play affatto. I due articoli italiani dicevano
// "lancio Play Store" e "app gratuita su Google Play". Bozze e lingue non
// ancora pronte non sono giudicate: lo saranno il giorno in cui escono.
// Presidia anche la frase che la pagina Prezzi mostra finche' la scheda non
// c'e' (`prezzi.primaDellaScheda`).
//
// S384, corsia B6: LE SEI LINGUE. Il presidio girava gia' su ogni dizionario,
// ma i verbi che fanno di Google Play un luogo erano quelli dell'italiano piu'
// qualche radice sparsa: dentro un capitolo di pagamento portoghese
// "descarrega-se do Google Play" passava (rilievo dei traduttori), e cosi'
// "Bei Google Play laden" in tedesco e "Get it on Google Play" in inglese,
// cioe' le frasi stesse che `azioni.play` riserva a `pmSuPlay`. Ora:
//  - le radici coprono le sei lingue, e la prova e' fatta con le frasi VERE:
//    il testo di `azioni.play` e di `finance.provare.suPlay` di ogni lingua,
//    spostato in un capitolo di pagamento, deve essere fermato;
//  - conta anche la forma "sta su" (e' su, is on, esta' en, est sur, gibt es
//    bei, esta' no), che non ha un verbo di scaricamento;
//  - il nome del negozio vale anche col trattino (Play-Store, Google-Play);
//  - le chiavi ammesse e `primaDellaScheda` sono verificate in ogni lingua.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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

const SCHEDA = /(^|\.)suPlay$|^comune\.azioni\.play$/;
// Spazio, spazio non separabile o trattino: il tedesco scrive "Play-Store".
const NOME = /Google[\s-]*Play|Play[\s-]*Store/i;
const CAPITOLI_DI_PAGAMENTO = ['pagamento', 'famiglia'];

/** Le chiavi dove Google Play si puo' nominare come canale di pagamento. */
export function chiaviDiPagamento(t) {
  const prefissi = ['prezzi.nota'];
  (t?.prezzi?.capitoli ?? []).forEach((c, i) => {
    if (CAPITOLI_DI_PAGAMENTO.includes(c.id)) prefissi.push(`prezzi.capitoli[${i}].`);
  });
  return prefissi;
}

// Le radici dei verbi che fanno di Google Play un LUOGO da cui si prende
// l'app, lingua per lingua. Non devono stare nella stessa frase del nome.
// Valgono tutte per ogni dizionario: una frase inglese in un testo tedesco e'
// un difetto lo stesso.
// I confini di parola si scrivono con \p{L}: il `\b` di JavaScript conosce solo
// l'ASCII, e davanti a "è su" o dentro "lädt" non vede nessun confine.
const I = '(?<![\\p{L}\\p{N}])';
const F = '(?![\\p{L}\\p{N}])';
export const RADICI = {
  it: ['scaric', 'install', 'disponibil', 'aggiorn', 'pubblicat', 'si trova', 'si prende', 'si ottien'],
  en: ['download', 'install', 'availab', 'updat', 'publish', 'releas', `${I}get (?:it|the app|the full app)${F}`],
  es: ['descarg', 'instal', 'dispon', 'actualiz', 'publicad', `${I}baj(?:a|ar|arla|arse)${F}`, 'obt[e\\u00e9]n', 'cons[i\\u00ed]g'],
  fr: ['t\\u00e9l\\u00e9charg', 'telecharg', 'install', 'dispon', '\\u00e0 jour', 'publi\\u00e9', 'obten', 'obtien', 'r\\u00e9cup\\u00e9r'],
  de: ['herunter', 'download', 'install', 'verf\\u00fcgbar', 'erh\\u00e4ltlich', 'aktualis', 'ver\\u00f6ffentlich', `${I}lad(?:e|en|et)?${F}`, `${I}l\\u00e4dt${F}`, `${I}geladen${F}`, 'bezieh', 'bezog'],
  pt: ['descarreg', 'transfer[ei]', 'transfir', 'baix', 'instal', 'dispon', 'atualiz', 'actualiz', 'publicad', 'obt[e\\u00e9]m', 'obter', 'obtenh'],
};
const PRENDE = `(?:${Object.values(RADICI).flat().join('|')})`;
// "Sta su": la forma senza verbo di scaricamento, quella di `finance.provare.suPlay`.
export const STA = {
  it: `${I}(?:\\u00e8|e'|sta|arriva) su`,
  en: `${I}(?:is|are|lives?) on`,
  es: `${I}est\\u00e1n? en`,
  fr: `${I}(?:est|sont) sur`,
  de: `${I}gibt es (?:bei|im|auf)`,
  pt: `${I}est(?:\\u00e1|\\u00e3o) n[oa]`,
};
const NEGOZIO = '(?:Google[\\s-]*Play|Play[\\s-]*Store)';
const FRASE = '[^.;:!?]{0,120}';
const LUOGO = [
  new RegExp(`${PRENDE}[\\p{L}]*${FRASE}${NEGOZIO}`, 'iu'),
  new RegExp(`${NEGOZIO}${FRASE}${PRENDE}`, 'iu'),
  new RegExp(`(?:${Object.values(STA).join('|')})\\s+(?:de[rmn]\\s+|the\\s+|le\\s+|il\\s+|el\\s+)?${NEGOZIO}`, 'iu'),
];

/** I difetti di un dizionario: [] se regge. */
export function difettiPlay(t) {
  const pagamento = chiaviDiPagamento(t);
  const difetti = [];
  for (const [chiave, v] of foglie(t)) {
    if (SCHEDA.test(chiave) || !NOME.test(v)) continue;
    if (!pagamento.some((p) => chiave === p || chiave.startsWith(p))) {
      difetti.push(`${chiave}: nomina Google Play fuori dalle chiavi ammesse`);
      continue;
    }
    if (LUOGO.some((r) => r.test(v))) {
      difetti.push(`${chiave}: fa di Google Play un luogo da cui si prende l'app`);
    }
  }
  return difetti;
}

const copia = (t) => JSON.parse(JSON.stringify(t));

test('testi: Google Play solo dietro pmSuPlay o come canale di pagamento, in ogni dizionario', async () => {
  for (const file of dizionari) {
    assert.deepEqual(difettiPlay(await carica(file)), [], `${file}`);
  }
});

test('testi: le chiavi ammesse esistono davvero, in ogni lingua (un permesso su una chiave assente non protegge nulla)', async () => {
  assert.deepEqual(dizionari.map((f) => f.replace('.ts', '')).sort(), ['de', 'en', 'es', 'fr', 'it', 'pt'], 'il presidio deve giudicare sei dizionari');
  for (const file of dizionari) {
    const t = await carica(file);
    assert.match(t.comune.azioni.play, NOME, `${file}: azioni.play`);
    assert.match(t.finance.provare.suPlay, NOME, `${file}: finance.provare.suPlay`);
    assert.match(t.prezzi.suPlay, NOME, `${file}: prezzi.suPlay`);
    assert.ok(t.prezzi.primaDellaScheda.length > 20, `${file}: manca la frase per quando la scheda non esiste`);
    assert.equal(chiaviDiPagamento(t).length, 1 + CAPITOLI_DI_PAGAMENTO.length, `${file}: manca un capitolo di pagamento`);
  }
});

/** Mette una frase nel primo paragrafo del capitolo di pagamento, dove il nome e' ammesso. */
function nelPagamento(t, frase) {
  const m = copia(t);
  const i = m.prezzi.capitoli.findIndex((c) => c.id === 'pagamento');
  m.prezzi.capitoli[i].paragrafi[0] = frase;
  return m;
}

test('mutante, sei lingue: le frasi VERE di azioni.play e di suPlay, spostate nel capitolo di pagamento, vengono fermate', async () => {
  for (const file of dizionari) {
    const t = await carica(file);
    assert.deepEqual(difettiPlay(t), [], `${file}: base non verde`);
    for (const frase of [t.comune.azioni.play, t.finance.provare.suPlay]) {
      const d = difettiPlay(nelPagamento(t, `${frase}.`));
      assert.equal(d.length, 1, `${file}: "${frase}" passa nel capitolo di pagamento`);
      assert.match(d[0], /luogo da cui si prende/);
    }
  }
});

test('mutante, sei lingue: le forme di scaricamento che il presidio di prima lasciava passare', async () => {
  const it = await carica('it.ts');
  const FORME = [
    'A app descarrega-se do Google Play e o pagamento passa por l\u00e1.',
    'A aplica\u00e7\u00e3o transfere-se a partir do Google Play.',
    'Obt\u00e9m-se a app no Google Play.',
    'Die App l\u00e4dt man bei Google Play.',
    'Bei Google Play laden und dort bezahlen.',
    'Die App wird \u00fcber Google Play bezogen.',
    'Im Play-Store erh\u00e4ltlich.',
    'Get the app on Google Play and pay there.',
    'The app is released on Google Play.',
    'La app se baja de Google Play.',
    'Cons\u00edguela en Google Play.',
    'L\u2019application s\u2019obtient sur Google Play.',
    'L\u2019application est mise \u00e0 jour par Google Play.',
    'L\u2019app si trova su Google Play.',
  ];
  for (const frase of FORME) {
    const d = difettiPlay(nelPagamento(it, frase));
    assert.equal(d.length, 1, `non fermata: ${frase}`);
    assert.match(d[0], /luogo da cui si prende/, frase);
  }
});

test('confine, sei lingue: il canale di pagamento resta dicibile, e gli inviti del gruppo famiglia non sono uno scaricamento', async () => {
  // Le frasi vere dei capitoli di pagamento e famiglia delle sei lingue devono
  // restare verdi: lo prova la base del test dei mutanti qui sopra. Qui le
  // forme vicine ai verbi nuovi, che NON devono fare rosso.
  const it = await carica('it.ts');
  const LECITE = [
    'O pagamento passa inteiramente pelo Google Play.',
    'A renova\u00e7\u00e3o anual desativa-se na p\u00e1gina de subscri\u00e7\u00f5es do Google Play.',
    'Die Zahlung l\u00e4uft vollst\u00e4ndig \u00fcber Google Play; eingeladen wird in den Werkzeugen von Google.',
    'Payment goes entirely through Google Play.',
    'El pago pasa \u00edntegramente por Google Play.',
    'Le paiement passe enti\u00e8rement par Google Play.',
  ];
  for (const frase of LECITE) assert.deepEqual(difettiPlay(nelPagamento(it, frase)), [], frase);
});

test('mutante: la frase storica "Da Google Play, in automatico" in una risposta viene fermata', async () => {
  const t = copia(await carica('it.ts'));
  t.domande.voci[0].risposta = 'Da Google Play, in automatico. La demo web si aggiorna ricaricando la pagina.';
  const d = difettiPlay(t);
  assert.equal(d.length, 1);
  assert.match(d[0], /^domande\.voci\[0\]\.risposta: nomina/);
});

test('mutante: "la ricevuta di Google Play" nella prima pagina viene fermata', async () => {
  const t = copia(await carica('it.ts'));
  t.home.finance.passi[1][1] = 'Bastano un’impronta anonima e la ricevuta di Google Play.';
  assert.equal(difettiPlay(t).length, 1);
});

test('mutante: dentro un capitolo di pagamento Google Play non diventa il luogo da cui si scarica', async () => {
  const t = copia(await carica('it.ts'));
  const i = t.prezzi.capitoli.findIndex((c) => c.id === 'pagamento');
  t.prezzi.capitoli[i].paragrafi[0] = 'L’app si scarica da Google Play e il pagamento passa da lì.';
  const d = difettiPlay(t);
  assert.equal(d.length, 1);
  assert.match(d[0], /luogo da cui si prende/);
  t.prezzi.nota = 'Disponibile su Google Play in tutti i paesi.';
  assert.equal(difettiPlay(t).length, 2);
});

test('mutante: il nome del negozio in altra forma (Play Store) e in altra lingua viene fermato', async () => {
  const t = copia(await carica('it.ts'));
  t.stampa.finance.voci[1].descrizione = 'Android, dal Play Store.';
  t.casa.sommario = 'Download it on Google Play.';
  assert.equal(difettiPlay(t).length, 2);
});

test('confine: il canale di pagamento resta dicibile dove e\' dichiarato, e solo li\'', async () => {
  const t = copia(await carica('it.ts'));
  const frase = 'Il pagamento passa interamente da Google Play.';
  const i = t.prezzi.capitoli.findIndex((c) => c.id === 'pagamento');
  t.prezzi.capitoli[i].paragrafi[0] = frase;
  assert.deepEqual(difettiPlay(t), []);
  const j = t.prezzi.capitoli.findIndex((c) => c.id === 'prova');
  t.prezzi.capitoli[j].paragrafi[0] = frase;
  assert.equal(difettiPlay(t).length, 1);
});

test('errore: un dizionario senza la sezione prezzi non fa cadere il presidio e non apre permessi', () => {
  assert.deepEqual(chiaviDiPagamento({}), ['prezzi.nota']);
  assert.deepEqual(difettiPlay({ home: { titolo: 'Su Google Play' } }), ['home.titolo: nomina Google Play fuori dalle chiavi ammesse']);
});

/* ------------------------------------------------------------------------ */
/* GLI ARTICOLI DELLE NOTIZIE                                                */
/* ------------------------------------------------------------------------ */

const BLOG = path.join(SITO, 'src/content/blog');
const LINGUE_PRONTE = dizionari.map((f) => f.replace(/\.ts$/, ''));

function fileMd(dir, uscita = []) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) fileMd(p, uscita);
    else if (f.endsWith('.md')) uscita.push(p);
  }
  return uscita;
}

/** La testata di un articolo: lingua e bozza. `null` se non si legge. */
export function testataArticolo(sorgente) {
  const m = String(sorgente).match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
  if (!m) return null;
  const lang = m[1].match(/^lang:\s*["']?([a-z]{2})["']?\s*$/m);
  if (!lang) return null;
  return { lang: lang[1], draft: /^draft:\s*true\s*$/m.test(m[1]) };
}

/** I difetti di un articolo: [] se regge o se non e' ancora giudicato. */
export function difettiArticolo(nome, sorgente, pronte = LINGUE_PRONTE) {
  const testata = testataArticolo(sorgente);
  if (!testata) return [`${nome}: testata illeggibile (lang mancante): non si puo' dire se va giudicato`];
  if (testata.draft || !pronte.includes(testata.lang)) return [];
  const difetti = [];
  String(sorgente)
    .split(/\r?\n/)
    .forEach((riga, i) => {
      if (NOME.test(riga)) difetti.push(`${nome}:${i + 1}: un articolo nomina Google Play`);
    });
  return difetti;
}

const ARTICOLO_BUONO = [
  '---',
  'title: "Un titolo"',
  'summary: "Un sommario lungo quanto basta a passare lo schema del blog."',
  'publishedAt: 2026-05-07',
  'lang: it',
  'tags: ["prova"]',
  '---',
  '',
  'La demo web si apre nel browser.',
  '',
].join('\n');

test('articoli: nelle lingue pronte nessun articolo pubblicato nomina Google Play', () => {
  const giudicati = [];
  for (const p of fileMd(BLOG)) {
    const sorgente = readFileSync(p, 'utf8');
    const nome = path.relative(SITO, p).replace(/\\/g, '/');
    assert.deepEqual(difettiArticolo(nome, sorgente), [], nome);
    const t = testataArticolo(sorgente);
    if (t && !t.draft && LINGUE_PRONTE.includes(t.lang)) giudicati.push(nome);
  }
  // Un presidio che non giudica nessun file e' verde senza provare nulla.
  assert.ok(giudicati.length >= 2, `articoli giudicati: ${giudicati.length} (attesi almeno i due italiani)`);
});

test('mutante: un articolo italiano che manda a Google Play, nel testo o nel titolo, viene fermato', () => {
  assert.deepEqual(difettiArticolo('buono.md', ARTICOLO_BUONO, ['it']), []);
  const nelTesto = ARTICOLO_BUONO + '\nScarica l’app Android, gratuita su Google Play.\n';
  const d = difettiArticolo('m.md', nelTesto, ['it']);
  assert.equal(d.length, 1);
  assert.match(d[0], /^m\.md:11: un articolo nomina/);
  const nelTitolo = ARTICOLO_BUONO.replace('Un titolo', 'Lancio sul Play Store');
  assert.equal(difettiArticolo('t.md', nelTitolo, ['it']).length, 1);
});

test('confine: bozze e lingue non ancora pronte non sono giudicate, e lo diventano quando escono', () => {
  const play = ARTICOLO_BUONO + '\nAvailable on Google Play.\n';
  const inglese = play.replace('lang: it', 'lang: en');
  assert.deepEqual(difettiArticolo('en.md', inglese, ['it']), []);
  assert.equal(difettiArticolo('en.md', inglese, ['en', 'it']).length, 1);
  const bozza = play.replace('lang: it', 'lang: it\ndraft: true');
  assert.deepEqual(difettiArticolo('bozza.md', bozza, ['it']), []);
  assert.equal(difettiArticolo('uscita.md', bozza.replace('draft: true', 'draft: false'), ['it']).length, 1);
});

test('errore: un articolo senza testata o senza lingua non passa in silenzio', () => {
  assert.equal(difettiArticolo('nudo.md', 'Solo testo, su Google Play.', ['it']).length, 1);
  assert.equal(difettiArticolo('muto.md', '---\ntitle: "x"\n---\ntesto', ['it']).length, 1);
});

/* ------------------------------------------------------------------------ */
/* LA PAGINA PREZZI SENZA LA SCHEDA                                          */
/* ------------------------------------------------------------------------ */

/** Che cosa mostra Prezzi.astro nei due stati di `pmSuPlay`: [] se regge. */
export function difettiPrezzi(sorgente) {
  const difetti = [];
  if (!/\{!pmSuPlay && <p>\{p\.primaDellaScheda\}<\/p>\}/.test(sorgente)) {
    difetti.push('Prezzi.astro: senza la scheda la pagina non dice quando si compra');
  }
  if (!/\{pmSuPlay && <p>\{p\.suPlay\}<\/p>\}/.test(sorgente)) {
    difetti.push('Prezzi.astro: la frase della scheda non sta dietro pmSuPlay');
  }
  return difetti;
}

test('prezzi: senza la scheda la pagina dice quando si compra, e non nomina il negozio, in ogni lingua', async () => {
  for (const file of dizionari) {
    const t = await carica(file);
    assert.doesNotMatch(t.prezzi.primaDellaScheda, NOME, `${file}: primaDellaScheda nomina il negozio`);
    assert.doesNotMatch(t.prezzi.primaDellaScheda, /\bPlay\b|\bGoogle\b/, `${file}: primaDellaScheda nomina Google`);
    assert.match(t.prezzi.primaDellaScheda, /d[e\u00e9]mo/i, `${file}: primaDellaScheda non manda alla demo`);
  }
  const it = await carica('it.ts');
  assert.match(it.prezzi.primaDellaScheda, /demo web/);
  assert.deepEqual(difettiPrezzi(readFileSync(path.join(SITO, 'src/components/giorno/servizio/Prezzi.astro'), 'utf8')), []);
});

test('mutante: la frase tolta dalla pagina, o mostrata sempre, viene fermata', () => {
  const buona = '{!pmSuPlay && <p>{p.primaDellaScheda}</p>}\n{pmSuPlay && <p>{p.suPlay}</p>}';
  assert.deepEqual(difettiPrezzi(buona), []);
  assert.equal(difettiPrezzi(buona.replace('{!pmSuPlay && <p>{p.primaDellaScheda}</p>}', '')).length, 1);
  assert.equal(difettiPrezzi(buona.replace('{!pmSuPlay && ', '{')).length, 1);
  assert.equal(difettiPrezzi(buona.replace('{pmSuPlay && <p>{p.suPlay}</p>}', '<p>{p.suPlay}</p>')).length, 1);
});
