import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { BlogPost } from "../utils/blogs";
import BlogCover from "./BlogCover";

type Props = { blogPost: BlogPost; small?: boolean };

const BlogCard: React.FC<Props> = ({ blogPost, small = false }) => {
  return (
    <Link passHref href={`/blog/${blogPost.slug}`}>
      <a className="rounded-2xl isolate overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-2xl h-fit">
        <div
          className={clsx("relative w-full overflow-hidden", {
            "h-40": small,
            "h-60": !small,
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
            "blurry blurry-2 rounded-2xl flex flex-col flex-nowrap gap-3 -mt-5 py-8 px-4 relative z-10 overflow-hidden",
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
