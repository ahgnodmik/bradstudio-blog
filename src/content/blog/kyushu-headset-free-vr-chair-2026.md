---
contentId: "bs-20261010-002"
title: '헤드셋 없이 앉기만 하면 VR — 규슈대 마운트리스 공중 HMD 의자, 무엇이 다르고 어디까지 왔나'
description: '일본 규슈대 연구팀이 머리에 아무것도 쓰지 않고 의자에 앉아 가상현실을 보는 장치를 SIGGRAPH 2026에서 공개했다. 미세 거울 배열로 공중에 영상을 띄우는 원리, 기존 VR 헤드셋과의 차이, 밝기·시야각 한계를 정리했다.'
pubDate: 2026-10-10
thumbnail:
  url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  alt: '흰색 VR 헤드셋'
  creditName: 'Remy Gieling'
  creditUrl: 'https://unsplash.com/@gieling'

status: draft

category: world
tags:
  - '왜이제나옴'
  - 'VR'
  - '가상현실'
  - 'SIGGRAPH'
  - '신기술'

primaryKeyword: '헤드셋 없는 VR'
secondaryKeywords:
  - 'VR 의자'
  - '공중 영상 디스플레이'
  - 'VR 헤드셋 불편'
  - '규슈대 VR'
intent: informational
funnelStage: awareness
cluster: 'world-product'
clusterRole: supporting

evergreen: false
reviewAfter: 2026-11-10
author: 'Brad Studio'
internalLinks: []

sources:
  - title: 'How to head into VR without wearing a headset — EurekAlert!(규슈대 보도자료)'
    url: 'https://www.eurekalert.org/news-releases/1146597'
    accessedAt: 2026-10-10
  - title: 'VR chair offers a new way into virtual worlds without a headset — New Atlas'
    url: 'https://newatlas.com/vr/kyushu-university-chair-virtual-worlds/'
    accessedAt: 2026-10-10
  - title: "This VR System Doesn't Need a Headset — Hackster.io"
    url: 'https://www.hackster.io/news/this-vr-system-doesn-t-need-a-headset-98a2fba47619'
    accessedAt: 2026-10-10
  - title: "This VR System Gets Bigger So It Doesn't Have to Touch Your Face — Yanko Design"
    url: 'https://www.yankodesign.com/2026/10/08/this-vr-system-gets-bigger-so-it-doesnt-have-to-touch-your-face/'
    accessedAt: 2026-10-10

monetization:
  methods:
    - 'adsense'
  affiliateDisclosure: false

faq:
  - question: '이 VR 의자는 살 수 있나요?'
    answer: '아닙니다. 규슈대 연구팀이 학회에서 공개한 연구 시제품입니다. 판매 계획이나 가격은 발표되지 않았습니다.'
  - question: '헤드셋 없이 어떻게 입체 영상을 보나요?'
    answer: '미세 거울 배열(마이크로미러 어레이)이 양쪽 눈에 서로 다른 영상을 보내 공중에 떠 있는 듯한 영상을 만듭니다. 의자에 단 태블릿의 자이로 센서가 몸의 회전을 읽어 화면을 돌립니다.'
  - question: '기존 VR 헤드셋보다 나은가요?'
    answer: '얼굴에 무게가 실리지 않는다는 장점이 있습니다. 대신 시야각이 헤드셋보다 좁고, 거울판이 빛을 많이 흡수해 매우 밝은 디스플레이가 필요하다는 한계가 있습니다.'

seo:
  noindex: false
---

VR 헤드셋을 30분 넘게 써 보면 콧등과 이마가 눌리고 얼굴에 땀이 찬다. 일본 규슈대 연구팀은 이 문제를 반대로 풀었다. 헤드셋을 가볍게 만드는 대신, 머리에 아무것도 쓰지 않는 의자를 만들었다.

