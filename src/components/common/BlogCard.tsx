import BlogCover from "./BlogCover";
import { BlogPost } from "../../utils/blogs";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = { blogPost: BlogPost; small?: boolean };

const BlogCard: React.FC<Props> = ({ blogPost, small = false }) => {
  return (
    <Link passHref href={`/blog/${blogPost.slug}`}>
      <a className="isolate h-fit overflow-hidden rounded-2xl transition-shadow hover:shadow-lg dark:hover:shadow-2xl">
        <div
          className={clsx("relative w-full overflow-hidden", {
            "h-52": small,
            "h-80": !small,
          })}
        >
          <BlogCover
            cover={blogPost.cover}
            coverBlurData={blogPost.coverPreviewBlurData}
            slug={blogPost.slug}
          />
        </div>
        <article
          className={clsx(
            "blurry blurry-2 relative z-10 -mt-5 flex flex-col flex-nowrap gap-3 overflow-hidden rounded-2xl py-8 px-4",
            { "md:h-72 lg:h-52 xl:h-48": !small }
          )}
        >
          <h1 className="text-xl">{blogPost.title}</h1>
          <p className={clsx("opacity-75", { hidden: small })}>
            {blogPost.description.length > 200
              ? blogPost.description.slice(0, 220).replace(/\s*.?$/, "") + "..."
              : blogPost.description}
          </p>
        </article>
      </a>
    </Link>
  );
};

export default BlogCard;
