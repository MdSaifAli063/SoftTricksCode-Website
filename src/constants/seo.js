import { founders } from "../data/founders";

const saif = founders.find((f) => f.id === "saif");
const ashwini = founders.find((f) => f.id === "ashwini");

export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://softtrickscode.com";

export const SEO_CONFIG = {
  siteName: "SoftTricksCode",
  defaultTitle:
    "SoftTricksCode | Software Services & AI Solutions, Web Development",
  defaultDescription:
    "SoftTricksCode delivers modern web applications, AI-powered solutions, software consulting, cloud services, and full-stack development for businesses and startups.",
  keywords:
    "Web Development, AI Solutions, Full Stack Development, SaaS Products, UI/UX Design, Cloud Services, Software Consulting",
  author: "SoftTricksCode",
  socialImage:
    "https://ik.imagekit.io/77nsbwefl/SoftTricksCode_HD_8000x8000.png",
  logo: "https://ik.imagekit.io/77nsbwefl/file_000000001b647206964f84a7912579ee.png?updatedAt=1780589075099",
  twitterHandle: "@Md_Saif_Ali_063",
  sameAs: [
    "https://github.com/Soft-Tricks-Code",
    "https://www.linkedin.com/company/softtrickscode",
    "https://twitter.com/SoftTricksCode",
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
  foundingYear: "2026",
};
