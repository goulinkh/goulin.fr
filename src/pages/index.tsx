import { MapPinIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { GetStaticProps, NextPage } from "next";
import Avatar from "../components/common/Avatar";
import BikeTourCard from "../components/common/BikeTourCard";
import BlogCard from "../components/common/BlogCard";
import Header from "../components/common/Header";
import SEO from "../components/common/SEO";
import BikeIcon from "../components/icons/BikeIcon";
import { BlogPost, getAllPosts } from "../utils/blogs";
import { BikeTour, Komoot } from "../utils/komoot";

type Props = {
  latestBlogPosts: BlogPost[];
  tours: BikeTour[];
};
const Home: NextPage<Props> = ({ latestBlogPosts, tours }) => {
  return (
    <>
      <SEO />
      <Header />
      <section className="max-w-container relative isolate mx-auto flex flex-col space-y-4 overflow-hidden py-16">
        <Avatar className="mx-auto my-5" />
        <h1 className="mx-auto w-fit text-3xl backdrop-blur-sm">
          Goulin Khoge
        </h1>
        <div className="mx-auto flex w-fit items-center justify-center opacity-75 backdrop-blur-sm">
          <MapPinIcon className="mr-2 h-5 w-5" /> France, Toulouse
        </div>
        <p className="mx-auto w-fit backdrop-blur-sm">
          Software engineer, manga fan & a gravel bike rider.
        </p>
        <div
          className="absolute top-0 -z-10 h-full w-full bg-repeat-round
         text-cyan-800 opacity-5 invert-0 dark:invert"
          style={{ backgroundImage: "url('/assets/svg/pattern.svg')" }}
        ></div>
      </section>
      <section className="max-w-container mx-auto my-16 ">
        <div className="mb-6 flex items-center">
          <PencilSquareIcon className="mr-2 h-6" />
          <h2 className="text-2xl">My latest blogs</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-12">
          {latestBlogPosts.map((blogPost, i) => (
            <BlogCard key={i} blogPost={blogPost} />
          ))}
        </div>
      </section>
      {tours.length ? (
        <section className="max-w-container mx-auto my-16">
          <div className="mb-6 flex items-center">
            <BikeIcon className="mr-2 h-6" />
            <h2 className="text-2xl">Bike tours</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-12">
            {tours.map((tour, i) => (
              <BikeTourCard key={i} tour={tour} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Home;
export const getStaticProps: GetStaticProps<{
  latestBlogPosts: BlogPost[];
}> = async (_) => {
  const fetchTours = async () => {
    const komoot = new Komoot();
    try {
      const userId = process.env.KOMOOT_USER_ID || "";
      const tours = await komoot.fetchTours(userId);
      return await Promise.all(tours.map((i) => komoot.customTourDetails(i)));
    } catch (e) {
      console.log("e", e);
      return [];
    }
  };
  let posts = await getAllPosts();
  posts = posts.sort(
    (p1, p2) =>
      new Date(p2.publishDate).getTime() - new Date(p1.publishDate).getTime()
  );
  // Latest 4 blog posts
  return {
    props: {
      latestBlogPosts: posts.slice(0, 4),
      tours: await fetchTours(),
    },
    revalidate: 60 * 60,
  };
};
