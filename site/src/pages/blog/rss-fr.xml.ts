// W7.D-CC.1 v2 -- French-only RSS feed (filter dc:language === fr).
import type { APIRoute } from 'astro';
import { buildRssFeed, FEED_META, PLURIFIN_BASE_URL } from '../../lib/buildRssFeed';

export const GET: APIRoute = async () => buildRssFeed({
  baseUrl: PLURIFIN_BASE_URL,
  title: FEED_META.fr.title,
  description: FEED_META.fr.description,
  channelLanguage: 'fr',
  selfPath: '/blog/rss-fr.xml',
  filterLang: 'fr',
});
