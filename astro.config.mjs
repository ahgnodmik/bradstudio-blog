// @ts-check

import { readFileSync, readdirSync } from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

// 글별 lastmod: frontmatter updatedDate(없으면 pubDate)를 사이트맵에 반영
const postDates = Object.fromEntries(
	readdirSync('./src/content/blog')
		.filter((f) => /\.mdx?$/.test(f))
		.map((f) => {
			const fm = readFileSync(`./src/content/blog/${f}`, 'utf8');
			const date =
				fm.match(/^updatedDate:\s*(\S+)/m)?.[1] ?? fm.match(/^pubDate:\s*(\S+)/m)?.[1];
			return [f.replace(/\.mdx?$/, ''), date];
		})
);

// https://astro.build/config
export default defineConfig({
	site: 'https://bradstudio.xyz',
	integrations: [
		mdx(),
		sitemap({
			serialize(item) {
				const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1];
				if (slug && postDates[slug]) item.lastmod = new Date(postDates[slug]).toISOString();
				return item;
			},
		}),
	],
	markdown: {
		rehypePlugins: [
			// 외부 링크는 새 창에서 열어 사이트 이탈 방지. 내부 링크는 그대로.
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
