// 매뉴얼 PDF 생성: node build.mjs "구매자명" [피그마 복제 링크] [문의처]
// 구매자명을 표지·하단에 찍어 재배포를 막는다. playwright 필요(npm i playwright).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const dir = dirname(fileURLToPath(import.meta.url));
const [buyer = '구매자', link = '[피그마 복제 링크]', contact = '[카카오톡 채널 / 이메일]'] = process.argv.slice(2);

const html = readFileSync(join(dir, 'manual.html'), 'utf8')
	.replaceAll('{{BUYER}}', buyer)
	.replaceAll('{{FIGMA_LINK}}', link)
	.replaceAll('{{CONTACT}}', contact);
const tmp = join(dir, '.manual.tmp.html');
writeFileSync(tmp, html);

// CHROME_PATH가 있으면 그 크롬을 쓴다(설치된 playwright 브라우저 버전이 안 맞을 때).
const browser = await chromium.launch(
	process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
);
const page = await browser.newPage();
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const out = join(dir, `manual-${buyer}.pdf`);
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(out);
