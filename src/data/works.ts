// More works — AuthorBio 서명과 /works/ 페이지 공용 데이터
export interface WorkItem {
	slug: string;
	label: string;
	href?: string; // 외부 링크 (없으면 /works/#slug)
	period?: string;
	role?: string;
	tags?: string[];
	details?: string[];
}

export const WORKS: WorkItem[] = [
	{
		slug: 'why-only-now',
		label: '@why.only.now',
		href: 'https://www.instagram.com/why.only.now/',
	},
	{
		slug: 'abroad-now',
		label: '@abroad.now',
		href: 'https://www.instagram.com/abroad.now/',
	},
	{
		slug: 'qstag',
		label: 'QSTAG',
		period: '2020.01 – 2021.07',
		role: '인하우스 디자이너·마케터 (스타트업)',
		tags: ['인하우스', '디자이너', '마케팅', '스타트업'],
		details: [
			'미디어믹스 기획·컨펌 50%',
			'사내 영상 제작 100%',
			'대행사 핸들링 — 컨펌 후 진행',
			'디자인·퍼블리싱 파트 100%',
			'UX/UI/GUI 태스크 관리·디렉션',
			'마케팅 파트(B2C) 100% 전담',
		],
	},
	{
		slug: 'pleasant-idea',
		label: '유쾌한생각',
		period: '2018.11 – 2019.12',
		role: '인하우스 마케팅 디자이너',
		tags: ['인하우스', '마케팅디자인'],
		details: [
			'마케팅 그래픽 디자인·영상 제작 참여',
			'카피라이트 90% — 컨펌 후 배포',
			'디자인 파트 90% — 컨펌 후 배포',
			'영상 30% 참여 — 촬영·컷편집·서브 출연',
		],
	},
];

export const workHref = (w: WorkItem) => w.href ?? `/works/#${w.slug}`;
