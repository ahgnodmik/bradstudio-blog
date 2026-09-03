import type { APIRoute } from 'astro';
import { getVisiblePosts } from '../../lib/content';
import { renderOgImage } from '../../lib/og';

export async function getStaticPaths() {
	const posts = await getVisiblePosts();
	return posts.map((post) => ({
		params: { id: post.data.contentId },
		props: { title: post.data.title, category: post.data.category },
	}));
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgImage(props.title, props.category);
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
