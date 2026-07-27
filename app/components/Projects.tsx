"use client";

import { useState } from "react";
import { projects } from "@/app/data/projects";
import { caseStudies } from "@/app/data/case-studies";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / OngoingWork.tsx / SignatureCursor.tsx.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Preview panel follows the cursor with a spring — same "precision tool"
  // logic as SignatureCursor, but local to this section and only active
  // while a row is hovered.
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(previewX, springConfig);
  const smoothY = useSpring(previewY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    previewX.set(e.clientX);
    previewY.set(e.clientY);
  };

  return (
    <section
      id="work"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between gap-8"
        >
          <div>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em] font-medium mb-3 md:mb-4 block"
              style={{ color: brass }}
            >
              Selected Work
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] max-w-xl">
              A short list of things worth your time.
            </h2>
          </div>
          <span
            className="hidden md:block font-mono text-[10px] tracking-widest"
            style={{ color: graphite }}
          >
            {String(projects.length).padStart(2, "0")} PROJECTS
          </span>
        </motion.div>
      </div>

      {/* Editorial list */}
      <div
        className="max-w-6xl mx-auto px-6 md:px-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <div style={{ borderTop: `1px solid ${hairline}` }}>
          {projects.map((project, index) => {
            const hasCaseStudy = caseStudies.some(
              (cs) => cs.slug === project.slug,
            );
            const isDimmed = hovered !== null && hovered !== index;
            const isActive = hovered === index;

            const rowContent = (
              <motion.div
                onMouseEnter={() => setHovered(index)}
                animate={{ opacity: isDimmed ? 0.35 : 1 }}
                transition={{ duration: 0.4 }}
                className="group flex items-center justify-between gap-6 py-7 md:py-10 cursor-pointer"
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                <div className="flex items-baseline gap-5 md:gap-10 min-w-0">
                  <span
                    className="font-mono text-[11px] tracking-widest shrink-0"
                    style={{ color: isActive ? brass : graphite }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-serif tracking-tight leading-none truncate transition-all duration-300"
                    style={{
                      fontSize: "clamp(1.75rem, 5vw, 3.75rem)",
                      color: isActive ? brass : paper,
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 md:gap-8 shrink-0">
                  <span
                    className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: graphite }}
                  >
                    {project.tag}
                  </span>
                  {hasCaseStudy && (
                    <ArrowUpRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: isActive ? brass : graphite }}
                    />
                  )}
                </div>
              </motion.div>
            );

            return hasCaseStudy ? (
              <Link
                key={project.slug}
                href={`/case-study/${project.slug.toLowerCase()}`}
                className="block"
              >
                {rowContent}
              </Link>
            ) : (
              <div key={project.slug}>{rowContent}</div>
            );
          })}
        </div>
      </div>

      {/* Floating preview — desktop only. Follows the cursor, shows the
          project image + a short line pulled in from the description. */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 z-40 pointer-events-none"
        style={{ x: smoothX, y: smoothY }}
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-[320px] overflow-hidden"
              style={{
                transform: "translate(32px, -140px)",
                backgroundColor: ink,
                border: `1px solid ${hairline}`,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={projects[hovered].image}
                alt=""
                className="w-full aspect-[4/3] object-cover"
              />
              <p
                className="px-4 py-3 text-xs font-light leading-relaxed line-clamp-2"
                style={{ color: graphite }}
              >
                {projects[hovered].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}