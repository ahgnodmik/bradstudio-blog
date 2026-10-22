#!/usr/bin/env node
/**
 * 이미 올린 Blogger 글에 쿠팡 파트너스 위젯을 붙인다.
 * derivatives/<id>/blogger.json 기록을 읽어 글을 가져오고, 위젯이 없으면 끝에 붙여 PATCH.
 * 429(쿼터 초과)를 만나면 그 자리에서 멈춘다. 다시 실행하면 남은 글만 처리한다.
 * Usage: node content-ops/scripts/add-blogger-coupang.mjs [--dry-run] [--limit N] [--only <contentId>]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COUPANG_HTML, COUPANG_MARKER } from './blogger-coupang.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DERIV_DIR = join(ROOT, 'content-ops', 'derivatives');
const DRY = process.argv.includes('--dry-run');
const flag = (name) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const LIMIT = Number(flag('--limit') ?? Infinity);
const ONLY = flag('--only');

const envFile = join(ROOT, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=["']?([^"'\n]*)["']?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: process.env.BLOGGER_CLIENT_ID,
    client_secret: process.env.BLOGGER_CLIENT_SECRET,
    refresh_token: process.env.BLOGGER_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  }),
});
const { access_token: token } = await tokenRes.json();
if (!token) throw new Error('Token refresh failed');
const auth = { Authorization: `Bearer ${token}` };
const blogId = process.env.BLOGGER_BLOG_ID;
if (!blogId) throw new Error('BLOGGER_BLOG_ID missing');
const api = (postId) => `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`;

let added = 0, already = 0, failed = 0;
const dirs = readdirSync(DERIV_DIR).filter((d) => existsSync(join(DERIV_DIR, d, 'blogger.json')) && (!ONLY || d === ONLY)).sort();
for (const dir of dirs) {
  if (added >= LIMIT) break;
  const { bloggerPostId, url } = JSON.parse(readFileSync(join(DERIV_DIR, dir, 'blogger.json'), 'utf8'));
  const post = await (await fetch(api(bloggerPostId), { headers: auth })).json();
  if (post.error?.code === 429) { console.error(`${dir}: 429 쿼터 초과 — 중단`); process.exitCode = 2; break; }
  if (!post.content) { console.error(`${dir}: fetch failed ${JSON.stringify(post).slice(0, 200)}`); failed++; continue; }
  if (post.content.includes(COUPANG_MARKER)) { already++; continue; }
  if (DRY) { console.log(`${dir}: would add`); added++; continue; }
  const out = await (
    await fetch(api(bloggerPostId), {
      method: 'PATCH',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: post.content + COUPANG_HTML }),
    })
  ).json();
  if (out.id) { console.log(`${dir}: added ${url}`); added++; }
  else if (out.error?.code === 429) { console.error(`${dir}: 429 쿼터 초과 — 중단`); process.exitCode = 2; break; }
  else { console.error(`${dir}: PATCH failed ${JSON.stringify(out).slice(0, 200)}`); failed++; }
}
const remaining = dirs.length - already - added - failed;
console.log(`\n완료: added=${added} already=${already} failed=${failed} remaining=${remaining}${DRY ? ' (dry-run)' : ''}`);
