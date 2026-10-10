---
contentId: "bs-20261011-002"
title: '책상 위 손바닥만 한 로봇개 Q8botOne — 배선 없는 4족 보행, 199달러 키트부터 599달러 완성품까지'
description: '무게 250g, 손바닥 크기의 오픈소스 4족 보행 로봇 Q8botOne이 크라우드서플라이에서 펀딩 중이다. 배선 없이 기판 하나에 액추에이터 8개를 꽂는 구조, 199~599달러 구성, 2027년 3월 배송 예정 일정과 사기 전 확인할 점을 정리했다.'
pubDate: 2026-10-11

status: draft

category: world
tags:
  - '왜이제나옴'
  - '로봇'
  - '4족 보행 로봇'
  - '오픈소스'
  - '크라우드펀딩'

primaryKeyword: '책상 로봇개'
secondaryKeywords:
  - 'Q8botOne'
  - '4족 보행 로봇 키트'
  - 'ESP32 로봇'
  - '코딩 교육 로봇'
intent: informational
funnelStage: awareness
cluster: 'world-product'
clusterRole: supporting

evergreen: false
reviewAfter: 2026-11-11
author: 'Brad Studio'
internalLinks: []

sources:
  - title: 'Q8botOne — Crowd Supply'
    url: 'https://www.crowdsupply.com/zerowire-robotics/q8botone'
    accessedAt: 2026-10-11
  - title: 'Q8botOne - A palm-sized open-source quadruped robot with ESP32-C3, DYNAMIXEL smart actuators — CNX Software'
    url: 'https://www.cnx-software.com/2026/10/08/q8botone-a-palm-sized-open-source-quadruped-robot-with-esp32-c3-dynamixel-smart-actuators/'
    accessedAt: 2026-10-11
  - title: 'Say Hello to Q8botOne: The Wire-Free Quadruped Robot — Hackster.io'
    url: 'https://www.hackster.io/news/say-hello-to-q8botone-the-wire-free-quadruped-robot-e703a077ddc3'
    accessedAt: 2026-10-11
  - title: 'A $599 Robot Dog That Fits on Your Desk and Works Like LEGO Technic — Yanko Design'
    url: 'https://www.yankodesign.com/2026/10/10/a-599-robot-dog-that-fits-on-your-desk-and-works-like-lego-technic/'
    accessedAt: 2026-10-11

monetization:
  methods:
    - 'adsense'
  affiliateDisclosure: false

faq:
  - question: 'Q8botOne 가격은 얼마인가요?'
    answer: '액추에이터를 따로 사는 기본 키트가 199달러부터, 액추에이터와 프로그램된 기판까지 조립된 완성품이 599달러입니다. 배송비와 관세는 별도입니다.'
  - question: '언제 받을 수 있나요?'
    answer: '크라우드서플라이 펀딩 상품이며 배송은 2027년 3월 말 예정입니다. 크라우드펀딩은 일정이 늦어질 수 있습니다.'
  - question: '코딩을 몰라도 쓸 수 있나요?'
    answer: '완성품은 미리 프로그램된 기판이 들어 있습니다. 동작을 바꾸려면 공개된 파이썬 제어 소프트웨어나 펌웨어를 다뤄야 해서 기초 프로그래밍 지식이 있으면 활용 폭이 넓어집니다.'

seo:
  noindex: false
---

산업용 4족 보행 로봇은 개인이 사기 어려운 가격대다. 책상 위에서 걷고 뛰는 4족 보행 로봇을 직접 조립하고 코드까지 고쳐 보고 싶다면 선택지가 거의 없었다. Q8botOne은 이 틈을 노린 손바닥 크기의 오픈소스 로봇이다.

