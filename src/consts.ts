// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Brad Studio';
export const SITE_DESCRIPTION = 'Brad Studio 블로그';

// AdSense 발급 후 'ca-pub-XXXXXXXXXXXXXXXX' 입력. 비어 있으면 광고 자리에 placeholder 박스 표시.
export const ADSENSE_CLIENT = '';

// 슬롯별 AdSense 광고 단위 ID. 광고 단위 생성 후 숫자 ID 입력.
export const AD_SLOTS = {
	sidebarTop: '',
	postTop: '',
	postBottom: '',
	listMid: '',
	footer: '',
} as const;
