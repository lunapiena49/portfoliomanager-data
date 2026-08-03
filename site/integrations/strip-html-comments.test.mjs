/**
 * Prove di `togliCommenti` (integrations/strip-html-comments.mjs).
 *
 * Perche' esistono: quella funzione riscrive l'HTML di OGNI pagina servita.
 * Se sbaglia, non sbaglia una pagina: le sbaglia tutte, e il difetto arriva
 * al pubblico gia' pubblicato. A lungo non ha avuto una sola prova, e il suo
 * stesso docstring proponeva un metodo di verifica che nessuno aveva
 * trasformato in test.
 *
 * Si eseguono col runner integrato di Node (nessuna dipendenza nuova):
 *     node --test integrations/
 *
 * Coprono: happy-path, le quattro regioni protette, il commento condizionale,
 * l'input malformato (error-injection), i confini, e la MUTATION-SANITY -
 * cioe' la prova che questi test FALLISCONO se la funzione viene svuotata.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { togliCommenti } from './strip-html-comments.mjs';

test('happy path: il commento sparisce, il resto resta identico', () => {
  const html = '<p>prima</p><!-- nota di design -->\n<p>dopo</p>';
  assert.equal(togliCommenti(html), '<p>prima</p>\n<p>dopo</p>');
});

test('piu commenti nella stessa pagina', () => {
  const html = '<a><!--uno--></a><b><!--due--></b>';
  assert.equal(togliCommenti(html), '<a></a><b></b>');
});

test('una pagina senza commenti torna BYTE IDENTICA', () => {
  const html = '<!doctype html><html><body><h1>Ciao</h1></body></html>';
  assert.equal(togliCommenti(html), html);
});

test('il doctype non e un commento e non si tocca', () => {
  assert.equal(togliCommenti('<!doctype html><p>x</p>'), '<!doctype html><p>x</p>');
});

// --- regioni protette: dentro, "<!--" non e un commento ---------------------

for (const tag of ['script', 'style', 'pre', 'textarea']) {
  test(`dentro <${tag}> il contenuto resta verbatim`, () => {
    const html = `<${tag}>a <!-- non e un commento --> b</${tag}><!--questo si-->`;
    assert.equal(togliCommenti(html), `<${tag}>a <!-- non e un commento --> b</${tag}>`);
  });
}

test('il tag protetto con attributi e riconosciuto', () => {
  const html = '<script type="module">const x = "<!--";</script><!--via-->';
  assert.equal(togliCommenti(html), '<script type="module">const x = "<!--";</script>');
});

test('il tag protetto in MAIUSCOLO e riconosciuto', () => {
  const html = '<SCRIPT>/* <!--tenuto--> */</SCRIPT><!--via-->';
  assert.equal(togliCommenti(html), '<SCRIPT>/* <!--tenuto--> */</SCRIPT>');
});

test('un tag che INIZIA come uno protetto non lo e (scriptish)', () => {
  // <scriptish> non e <script>: il suo commento va rimosso come gli altri.
  const html = '<scriptish><!--via--></scriptish>';
  assert.equal(togliCommenti(html), '<scriptish></scriptish>');
});

test('la chiusura con spazio prima di > non taglia il markup', () => {
  const html = '<script>x</script ><p>dopo</p>';
  const out = togliCommenti(html);
  assert.ok(out.includes('<p>dopo</p>'), `il markup dopo la chiusura e sparito: ${out}`);
  assert.ok(out.includes('x'), 'il contenuto dello script e sparito');
});

// --- fail-open: un "<script>" DENTRO un attributo non e una regione --------
// Trovato in revisione indipendente, riprodotto e curato. Prima della
// cura il presidio si SPEGNEVA da li' a fine documento, senza un errore.

test('un <script> dentro un valore di attributo non apre una regione protetta', () => {
  const html = '<div data-x="<script>">ciao</div><!-- via --><p>coda</p>';
  const out = togliCommenti(html);
  assert.ok(!out.includes('<!-- via -->'), `il presidio si e spento: ${out}`);
  assert.equal(out, '<div data-x="<script>">ciao</div><p>coda</p>');
});

test('un > dentro un attributo non chiude il tag in anticipo', () => {
  const html = '<a title="a > b"><!--via--></a>';
  assert.equal(togliCommenti(html), '<a title="a > b"></a>');
});

test('apici singoli negli attributi valgono quanto i doppi', () => {
  const html = "<div data-y='<pre>'>x</div><!--via-->";
  assert.equal(togliCommenti(html), "<div data-y='<pre>'>x</div>");
});

test('il tag auto-chiuso non apre una regione da chiudere', () => {
  const html = '<script src="x.js"/><!--via--><p>dopo</p>';
  const out = togliCommenti(html);
  assert.ok(!out.includes('<!--via-->'), `commento sopravvissuto: ${out}`);
  assert.ok(out.includes('<p>dopo</p>'), 'markup successivo perso');
});

