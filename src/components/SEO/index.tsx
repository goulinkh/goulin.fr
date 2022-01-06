import Head from "next/head";
import { useEffect, useState } from "react";
import Favicon from "./Favicon";
type Props = { title?: string; cover?: string; description?: string };
const SEO: React.FC<Props> = ({ title, cover, description }) => {
  const defaultURL = "https://goulin.fr";
  const [location, setLocation] = useState({
    origin: defaultURL,
    href: defaultURL,
  });
  useEffect(() => {
    setLocation(location);
  }, []);
  title = title ? `${title} - Goulin Khoge` : "Goulin Khoge's personal page";
  description =
    description ||
    "Software engineer, coffee hobbyist, manga fan & a gravel bike rider.";

  const keywords =
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
        <meta name="keyword" content={keywords} />

        <meta property="title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={location.href} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <Favicon />
    </>
  );
};
export default SEO;
