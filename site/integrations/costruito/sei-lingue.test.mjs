// I CONTRATTI DELLE SEI LINGUE SUL SITO COSTRUITO (S384, corsia B6). Leggono
// dist/ (o la cartella in SITO_DIST): si lanciano DOPO la build con
// `npm run test:dist`. Se la build non c'e' il primo test FALLISCE, non salta.
//
// Sostituiscono i contratti che descrivevano la convivenza dei due telai
// ("le altre cinque lingue costruiscono ancora, ognuna sul suo telaio"): ora
// il telaio e' uno, e si verifica cio' che un motore di ricerca e un lettore
// trovano davvero: indirizzi, canonical, hreflang reciproci, sitemap, 404,
// politica di sicurezza unica, peso per pagina e per lingua.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { formatoNativo, prezziIn } from '../prezzi-nativi.mjs';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const SITO = path.resolve(QUI, '..', '..');
const DIST = process.env.SITO_DIST ? path.resolve(process.env.SITO_DIST) : path.join(SITO, 'dist');
const ORIGINE = 'https://plurifin.app';
const LINGUE = ['it', 'en', 'es', 'fr', 'de', 'pt'];
const ROTTE = ['', 'finance', 'games', 'about', 'press', 'pricing', 'faq', 'contact', 'blog', 'privacy', 'terms', 'disclaimer', 'dmca'];
const pmSuPlay = /export const pmSuPlay = true;/.test(readFileSync(path.join(SITO, 'src', 'lib', 'stato.ts'), 'utf8'));

const leggi = (rel) => readFileSync(path.join(DIST, rel), 'utf8');
const politica = (html) => (html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/i) ?? [])[1] ?? '';
const canonical = (html) => (html.match(/<link rel="canonical" href="([^"]+)">/) ?? [])[1] ?? null;
const alternati = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map((m) => ({ lingua: m[1], href: m[2] }));
// Si stringono solo spazi, tabulazioni e a capo: `\s` prenderebbe anche lo
// spazio non separabile, che qui e' proprio cio' che si misura.
const testoVisibile = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&#39;|&apos;/g, '\'').replace(/&amp;/g, '&').replace(/[ \t\r\n]+/g, ' ');

/** L'indirizzo di una pagina della matrice. */
export function indirizzo(lingua, rotta) {
  const coda = [lingua === 'it' ? '' : lingua, rotta].filter(Boolean).join('/');
  return coda ? `${ORIGINE}/${coda}` : `${ORIGINE}/`;
}

/** Dall'indirizzo al file costruito (`build.format: 'file'`): `null` se non e' di questo sito. */
export function fileDi(url) {
  if (url === `${ORIGINE}/`) return 'index.html';
  if (!url.startsWith(`${ORIGINE}/`) || url.endsWith('/')) return null;
  const coda = url.slice(ORIGINE.length + 1);
  return /\.[a-z0-9]+$/i.test(coda) ? coda : `${coda}.html`;
}

/** Ogni file .html costruito, diviso fra pagine vere e rimandi. */
function censimento() {
  const pagine = new Map();
  const rimandi = new Map();
  const visita = (dir) => {
    for (const f of readdirSync(path.join(DIST, dir), { withFileTypes: true })) {
      const rel = path.posix.join(dir, f.name);
      if (f.isDirectory()) {
        if (!['_assets', 'assets', 'app', 'legal', 'market-data'].includes(rel)) visita(rel);
      } else if (f.name.endsWith('.html')) {
        const html = leggi(rel);
        const salto = html.match(/http-equiv="refresh" content="0;url=([^"]+)"/);
        if (salto) rimandi.set(rel, salto[1]);
        else pagine.set(rel, html);
      }
    }
  };
  visita('');
  return { pagine, rimandi };
}

test('dist esiste: la build e\' stata fatta', () => {
  assert.ok(existsSync(path.join(DIST, 'index.html')), `manca index.html in ${DIST}: lancia prima \`npm run build\``);
});

