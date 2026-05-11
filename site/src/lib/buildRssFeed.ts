// Shared RSS 2.0 builder for the PluriFin blog (W7.D-CC.1 v2).
//
// Used by:
//   * /blog/rss.xml             -- unified feed across all locales
//   * /blog/rss-{lang}.xml      -- per-locale feed (it/en/es/fr/de/pt)
//
// The per-locale feeds satisfy aggregators that filter by language and
// improve hreflang signaling for search engines. The unified feed is
// retained as a "discovery" entry point linked from the blog index.

import { getCollection } from 'astro:content';

export type FeedLocale = 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt';

export interface FeedOptions {
  /** Canonical site base, no trailing slash. */
  baseUrl: string;
  /** Channel <title>. */
  title: string;
  /** Channel <description>. */
  description: string;
  /** Locale code stamped in the channel <language> tag. */
  channelLanguage: string;
  /** Self-link path (absolute under baseUrl), e.g. "/blog/rss.xml". */
  selfPath: string;
  /** Optional filter: only items where post.data.lang === filterLang. */
  filterLang?: FeedLocale;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function buildRssFeed(opts: FeedOptions): Promise<Response> {
  const { baseUrl, title, description, channelLanguage, selfPath, filterLang } = opts;

  const allPosts = await getCollection('blog', ({ data }) => !data.draft);
  const filtered = filterLang
    ? allPosts.filter((p) => p.data.lang === filterLang)
    : allPosts;
  const sorted = filtered.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  const items = sorted
    .map((post) => {
      const slug = post.slug;
      const url = `${baseUrl}/blog/${slug}/`;
      const pubDate = post.data.publishedAt.toUTCString();
      const itemTitle = escapeXml(post.data.title);
      const summary = escapeXml(post.data.summary);
      const lang = post.data.lang;
      const author = escapeXml(post.data.author.name);
      const tags = post.data.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n');

      return [
        '    <item>',
        `      <title>${itemTitle}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${summary}</description>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <dc:creator>${author}</dc:creator>`,
        `      <dc:language>${lang}</dc:language>`,
        tags,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${baseUrl}/blog/</link>
    <atom:link href="${baseUrl}${selfPath}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(description)}</description>
    <language>${channelLanguage}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// Canonical site base for all PluriFin feeds (W7.D-CC.X URL switch
// from lunapiena49.github.io/portfoliomanager-data to plurifin.app).
export const PLURIFIN_BASE_URL = 'https://plurifin.app';

// Channel metadata per locale -- title + description translated.
export const FEED_META: Record<FeedLocale, { title: string; description: string }> = {
  it: {
    title: 'PluriFin Blog',
    description:
      'Storie di prodotto, decisioni di design e lezioni apprese da PluriFin.',
  },
  en: {
    title: 'PluriFin Blog',
    description:
      'Product stories, design decisions, and lessons learned from PluriFin.',
  },
  es: {
    title: 'PluriFin Blog',
    description:
      'Historias de producto, decisiones de diseno y lecciones aprendidas de PluriFin.',
  },
  fr: {
    title: 'PluriFin Blog',
    description:
      'Histoires produit, decisions de design et lecons apprises de PluriFin.',
  },
  de: {
    title: 'PluriFin Blog',
    description:
      'Produktgeschichten, Designentscheidungen und Erfahrungen von PluriFin.',
  },
  pt: {
    title: 'PluriFin Blog',
    description:
      'Historias de produto, decisoes de design e licoes aprendidas da PluriFin.',
  },
};
