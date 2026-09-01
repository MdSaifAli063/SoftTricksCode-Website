import { founders } from "../data/founders";
import { BRAND_ASSETS } from "./brand";

const saif = founders.find((f) => f.id === "saif");
const ashwini = founders.find((f) => f.id === "ashwini");

export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://softtrickscode.com";

export const SEO_CONFIG = {
  siteName: "Soft Tricks Code",

  defaultTitle:
    "Soft Tricks Code | Software Development & AI Solutions",

  defaultDescription:
    "Soft Tricks Code provides custom web development, mobile apps, SaaS platforms, AI solutions, and software consulting for startups and businesses.",

  keywords:
    "Software Development Company, Web Development, Mobile App Development, AI Solutions, SaaS Development, Cloud Services, Full Stack Development, UI UX Design, Software Consulting, Custom Software Development",

  author: "Soft Tricks Code",

  socialImage: `${SITE_URL}${BRAND_ASSETS.socialImage}`,

  logo: `${SITE_URL}${BRAND_ASSETS.logo}`,

  twitterHandle: "@SoftTricksCode",

  contactEmail: "softtrickscode@gmail.com",

  sameAs: [
    "https://github.com/Soft-Tricks-Code",
    "https://www.linkedin.com/company/softtrickscode",
    "https://www.youtube.com/@SoftTricksCode",
  ],

  founders: [
    {
      name: saif?.name ?? "Md Saif Ali",
      url: saif?.linkedin || "",
    },
    {
      name: ashwini?.name ?? "Ashwini T Gadad",
      url: ashwini?.linkedin || "",
    },
  ],

  foundingYear: "2026",

  organizationSchema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Soft Tricks Code",
    url: "https://softtrickscode.com",
    logo: `${SITE_URL}${BRAND_ASSETS.logo}`,
    description:
      "Software Development, AI Solutions, Web Development, Mobile App Development, SaaS Development and Cloud Services.",
    email: "softtrickscode@gmail.com",
    foundingDate: "2026",
    sameAs: [
      "https://github.com/Soft-Tricks-Code",
      "https://www.linkedin.com/company/softtrickscode",
      "https://www.youtube.com/@SoftTricksCode",
    ],
  },
};
