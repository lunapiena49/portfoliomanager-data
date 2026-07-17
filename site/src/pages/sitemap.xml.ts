/**
 * LA SITEMAP - derivata dalle pagine che ESISTONO, non da una lista scritta a mano.
 *
 * Prima qui c'era:
 *     const pages = ['', 'privacy', 'terms', 'disclaimer', 'about', 'contact', 'faq'];
 * moltiplicata per le sei lingue. Due difetti, tutti e due misurati sul sito live:
 *
 *   1. DICHIARAVA 404. `contact` esiste SOLO in italiano, ma la lista lo
 *      moltiplicava per sei: /en/contact, /es/contact... sono 404 (verificato
 *      con curl). La sitemap li offriva ai crawler come pagine buone.
 *   2. OMETTEVA PAGINE VERE. press, pricing, dmca, blog erano nel sito e non
 *      nella sitemap. E dal porting di S11 mancherebbero anche home, finance
 *      e games - cioe' meta' del sito nuovo.
 *
 * Una lista a mano si sfalda a ogni pagina aggiunta, e si sfalda IN SILENZIO.
 * Qui le rotte si leggono dal filesystem a build time (`import.meta.glob`): se
 * un file esiste, la sua rotta e' nella sitemap; se non esiste, non c'e'.
 * Non puo' piu' divergere, perche' non c'e' piu' niente da tenere allineato.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LOCALES } from '../i18n/index';

const BASE = 'https://plurifin.app';

/** Ogni pagina .astro sotto src/pages/. Eager: serve a build time, non a runtime. */
const FILES = import.meta.glob('./**/*.astro', { eager: true });

/**
 * Dal path del file alla rotta servita. `build.format: 'file'` -> nessuno slash
 * finale: `/en` e' 200, `/en/` e' 404.
 *   ./index.astro          -> ''
 *   ./privacy.astro        -> 'privacy'
 *   ./en/index.astro       -> 'en'
 *   ./en/privacy.astro     -> 'en/privacy'
 */
function rottaDi(file: string): string | null {
  let r = file.replace(/^\.\//, '').replace(/\.astro$/, '');

  // Le rotte dinamiche non sono pagine: sono generatori. I loro figli (i post
  // del blog) li enumeriamo dalla collection, dove hanno anche una data vera.
  if (r.includes('[')) return null;

  r = r.replace(/\/index$/, '').replace(/^index$/, '');
  return r;
}

/** Priorita' e frequenza in base a COSA e' la pagina, non a dove sta. */
function peso(rotta: string): { priority: string; changefreq: string } {
  const foglia = rotta.split('/').pop() ?? '';
  const isHome = rotta === '' || LOCALES.includes(rotta as never);
  if (isHome) return { priority: '1.0', changefreq: 'weekly' };
  if (foglia === 'home' || foglia === 'finance' || foglia === 'games') {
    return { priority: '0.9', changefreq: 'weekly' };
  }
  if (foglia === 'blog') return { priority: '0.8', changefreq: 'daily' };
  if (foglia === 'pricing' || foglia === 'press') return { priority: '0.8', changefreq: 'monthly' };
  return { priority: '0.6', changefreq: 'monthly' };  // legali, faq, about, contact
}

const RSS = [
  '/blog/rss.xml',
  ...LOCALES.map((l) => `/blog/rss-${l}.xml`),
];

function entry(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n`
       + `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export const GET: APIRoute = async () => {
  const oggi = new Date().toISOString().split('T')[0];
  const entries: string[] = [];

  const rotte = Object.keys(FILES)
    .map(rottaDi)
    .filter((r): r is string => r !== null)
    .sort();

  for (const r of rotte) {
    const { priority, changefreq } = peso(r);
    entries.push(entry(r ? `${BASE}/${r}` : `${BASE}/`, oggi, changefreq, priority));
  }

  /* I post del blog. `draft: true` NON entra: un post non pubblicato offerto a
     un crawler e' una pagina che non esiste ancora - lo stesso difetto della
     lista a mano, in un altro punto. */
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  for (const p of posts) {
    // Lo schema (src/content.config.ts) lo chiama `publishedAt`, non `pubDate`.
    const quando = p.data.updatedAt ?? p.data.publishedAt;
    const data = (quando instanceof Date ? quando : new Date(quando)).toISOString().split('T')[0];
    entries.push(entry(`${BASE}/blog/${p.id}`, data, 'monthly', '0.7'));
  }

  for (const feed of RSS) {
    entries.push(entry(`${BASE}${feed}`, oggi, 'daily', '0.5'));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
