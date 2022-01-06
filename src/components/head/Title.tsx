import Head from "next/head";
import { useEffect, useState } from "react";

const Title: React.FC<{ title?: string; cover?: string }> = ({
  title,
  cover,
}) => {
  const defaultURL = "https://goulin.fr";
  const [location, setLocation] = useState({
    origin: defaultURL,
    href: defaultURL,
  });
  useEffect(() => {
    setLocation(location);
  }, []);
  title = title ? `${title} - Goulin Khoge` : "Goulin Khoge's personal page";
  const keywords =
    "portfolio, javascript, developer, coffee, cycling, web developer";
  const image = cover ? cover : `${location.origin}/images/personal-photo.png`;
  useEffect(() => {
    document.documentElement.lang = "en";
  });
  return (
    <Head>
      <title>{title}</title>
      <meta name="keyword" content={keywords} />

      <meta property="title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={location.href} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
export default Title;
