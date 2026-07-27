"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { activeProjects } from "../data/active-projects";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx — kept in sync across sections.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.14)";

export default function OngoingWork() {
  return (
    <section
      className="relative py-24 md:py-40 px-6 overflow-hidden"
      style={{ backgroundColor: ink }}
    >
      {/* Ambient glow — same brass token, kept very restrained since Hero already
          carries the grid + coordinate signature; this is texture, not a focal point */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] rounded-full pointer-events-none"
        style={{ backgroundColor: brass, opacity: 0.04 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center">
                <Activity size={16} style={{ color: brass }} className="z-10" />
                <div
                  className="absolute w-4 h-4 blur-md opacity-40 animate-pulse"
                  style={{ backgroundColor: brass }}
                />
              </div>
              <span
                className="font-mono text-[10px] uppercase font-medium tracking-[0.35em]"
                style={{ color: graphite }}
              >
                Live Feed
              </span>
            </div>

            <h2
              className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] md:leading-[0.9] font-serif italic"
              style={{ color: paper }}
            >
              Currently on <br className="hidden sm:block" />
              the{" "}
              <span className="not-italic" style={{ color: brass }}>
                drawing board.
              </span>
            </h2>
          </div>

          <p
            className="text-sm md:text-base font-light max-w-xs italic leading-relaxed pl-6"
            style={{ color: graphite, borderLeft: `1px solid ${hairline}` }}
          >
            A real-time look at the projects.
          </p>
        </div>

        {/* PROJECTS LIST */}
        <div className="space-y-4">
          {activeProjects.map((project, index) => (
            <Link href={`/live/${project.id}`} key={project.id || project.name} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-700"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: `1px solid ${hairline}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.045)";
                  e.currentTarget.style.borderColor = "rgba(199,162,92,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = hairline;
                }}
              >
                {/* Project Info */}
                <div className="flex items-center gap-6">
                  <span
                    className="hidden sm:block font-mono text-[10px] font-medium tracking-widest uppercase"
                    style={{ color: graphite, opacity: 0.6 }}
                  >
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <div>
                    <h3
                      className="text-2xl md:text-4xl font-medium tracking-tight mb-1 transition-colors"
                      style={{ color: paper }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium"
                      style={{ color: graphite }}
                    >
                      {project.type}
                    </p>
                  </div>
                </div>

                {/* Status & Progress */}
                <div className="flex flex-col md:items-end gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-[9px] md:text-[10px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-full"
                      style={{
                        color: brass,
                        backgroundColor: "rgba(199,162,92,0.08)",
                        border: `1px solid ${hairline}`,
                      }}
                    >
                      {project.status}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs font-medium" style={{ color: graphite }}>
                      {project.progress}%
                    </span>
                  </div>

                  <div
                    className="w-full md:w-56 h-[2px] rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                      className="h-full"
                      style={{ backgroundColor: brass }}
                    />
                  </div>
                </div>

                <div
                  className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
                >
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" style={{ color: graphite }} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}