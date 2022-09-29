import Header from "../components/common/Header";
import Link from "../components/common/Link";
import SEO from "../components/common/SEO";
import { MapPinIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <SEO title="About me" />

      <Header />
      <section className="max-w-container mx-auto my-16 flex flex-col space-y-4 text-center">
        <h1 className="text-3xl">Goulin Khoge</h1>
        <div className="flex items-center justify-center opacity-75">
          <MapPinIcon className="mr-2 h-5 w-5" /> France, Toulouse
        </div>
        <p className="prose prose-zinc max-w-full text-left dark:prose-invert">
          I am a software engineer, I mostly do fullstack, DevOps and automation
          stuff 🤖. Coding has been my passion for{" "}
          {new Date().getFullYear() - 2016} years and I am always eager to learn
          more about new technologies and to improve myself.
          <br />
        </p>
      </section>
      <section
        className="max-w-container prose prose-zinc mx-auto my-16 prose-a:no-underline
        hover:prose-a:underline dark:prose-invert
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
