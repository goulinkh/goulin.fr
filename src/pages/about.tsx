import { LocationMarkerIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Description from "../components/head/Description";
import Title from "../components/head/Title";
import Header from "../components/Header";

const About: NextPage = () => {
  return (
    <>
      <Title title="About me" />
      <Description />

      <Header />
      <section className="max-w-container mx-auto my-16 text-center space-y-4 flex flex-col">
        <h1 className="text-3xl">Goulin Khoge</h1>
        <div className="opacity-75 flex items-center justify-center">
          <LocationMarkerIcon className="h-5 w-5 mr-2" /> France, Toulouse
        </div>
        <p
          className="text-left prose prose-zinc dark:prose-invert max-w-full
          prose-a:no-underline hover:prose-a:underline
          "
        >
          I am a software engineer, I mostly do fullstack, DevOps and automation
          stuff 🤖. Coding has been my passion for{" "}
          {new Date().getFullYear() - 2016} years and I am always eager to learn
          more about new technologies and to improve myself.
          <br />
          Recently I&lsquo;ve been spending a lot of my free time on developing{" "}
          <a
            href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
            title="FOSS wiki page"
          >
            FOSS
          </a>{" "}
          alternatives as side projects to try to replace platforms that we use
          daily and that are very closed software and not privacy friendly.
        </p>
      </section>
      <section
        className="max-w-container mx-auto my-16 prose prose-zinc dark:prose-invert
        prose-a:no-underline hover:prose-a:underline
      "
      >
        <h2>Side projects</h2>
        <ul>
          <li>
            <a href="https://github.com/goulinkh/podcast-cli">
              <code>Podcast-cli</code>
            </a>
            : Top-like interface for listening to podcasts podcast-cli lets you
            play your favorite podcasts from the terminal
          </li>
          <li>
            <a href="https://github.com/goulinkh/rooms-finder">
              Free rooms finder
            </a>
            : A Web app that helps the students of the University Paul Sabatier
            to easily find free amphitheaters and class rooms
          </li>
          <li>
            <a href="https://github.com/goulinkh/vanilla-framework-intellisense">
              Vanilla Framework Intellisense
            </a>
            : A VS Code extension that provides intelligent suggestions for the
            CSS library: &quot;
            <a href="https://vanillaframework.io/">Vanilla framework</a>&quot;
          </li>
          <li>
            <a href="http://ecommerce.goulin.fr/">E-commerce demo website</a>: A
            fullstack e-commerce app, built using Nextjs, Prisma & Strapi CMS
          </li>
        </ul>
      </section>
    </>
  );
};

export default About;
