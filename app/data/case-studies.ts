export type CaseStudySection = {
  id: string;
  label: string;
  title?: string;
  description?: string;
  images?: string[];
  items?: string[];
};

export type CaseStudy = {
  slug: string;

  title: string;
  tagline: string;

  type: "professional" | "client" | "concept";

  year: string;
  duration: string;
  role: string;
  platform: string;

  tools: string[];

  overview: string;

  problem?: string;

  responsibilities: string[];

  sections: CaseStudySection[];

  outcome?: string;

  learnings?: string[];

  figmaEmbed?: string;

  image: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sportsea",

    title: "SportSea",

    tagline: "Making sports discovery and booking easier.",

    type: "client",

    year: "2025",

    duration: "6 weeks",

    role: "UI/UX Designer",

    platform: "Mobile + Web",

    tools: ["Figma"],

    overview:
      "SportSea is a marketplace for sports experiences. The project focused on creating a clearer way for users to discover relevant experiences and move through the booking journey.",

    problem:
      "Users struggled to discover sports experiences and navigate the booking experience.",

    responsibilities: [
      "User interviews",
      "Surveys",
      "User flows",
      "Wireframing",
      "UI design",
      "Prototyping",
      "Design iteration based on feedback",
    ],

    sections: [
      {
        id: "research",
        label: "02 / Research",
        title: "Understanding the experience",
        description:
          "The initial design process focused on understanding how users discover sports experiences and where friction appeared in the journey.",
      },

      {
        id: "flows",
        label: "03 / User Flows",
        title: "Structuring the booking journey",
        description:
          "The experience was structured around a clearer path from discovering an experience through to booking.",
      },

      {
        id: "wireframes",
        label: "04 / Wireframes",
        title: "Exploring the structure",
        description:
          "Wireframes were used to explore the information hierarchy and interaction structure before moving into the final visual design.",
      },

      {
        id: "final-design",
        label: "05 / Final Design",
        title: "A clearer product experience",
        images: ["/projects/sea3.png"],
      },
    ],

    outcome:
      "A more structured discovery and booking experience with clearer information hierarchy and interaction flow.",

    learnings: [
      "Designing a booking experience requires clarity at every step of the journey.",
      "Early user feedback can reveal problems that aren't obvious from the interface alone.",
      "Good visual design works best when the underlying flow is already clear.",
    ],

    figmaEmbed:
      "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D1-2%26t%3DKJw03P2gxOMZ2Ext-1",

    image: "/projects/sea3.png",
  },

  {
    slug: "juzzpay",

    title: "JuzzPay",

    tagline:
      "A fintech dashboard designed around clearer financial information.",

    type: "concept",

    year: "2025",

    duration: "1 week",

    role: "UI Designer",

    platform: "Web",

    tools: ["Figma"],

    overview:
      "JuzzPay is a fintech dashboard concept exploring how financial information can be organized into a clear, focused interface.",

    responsibilities: [
      "Dashboard UI",
      "Information hierarchy",
      "Data visualization",
      "Visual design",
      "Component exploration",
    ],

    sections: [
      {
        id: "challenge",
        label: "02 / Design Challenge",
        title: "Making financial information easier to scan",
        description:
          "The design exploration focused on creating a dashboard hierarchy that makes important financial information easier to understand at a glance.",
      },

      {
        id: "visual-system",
        label: "03 / Visual System",
        title: "Building a consistent interface",
        description:
          "Typography, spacing, cards and data visualization patterns were explored as part of a cohesive dashboard language.",
      },

      {
        id: "final-design",
        label: "04 / Final UI",
        title: "The dashboard experience",
        images: ["/projects/juzzpay.png"],
      },
    ],

    outcome:
      "A structured fintech dashboard concept with clearer information hierarchy and a consistent visual language.",

    learnings: [
      "Dashboard design is largely about prioritization rather than simply displaying more information.",
      "Strong visual hierarchy helps users understand data before interacting with it.",
    ],

    figmaEmbed:
      "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D4-6213%26t%3DKJw03P2gxOMZ2Ext-1",

    image: "/projects/juzzpay.png",
  },
];