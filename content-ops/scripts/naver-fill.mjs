#!/usr/bin/env node
// 네이버 블로그 반자동 입력: content-ops/naver/<날짜>/<계정>-<번호>-*.txt 를 글쓰기 화면에 채운다.
// 발행 버튼은 누르지 않는다. 사람이 검토하고 직접 발행한다(네이버 자동화 제재 방지).
//
// 준비(로컬 PC, 한 번만):  npm i --no-save playwright && npx playwright install chromium
// 사용:
//   node content-ops/scripts/naver-fill.mjs --account A                 # 오늘(KST) A 계정 3편
//   node content-ops/scripts/naver-fill.mjs --account B --date 2026-10-18 --post 2
//   node content-ops/scripts/naver-fill.mjs --account A --dry-run       # 브라우저 없이 파싱 결과만 확인
//   node content-ops/scripts/naver-fill.mjs --account A --clip          # 지금 쓰는 크롬에서 직접 붙여넣기(자동화 없음)
//   node content-ops/scripts/naver-fill.mjs --account A --chrome        # Chromium 대신 설치된 크롬으로 창 열기
//
// --clip: 제목·본문을 차례로 클립보드에 복사하고 기다린다. 평소 크롬의 글쓰기 화면에서 ⌘V(Ctrl+V)로 붙여넣는다.
//
// 계정마다 브라우저 프로필이 따로 저장된다(.naver-profiles/<계정>). 첫 실행 때 그 창에서 직접 로그인하면
// 다음부터는 로그인이 유지된다. 비밀번호를 스크립트에 넣지 않는다.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const flag = (name) => args.includes(`--${name}`);

const kstToday = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const date = opt('date', kstToday);
const account = (opt('account', '') || '').toUpperCase();
const onlyPost = opt('post', null);
const dryRun = flag('dry-run');
const clipMode = flag('clip');
const useChrome = flag('chrome');

if (!/^[A-D]$/.test(account)) {
  console.error('사용법: --account A|B|C|D [--date YYYY-MM-DD] [--post 1|2|3] [--dry-run | --clip | --chrome]');
  process.exit(1);
}

const dir = path.join(ROOT, 'content-ops/naver', date);
if (!fs.existsSync(dir)) {
  console.error(`폴더 없음: ${dir}`);
  process.exit(1);
}

// README.txt의 "A-1 https://unsplash.com/photos/... (작가)" 줄에서 이미지 안내를 읽는다.
const readme = fs.existsSync(path.join(dir, 'README.txt')) ? fs.readFileSync(path.join(dir, 'README.txt'), 'utf8') : '';
const imageFor = (key) => (readme.match(new RegExp(`^${key}\\s+(https://unsplash\\.com/photos/\\S+.*)$`, 'm')) || [])[1] || '(README에 이미지 없음)';

const posts = fs
  .readdirSync(dir)
  .filter((f) => new RegExp(`^${account}-[1-3]-.+\\.txt$`).test(f))
  .filter((f) => !onlyPost || f.startsWith(`${account}-${onlyPost}-`))
  .sort()
  .map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r/g, '');
    const [first, , ...rest] = raw.split('\n');
    const key = f.slice(0, 3);
    return { file: f, key, title: first.replace(/^제목:\s*/, '').trim(), body: rest.join('\n').trim(), image: imageFor(key) };
  });

if (!posts.length) {
  console.error(`${dir} 에 ${account} 계정 글이 없습니다.`);
  process.exit(1);
}

if (dryRun) {
  for (const p of posts) {
    console.log(`\n[${p.key}] ${p.file}\n제목: ${p.title}\n본문: ${p.body.length}자, ${p.body.split('\n').length}줄\n이미지: ${p.image}`);
  }
  process.exit(0);
}

