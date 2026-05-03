// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// The site lives at the root of the GitHub Pages deployment.
// The base path is /portfoliomanager-data because that is the repo name.
// Override at build time with:
//   SITE_URL=https://example.org SITE_BASE=/ astro build
const SITE_URL = process.env.SITE_URL ?? 'https://lunapiena49.github.io/portfoliomanager-data';
const SITE_BASE = process.env.SITE_BASE ?? '/portfoliomanager-data';

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
  build: {
    assets: '_assets',
  },
  compressHTML: true,
  output: 'static',
});
