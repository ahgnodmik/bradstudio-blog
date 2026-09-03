#!/usr/bin/env node
// 본문 삽입용 브랜드 인포그래픽 생성기 — public/img/<contentId>-N.png (1200x630)
// 실행: node content-ops/scripts/generate-infographics.mjs [--force]

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const OUT_DIR = 'public/img';
const FONT_DIR = 'src/assets/fonts/og';
const force = process.argv.includes('--force');

const bold = readFileSync(join(FONT_DIR, 'Pretendard-Bold.otf'));
const regular = readFileSync(join(FONT_DIR, 'Pretendard-Regular.otf'));

const INK = '#0a1317';
const STEEL = '#5d6c7b';
const HAIRLINE = '#dee3e9';
const COBALT = '#0064e0';

const el = (type, style, children) => ({ type, props: { style, children } });

function frame(title, children) {
	return el(
		'div',
		{
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: '#ffffff',
			padding: '56px 64px',
			borderTop: '12px solid ' + COBALT,
		},
		[
			el('div', { display: 'flex', fontSize: '42px', fontWeight: 700, color: INK, marginBottom: '36px' }, title),
			el('div', { display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }, children),
			el(
				'div',
				{ display: 'flex', justifyContent: 'flex-end', fontSize: '22px', color: STEEL, marginTop: '24px' },
				'bradstudio.xyz',
			),
		],
	);
}

function tableCard(spec) {
	return frame(
		spec.title,
		spec.rows.map((row, i) =>
			el(
				'div',
				{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '20px 8px',
					borderBottom: i < spec.rows.length - 1 ? '1px solid ' + HAIRLINE : 'none',
				},
				[
					el('div', { display: 'flex', fontSize: '30px', color: STEEL }, row.label),
					el('div', { display: 'flex', fontSize: '32px', fontWeight: 700, color: row.accent ? COBALT : INK }, row.value),
				],
			),
		),
	);
}

function stepsCard(spec) {
	return frame(
		spec.title,
		spec.steps.map((step, i) =>
			el('div', { display: 'flex', alignItems: 'center', padding: '14px 8px' }, [
				el(
					'div',
					{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '52px',
						height: '52px',
						borderRadius: '9999px',
						backgroundColor: COBALT,
						color: '#ffffff',
						fontSize: '28px',
						fontWeight: 700,
						marginRight: '28px',
						flexShrink: 0,
					},
					String(i + 1),
				),
				el('div', { display: 'flex', fontSize: '30px', color: INK }, step),
			]),
		),
	);
}

function rangeBar(spec) {
	const zones = spec.zones; // [{from,to,color,label,desc}]
	return frame(spec.title, [
		el(
			'div',
			{ display: 'flex', width: '100%', height: '72px', borderRadius: '16px', overflow: 'hidden', marginBottom: '28px' },
			zones.map((zone) =>
				el(
					'div',
					{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: `${zone.to - zone.from}%`,
						backgroundColor: zone.color,
						color: '#ffffff',
						fontSize: '28px',
						fontWeight: 700,
					},
					`${zone.from}~${zone.to}%`,
				),
			),
		),
		...zones.map((zone) =>
			el('div', { display: 'flex', alignItems: 'center', padding: '12px 8px' }, [
				el('div', {
					display: 'flex',
					width: '28px',
					height: '28px',
					borderRadius: '6px',
					backgroundColor: zone.color,
					marginRight: '20px',
					flexShrink: 0,
				}),
				el('div', { display: 'flex', fontSize: '28px', fontWeight: 700, color: INK, marginRight: '16px' }, zone.label),
				el('div', { display: 'flex', fontSize: '26px', color: STEEL }, zone.desc),
			]),
		),
	]);
}

const RENDERERS = { table: tableCard, steps: stepsCard, range: rangeBar };

