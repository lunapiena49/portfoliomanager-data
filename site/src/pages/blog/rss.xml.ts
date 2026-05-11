// W7.D-CC.1 -- unified RSS feed for the PluriFin blog (all locales).
//
// Single endpoint at /blog/rss.xml; each <item> carries a `dc:language`
// tag resolved from the post frontmatter. Consumers that filter by
// language can read the tag; aggregators (Feedly, NetNewsWire) show
// the title + summary + canonical link as-is.
//
// W7.D-CC.1 v2 (2026-05-11) -- per-language feeds split into
// /blog/rss-{lang}.xml endpoints. This unified feed is retained as the
// default subscription target linked from the blog index for discovery.

import type { APIRoute } from 'astro';
import { buildRssFeed, FEED_META, PLURIFIN_BASE_URL } from '../../lib/buildRssFeed';

export const GET: APIRoute = async () => {
  return buildRssFeed({
    baseUrl: PLURIFIN_BASE_URL,
    title: FEED_META.it.title,
    description:
      `${FEED_META.it.description} ` +
      'Stories, design decisions and lessons learned from PluriFin.',
    channelLanguage: 'it',
    selfPath: '/blog/rss.xml',
  });
};
