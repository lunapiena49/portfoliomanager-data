// I CONTRATTI DEL MARCHIO DI ROLLQUEST SUL SITO COSTRUITO (S387). Leggono
// dist/: si lanciano DOPO la build con `npm run test:dist`. Con
// `SITO_DIST=<cartella>` leggono una build fatta altrove. Il marchio (wordmark
// W3 AVORIO) e' un'immagine col testo alternativo della lingua: in testa alle
// pagine di Games e al capitolo di Games della prima pagina, nell'immagine
// social delle pagine del gioco, fra i materiali della pagina Stampa.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const DIST = process.env.SITO_DIST
  ? path.resolve(process.env.SITO_DIST)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];
/* `build.format: 'file'`: la prima pagina di una lingua e' `<lingua>.html`, le altre `<lingua>/<pagina>.html`. */
const file = (lingua, pagina) =>
  lingua === 'it' ? path.join(DIST, `${pagina}.html`)
    : pagina === 'index' ? path.join(DIST, `${lingua}.html`) : path.join(DIST, lingua, `${pagina}.html`);
const html = (lingua, pagina) => readFileSync(file(lingua, pagina), 'utf8');
const attributo = (tag, nome) => (tag.match(new RegExp(`\\s${nome}="([^"]*)"`)) ?? [])[1];
const social = (h) => (h.match(/<meta property="og:image" content="([^"]+)"/) ?? [])[1];
async function testi(lingua) {
  return (await import(new URL(`../../src/i18n/testi/${lingua}.ts`, import.meta.url).href)).default;
}
/** Le insegne di una pagina: i tag <img> dentro <p class="insegna">. */
const insegne = (h) => [...h.matchAll(/<p class="insegna">\s*(<img [^>]*>)\s*<\/p>/g)].map((m) => m[1]);

test('marchio: le pagine costruite esistono in sei lingue', () => {
  for (const lingua of LINGUE) for (const pagina of ['games', 'index', 'press']) {
    assert.ok(existsSync(file(lingua, pagina)), `manca ${file(lingua, pagina)}: lancia prima la build`);
  }
});

test('games: una sola insegna in testa, col testo alternativo della lingua e il file nella build', async () => {
  for (const lingua of LINGUE) {
    const h = html(lingua, 'games');
    const t = await testi(lingua);
    const tag = insegne(h);
    assert.equal(tag.length, 1, `${lingua}/games: ${tag.length} insegne`);
    assert.equal(attributo(tag[0], 'alt'), t.games.marchio, `${lingua}/games: alt`);
    const src = attributo(tag[0], 'src');
    assert.match(src, /^\/_assets\/rollquest-wordmark\.[A-Za-z0-9_-]+\.webp$/, `${lingua}/games: ${src}`);
    assert.ok(existsSync(path.join(DIST, src)), `${lingua}/games: ${src} non e' nella build`);
    assert.ok(Number(attributo(tag[0], 'width')) >= 840 && Number(attributo(tag[0], 'height')) > 0, 'taglie dell\'immagine');
    // Sta sopra la piega: non si carica in ritardo. E precede l'occhiello e il titolo.
    assert.equal(attributo(tag[0], 'loading'), undefined, `${lingua}/games: insegna caricata in ritardo`);
    assert.ok(h.indexOf('class="insegna"') < h.indexOf('<h1'), `${lingua}/games: l'insegna sta dopo il titolo`);
    // Il nome resta testo vero nel titolo: una sola h1, e contiene ROLLQUEST.
    const h1 = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, ''));
    assert.equal(h1.length, 1);
    assert.ok(h1[0].includes('ROLLQUEST'), `${lingua}/games: il titolo non nomina piu' il gioco`);
    // Le immagini decorative del palco restano con alt vuoto: l'insegna e' l'unica con un testo.
    assert.equal((h.match(/<img(?![^>]*\balt="")[^>]*>/g) ?? []).length, 1, `${lingua}/games: immagini con alt oltre l'insegna`);
  }
});

test('prima pagina: l\'insegna apre il capitolo di Games, di notte, in sei lingue', async () => {
  for (const lingua of LINGUE) {
    const h = html(lingua, 'index');
    const t = await testi(lingua);
    const tag = insegne(h);
    assert.equal(tag.length, 1, `${lingua}/index: ${tag.length} insegne`);
    assert.equal(attributo(tag[0], 'alt'), t.games.marchio);
    assert.equal(attributo(tag[0], 'loading'), 'lazy', `${lingua}/index: sotto la piega va caricata in ritardo`);
    const notte = h.indexOf('<section class="notte" id="games"');
    assert.ok(notte > 0 && h.indexOf('class="insegna"') > notte, `${lingua}/index: l'insegna sta fuori dalla notte`);
    assert.ok(h.indexOf('class="insegna"') < h.indexOf('class="rubrica"', notte), `${lingua}/index: l'insegna non precede la rubrica`);
  }
});

test('immagine social: il marchio del gioco sulle pagine di Games, quella di PluriFin su tutte le altre', () => {
  assert.ok(existsSync(path.join(DIST, 'assets', 'og-rollquest.png')), 'manca assets/og-rollquest.png nella build');
  for (const lingua of LINGUE) {
    const g = html(lingua, 'games');
    assert.equal(social(g), 'https://plurifin.app/assets/og-rollquest.png', `${lingua}/games`);
    const dati = JSON.parse((g.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) ?? [])[1]);
    assert.equal(dati['@type'], 'VideoGame');
    assert.equal(dati.image, 'https://plurifin.app/assets/og-rollquest.png', `${lingua}/games: dati strutturati`);
    assert.match(g, /<meta property="og:image:width" content="1200"/);
    for (const pagina of ['index', 'press', 'finance']) {
      assert.equal(social(html(lingua, pagina)), 'https://plurifin.app/assets/og-image.png', `${lingua}/${pagina}`);
    }
  }
});

test('stampa: i due file del marchio del gioco sono scaricabili, in sei lingue, e stanno nella build', async () => {
  for (const nome of ['rollquest-wordmark.png', 'rollquest-wordmark-targa.png']) {
    assert.ok(existsSync(path.join(DIST, 'assets', nome)), `manca assets/${nome} nella build`);
  }
  for (const lingua of LINGUE) {
    const h = html(lingua, 'press');
    const t = await testi(lingua);
    const voci = t.stampa.materiali.voci;
    for (const [i, href] of [[2, '/assets/rollquest-wordmark-targa.png'], [3, '/assets/rollquest-wordmark.png']]) {
      const legame = new RegExp(`<dt><a href="${href.replace(/[.]/g, '\\.')}">([^<]*)</a></dt>`).exec(h);
      assert.ok(legame, `${lingua}/press: manca il collegamento a ${href}`);
      assert.equal(legame[1].replace(/&#39;|&#x27;/g, '\'').replace(/&amp;/g, '&'), voci[i].termine, `${lingua}/press: termine del materiale ${i + 1}`);
    }
    // Sulla pagina Stampa (di giorno) il marchio non compare come insegna: e' un collegamento a un file.
    assert.equal(insegne(h).length, 0, `${lingua}/press: insegna sul giorno`);
  }
});
