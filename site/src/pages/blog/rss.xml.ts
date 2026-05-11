// W7.D-CC.1 -- unified RSS feed for the PluriFin blog (all locales).
//
// Single endpoint at /blog/rss.xml; each <item> carries an `xml:lang`
// attribute resolved from the post frontmatter. Consumers that filter by
// language can read the attribute; aggregators (Feedly, NetNewsWire) show
// the title + summary + canonical link as-is.
//
// We deliberately do NOT split per-locale feeds in v1: 6 locales x ~6 posts
// = 36 items in a single feed is light, and the published item count is
// expected to stay below 100 throughout 2026 per the editorial calendar in
// marketing/blog_schedule.md. Per-locale feeds tracked as W7.D-CC.1 v2 if
// language-filtered subscribers materialize.

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASE = 'https://lunapiena49.github.io/portfoliomanager-data';
const FEED_TITLE = 'PluriFin Blog';
const FEED_DESCRIPTION =
  'Storie di prodotto, decisioni di design e lezioni apprese da PluriFin. ' +
  'Stories, design decisions and lessons learned from PluriFin.';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = allPosts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  const items = sorted
    .map((post) => {
      const slug = post.slug;
      const url = `${BASE}/blog/${slug}/`;
      const pubDate = post.data.publishedAt.toUTCString();
      const title = escapeXml(post.data.title);
      const summary = escapeXml(post.data.summary);
      const lang = post.data.lang;
      const author = escapeXml(post.data.author.name);
      const tags = post.data.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n');

      return [
        '    <item>',
        `      <title>${title}</title>`,
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
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${BASE}/blog/</link>
    <atom:link href="${BASE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>it</language>
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
};
