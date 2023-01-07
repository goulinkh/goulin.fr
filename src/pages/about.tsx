import SEO from "../components/common/SEO"
import Location from "../components/Location"
import SideProjects from "../components/SideProjects"
import type { NextPage } from "next"

const About: NextPage = () => {
  return (
    <>
      <SEO title="About me" />
      <section className="max-w-container light-effect mx-auto my-16 flex flex-col space-y-4">
        <h1 className="mx-auto text-3xl">Goulin Khoge</h1>
        <Location />
        <p className="prose prose-zinc max-w-full dark:prose-invert">
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
