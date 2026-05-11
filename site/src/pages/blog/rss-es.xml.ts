// W7.D-CC.1 v2 -- Spanish-only RSS feed (filter dc:language === es).
import type { APIRoute } from 'astro';
import { buildRssFeed, FEED_META, PLURIFIN_BASE_URL } from '../../lib/buildRssFeed';

export const GET: APIRoute = async () => buildRssFeed({
  baseUrl: PLURIFIN_BASE_URL,
  title: FEED_META.es.title,
  description: FEED_META.es.description,
  channelLanguage: 'es',
  selfPath: '/blog/rss-es.xml',
  filterLang: 'es',
});
