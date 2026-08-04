// @ts-check
import { defineConfig } from 'astro/config';
// I commenti di sviluppo non escono nell'HTML servito: misurato prima del fix,
// games.html ne conteneva 56, per il 26% del suo peso. Restano nei sorgenti;
// `compressHTML` non li tocca (comprime gli spazi, non rimuove i commenti).
import stripHtmlComments from './integrations/strip-html-comments.mjs';
// Il reset di Tailwind (`list-style:none`) toglie a Safari+VoiceOver la
// semantica di lista: 73 contenitori su 227 avevano il `role="list"` scritto a
// mano, 154 no. Si marca in build perche' meta' di quelle liste nasce dal
// markdown dei post e dei legali e non ha un sorgente su cui scrivere.
import roleList from './integrations/role-list.mjs';

// The production site lives at the root of plurifin.app (custom domain on
// GitHub Pages via CNAME). The site-deploy.yml workflow
// already sets SITE_URL=https://plurifin.app + SITE_BASE=/ for production
// deploys; these defaults match so local dev builds emit the same URLs.
// Legacy github.io override remains available for local debugging:
//   SITE_URL=https://lunapiena49.github.io/portfoliomanager-data SITE_BASE=/portfoliomanager-data astro build
const SITE_URL = process.env.SITE_URL ?? 'https://plurifin.app';
const SITE_BASE = process.env.SITE_BASE ?? '/';

// Tailwind 3 runs as a plain PostCSS plugin (postcss.config.cjs) since the
// Astro 6 upgrade: the @astrojs/tailwind integration is deprecated and only
// supports astro<=5. Base styles were already off (applyBaseStyles: false);
// src/styles/global.css keeps carrying the @tailwind directives.
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