test('<pre seguito da CR e comunque protetto', () => {
  const html = '<pre\r\nclass="x"><!--tenuto--></pre><!--via-->';
  const out = togliCommenti(html);
  assert.ok(out.includes('<!--tenuto-->'), `contenuto di <pre> ripulito: ${out}`);
  assert.ok(!out.includes('<!--via-->'), 'il commento fuori doveva sparire');
});

test('un < solitario nel testo non e un tag', () => {
  assert.equal(togliCommenti('<p>3 < 5</p><!--via-->'), '<p>3 < 5</p>');
});

// Questi due pinnano il perche' delle virgolette in `fineTag`: senza, il
// parser si ferma al primo `>` e finisce DENTRO il valore dell'attributo,
// dove una sequenza `<!--...-->` verrebbe scambiata per un commento e
// CANCELLATA - cioe' il valore dell'attributo si corrompe in silenzio.
test('un commento dentro un valore di attributo non si tocca', () => {
  const html = '<div data-x="<pre> <!--dentro-->"> fuori <!--via-->';
  const out = togliCommenti(html);
  assert.ok(out.includes('<!--dentro-->'), `valore dell attributo corrotto: ${out}`);
  assert.ok(!out.includes('<!--via-->'), 'il commento vero doveva sparire');
});

test('un commento in un alt resta parte del testo alternativo', () => {
  const html = '<img alt="a <!--b--> c"><!--via-->';
  assert.equal(togliCommenti(html), '<img alt="a <!--b--> c">');
});

// --- commenti condizionali: markup ATTIVO su IE ----------------------------

test('il commento condizionale IE resta', () => {
  const html = '<!--[if IE]><link rel="x"><![endif]--><!--normale-->';
  assert.equal(togliCommenti(html), '<!--[if IE]><link rel="x"><![endif]-->');
});

// --- error-injection: input malformato non deve mangiare la pagina ---------

test('commento NON chiuso: non si perde cio che viene prima', () => {
  const html = '<p>importante</p><!-- mai chiuso';
  const out = togliCommenti(html);
  assert.ok(out.startsWith('<p>importante</p>'), `contenuto perso: ${out}`);
});

test('tag protetto NON chiuso: la pagina non si svuota', () => {
  const html = '<p>prima</p><script>alert(1)';
  const out = togliCommenti(html);
  assert.ok(out.includes('<p>prima</p>'), 'contenuto perso prima dello script');
  assert.ok(out.includes('alert(1)'), 'contenuto dello script perso');
});

test('stringa vuota e input minimi non esplodono', () => {
  assert.equal(togliCommenti(''), '');
  assert.equal(togliCommenti('<'), '<');
  assert.equal(togliCommenti('<!--'), '<!--');
  assert.equal(togliCommenti('-->'), '-->');
});

test('un commento che contiene trattini interni finisce al primo -->', () => {
  const html = '<a><!-- un -- due --><b>resta</b>';
  assert.equal(togliCommenti(html), '<a><b>resta</b>');
});

// --- MUTATION-SANITY --------------------------------------------------------
// Se `togliCommenti` venisse svuotata (identita'), la suite DEVE fallire.
// Questo test lo prova in modo esplicito, senza dover mutare il sorgente:
// riesegue gli stessi ingressi contro l'identita' e pretende una differenza.

test('mutation-sanity: la funzione IDENTITA fallirebbe queste prove', () => {
  const identita = (s) => s;
  const casi = [
    '<p>x</p><!-- nota -->',
    '<a><!--uno--></a><b><!--due--></b>',
    '<script>ok</script><!--via-->',
  ];
  let differenze = 0;
  for (const c of casi) {
    if (togliCommenti(c) !== identita(c)) differenze += 1;
  }
  assert.equal(
    differenze,
    casi.length,
    'togliCommenti si comporta come l identita: il presidio non morde piu'
  );
});

test('mutation-sanity: una versione che ignora le regioni protette fallirebbe', () => {
  // Un "togli tutto" ingenuo: se la nostra funzione facesse cosi', il codice
  // dentro <script> verrebbe corrotto. Pretendiamo che le due DIVERGANO.
  const ingenuo = (s) => s.replace(/<!--[\s\S]*?-->/g, '');
  const caso = '<script>const s = "<!-- x -->";</script>';
  assert.notEqual(
    togliCommenti(caso),
    ingenuo(caso),
    'la funzione non protegge piu le regioni <script>/<style>/<pre>/<textarea>'
  );
  assert.equal(togliCommenti(caso), caso, 'lo script deve restare verbatim');
});
