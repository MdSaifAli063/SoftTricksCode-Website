import { founders } from "../data/founders";
import { BRAND_ASSETS } from "./brand";

const saif = founders.find((f) => f.id === "saif");
const ashwini = founders.find((f) => f.id === "ashwini");

export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://softtrickscode.com";

export const SEO_CONFIG = {
  siteName: "SoftTricksCode",

  defaultTitle:
    "SoftTricksCode | Software Development, AI Solutions, Web & Mobile App Development",

  defaultDescription:
    "SoftTricksCode is a software development company providing web development, mobile app development, AI solutions, cloud services, SaaS products, UI/UX design, and custom software solutions for startups and businesses.",

  keywords:
    "Software Development Company, Web Development, Mobile App Development, AI Solutions, SaaS Development, Cloud Services, Full Stack Development, UI UX Design, Software Consulting, Custom Software Development",

  author: "SoftTricksCode",

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
    name: "SoftTricksCode",
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
