import Favicon from "./Favicon";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

type Props = {
  title?: string;
  cover?: string;
  description?: string;
  keywords?: string[];
};
const SEO: React.FC<Props> = ({ title, cover, description, keywords }) => {
  const defaultURL = "https://goulin.fr";
  const [location, setLocation] = useState({
    origin: defaultURL,
    href: defaultURL,
  });
  useEffect(() => {
    setLocation(location);
  }, []);
  const titleTag = title
    ? `${title} - Goulin Khoge`
    : "Goulin Khoge's personal page";
  title = title ? `${title} - Goulin Khoge` : "Goulin Khoge";
  description =
    description ||
    "Software engineer, coffee hobbyist, manga fan & a gravel bike rider.";

  const keywords2 =
    keywords?.join(", ") ||
    "portfolio, javascript, developer, coffee, cycling, web developer";
  let image = cover ? cover : `/images/personal-photo.png`;
  image = `${location.origin}/${image}`;

  useEffect(() => {
    document.documentElement.lang = "en";
  });
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords2} />

        <meta property="title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={titleTag} />
        <meta property="og:url" content={location.href} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titleTag} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <Script
        defer
        data-domain="goulin.fr"
        src="https://insights.api.goulin.fr/js/insights.js"
      />
      <Favicon />
    </>
  );
};
export default SEO;