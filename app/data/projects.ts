/**
 * WorkType is the single source of truth for how a piece of work is labelled.
 * - client:       done for an external client
 * - professional: done as part of a full-time / employed role
 * - personal:     self-initiated concept or practice project
 */
export type WorkType = "client" | "professional" | "personal";

export const workTypeLabels: Record<WorkType, string> = {
  client: "Client work",
  professional: "Professional",
  personal: "Personal concept",
};

export type ProjectCard = {
  slug: string;
  title: string;
  description: string;

  type: WorkType;
  category: string; // domain only, e.g. "FinTech / Dashboard"
  role: string;
  year: string;
  platform: string;

  contribution: string[];

  image: string;

  featured: boolean;
  caseStudy: boolean; // keep in sync with case-studies.ts (see helper below)
};

export const projects: ProjectCard[] = [
  {
    slug: "sportsea",
    title: "SportSea",
    description:
      "A sports experience booking platform designed to make discovering and booking sports facilities simpler.",
    type: "client",
    category: "Sports / Booking",
    role: "UI/UX Designer",
    year: "2025",
    platform: "Mobile + Web",
    contribution: [
      "User research",
      "User flows",
      "UI design",
      "Prototyping",
    ],
    image: "/projects/sportsea1.png",
    featured: true,
    caseStudy: true,
  },

  {
    slug: "studycrux-cms",
    title: "Studycrux CMS",
    description:
      "Designing clearer workflows and scalable interfaces for a complex SaaS content management experience.",
    type: "professional",
    category: "SaaS / CMS",
    role: "UI/UX Designer",
    year: "2026 — Present",
    platform: "Web",
    contribution: [
      "UX flows",
      "UI redesign",
      "Dashboards",
      "Design systems",
    ],
    image: "/projects/studycrux-cms.png",
    featured: true, // professional work is your strongest recruiter signal
    caseStudy: false,
  },

  {
    slug: "juzzpay",
    title: "JuzzPay",
    description:
      "A fintech dashboard concept exploring how transactions and financial insights can be organised into a clear, scannable interface.",
    type: "personal",
    category: "FinTech / Dashboard",
    role: "UI Designer",
    year: "2025",
    platform: "Web",
    contribution: [
      "Information hierarchy",
      "Dashboard UI",
      "Data visualization",
    ],
    image: "/projects/juzzpay.png",
    featured: true,
    caseStudy: true,
  },

  {
    slug: "health-insurance-app",
    title: "Health Insurance App",
    description:
      "A mobile-first insurance experience simplifying hospital discovery, claims tracking and policy renewals.",
    type: "personal",
    category: "InsurTech / Mobile",
    role: "UI/UX Designer",
    year: "2025",
    platform: "Mobile",
    contribution: [
      "User flows",
      "Mobile UI",
      "Claims experience",
      "Information architecture",
    ],
    image: "/projects/insurance.png",
    featured: false, // flip to true once the case study is built (Phase 3)
    caseStudy: false,
  },

  {
    slug: "tripmate",
    title: "Tripmate",
    description:
      "A mobile-first travel experience for discovering destinations, exploring curated tours and booking experiences.",
    type: "personal",
    category: "Travel / Mobile",
    role: "UI/UX Designer",
    year: "2025",
    platform: "Mobile",
    contribution: [
      "Mobile UI",
      "User flows",
      "Booking experience",
      "Prototyping",
    ],
    image: "/projects/tripmate.png",
    featured: false,
    caseStudy: false,
  },
];

/* ---------- helpers ---------- */

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured);

export const getProjectsByType = (type: WorkType) =>
  projects.filter((p) => p.type === type);