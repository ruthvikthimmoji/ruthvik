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

/**
 * Only put a number here if you can defend it in an interview.
 * - measured: you actually observed it (testing, analytics)
 * - target:   what the design aims for / would be tracked after launch
 */
export type EpisodeResult = {
  value: string; // e.g. "5/5", "<24h", "40%" — the number part counts up
  label: string;
  status: "measured" | "target";
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

  image: string; // the "after" / final UI
  beforeImage?: string; // optional "before" screen — if missing, the after image de-blurs instead

  /* Story fields used by the homepage episodes */
  problem?: string; // the mess, one sentence
  resolution?: string; // what changed, one sentence
  result?: EpisodeResult;

  /* Optional walkthrough — shows a "Watch walkthrough" button on the canvas card
     and the case study. kind:
       "video" → YouTube / Loom link, or an .mp4 in /public
       "figma" → a Figma prototype link (Share → Copy prototype link)
       "live"  → a live site / app URL (opens in a new tab)          */
  walkthrough?: { kind: "video" | "figma" | "live"; url: string; duration?: string; note?: string };

  featured: boolean; // featured = shown as a homepage episode (keep it to 3)
  caseStudy: boolean; // keep in sync with case-studies.ts
};

/**
 * Order = episode order on the homepage. Strongest story first.
 */
export const projects: ProjectCard[] = [
  {
    slug: "parity-b2b",
    title: "Parity B2B",
    description:
      "A cross-border B2B invoicing platform. Designed how finance teams create invoices, handle currency conversion and resolve compliance holds in a single workflow.",
    // Freelance-era work (2025) → "client". If this was self-initiated, change to "personal".
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
    // beforeImage: "/projects/parity-before.png",
    problem:
      "Agencies billing abroad were losing 4–7% of every invoice to currency swings they couldn’t see.",
    resolution:
      "Now founders pick an outcome in plain language — and know exactly what will land.",
    result: {
      value: "<24h",
      label: "target time to resolve a compliance hold (was ~96h)",
      status: "target",
    },
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
    problem:
      "Editors were fighting their own CMS — scattered navigation, inconsistent screens, too many steps to publish.",
    resolution:
      "One clear structure and reusable patterns the whole product team now builds from.",
    // result: { value: "3", label: "fewer steps to publish an article", status: "measured" },
    featured: true,
    caseStudy: false,
  },

  {
    slug: "buildbook",
    title: "Buildbook",
    description:
      "A house-build tracker for agreements, payments, materials, site diary, milestones, vendors and budget — offline-first on site, synced to your own Google Sheet.",
    type: "personal",
    category: "PropTech / Web + Mobile PWA",
    role: "Product designer",
    year: "2026", // CHECK
    platform: "Web + Mobile PWA",
    contribution: ["Product strategy", "Web + mobile UI", "Design system", "Offline-first flows"],
    image: "/projects/buildbook.png", // Figma: Buildbook → Cover (node 27:2)
    featured: true,
    caseStudy: false,
  },

  {
    slug: "hisaab",
    title: "Hisaab",
    description:
      "A UPI-based group expense app. Track who paid what, then settle in one tap through your own UPI app — Hisaab never holds the money.",
    type: "personal",
    category: "FinTech / Mobile + Web",
    role: "Product designer",
    year: "2026",
    platform: "Android, guest web, desktop",
    contribution: ["Wireframes → hi-fi (86 screens)", "Light + dark design system", "Brand & logo", "Developer handoff & accessibility"],
    image: "/projects/hisaab.png", // Figma: Hisaab — Wireframes → page "00 · Cover"
    featured: false,
    caseStudy: false,
  },

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
    problem:
      "Players, venue owners and admins all used the same booking system — and needed completely different answers from it.",
    resolution:
      "One system with a clear view for each role, from finding a court to settling the payment.",
    featured: false,
    caseStudy: true,
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
    contribution: ["Information hierarchy", "Dashboard UI", "Data visualization"],
    image: "/projects/juzzpay.png",
    walkthrough: {
      kind: "figma",
      url: "https://www.figma.com/proto/wLEfNQmsMZ7k9LerHRdP42/Juzzpay?node-id=8-435&starting-point-node-id=8%3A435&scaling=scale-down-width",
      note: "Click through the dashboard, wallet and send-money flow",
    },
    featured: false,
    caseStudy: true,
  },

  {
    slug: "lattice-design-system",
    title: "Lattice",
    // NOTE: these numbers don't match the Lattice case study page (40+ components,
    // 4 weeks, 2025). Make them match before featuring this anywhere.
    description:
      "A themeable design system built solo in Figma — 25 components and 150 variables that work in Light, Dark, Default and Compact through variable modes, cutting variants by 75% and passing WCAG AA in both themes.",
    type: "personal",
    category: "Design System",
    role: "Solo Designer",
    year: "2026",
    platform: "Figma",
    contribution: ["Token architecture", "Component library", "Accessibility (WCAG AA)", "Documentation"],
    image: "/projects/lattice.png",
    featured: false, // candidate for the Lab later
    caseStudy: true,
  },

  {
    slug: "yaana",
    title: "Yaana",
    description:
      "One plan for Namma Metro and BMTC — live status, honest delays, and a trip that still works when the signal drops.",
    type: "personal",
    category: "Mobility / Mobile",
    role: "UX/UI Designer (solo)",
    year: "2026", // CHECK
    platform: "iOS & Android",
    contribution: ["Research plan", "IA & flows", "Mobile UI", "Edge cases & accessibility"],
    image: "/projects/yaana.png", // Figma: Public Transport App → Cover (node 16:2)
    featured: false,
    caseStudy: false,
  },

  {
    slug: "dailyfit",
    title: "DailyFit",
    description:
      "A personal discipline PWA — win the Big 3 each day across fitness, work and an operating plan; everything else is a bonus.",
    type: "personal",
    category: "Health / PWA",
    role: "Product · Design · Build",
    year: "2026",
    platform: "PWA · iOS + Android",
    contribution: ["Product strategy", "Design system", "Mobile screens", "Architecture & launch plan"],
    image: "/projects/dailyfit.png", // Figma: Daily fit → Cover (node 13:2)
    featured: false,
    caseStudy: false,
  },

];

/* ---------- helpers ---------- */

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

/** Homepage episodes: featured projects that have a story written. */
export const getEpisodes = () =>
  projects.filter((p) => p.featured && p.problem && p.resolution);

export const getProjectsByType = (type: WorkType) =>
  projects.filter((p) => p.type === type);

export const getWalkthrough = (slug: string) => projects.find((p) => p.slug === slug)?.walkthrough;
