// I CONTRATTI SUL SITO COSTRUITO (S384). Leggono dist/ (o la cartella in
// SITO_DIST, come gli altri file di questa cartella): si lanciano DOPO la
// build con `npm run test:dist`. Se dist/ non c'e' il primo test FALLISCE, non
// salta: un contratto che salta in silenzio non e' un contratto.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = process.env.SITO_DIST ? path.resolve(process.env.SITO_DIST) : path.join(SITO, 'dist');
const pagina = (nome) => readFileSync(path.join(DIST, nome), 'utf8');
const politica = (html) => {
  const m = html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/i);
  return m ? m[1] : null;
};
const direttiva = (csp, nome) => (csp.split(';').map((d) => d.trim()).find((d) => d.startsWith(`${nome} `)) ?? '');
const testoVisibile = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

test('dist esiste: la build e\' stata fatta', () => {
  assert.ok(existsSync(path.join(DIST, 'index.html')), 'manca dist/index.html: lancia prima `npm run build`');
});

test('prima pagina: politica di sicurezza a hash, senza unsafe-* e senza attributi style', () => {
  const html = pagina('index.html');
  const csp = politica(html);
  assert.ok(csp, 'manca il meta della politica di sicurezza');
  assert.match(direttiva(csp, 'default-src'), /'self'/);
  assert.match(direttiva(csp, 'script-src'), /'sha256-/);
  assert.ok(!/unsafe-inline|unsafe-eval/.test(csp), `politica larga: ${csp.slice(0, 200)}`);
  assert.match(direttiva(csp, 'object-src'), /'none'/);
  assert.equal((html.match(/\sstyle="/g) ?? []).length, 0, 'attributi style nella prima pagina');
  assert.ok(!/<script(?![^>]*type="(module|application\/ld\+json)")[^>]*>/.test(html), 'script non modulo nella prima pagina');
  assert.ok(!/https?:\/\/(?!plurifin\.app|schema\.org|github\.com\/lunapiena49|play\.google\.com)[a-z0-9.-]+\//i.test(html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')),
    'la prima pagina nomina un host estraneo');
});

test('la deroga agli attributi style non c\'e\' piu\' in nessuna pagina, in nessuna lingua', () => {
  // S384, corsia B6: fino a ieri le pagine del telaio vecchio (campione:
  // `/en/finance`) si prendevano `style-src-attr` con la sorgente unsafe. Tolto
  // il telaio vecchio, il campione e' diventato tutto il sito.
  let lette = 0;
  const visita = (dir) => {
    for (const f of readdirSync(path.join(DIST, dir), { withFileTypes: true })) {
      const rel = path.join(dir, f.name);
      if (f.isDirectory()) { if (!['_assets', 'assets'].includes(f.name)) visita(rel); continue; }
      if (!f.name.endsWith('.html')) continue;
      const html = pagina(rel);
      if (/http-equiv="refresh"/.test(html)) continue;
      const csp = politica(html);
      assert.ok(csp, `${rel}: senza politica di sicurezza`);
      assert.ok(!/style-src-attr|unsafe-/.test(csp), `${rel}: la deroga e' tornata`);
      lette += 1;
    }
  };
  visita('');
  assert.ok(lette >= 91, `pagine lette: ${lette}`);
  assert.ok(!/style-src-attr/.test(politica(pagina(path.join('en', 'finance.html')))), 'il campione di prima');
});

test('dati strutturati: in ogni pagina il blocco si chiude dove deve, senza "<" dentro, e si legge come JSON', () => {
  // S384, revisione di chiusura: il testo di ogni blocco esce da
  // `datiStrutturati` (src/lib/dati-strutturati.mjs), che scappa `<`. Un `<`
  // dentro un blocco vuol dire che un testo e' arrivato in pagina senza passare
  // di li'; un blocco che non si legge vuol dire che un `</script>` in un testo
  // l'ha chiuso a meta', e il resto e' diventato HTML della pagina.
  let pagine = 0;
  let blocchi = 0;
  const visita = (dir) => {
    for (const f of readdirSync(path.join(DIST, dir), { withFileTypes: true })) {
      const rel = path.join(dir, f.name);
      if (f.isDirectory()) { if (!['_assets', 'assets'].includes(f.name)) visita(rel); continue; }
      if (!f.name.endsWith('.html')) continue;
      const html = pagina(rel);
      if (/http-equiv="refresh"/.test(html)) continue;
      const nominati = html.split('application/ld+json').length - 1;
      const letti = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      assert.ok(letti.length >= 1, `${rel}: senza dati strutturati`);
      assert.equal(letti.length, nominati, `${rel}: un blocco ld+json aperto e non letto`);
      for (const m of letti) {
        assert.ok(!m[1].includes('<'), `${rel}: un "<" dentro i dati strutturati`);
        let dati;
        assert.doesNotThrow(() => { dati = JSON.parse(m[1]); }, `${rel}: dati strutturati illeggibili`);
        assert.equal(dati['@context'], 'https://schema.org', `${rel}: contesto`);
        assert.equal(typeof dati['@type'], 'string', `${rel}: tipo`);
        blocchi += 1;
      }
      pagine += 1;
    }
  };
  visita('');
  assert.ok(pagine >= 91, `pagine lette: ${pagine}`);
  // Sei in piu': il blocco FAQPage delle Domande, una per lingua.
  assert.ok(blocchi >= pagine + 6, `blocchi letti: ${blocchi} su ${pagine} pagine`);
});

test('prima pagina: il testo c\'e\' tutto senza JavaScript', () => {
  const html = pagina('index.html');
  const testo = testoVisibile(html);
  for (const frase of ['tira i dadi di notte', 'Undici estratti conto, un solo portafoglio', 'la torre si sale un dado alla volta', 'Strumenti seri, e giochi che si accendono', 'Filippo Salemi, fondatore e CEO']) {
    assert.ok(testo.includes(frase), `manca: ${frase}`);
  }
  assert.ok(testo.split(' ').length > 700, 'prima pagina troppo corta');
  assert.ok(!/class="[^"]*\breveal\b/.test(html), 'tornano le rivelazioni che nascondono il testo');
});

test('prima pagina: canonical alla radice, sei hreflang, una sola h1', () => {
  const html = pagina('index.html');
  assert.match(html, /<link rel="canonical" href="https:\/\/plurifin\.app\/">/);
  assert.equal((html.match(/<link rel="alternate" hreflang="/g) ?? []).length, 7);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  assert.match(html, /<html lang="it"/);
});

test('prima pagina: undici estratti nel palco e un dado a sei facce con ventuno punti', () => {
  const html = pagina('index.html');
  assert.equal((html.match(/class="foglio"/g) ?? []).length, 11);
  assert.equal((html.match(/class="faccia"/g) ?? []).length, 6);
  const dado = html.slice(html.indexOf('class="dado"'), html.indexOf('</div></div></div></div></div>', html.indexOf('class="dado"')));
  assert.equal((dado.match(/<i><\/i>/g) ?? []).length, 21);
  assert.equal((html.match(/class="accesa"/g) ?? []).length, 3);
});

test('prima pagina: il listino di mercato e\' testo, con la data della seduta', () => {
  const html = pagina('index.html');
  if (!html.includes('class="quotazioni"')) {
    assert.ok(!html.includes('mercato-titolo'), 'blocco mercato pubblicato a meta\'');
    return;
  }
  assert.equal((html.match(/class="quotazioni"/g) ?? []).length, 2);
  assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}">/);
  const simboli = [...html.matchAll(/<th scope="row" translate="no">([^<]*)<\/th>/g)].map((m) => m[1]);
  assert.equal(simboli.length, 6);
  for (const s of simboli) assert.match(s, /^[A-Z0-9.-]{1,12}$/);
});

test('prima pagina: nessun pulsante verso Google Play finche\' pmSuPlay e\' falso', () => {
  const html = pagina('index.html');
  const stato = readFileSync(path.join(SITO, 'src', 'lib', 'stato.ts'), 'utf8');
  const suPlay = /export const pmSuPlay = true;/.test(stato);
  assert.equal(html.includes('play.google.com'), suPlay);
  assert.ok(html.includes('href="/app/"'), 'manca l\'invito alla demo web');
});

test('peso: la prima pagina e i suoi file restano sotto 600 KB', () => {
  const html = pagina('index.html');
  const file = new Set(['index.html']);
  for (const m of html.matchAll(/(?:src|href)="(\/(?:_assets|assets)\/[^"]+)"/g)) file.add(m[1].slice(1));
  const css = [...file].filter((f) => f.endsWith('.css')).map((f) => pagina(f)).join('\n');
  for (const m of css.matchAll(/url\(["']?(\/assets\/fonts\/[^"')]+)/g)) file.add(m[1].slice(1));
  let byte = 0;
  for (const f of file) byte += statSync(path.join(DIST, f)).size;
  assert.ok(byte < 600 * 1024, `la prima pagina pesa ${byte} byte in ${file.size} file`);
  assert.ok(file.size >= 12, `conteggio dei file sospetto: ${file.size}`);
});

test('servizio: /home rimanda a /, la 404 esiste in sei lingue, security.txt c\'e\'', () => {
  const home = pagina('home.html');
  assert.match(home, /http-equiv="refresh" content="0;url=\/"/);
  const smarrita = pagina('404.html');
  assert.match(smarrita, /<meta name="robots" content="noindex">/);
  for (const l of ['en', 'es', 'fr', 'de', 'pt']) assert.match(smarrita, new RegExp(`<section lang="${l}"`));
  const sicurezza = pagina(path.join('.well-known', 'security.txt'));
  assert.match(sicurezza, /^Contact: mailto:info@plurifin\.app$/m);
  const scade = new Date(sicurezza.match(/^Expires: (.+)$/m)[1]);
  assert.ok(scade.getTime() > Date.now(), 'security.txt scaduto');
  assert.ok(!existsSync(path.join(DIST, 'provino-scena.html')), 'pagina di prova nel sito');
  assert.ok(!pagina('sitemap.xml').includes('/404'), 'la 404 e\' nella sitemap');
  assert.ok(!pagina('sitemap.xml').includes('plurifin.app/home<'), '/home e\' nella sitemap');
});
