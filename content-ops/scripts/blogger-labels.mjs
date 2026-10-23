// Blogger 라벨(카테고리)을 4개로 고정한다. 글 태그를 그대로 라벨로 쓰면 라벨이 수백 개로 늘어난다.
export const BLOGGER_LABELS = ['지원금·복지', '생활·재테크', 'IT·신제품', '해외 이슈'];

// bradstudio 글(category, tags) → Blogger 라벨 1개
export function bloggerLabel({ category, tags = [] }) {
  if (category === 'digital') return 'IT·신제품';
  if (category === 'world' || category === 'history') {
    return tags.includes('왜이제나옴') && !tags.includes('해외난리') ? 'IT·신제품' : '해외 이슈';
  }
  return '생활·재테크'; // living, money, shopping
}
