import Author from "../../components/BlogPost/Author";
import BlogPostComments from "../../components/BlogPost/BlogPostComments";
import Code from "../../components/BlogPost/Code";
import { H1, H2, H3, H4, H5, H6 } from "../../components/BlogPost/Heading";
import RelatedPosts from "../../components/BlogPost/RelatedPosts";
import BlogCover from "../../components/common/BlogCover";
import Header from "../../components/common/Header";
import SEO from "../../components/common/SEO";
import RoundedImage from "../../components/RoundedImage";
import TLDR from "../../components/TLDR";
import LinkPreview from "../../demo/LinkPreview";
import { BlogPost, getAllPosts, getBlogPost } from "../../utils/blogs";
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
      <Header takeSpace={false} isDraft={post.draft} />
      <div className="relative -z-10 h-72 max-h-[50vh] w-full lg:h-96">
        <BlogCover post={post} />
      </div>
      <section
        className="max-w-container prose-h5:text-zinc-700 dark:prose-h5:text-zinc-400 prose-h6:text-zinc-700 dark:prose-h6:text-zinc-400 prose prose-zinc mx-auto my-16 prose-h1:text-blue-500 prose-h2:text-zinc-700 prose-h3:text-zinc-700 prose-h4:text-zinc-700 prose-code:font-mono prose-code:text-blue-900 dark:prose-invert dark:prose-h1:text-blue-500 dark:prose-h2:text-zinc-300 dark:prose-h3:text-zinc-300 dark:prose-h4:text-zinc-300
        dark:prose-code:text-blue-200
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
            TLDR: TLDR,
            Image: RoundedImage,
            // demo
            LinkPreview: LinkPreview,
          }}
        />
      </section>
      <section className="max-w-container mx-auto">
        <Author publishDate={new Date(post.publishDate)} />
        <RelatedPosts relatedPosts={post.relatedPosts} />
        <BlogPostComments />
      </section>
    </>
  );
};

export default BlogPostPage;

export const getStaticProps: GetStaticProps<{ post: BlogPost }> = async (
  context
) => {
  const post = await getBlogPost((context.params as { slug: string }).slug);

  return {
    props: {
      post,
      source: await serialize(post.content, { scope: post.variables }),
    },
  };
};

export async function getStaticPaths() {
  const posts = await getAllPosts(true);
  return {
    paths: posts.map((post) => {
      return {
        params: { slug: post.slug },
      };
    }),
    fallback: false,
  };
}
