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

const generateLlmsTxt = () => {
  const blogLinks = blogPosts
    .map((post) => `- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.excerpt || 'Technical guide by Soft Tricks Code'}`)
    .join('\n');

  return `# Soft Tricks Code

> Soft Tricks Code is a premier software engineering company delivering full-stack web applications, custom website development, mobile apps (iOS & Android), AI & machine learning solutions, cloud deployment, and scalable digital systems.

Soft Tricks Code is founded by Md Saif Ali and Ashwini T Gadad, operating globally from India to provide agile, scalable, and high-performance digital products for startups and enterprises.

## Main Pages

- [Home](${siteUrl}/): Comprehensive overview of services, company mission, technology stack, featured client work, transparent pricing, and client reviews.
- [About Us](${siteUrl}/about): Discover our company mission, core engineering values, executive leadership, founders, and expert technical team.
- [Services](${siteUrl}/services): In-depth software engineering and development services including custom websites, web applications, mobile app development, digital marketing, AI automation, and brand identity design.
- [Portfolio](${siteUrl}/portfolio): Case studies, live demonstrations, open-source repositories, and digital applications built for healthcare, ecommerce, agriculture, and enterprise sectors.
- [Pricing](${siteUrl}/pricing): Transparent, customizable software development pricing plans ranging from starter landing pages to enterprise platforms with free consultation calls.
- [Blog](${siteUrl}/blog): Technical articles, engineering tutorials, industry insights, best practices in modern web development, AI integration, and mobile app design.
- [Careers & Hiring](${siteUrl}/careers): Join our engineering team, explore open roles, view company culture, and apply for remote and hybrid positions.
- [Contact Us](${siteUrl}/contact): Reach out for project inquiries, custom quotes, free consultations, or email us directly at softtrickscode@gmail.com.

## Core Software Engineering Services

- [Web Development](${siteUrl}/services): Custom, responsive, SEO-optimized, and lightning-fast websites using React, Next.js, Vite, and Tailwind CSS.
- [Web Applications & SaaS](${siteUrl}/services): Full-stack cloud applications, real-time dashboards, REST/GraphQL API integrations, and robust SaaS architectures.
- [Mobile App Development](${siteUrl}/services): High-performance cross-platform iOS and Android mobile apps using React Native and Flutter.
- [Digital Marketing & SEO](${siteUrl}/services): Data-driven search engine optimization, content strategy, GEO (Generative Engine Optimization), and digital growth campaigns.
- [Logo & Brand Identity](${siteUrl}/services): Memorable brand identity systems, typography, design tokens, and UI/UX design systems.

## Recent Technical Articles

${blogLinks}

## Extended Documentation

- [Full Site Overview (llms-full.txt)](${siteUrl}/llms-full.txt): Complete unminified plain text overview of Soft Tricks Code services, company background, and offerings.
`;
};

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
await fs.writeFile(
  path.join(__dirname, "../public/llms.txt"),
  generateLlmsTxt(),
  "utf8",
);

console.log("Generated sitemap.xml, robots.txt, and llms.txt for", siteUrl);
