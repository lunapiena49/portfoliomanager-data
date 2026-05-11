// W7.D-CC.1 v2 -- Portuguese-only RSS feed (filter dc:language === pt).
import type { APIRoute } from 'astro';
import { buildRssFeed, FEED_META, PLURIFIN_BASE_URL } from '../../lib/buildRssFeed';

export const GET: APIRoute = async () => buildRssFeed({
  baseUrl: PLURIFIN_BASE_URL,
  title: FEED_META.pt.title,
  description: FEED_META.pt.description,
  channelLanguage: 'pt',
  selfPath: '/blog/rss-pt.xml',
  filterLang: 'pt',
});
