---
contentId: "bs-20261019-002"
title: '광고만 떠도 스파이웨어 설치 — 시티즌랩 "애드펙션" 보고서, 이스라엘 광고회사 통해 알자지라 기기 45대 감염'
description: '캐나다 토론토대 시티즌랩이 10월 15일 온라인 광고로 제로클릭 스파이웨어를 심은 사례를 처음 공개 문서로 밝혔다. 이스라엘 광고회사 Discover-Tech와 플랫폼 Controlium의 작동 방식, 알자지라 기기 45대 감염, 20만 곳에 가까운 광고 노출 규모, 한국 사용자가 볼 점과 아직 모르는 것을 정리했다.'
pubDate: 2026-10-19
thumbnail:
  url: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  alt: '어두운 곳에서 스마트폰을 든 사람의 실루엣'
  creditName: 'Gilles Lambert'
  creditUrl: 'https://unsplash.com/@gilleslambert'

status: draft

category: world
tags:
  - '해외난리'
  - '스파이웨어'
  - '보안'
  - '개인정보'
  - '온라인광고'

primaryKeyword: '제로클릭 스파이웨어 광고'
secondaryKeywords:
  - '시티즌랩 애드펙션'
  - '광고 스파이웨어'
  - '스마트폰 해킹 광고'
  - '광고 ID 재설정'
intent: informational
funnelStage: awareness
cluster: 'world-issue'
clusterRole: supporting

evergreen: false
reviewAfter: 2026-11-18
author: 'Brad Studio'
internalLinks: []

sources:
  - title: 'Exposing AdFection: How Discover-Tech Turned Targeted Ads Into a Pipeline for Zero-Click Mercenary Spyware — The Citizen Lab'
    url: 'https://citizenlab.ca/research/how-discover-tech-turned-targeted-ads-into-a-pipeline-for-spyware/'
    accessedAt: 2026-10-19
  - title: "Governments are hacking people with 'zero-click' spyware by showing them online ads — TechCrunch"
    url: 'https://techcrunch.com/2026/10/15/citizen-lab-says-governments-are-abusing-online-ads-to-hack-people-with-zero-click-spyware/'
    accessedAt: 2026-10-19
  - title: 'Israeli ad company helped a spyware firm target Al Jazeera through online ads, researchers say — NBC News'
    url: 'https://www.nbcnews.com/tech/security/israeli-ad-company-helped-spyware-firm-target-al-jazeera-online-ads-re-rcna602999'
    accessedAt: 2026-10-19
  - title: 'Israeli firm used ads to enable espionage, Canadian researchers say — CBC'
    url: 'https://www.cbc.ca/news/world/israeli-firm-targeted-ads-espionage-9.7381922'
    accessedAt: 2026-10-19
  - title: 'Targeted ads installed Candiru spyware in zero-click attacks — BleepingComputer'
    url: 'https://www.bleepingcomputer.com/news/security/zero-click-attacks-used-targeted-ads-to-deliver-candiru-spyware/'
    accessedAt: 2026-10-19
  - title: 'Israeli firm digital ads enabling installation of zero-click spyware, researchers say — The Guardian'
    url: 'https://www.theguardian.com/technology/2026/oct/15/israeli-firm-digital-ads-enabling-installation-of-zero-click-spyware-researchers-say'
    accessedAt: 2026-10-19

monetization:
  methods:
    - 'adsense'
  affiliateDisclosure: false

faq:
  - question: '광고를 누르지 않아도 감염될 수 있나요?'
    answer: '시티즌랩 보고서에 따르면 그렇습니다. 광고가 화면에 뜨는 것만으로 기기 식별 정보가 서버로 전달됐고, 서버가 표적으로 고른 기기에만 공격 코드를 돌려보냈습니다. 그래서 제로클릭이라고 부릅니다.'
  - question: '일반인도 표적이 되나요?'
    answer: '보고서에 나온 확인 사례는 언론사 알자지라의 기기 45대입니다. 운영자가 관심 없다고 판단한 기기에는 스파이웨어를 보내지 않았다고 연구진은 설명했습니다. 다만 광고는 수많은 일반 사이트와 앱에 노출됐습니다.'
  - question: '개인이 할 수 있는 대비는?'
    answer: '연구진은 완벽한 방어는 어렵다고 말했습니다. 운영체제와 브라우저를 최신으로 유지하고, 휴대폰의 광고 ID를 삭제하거나 재설정하고, 아이폰은 차단 모드를 켜는 것이 일반적인 대비책입니다.'

seo:
  noindex: false
---

