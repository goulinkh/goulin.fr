import { LocationMarkerIcon, PencilAltIcon } from "@heroicons/react/outline";
import type { GetStaticProps, NextPage } from "next";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BlogPost, getAllPosts } from "../utils/blogs";

type Props = {
  latestBlogPosts: BlogPost[];
};
const Home: NextPage<Props> = ({ latestBlogPosts }) => {
  return (
    <>
      <Header />
      <section className="max-w-container mx-auto py-16 space-y-4 flex flex-col relative isolate">
        <h1 className="text-3xl backdrop-blur-sm mx-auto w-fit">
          Goulin Khoge
        </h1>
        <div className="opacity-75 flex items-center justify-center backdrop-blur-sm mx-auto w-fit">
          <LocationMarkerIcon className="h-5 w-5 mr-2" /> France, Toulouse
        </div>
        <p className="backdrop-blur-sm mx-auto w-fit">
          Software engineer, manga/manhwa/manhua fan & gravel bike rider
        </p>
        <div
          className="absolute top-0 w-full h-full text-cyan-800 -z-10
         bg-repeat-round opacity-5 invert-0 dark:invert"
          style={{ backgroundImage: "url('/assets/svg/pattern.svg')" }}
        ></div>
      </section>
      <section className="max-w-container mx-auto py-16 ">
        <div className="flex items-center mb-6">
          <PencilAltIcon className="h-6 mr-2" />
          <h2 className="text-2xl">My latest blogs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 2x:grid-cols-3 gap-5">
          {latestBlogPosts.map((blogPost, i) => (
            <BlogCard key={i} blogPost={blogPost} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
export const getStaticProps: GetStaticProps<{ latestBlogPosts: BlogPost[] }> =
  async (_) => {
    let posts = await getAllPosts();
    posts = posts.sort(
      (p1, p2) =>
        new Date(p2.publishDate).getTime() - new Date(p1.publishDate).getTime()
    );
    // Latest 4 blog posts
    return {
      props: {
        latestBlogPosts: posts.slice(0, 4),
      },
    };
  };
