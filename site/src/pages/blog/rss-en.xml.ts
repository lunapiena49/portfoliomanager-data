// W7.D-CC.1 v2 -- English-only RSS feed (filter dc:language === en).
import type { APIRoute } from 'astro';
import { buildRssFeed, FEED_META, PLURIFIN_BASE_URL } from '../../lib/buildRssFeed';

export const GET: APIRoute = async () => buildRssFeed({
  baseUrl: PLURIFIN_BASE_URL,
  title: FEED_META.en.title,
  description: FEED_META.en.description,
  channelLanguage: 'en',
  selfPath: '/blog/rss-en.xml',
  filterLang: 'en',
});
