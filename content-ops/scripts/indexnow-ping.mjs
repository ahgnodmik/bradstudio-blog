#!/usr/bin/env node
/**
 * IndexNow ping — 새로 발행·갱신된 글 URL을 검색엔진(Bing·Naver 등)에 즉시 알림.
 *
 * Usage:
 *   node content-ops/scripts/indexnow-ping.mjs <slug> [slug2 ...]   # 지정 글만
 *   node content-ops/scripts/indexnow-ping.mjs --all                # published 전체
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const SITE = 'https://bradstudio.xyz';
const KEY = 'b01bf6cd9ca54ae68e9398adb950bd0e';

const args = process.argv.slice(2);
let urls;
if (args.includes('--all')) {
  urls = readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => /^status:\s*published\s*$/m.test(readFileSync(join(BLOG_DIR, f), 'utf8')))
    .map((f) => `${SITE}/blog/${f.replace(/\.mdx?$/, '')}/`);
} else if (args.length) {
  urls = args.map((s) => `${SITE}/blog/${s.replace(/\/$/, '').replace(/^.*\//, '')}/`);
} else {
  console.log('Usage: indexnow-ping.mjs <slug> [...] | --all');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'bradstudio.xyz',
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});
console.log(`IndexNow ${res.status} — ${urls.length} URL(s)`);
urls.forEach((u) => console.log(`  ${u}`));
if (!res.ok) console.error(await res.text());
