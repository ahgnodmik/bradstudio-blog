---
contentId: "bs-20261014-002"
title: '서랍 속 안드로이드폰이 로봇의 뇌로 — UCLA 두 발 로봇 PhoneBot, 부품값 약 400달러 오픈소스'
description: 'UCLA 로봇연구소가 안드로이드 스마트폰을 두뇌로 쓰는 두 발 보행 로봇 PhoneBot을 공개했다. 키 약 48cm, 무게 1.8kg 미만, 서보 13개, 폰 제외 부품값 약 400달러. 걷기·사람 따라가기·넘어진 뒤 일어나기와 아직 못 하는 것을 정리했다.'
pubDate: 2026-10-14
thumbnail:
  url: 'https://images.unsplash.com/photo-1759680191098-8a622ad64a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  alt: '여러 대의 오래된 휴대전화와 전자기기'
  creditName: 'Tasha Kostyuk'
  creditUrl: 'https://unsplash.com/@tashakostyuk'

status: draft

category: world
tags:
  - '왜이제나옴'
  - '로봇'
  - '휴머노이드'
  - '오픈소스'
  - '중고폰 재활용'

primaryKeyword: '스마트폰 로봇'
secondaryKeywords:
  - 'PhoneBot'
  - '안드로이드폰 로봇'
  - '중고폰 활용'
  - '두 발 보행 로봇'
intent: informational
funnelStage: awareness
cluster: 'world-product'
clusterRole: supporting

evergreen: false
reviewAfter: 2026-11-14
author: 'Brad Studio'
internalLinks:
  - 'bs-20261011-002'

sources:
  - title: 'UCLA scientists turn smartphones into small robot companions — New Atlas'
    url: 'https://newatlas.com/robotics/ucla-scientists-android-phone-walking-robot-companion/'
    accessedAt: 2026-10-14
  - title: 'PhoneBot: New robot uses old Android phones to walk, see, and balance — Interesting Engineering'
    url: 'https://interestingengineering.com/ai-robotics/ulca-bipedal-robot-uses-phone-walk'
    accessedAt: 2026-10-14
  - title: "Don't Throw Away Your Old Phone — Build a Robot Instead — Hackster.io"
    url: 'https://www.hackster.io/news/don-t-throw-away-your-old-phone-build-a-robot-instead-392de07d053a'
    accessedAt: 2026-10-14

monetization:
  methods:
    - 'adsense'
  affiliateDisclosure: false

faq:
  - question: 'PhoneBot은 살 수 있는 제품인가요?'
    answer: '판매 제품이 아니라 UCLA 연구팀이 공개한 오픈소스 연구 로봇입니다. 연구팀은 폰을 제외한 부품값을 약 400달러로 추산했습니다.'
  - question: '어떤 폰이 필요한가요?'
    answer: '안드로이드 스마트폰을 두뇌로 씁니다. 폰의 카메라, 움직임 센서, 프로세서를 활용하고 로봇 몸체와는 와이파이로 연결됩니다.'
  - question: '말로 대화도 하나요?'
    answer: '음성 인식과 언어 모델은 아직 별도 노트북에서 돌아갑니다. 폰만으로 대화까지 처리하는 단계는 아닙니다.'

seo:
  noindex: false
---

서랍에 넣어 둔 예전 스마트폰은 카메라, 센서, 프로세서를 다 갖춘 작은 컴퓨터다. UCLA 연구팀은 이 점에 주목해 안드로이드폰을 두뇌로 쓰는 두 발 보행 로봇 PhoneBot을 만들었다.

> **조사 기준**
>
> - 조사일: 2026년 10월 14일
> - 자료: New Atlas, Interesting Engineering, Hackster.io 보도와 연구팀 논문 소개
> - 원칙: 2곳 이상에서 확인된 사양만 적었다. 판매 제품이 아닌 연구 프로젝트다.

## 무엇이 새로운가: 로봇 두뇌를 폰으로 대신

로봇을 만들 때 비싼 부분은 카메라, 관성 센서, 연산 장치다. PhoneBot은 이 역할을 스마트폰 한 대에 맡겼다. 폰이 카메라로 주변을 보고, 움직임 센서로 균형을 잡고, 프로세서로 판단한다. 로봇 몸체와는 와이파이로 연결된다.

