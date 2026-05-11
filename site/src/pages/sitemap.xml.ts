// Dynamic sitemap generator for Astro static output
// Outputs /sitemap.xml at the site root
import type { APIRoute } from 'astro';
import { LOCALES } from '../i18n/index';

const BASE = 'https://lunapiena49.github.io/portfoliomanager-data';

const pages = ['', 'privacy', 'terms', 'disclaimer', 'about', 'contact', 'faq'];

function url(locale: string, page: string): string {
  const prefix = locale === 'it' ? '' : `/${locale}`;
  const pagePart = page ? `/${page}` : '';
  return `${BASE}${prefix}${pagePart}`;
}

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];
  const entries: string[] = [];

  for (const locale of LOCALES) {
    for (const page of pages) {
      const loc = url(locale, page);
      // Landing pages are high priority, legal pages lower
      const priority = page === '' ? '1.0' : '0.7';
      const changefreq = page === '' ? 'weekly' : 'monthly';
      entries.push(
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
      );
    }
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
