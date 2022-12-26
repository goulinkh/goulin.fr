import BlogCover from "./BlogCover";
import { BlogPost } from "../../utils/blogs";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = { blogPost: BlogPost; small?: boolean; className?: string };

const BlogCard: React.FC<Props> = ({ blogPost, small = false, className }) => {
  return (
    <Link passHref href={`/blog/${blogPost.slug}`}>
      <a
        className={clsx(
          className,
          "isolate flex flex-col overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-lg dark:hover:shadow-2xl"
        )}
      >
        <div
          className={clsx("relative w-full overflow-hidden", {
            "h-52": small,
            "h-60": !small,
          })}
        >
          <BlogCover post={blogPost} />
        </div>
        <article
          className={clsx(
            "blurry blurry-2 relative z-10 -mt-5 flex flex-1 flex-col flex-nowrap gap-3 overflow-hidden rounded-2xl py-8 px-4",
            { "h-20": !small }
          )}
        >
          <h1 className="">{blogPost.title}</h1>
          {/* <p className={clsx("opacity-75", { hidden: small })}>
            {blogPost.description.length > 200
              ? blogPost.description.slice(0, 220).replace(/\s*.?$/, "") + "..."
              : blogPost.description}
          </p> */}
        </article>
      </a>
    </Link>
  );
};

export default BlogCard;
