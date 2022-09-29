import BlogCard from "../components/common/BlogCard";
import Header from "../components/common/Header";
import SEO from "../components/common/SEO";
import BikeIcon from "../components/icons/BikeIcon";
import { BlogPost, generateFeed, getAllPosts } from "../utils/blogs";
import { usePopperTooltip } from "react-popper-tooltip";
import Link from "next/link";
import {
  CodeBracketIcon,
  PencilSquareIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import type { GetStaticProps, NextPage } from "next";

type Props = {
  allBlogPosts: BlogPost[];
};
const Blogs: NextPage<Props> = ({ allBlogPosts }) => {
  const maxPerTopic = 4;
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip();
  return (
    <>
      <SEO title="Blog Posts" />

      <Header />
      <section className="max-w-container mx-auto my-16 ">
        <div className="mb-6 flex content-between items-center">
          <div className="flex w-fit items-center space-x-2">
            <PencilSquareIcon className="h-6" />
            <h2 className="text-2xl">Blog Posts</h2>
          </div>

          <Link passHref href="/rss/feed.xml">
            <a
              className="ml-auto mr-7 rounded p-1 opacity-75 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
              ref={setTriggerRef}
            >
              <RssIcon className="h-6" />
            </a>
          </Link>
        </div>
        <h3 className="my-6 flex items-center space-x-2 text-lg">
          <CodeBracketIcon className="w-5" />
          <span>Technology</span>
        </h3>

        <div className="2x:grid-cols-3 grid grid-cols-1 gap-5 md:grid-cols-2">
          {allBlogPosts
            .filter((p) => p.topic === "tech")
            .slice(0, maxPerTopic)
            .map((blogPost, i) => (
              <BlogCard key={i} blogPost={blogPost} />
            ))}
        </div>
        {allBlogPosts.filter((p) => p.topic === "cycling").length > 0 ? (
          <>
            <h3 className="my-6 flex items-center space-x-2 text-lg">
              <BikeIcon />
              <span>Cycling</span>
            </h3>

            <div className="2x:grid-cols-3 grid grid-cols-1 gap-5 md:grid-cols-2">
              {allBlogPosts
                .filter((p) => p.topic === "cycling")
                .slice(0, maxPerTopic)
                .map((blogPost, i) => (
                  <BlogCard key={i} blogPost={blogPost} />
                ))}
            </div>
          </>
        ) : null}
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
export const getStaticProps: GetStaticProps<{
  allBlogPosts: BlogPost[];
}> = async (_) => {
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
