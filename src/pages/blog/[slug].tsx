import { CheckIcon, ClipboardIcon, LinkIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { MDXContent } from "mdx/types";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Header from "../../components/Header";
import { userPreferencesContext } from "../../context/userPreferences";
import { BlogPost, getAllPosts, getBlogPost } from "../../utils/blogs";
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

const Code: React.FC<any> = ({ className, ...props }) => {
  const [theme] = useContext(userPreferencesContext).theme;
  const match = /language-(\w+)/.exec(className || "");
  const inlineCode = !className;
  const codeToShow = inlineCode ? props.children : props.children.slice(0, -1);
  return match ? (
    <div className="relative group">
      <CodeCopyPastBtn content={props.children} />
      <SyntaxHighlighter
        className="!p-4 not-prose !font-mono rounded-lg shadow border border-gray-200 dark:border-gray-600"
        language={match[1]}
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
    <div className="flex absolute -left-6 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity">
      <a className="flex" href={"#" + id}>
        <LinkIcon className="w-4" />
      </a>
    </div>
  );
};

const BlogPostPage = ({ post }: { post: BlogPost }) => {
  const Content = dynamic(
    () => import(`../../../blogs/${post.path}`)
  ) as MDXContent;

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
      <Header />
      <section
        className="prose prose-zinc dark:prose-invert max-w-container mx-auto py-16 
      prose-h1:text-sky-700 dark:prose-h1:text-sky-400
      prose-h2:text-zinc-700 dark:prose-h2:text-zinc-400
      prose-h3:text-zinc-700 dark:prose-h3:text-zinc-400
      prose-h4:text-zinc-700 dark:prose-h4:text-zinc-400
      prose-h5:text-zinc-700 dark:prose-h5:text-zinc-400
      prose-h6:text-zinc-700 dark:prose-h6:text-zinc-400
      prose-code:text-sky-800 dark:prose-code:text-sky-200
      "
      >
        <Content
          components={{
            pre: React.Fragment as any,
            code: Code as any,
            h1: ({ children }: { children?: ReactNode }) => {
              const content = children as string;
              const id = content.replace(/(-|\/|,|\s)/gi, "-");
              return (
                <HeadingWrapper>
                  <HeadingAnchor id={id} />
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
    </>
  );
};

export default BlogPostPage;

export const getStaticProps: GetStaticProps<{ post: BlogPost }> = async (
  context
) => {
  const post = getBlogPost((context.params as { slug: string }).slug);

  return {
    props: { post },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => {
      return {
        params: { slug: post.slug },
      };
    }),
    fallback: false,
  };
}
