// Astro Content Layer schema for the PluriFin blog (Astro 5+ glob loader;
// migrated from the legacy src/content/config.ts collection in S16).
//
// Each markdown file under src/content/blog/ ships as one post; files in a
// subfolder (e.g. it/) keep the folder in their id, exactly like the legacy
// slug did - routes did not change with the migration.
// Locales mirror the rest of the site (it/en/es/fr/de/pt). Posts that
// are not translated yet show only in their original locale.
//
// Reference: M3.6 + 8A.2 in the master plan. The 12-week editorial
// calendar lives in marketing/blog_schedule.md.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().min(40).max(280),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.object({
      name: z.string().default('Filippo Salemi'),
      role: z.string().default('Founder, PluriFin'),
    }),
    lang: z.enum(['it', 'en', 'es', 'fr', 'de', 'pt']),
    tags: z.array(z.string()).min(1).max(8),
    hero: z.object({
      src: z.string().optional(),
      alt: z.string().optional(),
    }).optional(),
    // True for unfinished drafts: they are excluded from index + sitemap.
    draft: z.boolean().default(false),
    // Optional canonical URL if the post was originally published elsewhere.
    canonical: z.string().url().optional(),
  }),
});

export const collections = { blog };
