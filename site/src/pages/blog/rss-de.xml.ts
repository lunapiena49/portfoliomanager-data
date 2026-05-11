// W7.D-CC.1 v2 -- German-only RSS feed (filter dc:language === de).
import type { APIRoute } from 'astro';
import { buildRssFeed, FEED_META, PLURIFIN_BASE_URL } from '../../lib/buildRssFeed';

export const GET: APIRoute = async () => buildRssFeed({
  baseUrl: PLURIFIN_BASE_URL,
  title: FEED_META.de.title,
  description: FEED_META.de.description,
  channelLanguage: 'de',
  selfPath: '/blog/rss-de.xml',
  filterLang: 'de',
});
