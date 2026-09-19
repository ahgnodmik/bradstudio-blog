#!/usr/bin/env node
/**
 * One-off repair: absolutize site-relative src/href in already-posted Blogger posts.
 * Reads derivatives/<id>/blogger.json records, fetches each post, PATCHes if changed.
 * Usage: node content-ops/scripts/fix-blogger-images.mjs [--dry-run]
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DERIV_DIR = join(ROOT, 'content-ops', 'derivatives');
const SITE = 'https://bradstudio.xyz';
const DRY = process.argv.includes('--dry-run');

for (const line of readFileSync(join(ROOT, '.env'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=["']?([^"'\n]*)["']?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const BLOG_URL = process.env.BLOGGER_BLOG_URL || 'https://mitssum.blogspot.com';

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

let blogId = process.env.BLOGGER_BLOG_ID;
if (!blogId) {
  const r = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${encodeURIComponent(BLOG_URL)}`,
    { headers: auth }
  );
  blogId = (await r.json()).id;
}

let fixed = 0, clean = 0;
for (const dir of readdirSync(DERIV_DIR)) {
  const rec = join(DERIV_DIR, dir, 'blogger.json');
  if (!existsSync(rec)) continue;
  const { bloggerPostId } = JSON.parse(readFileSync(rec, 'utf8'));
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${bloggerPostId}`,
    { headers: auth }
  );
  const post = await res.json();
  if (!post.content) { console.error(`${dir}: fetch failed ${JSON.stringify(post).slice(0, 200)}`); continue; }
  const updated = post.content
    .replaceAll('src="/', `src="${SITE}/`)
    .replaceAll('href="/', `href="${SITE}/`);
  if (updated === post.content) { clean++; continue; }
  if (DRY) { console.log(`${dir}: would fix`); fixed++; continue; }
  const patch = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${bloggerPostId}`,
    {
      method: 'PATCH',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: updated }),
    }
  );
  const out = await patch.json();
  if (out.id) { console.log(`${dir}: fixed`); fixed++; }
  else console.error(`${dir}: PATCH failed ${JSON.stringify(out).slice(0, 200)}`);
}
console.log(`\nDone. fixed=${fixed} clean=${clean}${DRY ? ' (dry-run)' : ''}`);
