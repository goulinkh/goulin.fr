import { BlogPost } from "../../utils/blogs";
import BlogCard from "../common/BlogCard";
import { PencilAltIcon } from "@heroicons/react/outline";

const RelatedPosts = ({ relatedPosts }: { relatedPosts: BlogPost[] }) => {
  if (!relatedPosts.length) return null;
  return (
    <div className="my-16">
      <div className="mb-6 flex items-center">
        <PencilAltIcon className="mr-2 h-6" />
        <h2 className="text-2xl">Related blog posts</h2>
      </div>
      <div className="2x:grid-cols-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.slice(0, 4).map((blogPost, i) => (
          <BlogCard key={i} blogPost={blogPost} small className="h-full" />
        ))}
      </div>
    </div>
  );
};
export default RelatedPosts;