![Q8botOne 손바닥 크기 4족 보행 로봇](https://www.yankodesign.com/images/design_news/2026/10/a-599-robot-dog-that-fits-on-your-desk-and-works-like-lego-technic/q8botone-palm-sized-quadruped-robot-03.jpg)

이미지 출처: Yanko Design ([원문 링크](https://www.yankodesign.com/2026/10/10/a-599-robot-dog-that-fits-on-your-desk-and-works-like-lego-technic/))

> **조사 기준**
>
> - 조사일: 2026년 10월 11일
> - 자료: 크라우드서플라이 제품 페이지, CNX Software, Hackster.io, Yanko Design
> - 원칙: 2곳 이상에서 확인된 사양만 적었다. 직접 써 본 후기가 아니며, 보행 성능은 개발사 주장이다.

## 무엇이 새로운가: 배선이 없다

소형 4족 로봇을 만들 때 가장 귀찮은 부분은 배선이다. 다리마다 모터가 2개씩, 모두 8개의 모터에서 나오는 선을 제어 보드로 정리해야 한다. 선이 많을수록 조립이 어렵고 고장도 잦다.

Q8botOne은 기판 하나에 액추에이터 8개를 바로 꽂는 구조로 이 문제를 없앴다. 제어 칩(ESP32-C3)과 액추에이터 연결부가 한 기판에 모여 있어 전선이 거의 보이지 않는다. Yanko Design은 겉으로 드러난 구조 덕분에 작은 반려 로봇보다 "분해하고 이해하고 움직임을 가르치는 기계"에 가깝다고 평가했다.

## 사양 한눈에

| 항목 | 내용 |
|---|---|
| 크기 | 120 × 70 × 70mm |
| 무게 | 약 250g |
| 제어 칩 | ESP32-C3(와이파이·블루투스 지원 마이크로컨트롤러) |
| 구동부 | 다이나믹셀(DYNAMIXEL) 스마트 액추에이터 8개 |
| 공개 범위 | 회로도·거버·부품표·3D CAD, 펌웨어, 파이썬 제어 소프트웨어 |
| 동작(개발사 주장) | 걷기·종종걸음·점프, 자기 무게 2배 운반 |

다이나믹셀은 국내 기업 로보티즈가 만드는 로봇용 액추에이터 브랜드다. 교육·연구용 로봇에서 널리 쓰여 부품을 구하거나 자료를 찾기가 비교적 쉽다.

오픈소스 하드웨어는 설계도를 누구나 내려받아 고치고 다시 만들 수 있다는 뜻이다. 부품이 망가지면 3D 프린터로 프레임을 다시 뽑거나, 기판을 직접 주문해 수리할 수 있다.

## 가격과 출시 상태

크라우드서플라이에서 펀딩 중이다. 킥스타터가 아니라 오픈하드웨어 전문 펀딩 플랫폼이다.

| 구성 | 가격 | 포함 |
|---|---|---|
| 기본 키트 | 199달러부터 | 기판·프레임, 액추에이터 별도 |
| 완성품 | 599달러 | 액추에이터 포함 조립 완료, 프로그램된 기판 |

배송은 2027년 3월 말 예정이다. 배송비와 관세는 따로 붙는다.

## 사기 전에 확인할 것

- **용도:** 반려 로봇처럼 알아서 노는 장난감이 아니다. 코드를 고치고 동작을 만들어 보는 학습·개발용에 가깝다.
- **키트 가격:** 199달러 키트는 액추에이터가 빠져 있다. 8개를 따로 사면 완성품과 가격 차이가 줄어들 수 있으니 합계를 계산해 보자.
- **성능 검증:** 점프·운반 능력은 개발사 발표다. 실제 사용 후기가 나온 뒤 판단해도 늦지 않다.
- **펀딩 위험:** 크라우드펀딩은 일정 지연과 사양 변경이 생길 수 있다.

로봇 코딩을 배우려는 학생이나 4족 보행 제어를 실험하려는 개발자라면 공개된 소스부터 살펴보자. 하드웨어를 사기 전에 제어 코드가 내가 다룰 수 있는 수준인지 확인할 수 있다.
