import Favicon from "./Favicon"
import { Topic } from "../../../utils/blogs"
import Head from "next/head"
import Script from "next/script"
import { useEffect, useState } from "react"

export const topics: Topic[] = ["cycling", "tech"]

type Props = {
  title?: string
  cover?: string
  description?: string
  keywords?: string[]
}
const SEO: React.FC<Props> = ({ title, cover, description, keywords }) => {
  const defaultURL = "https://goulin.fr"
  const [location, setLocation] = useState({
    origin: defaultURL,
    href: defaultURL,
  })
  useEffect(() => {
    setLocation(location)
  }, [])
  const titleTag = title
    ? `${title} - Goulin Khoge`
    : "Goulin Khoge's personal page"
  title = title ? `${title} - Goulin Khoge` : "Goulin Khoge"
  description =
    description || "Software engineer, manga fan & a gravel bike rider."
  const keywords2 = [
    ...(keywords || []),
    ...topics,
    "portfolio",
    " javascript",
    " developer",
    " web developer",
  ].join(", ")
  let image = cover ? cover : `https://github.com/goulinkh.png`
  image = `${location.origin}/${image}`

  useEffect(() => {
    document.documentElement.lang = "en"
  })
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title={titleTag}
          href="/rss/feed.xml"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://assets.ubuntu.com/v1/0c7b8dc0-Ubuntu-R-subset.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://assets.ubuntu.com/v1/4d80ab6d-ubuntu-b-webfont.woff"
          crossOrigin="anonymous"
        />
      </Head>
      <Script
        defer
        data-domain="goulin.fr"
        src="https://insights.goulin.fr/js/insights.js"
      />
      <Favicon />
    </>
  )
}
export default SEO
