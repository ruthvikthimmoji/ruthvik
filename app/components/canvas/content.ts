/* =========================================================
   Everything you'd want to edit on the canvas lives here.
========================================================= */

export const PROFILE = {
  name: "Ruthvik",
  fullName: "Ruthvik P Thimmoji",
  role: "Product designer",
  email: "thimmojiruthvik@gmail.com",
  resume: "/Ruthvikresume.pdf",
  resumeFileName: "Ruthvik-Thimmoji-Resume.pdf",
  photo: "/about.png", // your real photo in /public
  availability: "Available for full-time product roles · Bengaluru",
};

/* Paste your profile URLs. Empty ones are hidden everywhere. */
export const SOCIALS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ruthvik-p-thimmoji-200b1a216/" },
  { label: "Behance", href: "https://www.behance.net/ruthvikthimmoji" },
  { label: "Medium", href: "https://medium.com/@thimmojiruthvik" },
  { label: "Instagram", href: "https://www.instagram.com/ruthvikdesigns_/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCV5blT2_sXoZGYyErwqvBoA" },
  { label: "Dribbble", href: "" },
  { label: "GitHub", href: "" },
];
export const activeSocials = () => SOCIALS.filter((s) => s.href);

/* Short card lines for the Work frame (falls back to the project description) */
export const CARD_LINES: Record<string, string> = {
  "parity-b2b": "Turned currency hedging into three plain-language choices for agencies billing abroad.",
  "studycrux-cms": "Restructured an editorial CMS so publishing takes fewer steps and fewer guesses.",
  sportsea: "One booking system with a clear view for players, venue owners and admins.",
  buildbook: "Every rupee and every workday of a house build in one place — offline on site, synced to Google Sheets.",
};

/* A comment pin on the Work frame (set to null to hide) */
export const WORK_COMMENT: { slug: string; text: string } | null = {
  slug: "parity-b2b",
  text: "Ask me about the hedging presets — they changed after testing.",
};

/* =========================================================
   MY STORY — journey map.
   DRAFT written from your portfolio: edit freely.
   mood: 0 (low) … 100 (high) — draws the line through the chapters.
========================================================= */
export type Chapter = {
  when: string;
  title: string;
  happened: string;
  learned: string;
  mood: number;
  color: "y" | "p" | "g" | "b" | "v";
};

export const STORY_INTRO = "From writing code to shaping what gets built.";

export const STORY: Chapter[] = [
  {
    when: "2018",
    title: "The curious engineer",
    happened: "Started computer science at East West Institute of Technology, Bengaluru, and learned how software is built — one system at a time.",
    learned: "Everything is connected. Think in systems.",
    mood: 45,
    color: "b",
  },
  {
    when: "College years",
    title: "Building front-ends",
    happened: "Wrote HTML, CSS and React, shipping interfaces other people had designed.",
    learned: "I cared more about why a screen existed than how to code it.",
    mood: 62,
    color: "g",
  },
  {
    when: "2023",
    title: "Graphic design on the side",
    happened: "Took on graphic design projects for clients alongside my work — learning type, layout and hierarchy by doing.",
    learned: "Good design is mostly hierarchy.",
    mood: 55,
    color: "p",
  },
  {
    when: "2023 — 2026",
    title: "Freelance: real clients, real problems",
    happened: "Designed booking flows, fintech dashboards and admin tools for startups — SportSea, Parity and more.",
    learned: "Clarity beats cleverness. Test before you polish.",
    mood: 78,
    color: "y",
  },
  {
    when: "2026 — now",
    title: "Designing inside a team at Studycrux",
    happened: "Designing CMS workflows and dashboards, building shared patterns and handing off to engineers every week.",
    learned: "Shipping with a team beats a perfect file.",
    mood: 86,
    color: "v",
  },
  {
    when: "Next",
    title: "What’s next",
    happened: "Looking for a full-time product role — while learning 3D and motion, and building digital products on the side.",
    learned: "Still curious. Always.",
    mood: 95,
    color: "g",
  },
];

/* =========================================================
   START A PROJECT — brief form options (edit the ranges).
========================================================= */
export const PROJECT_TYPES = ["Website", "Mobile app", "Dashboard / SaaS", "Design system", "UX audit", "Something else"];
export const BUDGETS = ["Under ₹50k", "₹50k – ₹1.5L", "₹1.5L – ₹4L", "₹4L+", "Not sure yet"];
export const TIMELINES = ["ASAP", "1 – 3 months", "3+ months", "Flexible"];

/* Who's leaving a note / downloading the résumé */
export const GUEST_ROLES = ["Recruiter", "Hiring manager", "Founder", "Designer", "Just visiting"] as const;

export const STEPS = [
  { k: "01", title: "Understand", text: "Audit, interviews, where people get stuck." },
  { k: "02", title: "Structure", text: "Flows and IA before any pixels." },
  { k: "03", title: "Design", text: "Systems first, then hi-fi screens." },
  { k: "04", title: "Iterate", text: "Prototype, test, hand off specs." },
];

/* Sticky note type (kept for the guestbook colours) */
export type NoteColor = "y" | "p" | "g" | "b" | "v";

/* =========================================================
   Board layout: [x, y, width, height]
========================================================= */
export const AREAS = {
  Hero: [0, 0, 820, 580],
  Work: [980, 0, 1180, 640],
  Contact: [2320, 0, 640, 560],
  Story: [0, 760, 2160, 600],
  Process: [0, 1500, 1180, 360],
  Guestbook: [1300, 1500, 1180, 620],
  Lab: [0, 2260, 1760, 700],
  Writing: [2320, 660, 640, 660],
  All: [-40, -60, 3040, 3040],
} as const;

export type Area = keyof typeof AREAS;

export const NAV: { area: Area; label: string }[] = [
  { area: "Hero", label: "01 — Hello" },
  { area: "Story", label: "02 — My story" },
  { area: "Work", label: "03 — Selected work" },
  { area: "Process", label: "04 — How I work" },
  { area: "Contact", label: "05 — Say hello" },
  { area: "Writing", label: "06 — Writing" },
  { area: "Guestbook", label: "07 — Guestbook" },
  { area: "Lab", label: "08 — The lab" },
];
