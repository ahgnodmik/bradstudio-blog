// Blogger 글 끝에 붙이는 쿠팡 파트너스 고지 문구 + 캐러셀 위젯.
// MARKER로 이미 붙은 글을 알아본다 (add-blogger-coupang.mjs가 중복 삽입 방지에 사용).
export const COUPANG_MARKER = '<!-- coupang-partners -->';

export const COUPANG_HTML =
  `\n${COUPANG_MARKER}\n` +
  `<div class="coupang-widget" style="margin: 2em 0; max-width: 100%; overflow: hidden;">\n` +
  `<p style="font-size: small; color: #777;">이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>\n` +
  `<script src="https://ads-partners.coupang.com/g.js"></script>\n` +
  `<script>new PartnersCoupang.G({"id":1038483,"template":"carousel","trackingCode":"AF1584187","width":"680","height":"140","tsource":""});</script>\n` +
  `</div>\n`;
