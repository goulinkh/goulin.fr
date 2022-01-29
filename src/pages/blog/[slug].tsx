import Author from "../../components/BlogPost/Author";
import BlogPostComments from "../../components/BlogPost/BlogPostComments";
import { H1, H2, H3, H4, H5, H6 } from "../../components/BlogPost/Heading";
import RelatedPosts from "../../components/BlogPost/RelatedPosts";
import BlogCover from "../../components/common/BlogCover";
import SEO from "../../components/common/SEO";
import { BlogPost, allPosts, getBlogPost } from "../../utils/blogs";
import Header from "../../components/common/Header";
import Code from "../../components/BlogPost/Code";
import React, { useEffect } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { GetStaticProps } from "next";

const BlogPostPage = ({
  post,
  source,
}: {
  post: BlogPost;
  source: MDXRemoteSerializeResult;
}) => {
  // Anchor doesn't scroll
  useEffect(() => {
    setTimeout(() => {
      const hash = window.location.hash;
      window.location.hash = "";
      window.location.hash = hash;
    }, 600);
  });
  return (
    <>
      <SEO
        title={post.title}
        cover={post.cover ? post.cover : undefined}
        description={post.description}
        keywords={[post.topic, ...post.tags]}
      />
      <Header takeSpace={false} />
      <div className="relative -z-10 h-72 w-full">
        <BlogCover
          cover={post.cover}
          coverBlurData={post.coverPreviewBlurData}
          slug={post.slug}
        />
      </div>
      <section
        className="max-w-container prose-h5:text-zinc-700 dark:prose-h5:text-zinc-400 prose-h6:text-zinc-700 dark:prose-h6:text-zinc-400 prose prose-zinc mx-auto my-16 prose-h1:text-sky-700 prose-h2:text-zinc-700 prose-h3:text-zinc-700 prose-h4:text-zinc-700 prose-code:text-sky-800 dark:prose-invert dark:prose-h1:text-sky-400 dark:prose-h2:text-zinc-300 dark:prose-h3:text-zinc-300 dark:prose-h4:text-zinc-300 dark:prose-code:text-sky-200
        "
      >
        <MDXRemote
          {...source}
          components={{
            pre: React.Fragment as any,
            code: Code as any,
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            h5: H5,
            h6: H6,
          }}
        />
      </section>
      <section className="max-w-container mx-auto">
        <Author publishDate={new Date(post.publishDate)} />
        <BlogPostComments />
      </section>
      <RelatedPosts relatedPosts={post.relatedPosts} />
    </>
  );
};

export default BlogPostPage;

export const getStaticProps: GetStaticProps<{ post: BlogPost }> = async (
  context
) => {
  const post = await getBlogPost((context.params as { slug: string }).slug);

  return {
    props: { post, source: await serialize(post.content) },
  };
};

export async function getStaticPaths() {
  const posts = await allPosts;
  return {
    paths: posts.map((post) => {
      return {
        params: { slug: post.slug },
      };
    }),
    fallback: false,
  };
}
