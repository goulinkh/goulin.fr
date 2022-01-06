import {
  CalendarIcon,
  CheckIcon,
  ClipboardIcon,
  CodeIcon,
  LinkIcon,
  PencilAltIcon,
  UserIcon
} from "@heroicons/react/outline";
import clsx from "clsx";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import BlogCard from "../../components/BlogCard";
import BlogCover from "../../components/BlogCover";
import BlogPostComments from "../../components/BlogPostComments";
import Description from "../../components/head/Description";
import Title from "../../components/head/Title";
import Header from "../../components/Header";
import { userPreferencesContext } from "../../context/userPreferences";
import { allPosts, BlogPost, getBlogPost } from "../../utils/blogs";
import { copyTextToClipboard } from "../../utils/common";
const CodeCopyPastBtn: React.FC<{ content: string }> = ({ content }) => {
  const successShowTime = 2000;
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), successShowTime);
  }, [copied]);
  return (
    <div
      className={clsx(
        "absolute top-3 right-4 transition-opacity group-hover:opacity-100",
        { "opacity-0": !copied }
      )}
    >
      <button
        className={clsx("btn flex transition-all", {
          "!bg-green-600/70 text-white": copied,
        })}
        ref={setTriggerRef}
        onClick={() => {
          copyTextToClipboard(content);
          setCopied(true);
        }}
      >
        {copied ? (
          <CheckIcon className="w-5" />
        ) : (
          <ClipboardIcon className="w-5" />
        )}
      </button>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: "tooltip-container default blurry blurry-2",
          })}
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </div>
      )}
    </div>
  );
};

const CodeLanguage: React.FC<{ language: string }> = ({ language }) => {
  return (
    <div className="absolute bottom-4 right-5 font-mono text-sm text-sky-500 dark:text-sky-400 flex items-center space-x-1 pointer-events-none">
      <CodeIcon className="w-4" /> <span>{language}</span>
    </div>
  );
};

const Code: React.FC<any> = ({ className, ...props }) => {
  const [theme] = useContext(userPreferencesContext).theme;
  const match = /language-(\w+)/.exec(className || "");
  const inlineCode = !className;
  const codeToShow = inlineCode ? props.children : props.children.slice(0, -1);
  const language = match?.[1];
  return language ? (
    <div className="relative group">
      <CodeCopyPastBtn content={props.children} />
      <CodeLanguage language={language} />
      <SyntaxHighlighter
        className="!p-4 not-prose !font-mono rounded-lg shadow border border-gray-200 dark:border-gray-600"
        language={language}
        PreTag={inlineCode ? "pre" : "span"}
        CodeTag={inlineCode ? "code" : "span"}
        {...props}
        style={theme === "dark" ? atomOneDark : atomOneLight}
      >
        {codeToShow}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props} />
  );
};

const HeadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="relative group">{children}</div>;
};
const HeadingAnchor: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="hidden md:flex items-center absolute -left-7 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity">
      <a className="flex h-fit btn" href={"#" + id}>
        <LinkIcon className="w-4" />
      </a>
    </div>
  );
};

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
      <Title title={post.title} />
      <Description description={post.description} />

      <Head>
        <title>{post.title}</title>
      </Head>
      <Header takeSpace={false} />
      <div className="relative w-full h-72 -z-10">
        <BlogCover
          cover={post.cover}
          coverBlurData={post.coverPreviewBlurData}
          slug={post.slug}
        />
      </div>
      <section
        className="prose prose-zinc dark:prose-invert max-w-container mx-auto my-16
        prose-h1:text-sky-700 dark:prose-h1:text-sky-400
        prose-h2:text-zinc-700 dark:prose-h2:text-zinc-300
        prose-h3:text-zinc-700 dark:prose-h3:text-zinc-300
        prose-h4:text-zinc-700 dark:prose-h4:text-zinc-300
        prose-h5:text-zinc-700 dark:prose-h5:text-zinc-400
        prose-h6:text-zinc-700 dark:prose-h6:text-zinc-400
        prose-code:text-sky-800 dark:prose-code:text-sky-200
        "
      >
        <div className="flex items-center space-x-3 text-sm opacity-75">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4" />
            <span>
              {new Date(post.publishDate).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <UserIcon className="w-4" />
            <span>Written by Goulin Khoge</span>
          </div>
        </div>
        <MDXRemote
          {...source}
          components={{
            pre: React.Fragment as any,
            code: Code as any,
            h1: ({ children }: { children?: ReactNode }) => {
              const content = children as string;
              const id = content.replace(/(-|\/|,|\s)/gi, "-");
              return (
                <HeadingWrapper>
                  {/* <HeadingAnchor id={id} /> */}
                  <h1 id={id}>{content}</h1>
                </HeadingWrapper>
              );
            },
            h2: ({ children }: { children?: ReactNode }) => {
              const content = children as string;
              const id = content.replace(/(-|\/|,|\s)/gi, "-");
              return (
                <HeadingWrapper>
                  <HeadingAnchor id={id} />
                  <h2 id={id}>{content}</h2>
                </HeadingWrapper>
              );
            },
            h3: ({ children }: { children?: ReactNode }) => {
              const content = children as string;
              const id = content.replace(/(-|\/|,|\s)/gi, "-");
              return (
                <HeadingWrapper>
                  <HeadingAnchor id={id} />
                  <h3 id={id}>{content}</h3>
                </HeadingWrapper>
              );
            },
            h4: ({ children }: { children?: ReactNode }) => {
              const content = children as string;
              const id = content.replace(/(-|\/|,|\s)/gi, "-");
              return (
                <HeadingWrapper>
                  <HeadingAnchor id={id} />
                  <h4 id={id}>{content}</h4>
                </HeadingWrapper>
              );
            },
            h5: ({ children }: { children?: ReactNode }) => {
              const content = children as string;
              const id = content.replace(/(-|\/|,|\s)/gi, "-");
              return (
                <HeadingWrapper>
                  <HeadingAnchor id={id} />
                  <h5 id={id}>{content}</h5>
                </HeadingWrapper>
              );
            },
            h6: ({ children }: { children?: ReactNode }) => {
              const content = children as string;
              const id = content.replace(/(-|\/|,|\s)/gi, "-");
              return (
                <HeadingWrapper>
                  <HeadingAnchor id={id} />
                  <h6 id={id}>{content}</h6>
                </HeadingWrapper>
              );
            },
          }}
        />
      </section>
      <section>
        <BlogPostComments />
      </section>
      {post.relatedPosts.length ? (
        <section className="max-w-container mx-auto my-16">
          <div className="flex items-center mb-6">
            <PencilAltIcon className="h-6 mr-2" />
            <h2 className="text-2xl">Related blog posts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2x:grid-cols-3 gap-5">
            {post.relatedPosts.slice(0, 4).map((blogPost, i) => (
              <BlogCard key={i} blogPost={blogPost} small />
            ))}
          </div>
        </section>
      ) : null}
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
