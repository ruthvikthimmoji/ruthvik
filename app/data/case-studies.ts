export type CaseStudy = {
  slug: string; // canonical slug for URL
  title: string;
  tagline: string;
  role: string;
  duration: string;
  tools: string[];
  problem: string;
  solution: string;
  outcome: string;
  figmaEmbed: string;
  image: string;
};

// ✅ Keep slugs all lowercase to avoid URL mismatch
export const caseStudies: CaseStudy[] = [
  {
    slug: "sportsea",
    title: "SportSea",
    tagline: "A marketplace for sports experiences",
    role: "UI/UX Designer",
    duration: "6 weeks",
    tools: ["Figma"],
    problem: "Users struggled to discover experiences.",
    solution: "Redesigned IA and booking flow.",
    outcome: "Increase in engagement and bookings.",
    figmaEmbed:"https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D1-2%26t%3DKJw03P2gxOMZ2Ext-1",
    image: "/projects/sea3.png",
  },
  {
    slug: "juzzpay",
    title: "juzzpay",
    tagline: "A finance dashboard",
    role: "UI/UX Designer",
    duration: "1 week",
    tools: ["Figma"],
    problem: "a clear vision and view of data on a dashboard",
    solution: "Designed a modern dashboard with clear vision.",
    outcome: "Increase in engagement and data visualization is clear.",
    figmaEmbed:"https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D4-6213%26t%3DKJw03P2gxOMZ2Ext-1",
    image: "/projects/juzzpay.png",
  },
  // Add more case studies here
];