// ---- 이미지 스펙 ----
const SPECS = [
	{
		id: 'bs-20260903-002-1',
		type: 'steps',
		title: '제습기 전기세 계산 순서',
		steps: [
			'제품 라벨에서 정격 소비전력(W) 확인',
			'소비전력 × 하루 사용시간 × 30일 ÷ 1,000 = 월 사용량(kWh)',
			'월 사용량 × 우리 집 누진 구간 단가 = 월 요금',
			'기후환경요금·부가세 등 +10~15% 감안',
		],
	},
	{
		id: 'bs-20260903-002-2',
		type: 'table',
		title: '하루 8시간 · 한 달 전기세 (누진 구간별)',
		rows: [
			{ label: '10L급 (200W · 48kWh)', value: '5,760 ~ 14,750원' },
			{ label: '16L급 (280W · 67.2kWh)', value: '8,060 ~ 20,650원', accent: true },
			{ label: '20L급 (330W · 79.2kWh)', value: '9,500 ~ 24,340원' },
		],
	},
	{
		id: 'bs-20260903-003-1',
		type: 'range',
		title: '실내 습도 구간별 상태',
		zones: [
			{ from: 0, to: 40, color: '#f2a918', label: '건조', desc: '피부·점막 건조, 호흡기 부담' },
			{ from: 40, to: 60, color: '#31a24c', label: '적정', desc: '보건당국 권장 범위' },
			{ from: 60, to: 100, color: '#e41e3f', label: '과습', desc: '곰팡이·집먼지진드기 번식' },
		],
	},
	{
		id: 'bs-20260903-003-2',
		type: 'table',
		title: '상황별 제습기 목표 습도',
		rows: [
			{ label: '평상시 거실·방', value: '50~55%', accent: true },
			{ label: '빨래 건조', value: '40~45%' },
			{ label: '수면 중', value: '55~60%' },
			{ label: '곰팡이 우려 공간', value: '50% 이하' },
		],
	},
	{
		id: 'bs-20260903-004-1',
		type: 'table',
		title: '제습기 냄새 유형별 원인',
		rows: [
			{ label: '시큼한 물비린내', value: '물통 물때' },
			{ label: '눅눅한 걸레 냄새', value: '필터 먼지 + 습기' },
			{ label: '곰팡이 냄새', value: '내부 열교환기' },
			{ label: '플라스틱 냄새', value: '새 제품 (2~3일 내 소멸)' },
		],
	},
	{
		id: 'bs-20260903-004-2',
		type: 'steps',
		title: '시즌 종료 보관 전 체크리스트',
		steps: [
			'물통 비우고 구연산 세척 후 완전 건조',
			'필터 청소 후 완전 건조',
			'송풍 모드 1시간 — 내부 건조',
			'커버 씌워 통풍 되는 곳에 보관',
		],
	},
	{
		id: 'bs-20260903-005-1',
		type: 'steps',
		title: '물이 안 찰 때 점검 순서',
		steps: [
			'실내 습도 확인 — 이미 50% 이하면 정상',
			'목표 습도 설정이 현재보다 높은지 확인',
			'물통 장착 상태·플로트 확인',
			'실내 온도 15도 이하면 성능 저하 (정상)',
			'필터·흡입구 막힘 청소',
			'컴프레서 가동음 없으면 AS',
		],
	},
	{
		id: 'bs-20260903-006-1',
		type: 'table',
		title: '평수별 권장 제습 용량',
		rows: [
			{ label: '원룸 · 10평 이하', value: '10~13L' },
			{ label: '10평대', value: '13~16L' },
			{ label: '20평대 거실 중심', value: '16~18L', accent: true },
			{ label: '30평대 이상', value: '20L 이상' },
			{ label: '반지하·습한 환경', value: '+1단계' },
		],
	},
	{
		id: 'bs-20260903-006-2',
		type: 'table',
		title: '컴프레서식 vs 데시칸트식',
		rows: [
			{ label: '여름 제습 효율', value: '컴프레서식 우세' },
			{ label: '저온(15도 이하) 성능', value: '데시칸트식 우세' },
			{ label: '소비전력', value: '컴프레서식이 낮음' },
			{ label: '일반 가정 기본값', value: '컴프레서식', accent: true },
		],
	},
	{
		id: 'bs-20260903-007-1',
		type: 'table',
		title: '제습기 핵심 기준 한눈에',
		rows: [
			{ label: '용량', value: '평수 기준 + 습하면 1단계 위' },
			{ label: '목표 습도', value: '50~55%', accent: true },
			{ label: '전기세 (하루 8시간)', value: '월 5,700~24,000원' },
			{ label: '필터 청소', value: '2주에 1회' },
			{ label: '시즌 종료', value: '내부 건조 후 보관' },
		],
	},
];

mkdirSync(OUT_DIR, { recursive: true });
let generated = 0;

for (const spec of SPECS) {
	const out = join(OUT_DIR, `${spec.id}.png`);
	if (existsSync(out) && !force) continue;
	const svg = await satori(RENDERERS[spec.type](spec), {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Pretendard', data: bold, weight: 700, style: 'normal' },
			{ name: 'Pretendard', data: regular, weight: 400, style: 'normal' },
		],
	});
	writeFileSync(out, await sharp(Buffer.from(svg)).png().toBuffer());
	console.log(`생성: ${out}`);
	generated++;
}
console.log(`완료: ${generated}개`);
