#!/usr/bin/env node
// AI 검색엔진용 llms.txt 생성기 — public/llms.txt
// llmstxt.org 규격. 발행 글 추가·제목 변경 후 실행:
//   node content-ops/scripts/generate-llms.mjs

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_DIR = 'src/content/blog';
const OUT = 'public/llms.txt';
const SITE = 'https://bradstudio.xyz';
const TITLE = 'Brad Studio';
const SUMMARY =
	'생활·디지털·재테크·쇼핑 분야의 실제 질문에 답하는 한국어 블로그. 계산·비교표·출처를 갖춘 글로 검색에서 바로 쓸 수 있는 답을 제공합니다. 주제 선정·팩트 검수·편집은 사람이 직접 관여합니다.';

const CATEGORY_LABELS = { living: '생활', digital: '디지털', money: '재테크', shopping: '쇼핑' };

function fm(body, key) {
	return body.match(new RegExp(`^${key}:\\s*['"]?(.+?)['"]?\\s*$`, 'm'))?.[1];
}

const posts = [];
for (const file of readdirSync(BLOG_DIR)) {
	if (!/\.(md|mdx)$/.test(file)) continue;
	const body = readFileSync(join(BLOG_DIR, file), 'utf8');
	if (fm(body, 'status') !== 'published') continue;
	posts.push({
		slug: file.replace(/\.(md|mdx)$/, ''),
		title: fm(body, 'title') ?? file,
		description: fm(body, 'description') ?? '',
		category: fm(body, 'category') ?? '',
		pubDate: fm(body, 'pubDate') ?? '',
	});
}

posts.sort((a, b) => b.pubDate.localeCompare(a.pubDate));

// 카테고리별 그룹
const byCat = {};
for (const p of posts) (byCat[p.category] ??= []).push(p);

let out = `# ${TITLE}\n\n> ${SUMMARY}\n`;

for (const [cat, items] of Object.entries(byCat)) {
	const label = CATEGORY_LABELS[cat] ?? cat;
	out += `\n## ${label}\n\n`;
	for (const p of items) {
		out += `- [${p.title}](${SITE}/blog/${p.slug}/)`;
		if (p.description) out += `: ${p.description}`;
		out += '\n';
	}
}

out += `\n## 사이트 정보\n\n`;
out += `- [소개](${SITE}/about/)\n`;
out += `- [개인정보처리방침](${SITE}/privacy/)\n`;
out += `- [전체 글](${SITE}/blog/)\n`;
out += `- [RSS](${SITE}/rss.xml)\n`;

writeFileSync(OUT, out, 'utf8');
console.log(`생성: ${OUT} — 글 ${posts.length}개, 카테고리 ${Object.keys(byCat).length}개`);
