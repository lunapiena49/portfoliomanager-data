// @ts-check
import { defineConfig } from 'astro/config';
// I commenti di sviluppo non escono nell'HTML servito: misurato prima del fix,
// games.html ne conteneva 56, per il 26% del suo peso. Restano nei sorgenti;
// `compressHTML` non li tocca (comprime gli spazi, non rimuove i commenti).
import stripHtmlComments from './integrations/strip-html-comments.mjs';
// `list-style: none` toglie a Safari+VoiceOver la semantica di lista. Il
// telaio di S384 lo usa su colophon, indice dei documenti, elenco delle
// notizie e menu delle lingue (prima lo imponeva a tutte il reset di
// Tailwind): il ruolo si marca in build, perche' meta' delle liste nasce dal
// markdown degli articoli e dei legali e non ha un sorgente su cui scrivere.
import roleList from './integrations/role-list.mjs';

// The production site lives at the root of plurifin.app (custom domain on
// GitHub Pages via CNAME). The site-deploy.yml workflow
// already sets SITE_URL=https://plurifin.app + SITE_BASE=/ for production
// deploys; these defaults match so local dev builds emit the same URLs.
// Legacy github.io override remains available for local debugging:
//   SITE_URL=https://lunapiena49.github.io/portfoliomanager-data SITE_BASE=/portfoliomanager-data astro build
const SITE_URL = process.env.SITE_URL ?? 'https://plurifin.app';
const SITE_BASE = process.env.SITE_BASE ?? '/';

// S384, corsia B6: Tailwind e' uscito insieme al telaio vecchio (Layout.astro,
// global.css, tailwind.config.mjs, @tailwindcss/vite). Il sito ha quattro
// fogli scritti a mano (src/styles/{giorno,finance,games,servizio}.css) e
// nessun processore di CSS oltre a quello di Vite.

/** Le cinque lingue col prefisso: l'italiano sta alla radice. */
const LINGUE_COL_PREFISSO = ['en', 'es', 'fr', 'de', 'pt'];

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'es', 'fr', 'de', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // IT default locale ha root path no-prefix (sitemap esclude /it/*),
  // ma utenti che digitano /it/<page> per simmetria con /en|es|fr|de|pt/
  // ricevevano 404. Static redirects emettono HTML meta-refresh stub.
  redirects: {
    // S384: la Soglia e' uscita, la prima pagina e' `/`. `/home` resta come
    // rimando (stub meta-refresh: GitHub Pages non fa 301). Vale per ogni
    // lingua: `/en/home` era la prima pagina inglese del sito di prima ed e'
    // nei segnalibri e nei motori; ora rimanda a `/en`.
    '/home': '/',
    ...Object.fromEntries(LINGUE_COL_PREFISSO.map((l) => [`/${l}/home`, `/${l}`])),
    '/it': '/',
    '/it/faq': '/faq',
    '/it/about': '/about',
    '/it/pricing': '/pricing',
    '/it/press': '/press',
    '/it/contact': '/contact',
    '/it/terms': '/terms',
    '/it/privacy': '/privacy',
    '/it/disclaimer': '/disclaimer',
  },
  build: {
    assets: '_assets',
    // Emit /privacy.html instead of /privacy/index.html so URLs like
    // /legal/<lang>/privacy.html (linked in-app + on Play Store listing) resolve
    // directly to a single .html file without trailing-slash redirects.
    format: 'file',
  },
  // S384 - POLITICA DI SICUREZZA DEI CONTENUTI, generata dal build.
  // Su questa origine la demo /app/ tiene chiavi API e portafogli nel browser:
  // uno script estraneo sul sito li leggerebbe. Astro calcola l'hash di ogni
  // script e foglio di stile che emette e scrive un <meta http-equiv>; tutto
  // cio' che non ha un hash e non viene da questa origine non parte.
  // `frame-ancestors` e le altre intestazioni non valgono in un <meta>: si
  // mettono in Cloudflare (Transform Rules). La politica e' una sola per
  // tutte le pagine: la deroga agli attributi `style` che il telaio vecchio
  // si prendeva in Layout.astro (direttiva `style-src-attr`) e' uscita con
  // lui (corsia B6), e un contratto sul sito costruito vieta che torni.
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'none'",
        "frame-src 'none'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: { resources: ["'self'"] },
      styleDirective: { resources: ["'self'"] },
    },
  },
  // Gli articoli delle Notizie sono markdown. L'evidenziatore di codice
  // predefinito (Shiki) colora con attributi `style` in linea, che la politica
  // qui sopra blocca: Astro lo segnalava a ogni build. Nessun articolo ha
  // blocchi di codice; l'evidenziatore si spegne, cosi' un blocco futuro esce
  // come testo semplice invece che come stile vietato.
  markdown: { syntaxHighlight: false },
  compressHTML: true,
  integrations: [stripHtmlComments(), roleList()],
  output: 'static',
  // Upgrade ad Astro 7: Vite 8 minifica il CSS con Lightning CSS, che
  // per default riscrive `(max-width: 640px)` nella sintassi RANGE di Media
  // Queries Level 4, `(width <= 640px)`. Quella sintassi non esiste per
  // Safari < 16.4, Chrome < 104 e Firefox < 102: su quei browser TUTTI i
  // media query vengono ignorati in blocco e il layout responsive collassa
  // sugli stili desktop. Misurato sulla build 7.1.3 senza questo target:
  // 23 media query su 28 erano in sintassi range, ZERO in legacy; la build
  // 6.4.8 servita live ne aveva 5 su 7 in legacy e zero range.
  // L'harness visivo NON puo' catturarlo: Playwright gira su browser recenti,
  // che la sintassi range la capiscono. Il target qui sotto fissa il floor di
  // compatibilita' e riporta l'output alla forma legacy.
  vite: {
    build: {
      cssTarget: ['chrome87', 'firefox78', 'safari14', 'edge88'],
    },
  },
});
