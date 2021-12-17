import { Feed } from "feed";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import p, { join } from "path";

const blogsPath = join(process.cwd(), "blogs");
export type BlogPost = {
  cover: string;
  path: string;
  slug: string;
  title: string;
  publishDate: string;
  description: string;
};

function resolvePost(path: string): BlogPost {
  const slug = p.basename(path).replace(/\.mdx$/, "");

  const rawContent = readFileSync(path, { encoding: "utf-8" });
  const { data } = matter(rawContent);
  const fail = (field: string) => {
    console.error(`missing ${field} field for blog ${slug}`);
    process.exit(1);
  };
  const frontmatter: BlogPost = {
    cover: data["cover"] || fail("cover"),
    description: data["description"] || fail("description"),
    path: p.basename(path),
    publishDate: String(data["publishDate"]) || fail("publishDate"),
    slug,
    title: data["title"] || fail("title"),
  };
  return frontmatter;
}

export function getAllPosts(): BlogPost[] {
  const paths = readdirSync(blogsPath);
  const posts = paths.map((path) => resolvePost(join(blogsPath, path)));
  return posts;
}

export function getBlogPost(slug: string): BlogPost {
  const path = join(blogsPath, slug + ".mdx");
  return resolvePost(path);
}

export function generateFeed() {
  const me = {
    name: "Goulin Khoge",
    email: "contact@goulin.fr",
    link: "https://goulin.fr",
  };
  const posts = getAllPosts();
  const feed = new Feed({
    title: "Goulin Khoge's personal blogs",
    description:
      "This is my personal blogs feed, a place where I share cool stuff and newly learnt tech.",
    copyright: `All rights reserved ${new Date().getFullYear()}, Goulin Khoge`,
    id: "https://goulin.fr",
    link: "https://goulin.fr",
    language: "en",
    updated: new Date(),
    generator: "Feed & NextJS on Vercel",
    feedLinks: {
      atom: "https://goulin.fr/rss/atom.xml",
      rss: "https://goulin.fr/rss/feed.xml",
      json: "https://goulin.fr/rss/feed.json",
    },
    author: me,
  });
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://goulin.fr/blog/${post.slug}`,
      link: `https://goulin.fr/blog/${post.slug}`,
      date: new Date(post.publishDate),
      description: post.description,
      author: [me],
      image: `https://goulin.fr/assets/blogs/images/${post.cover}`,
      content: post.description,
    });
  });
  mkdirSync("./public/rss", { recursive: true });
  writeFileSync("./public/rss/feed.xml", feed.rss2());
  writeFileSync("./public/rss/atom.xml", feed.atom1());
  writeFileSync("./public/rss/feed.json", feed.json1());
}
