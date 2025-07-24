import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getPostSlugs() {
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(BLOG_DIR, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    scope: data,
  });

  return {
    slug: realSlug,
    meta: data,
    content: mdxSource,
  };
}
