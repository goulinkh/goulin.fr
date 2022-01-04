import { PencilAltIcon, RssIcon } from "@heroicons/react/outline";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { usePopperTooltip } from "react-popper-tooltip";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { BlogPost, generateFeed, getAllPosts } from "../utils/blogs";

type Props = {
  allBlogPosts: BlogPost[];
};
const Blogs: NextPage<Props> = ({ allBlogPosts }) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();
  return (
    <>
      <Head>
        <title>Blog posts - Goulin Khoge</title>
      </Head>
      <Header />
      <section className="max-w-container mx-auto my-16 ">
        <div className="flex content-between items-center mb-6">
          <div className="flex items-center w-fit">
            <PencilAltIcon className="h-6 mr-2" />
            <h2 className="text-2xl">Blog Posts</h2>
          </div>
          <Link passHref href="/rss/feed.xml">
            <a
              className="ml-auto mr-7 p-1 rounded opacity-75 hover:opacity-100 dark:hover:bg-white/10 hover:bg-black/5"
              ref={setTriggerRef}
            >
              <RssIcon className="h-6" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 2x:grid-cols-3 gap-5">
          {allBlogPosts.map((blogPost, i) => (
            <BlogCard key={i} blogPost={blogPost} />
          ))}
        </div>
      </section>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: "tooltip-container default blurry blurry-2",
          })}
        >
          RSS feed
        </div>
      )}
    </>
  );
};

export default Blogs;
export const getStaticProps: GetStaticProps<{ allBlogPosts: BlogPost[] }> =
  async (_) => {
    generateFeed();
    let posts = await getAllPosts();

    posts = posts.sort(
      (p1, p2) =>
        new Date(p2.publishDate).getTime() - new Date(p1.publishDate).getTime()
    );
    // Latest 4 blog posts
    return {
      props: {
        allBlogPosts: posts,
      },
    };
  };
