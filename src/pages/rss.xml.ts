export const prerender = true;
import { getRssString } from '@astrojs/rss';
import { SITE, METADATA } from 'astrowind:config';
import { getAllPosts } from '~/utils/blog';

export const GET = async () => {
  const posts = await getAllPosts();

  const rss = await getRssString({
    title: `${SITE.name} — Blog`,
    description: METADATA?.description || '',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: `/${post.id}`,
      title: post.data.title,
      description: post.data.excerpt ?? '',
      pubDate: post.data.publishDate,
    })),
    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
