import Avatar from "../components/common/Avatar"
import BikeTourCard from "../components/common/BikeTourCard"
import BlogCard from "../components/common/BlogCard"
import SEO from "../components/common/SEO"
import BikeIcon from "../components/icons/BikeIcon"
import Location from "../components/Location"
import SideProjects from "../components/SideProjects"
import { BlogPost, getAllPosts } from "../utils/blogs"
import { BikeTour, Komoot } from "../utils/komoot"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { GetStaticProps, NextPage } from "next"

type Props = {
  latestBlogPosts: BlogPost[]
  tours: BikeTour[]
}
const Home: NextPage<Props> = ({ latestBlogPosts, tours }) => {
  return (
    <>
      <SEO />
      <section className="light-effect">
        <div className="max-w-container relative isolate mx-auto flex flex-col space-y-4 overflow-hidden py-8">
          <Avatar className="mx-auto my-5" />
          <h1 className="mx-auto w-fit text-3xl backdrop-blur-sm">
            Goulin Khoge
          </h1>
          <Location />
          <p className="mx-auto w-fit backdrop-blur-sm">
            Software engineer, manga fan & a road bike rider.
          </p>
        </div>
      </section>
      <SideProjects />
      <section className="max-w-container mx-auto my-16 ">
        <div className="mb-6 flex items-center">
          <PencilSquareIcon className="mr-2 h-6" />
          <h2 className="font-bold">My latest blogs</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {latestBlogPosts.map((blogPost, i) => (
            <BlogCard key={i} blogPost={blogPost} />
          ))}
        </div>
      </section>
      {tours.length ? (
        <section className="max-w-container mx-auto my-16">
          <div className="mb-6 flex items-center">
            <BikeIcon className="mr-2 h-6" />
            <h2 className="font-bold">Latest Bike tours</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:justify-between lg:gap-8">
            {tours.slice(0, 3).map((tour, i) => (
              <BikeTourCard key={i} tour={tour} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}

export default Home
export const getStaticProps: GetStaticProps<{
  latestBlogPosts: BlogPost[]
}> = async (_) => {
  const fetchTours = async () => {
    const komoot = new Komoot()
    try {
      const userId = process.env.KOMOOT_USER_ID || ""
      const tours = await komoot.fetchTours(userId)
      return await Promise.all(tours.map((i) => komoot.customTourDetails(i)))
    } catch (e) {
      console.log("e", e)
      return []
    }
  }
  let posts = await getAllPosts()
  posts = posts.sort(
    (p1, p2) =>
      new Date(p2.publishDate).getTime() - new Date(p1.publishDate).getTime()
  )
  // Latest 4 blog posts
  return {
    props: {
      latestBlogPosts: posts.slice(0, 4),
      tours: await fetchTours(),
    },
    revalidate: 60 * 60,
  }
}
