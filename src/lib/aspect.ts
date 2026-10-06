// 화면비율 계산. 정수 비율은 최대공약수로 약분하고, 흔히 쓰는 비율 이름에 가장 가까운 것을 찾는다.

export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

export interface NamedRatio {
	label: string;
	w: number;
	h: number;
	use: string;
}

export const COMMON_RATIOS: NamedRatio[] = [
	{ label: '1:1', w: 1, h: 1, use: '정사각 피드, 프로필' },
	{ label: '4:5', w: 4, h: 5, use: '세로형 피드' },
	{ label: '3:4', w: 3, h: 4, use: '세로 사진, 태블릿' },
	{ label: '2:3', w: 2, h: 3, use: '세로 인쇄 사진' },
	{ label: '1:√2', w: 1, h: Math.SQRT2, use: 'A4·A3 등 A판 용지' },
	{ label: '9:16', w: 9, h: 16, use: '스토리·쇼츠·릴스' },
	{ label: '4:3', w: 4, h: 3, use: '구형 모니터, 발표 화면' },
	{ label: '3:2', w: 3, h: 2, use: '카메라 원본 사진' },
	{ label: '16:10', w: 16, h: 10, use: '노트북 화면' },
	{ label: '16:9', w: 16, h: 9, use: '영상, 유튜브 썸네일, 모니터' },
	{ label: '1.91:1', w: 1.91, h: 1, use: '링크 미리보기(OG) 이미지' },
	{ label: '21:9', w: 21, h: 9, use: '울트라와이드 모니터, 시네마' },
];

export interface RatioInfo {
	simple: [number, number]; // 약분한 정수 비
	decimal: number; // 가로 ÷ 세로
	nearest: NamedRatio;
	nearestDiffPct: number; // 가장 가까운 대표 비율과의 차이(%)
	orientation: '가로형' | '세로형' | '정사각';
	megapixels: number;
}

export function ratioInfo(w: number, h: number): RatioInfo | null {
	if (!(w > 0 && h > 0)) return null;
	const W = Math.round(w), H = Math.round(h);
	const g = gcd(W, H) || 1;
	const decimal = w / h;
	let nearest = COMMON_RATIOS[0];
	let best = Infinity;
	for (const r of COMMON_RATIOS) {
		const d = Math.abs(Math.log(decimal / (r.w / r.h)));
		if (d < best) {
			best = d;
			nearest = r;
		}
	}
	return {
		simple: [W / g, H / g],
		decimal,
		nearest,
		nearestDiffPct: (Math.exp(best) - 1) * 100,
		orientation: w === h ? '정사각' : w > h ? '가로형' : '세로형',
		megapixels: (w * h) / 1e6,
	};
}

// 비율을 지키며 한 변을 바꿨을 때 다른 변
export const scaleHeight = (w: number, h: number, newW: number) => (newW * h) / w;
export const scaleWidth = (w: number, h: number, newH: number) => (newH * w) / h;

export interface FitResult {
	scale: number;
	w: number;
	h: number;
	padX: number; // 맞춤(fit) 시 좌우 여백 합
	padY: number;
	cropX: number; // 채움(fill) 시 잘리는 좌우 합(원본 기준 px)
	cropY: number;
	cropPct: number; // 채움 시 잘려 나가는 면적 비율
}

// 원본(sw×sh)을 틀(tw×th)에 맞추기(fit, 여백) / 채우기(fill, 잘림)
export function fitInto(sw: number, sh: number, tw: number, th: number, mode: 'fit' | 'fill'): FitResult {
	const sFit = Math.min(tw / sw, th / sh);
	const sFill = Math.max(tw / sw, th / sh);
	const scale = mode === 'fit' ? sFit : sFill;
	const w = sw * scale, h = sh * scale;
	const visibleW = Math.min(tw / scale, sw), visibleH = Math.min(th / scale, sh);
	return {
		scale,
		w,
		h,
		padX: mode === 'fit' ? Math.max(0, tw - w) : 0,
		padY: mode === 'fit' ? Math.max(0, th - h) : 0,
		cropX: mode === 'fill' ? sw - visibleW : 0,
		cropY: mode === 'fill' ? sh - visibleH : 0,
		cropPct: mode === 'fill' ? (1 - (visibleW * visibleH) / (sw * sh)) * 100 : 0,
	};
}

// 자주 쓰는 출력 크기. 매체가 권장 크기를 바꾸는 경우가 있어 업로드 전 공지 확인을 안내한다.
export const PRESET_SIZES = [
	{ name: '인스타그램 정사각 피드', w: 1080, h: 1080 },
	{ name: '인스타그램 세로 피드', w: 1080, h: 1350 },
	{ name: '스토리·릴스·쇼츠', w: 1080, h: 1920 },
	{ name: '유튜브 영상 (FHD)', w: 1920, h: 1080 },
	{ name: '유튜브 썸네일', w: 1280, h: 720 },
	{ name: '링크 미리보기(OG) 이미지', w: 1200, h: 630 },
	{ name: '4K UHD 영상', w: 3840, h: 2160 },
	{ name: 'A4 (300dpi 인쇄)', w: 2480, h: 3508 },
];