![규슈대 마운트리스 공중 HMD 시제품](https://www.yankodesign.com/images/design_news/2026/10/this-vr-system-gets-bigger-so-it-doesnt-have-to-touch-your-face/vr-chair-prototype-02.jpg)

이미지 출처: Yanko Design ([원문 링크](https://www.yankodesign.com/2026/10/08/this-vr-system-gets-bigger-so-it-doesnt-have-to-touch-your-face/))

> **조사 기준**
>
> - 조사일: 2026년 10월 10일
> - 자료: 규슈대 보도자료(EurekAlert!), New Atlas, Hackster.io, Yanko Design
> - 원칙: 2곳 이상에서 같은 내용이 확인된 사양만 적었다. 직접 체험한 후기가 아니다.

## 무엇이 새로운가

장치 이름은 "마운트리스 공중 HMD(Mountless Aerial HMD)"다. HMD는 머리에 쓰는 디스플레이(Head Mounted Display)를 뜻하는데, 이름 그대로 머리에 걸지 않는다. 사용자는 의자에 앉기만 하고, 눈앞 공중에 떠 있는 영상을 본다.

연구는 규슈대 후쿠시마 쇼고 부교수 팀이 이끌었다. 결과는 컴퓨터 그래픽스 분야 최대 학회인 SIGGRAPH 2026의 신기술 전시(Emerging Technologies) 부문에서 공개됐다.

## 작동 원리: 미세 거울로 공중에 영상 띄우기

핵심은 공중 영상(aerial imaging) 기술이다. 화면이 실제 판 위에 있는 것이 아니라 공중에 떠 있는 것처럼 보이게 만든다.

- **미세 거울 배열:** 아주 작은 거울 수많은 개가 촘촘히 박힌 판이 디스플레이 빛을 반사해 공중에 상을 맺는다. 양쪽 눈에 서로 다른 영상을 보내 입체감을 만든다.
- **회전 추적:** 의자 틀에 태블릿을 달았다. 태블릿의 자이로 센서가 의자의 회전을 읽고, 사용자가 몸을 돌리면 가상 장면도 실시간으로 따라 돈다.
- **무게 분리:** 디스플레이와 영상 처리 장치가 모두 의자 쪽에 있다. 머리와 얼굴에는 아무 무게도 실리지 않는다.

## 기존 VR 헤드셋과 비교

| 항목 | VR 헤드셋 | 마운트리스 공중 HMD |
|---|---|---|
| 착용 | 머리에 밀착 | 착용 없음, 의자에 앉음 |
| 얼굴 압박·땀 | 있음 | 없음 |
| 움직임 | 걷기·고개 돌리기 자유 | 의자 회전 중심 |
| 시야각 | 넓음 | 좁음(연구팀도 한계로 인정) |
| 밝기 | 일반 디스플레이로 충분 | 거울판이 빛을 흡수해 매우 밝은 화면 필요 |
| 상태 | 시판 | 연구 시제품 |

## 아직 남은 한계

연구팀이 직접 밝힌 한계가 분명하다. 미세 거울판이 빛을 많이 흡수해 아주 밝은 디스플레이가 필요하다. 시야각도 헤드셋보다 좁다. 시야를 넓히기 위해 거울판을 키우는 방안은 아직 구상 단계다. 시야각 수치나 몰입감을 측정한 사용자 실험 결과는 공개되지 않았다.

판매 계획과 가격도 발표되지 않았다. 지금은 학회에서 원리를 보여 준 연구 시제품이다.

## 어디에 먼저 쓰일까

얼굴에 무언가를 쓰기 어려운 상황을 먼저 떠올려 볼 수 있다. 안경을 쓴 사람, 화장이나 위생 때문에 헤드셋 공유가 꺼려지는 체험관, 오래 앉아 보는 영상 감상이 여기에 해당한다. 연구팀도 장시간 VR을 편하게 만드는 것을 목표로 들었다.

다만 걸어 다니며 쓰는 게임이나 넓은 시야가 필요한 훈련용 VR은 당분간 헤드셋 몫이다. VR 기기를 고민 중이라면 지금 나온 헤드셋의 무게와 얼굴 패드 소재부터 비교해 보자. 의자형 VR은 상용화 소식이 나오면 다시 정리한다.
