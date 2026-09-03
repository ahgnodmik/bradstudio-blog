// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Brad Studio';
export const SITE_DESCRIPTION = 'Brad Studio 블로그';

// 카테고리 중앙 정의. 스키마·페이지·메뉴가 모두 이 객체를 참조.
// 추가 시 여기만 수정하면 됨.
export const CATEGORIES = {
	living: '생활',
	digital: '디지털',
	money: '재테크',
	shopping: '쇼핑',
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

// GA4 측정 ID. 비우면 스크립트 미삽입.
export const GA_MEASUREMENT_ID = 'G-R5S7Y7NNRQ';

// AdSense 발급 후 'ca-pub-XXXXXXXXXXXXXXXX' 입력. 비어 있으면 광고 자리에 placeholder 박스 표시.
export const ADSENSE_CLIENT = 'ca-pub-8527804772343765';

// 슬롯별 AdSense 광고 단위 ID. 광고 단위 생성 후 숫자 ID 입력.
export const AD_SLOTS = {
	sidebarTop: '',
	postTop: '',
	postBottom: '',
	listMid: '',
	footer: '',
} as const;
