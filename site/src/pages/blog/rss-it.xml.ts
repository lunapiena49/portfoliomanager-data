// W7.D-CC.1 v2 -- Italian-only RSS feed (filter dc:language === it).
import type { APIRoute } from 'astro';
import { buildRssFeed, FEED_META, PLURIFIN_BASE_URL } from '../../lib/buildRssFeed';

export const GET: APIRoute = async () => buildRssFeed({
  baseUrl: PLURIFIN_BASE_URL,
  title: FEED_META.it.title,
  description: FEED_META.it.description,
  channelLanguage: 'it',
  selfPath: '/blog/rss-it.xml',
  filterLang: 'it',
});
