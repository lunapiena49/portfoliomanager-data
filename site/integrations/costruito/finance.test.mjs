// I CONTRATTI SULLA PAGINA FINANCE COSTRUITA (S384, corsia B1). Leggono dist/:
// si lanciano DOPO la build con `npm run test:dist`. Senza dist/ il primo test
// FALLISCE, non salta.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

// Con `SITO_DIST=<cartella>` legge una build fatta altrove (`astro build --outDir`).
const DIST = process.env.SITO_DIST
  ? path.resolve(process.env.SITO_DIST)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const leggi = (nome) => readFileSync(path.join(DIST, nome), 'utf8');
const politica = (html) => {
  const m = html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/i);
  return m ? m[1] : null;
};
const testoVisibile = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&#39;|&apos;/g, "'").replace(/\s+/g, ' ');

test('finance: la pagina costruita esiste', () => {
  assert.ok(existsSync(path.join(DIST, 'finance.html')), 'manca dist/finance.html: lancia prima `npm run build`');
});

test('finance: politica di sicurezza a hash, senza unsafe-*, senza attributi style, senza host estranei', () => {
  const html = leggi('finance.html');
  const csp = politica(html);
  assert.ok(csp, 'manca il meta della politica di sicurezza');
  assert.match(csp, /script-src[^;]*'sha256-/);
  assert.ok(!/unsafe-inline|unsafe-eval|style-src-attr/.test(csp), `politica larga: ${csp.slice(0, 200)}`);
  assert.equal((html.match(/\sstyle="/g) ?? []).length, 0, 'attributi style nella pagina Finance');
  assert.ok(!/<script(?![^>]*type="(module|application\/ld\+json)")[^>]*>/.test(html), 'script non modulo');
  assert.ok(!/https?:\/\/(?!plurifin\.app|schema\.org|github\.com\/lunapiena49|play\.google\.com)[a-z0-9.-]+\//i.test(html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')),
    'la pagina nomina un host estraneo');
});

test('finance: canonical, sei lingue, una sola h1, dati strutturati senza offerte a pagamento prima di Google Play', () => {
  const html = leggi('finance.html');
  assert.match(html, /<link rel="canonical" href="https:\/\/plurifin\.app\/finance">/);
  assert.equal((html.match(/<link rel="alternate" hreflang="/g) ?? []).length, 7);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  assert.match(html, /<html lang="it"/);
  const dati = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(dati['@type'], 'SoftwareApplication');
  // stato.ts si legge dal sito, non da accanto alla build: con SITO_DIST la build sta altrove.
  const sito = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const suPlay = /export const pmSuPlay = true;/.test(readFileSync(path.join(sito, 'src', 'lib', 'stato.ts'), 'utf8'));
  if (!suPlay) assert.deepEqual(dati.offers.map((o) => o.price), ['0.00']);
  assert.equal(html.includes('play.google.com'), suPlay, 'Google Play in pagina non segue pmSuPlay');
  assert.ok(html.includes('href="/app/"'), 'manca l\'invito alla demo web');
});

test('finance: tutto il testo c\'e\' senza JavaScript', () => {
  const html = leggi('finance.html');
  const testo = testoVisibile(html);
  for (const frase of ['rimette insieme i conti che i broker tengono separati', 'Undici formati, una sola tabella',
    'Che cosa si vede, una volta riuniti i conti', 'Dove stanno i dati, detto per esteso', 'Quanto costa',
    'Provarla, prima di fidarsi', 'Le domande da fare', 'non esegue ordini', 'D.Lgs. 58/1998']) {
    assert.ok(testo.includes(frase), `manca: ${frase}`);
  }
  assert.ok(testo.split(' ').length > 800, `pagina corta: ${testo.split(' ').length} parole`);
  assert.ok(!/class="[^"]*\breveal\b/.test(html), 'tornano le rivelazioni che nascondono il testo');
  assert.ok(!/<details/.test(html.slice(html.indexOf('<main'), html.indexOf('</main>'))), 'testo chiuso in una fisarmonica');
});

test('finance: undici estratti nel palco, undici broker in elenco, quattro schermate vere con testo alternativo', () => {
  const html = leggi('finance.html');
  assert.equal((html.match(/class="fin-foglio"/g) ?? []).length, 11);
  const elenco = html.slice(html.indexOf('class="fin-broker"'), html.indexOf('</ul>', html.indexOf('class="fin-broker"')));
  assert.equal((elenco.match(/<li/g) ?? []).length, 11);
  const schermate = [...html.matchAll(/<img class="fin-schermata"[^>]*>/g)].map((m) => m[0]);
  assert.equal(schermate.length, 4);
  for (const img of schermate) {
    assert.match(img, /src="\/_assets\/[^"]+\.webp"/);
    assert.match(img, /alt="[^"]{40,}"/);
    assert.match(img, /width="488" height="1084"/);
    const file = img.match(/src="\/([^"]+)"/)[1];
    assert.ok(statSync(path.join(DIST, file)).size > 5000, `${file} vuoto`);
  }
  const scelte = [...html.matchAll(/<input class="fin-scelta"[^>]*>/g)].map((m) => m[0]);
  assert.equal(scelte.length, 4);
  assert.equal(scelte.filter((s) => /\schecked/.test(s)).length, 1, 'una e una sola scheda spuntata a riposo');
  assert.match(scelte[0], /\schecked/);
  assert.equal((html.match(/<label for="schermata-\d"/g) ?? []).length, 4);
  assert.match(html, /<legend class="fin-legenda">[^<]+<\/legend>/);
});

test('finance: il listino ha quattro righe con prezzo in euro e la nota', () => {
  const html = leggi('finance.html');
  const tabella = html.slice(html.indexOf('class="listino fin-listino"'), html.indexOf('</table>', html.indexOf('class="listino fin-listino"')));
  const prezzi = [...tabella.matchAll(/<td>([^<]+)<\/td>/g)].map((m) => m[1]);
  assert.equal(prezzi.length, 4);
  for (const p of prezzi) assert.match(p, /^\d{1,2},\d{2} €/, `prezzo mal formato: ${p}`);
  assert.equal((tabella.match(/<th scope="row"/g) ?? []).length, 4);
  assert.match(tabella, /<caption>[^<]{20,}<\/caption>/);
});

test('finance: i passi dicono al palco che cosa fare, e l\'ultimo porta l\'ultima schermata', () => {
  const html = leggi('finance.html');
  const passi = [...html.matchAll(/<div class="passo fin-passo"[^>]*>/g)].map((m) => m[0]);
  assert.ok(passi.length >= 3, `passi: ${passi.length}`);
  assert.ok(passi.filter((p) => /data-fogli/.test(p)).length >= 1, 'nessun passo muove gli estratti');
  assert.match(passi[passi.length - 1], /data-schermi="3"/);
  for (const p of passi) assert.ok(/data-fogli/.test(p) || /data-schermi="[0-3 ]+"/.test(p), `passo senza istruzioni: ${p}`);
  assert.match(html, /<section class="finance" data-telefono/);
});

// Misurato alla consegna: 528.991 byte in 14 file (i quattro font del telaio
// pesano la meta'). La soglia lascia un margine di trenta KB, non di piu'.
test('finance: peso della pagina e dei suoi file sotto 560 KB', () => {
  const html = leggi('finance.html');
  const file = new Set(['finance.html']);
  for (const m of html.matchAll(/(?:src|href)="(\/(?:_assets|assets)\/[^"]+)"/g)) file.add(m[1].slice(1));
  const css = [...file].filter((f) => f.endsWith('.css')).map((f) => leggi(f)).join('\n');
  for (const m of css.matchAll(/url\(["']?(\/assets\/fonts\/[^"')]+)/g)) file.add(m[1].slice(1));
  let byte = 0;
  for (const f of file) byte += statSync(path.join(DIST, f)).size;
  assert.ok(byte < 560 * 1024, `la pagina Finance pesa ${byte} byte in ${file.size} file`);
  assert.ok(file.size >= 8, `conteggio dei file sospetto: ${file.size}`);
});
