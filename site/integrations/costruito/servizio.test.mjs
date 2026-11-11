// I CONTRATTI SULLE PAGINE DI SERVIZIO COSTRUITE (S384, corsia B3). Leggono
// dist/ (o la cartella in SITO_DIST): si lanciano DOPO la build con
// `npm run test:dist`. Se la build non c'e' il primo test FALLISCE, non salta.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const SITO = path.resolve(QUI, '..', '..');
const DIST = process.env.SITO_DIST ? path.resolve(process.env.SITO_DIST) : path.join(SITO, 'dist');
const pagina = (nome) => readFileSync(path.join(DIST, nome), 'utf8');
const politica = (html) => (html.match(/<meta http-equiv="content-security-policy" content="([^"]+)"/i) ?? [])[1] ?? '';
const testoVisibile = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&#39;|&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const fogli = (html) => [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => pagina(m[1].replace(/^\//, ''))).join('\n');
const pmSuPlay = /export const pmSuPlay = true;/.test(readFileSync(path.join(SITO, 'src', 'lib', 'stato.ts'), 'utf8'));
const linguePronte = readdirSync(path.join(SITO, 'src', 'i18n', 'testi')).map((f) => f.replace('.ts', ''));

const SERVIZIO = { about: 'about', press: 'press', pricing: 'pricing', faq: 'faq', contact: 'contact', blog: 'blog' };
const LEGALI = ['privacy', 'terms', 'disclaimer', 'dmca'];

test('dist esiste: la build e\' stata fatta', () => {
  assert.ok(existsSync(path.join(DIST, 'about.html')), `manca about.html in ${DIST}: lancia prima \`npm run build\``);
});

