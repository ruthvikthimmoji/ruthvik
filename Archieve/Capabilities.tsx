"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Layers, Layout, Sparkles } from "lucide-react";
import React, { useRef } from "react";

const capabilities = [
  {
    number: "01",
    title: "Product UI",
    icon: <Layout size={18} className="text-accent" />,
    description: "Clear, consistent interfaces for web and mobile products.",
    items: ["Web applications", "Mobile interfaces", "SaaS dashboards", "Responsive layouts"],
  },
  {
    number: "02",
    title: "UX Design",
    icon: <Compass size={18} className="text-accent" />,
    description: "Structuring flows so users always know what to do next.",
    items: ["User journeys", "Information architecture", "Wireframing", "UX audits"],
  },
  {
    number: "03",
    title: "Design Systems",
    icon: <Layers size={18} className="text-accent" />,
    description: "Reusable components that keep design and code in sync.",
    items: ["Component libraries", "Figma variants", "Design tokens", "Documentation"],
  },
  {
    number: "04",
    title: "Prototyping",
    icon: <Cpu size={18} className="text-accent" />,
    description: "Interactive prototypes to test ideas before they're built.",
    items: ["Hi-fi interactions", "Micro-animations", "Usability testing", "Developer handoff"],
  },
];

/**
 * EDIT: list only tools you'd be comfortable being asked about in an interview.
 * Add anything else you use (e.g. Framer, Maze, Notion, Jira, Adobe Illustrator).
 */
const designTools = ["Figma", "FigJam", "Auto Layout & Variants", "Design Tokens"];
const technicalSkills = ["HTML & CSS", "React / Next.js", "APIs (Postman)", "Developer handoff"];

function CapabilityCard({
  capability,
  index,
}: {
  capability: (typeof capabilities)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden border-b border-hairline p-6 transition-colors duration-300 hover:bg-sunken/40 sm:p-8 md:border-r md:last:border-r-0 lg:min-h-[300px] lg:border-b-0"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), color-mix(in srgb, var(--color-accent, #1A4FD6) 12%, transparent), transparent 75%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
            {capability.number}
          </span>
          <div className="rounded-lg border border-hairline bg-paper/80 p-2 shadow-xs backdrop-blur-sm">
            {capability.icon}
          </div>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-accent">
          {capability.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
          {capability.description}
        </p>
      </div>

      <div className="relative z-10 mt-8 border-t border-hairline/80 pt-5">
        <ul className="space-y-2">
          {capability.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-xs text-muted transition-colors group-hover:text-ink sm:text-sm"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70 transition-transform group-hover:scale-125 group-hover:bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <span className="frame-label">{label}</span>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-hairline bg-sunken/40 px-3.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-hairline-strong hover:text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Header */}
        <div className="grid gap-6 border-b border-hairline py-10 md:grid-cols-[1fr_2fr] md:py-14">
          <div>
            <span className="frame-label">05 / Capabilities</span>
            <div className="mt-3 flex items-center gap-2">
              <Sparkles size={13} className="text-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Skills &amp; tools
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
              What I bring to a product team.
            </h2>
            <p className="max-w-xs text-xs leading-relaxed text-muted sm:text-sm">
              From early research and flows to hi-fi UI, design systems and
              handoff — plus a CS background that makes working with engineers
              easier.
            </p>
          </div>
        </div>

        {/* 4 capability cards */}
        <div className="grid border-b border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </div>

        {/* Tools & technical skills */}
        <div className="grid gap-8 py-10 md:grid-cols-2 md:gap-10 md:divide-x md:divide-hairline">
          <SkillGroup label="Design tools" items={designTools} />
          <div className="md:pl-10">
            <SkillGroup label="Technical background" items={technicalSkills} />
          </div>
        </div>
      </div>
    </section>
  );
}