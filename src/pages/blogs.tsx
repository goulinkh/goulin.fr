import BlogCard from "../components/common/BlogCard";
import Header from "../components/common/Header";
import SEO from "../components/common/SEO";
import BikeIcon from "../components/icons/BikeIcon";
import { BlogPost, generateFeed, getAllPosts } from "../utils/blogs";
import { usePopperTooltip } from "react-popper-tooltip";
import Link from "next/link";
import { CodeIcon, PencilAltIcon, RssIcon } from "@heroicons/react/outline";
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
            <PencilAltIcon className="h-6" />
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
          <CodeIcon className="w-5" />
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

        {allBlogPosts.filter((p) => p.topic === "coffee").length > 0 ? (
          <>
            <h3 className="my-6 flex items-center space-x-2 text-lg">
              <svg
                className="w-5 text-amber-800 dark:text-amber-700"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.26393 20.192C10.3599 23.06 14.8659 20.111 17.7339 16.015C20.6019 11.92 21.8309 6.67704 17.7359 3.80904C13.6399 0.94104 9.13393 3.88904 6.26593 7.98504C3.39793 12.081 2.16793 17.324 6.26393 20.192Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16.5889 5.44702C15.1959 5.69302 11.2629 7.82202 11.1809 11.427C11.0979 15.031 8.39389 18.021 7.41089 18.553C9.21389 18.595 12.7369 16.178 12.8189 12.573C12.9019 8.96902 15.6049 5.97902 16.5889 5.44702Z"
                  fill="currentColor"
                />
              </svg>

              <span>Coffee</span>
            </h3>

            <div className="2x:grid-cols-3 grid grid-cols-1 gap-5 md:grid-cols-2">
              {allBlogPosts
                .filter((p) => p.topic === "coffee")
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