인터넷 광고는 하루에도 수백 번 눈앞을 지나간다. 그 광고가 뜨기만 해도 휴대폰에 스파이웨어가 깔릴 수 있다는 조사가 나왔다. 캐나다 토론토대 시민연구소 시티즌랩(Citizen Lab)이 10월 15일 공개한 보고서다. 연구진은 광고를 통한 제로클릭 스파이웨어 유포를 처음으로 공개 문서화한 사례라고 밝혔다.

## 무슨 일인가

시티즌랩 보고서와 테크크런치, NBC뉴스, CBC, 블리핑컴퓨터 보도로 확인한 내용이다.

- **보고서:** 시티즌랩 "애드펙션(AdFection)" 보고서, 10월 15일 공개
- **지목된 회사:** 이스라엘 광고기술 회사 Discover-Tech
- **플랫폼:** 이 회사의 광고 플랫폼 Controlium
- **스파이웨어:** 이스라엘 감시업체 칸디루(Candiru) 제품. 칸디루는 2025년 인수된 뒤 Integrity Labs로 이름을 바꿨다.
- **확인된 피해:** 2024~2025년 카타르 방송사 알자지라 내부 기기 최소 45대
- **동시 발표:** 미국 광고 보안업체 컨피언트(Confiant)도 같은 날 별도 보고서를 냈다.

## 어떻게 작동했나

광고 자체에는 악성 코드가 없었다. 그래서 광고 네트워크의 검사에 걸리지 않았다.

1. Discover-Tech가 일반 광고처럼 광고를 산다.
2. 광고가 화면에 뜨면 기기의 광고 ID, 쿠키, IP 주소 같은 식별 정보가 회사 서버로 간다.
3. 서버가 그 기기가 표적인지 판단한다.
4. 표적이면 공격 코드를 돌려보내고, 아니면 아무것도 보내지 않는다.

사용자는 광고를 누를 필요가 없다. 보고서에 따르면 Controlium은 고객이 광고 ID나 쿠키, IP 주소로 특정인을 골라낼 수 있게 했다.

## 왜 화제인가

### 노출 규모

블리핑컴퓨터와 테크크런치는 Discover-Tech 광고가 넉 달 동안 20만 곳에 가까운 웹사이트와 앱에 실렸다고 전했다. CBC는 정부 부처, 군, NATO 같은 안보 민감 기관 네트워크에도 광고가 닿았다고 보도했다. 감염 확인은 45대지만, 광고를 본 기기는 훨씬 많다.

### "방어할 방법이 사실상 없다"

론 디버트 시티즌랩 소장은 언론 인터뷰에서 스마트폰을 쓰지 않거나 인터넷에 연결하지 않는 것 말고는 방어할 방법이 사실상 없다는 취지로 말했다. 광고는 우리가 고를 수 없기 때문이다. 기존 스파이웨어는 링크를 누르게 하거나 메신저 취약점을 노렸다. 이번 방식은 매일 보는 광고 체계를 통로로 썼다.

### 광고 업계의 사각지대

맞춤형 광고는 기기 식별 정보로 사람을 구분한다. 이번 사례는 그 구조가 감시에도 쓰일 수 있다는 점을 보여 줬다.

## 한국과의 연결점

이번 보고서에 한국 피해 사례는 나오지 않았다. 그래도 구조는 남의 일이 아니다. 국내 앱과 사이트도 같은 방식의 실시간 광고 경매로 광고를 띄운다. 스마트폰에는 저마다 광고 ID가 있다.

일반 사용자가 할 수 있는 대비는 이렇다.

- **업데이트:** 운영체제와 브라우저, 앱을 최신으로 유지한다. 제로클릭 공격은 대개 아직 고쳐지지 않은 취약점을 노린다.
- **광고 ID 정리:** 안드로이드는 설정의 개인정보 보호 메뉴에서 광고 ID를 삭제할 수 있다. 아이폰은 앱 추적 요청을 끄면 앱이 광고 식별자를 받지 못한다.
- **차단 모드:** 아이폰의 차단 모드(Lockdown Mode)는 고위험 사용자용 기능이다. 기자, 활동가처럼 표적이 될 수 있는 사람이라면 검토해 볼 만하다.
- **광고 차단:** 브라우저 광고 차단 기능은 노출 자체를 줄인다. 다만 앱 안의 광고까지 막지는 못한다.

## 아직 모르는 것

- **의뢰 주체:** 시티즌랩은 알자지라 공격을 누가 의뢰했는지 밝히지 못했다.
- **피해 규모:** 45대 외에 감염된 기기가 얼마나 되는지는 조사 중이다.
- **회사 입장:** Discover-Tech의 공식 반론은 확인하지 못했다.
- **규제 대응:** 광고 업계와 각국 정부가 어떤 조치를 내놓을지 지켜봐야 한다.

오늘 휴대폰 설정에서 소프트웨어 업데이트와 광고 ID 항목을 한 번씩 열어 보자. 5분이면 끝나는 대비다.
