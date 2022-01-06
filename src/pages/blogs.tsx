import { CodeIcon, PencilAltIcon, RssIcon } from "@heroicons/react/outline";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { usePopperTooltip } from "react-popper-tooltip";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { allPosts, BlogPost, generateFeed } from "../utils/blogs";

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
        <div className="flex content-between items-center mb-6">
          <div className="flex items-center w-fit space-x-2">
            <PencilAltIcon className="h-6" />
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
        <h3 className="text-lg my-6 flex items-center space-x-2">
          <CodeIcon className="w-5" />
          <span>Technology</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 2x:grid-cols-3 gap-5">
          {allBlogPosts
            .filter((p) => p.topic === "tech")
            .slice(0, maxPerTopic)
            .map((blogPost, i) => (
              <BlogCard key={i} blogPost={blogPost} />
            ))}
        </div>
        {allBlogPosts.filter((p) => p.topic === "cycling").length > 0 ? (
          <>
            <h3 className="text-lg my-6 flex items-center space-x-2">
              <svg
                className="w-5"
                viewBox="0 0 513 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M116.5 468C136.278 468 155.612 462.135 172.057 451.147C188.502 440.159 201.319 424.541 208.888 406.268C216.457 387.996 218.437 367.889 214.579 348.491C210.72 329.093 201.196 311.275 187.211 297.289C173.225 283.304 155.407 273.78 136.009 269.922C116.611 266.063 96.5043 268.043 78.2317 275.612C59.959 283.181 44.3412 295.998 33.353 312.443C22.3649 328.888 16.5 348.222 16.5 368C16.5299 394.513 27.0752 419.931 45.8224 438.678C64.5695 457.425 89.9875 467.97 116.5 468V468ZM116.5 300C129.949 300 143.096 303.988 154.279 311.46C165.461 318.932 174.177 329.552 179.324 341.978C184.471 354.403 185.817 368.075 183.193 381.266C180.57 394.457 174.093 406.573 164.583 416.083C155.073 425.593 142.957 432.07 129.766 434.693C116.575 437.317 102.903 435.971 90.4775 430.824C78.0521 425.677 67.432 416.961 59.9601 405.779C52.4881 394.596 48.5 381.449 48.5 368C48.5204 349.972 55.6912 332.687 68.4392 319.939C81.1873 307.191 98.4715 300.02 116.5 300Z"
                  fill="currentColor"
                />
                <path
                  d="M296.5 368C296.5 387.778 302.365 407.112 313.353 423.557C324.341 440.002 339.959 452.819 358.232 460.388C376.504 467.957 396.611 469.937 416.009 466.079C435.407 462.22 453.225 452.696 467.211 438.711C481.196 424.725 490.72 406.907 494.579 387.509C498.437 368.111 496.457 348.004 488.888 329.732C481.319 311.459 468.502 295.841 452.057 284.853C435.612 273.865 416.278 268 396.5 268C369.988 268.03 344.57 278.575 325.822 297.322C307.075 316.07 296.53 341.488 296.5 368V368ZM396.5 300C409.949 300 423.096 303.988 434.279 311.46C445.461 318.932 454.177 329.552 459.324 341.978C464.471 354.403 465.817 368.075 463.193 381.266C460.57 394.457 454.093 406.573 444.583 416.083C435.073 425.593 422.957 432.07 409.766 434.693C396.575 437.317 382.903 435.971 370.478 430.824C358.052 425.677 347.432 416.961 339.96 405.779C332.488 394.596 328.5 381.449 328.5 368C328.52 349.972 335.691 332.687 348.439 319.939C361.187 307.191 378.472 300.02 396.5 300V300Z"
                  fill="currentColor"
                />
                <path
                  d="M318.412 128.176C337.238 128.176 352.5 112.914 352.5 94.088C352.5 75.2617 337.238 60 318.412 60C299.586 60 284.324 75.2617 284.324 94.088C284.324 112.914 299.586 128.176 318.412 128.176Z"
                  fill="currentColor"
                />
                <path
                  d="M191.454 266.3L240.5 314.69V404H272.5V311.345C272.491 308.167 271.856 305.023 270.63 302.091C269.404 299.16 267.612 296.499 265.356 294.261L214.082 243.673L280.535 177.22L338.7 236.771C340.94 239.053 343.612 240.867 346.559 242.108C349.506 243.349 352.671 243.992 355.869 244H384.5V212H359.238L266.751 117.312L266.276 117.776L257.876 109.376L145.876 221.376L191.13 266.63L191.454 266.3Z"
                  fill="currentColor"
                />
              </svg>

              <span>Cycling</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 2x:grid-cols-3 gap-5">
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
            <h3 className="text-lg my-6 flex items-center space-x-2">
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

            <div className="grid grid-cols-1 md:grid-cols-2 2x:grid-cols-3 gap-5">
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
export const getStaticProps: GetStaticProps<{ allBlogPosts: BlogPost[] }> =
  async (_) => {
    generateFeed();
    let posts = await allPosts;

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
