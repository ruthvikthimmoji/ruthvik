/**
 * WorkType is the single source of truth for how a piece of work is labelled.
 * - client:       done for an external client (incl. freelance)
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

/**
 * Order = display order on the homepage.
 * Real work (client / professional) first, personal concepts after —
 * that's what recruiters weigh most.
 */
export const projects: ProjectCard[] = [
  {
    slug: "sportsea",
    title: "SportSea",
    description:
      "Designed the end-to-end experience for a sports facility booking platform — from discovering a venue to confirming a booking — across mobile and web.",
    type: "client",
    category: "Sports / Booking",
    role: "UI/UX Designer",
    year: "2025",
    platform: "Mobile + Web",
    contribution: ["User research", "User flows", "UI design", "Prototyping"],
    image: "/projects/sportsea1.png",
    featured: true,
    caseStudy: true,
  },

  {
    slug: "studycrux-cms",
    title: "Studycrux CMS",
    description:
      "Redesigning a complex content management system — simplifying editorial workflows, restructuring dashboards and building a shared design system for the product team.",
    type: "professional",
    category: "SaaS / CMS",
    role: "UI/UX Designer",
    year: "2026 — Present",
    platform: "Web",
    contribution: ["UX flows", "UI redesign", "Dashboards", "Design systems"],
    image: "/projects/studycrux-cms.png",
    featured: true,
    caseStudy: false,
  },

  {
    slug: "parity-b2b",
    title: "Parity B2B",
    description:
      "A cross-border B2B invoicing platform. Designed how finance teams create invoices, handle currency conversion and resolve compliance holds in a single workflow.",
    // Freelance-era work (2025) → "client", not "professional".
    // If this was a self-initiated concept, change to "personal".
    type: "client",
    category: "FinTech / B2B",
    role: "Product Designer",
    year: "2025",
    platform: "Web App",
    contribution: [
      "Invoicing flows",
      "FX conversion UI",
      "Payment status states",
      "Compliance flows",
      "Data-table system",
    ],
    image: "/projects/parity-b2b.png",
    featured: true,
    caseStudy: true, // live site links to /case-studies/parity-b2b
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
    slug: "lattice-design-system",
    title: "Lattice",
    description:
      "A personal design system built in Figma — tokens, components and usage guidelines for building consistent product interfaces across web and mobile.",
    type: "personal",
    category: "Design System",
    role: "UI/UX Designer",
    year: "2026",
    platform: "Web + Mobile",
    contribution: ["Design tokens", "Component library", "Documentation"],
    image: "/projects/lattice.png",
    featured: true,
    caseStudy: true, // live site links to /case-studies/lattice-design-system
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

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectsByType = (type: WorkType) =>
  projects.filter((p) => p.type === type);