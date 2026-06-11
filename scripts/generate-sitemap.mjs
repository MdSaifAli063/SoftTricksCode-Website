import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../src/data/blog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parseDotEnv = (text) =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .reduce((env, line) => {
      const [key, ...rest] = line.split("=");
      env[key] = rest.join("=").trim();
      return env;
    }, {});

const loadEnv = async () => {
  try {
    const file = await fs.readFile(new URL("../.env", import.meta.url), "utf8");
    return parseDotEnv(file);
  } catch {
    return {};
  }
};

const env = await loadEnv();
const siteUrl = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  env.SITE_URL ||
  env.VITE_SITE_URL ||
  "https://softtrickscode.com"
).replace(/\/$/, "");

const routes = [
  "/",
  "/services",
  "/portfolio",
  "/about",
  "/pricing",
  "/blog",
  "/contact",
  "/careers",
];
const urls = [...routes, ...blogPosts.map((post) => `/blog/${post.slug}`)];

const formattedUrls = urls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "/" ? "1.0" : url === "/blog" ? "0.9" : "0.8"}</priority>
  </url>`,
  )
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${formattedUrls}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await fs.writeFile(
  path.join(__dirname, "../public/sitemap.xml"),
  sitemapXml,
  "utf8",
);
await fs.writeFile(
  path.join(__dirname, "../public/robots.txt"),
  robotsTxt,
  "utf8",
);

console.log("Generated sitemap.xml and robots.txt for", siteUrl);
