import Avatar from "../components/common/Avatar";
import BikeTourCard from "../components/common/BikeTourCard";
import BlogCard from "../components/common/BlogCard";
import Header from "../components/common/Header";
import SEO from "../components/common/SEO";
import BikeIcon from "../components/icons/BikeIcon";
import { BlogPost, getAllPosts } from "../utils/blogs";
import { BikeTour, Komoot } from "../utils/komoot";
import { usePopperTooltip } from "react-popper-tooltip";
import { MapPinIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { GetStaticProps, NextPage } from "next";

type Props = {
  latestBlogPosts: BlogPost[];
  tours: BikeTour[];
};
const Home: NextPage<Props> = ({ latestBlogPosts, tours }) => {
  const popper1 = usePopperTooltip();

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
          <span ref={popper1.setTriggerRef}>Software engineer,</span> manga fan
          & a gravel bike rider.
        </p>
        {popper1.visible && (
          <div
            ref={popper1.setTooltipRef}
            {...popper1.getTooltipProps({
              className: "tooltip-container default blurry blurry-2",
            })}
          >
            <span className="flex items-center space-x-1">
              <span>Working @Canonical</span>
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 425.197 425.197"
                enableBackground="new 0 0 425.197 425.197"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    fill="#E95420"
                    d="M354.331,212.595c0,78.279-63.45,141.735-141.729,141.735c-78.279,0-141.735-63.456-141.735-141.735   c0-78.274,63.457-141.728,141.735-141.728C290.881,70.867,354.331,134.32,354.331,212.595z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M139.043,212.595c0,10.064-8.159,18.225-18.23,18.225c-10.059,0-18.218-8.16-18.218-18.225   c0-10.06,8.159-18.219,18.218-18.219C130.884,194.376,139.043,202.535,139.043,212.595z M242.717,301.201   c5.033,8.709,16.173,11.696,24.889,6.67c8.715-5.033,11.701-16.179,6.669-24.895c-5.032-8.715-16.173-11.695-24.888-6.663   C240.671,281.346,237.685,292.486,242.717,301.201z M274.274,142.219c5.032-8.717,2.052-19.86-6.669-24.887   c-8.71-5.032-19.855-2.046-24.889,6.667c-5.032,8.715-2.046,19.857,6.67,24.889C258.102,153.92,269.248,150.934,274.274,142.219z    M212.602,160.632c27.153,0,49.434,20.814,51.761,47.364l26.372-0.416c-1.252-19.727-9.809-37.469-22.995-50.551   c-6.98,2.693-15.079,2.327-22.066-1.71c-6.992-4.037-11.359-10.871-12.514-18.275c-6.554-1.78-13.448-2.733-20.558-2.733   c-12.471,0-24.259,2.916-34.727,8.103l12.832,23.043C197.357,162.367,204.784,160.632,212.602,160.632z M160.633,212.595   c0-17.577,8.734-33.121,22.097-42.52l-13.54-22.634c-15.684,10.474-27.367,26.451-32.296,45.183   c5.833,4.697,9.57,11.897,9.57,19.972c0,8.08-3.738,15.28-9.57,19.978c4.929,18.731,16.612,34.708,32.296,45.188l13.54-22.634   C169.367,245.722,160.633,230.184,160.633,212.595z M212.602,264.568c-7.817,0-15.244-1.734-21.895-4.83l-12.832,23.043   c10.468,5.191,22.255,8.104,34.727,8.104c7.109,0,14.004-0.946,20.558-2.729c1.154-7.409,5.521-14.243,12.514-18.273   c6.987-4.037,15.086-4.404,22.066-1.711c13.187-13.088,21.743-30.83,22.995-50.557l-26.372-0.409   C262.035,243.749,239.755,264.568,212.602,264.568z"
                  />
                </g>
              </svg>
            </span>
          </div>
        )}
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
      const userId = await komoot.login({
        email: process.env.KOMOOT_EMAIL || "",
        password: process.env.KOMOOT_PASSWORD || "",
      });
      const tours = await komoot.fetchTours(userId);
      return await Promise.all(tours.map((i) => komoot.customTourDetails(i)));
    } catch {
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