// 클립보드 모드: 브라우저를 조작하지 않는다. macOS pbcopy, 윈도우 PowerShell Set-Clipboard.
if (clipMode) {
  const copy = (text) => {
    if (process.platform === 'darwin') execSync('pbcopy', { input: text });
    else if (process.platform === 'win32') execSync('powershell -NoProfile -Command "$input | Set-Clipboard"', { input: text });
    else execSync('xclip -selection clipboard', { input: text });
  };
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('평소 크롬에서 네이버 블로그 글쓰기 화면(blog.naver.com → 글쓰기)을 열어 두세요.');
  for (const [i, p] of posts.entries()) {
    console.log(`\n[${p.key}] (${i + 1}/${posts.length}) ${p.title}`);
    copy(p.title);
    await rl.question('  ① 제목을 복사했습니다. 제목 칸에 ⌘V 후 Enter: ');
    copy(p.body);
    await rl.question('  ② 본문을 복사했습니다. 본문 칸에 ⌘V 후 Enter: ');
    console.log(`  ③ 이미지: ${p.image}\n     사진을 맨 위에 넣고 작가를 표기한 뒤 [발행]을 누르세요.`);
    await rl.question(posts[i + 1] ? '  발행을 마쳤으면 Enter → 다음 글: ' : '  발행을 마쳤으면 Enter → 종료: ');
  }
  rl.close();
  process.exit(0);
}

const { chromium } = await import('playwright').catch(() => {
  console.error('playwright가 없습니다. npm i --no-save playwright && npx playwright install chromium 후 다시 실행하세요.');
  process.exit(1);
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const profile = path.join(ROOT, '.naver-profiles', account);
const ctx = await chromium.launchPersistentContext(profile, { headless: false, viewport: null, args: ['--start-maximized'], ...(useChrome ? { channel: 'chrome' } : {}) });
const page = ctx.pages()[0] || (await ctx.newPage());

// 글쓰기 화면을 열고, 로그인이 필요하면 사람이 로그인할 때까지 기다린 뒤 에디터 프레임을 돌려준다.
async function openEditor() {
  await page.goto('https://blog.naver.com/GoBlogWrite.naver', { waitUntil: 'domcontentloaded' });
  if (page.url().includes('nid.naver.com')) {
    console.log(`\n[${account}] 열린 창에서 네이버에 로그인하세요. 로그인하면 자동으로 이어집니다(최대 5분).`);
    await page.waitForURL(/blog\.naver\.com/, { timeout: 300e3 });
  }
  const frameEl = await page.waitForSelector('iframe#mainFrame', { timeout: 60e3 }).catch(() => null);
  const editor = frameEl ? await frameEl.contentFrame() : page.mainFrame();
  await editor.waitForSelector('.se-documentTitle, .se-title-text', { timeout: 60e3 });

  // "작성 중인 글이 있습니다" 팝업은 새로 쓰기(취소)로, 도움말 패널은 닫는다.
  for (const sel of ['.se-popup-button-cancel', '.se-help-panel-close-button']) {
    const btn = await editor.$(sel);
    if (btn) await btn.click().catch(() => {});
  }
  return editor;
}

// 한 줄씩 입력하고 Enter로 문단을 나눈다. URL 줄도 Enter 뒤에 에디터가 링크로 바꾼다.
async function typeLines(text) {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]) await page.keyboard.insertText(lines[i]);
    if (i < lines.length - 1) await page.keyboard.press('Enter');
  }
}

for (const [i, p] of posts.entries()) {
  console.log(`\n[${p.key}] (${i + 1}/${posts.length}) ${p.title}`);
  const editor = await openEditor();

  await editor.click('.se-documentTitle .se-text-paragraph, .se-title-text');
  await page.keyboard.insertText(p.title);

  await editor.click('.se-component.se-text .se-text-paragraph, .se-section-text .se-text-paragraph');
  await typeLines(p.body);

  console.log(`  입력 완료. 이미지: ${p.image}`);
  console.log('  사진을 본문 맨 위에 넣고(작가 표기 포함), 내용을 확인한 뒤 [발행]을 직접 누르세요.');
  await rl.question(posts[i + 1] ? '  발행을 마쳤으면 Enter → 다음 글로 이동: ' : '  발행을 마쳤으면 Enter → 종료: ');
}

rl.close();
await ctx.close();
console.log(`\n[${account}] ${posts.length}편 입력을 마쳤습니다.`);