test('pagine di servizio e legali: telaio nuovo, politica stretta, nessun attributo style, una h1', () => {
  for (const r of [...Object.keys(SERVIZIO), ...LEGALI]) {
    const html = pagina(`${r}.html`);
    const csp = politica(html);
    assert.ok(csp, `${r}: manca la politica di sicurezza`);
    assert.ok(!/unsafe-inline|unsafe-eval|style-src-attr/.test(csp), `${r}: politica larga`);
    assert.equal((html.match(/\sstyle="/g) ?? []).length, 0, `${r}: attributi style`);
    assert.ok(!/<script(?![^>]*type="application\/ld\+json")[^>]*>/.test(html), `${r}: uno script eseguibile`);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${r}: h1`);
    assert.match(html, /<html lang="it"/, `${r}: lingua`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://plurifin\\.app/${r}">`), `${r}: canonical`);
    assert.equal((html.match(/<link rel="alternate" hreflang="/g) ?? []).length, 7, `${r}: hreflang`);
    assert.match(html, /class="margini testata"/, `${r}: testata`);
    assert.match(html, /<footer class="colophon"/, `${r}: colophon`);
    assert.match(html, /<main id="testo"/, `${r}: ancora del salto al testo`);
    const css = fogli(html);
    assert.ok(css.includes('--carta') && css.includes('.documento'), `${r}: mancano giorno.css o servizio.css`);
    assert.ok(!css.includes('--tw-') && !css.includes('.nav-inner'), `${r}: porta anche il foglio del telaio vecchio`);
    // I documenti legali rimandano alle informative dei fornitori: e' il loro
    // testo. Le pagine di servizio non nominano host di terzi.
    if (r in SERVIZIO) {
      assert.ok(!/https?:\/\/(?!plurifin\.app|schema\.org|github\.com\/lunapiena49|play\.google\.com)[a-z0-9.-]+\//i
        .test(html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')), `${r}: nomina un host estraneo`);
    }
  }
});

test('la casa: dice fondatore e CEO, e dice in chiaro che il titolare e\' una persona fisica', () => {
  const testo = testoVisibile(pagina('about.html'));
  for (const frase of ['fondatore e CEO', 'Chi risponde davanti alla legge', 'una persona fisica, in Italia, non una società', 'Che cosa PluriFin non fa']) {
    assert.ok(testo.includes(frase), `manca: ${frase}`);
  }
  assert.ok(!/S\.r\.l|S\.p\.A|\bSrl\b|\bInc\.|\bLtd\b/.test(testo), 'una forma societaria in pagina');
});

test('stampa: i fatti di oggi, non quelli di prima', () => {
  const html = pagina('press.html');
  const testo = testoVisibile(html);
  for (const vecchia of ['Q2 2026', 'app Android per la gestione', 'Niente investitori', 'Fase 2', 'Yubikey']) {
    assert.ok(!testo.includes(vecchia), `la pagina stampa dice ancora: ${vecchia}`);
  }
  for (const frase of ['Fondatore e CEO', 'Forma giuridica', 'Persona fisica', 'Undici, più un lettore CSV generico', 'In sviluppo. Nessuna data annunciata.']) {
    assert.ok(testo.includes(frase), `manca: ${frase}`);
  }
  assert.equal((html.match(/class="pronto"/g) ?? []).length, 2);
  assert.match(html, /href="\/assets\/favicon\.svg"/);
  assert.match(html, /href="\/assets\/og-image\.png"/);
  assert.match(html, /href="mailto:press@plurifin\.app"/);
});

test('contatti, la casa e stampa: solo i quattro indirizzi verificati', () => {
  const contatti = pagina('contact.html');
  const principale = contatti.slice(contatti.indexOf('<main'), contatti.indexOf('</main>'));
  const indirizzi = [...principale.matchAll(/href="mailto:([^"]+)"/g)].map((m) => m[1]).sort();
  assert.deepEqual(indirizzi, ['games@plurifin.app', 'info@plurifin.app', 'press@plurifin.app', 'privacy@plurifin.app']);
  for (const r of ['contact', 'about', 'press', 'pricing', 'faq', 'blog']) {
    const html = pagina(`${r}.html`);
    for (const m of html.matchAll(/mailto:([a-z]+)@plurifin\.app/g)) {
      assert.ok(['games', 'info', 'press', 'privacy'].includes(m[1]), `${r}: alias non verificato ${m[1]}@`);
    }
    assert.ok(!/<form|<input|<textarea/.test(html), `${r}: un modulo`);
  }
});

test('prezzi: quattro piani, e Google Play solo se pmSuPlay', () => {
  const html = pagina('pricing.html');
  const tabella = html.slice(html.indexOf('<table class="piani"'), html.indexOf('</table>'));
  assert.equal((tabella.match(/<th scope="row">/g) ?? []).length, 4);
  assert.equal((tabella.match(/class="prezzo">\d{1,2},\d{2} €/g) ?? []).length, 4);
  assert.equal(html.includes('play.google.com'), pmSuPlay);
  assert.equal(testoVisibile(html).includes('I piani si acquistano dall’app, su Google Play.'), pmSuPlay);
  assert.ok(html.includes('href="/app/"'), 'manca l\'invito alla demo web');
  assert.ok(testoVisibile(html).includes('non costituiscono consulenza finanziaria'), 'manca l\'avvertenza');
});

test('domande: tutte in pagina, e i dati strutturati dicono le stesse cose', () => {
  const html = pagina('faq.html');
  const blocchi = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const faq = blocchi.find((b) => b['@type'] === 'FAQPage');
  assert.ok(faq, 'manca il blocco FAQPage');
  assert.ok(faq.mainEntity.length >= 8);
  const testo = testoVisibile(html);
  for (const q of faq.mainEntity) {
    assert.ok(testo.includes(q.name), `domanda nei dati ma non in pagina: ${q.name}`);
    assert.ok(q.acceptedAnswer.text.length > 20);
  }
  assert.equal((html.match(/<section class="riga" id="d\d+"/g) ?? []).length, faq.mainEntity.length);
});

test('notizie: l\'elenco e\' in italiano, e ogni articolo sta sul telaio nuovo e torna alle notizie della sua lingua', () => {
  const elenco = pagina('blog.html');
  const collegati = [...new Set([...elenco.matchAll(/href="\/blog\/([^"]+)"/g)].map((m) => m[1]).filter((id) => !id.endsWith('.xml')))];
  assert.ok(collegati.length >= 1, 'nessun articolo in elenco');
  for (const id of collegati) {
    assert.match(pagina(path.join('blog', `${id}.html`)), /<html lang="it"/, `${id}: in elenco ma non italiano`);
  }
  assert.match(elenco, /href="\/blog\/rss-it\.xml"/);
  // S384, corsia B6: il telaio e' uno. Prima qui si pretendeva che l'articolo
  // di una lingua non pronta stesse sul telaio vecchio, e che ogni articolo sul
  // nuovo tornasse a `/blog`: vero per l'italiano soltanto. Un articolo
  // spagnolo torna a `/es/blog` (era l'asserzione rossa, riga 141).
  const perLingua = {};
  const visita = (dir) => {
    for (const f of readdirSync(path.join(DIST, dir), { withFileTypes: true })) {
      if (f.isDirectory()) { visita(path.join(dir, f.name)); continue; }
      if (!f.name.endsWith('.html')) continue;
      const html = pagina(path.join(dir, f.name));
      const lingua = html.match(/<html lang="([a-z]{2})"/)[1];
      assert.ok(linguePronte.includes(lingua), `${dir}/${f.name}: articolo in una lingua senza dizionario (${lingua})`);
      assert.ok(!/style-src-attr/.test(politica(html)), `${dir}/${f.name}: politica del telaio vecchio`);
      const css = fogli(html);
      assert.ok(css.includes('.documento'), `${dir}/${f.name}: manca il foglio dei documenti`);
      assert.ok(!css.includes('.nav-inner') && !css.includes('--tw-'), `${dir}/${f.name}: foglio del telaio vecchio`);
      assert.equal((html.match(/<link rel="alternate" hreflang="/g) ?? []).length, 0, `${f.name}: hreflang su un articolo`);
      const ritorno = lingua === 'it' ? '/blog' : `/${lingua}/blog`;
      assert.ok(html.includes(`<p class="ritorno"><a href="${ritorno}">`), `${f.name} (${lingua}): il rimando non torna a ${ritorno}`);
      assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}">/);
      perLingua[lingua] = (perLingua[lingua] ?? 0) + 1;
    }
  };
  visita('blog');
  for (const l of ['it', 'en', 'es', 'fr', 'de', 'pt']) assert.ok(perLingua[l] >= 2, `${l}: articoli sul telaio nuovo ${perLingua[l] ?? 0}`);
});

test('legali: il testo e\' quello di prima, con la sua versione, le sue tabelle e i suoi indirizzi', () => {
  const privacy = pagina('privacy.html');
  const testo = testoVisibile(privacy);
  assert.equal((privacy.match(/<h2 id="s\d+"/g) ?? []).length, 13);
  assert.equal((privacy.match(/<nav class="indice"[\s\S]*?<\/nav>/)[0].match(/<li/g) ?? []).length, 13);
  assert.ok((privacy.match(/<div class="table-wrap">/g) ?? []).length >= 5);
  assert.match(testo, /Versione : \d+\.\d+\.\d+/);
  for (const frase of ['Forma giuridica : persona fisica (sviluppatore indipendente)', 'gdpr@plurifin.app', 'Titolare del trattamento']) {
    assert.ok(testo.includes(frase), `privacy: manca ${frase}`);
  }
  for (const [r, frase] of [['terms', 'Non esegue ordini di acquisto o vendita di strumenti finanziari'], ['disclaimer', 'Non costituiscono:'], ['dmca', 'legal@plurifin.app']]) {
    assert.ok(testoVisibile(pagina(`${r}.html`)).includes(frase), `${r}: manca ${frase}`);
  }
});

test('le altre cinque lingue: servizio e legali sul telaio nuovo, coi legali interi come prima', () => {
  // S384, corsia B6: prima bastava che le pagine "costruissero ancora, ognuna
  // sul suo telaio". Ora stanno tutte sul nuovo, e dei legali (di cui e' cambiato
  // solo l'involucro) si verifica che il documento sia rimasto intero.
  const sezioniItaliane = (pagina('privacy.html').match(/<h2 id="s\d+"/g) ?? []).length;
  // Le tabelle dell'informativa, lingua per lingua, CONTATE sulla build del
  // telaio vecchio prima dello scambio dell'involucro: l'inglese ne ha cinque
  // come l'italiano, le altre quattro lingue tre (sono testi piu' corti: e' un
  // fatto dei documenti, segnalato all'utente, non di questa pagina).
  const tabelle = { en: 5, es: 3, fr: 3, de: 3, pt: 3 };
  for (const l of ['en', 'es', 'fr', 'de', 'pt']) {
    for (const r of ['about', 'press', 'pricing', 'faq', 'contact', 'blog', 'privacy', 'terms', 'disclaimer', 'dmca']) {
      const file = path.join(l, `${r}.html`);
      assert.ok(existsSync(path.join(DIST, file)), `manca ${file}`);
      const html = pagina(file);
      assert.match(html, new RegExp(`<html lang="${l}"`), `${file}: lingua`);
      assert.match(html, /class="margini testata"/, `${file}: testata del telaio nuovo`);
      assert.ok(!/style-src-attr|unsafe-/.test(politica(html)), `${file}: politica larga`);
      assert.equal((html.match(/\sstyle="/g) ?? []).length, 0, `${file}: attributi style`);
      const css = fogli(html);
      assert.ok(css.includes('--carta') && !css.includes('--tw-') && !css.includes('.nav-inner'), `${file}: foglio di stile`);
    }
    const privacy = pagina(path.join(l, 'privacy.html'));
    assert.equal((privacy.match(/<h2 id="s\d+"/g) ?? []).length, sezioniItaliane, `${l}/privacy: sezioni`);
    assert.equal((privacy.match(/<nav class="indice"[\s\S]*?<\/nav>/)[0].match(/<li/g) ?? []).length, sezioniItaliane, `${l}/privacy: indice`);
    assert.equal((privacy.match(/<div class="table-wrap">/g) ?? []).length, tabelle[l], `${l}/privacy: tabelle`);
    assert.match(testoVisibile(privacy), /1\.0\.3/, `${l}/privacy: versione`);
    assert.ok(testoVisibile(privacy).includes('gdpr@plurifin.app'), `${l}/privacy: indirizzo del titolare`);
    for (const r of ['terms', 'disclaimer', 'dmca']) {
      const html = pagina(path.join(l, `${r}.html`));
      assert.ok(/<article class="documento">\s*<h1>[^<]+<\/h1>\s*<p class="meta">/.test(html), `${l}/${r}: documento senza testa`);
      assert.ok((html.match(/<h2 id="/g) ?? []).length >= 1, `${l}/${r}: documento senza sezioni`);
    }
    assert.ok(testoVisibile(pagina(path.join(l, 'dmca.html'))).includes('legal@plurifin.app'), `${l}/dmca: indirizzo`);
  }
});
