import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { allPosts } from "../../utils/blogs";

const routes = ["/", "/about", "/blogs"];

// List of posts
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    routes.forEach((route) => {
      smStream.write({
        url: route,
        changefreq: "monthly",
        priority: 0.9,
      });
    });
    // Create each URL row
    (await allPosts).forEach((post) => {
      smStream.write({
        url: `/blog/${post.slug}`,
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date(post.publishDate),
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
}
