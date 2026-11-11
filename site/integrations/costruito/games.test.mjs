// I CONTRATTI SULLA PAGINA GAMES COSTRUITA (S384, corsia B2). Leggono dist/:
// si lanciano DOPO la build con `npm run test:dist`. Con `SITO_DIST=<cartella>`
// leggono una build fatta altrove (`astro build --outDir`). Se la build non
// c'e' il primo test FALLISCE, non salta.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { ASCESE, MOSTRATE } from '../../src/components/giorno/games/salita-conti.mjs';

const DIST = process.env.SITO_DIST
  ? path.resolve(process.env.SITO_DIST)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const html = () => readFileSync(path.join(DIST, 'games.html'), 'utf8');
const politica = (h) => (h.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/i) ?? [])[1] ?? null;
const testoVisibile = (h) =>
  h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const conta = (h, re) => (h.match(re) ?? []).length;

test('games: la pagina costruita esiste', () => {
  assert.ok(existsSync(path.join(DIST, 'games.html')), `manca ${path.join(DIST, 'games.html')}: lancia prima la build`);
});

test('games: politica di sicurezza a hash, senza unsafe-*, senza attributi style ne\' host estranei', () => {
  const h = html();
  const csp = politica(h);
  assert.ok(csp, 'manca il meta della politica di sicurezza');
  assert.ok(!/unsafe-inline|unsafe-eval|style-src-attr/.test(csp), `politica larga: ${csp.slice(0, 200)}`);
  assert.match(csp, /script-src[^;]*'sha256-/);
  assert.equal(conta(h, /\sstyle="/g), 0, 'attributi style nella pagina');
  assert.ok(!/<script(?![^>]*type="(module|application\/ld\+json)")[^>]*>/.test(h), 'script non modulo');
  assert.ok(!/https?:\/\/(?!plurifin\.app|schema\.org|github\.com\/lunapiena49)[a-z0-9.-]+\//i.test(h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')),
    'la pagina nomina un host estraneo');
});

test('games: il testo c\'e\' tutto senza JavaScript, una sola h1, sei capitoli', () => {
  const h = html();
  const testo = testoVisibile(h);
  for (const frase of ['porta il gioco da tavolo in cima a una torre', 'Come si gioca', 'La regola dei soldi', 'A che punto', 'Giocatori dai sedici anni in su', 'non vengono dal gioco']) {
    assert.ok(testo.includes(frase), `manca: ${frase}`);
  }
  assert.ok(testo.split(' ').length > 500, 'pagina troppo corta');
  assert.equal(conta(h, /<h1[\s>]/g), 1);
  assert.equal(conta(h, /class="tappa[^"]*" data-tappa/g), 7, 'apertura e sei capitoli');
  assert.equal(conta(h, /<svg class="segno"/g), 6, 'un segno di dado per capitolo');
  assert.match(h, /<html lang="it"/);
  assert.match(h, /<link rel="canonical" href="https:\/\/plurifin\.app\/games">/);
  assert.equal(conta(h, /<link rel="alternate" hreflang="/g), 7);
  assert.ok(!/class="[^"]*\breveal\b/.test(h), 'tornano le rivelazioni che nascondono il testo');
});

test('games: il palco ha dodici tratti, otto col fregio e la loro luce e quattro in sagoma, dodici tacche e un dado vero', () => {
  const h = html();
  const palco = (h.match(/<div class="volta"[\s\S]*?<\/main>/) ?? [''])[0];
  assert.match(palco, /^<div class="volta" data-scena-salita aria-hidden="true"/);
  assert.equal(MOSTRATE, 8, 'le Ascese mostrate sono cambiate: rivedere i conti di questo contratto');
  assert.equal(conta(palco, /<div class="tratto[ "]/g), ASCESE);
  assert.equal(conta(palco, /<div class="tratto"/g), MOSTRATE, 'tratti col fregio');
  assert.equal(conta(palco, /<div class="tratto tratto-celato"/g), ASCESE - MOSTRATE, 'tratti in sagoma');
  assert.equal(conta(palco, /class="lume"/g), MOSTRATE);
  assert.equal(conta(palco, /_spenta\.[A-Za-z0-9_-]+\.webp/g), MOSTRATE);
  assert.equal(conta(palco, /_luce\.[A-Za-z0-9_-]+\.webp/g), MOSTRATE);
  // Dall'alto: prima i quattro in sagoma (12..9), poi gli otto col fregio, dall'ottavo al primo.
  const ordine = [...palco.matchAll(/<div class="tratto( tratto-celato)?">\s*<img src="\/_assets\/([a-z0-9_]+)\./g)].map((m) => m[2]);
  assert.deepEqual(ordine, [
    ...Array.from({ length: ASCESE - MOSTRATE }, () => 'spr_tower_seg_a2_sagoma'),
    ...Array.from({ length: MOSTRATE }, (_, k) => `spr_tower_seg_a${MOSTRATE - k}_spenta`),
  ]);
  // Un tratto in sagoma porta una sola immagine: niente luce, niente fregio.
  for (const celato of palco.match(/<div class="tratto tratto-celato">[\s\S]*?<\/div>/g) ?? []) {
    assert.equal(conta(celato, /<img /g), 1, 'un tratto in sagoma con piu\' di un\'immagine');
  }
  assert.match(palco, /<img class="guglia" src="\/_assets\/spr_summit_corvax_sagoma\./, 'sopra la sagoma la cima e\' in sagoma');
  assert.equal(conta(palco, /<span class="tacca"/g), ASCESE);
  assert.equal(conta(palco, /<div class="lato"/g), 6);
  assert.equal(conta(palco, /<i><\/i>/g), 21, 'un dado ha ventuno punti');
  // A riposo (senza script) il dado e' fermo sul sei: la faccia "dietro" e' in luce.
  const toni = [...palco.matchAll(/<div class="lato" data-tono="([a-z]+)"/g)].map((m) => m[1]);
  assert.equal(toni[2], 'alto');
  // A riposo la camera e' ferma sull'ultima Ascesa mostrata, e l'etichetta la nomina.
  assert.ok(new RegExp(`data-quota[^>]*>Ascesa ${MOSTRATE}<`).test(palco), 'a riposo l\'etichetta non nomina l\'ultima Ascesa mostrata');
  assert.ok(/data-quota[^>]* data-cima="In cima"/.test(palco), 'manca la parola della cima per lo script');
  assert.equal(conta(palco, /<img(?![^>]*\balt="")/g), 0, 'immagini decorative senza alt vuoto');
});

/** Ogni file sotto `dir`, come percorso relativo con le barre dritte. */
function tutti(dir, base = dir) {
  const out = [];
  for (const voce of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, voce.name);
    if (voce.isDirectory()) out.push(...tutti(p, base));
    else out.push(path.relative(base, p).split(path.sep).join('/'));
  }
  return out;
}
/** Il nome dell'immagine di un'Ascesa non mostrata dentro `testo`, o null. */
function celata(testo) {
  for (const m of testo.matchAll(/spr_tower_seg_a(\d+)/g)) if (Number(m[1]) > MOSTRATE) return m[0];
  return null;
}

test('costruito: nessuna immagine di un\'Ascesa non mostrata, nemmeno come file che nessuno chiama', () => {
  assert.equal(celata('a/spr_tower_seg_a9_spenta.x.webp'), 'spr_tower_seg_a9', 'la sonda non vede un\'Ascesa nascosta');
  assert.equal(celata('a/spr_tower_seg_a8_luce.x.webp b/spr_tower_seg_a2_sagoma.y.webp'), null);
  const file = tutti(DIST);
  assert.ok(file.length > 100, `costruito troppo piccolo: ${file.length} file`);
  // 1. Nessun file, in nessuna cartella, porta il nome di un'Ascesa non mostrata.
  for (const f of file) assert.equal(celata(f), null, `${f}: immagine di un'Ascesa non mostrata nel costruito`);
  // 2. Nessuna pagina, foglio di stile o script la nomina.
  const testi = file.filter((f) => /\.(html|css|js|mjs|json|xml|txt|webmanifest)$/.test(f));
  assert.ok(testi.length >= 91, `pochi file di testo letti: ${testi.length}`);
  const corpo = new Map(testi.map((f) => [f, readFileSync(path.join(DIST, f), 'utf8')]));
  for (const [f, testo] of corpo) assert.equal(celata(testo), null, `${f}: nomina l'immagine di un'Ascesa non mostrata`);
  // 3. Le immagini della Torre nel costruito sono ESATTAMENTE quelle del
  //    registro, e ognuna e' chiamata da almeno una pagina: nessun file orfano.
  const sito = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const registro = JSON.parse(readFileSync(path.join(sito, 'src', 'assets', 'torre', 'PROVENIENZA.json'), 'utf8'));
  const attese = Object.values(registro.immagini).flatMap((v) => Object.keys(v.uscite)).map((f) => f.replace(/\.webp$/, '')).sort();
  const torre = file.filter((f) => /(^|\/)spr_[a-z0-9_]+\.[^/]*$/.test(f));
  const nomi = torre.map((f) => f.split('/').pop().split('.')[0]).sort();
  assert.deepEqual(nomi, attese, 'le immagini della Torre nel costruito non sono quelle del registro');
  assert.equal(torre.length, 2 * MOSTRATE + 6, `immagini della Torre nel costruito: ${torre.length}`);
  const pagine = [...corpo].filter(([f]) => f.endsWith('.html'));
  for (const f of torre) {
    assert.ok(pagine.some(([, testo]) => testo.includes(`/${f}`)), `${f}: nel costruito ma nessuna pagina la chiama`);
  }
});

test('costruito: la prima pagina mostra solo Ascese gia\' mostrate, in tutte e sei le lingue', () => {
  for (const f of ['index.html', 'en.html', 'es.html', 'fr.html', 'de.html', 'pt.html']) {
    const h = readFileSync(path.join(DIST, f), 'utf8');
    const segmenti = [...h.matchAll(/\/_assets\/spr_tower_seg_a(\d+)_spenta\./g)].map((m) => Number(m[1]));
    assert.deepEqual(segmenti, [3, 2, 1], `${f}: i tratti della prima pagina`);
    assert.ok(segmenti.every((n) => n <= MOSTRATE), `${f}: un tratto oltre le Ascese mostrate`);
    assert.equal(celata(h), null, `${f}: nomina l'immagine di un'Ascesa non mostrata`);
  }
});

test('games: in sviluppo, quindi niente store, niente moduli, niente date', () => {
  const h = html();
  assert.ok(!/play\.google\.com|apps\.apple\.com/.test(h), 'collegamento a uno store');
  assert.ok(!/<form|<input|<button/.test(h.replace(/<header[\s\S]*?<\/header>/, '')), 'un modulo o un bottone nella pagina');
  assert.ok(!/\b20(2[6-9]|3\d)\b/.test(testoVisibile(h).replace(/© 2026 PluriFin/, '')), 'una data nel testo');
});

test('games: la pagina e i file che chiama (font esclusi) restano sotto 450 KB', () => {
  const h = html();
  const chiamati = new Set([...h.matchAll(/(?:href|src)="(\/_assets\/[^"]+)"/g)].map((m) => m[1]));
  let byte = statSync(path.join(DIST, 'games.html')).size;
  for (const f of chiamati) byte += statSync(path.join(DIST, f)).size;
  // Almeno le immagini della Torre (due per Ascesa mostrata, due sagome, cielo,
  // nubi della base e del sigillo), un foglio di stile e uno script. Erano 30
  // con dodici Ascese mostrate: le quattro tolte non si scaricano piu'.
  assert.ok(chiamati.size >= 2 * MOSTRATE + 5 + 2, `pochi file chiamati: ${chiamati.size}`);
  assert.ok(byte < 450 * 1024, `la pagina pesa ${byte} byte`);
});

test('games: le altre cinque lingue stanno sulla stessa pagina, con la stessa Torre e nella loro lingua', () => {
  // S384, corsia B6: prima bastava che esistessero, sul telaio vecchio.
  const italiana = html();
  const tratti = conta(italiana, /class="tratto[ "]/g);
  assert.equal(tratti, ASCESE, `tratti della Torre nell'italiana: ${tratti}`);
  const celati = conta(italiana, /class="tratto tratto-celato"/g);
  assert.equal(celati, ASCESE - MOSTRATE, `tratti in sagoma nell'italiana: ${celati}`);
  const immagini = [...italiana.matchAll(/\/_assets\/(spr_[a-z0-9_]+\.[A-Za-z0-9_-]+\.webp)/g)].map((m) => m[1]);
  assert.ok(conta(italiana, /data-scena-salita/g) >= 1, 'manca il palco della salita');
  for (const l of ['en', 'es', 'fr', 'de', 'pt']) {
    const file = path.join(DIST, l, 'games.html');
    assert.ok(existsSync(file), `manca ${l}/games.html`);
    const h = readFileSync(file, 'utf8');
    assert.match(h, new RegExp(`<html lang="${l}"`), `${l}: lingua`);
    assert.ok(!/unsafe-inline|unsafe-eval|style-src-attr/.test(politica(h)), `${l}: politica larga`);
    assert.equal(conta(h, /\sstyle="/g), 0, `${l}: attributi style`);
    assert.equal(conta(h, /class="tratto[ "]/g), tratti, `${l}: tratti della Torre`);
    assert.equal(conta(h, /class="tratto tratto-celato"/g), celati, `${l}: tratti in sagoma`);
    assert.deepEqual([...h.matchAll(/\/_assets\/(spr_[a-z0-9_]+\.[A-Za-z0-9_-]+\.webp)/g)].map((m) => m[1]), immagini, `${l}: le immagini della Torre`);
    // A riposo l'etichetta nomina l'ultima Ascesa mostrata, con la parola della lingua.
    const quota = h.match(/data-quota data-ascesa="([^"]+)" data-cima="[^"]+">([^<]*)</);
    assert.ok(quota, `${l}: manca l'etichetta dell'Ascesa`);
    assert.equal(quota[2], `${quota[1]} ${MOSTRATE}`, `${l}: l'etichetta di riposo`);
    assert.equal(conta(h, /data-scena-salita/g), conta(italiana, /data-scena-salita/g), `${l}: il palco della salita`);
    assert.equal(conta(h, /<h1[\s>]/g), 1, `${l}: h1`);
    assert.match(h, new RegExp(`<link rel="canonical" href="https://plurifin\\.app/${l}/games">`), `${l}: canonical`);
    assert.ok(testoVisibile(h).split(' ').length > 400, `${l}: testo troppo corto`);
    assert.ok(testoVisibile(h) !== testoVisibile(italiana), `${l}: e' la pagina italiana`);
  }
});
