// I PRESIDI DELLE PAGINE DI SERVIZIO (S384, corsia B3): La casa, Stampa,
// Prezzi, Domande, Contatti, Notizie e i documenti legali sul telaio nuovo.
// Girano con `npm test` PRIMA della build: leggono i sorgenti, non dist/.
// I contratti sul sito costruito stanno in integrations/costruito/.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const SITO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const leggi = (rel) => readFileSync(path.join(SITO, rel), 'utf8');
const COMPONENTI = readdirSync(path.join(SITO, 'src/components/giorno/servizio')).map((f) => `src/components/giorno/servizio/${f}`);

/** Le pagine italiane della corsia e la rotta che servono. */
const RIGHE = ['about', 'press', 'pricing', 'faq', 'contact', 'blog/index'];
const LEGALI = ['privacy', 'terms', 'disclaimer', 'dmca'];
/** Gli alias di posta ammessi (CLAUDE.md radice): mai inventarne. */
const ALIAS = new Set(['privacy', 'games', 'press', 'info', 'hello', 'legal', 'gdpr', 'support']);
/** Quelli con l'instradamento verificato: i soli che le pagine di servizio mostrano. */
const VERIFICATI = new Set(['privacy', 'games', 'press', 'info']);

async function italiano() {
  return (await import(new URL('../src/i18n/testi/it.ts', import.meta.url).href)).default;
}

test('servizio: i componenti ci sono e non portano script in linea, attributi style ne\' HTML scritto da script', () => {
  assert.ok(COMPONENTI.length >= 9, `componenti di servizio: ${COMPONENTI.length}`);
  for (const f of [...COMPONENTI, 'src/pages/blog/[...articolo].astro']) {
    const s = leggi(f);
    assert.ok(!/is:inline/.test(s), `${f}: is:inline`);
    assert.ok(!/\sstyle=/.test(s), `${f}: attributo style`);
    assert.ok(!/define:vars/.test(s), `${f}: define:vars genera stile in linea`);
    assert.ok(!/innerHTML|insertAdjacentHTML|document\.write/.test(s), `${f}: scrittura di HTML da script`);
    assert.ok(!/<script(?![^>]*type="application\/ld\+json")/.test(s), `${f}: uno script (queste pagine non ne hanno)`);
    assert.ok(!/layouts\/(Layout|LegalLayout)\.astro|styles\/global\.css/.test(s), `${f}: importa il telaio vecchio`);
  }
});

