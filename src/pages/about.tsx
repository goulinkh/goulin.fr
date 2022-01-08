import { LocationMarkerIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "../components/common/Link";
import Header from "../components/Header";
import SEO from "../components/SEO";

const About: NextPage = () => {
  return (
    <>
      <SEO title="About me" />

      <Header />
      <section className="max-w-container mx-auto my-16 text-center space-y-4 flex flex-col">
        <h1 className="text-3xl">Goulin Khoge</h1>
        <div className="opacity-75 flex items-center justify-center">
          <LocationMarkerIcon className="h-5 w-5 mr-2" /> France, Toulouse
        </div>
        <p className="text-left prose prose-zinc dark:prose-invert max-w-full">
          I am a software engineer, I mostly do fullstack, DevOps and automation
          stuff 🤖. Coding has been my passion for{" "}
          {new Date().getFullYear() - 2016} years and I am always eager to learn
          more about new technologies and to improve myself.
          <br />
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
            <Link href="https://github.com/goulinkh/podcast-cli">
              <code>Podcast-cli</code>
            </Link>
            : Top-like interface for listening to podcasts podcast-cli lets you
            play your favorite podcasts from the terminal
          </li>
          <li>
            <Link href="https://github.com/goulinkh/rooms-finder">
              <code>Free rooms finder</code>
            </Link>
            : A Web app that helps the students of the University Paul Sabatier
            to easily find free amphitheaters and class rooms
          </li>
          <li>
            <Link href="https://github.com/goulinkh/vanilla-framework-intellisense">
              <code>Vanilla Framework Intellisense</code>
            </Link>
            : A VS Code extension that provides intelligent suggestions for the
            CSS library:
            <Link href="https://vanillaframework.io/">
              &quot;Vanilla framework&quot;
            </Link>
          </li>
          <li>
            <Link href="http://ecommerce.goulin.fr/">
              <code>E-commerce demo website</code>
            </Link>
            : A fullstack e-commerce app, built using Nextjs, Prisma & Strapi
            CMS
          </li>
        </ul>
      </section>
    </>
  );
};

export default About;
