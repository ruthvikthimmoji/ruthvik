/**
 * Single source of truth for career data.
 * Used by: components/Experience.tsx (homepage) and about/AboutClient.tsx.
 * Source: LinkedIn profile export. Newest first.
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
      "Working across CMS experiences, dashboards, SaaS workflows and product interfaces — translating complex requirements into clearer user flows, scalable UI and reusable design patterns.",
    tags: ["CMS", "SaaS products", "UX flows", "Design systems"],
  },
  {
    period: "Oct 2023 — Jul 2026",
    duration: "2 yrs 10 mos",
    title: "UI/UX Designer",
    company: "Freelance",
    location: "Bengaluru, India",
    description:
      "Helped SaaS startups improve product usability, clarity and user experience — turning complex products into simple, usable ones.",
    tags: [
      "SaaS dashboards",
      "Onboarding flows",
      "UX audits",
      "Design systems",
      "React-ready prototypes",
    ],
  },
  {
    period: "Jun 2023 — Oct 2023",
    duration: "5 mos",
    title: "Graphic Designer",
    company: "OMS: Open Mind School",
    location: "Ranchi, India",
    tags: ["Graphic design"],
  },
  {
    period: "Apr 2023 — Jun 2023",
    duration: "3 mos",
    title: "Graphic Designer",
    company: "Penger Advertising",
    location: "Chennai, India",
    tags: ["Graphic design"],
  },
];

export const education = {
  school: "East West Institute of Technology",
  degree: "B.E. in Computer Science",
  period: "2018 — 2022",
  location: "Bengaluru, India",
};

export const certifications = [
  "Foundations of User Experience (UX) Design",
  "Build Wireframes and Low-Fidelity Prototypes",
  "Introduction to Design",
  "Learn and Build a Career in UI-UX Design",
  "Postman API Fundamentals Student Expert",
];