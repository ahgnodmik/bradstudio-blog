#!/usr/bin/env node
// keyword → draft Markdown 생성기 (MVP v0.1)
//
// 사용법:
//   node content-ops/scripts/new-draft.mjs "제습기 전기세" --slug dehumidifier-electricity-cost \
//     --category living --intent informational
//
// slug는 영문 kebab-case 필수. category/intent 생략 시 living/informational.

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_DIR = 'src/content/blog';

function parseArgs(argv) {
	const args = { _: [] };
	for (let i = 0; i < argv.length; i++) {
		if (argv[i].startsWith('--')) {
			args[argv[i].slice(2)] = argv[++i];
		} else {
			args._.push(argv[i]);
		}
	}
	return args;
}

const args = parseArgs(process.argv.slice(2));
const keyword = args._[0];
const slug = args.slug;
const category = args.category ?? 'living';
const intent = args.intent ?? 'informational';

if (!keyword || !slug) {
	console.error('사용법: node new-draft.mjs "<keyword>" --slug <english-kebab-case> [--category living] [--intent informational]');
	process.exit(1);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
	console.error(`slug는 영문 kebab-case만 허용: ${slug}`);
	process.exit(1);
}

const filePath = join(BLOG_DIR, `${slug}.md`);
if (existsSync(filePath)) {
	console.error(`이미 존재: ${filePath}`);
	process.exit(1);
}

// 같은 primaryKeyword 중복 확인 (문서 8절 안전장치)
for (const file of readdirSync(BLOG_DIR)) {
	if (!/\.(md|mdx)$/.test(file)) continue;
	const body = readFileSync(join(BLOG_DIR, file), 'utf8');
	const match = body.match(/^primaryKeyword:\s*['"]?(.+?)['"]?\s*$/m);
	if (match && match[1] === keyword) {
		console.error(`같은 primaryKeyword 글 존재: ${file} — 병합 또는 업데이트 검토`);
		process.exit(1);
	}
}

// contentId 채번: bs-YYYYMMDD-NNN, 당일 최대 번호 + 1
const today = new Date();
const ymd = today.toISOString().slice(0, 10).replace(/-/g, '');
let max = 0;
for (const file of readdirSync(BLOG_DIR)) {
	if (!/\.(md|mdx)$/.test(file)) continue;
	const body = readFileSync(join(BLOG_DIR, file), 'utf8');
	const match = body.match(new RegExp(`^contentId:\\s*['"]?bs-${ymd}-(\\d{3})`, 'm'));
	if (match) max = Math.max(max, Number(match[1]));
}
const contentId = `bs-${ymd}-${String(max + 1).padStart(3, '0')}`;
const isoDate = today.toISOString().slice(0, 10);

const template = `---
contentId: "${contentId}"
title: '${keyword} (제목 후보 3개 만든 뒤 확정)'
description: '메타 설명 (검색 결과에 노출될 150자 내외)'
pubDate: ${isoDate}

status: draft

category: ${category}
tags: []

primaryKeyword: '${keyword}'
secondaryKeywords: []
intent: ${intent}
funnelStage: awareness
cluster: ''
clusterRole: supporting

evergreen: true
author: 'Brad Studio'

sources: []
internalLinks: []

monetization:
  methods: []
  affiliateDisclosure: false

faq: []

seo:
  noindex: false
---

## 개요

<!-- 검색자가 원하는 답을 첫 문단에서 바로 제시 -->

## 본문

<!-- 계산, 근거, 체크리스트 -->

## 비교표

<!-- 필요 시 -->

## 마무리

<!-- 다음 행동 안내, 내부링크 -->
`;

writeFileSync(filePath, template);
console.log(`생성: ${filePath}`);
console.log(`contentId: ${contentId}`);
console.log('작성·검수 후 status: published 로 변경하고 커밋.');
