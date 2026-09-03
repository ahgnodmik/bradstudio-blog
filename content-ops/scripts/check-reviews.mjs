#!/usr/bin/env node
// reviewAfter 기한 지난 글 목록 (재검수 대상)

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_DIR = 'src/content/blog';
const today = new Date();
let count = 0;

for (const file of readdirSync(BLOG_DIR)) {
	if (!/\.(md|mdx)$/.test(file)) continue;
	const body = readFileSync(join(BLOG_DIR, file), 'utf8');
	const review = body.match(/^reviewAfter:\s*['"]?(\d{4}-\d{2}-\d{2})/m);
	const status = body.match(/^status:\s*['"]?(\w+)/m)?.[1];
	if (!review || status === 'archived') continue;
	if (new Date(review[1]) <= today) {
		const title = body.match(/^title:\s*['"]?(.+?)['"]?\s*$/m)?.[1] ?? file;
		console.log(`재검수 필요: ${file} — "${title}" (기한 ${review[1]})`);
		count++;
	}
}

console.log(count === 0 ? '재검수 대상 없음.' : `총 ${count}건.`);