test('matrice: sei lingue per tredici pagine, ognuna nella sua lingua, col suo canonical e una sola h1', () => {
  let viste = 0;
  for (const lingua of LINGUE) {
    for (const rotta of ROTTE) {
      const url = indirizzo(lingua, rotta);
      const rel = fileDi(url);
      assert.ok(existsSync(path.join(DIST, rel)), `manca ${rel}`);
      const html = leggi(rel);
      assert.match(html, new RegExp(`<html lang="${lingua}"`), `${rel}: lingua`);
      assert.equal(canonical(html), url, `${rel}: canonical`);
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${rel}: h1`);
      assert.match(html, /class="margini testata"/, `${rel}: testata del telaio nuovo`);
      assert.match(html, /<footer class="colophon"/, `${rel}: colophon`);
      assert.match(html, /<main id="testo"/, `${rel}: ancora del salto al testo`);
      assert.match(html, /<meta name="robots" content="index, follow">/, `${rel}: non indicizzabile`);
      assert.ok(testoVisibile(html).split(' ').length > 100, `${rel}: pagina quasi vuota`);
      viste += 1;
    }
  }
  assert.equal(viste, 78);
});

test('politica di sicurezza: una sola per tutte le pagine, senza deroghe, senza attributi style', () => {
  const { pagine } = censimento();
  assert.ok(pagine.size >= 91, `pagine costruite: ${pagine.size}`);
  const politiche = new Set();
  for (const [rel, html] of pagine) {
    const csp = politica(html);
    assert.ok(csp, `${rel}: manca la politica di sicurezza`);
    assert.ok(!/unsafe-inline|unsafe-eval|unsafe-hashes|style-src-attr/.test(csp), `${rel}: politica larga`);
    for (const d of ["default-src 'self'", "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-src 'none'"]) {
      assert.ok(csp.includes(d), `${rel}: manca ${d}`);
    }
    assert.equal((html.match(/\sstyle="/g) ?? []).length, 0, `${rel}: attributi style`);
    assert.ok(!/<script(?![^>]*type="(module|application\/ld\+json)")[^>]*>/.test(html), `${rel}: script non modulo`);
    assert.ok(!/<(link|script|img|source)[^>]+(?:href|src)="(?:https?:)?\/\/(?!plurifin\.app)/.test(html.replace(/<link rel="(canonical|alternate)"[^>]*>/g, '')), `${rel}: carica una risorsa da un altro host`);
    // la politica senza gli hash: deve essere la stessa ovunque
    politiche.add(csp.replace(/'sha256-[A-Za-z0-9+/=]+'/g, '').replace(/\s+/g, ' ').trim());
  }
  assert.equal(politiche.size, 1, `politiche diverse fra le pagine: ${[...politiche].join(' || ')}`);
});

test('telaio vecchio: nessuna pagina ne porta il foglio, lo script del tema, i moduli o l\'invito alla lista d\'attesa', () => {
  const { pagine } = censimento();
  const INVITI = ['Avvisami al lancio', 'Notify me at launch', 'Avísame en el lanzamiento', 'Prévenez-moi au lancement', 'Beim Start benachrichtigen', 'Avise-me no lançamento'];
  for (const [rel, html] of pagine) {
    assert.ok(!/<form\b|<textarea\b|type="email"|type="submit"/.test(html), `${rel}: un modulo`);
    assert.ok(!/tema\.js|data-theme|class="[^"]*\b(nav-inner|btn-primary|newsletter|reveal)\b/.test(html), `${rel}: markup del telaio vecchio`);
    const testo = testoVisibile(html);
    for (const invito of INVITI) assert.ok(!testo.includes(invito), `${rel}: "${invito}"`);
    assert.ok(!/subject=Avvisami/.test(html), `${rel}: collegamento della lista d'attesa`);
  }
  const fogli = readdirSync(path.join(DIST, '_assets')).filter((f) => f.endsWith('.css'));
  assert.ok(fogli.length >= 3, `fogli di stile costruiti: ${fogli.length}`);
  for (const f of fogli) {
    const css = leggi(path.posix.join('_assets', f));
    assert.ok(!/--tw-|\.nav-inner|\.btn-primary/.test(css), `${f}: regole del telaio vecchio`);
    // astro.config.mjs, cssTarget: la sintassi a intervalli fa ignorare ogni
    // media query a Safari < 16.4. Prima lo si misurava a mano a ogni upgrade.
    assert.ok(!/@media[^{]*\(\s*(width|height)\s*[<>]=?/.test(css), `${f}: media query in sintassi a intervalli`);
    assert.ok(/@media/.test(css) || css.length < 4000, `${f}: foglio senza media query`);
  }
});

test('hreflang: sette per pagina, ognuno porta a una pagina che esiste, e ogni gemella ricambia', () => {
  let coppie = 0;
  for (const lingua of LINGUE) {
    for (const rotta of ROTTE) {
      const url = indirizzo(lingua, rotta);
      const lista = alternati(leggi(fileDi(url)));
      assert.deepEqual(lista.map((a) => a.lingua), [...LINGUE, 'x-default'], `${url}: lingue degli hreflang`);
      for (const a of lista) {
        const attesa = indirizzo(a.lingua === 'x-default' ? 'it' : a.lingua, rotta);
        assert.equal(a.href, attesa, `${url}: hreflang ${a.lingua}`);
        const rel = fileDi(a.href);
        assert.ok(rel && existsSync(path.join(DIST, rel)), `${url}: hreflang ${a.lingua} porta a ${a.href}, che non esiste`);
        if (a.lingua === 'x-default') continue;
        const ritorno = alternati(leggi(rel)).find((b) => b.lingua === lingua);
        assert.equal(ritorno?.href, url, `${a.href} non ricambia l'hreflang di ${url}`);
        coppie += 1;
      }
      assert.equal(lista.find((a) => a.lingua === lingua).href, url, `${url}: non dichiara se stessa`);
    }
  }
  assert.equal(coppie, 78 * 6);
});

test('canonical: ogni pagina costruita dichiara il proprio indirizzo vero', () => {
  const { pagine } = censimento();
  for (const [rel, html] of pagine) {
    const c = canonical(html);
    assert.ok(c, `${rel}: senza canonical`);
    assert.equal(fileDi(c), rel, `${rel}: il canonical ${c} non e' l'indirizzo di questa pagina`);
    const og = (html.match(/<meta property="og:url" content="([^"]+)">/) ?? [])[1];
    assert.equal(og, c, `${rel}: og:url diverso dal canonical`);
    for (const blocco of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      const dati = JSON.parse(blocco[1]);
      if (dati.url && dati['@type'] !== 'Organization') assert.equal(dati.url, c, `${rel}: url dei dati strutturati`);
    }
  }
});

test('notizie: ogni articolo sta al suo indirizzo, lo dichiara, torna alle notizie della sua lingua ed e\' elencato solo li\'', () => {
  const { pagine } = censimento();
  const articoli = [...pagine].filter(([rel]) => rel.startsWith('blog/'));
  assert.ok(articoli.length >= 12, `articoli costruiti: ${articoli.length}`);
  const perLingua = Object.fromEntries(LINGUE.map((l) => [l, []]));
  for (const [rel, html] of articoli) {
    const lingua = html.match(/<html lang="([a-z]{2})"/)[1];
    const id = rel.replace(/^blog\//, '').replace(/\.html$/, '');
    perLingua[lingua].push(id);
    // il difetto di prima: l'articolo spagnolo dichiarava /es/blog/<id>, che non esiste
    assert.equal(canonical(html), `${ORIGINE}/blog/${id}`, `${rel}: canonical`);
    assert.equal(alternati(html).length, 0, `${rel}: hreflang su un articolo`);
    const ritorno = lingua === 'it' ? '/blog' : `/${lingua}/blog`;
    assert.ok(html.includes(`<p class="ritorno"><a href="${ritorno}">`), `${rel}: il rimando non torna a ${ritorno}`);
    assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}">/, `${rel}: data`);
    assert.match(html, /class="margini testata"/, `${rel}: telaio`);
  }
  for (const lingua of LINGUE) {
    assert.ok(perLingua[lingua].length >= 2, `${lingua}: articoli ${perLingua[lingua].length}`);
    const elenco = leggi(fileDi(indirizzo(lingua, 'blog')));
    const collegati = [...new Set([...elenco.matchAll(/href="\/blog\/([^"]+)"/g)].map((m) => m[1]).filter((id) => !id.endsWith('.xml')))];
    assert.deepEqual(collegati.sort(), perLingua[lingua].sort(), `${lingua}: l'elenco non e' quello dei suoi articoli`);
    assert.ok(elenco.includes(`href="/blog/rss-${lingua}.xml"`), `${lingua}: feed della lingua`);
    assert.ok(existsSync(path.join(DIST, 'blog', `rss-${lingua}.xml`)), `${lingua}: manca il feed`);
  }
});

test('sitemap: esattamente le pagine indicizzabili e i feed; ogni voce esiste; nessun rimando, nessuna 404', () => {
  const { pagine, rimandi } = censimento();
  const voci = [...leggi('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(new Set(voci).size, voci.length, 'voci doppie nella sitemap');
  const attese = new Set();
  for (const [rel, html] of pagine) {
    if (/<meta name="robots" content="index, follow">/.test(html)) attese.add(canonical(html));
    else assert.equal(rel, '404.html', `${rel}: pagina non indicizzabile inattesa`);
  }
  const pagineInSitemap = voci.filter((v) => !v.endsWith('.xml'));
  assert.deepEqual(pagineInSitemap.sort(), [...attese].sort());
  for (const v of voci) {
    const rel = fileDi(v);
    assert.ok(rel && existsSync(path.join(DIST, rel)), `la sitemap offre ${v}, che non esiste`);
    assert.ok(!rimandi.has(rel), `la sitemap offre un rimando: ${v}`);
  }
  assert.equal(voci.filter((v) => v.endsWith('.xml')).length, 7, 'feed nella sitemap');
  assert.ok(leggi('robots.txt').includes(`Sitemap: ${ORIGINE}/sitemap.xml`), 'robots.txt non indica la sitemap');
});

test('404 e rimandi: la pagina non trovata parla sei lingue; /home di ogni lingua rimanda alla sua prima pagina', () => {
  const smarrita = leggi('404.html');
  assert.match(smarrita, /<meta name="robots" content="noindex">/);
  assert.match(smarrita, /<html lang="it"/);
  assert.equal(alternati(smarrita).length, 0, 'la 404 non ha gemelle');
  for (const lingua of LINGUE.filter((l) => l !== 'it')) {
    const sezione = smarrita.match(new RegExp(`<section lang="${lingua}">([\\s\\S]*?)</section>`));
    assert.ok(sezione, `404: manca la sezione ${lingua}`);
    assert.match(sezione[1], new RegExp(`<a href="/${lingua}" hreflang="${lingua}">`), `404: ${lingua} non riporta alla sua prima pagina`);
    assert.ok(testoVisibile(sezione[1]).length > 60, `404: sezione ${lingua} vuota`);
  }
  assert.match(smarrita, /<a class="azione" href="\/">/);
  const { rimandi } = censimento();
  assert.equal(rimandi.get('home.html'), '/');
  for (const lingua of LINGUE.filter((l) => l !== 'it')) {
    assert.equal(rimandi.get(`${lingua}/home.html`), `/${lingua}`, `${lingua}/home`);
  }
  for (const [rel, meta] of rimandi) {
    const dove = fileDi(`${ORIGINE}${meta === '/' ? '/' : meta}`);
    assert.ok(existsSync(path.join(DIST, dove)), `${rel} rimanda a ${meta}, che non esiste`);
  }
});

test('menu delle lingue e colophon: ogni pagina offre le altre cinque, e i due punti sono quelli della lingua', () => {
  for (const lingua of LINGUE) {
    for (const rotta of ROTTE) {
      const url = indirizzo(lingua, rotta);
      const html = leggi(fileDi(url));
      const menu = html.match(/<details class="lingue">([\s\S]*?)<\/details>/)[1];
      const offerte = [...menu.matchAll(/<a href="([^"]+)" lang="([a-z]{2})" hreflang="\2">/g)].map((m) => [m[2], m[1]]);
      assert.deepEqual(offerte.map((o) => o[0]), LINGUE.filter((l) => l !== lingua), `${url}: lingue offerte`);
      for (const [l, href] of offerte) {
        assert.equal(`${ORIGINE}${href === '/' ? '/' : href}`, indirizzo(l, rotta), `${url}: il menu manda ${l} a ${href}`);
      }
      const colophon = testoVisibile(html.slice(html.indexOf('<footer class="colophon"')));
      if (lingua === 'fr') {
        assert.ok(colophon.includes('Langues\u00a0: Français'), `${url}: "Langues" senza spazio insecabile`);
        assert.ok(!/\p{L}:\s/u.test(colophon), `${url}: due punti attaccati alla parola nel colophon francese`);
      } else {
        assert.ok(!/\u00a0:/.test(colophon), `${url}: spazio prima dei due punti in ${lingua}`);
      }
    }
  }
});

test('prezzi: in ogni lingua il listino porta gli importi dell\'italiano nella forma della lingua', () => {
  const importi = (lingua) => {
    const html = leggi(fileDi(indirizzo(lingua, 'pricing')));
    const celle = [...html.matchAll(/<td class="prezzo">([^<]+)<\/td>/g)].map((m) => m[1]);
    assert.equal(celle.length, 4, `${lingua}: righe del listino`);
    return celle.map((c) => {
      const p = prezziIn(c)[0];
      assert.ok(p && c.startsWith(formatoNativo(lingua, p.importo)), `${lingua}: "${c}" non apre col prezzo nel formato della lingua`);
      return p.importo;
    });
  };
  const italiani = importi('it');
  for (const lingua of LINGUE) assert.deepEqual(importi(lingua), italiani, lingua);
  assert.ok(/<td class="prezzo">€\d/.test(leggi('en/pricing.html')), 'inglese: il simbolo non sta davanti');
  for (const lingua of LINGUE) {
    for (const rotta of ['', 'finance', 'pricing', 'press']) {
      const testo = testoVisibile(leggi(fileDi(indirizzo(lingua, rotta))));
      for (const p of prezziIn(testo)) assert.equal(p.grezzo, formatoNativo(lingua, p.importo), `${lingua}/${rotta}: prezzo fuori formato`);
    }
  }
});

test('Google Play: pulsante e frasi della scheda escono solo con pmSuPlay, in ogni lingua', async () => {
  for (const lingua of LINGUE) {
    const t = (await import(new URL(`../../src/i18n/testi/${lingua}.ts`, import.meta.url).href)).default;
    for (const rotta of ['', 'finance', 'pricing']) {
      const html = leggi(fileDi(indirizzo(lingua, rotta)));
      const testo = testoVisibile(html);
      assert.equal(html.includes('play.google.com'), pmSuPlay, `${lingua}/${rotta}: collegamento alla scheda`);
      assert.equal(testo.includes(t.comune.azioni.play), pmSuPlay, `${lingua}/${rotta}: pulsante`);
      assert.ok(html.includes('href="/app/"'), `${lingua}/${rotta}: manca l'invito alla demo`);
    }
    assert.equal(testoVisibile(leggi(fileDi(indirizzo(lingua, 'finance')))).includes(t.finance.provare.suPlay), pmSuPlay, `${lingua}: finance.provare.suPlay`);
    const prezzi = testoVisibile(leggi(fileDi(indirizzo(lingua, 'pricing'))));
    assert.equal(prezzi.includes(t.prezzi.suPlay), pmSuPlay, `${lingua}: prezzi.suPlay`);
    assert.equal(prezzi.includes(t.prezzi.primaDellaScheda), !pmSuPlay, `${lingua}: prezzi.primaDellaScheda`);
  }
});

test('finance: ogni lingua mostra le sue quattro schermate, non quelle italiane', () => {
  const viste = new Set();
  for (const lingua of LINGUE) {
    const html = leggi(fileDi(indirizzo(lingua, 'finance')));
    const immagini = [...new Set([...html.matchAll(/(?:src|srcset)="(\/_assets\/(?:portafoglio|mercato|ribilanciamento|analisi)\.[^"\s]+)/g)].map((m) => m[1]))];
    assert.equal(immagini.length, 4, `${lingua}: schermate ${immagini.length}`);
    for (const i of immagini) {
      assert.ok(existsSync(path.join(DIST, i)), `${lingua}: manca ${i}`);
      assert.ok(!viste.has(i), `${lingua}: usa una schermata di un'altra lingua (${i})`);
      viste.add(i);
    }
  }
  assert.equal(viste.size, 24);
});

// Peso STATICO: la pagina, ogni file che chiama dall'HTML (immagini pigre
// comprese) e i quattro font che i suoi fogli dichiarano (circa 360 KB: un
// browser scarica solo quelli che la pagina usa, quindi il trasferito vero e'
// minore). Misurato alla consegna (S384, corsia B6) sulle sei lingue, in KB,
// massimo fra le lingue: prima pagina 499,1; finance 522,4; games 727,4;
// pagine di servizio e legali da 393,7 a 400,6; informativa 415,8. Le soglie
// sono quel massimo piu' un margine sotto il 5%.
const SOGLIE = { '': 520, finance: 545, games: 760, about: 415, press: 415, pricing: 415, faq: 415, contact: 415, blog: 415, privacy: 435, terms: 415, disclaimer: 415, dmca: 415 };

/** Byte della pagina e di tutto cio' che chiama (immagini pigre comprese). */
export function peso(rel) {
  const html = leggi(rel);
  const file = new Set([rel]);
  // Solo cio' che il browser scarica da se': fogli, script, icone, immagini.
  // I collegamenti (`<a href>`) verso un file, come i materiali per la stampa,
  // non sono peso della pagina.
  for (const tag of html.matchAll(/<(?:link|script|img|source)\b[^>]*>/g)) {
    for (const m of tag[0].matchAll(/\s(?:src|href)="(\/(?:_assets|assets)\/[^"\s]+)"/g)) file.add(m[1].slice(1));
    for (const m of tag[0].matchAll(/\ssrcset="([^"]+)"/g)) for (const pezzo of m[1].split(',')) file.add(pezzo.trim().split(/\s+/)[0].slice(1));
  }
  const css = [...file].filter((f) => f.endsWith('.css')).map((f) => leggi(f)).join('\n');
  for (const m of css.matchAll(/url\(["']?(\/assets\/fonts\/[^"')]+)/g)) file.add(m[1].slice(1));
  let byte = 0;
  for (const f of file) byte += statSync(path.join(DIST, f)).size;
  return { byte, file: file.size };
}

test('peso: ogni pagina di ogni lingua sta sotto la sua soglia, e nessuna lingua pesa molto piu\' dell\'italiano', () => {
  for (const rotta of ROTTE) {
    const italiana = peso(fileDi(indirizzo('it', rotta))).byte;
    for (const lingua of LINGUE) {
      const p = peso(fileDi(indirizzo(lingua, rotta)));
      assert.ok(p.byte < SOGLIE[rotta] * 1024, `${lingua}/${rotta || 'home'}: ${p.byte} byte in ${p.file} file, soglia ${SOGLIE[rotta]} KB`);
      assert.ok(p.byte < italiana * 1.08, `${lingua}/${rotta || 'home'}: ${p.byte} byte contro ${italiana} dell'italiano`);
      assert.ok(p.file >= 6, `${lingua}/${rotta || 'home'}: conteggio dei file sospetto (${p.file})`);
    }
  }
});

test('fileDi e indirizzo: i conti degli indirizzi, coi loro confini', () => {
  assert.equal(indirizzo('it', ''), 'https://plurifin.app/');
  assert.equal(indirizzo('en', ''), 'https://plurifin.app/en');
  assert.equal(indirizzo('de', 'games'), 'https://plurifin.app/de/games');
  assert.equal(fileDi('https://plurifin.app/'), 'index.html');
  assert.equal(fileDi('https://plurifin.app/en'), 'en.html');
  assert.equal(fileDi('https://plurifin.app/blog/en/five'), 'blog/en/five.html');
  assert.equal(fileDi('https://plurifin.app/blog/rss-it.xml'), 'blog/rss-it.xml');
  assert.equal(fileDi('https://plurifin.app/en/'), null, 'con lo slash finale la pagina non esiste (build.format: file)');
  assert.equal(fileDi('https://example.org/en'), null);
});
