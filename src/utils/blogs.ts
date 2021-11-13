import { readFileSync } from 'fs';

import { glob } from 'glob';
import matter from 'gray-matter';
import remark from 'remark';
import remarkHtml from 'remark-html';

export type BlogPost = {
  data: {
    [key: string]: any;
  };
  content: string;
  excerpt?: string | undefined;
  language: string;
  matter: string;
  stringify(lang: string): string;
  path: string;
};

export async function getAllBlogs() {
  const mdFilePaths = glob.sync('blogs/*.md');
  return (
    mdFilePaths
      .map((path) => ({
        path: path.replace(/\..+$/, '').replace(/^.*\//, ''),
        content: readFileSync(path, { encoding: 'utf-8' }),
      }))
      // meta header parsing
      .map((blog) => ({ ...blog, ...matter(blog.content) }))
      .map((blog) => {
        delete blog.orig;
        return blog;
      })
      // md to html
      .map((blog) => ({
        ...blog,
        html: remark().use(remarkHtml).processSync(blog.content).contents,
      }))
  );
}
