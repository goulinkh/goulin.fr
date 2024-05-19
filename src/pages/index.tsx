import BikeTourCard from "../components/common/BikeTourCard"
import BlogCard from "../components/common/BlogCard"
import MP3Player from "../components/common/MP3Player"
import SEO from "../components/common/SEO"
import BikeIcon from "../components/icons/BikeIcon"
import Location from "../components/Location"
import SideProjects from "../components/SideProjects"
import { BikeTour, publicBikeTours } from "../lib/komoot"
import { Song } from "../lib/spotify"
import { BlogPost, getAllPosts } from "../utils/blogs"
import useSWR from "swr"
import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import type { GetStaticProps, NextPage } from "next"

type Props = {
  latestBlogPosts: BlogPost[]
  tours: BikeTour[]
  toursPublicUrl: string
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((payload: any) => {
      if (payload.error) throw new Error(payload.error)
      return payload
    })

const Home: NextPage<Props> = ({ latestBlogPosts, tours, toursPublicUrl }) => {
  const { data: song, error } = useSWR<Song>(
    "/api/spotify/current-song",
    fetcher
  )
  return (
    <>
      <SEO />
      <section className="light-effect max-w-container mx-auto flex flex-wrap items-center justify-center lg:justify-between">
        <div className=" relative isolate flex flex-col space-y-4 overflow-hidden py-24">
          <h1 className="w-fit text-3xl backdrop-blur-sm">Goulin Khoge</h1>
          <Location />
          <p className="w-fit backdrop-blur-sm">
            Software engineer, manga fan & a road bike rider.
          </p>
        </div>
        <MP3Player
          song={song}
          error={error}
          className="z-20 w-[90%] sm:w-[350px]"
        />
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
          <div className="group mb-6 flex items-center" aria-label="Bike tours">
            <BikeIcon className="mr-2 h-6" />
            <h2 className="font-bold">Latest Bike tours</h2>
            <div className="-translate-x-2 transform opacity-0 transition-all group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100">
              <a
                href={toursPublicUrl}
                className="light:focus:text-cyan-800 ml-4 flex items-center gap-1 text-cyan-600 dark:focus:text-cyan-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                View all <ArrowRightIcon className="h-3" />
              </a>
            </div>
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
  let posts = await getAllPosts()
  posts = posts.sort(
    (p1, p2) =>
      new Date(p2.publishDate).getTime() - new Date(p1.publishDate).getTime()
  )
  // Latest 4 items
  return {
    props: {
      latestBlogPosts: posts.slice(0, 4),
      tours: (await publicBikeTours()).slice(0, 4),
      toursPublicUrl:
        "https://www.komoot.com/user/" + process.env.KOMOOT_USER_ID,
    },
    revalidate: 60 * 60,
  }
}
