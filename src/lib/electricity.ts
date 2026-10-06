// 주택용 전기요금(누진제) 계산. 한전 전기공급약관 요금표 기준.
// 기준일은 TARIFF_DATE. 요금이 바뀌면 이 파일의 숫자만 고친다.

export const TARIFF_DATE = '2026-10-04';

export type Voltage = 'low' | 'high';

interface Tariff {
	basic: [number, number, number]; // 구간별 기본요금(원/호)
	rate: [number, number, number]; // 구간별 전력량요금(원/kWh)
	superUser: number; // 하계·동계 1,000kWh 초과분 단가(원/kWh)
}

export const TARIFFS: Record<Voltage, Tariff> = {
	low: { basic: [910, 1600, 7300], rate: [120.0, 214.6, 307.3], superUser: 736.2 },
	high: { basic: [730, 1260, 6060], rate: [105.0, 174.0, 242.3], superUser: 601.3 },
};

export const CLIMATE_RATE = 9.0; // 기후환경요금(원/kWh)
export const FUEL_ADJ_RATE = 5.0; // 연료비조정요금(원/kWh), 2026년 4분기
export const VAT = 0.1;
export const FUND = 0.027; // 전력산업기반기금, 2025년 7월부터
export const SUPER_USER_KWH = 1000;

// 하계(7~8월)는 구간 상한이 300/450kWh, 그 외는 200/400kWh
export const isSummer = (month: number) => month === 7 || month === 8;
// 슈퍼유저 요금은 하계(7~8월)·동계(12~2월)에만
export const isSuperUserSeason = (month: number) => [7, 8, 12, 1, 2].includes(month);
export const tierLimits = (month: number): [number, number] => (isSummer(month) ? [300, 450] : [200, 400]);

export interface Bill {
	kwh: number;
	tier: 1 | 2 | 3;
	superUserKwh: number;
	basic: number;
	energy: number;
	climate: number;
	fuel: number;
	subtotal: number; // 전기요금계
	vat: number;
	fund: number;
	total: number; // 청구금액(10원 미만 절사)
	tierKwh: [number, number, number];
}

export function calcBill(kwhInput: number, month: number, voltage: Voltage = 'low'): Bill {
	const kwh = Math.max(0, Math.floor(kwhInput));
	const t = TARIFFS[voltage];
	const [l1, l2] = tierLimits(month);

	const k1 = Math.min(kwh, l1);
	const k2 = Math.min(Math.max(kwh - l1, 0), l2 - l1);
	let k3 = Math.max(kwh - l2, 0);
	const superUserKwh = isSuperUserSeason(month) ? Math.max(kwh - SUPER_USER_KWH, 0) : 0;
	k3 -= superUserKwh;

	const tier: 1 | 2 | 3 = kwh <= l1 ? 1 : kwh <= l2 ? 2 : 3;
	const basic = t.basic[tier - 1];
	const energy = Math.floor(k1 * t.rate[0] + k2 * t.rate[1] + k3 * t.rate[2] + superUserKwh * t.superUser);
	const climate = Math.floor(kwh * CLIMATE_RATE);
	const fuel = Math.floor(kwh * FUEL_ADJ_RATE);
	const subtotal = basic + energy + climate + fuel;
	const vat = Math.round(subtotal * VAT);
	const fund = Math.floor((subtotal * FUND) / 10) * 10;
	const total = Math.floor((subtotal + vat + fund) / 10) * 10;

	return { kwh, tier, superUserKwh, basic, energy, climate, fuel, subtotal, vat, fund, total, tierKwh: [k1, k2, k3 + superUserKwh] };
}

export interface Appliance {
	name: string;
	watt: number;
	hours: number; // 하루 사용 시간
	days: number; // 한 달 사용 일수
}

export const applianceKwh = (a: Appliance) => (a.watt * a.hours * a.days) / 1000;

// 기본값은 계산 예시용. 실제 소비전력은 제품 라벨·설명서 값으로 바꿔 넣는다.
export const PRESETS: Appliance[] = [
	{ name: '벽걸이 에어컨(인버터)', watt: 700, hours: 8, days: 30 },
	{ name: '스탠드 에어컨(인버터)', watt: 1500, hours: 8, days: 30 },
	{ name: '제습기(16L급)', watt: 280, hours: 8, days: 30 },
	{ name: '전기장판(2인용)', watt: 150, hours: 8, days: 30 },
	{ name: '전기히터·온풍기', watt: 2000, hours: 3, days: 30 },
	{ name: '의류건조기', watt: 900, hours: 1.5, days: 15 },
	{ name: '데스크톱 PC', watt: 300, hours: 6, days: 30 },
	{ name: 'TV(55인치)', watt: 120, hours: 4, days: 30 },
];
