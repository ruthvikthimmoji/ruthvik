/* ---------------------------------------------
   TYPES
--------------------------------------------- */

export type ProjectCard = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  image: string;
};

export type CaseStudy = ProjectCard & {
  tagline: string;
  role: string;
  duration: string;
  tools: string[];
  problem: string;
  solution: string;
  outcome: string;
  figmaEmbed: string;
};

/* ---------------------------------------------
   UNION TYPE
--------------------------------------------- */
export type Project = ProjectCard | CaseStudy;

/* ---------------------------------------------
   DATA
--------------------------------------------- */
export const projects: Project[] = [
  {
    slug: "sportsea",
    title: "SportSea",
    description: "Sports experience booking platform",
    tag: "Mobile App",
    image: "/projects/sportsea.jpg",
  },

  {
    slug: "exoticsonly",
    title: "ExoticsOnly",
    description: "Luxury car marketplace",
    tag: "Web App",
    image: "/projects/exotics.jpg",

    tagline: "Connecting exotic car dealers with serious buyers",
    role: "Lead UI/UX Designer",
    duration: "6 weeks",
    tools: ["Figma", "Framer", "Notion"],
    problem:
      "Dealers struggled to present premium inventory in a trustworthy way.",
    solution:
      "Designed a clean, high-end marketplace focused on credibility and speed.",
    outcome:
      "Improved dealer inquiries and reduced bounce rate significantly.",
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=...",
  },
];
