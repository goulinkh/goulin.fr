import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogPost } from "../utils/blogs";
import BlogCover from "./BlogCover";

type Props = { blogPost: BlogPost };

const BlogCard: React.FC<Props> = ({ blogPost }) => {
  return (
    <Link passHref href={`/blog/${blogPost.slug}`}>
      <a className="rounded-2xl isolate overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative h-60 w-full overflow-hidden">
          <BlogCover
            cover={blogPost.cover}
            coverBlurData={blogPost.coverPreviewBlurData}
          />
        </div>
        <article className="blurry blurry-2 rounded-2xl flex flex-col flex-nowrap gap-3 -mt-5 py-8 px-4 relative z-10">
          <h1 className="text-xl">{blogPost.title}</h1>
          <p className="opacity-75">{blogPost.description}</p>
        </article>
      </a>
    </Link>
  );
};

export default BlogCard;
