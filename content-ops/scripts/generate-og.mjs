#!/usr/bin/env node
// 발행 글 OG 썸네일 생성기 — public/og/<contentId>.png (1200x630)
// 글 추가·제목 변경 후 실행: node content-ops/scripts/generate-og.mjs
// 이미 존재하는 파일은 건너뜀. 강제 재생성: --force

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const BLOG_DIR = 'src/content/blog';
const OUT_DIR = 'public/og';
const FONT_DIR = 'src/assets/fonts/og';
const force = process.argv.includes('--force');

const CATEGORIES = { living: '생활', digital: '디지털', money: '재테크', shopping: '쇼핑' };

const bold = readFileSync(join(FONT_DIR, 'Pretendard-Bold.otf'));
const regular = readFileSync(join(FONT_DIR, 'Pretendard-Regular.otf'));

function frontmatter(body, key) {
	return body.match(new RegExp(`^${key}:\\s*['"]?(.+?)['"]?\\s*$`, 'm'))?.[1];
}

async function render(title, categoryLabel) {
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: '#ffffff',
					padding: '64px 72px',
					borderTop: '16px solid #0064e0',
				},
				children: [
					{
						type: 'div',
						props: {
							style: { display: 'flex', alignItems: 'center' },
							children: [
								{
									type: 'div',
									props: {
										style: {
											backgroundColor: '#0a1317',
											color: '#ffffff',
											fontSize: '26px',
											fontWeight: 700,
											padding: '10px 28px',
											borderRadius: '100px',
										},
										children: categoryLabel,
									},
								},
							],
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								fontSize: '64px',
								fontWeight: 700,
								color: '#0a1317',
								lineHeight: 1.3,
								letterSpacing: '-0.02em',
								wordBreak: 'keep-all',
							},
							children: title,
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							},
							children: [
								{
									type: 'div',
									props: {
										style: { fontSize: '32px', fontWeight: 700, color: '#0064e0' },
										children: 'Brad Studio',
									},
								},
								{
									type: 'div',
									props: {
										style: { fontSize: '24px', color: '#5d6c7b' },
										children: 'bradstudio.xyz',
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Pretendard', data: bold, weight: 700, style: 'normal' },
				{ name: 'Pretendard', data: regular, weight: 400, style: 'normal' },
			],
		},
	);
	return sharp(Buffer.from(svg)).png().toBuffer();
}

mkdirSync(OUT_DIR, { recursive: true });
let generated = 0;
let skipped = 0;

for (const file of readdirSync(BLOG_DIR)) {
	if (!/\.(md|mdx)$/.test(file)) continue;
	const body = readFileSync(join(BLOG_DIR, file), 'utf8');
	const contentId = frontmatter(body, 'contentId');
	const title = frontmatter(body, 'title');
	const category = frontmatter(body, 'category');
	const status = frontmatter(body, 'status');
	if (!contentId || !title || status === 'archived') continue;

	const out = join(OUT_DIR, `${contentId}.png`);
	if (existsSync(out) && !force) {
		skipped++;
		continue;
	}
	writeFileSync(out, await render(title, CATEGORIES[category] ?? category));
	console.log(`생성: ${out} — ${title}`);
	generated++;
}

console.log(`완료: ${generated}개 생성, ${skipped}개 건너뜀`);
