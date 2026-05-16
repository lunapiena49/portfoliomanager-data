// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// The production site lives at the root of plurifin.app (custom domain on
// GitHub Pages via CNAME, see master plan 4B.3). The site-deploy.yml workflow
// already sets SITE_URL=https://plurifin.app + SITE_BASE=/ for production
// deploys; these defaults match so local dev builds emit the same URLs.
// Legacy github.io override remains available for local debugging:
//   SITE_URL=https://lunapiena49.github.io/portfoliomanager-data SITE_BASE=/portfoliomanager-data astro build
const SITE_URL = process.env.SITE_URL ?? 'https://plurifin.app';
const SITE_BASE = process.env.SITE_BASE ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
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
    // 4A.1bis: emit /privacy.html instead of /privacy/index.html so URLs like
    // /legal/<lang>/privacy.html (linked in-app + on Play Store listing) resolve
    // directly to a single .html file without trailing-slash redirects.
    format: 'file',
  },
  compressHTML: true,
  output: 'static',
});
