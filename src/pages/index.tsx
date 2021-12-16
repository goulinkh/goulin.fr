import { LocationMarkerIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <section className="max-w-container mx-auto py-16 text-center space-y-4 flex flex-col">
        <h1 className="text-3xl">Goulin Khoge</h1>
        <div className="opacity-75 flex items-center justify-center">
          <LocationMarkerIcon className="h-5 w-5 mr-2" /> France, Toulouse
        </div>
        <p>Software engineer, manga/manhwa/manhua fan & gravel bike rider</p>
      </section>
      <section className="max-w-container mx-auto py-16 ">
        <h2 className="text-2xl mb-6">My latest blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 2x:grid-cols-3 gap-5">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </section>
    </>
  );
};

export default Home;
