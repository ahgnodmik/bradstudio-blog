#!/usr/bin/env node
/**
 * Blogger 교차 발행 일괄 실행기 (루틴용).
 *
 * post-to-blogger.mjs의 정책(published · 발행 2일 경과 · blogger.json 기록 없음)을 그대로 따르고,
 * 추가로 reviewAfter가 오늘보다 이전인 시의성 지난 글은 건너뛴다.
 * 썸네일·대체텍스트·Unsplash 크레딧은 frontmatter thumbnail에서 자동으로 넘긴다.
 *
 * Usage:
 *   node content-ops/scripts/crosspost-blogger.mjs            # 실제 발행
 *   node content-ops/scripts/crosspost-blogger.mjs --dry-run  # 대상만 출력
 *   node content-ops/scripts/crosspost-blogger.mjs --limit 5  # 한 번에 최대 N건
 *
 * Env: BLOGGER_CLIENT_ID, BLOGGER_CLIENT_SECRET, BLOGGER_REFRESH_TOKEN (환경 변수 또는 .env)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const DERIV_DIR = join(ROOT, 'content-ops', 'derivatives');
const POSTER = join(ROOT, 'content-ops', 'scripts', 'post-to-blogger.mjs');
const DELAY_DAYS = 2;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;

// KST 기준 오늘(YYYY-MM-DD)
const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const toDay = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? '').slice(0, 10));

const posts = readdirSync(BLOG_DIR)
	.filter((f) => /\.mdx?$/.test(f))
	.map((f) => {
		const m = readFileSync(join(BLOG_DIR, f), 'utf8').match(/^---\n([\s\S]*?)\n---/);
		return m ? { file: f, fm: yaml.load(m[1]) } : null;
	})
	.filter(Boolean);

const ready = [];
const skipped = [];
for (const { file, fm } of posts) {
	if (fm.status !== 'published' || !fm.contentId || !fm.pubDate) continue;
	if (existsSync(join(DERIV_DIR, fm.contentId, 'blogger.json'))) continue;
	const ageDays = (Date.now() - new Date(toDay(fm.pubDate)).getTime()) / 86400000;
	if (ageDays < DELAY_DAYS) continue;
	if (fm.reviewAfter && toDay(fm.reviewAfter) < today) {
		skipped.push(`${fm.contentId}  reviewAfter ${toDay(fm.reviewAfter)} 경과 — ${fm.title}`);
		continue;
	}
	ready.push({ file, fm });
}

ready.sort((a, b) => toDay(a.fm.pubDate).localeCompare(toDay(b.fm.pubDate)));
const batch = ready.slice(0, limit);

console.log(`오늘(KST) ${today} · 발행 대상 ${batch.length}건 · 시의성 경과로 제외 ${skipped.length}건`);
for (const s of skipped) console.log(`  제외 ${s}`);

let ok = 0;
let failed = 0;
for (const { fm } of batch) {
	const flags = [];
	if (fm.thumbnail?.url) {
		flags.push('--image', fm.thumbnail.url, '--image-alt', fm.thumbnail.alt || fm.title);
		if (fm.thumbnail.creditName && fm.thumbnail.creditUrl) {
			flags.push('--credit', `${fm.thumbnail.creditName}|${fm.thumbnail.creditUrl}`);
		}
	}
	console.log(`${dryRun ? '[dry-run] ' : ''}발행 ${fm.contentId} — ${fm.title}`);
	if (dryRun) continue;
	try {
		execFileSync('node', [POSTER, fm.contentId, ...flags], { cwd: ROOT, stdio: 'inherit' });
		ok++;
	} catch {
		failed++;
		console.error(`  실패 ${fm.contentId}`);
	}
}
if (!dryRun) console.log(`완료: 성공 ${ok}건, 실패 ${failed}건`);
process.exit(failed > 0 ? 1 : 0);
