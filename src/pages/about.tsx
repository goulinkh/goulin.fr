import Header from "../components/common/Header"
import Link from "../components/common/Link"
import SEO from "../components/common/SEO"
import SideProjectCard from "../components/common/SideProjectCard"
import VanillaIcon from "../components/icons/VanillaIcon"
import PodcastIcon from "../components/icons/PodcastIcon"
import TwitterMastodonIcon from "../components/icons/TwitterMastodonIcon"
import SideProjects from "../components/SideProjects"
import { MapPinIcon } from "@heroicons/react/24/outline"
import type { NextPage } from "next"

const About: NextPage = () => {
  return (
    <>
      <SEO title="About me" />
      <section className="max-w-container light-effect mx-auto my-16 flex flex-col space-y-4">
        <h1 className="mx-auto text-3xl">Goulin Khoge</h1>
        <div className="flex items-center justify-center opacity-75">
          <MapPinIcon className="mr-2 h-5 w-5" /> France, Toulouse
        </div>
        <p className="prose prose-zinc dark:prose-invert max-w-full">
          I am a software engineer with a focus on building high-quality web
          products. I have a strong foundation in software engineering
          principles and am skilled in fullstack development, DevOps, and
          automation. I am committed to delivering reliable solutions that
          exceed user expectations.
          <br />
        </p>
      </section>
      <SideProjects />
    </>
  )
}

export default About
