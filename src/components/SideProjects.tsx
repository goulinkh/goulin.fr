import SideProjectCard from "./common/SideProjectCard"
import PodcastIcon from "./icons/PodcastIcon"
import TwitterMastodonIcon from "./icons/TwitterMastodonIcon"
import VanillaIcon from "./icons/VanillaIcon"

const SideProjects = () => (
  <section className="max-w-container mx-auto my-16">
    <h2 className="font-bold">Side projects</h2>
    <div className="pt-3"></div>
    <ul className="flex flex-wrap justify-center gap-3 md:justify-between">
      <li>
        <SideProjectCard
          title="Twitter To Mastodon"
          description="Help users to follow their friends from Twitter automatically on Mastodon."
          color="42, 169, 224"
          logo={<TwitterMastodonIcon className="h-4 w-4 grayscale" />}
          link="https://twittermastodon.com"
          backgroundImage={{
            light: "twitter-mastodon-bg.png",
            dark: "twitter-mastodon-bg.png",
          }}
        />
      </li>
      <li>
        <SideProjectCard
          title="Vanilla CSS Intellisense extension"
          description="Intelligent Vanilla framework suggestions for Visual Studio Code."
          color="217, 75, 20"
          logo={<VanillaIcon className="h-4 w-4" />}
          link="https://marketplace.visualstudio.com/items?itemName=goulinkh.vanilla-framework"
          backgroundImage={{
            dark: "vanilla-extension-bg.png",
            light: "vanilla-extension-bg-light.png",
          }}
        />
      </li>
      <li>
        <SideProjectCard
          title="Podcast CLI player"
          description="Play your favorite podcasts from the terminal."
          color="155, 105, 178"
          logo={<PodcastIcon className="h-4 w-4" />}
          link="https://github.com/goulinkh/podcast-cli"
          backgroundImage={{
            light: "podcast-cli-bg-light.png",
            dark: "podcast-cli-bg.png",
          }}
        />
      </li>
    </ul>
  </section>
)
export default SideProjects
