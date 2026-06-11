import { founders } from "../data/founders";

const saif = founders.find((f) => f.id === "saif");
const ashwini = founders.find((f) => f.id === "ashwini");

export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://softtrickscode.vercel.app";

export const SEO_CONFIG = {
  siteName: "Soft Tricks Code",
  defaultTitle:
    "Soft Tricks Code | Web Development, AI Solutions & Software Services",
  defaultDescription:
    "Soft Tricks Code delivers modern web applications, AI-powered solutions, software consulting, cloud services, and full-stack development for businesses and startups.",
  keywords:
    "Web Development, AI Solutions, Full Stack Development, SaaS Products, UI/UX Design, Cloud Services, Software Consulting",
  author: "Soft Tricks Code",
  socialImage: "/favicon.svg",
  logo: "/favicon.svg",
  twitterHandle: "@Md_Saif_Ali_063",
  sameAs: [
    "https://github.com/MdSaifAli063",
    "https://www.linkedin.com/in/mdsaifali063",
    "https://x.com/Md_Saif_Ali_063",
    "https://www.youtube.com/@SoftTricksCode",
  ],
  contactEmail: "softtrickscode@gmail.com",
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
  foundingYear: "2024",
};
