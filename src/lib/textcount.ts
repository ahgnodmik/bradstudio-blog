// 글자수 세기. 이모지·결합 문자는 사람이 보는 한 글자로 센다(Intl.Segmenter).

const segmenter =
	typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('ko', { granularity: 'grapheme' }) : null;

export const graphemes = (s: string): string[] =>
	segmenter ? Array.from(segmenter.segment(s), (x) => x.segment) : Array.from(s);

export interface TextStats {
	withSpaces: number; // 공백·줄바꿈 포함
	withoutSpaces: number; // 공백·줄바꿈 제외
	utf8Bytes: number; // 웹 저장 기준
	koBytes: number; // 한글 2바이트 기준(영문·숫자·공백 1, 그 외 2)
	words: number;
	lines: number;
	paragraphs: number;
	sentences: number;
	manuscriptPages: number; // 200자 원고지 매수(공백 포함 기준 단순 환산)
	readingMinutes: number; // 분당 500자 기준
}

export function countText(raw: string, newlineBytes: 1 | 2 = 2): TextStats {
	const text = raw.replace(/\r\n?/g, '\n');
	const chars = graphemes(text);
	const withSpaces = chars.length;
	const withoutSpaces = chars.filter((c) => !/^\s+$/.test(c)).length;
	const utf8Bytes = new TextEncoder().encode(text).length;
	let koBytes = 0;
	for (const c of chars) {
		if (c === '\n') koBytes += newlineBytes;
		else koBytes += c.length === 1 && c.charCodeAt(0) < 128 ? 1 : 2;
	}
	const trimmed = text.trim();
	const words = trimmed ? trimmed.split(/\s+/).length : 0;
	const lines = text ? text.split('\n').length : 0;
	const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
	const sentences = trimmed ? (trimmed.match(/[^.!?。…]+[.!?。…]+|[^.!?。…]+$/g) || []).filter((s) => /[\p{L}\p{N}]/u.test(s)).length : 0;
	return {
		withSpaces,
		withoutSpaces,
		utf8Bytes,
		koBytes,
		words,
		lines,
		paragraphs,
		sentences,
		manuscriptPages: Math.ceil(withSpaces / 200),
		readingMinutes: withoutSpaces / 500,
	};
}
