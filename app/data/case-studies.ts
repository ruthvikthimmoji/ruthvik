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
    tools: ["Figma", "Framer", "Notion"],
    problem: "Users struggled to discover experiences.",
    solution: "Redesigned IA and booking flow.",
    outcome: "Increase in engagement and bookings.",
    figmaEmbed:
      "https://www.figma.com/embed?embed_host=share&url=...",
    image: "/projects/sea3.png",
  },
  // Add more case studies here
];
