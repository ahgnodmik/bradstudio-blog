import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { CATEGORIES, SITE_TITLE } from '../consts';

const WIDTH = 1200;
const HEIGHT = 630;

let fontsPromise: Promise<{ bold: Buffer; regular: Buffer }> | null = null;

function loadFonts() {
	// 빌드 시 번들이 dist/.prerender로 이동하므로 import.meta.url 대신 프로젝트 루트 기준
	const fontDir = join(process.cwd(), 'src/assets/fonts/og');
	fontsPromise ??= Promise.all([
		readFile(join(fontDir, 'Pretendard-Bold.otf')),
		readFile(join(fontDir, 'Pretendard-Regular.otf')),
	]).then(([bold, regular]) => ({ bold, regular }));
	return fontsPromise;
}

export async function renderOgImage(title: string, category: string): Promise<Buffer> {
	const { bold, regular } = await loadFonts();
	const categoryLabel = CATEGORIES[category as keyof typeof CATEGORIES] ?? category;

	// satori는 JSX 없이 element object 트리를 받음
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: '#ffffff',
					padding: '64px 72px',
					borderTop: '16px solid #0064e0',
				},
				children: [
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											backgroundColor: '#0a1317',
											color: '#ffffff',
											fontSize: '26px',
											fontWeight: 700,
											padding: '10px 28px',
											borderRadius: '100px',
										},
										children: categoryLabel,
									},
								},
							],
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								fontSize: '64px',
								fontWeight: 700,
								color: '#0a1317',
								lineHeight: 1.3,
								letterSpacing: '-0.02em',
								wordBreak: 'keep-all',
							},
							children: title,
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '32px',
											fontWeight: 700,
											color: '#0064e0',
										},
										children: SITE_TITLE,
									},
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '24px',
											color: '#5d6c7b',
										},
										children: 'bradstudio.xyz',
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: WIDTH,
			height: HEIGHT,
			fonts: [
				{ name: 'Pretendard', data: bold, weight: 700, style: 'normal' },
				{ name: 'Pretendard', data: regular, weight: 400, style: 'normal' },
			],
		},
	);

	return sharp(Buffer.from(svg)).png().toBuffer();
}
