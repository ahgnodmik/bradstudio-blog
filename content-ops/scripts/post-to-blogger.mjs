#!/usr/bin/env node
/**
 * Cross-post published blog articles to Blogger (mitssum.blogspot.com).
 *
 * Usage:
 *   node content-ops/scripts/post-to-blogger.mjs --auth          # one-time OAuth, prints refresh token
 *   node content-ops/scripts/post-to-blogger.mjs --list          # published posts eligible for cross-post
 *   node content-ops/scripts/post-to-blogger.mjs <contentId>     # post to Blogger (live)
 *   node content-ops/scripts/post-to-blogger.mjs <contentId> --draft
 *   node content-ops/scripts/post-to-blogger.mjs <contentId> \
 *     --image <unsplash-url> --image-alt "설명" --credit "Author Name|https://unsplash.com/@author"
 *
 * Blogger uses the first image in the post body as the thumbnail, so --image
 * prepends a centered figure with Unsplash attribution above the content.
 *
 * Env (.env at repo root):
 *   BLOGGER_CLIENT_ID, BLOGGER_CLIENT_SECRET, BLOGGER_REFRESH_TOKEN
 *   BLOGGER_BLOG_URL (default https://mitssum.blogspot.com)
 *
 * Policy: only posts with status: published, pubDate older than DELAY_DAYS,
 * and no existing derivatives/<contentId>/blogger.json record.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog');
const DERIV_DIR = join(ROOT, 'content-ops', 'derivatives');
const SITE = 'https://bradstudio.xyz';
const DELAY_DAYS = 7;

loadEnv();
const BLOG_URL = process.env.BLOGGER_BLOG_URL || 'https://mitssum.blogspot.com';

const args = process.argv.slice(2);
const flagValue = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
if (args.includes('--auth')) await authFlow();
else if (args.includes('--list')) listEligible();
else if (args[0]) await postToBlogger(args[0], args.includes('--draft'));
else {
  console.log('Usage: post-to-blogger.mjs --auth | --list | <contentId> [--draft]');
  process.exit(1);
}

function loadEnv() {
  const envPath = join(ROOT, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=["']?([^"'\n]*)["']?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

function parsePost(file) {
  const raw = readFileSync(join(BLOG_DIR, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const [, fm, body] = m;
  const get = (key) => fm.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
  const tags = [...fm.matchAll(/^tags:\n((?:\s+-\s+.+\n?)+)/gm)]
    .flatMap((t) => [...t[1].matchAll(/-\s+["']?([^"'\n]+)["']?/g)].map((x) => x[1]));
  return {
    file,
    slug: file.replace(/\.mdx?$/, ''),
    contentId: get('contentId'),
    title: get('title'),
    pubDate: get('pubDate'),
    status: get('status'),
    tags,
    body,
  };
}

function allPosts() {
  return readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parsePost)
    .filter(Boolean);
}

function derivPath(contentId) {
  return join(DERIV_DIR, contentId, 'blogger.json');
}

function eligible(p) {
  if (p.status !== 'published' || !p.contentId || !p.pubDate) return false;
  if (existsSync(derivPath(p.contentId))) return false;
  const ageDays = (Date.now() - new Date(p.pubDate).getTime()) / 86400000;
  return ageDays >= DELAY_DAYS;
}

function listEligible() {
  const posts = allPosts();
  const ready = posts.filter(eligible);
  const waiting = posts.filter(
    (p) => p.status === 'published' && !existsSync(derivPath(p.contentId ?? '')) && !eligible(p)
  );
  console.log(`Eligible (published ≥${DELAY_DAYS}d, not yet on Blogger):`);
  for (const p of ready) console.log(`  ${p.contentId}  ${p.pubDate}  ${p.title}`);
  if (!ready.length) console.log('  (none)');
  if (waiting.length) {
    console.log('\nWaiting for delay:');
    for (const p of waiting) console.log(`  ${p.contentId}  ${p.pubDate}  ${p.title}`);
  }
}

async function accessToken() {
  const { BLOGGER_CLIENT_ID, BLOGGER_CLIENT_SECRET, BLOGGER_REFRESH_TOKEN } = process.env;
  if (!BLOGGER_CLIENT_ID || !BLOGGER_CLIENT_SECRET || !BLOGGER_REFRESH_TOKEN) {
    console.error('Missing BLOGGER_CLIENT_ID / BLOGGER_CLIENT_SECRET / BLOGGER_REFRESH_TOKEN in .env');
    console.error('Run with --auth first.');
    process.exit(1);
  }
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: BLOGGER_CLIENT_ID,
      client_secret: BLOGGER_CLIENT_SECRET,
      refresh_token: BLOGGER_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function blogId(token) {
  if (process.env.BLOGGER_BLOG_ID) return process.env.BLOGGER_BLOG_ID;
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${encodeURIComponent(BLOG_URL)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  if (!data.id) throw new Error(`Blog lookup failed: ${JSON.stringify(data)}`);
  return data.id;
}

async function postToBlogger(contentId, asDraft) {
  const post = allPosts().find((p) => p.contentId === contentId || p.slug === contentId);
  if (!post) {
    console.error(`Post not found: ${contentId}`);
    process.exit(1);
  }
  if (post.status !== 'published') {
    console.error(`Refusing: status is "${post.status}", not "published".`);
    process.exit(1);
  }
  if (existsSync(derivPath(post.contentId))) {
    console.error(`Already cross-posted — see ${derivPath(post.contentId)}`);
    process.exit(1);
  }
  const ageDays = (Date.now() - new Date(post.pubDate).getTime()) / 86400000;
  if (ageDays < DELAY_DAYS) {
    console.error(`Refusing: pubDate ${post.pubDate} is ${ageDays.toFixed(1)}d old, delay is ${DELAY_DAYS}d.`);
    process.exit(1);
  }

  const processor = await createMarkdownProcessor({});
  const rendered = await processor.render(post.body);
  const canonical = `${SITE}/blog/${post.slug}/`;

  let figure = '';
  const imageUrl = flagValue('--image');
  if (imageUrl) {
    const alt = flagValue('--image-alt') ?? post.title;
    const [creditName, creditUrl] = (flagValue('--credit') ?? '').split('|');
    const credit = creditName
      ? `<p style="text-align: center; font-size: small; color: #777;">` +
        `Photo by <a href="${creditUrl}?utm_source=bradstudio&utm_medium=referral">${creditName}</a> on ` +
        `<a href="https://unsplash.com/?utm_source=bradstudio&utm_medium=referral">Unsplash</a></p>\n`
      : '';
    figure =
      `<div class="separator" style="clear: both; text-align: center;">` +
      `<img src="${imageUrl}" alt="${alt}" style="max-width: 100%; height: auto;" /></div>` +
      credit;
  }

  const html =
    figure +
    `<p><em>이 글은 <a href="${canonical}">bradstudio.xyz</a>에 먼저 게재된 글입니다. ` +
    `최신 업데이트는 <a href="${canonical}">원문</a>에서 확인하세요.</em></p>\n` +
    String(rendered.code ?? rendered) +
    `\n<p><em>원문: <a href="${canonical}">${canonical}</a></em></p>`;

  const token = await accessToken();
  const id = await blogId(token);
  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${id}/posts/${asDraft ? '?isDraft=true' : ''}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: post.title, content: html, labels: post.tags }),
    }
  );
  const data = await res.json();
  if (!data.id) throw new Error(`Blogger post failed: ${JSON.stringify(data)}`);

  mkdirSync(dirname(derivPath(post.contentId)), { recursive: true });
  writeFileSync(
    derivPath(post.contentId),
    JSON.stringify(
      { bloggerPostId: data.id, url: data.url, status: asDraft ? 'draft' : 'live', postedAt: new Date().toISOString() },
      null,
      2
    ) + '\n'
  );
  console.log(`${asDraft ? 'Draft' : 'Posted'}: ${data.url ?? `(blogger post id ${data.id})`}`);
  console.log(`Record: ${derivPath(post.contentId)}`);
}

async function authFlow() {
  const { BLOGGER_CLIENT_ID, BLOGGER_CLIENT_SECRET } = process.env;
  if (!BLOGGER_CLIENT_ID || !BLOGGER_CLIENT_SECRET) {
    console.error('Set BLOGGER_CLIENT_ID and BLOGGER_CLIENT_SECRET in .env first.');
    process.exit(1);
  }
  const port = 8756;
  const redirect = `http://127.0.0.1:${port}`;
  const authUrl =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
      client_id: BLOGGER_CLIENT_ID,
      redirect_uri: redirect,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/blogger',
      access_type: 'offline',
      prompt: 'consent',
    });
  console.log('Open this URL in your browser and authorize:\n\n' + authUrl + '\n');

  const code = await new Promise((resolve) => {
    const server = createServer((req, res) => {
      const c = new URL(req.url, redirect).searchParams.get('code');
      res.end(c ? 'Authorized. Return to terminal.' : 'No code received.');
      if (c) {
        server.close();
        resolve(c);
      }
    });
    server.listen(port);
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: BLOGGER_CLIENT_ID,
      client_secret: BLOGGER_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirect,
    }),
  });
  const data = await res.json();
  if (!data.refresh_token) throw new Error(`Auth failed: ${JSON.stringify(data)}`);
  console.log('\nAdd to .env:\n');
  console.log(`BLOGGER_REFRESH_TOKEN=${data.refresh_token}`);
}