UCLA 로봇·메커니즘 연구소(RoMeLa)가 개발했고, 설계를 오픈소스로 공개했다. 연구 내용은 논문 사전 공개 사이트 arXiv에 올라왔다.

## 사양 한눈에

| 항목 | 내용 |
|---|---|
| 키 | 약 48cm(19인치) |
| 무게 | 1.8kg(4파운드) 미만 |
| 구동부 | 서보 모터 13개 |
| 두뇌 | 안드로이드 스마트폰(와이파이 연결) |
| 부품값 | 약 400달러(폰 제외, 연구팀 추산) |
| 공개 | 오픈소스 |

## 왜 하필 폰인가

스마트폰 한 대에는 로봇에 필요한 부품이 거의 다 들어 있다.

| 로봇에 필요한 것 | 스마트폰에서 맡는 부품 |
|---|---|
| 눈 | 카메라 |
| 균형 감각 | 가속도계·자이로스코프 같은 움직임 센서 |
| 두뇌 | 프로세서 |
| 통신 | 와이파이 |

로봇 연구에서는 이 부품들을 따로 사서 하나의 보드로 묶는 데 많은 비용과 시간이 든다. 폰은 이미 이 부품들이 작고 가볍게 통합돼 있고, 대량 생산 덕분에 값도 상대적으로 싸다. 연구팀은 이 점을 활용해 로봇 몸체는 단순하게 만들고 판단과 감각은 폰에 맡겼다.

## 중고폰 재활용 관점

스마트폰은 몇 년마다 바꾸는 경우가 많아 서랍 속에 남는 기기가 쌓이기 쉽다. 오래된 폰을 로봇 두뇌로 다시 쓰는 방식은 버려질 전자기기의 쓰임새를 늘리는 시도이기도 하다. 다만 오래된 폰은 배터리 상태와 운영체제 업데이트 지원 여부를 먼저 확인해야 한다. 배터리가 부풀었거나 심하게 낡았다면 로봇에 넣기 전에 교체하거나 안전하게 처분하자.

## 할 수 있는 것과 못 하는 것

**할 수 있는 것**
- 두 발로 걷기
- 사람 따라가기: 몸통 관절이 폰 카메라를 좌우로 돌려 발을 옮기지 않고도 사람을 추적한다
- 앞으로 넘어진 뒤 스스로 일어나기

**아직 못 하는 것**
- 팔이 없다
- 평평한 바닥에서만 걷도록 학습됐다
- 음성 인식과 언어 모델은 별도 노트북에서 돌아간다
- 일부 카메라 기능은 폰 소프트웨어에 따라 달라진다

## 기존 로봇과 다른 점

연구·교육용 소형 휴머노이드는 보통 전용 제어 보드와 센서를 따로 사야 해서 값이 크게 오른다. PhoneBot은 이미 집에 있는 폰을 쓰니 추가로 사야 할 부품이 서보 모터와 프레임 정도로 줄어든다. 폰 성능이 해마다 오르는 만큼, 폰을 바꾸면 로봇 두뇌도 함께 좋아지는 구조다.

## 국내에서 해 볼 수 있나

판매 제품이 아니라 직접 만들어야 한다. 공개된 설계와 코드를 받아 부품을 사서 조립하는 방식이다. 서보 모터 13개 값이 부품비의 큰 부분을 차지하니 국내 쇼핑몰 가격으로 다시 계산해 보자. 프레임은 3D 프린터로 출력하는 경우가 많아, 학교 메이커실이나 지역 공공 메이커스페이스의 장비를 빌리면 비용을 줄일 수 있다. 처음 만든다면 걷기 동작을 바로 기대하기보다, 폰과 로봇 몸체를 와이파이로 연결하고 관절 하나씩 움직여 보는 단계부터 차근차근 밟는 편이 좋다. 손바닥 크기 4족 로봇 Q8botOne([관련 글](/blog/q8botone-desk-robot-dog-2026/))처럼 완성품을 사는 선택지와 비교하면, PhoneBot은 비용을 아끼는 대신 조립과 설정에 시간이 더 든다.

서랍 속 폰이 있다면 버리기 전에 공개 저장소의 부품 목록부터 열어 보자. 직접 만들 수 있는 수준인지 바로 판단할 수 있다.
