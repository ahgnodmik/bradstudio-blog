import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './consts';

const contentId = z.string().regex(/^bs-\d{8}-\d{3}$/, 'contentId는 bs-YYYYMMDD-NNN 형식');

const repurposeStatus = z
	.enum(['not_started', 'drafted', 'reviewed', 'published', 'skipped'])
	.default('not_started');

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),

			contentId,
			// draft가 기본값 — status 누락 시 실수로 공개되지 않음
			status: z.enum(['draft', 'review', 'approved', 'published', 'archived']).default('draft'),

			category: z.enum(Object.keys(CATEGORIES) as [string, ...string[]]),
			tags: z.array(z.string()).default([]),

			primaryKeyword: z.string(),
			secondaryKeywords: z.array(z.string()).default([]),
			intent: z.enum([
				'informational',
				'problem-solving',
				'comparison',
				'commercial',
				'transactional',
			]),
			funnelStage: z.enum(['awareness', 'consideration', 'decision']).optional(),
			cluster: z.string().optional(),
			clusterRole: z.enum(['pillar', 'supporting', 'commercial']).optional(),

			evergreen: z.boolean().default(true),
			reviewAfter: z.coerce.date().optional(),
			author: z.string().default('Brad Studio'),

			sources: z
				.array(
					z.object({
						title: z.string(),
						url: z.string().url(),
						accessedAt: z.coerce.date(),
					}),
				)
				.default([]),
			internalLinks: z.array(contentId).default([]),

			monetization: z
				.object({
					methods: z
						.array(z.enum(['adsense', 'affiliate', 'direct', 'newsletter', 'product']))
						.default([]),
					affiliateDisclosure: z.boolean().default(false),
				})
				.default({}),

			repurpose: z
				.object({
					naver: repurposeStatus,
					threads: repurposeStatus,
					x: repurposeStatus,
					instagram: repurposeStatus,
					shorts: repurposeStatus,
					youtube: repurposeStatus,
					newsletter: repurposeStatus,
				})
				.default({}),

			faq: z
				.array(
					z.object({
						question: z.string(),
						answer: z.string(),
					}),
				)
				.default([]),

			seo: z
				.object({
					canonical: z.string().url().nullable().default(null),
					noindex: z.boolean().default(false),
					ogImage: z.string().nullable().default(null),
				})
				.default({}),
		}),
});

export const collections = { blog };