test('servizio: il foglio di stile non anima, non usa !important e non ridefinisce i token', () => {
  const css = leggi('src/styles/servizio.css');
  assert.ok(!/transition|animation|@keyframes/.test(css), 'movimento in pagine che non ne hanno');
  assert.ok(!/!important/.test(css), '!important');
  assert.ok(!/^\s*--[a-z0-9-]+\s*:/m.test(css), 'ridefinisce un token di giorno.css');
  assert.ok(!/@font-face|https?:\/\//.test(css), 'font o risorse dichiarati qui');
  assert.ok(!/outline:\s*(none|0)/.test(css), 'toglie l\'anello di focus');
  const taglie = new Set([...css.matchAll(/font(?:-size)?:[^;]*?(\d+)px/g)].map((m) => Number(m[1])));
  for (const t of taglie) assert.ok([14, 16, 21, 27, 31, 40, 50, 72].includes(t), `taglia fuori scala: ${t}px`);
});

test('servizio: le pagine italiane sono una riga sul telaio nuovo', () => {
  for (const r of RIGHE) {
    const s = leggi(`src/pages/${r}.astro`);
    assert.match(s, /components\/giorno\/servizio\/[A-Z][a-z]+\.astro/, `${r}: non usa un componente di servizio`);
    assert.match(s, /<[A-Z][a-z]+ lingua="it" \/>/, `${r}: non e\' una pagina-riga`);
    assert.ok(!/LegalLayout|i18n\/it'|<style|<script/.test(s), `${r}: resti del telaio vecchio`);
  }
});

test('legali: cambia solo la pelle, e ogni voce dell\'indice ha la sua ancora nel testo', () => {
  for (const r of LEGALI) {
    const s = leggi(`src/pages/${r}.astro`);
    assert.match(s, /import Documento from '\.\.\/components\/giorno\/servizio\/Documento\.astro';/, `${r}: non usa Documento`);
    assert.match(s, new RegExp(`<Documento lingua="it" rotta="${r}" titolo="[^"]+" indice=\\{toc\\}>`), `${r}: apertura`);
    assert.equal((s.match(/<\/Documento>/g) ?? []).length, 1, `${r}: chiusura`);
    assert.ok(!/LegalLayout|i18n\/it'/.test(s), `${r}: resti del telaio vecchio`);
    const ancore = [...s.matchAll(/\{ id: ["']([^"']+)["'], label:/g)].map((m) => m[1]);
    assert.ok(ancore.length >= 5, `${r}: indice di ${ancore.length} voci`);
    for (const a of ancore) assert.ok(s.includes(`<h2 id="${a}">`), `${r}: l'indice punta a #${a}, che nel testo non c'e'`);
  }
});

test('posta: solo alias ammessi, e nelle pagine di servizio solo quelli verificati', () => {
  const stato = leggi('src/lib/stato.ts');
  const inStato = [...stato.matchAll(/'([a-z]+)@plurifin\.app'/g)].map((m) => m[1]);
  assert.equal(inStato.length, 4);
  for (const a of inStato) assert.ok(VERIFICATI.has(a), `stato.ts: alias non verificato ${a}@`);
  for (const f of COMPONENTI) {
    for (const m of leggi(f).matchAll(/([a-z0-9._-]+)@plurifin\.app/g)) {
      assert.ok(ALIAS.has(m[1]), `${f}: alias inventato ${m[1]}@plurifin.app`);
    }
    assert.ok(!/@(gmail|outlook|proton|yahoo)\./i.test(leggi(f)), `${f}: indirizzo personale`);
    assert.ok(!/mailto:(?!\$\{)/.test(leggi(f)), `${f}: indirizzo scritto a mano invece che preso da lib/stato.ts`);
  }
});

test('testi: la forma giuridica e\' detta in chiaro, e nessuna forma societaria e\' inventata', async () => {
  const it = await italiano();
  assert.match(it.casa.titolare.testo, /persona fisica/);
  assert.match(it.casa.titolare.testo, /non una società/);
  assert.match(it.casa.titolare.testo, /Filippo Salemi/);
  assert.match(it.stampa.formaGiuridica.descrizione, /^Persona fisica/);
  const tutto = JSON.stringify(it);
  assert.ok(!/(?<!\p{L})(S\.?r\.?l\.?s?|S\.?p\.?A\.?|Inc\.|Ltd|GmbH|LLC)(?!\p{L})|società a responsabilità|partita IVA/iu.test(tutto),
    'i testi nominano una forma societaria che i registri non riportano');
  const casa = leggi('src/components/giorno/servizio/Casa.astro');
  assert.match(casa, /c\.titolare\.titolo/);
  assert.match(casa, /c\.titolare\.testo/);
  assert.match(leggi('src/components/giorno/servizio/Stampa.astro'), /s\.formaGiuridica/);
});

test('testi: le pagine di servizio hanno cio\' che i componenti leggono per posizione', async () => {
  const it = await italiano();
  assert.equal(it.contatti.voci.length, 4, 'Contatti.astro abbina quattro voci a quattro indirizzi');
  assert.ok(it.stampa.inBreve.voci.length >= 3, 'Stampa.astro mette la forma giuridica dopo la terza voce');
  assert.ok(it.stampa.materiali.voci.length >= 2, 'Stampa.astro collega i primi due materiali a due file');
  for (const f of ['public/assets/favicon.svg', 'public/assets/og-image.png']) assert.ok(existsSync(path.join(SITO, f)), `manca ${f}`);
  assert.equal(it.domande.voci.length, new Set(it.domande.voci.map((v) => v.domanda)).size, 'domande doppie');
  assert.ok(it.domande.voci.length >= 8);
  assert.ok(!/Q2 2026|app Android per la gestione|early bird/i.test(JSON.stringify(it.stampa)), 'la pagina stampa ripete il testo di prima');
});

test('notizie: una rotta sola per gli articoli di tutte le lingue, e l\'elenco e\' della lingua della pagina', () => {
  // S384, corsia B6: la rotta transitoria del telaio vecchio (`[...slug].astro`)
  // e' uscita: se tornasse, due rotte genererebbero lo stesso indirizzo.
  const nuova = leggi('src/pages/blog/[...articolo].astro');
  assert.match(nuova, /!data\.draft && LINGUE_PRONTE\.includes\(data\.lang\)/);
  const rotte = readdirSync(path.join(SITO, 'src/pages/blog')).filter((f) => f.startsWith('['));
  assert.deepEqual(rotte, ['[...articolo].astro'], 'le rotte dinamiche degli articoli devono essere una');
  assert.match(nuova, /ritorno=\{\{ href: localePath\(lingua, 'blog'\)/, 'il rimando torna alle notizie della lingua dell\'articolo');
  assert.match(nuova, /gemelle=\{false\}/, 'un articolo non ha gemelli: niente hreflang');
  const elenco = leggi('src/components/giorno/servizio/Notizie.astro');
  assert.match(elenco, /!data\.draft && data\.lang === lingua/);
  assert.match(elenco, /Intl\.DateTimeFormat\(lingua, \{ dateStyle: 'long', timeZone: 'UTC' \}\)/);
  assert.ok(!/toLocaleDateString\('/.test(elenco + nuova), 'data con la lingua scritta a mano');
});

test('prezzi: la scheda di Google Play compare solo dietro pmSuPlay', () => {
  const s = leggi('src/components/giorno/servizio/Prezzi.astro');
  assert.match(s, /\{pmSuPlay && <p>\{p\.suPlay\}<\/p>\}/);
  assert.match(s, /\{pmSuPlay && <a class="azione" href=\{pmPlayUrl\}/);
  assert.ok(!/play\.google\.com/.test(s), 'indirizzo di Google Play scritto nella pagina');
  assert.ok(!/\d+[.,]\d{2}/.test(s), 'un importo scritto nel componente: il listino vive nei testi');
  for (const f of COMPONENTI) assert.ok(!/play\.google\.com|families\.google\.com/.test(leggi(f)), `${f}: host di Google scritto a mano`);
});
