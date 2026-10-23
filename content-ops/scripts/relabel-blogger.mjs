#!/usr/bin/env node
/**
 * Blogger 글 라벨을 4개 카테고리(blogger-labels.mjs) 중 1개로 바꾼다.
 * - 교차 발행 글: derivatives 기록 → bradstudio 글의 category·tags로 결정
 * - Blogger에 직접 쓴 글(기록 없음): 2026-08 이전은 '지원금·복지', 그 뒤는 '생활·재테크'
 * 429(쿼터 초과)를 만나면 멈춘다. 다시 실행하면 이미 바뀐 글은 건너뛴다.
 * Usage: node content-ops/scripts/relabel-blogger.mjs [--dry-run]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOGGER_LABELS, bloggerLabel } from './blogger-labels.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DERIV_DIR = join(ROOT, 'content-ops', 'derivatives');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const DRY = process.argv.includes('--dry-run');

// 설정이 지원금이 아닌 직접 쓴 글
const MANUAL = { '전시회 200% 즐기는 법': '생활·재테크' };

const posts = readdirSync(BLOG_DIR)
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => {
    const fm = readFileSync(join(BLOG_DIR, f), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const get = (k) => fm.match(new RegExp(`^${k}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
    const tags = [...fm.matchAll(/^tags:\n((?:\s+-\s+.+\n?)+)/gm)].flatMap((t) =>
      [...t[1].matchAll(/-\s+["']?([^"'\n]+)["']?/g)].map((x) => x[1]),
    );
    return { contentId: get('contentId'), title: get('title'), category: get('category'), tags };
  });

const recByPostId = {};
for (const d of readdirSync(DERIV_DIR)) {
  const f = join(DERIV_DIR, d, 'blogger.json');
  if (existsSync(f)) recByPostId[JSON.parse(readFileSync(f, 'utf8')).bloggerPostId] = d;
}

const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
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
const base = `https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOGGER_BLOG_ID}/posts`;

const items = [];
let pageToken = '';
do {
  const r = await (
    await fetch(`${base}?maxResults=500&fetchBodies=false&status=live${pageToken ? `&pageToken=${pageToken}` : ''}`, { headers: auth })
  ).json();
  items.push(...(r.items ?? []));
  pageToken = r.nextPageToken;
} while (pageToken);

function labelFor(item) {
  const manual = Object.entries(MANUAL).find(([k]) => item.title.startsWith(k));
  if (manual) return manual[1];
  const cid = recByPostId[item.id];
  // 같은 contentId가 여러 글에 붙은 경우가 있어 제목으로 먼저 찾는다
  const src = posts.find((p) => p.title === item.title) ?? (cid && posts.find((p) => p.contentId === cid));
  if (src?.category) return bloggerLabel(src);
  return item.published < '2026-08-01' ? '지원금·복지' : '생활·재테크';
}

const counts = Object.fromEntries(BLOGGER_LABELS.map((l) => [l, 0]));
let changed = 0, same = 0, failed = 0;
for (const item of items) {
  const label = labelFor(item);
  counts[label]++;
  if (item.labels?.length === 1 && item.labels[0] === label) { same++; continue; }
  if (DRY) { changed++; continue; }
  const out = await (
    await fetch(`${base}/${item.id}`, {
      method: 'PATCH',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ labels: [label] }),
    })
  ).json();
  if (out.id) changed++;
  else if (out.error?.code === 429) { console.error('429 쿼터 초과 — 중단. 나중에 다시 실행'); process.exitCode = 2; break; }
  else { console.error(`${item.title.slice(0, 30)}: PATCH failed ${JSON.stringify(out).slice(0, 200)}`); failed++; }
}
console.log(Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(' · '));
console.log(`완료: changed=${changed} same=${same} failed=${failed} total=${items.length}${DRY ? ' (dry-run)' : ''}`);
