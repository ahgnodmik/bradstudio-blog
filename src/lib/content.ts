import { type CollectionEntry, getCollection } from 'astro:content';

// 노출 규칙: published만 공개. archived는 어디서도 안 보임.
// draft/review/approved는 로컬 dev 또는 SHOW_DRAFTS=true 빌드(검수용 preview)에서만 보임.
export function isVisible(post: CollectionEntry<'blog'>): boolean {
	const { status } = post.data;
	if (status === 'published') return true;
	if (status === 'archived') return false;
	return import.meta.env.DEV || process.env.SHOW_DRAFTS === 'true';
}

// 최신성 기준: updatedDate가 있으면 그걸, 없으면 pubDate.
// 갱신한 글이 최신글 목록 상단에 올라오도록 한다.
function recencyOf(post: CollectionEntry<'blog'>): number {
	return (post.data.updatedDate ?? post.data.pubDate).valueOf();
}

export async function getVisiblePosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', isVisible);
	return posts.sort((a, b) => recencyOf(b) - recencyOf(a));
}
