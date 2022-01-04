import { Feed } from "feed";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import p, { join } from "path";
import { getPlaiceholder } from "plaiceholder";
import { deepClone } from "./common";

const blogsPath = join(process.cwd(), "blogs");
export type BlogPost = {
  cover: string | null;
  path: string;
  slug: string;
  title: string;
  publishDate: string;
  description: string;
  coverPreviewBlurData: string;
  tags: string[];
  relatedPosts: BlogPost[];
  topic: "tech" | "cycling" | "coffee";
};

async function resolvePost(path: string): Promise<BlogPost> {
  const slug = p.basename(path).replace(/\.mdx$/, "");

  const rawContent = readFileSync(path, { encoding: "utf-8" });
  const { data } = matter(rawContent);
  const fail = (field: string) => {
    console.error(`missing ${field} field for blog ${slug}`);
    process.exit(1);
  };
  const frontmatter: BlogPost = {
    cover: data["cover"] || null,
    coverPreviewBlurData: data["cover"]
      ? await generateBlurImageData(
          join(`/assets/blogs/images/${data["cover"]}`)
        )
      : "",
    description: data["description"] || fail("description"),
    path: p.basename(path),
    publishDate: String(data["publishDate"]) || fail("publishDate"),
    slug,
    title: data["title"] || fail("title"),
    tags: (data["tags"] || "").split(",").map((tag: string) => tag.trim()),
    relatedPosts: [],
    topic: data["topic"],
  };
  return frontmatter;
}

async function generateBlurImageData(imageSrc: string) {
  return (await getPlaiceholder(imageSrc)).base64;
}
export const allPosts = getAllPosts();
async function getAllPosts(): Promise<BlogPost[]> {
  const paths = readdirSync(blogsPath);
  const posts = await Promise.all(
    paths.map(async (path) => await resolvePost(join(blogsPath, path)))
  );
  const tags: { [key: string]: BlogPost[] } = {};
  posts.forEach((post) =>
    post.tags.forEach((tag) => {
      if (!tags[tag]) tags[tag] = [];
      tags[tag].push(post);
    })
  );
  posts.forEach((post) =>
    Object.keys(tags).forEach((tag) =>
      post.relatedPosts.push(
        ...tags[tag]
          .filter(
            (relatedPost) =>
              relatedPost !== post &&
              !post.relatedPosts.find((p) => relatedPost.slug === p.slug)
          )
          .map((newRelatedPost) => deepClone(newRelatedPost))
      )
    )
  );
  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.slug === slug)[0];
}

export async function generateFeed() {
  const me = {
    name: "Goulin Khoge",
    email: "contact@goulin.fr",
    link: "https://goulin.fr",
  };
  const posts = await getAllPosts();
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
