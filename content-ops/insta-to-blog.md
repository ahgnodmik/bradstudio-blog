# 인스타 콘텐츠 → 블로그 운영 절차 (매일 + 주간)

> 2026-10-07 확정. 원천: 비공개 저장소 `ahgnodmik/insta-abroad-now`.
> 이미지·문체·출처 원칙은 `series-insta-weekly.md`, `editorial-guide.md`를 그대로 따른다.
> 카테고리: `world` (해외·신제품)

## 원천 데이터
| 계정 | 경로 | 주요 필드 |
|---|---|---|
| 해외난리 @abroad.now | `abroad-now/delivered/*.json`, `abroad-now/pending/*.json` | slug, headline, lede, publishedAt, body[], sources[], factNote |
| 왜이제나옴 @why.only.now | `why-only-now/delivered/*.json`, `why-only-now/pending/*.json` | productName, intro{summary,hook,imageUrl}, body[], source{name,url}, discoveredAt, images[] |

- 후보: `delivered/`(인스타 게시분) 우선. 부족하면 `pending/` 중 수집일 3일 이내만. `_stale/`은 쓰지 않는다.
- 이미 블로그로 옮긴 항목은 `content-ops/insta-ledger.json`에 기록한다. 원천 파일 경로가 이미 있으면 건너뛴다.

## 매일 (최대 2편: 해외 1 + 신제품 1)
1. 후보 중 한국 독자에게 의미가 있고 원문 출처가 살아 있는 것을 고른다. 마땅한 게 없으면 0편으로 끝낸다(억지 발행 금지).
2. 원천 sources를 열어 사실을 확인하고, 다른 출처 1곳 이상을 더 찾아 **2곳 이상 교차 확인**한다. 확인 안 되는 숫자·주장은 뺀다.
3. 본문 1,500자 이상(공백 제외). 카드뉴스 문장을 옮기지 않고 아래 구성으로 다시 쓴다.
   - 해외: 무슨 일인가 → 왜 화제인가(배경·숫자) → 한국과의 연결점(비슷한 제도·사례·영향) → 아직 모르는 것
   - 신제품: 무엇이 새로운가 → 기존 제품과 다른 점(구조·소재·사용 방식) → 가격·출시 상태(확인된 것만) → 국내에서 살 수 있나/비슷한 제품
   - 운영자 경험·디자이너 의견은 지어내지 않는다. 의견 문장은 출처의 평가를 인용 형태로만 쓴다.
4. 이미지
   - 해외: 기사 이미지 금지. 썸네일은 Unsplash(작가명·작가 페이지 링크). 실제 사건·인물로 오해될 사진 금지.
   - 신제품: 제품 대표 이미지 1장 + 바로 아래 `이미지 출처: <매체/제조사명> (원문 링크)`. 워터마크·인물 중심 사진이면 Unsplash로 대체.
5. frontmatter
   - `category: world`, `status: draft`, pubDate 오늘(KST), `evergreen: false`, `reviewAfter` 30일 뒤
   - tags에 `해외난리` 또는 `왜이제나옴` 포함
   - contentId `bs-YYYYMMDD-NNN` (그날 기존 번호 다음)
   - sources 2개 이상, accessedAt 오늘
6. 드래프트로 push하면 09:52 발행 루틴이 팩트체크 후 발행한다.

## 주간 요약 (매주 월요일, 1편)
- 지난 월~일 `world` 카테고리에 발행된 글을 모은다. 3편 미만이면 건너뛴다.
- 제목 예: `이번 주 해외 화제·신제품 정리 (10월 2주)`
- 구성: 이번 주 한 줄 흐름 → 해외 화제 N건(각 2~3줄 + 블로그 글 링크) → 신제품 N건(각 2~3줄 + 링크) → 다음 주 지켜볼 일정(확인된 것만)
- 글 링크 외 새 사실을 넣으면 출처 2곳 확인. 썸네일은 Unsplash 또는 자동 OG.
- `status: draft`로 push → 09:52 발행 루틴이 발행.

## 실행 환경 주의 (2026-10-07 수동 점검 결과)
- 클라우드 세션은 외신·제조사 사이트 상당수가 네트워크 정책으로 막혀 WebFetch가 실패한다(Guardian, Al Jazeera, CNBC, UN News, Yanko Design 확인). WebSearch 결과 요약을 2곳 이상 교차해 확인하고, 막힌 페이지는 sources에 남기되 본문 사실은 교차 확인된 것만 쓴다.
- 원천 JSON 내용을 그대로 믿지도, 성급히 빼지도 않는다. 10/7 점검에서 "원인불명 폐렴"을 미확인으로 뺐다가 10/8 러시아 위생당국 공식 발표(AP·IBTimes)로 확인돼 되살렸다. 검색 1회로 안 나오면 영어 원문 표현으로 한 번 더 찾는다.
- frontmatter는 기존 글을 복사해 쓴다. `clusterRole`은 pillar | supporting | commercial 중 하나.

## 원장 (`content-ops/insta-ledger.json`)
```json
{ "abroad-now/delivered/2026-09-17-xxx.json": { "contentId": "bs-20261007-002", "date": "2026-10-07" } }
```
보류한 항목도 `{"skipped": "사유", "date": ...}`로 남겨 다음 날 다시 고르지 않게 한다.
