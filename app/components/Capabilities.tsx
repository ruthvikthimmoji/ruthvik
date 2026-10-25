"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Cpu,
  Layers,
  Layout,
  Sparkles,
} from "lucide-react";
import React, { useRef } from "react";

const capabilities = [
  {
    number: "01",
    title: "Product UI",
    icon: <Layout size={18} className="text-accent" />,
    description: "High-craft interface design built for scale and clarity.",
    items: ["Web applications", "Mobile interfaces", "SaaS dashboards", "Responsive layouts"],
  },
  {
    number: "02",
    title: "UX Design",
    icon: <Compass size={18} className="text-accent" />,
    description: "Structuring user intent and removing cognitive friction.",
    items: ["User journeys", "Information architecture", "Wireframing", "UX friction audits"],
  },
  {
    number: "03",
    title: "Design Systems",
    icon: <Layers size={18} className="text-accent" />,
    description: "Scalable component libraries that keep teams aligned.",
    items: ["Component architecture", "Figma variants", "Design tokens", "Documentation"],
  },
  {
    number: "04",
    title: "Prototyping",
    icon: <Cpu size={18} className="text-accent" />,
    description: "Tangible interactions that validate product ideas fast.",
    items: ["Hi-fi interactions", "Micro-animations", "User testing flows", "Developer handoff"],
  },
];

const EMAIL = "thimmojiruthvik@gmail.com";

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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden border-b border-hairline p-6 transition-colors duration-300 hover:bg-sunken/40 sm:p-8 md:border-r md:last:border-r-0 lg:min-h-[360px]"
    >
      {/* Smooth Cursor Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), color-mix(in srgb, var(--color-accent, #1A4FD6) 12%, transparent), transparent 75%)",
        }}
      />

      <div className="relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
            {capability.number}
          </span>
          <div className="rounded-lg border border-hairline bg-paper/80 p-2 shadow-xs backdrop-blur-sm">
            {capability.icon}
          </div>
        </div>

        {/* Title & Short Rationale */}
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-accent">
          {capability.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
          {capability.description}
        </p>
      </div>

      {/* Deliverable Items */}
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

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Header */}
        <div className="grid border-b border-hairline py-10 md:grid-cols-[1fr_2fr] md:py-14">
          <div>
            <span className="frame-label">05 / Capabilities</span>
            <div className="mt-3 flex items-center gap-2">
              <Sparkles size={13} className="text-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Core Competencies
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
              End-to-end design craft across the product lifecycle.
            </h2>
            <p className="max-w-xs text-xs leading-relaxed text-muted sm:text-sm">
              From early zero-to-one problem discovery to mature design systems that ship.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid border-b border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </div>

        {/* Stack & Domain Specs */}
        <div className="grid divide-y divide-hairline border-b border-hairline md:grid-cols-2 md:divide-y-0 md:divide-x">
          {/* <div className="py-8 md:pr-10">
            <span className="frame-label">Target Industries</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {["SaaS & Cloud Platforms", "Fintech & Dashboards", "Booking & Venues", "D2C & Commerce"].map((ind) => (
                <span
                  key={ind}
                  className="rounded-full border border-hairline bg-sunken/40 px-3.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-hairline-strong hover:text-ink"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div> */}

          <div className="py-8 md:pl-10">
            <span className="frame-label">Tools &amp; Technical Execution</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Figma", "Design Tokens", "Component Architecture", "Design Systems", "Code Empathy (Next.js/React)"].map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-hairline bg-sunken/40 px-3.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-hairline-strong hover:text-ink"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 15-Minute UX Teardown Offer Card */}
        {/* 15-Minute UX Teardown Offer Card with 3D Avatar */}
        <div className="my-10 rounded-2xl border border-hairline bg-sunken/50 p-8 shadow-sm transition-all duration-300 hover:border-hairline-strong md:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* 3D Avatar Circle with Online Dot */}
              <div className="relative h-20 w-20 shrink-0">
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-hairline-strong bg-paper shadow-md">
                  <img
                    src="/avatar-3d.jpg"
                    alt="Ruthvik 3D Avatar"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-paper">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-3 py-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    Free 15-Min UX Teardown
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
                  Not sure what&apos;s costing you users? I&apos;ll take a look.
                </h3>

                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  Send over your staging link or live product. I&apos;ll record a concise teardown highlighting your biggest conversion and usability friction points.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${EMAIL}?subject=Free%2015-min%20UX%20review`}
              data-cursor="Audit"
              className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper shadow-md transition-all duration-300 hover:opacity-90 md:self-auto"
            >
              <span>Request a Review</span>
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}