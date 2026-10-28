/**
 * Single source of truth for career data.
 * Used by: components/Experience.tsx (homepage) and about/AboutClient.tsx.
 * Source: LinkedIn profile export. Newest first.
 *
 * Keep dates identical to LinkedIn — recruiters cross-check the two.
 *
 * If you did other work that isn't on LinkedIn (e.g. a frontend role, or
 * Designuru Studio), add it here ONCE and both pages update.
 */

export type Role = {
  period: string;
  duration?: string;
  title: string;
  company: string;
  location: string;
  current?: boolean;
  description?: string;
  tags: string[];
};

export const roles: Role[] = [
  {
    period: "May 2026 — Present",
    title: "UI/UX Designer",
    company: "Studycrux",
    location: "Bengaluru, India",
    current: true,
    description:
      "Designing the CMS, dashboards and core product workflows — turning complex requirements into clear user flows, scalable UI and a reusable design system the team builds from.",
    tags: ["CMS", "SaaS dashboards", "UX flows", "Design systems"],
  },
  {
    // Overlaps Studycrux by ~2 months — matches LinkedIn.
    // If freelance actually ended when you joined Studycrux, change to
    // "Oct 2023 — May 2026" / "2 yrs 8 mos" here AND on LinkedIn.
    period: "Oct 2023 — Jul 2026",
    duration: "2 yrs 10 mos",
    title: "UI/UX Designer",
    company: "Freelance",
    location: "Bengaluru, India",
    description:
      "Designed web and mobile products for startups and SaaS teams — dashboards, onboarding flows and booking experiences — from UX audits and user flows to hi-fi UI and developer handoff.",
    tags: [
      "SaaS dashboards",
      "Onboarding flows",
      "UX audits",
      "Design systems",
      "Dev handoff",
    ],
  },
  {
    period: "Jun 2023 — Oct 2023",
    duration: "5 mos",
    title: "Graphic Designer",
    company: "OMS: Open Mind School",
    location: "Ranchi, India",
    // EDIT: replace with what you actually made (social posts, brochures, etc.)
    description:
      "Designed visual and print material for the school's communication and outreach.",
    tags: ["Visual design", "Print & social"],
  },
  {
    period: "Apr 2023 — Jun 2023",
    duration: "3 mos",
    title: "Graphic Designer",
    company: "Penger Advertising",
    location: "Chennai, India",
    // EDIT: replace with what you actually made (ad creatives, branding, etc.)
    description:
      "Designed creatives for client advertising campaigns at an agency.",
    tags: ["Visual design", "Ad creatives"],
  },
];

export const education = {
  school: "East West Institute of Technology",
  degree: "B.E. in Computer Science",
  period: "2018 — 2022",
  location: "Bengaluru, India",
};

/**
 * Issuer first — "Google" is the part recruiters scan for.
 * Fix any issuer that's wrong.
 */
export const certifications = [
  "Google — Foundations of User Experience (UX) Design",
  "Google — Build Wireframes and Low-Fidelity Prototypes",
  "Introduction to Design",
  "Learn and Build a Career in UI-UX Design",
  "Postman — API Fundamentals Student Expert",
];