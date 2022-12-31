import { getAllPosts } from "./blogs"
import { writeFile } from "fs/promises"
import { join } from "path"

const routes = ["/", "/about", "/blogs"]

// List of posts
export async function generateSitemap() {
  const pages: {
    url: string
    changefreq: string
    priority: number
    lastmod?: Date
  }[] = []
  routes.forEach((route) => {
    pages.push({
      url: route,
      changefreq: "monthly",
      priority: 0.9,
    })
  })
  ;(await getAllPosts()).forEach((post) => {
    pages.push({
      url: `/blog/${post.slug}`,
      changefreq: "monthly",
      priority: 0.9,
      lastmod: new Date(post.publishDate),
    })
  })

  const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages
  .map(
    (page) => `
  <url>
    <loc>https://www.goulin.fr${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod.toJSON()}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>
`
  // XML sitemap string
  await writeFile(join("./public/sitemap.xml"), sitemap, {
    encoding: "utf-8",
  })
}
