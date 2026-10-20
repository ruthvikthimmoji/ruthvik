"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { hasCaseStudy } from "@/app/data/case-studies";
import KineticText from "./KineticText";
import { projects, type ProjectCard } from "@/app/data/projects";
import { useIsMac } from "@/app/lib/use-is-mac";

/* =========================================================
   GHOST MULTIPLAYER CURSORS (decorative)
========================================================= */

function GhostCursor({
  name,
  color,
  left,
  top,
  duration,
  delay,
}: {
  name: string;
  color: string;
  left: string[];
  top: string[];
  duration: number;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const loop = { duration, repeat: Infinity, ease: "easeInOut" as const, delay };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-30 hidden md:block"
      initial={{ opacity: 0, left: left[0], top: top[0] }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, left, top }}
      transition={{ opacity: { delay, duration: 0.4 }, left: loop, top: loop }}
    >
      <svg width="18" height="20" viewBox="0 0 18 20" fill={color}>
        <path d="M1 1l7.5 17 2.2-7.3L18 8.5 1 1z" />
      </svg>
      <span
        className="-mt-1 ml-3 block w-max rounded-full rounded-tl-none px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white"
        style={{ backgroundColor: color }}
      >
        {name}
      </span>
    </motion.div>
  );
}

/* =========================================================
   DRAGGABLE PROJECT FRAMES
========================================================= */

const FRAME_LAYOUT = [
  { left: 0, top: 70, width: 270, rotate: -5 },
  { left: 190, top: 0, width: 300, rotate: 3 },
  { left: 380, top: 120, width: 250, rotate: -2 },
];

function DragFrame({
  project,
  layout,
  index,
  constraintsRef,
  front,
  onFront,
}: {
  project: ProjectCard;
  layout: (typeof FRAME_LAYOUT)[number];
  index: number;
  constraintsRef: React.RefObject<HTMLElement | null>;
  front: string | null;
  onFront: (slug: string) => void;
}) {
  const moved = useRef(false);
  const linked = hasCaseStudy(project.slug);

  const card = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline-strong bg-sunken shadow-2xl">
      <Image
        src={project.image}
        alt=""
        fill
        sizes="300px"
        draggable={false}
        className="object-cover"
      />
    </div>
  );

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onPointerDown={() => onFront(project.slug)}
      onDragStart={() => {
        moved.current = true;
        onFront(project.slug);
      }}
      onDragEnd={() => {
        setTimeout(() => {
          moved.current = false;
        }, 0);
      }}
      initial={{ opacity: 0, scale: 0.9, rotate: layout.rotate * 2 }}
      animate={{ opacity: 1, scale: 1, rotate: layout.rotate }}
      transition={{
        delay: 0.7 + index * 0.12,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.04, rotate: 0 }}
      data-cursor="Drag me"
      className="pointer-events-auto absolute cursor-grab active:cursor-grabbing"
      style={{
        left: layout.left,
        top: layout.top,
        width: layout.width,
        zIndex: front === project.slug ? 40 : 10 + index,
      }}
    >
      <span className="frame-label mb-2 block">{project.title}</span>
      {linked ? (
        <Link
          href={`/case-study/${project.slug}`}
          draggable={false}
          aria-label={`${project.title} case study`}
          onClick={(e) => {
            if (moved.current) e.preventDefault();
          }}
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </motion.div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMac = useIsMac();
  const [front, setFront] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -70]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  const frames = projects.filter((p) => p.featured).slice(0, FRAME_LAYOUT.length);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-paper text-ink"
    >
      {/* Dot-grid canvas */}
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[130px]"
      />

      {/* Other "users" on the canvas */}
      <GhostCursor
        name="Recruiter"
        color="#6C8CFF"
        left={["58%", "72%", "66%", "58%"]}
        top={["26%", "44%", "56%", "26%"]}
        duration={16}
        delay={1.2}
      />
      <GhostCursor
        name="Founder"
        color="#2FA37A"
        left={["10%", "28%", "20%", "10%"]}
        top={["74%", "66%", "82%", "74%"]}
        duration={19}
        delay={1.8}
      />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 pt-[72px] md:px-10 md:pt-[80px] lg:px-12"
      >
        {/* Frame label row */}
        <div className="flex items-center justify-between border-b border-hairline py-4 md:py-5">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="frame-label">Frame 01 — Hero</span>
          </div>
          <span className="frame-label hidden sm:block">Bengaluru · India</span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-3 md:mb-9"
          >
            <span className="flex items-center gap-2 rounded-full border border-hairline bg-sunken/60 px-3 py-1.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                Available for new projects
              </span>
            </span>
            <span className="frame-label">SaaS · Web · Mobile · Systems</span>
          </motion.div>

          <h1
            aria-label="Designing products that feel obvious."
            className="max-w-[1180px] text-[3.25rem] leading-[0.92] tracking-[-0.05em] sm:text-7xl md:text-8xl xl:text-[8.5rem]"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <KineticText
                text="Designing products"
                base={520}
                peak={800}
                className="font-display"
              />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <KineticText
                text="that feel obvious."
                base={400}
                peak={800}
                className="font-serif italic text-accent"
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[560px] text-base leading-relaxed text-muted md:mt-10 md:text-lg"
          >
            I redesign the parts of SaaS products that quietly lose users —
            confusing onboarding, cluttered dashboards, hesitant checkouts —
            from first wireframe to dev-ready Figma.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-6"
          >
            <a
              href="#work"
              data-cursor="Scroll"
              className="group flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-85 md:text-base"
            >
              View selected work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-resume"))}
              className="group flex items-center gap-2 px-2 py-3 text-sm text-muted transition-colors hover:text-ink md:text-base"
            >
              View résumé
              <span
                aria-hidden="true"
                className="text-xs text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </button>
          </motion.div>
        </div>

        {/* Draggable frames (wide screens only) */}
        <div
          className="pointer-events-none absolute bottom-[18%] right-12 hidden h-[360px] w-[640px] xl:block"
          aria-label="Draggable project previews"
        >
          {frames.map((project, i) => (
            <DragFrame
              key={project.slug}
              project={project}
              layout={FRAME_LAYOUT[i]}
              index={i}
              constraintsRef={sectionRef}
              front={front}
              onFront={setFront}
            />
          ))}
        </div>

        {/* Current role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="grid border-t border-hairline md:grid-cols-2"
        >
          <div className="flex flex-col gap-2 border-b border-hairline py-5 md:border-b-0 md:border-r md:pr-8">
            <span className="frame-label">Currently</span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm md:text-base">
              <span className="font-medium">UX/UI Designer</span>
              <span className="text-muted">@</span>
              <span className="font-medium">Studycrux</span>
              <span className="font-mono text-[10px] text-muted">
                · May 2026 — Present
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-5 md:pl-8">
            <span className="frame-label">Focus</span>
            <span className="text-sm md:text-base">
              SaaS · Product UI · Design Systems · Mobile
            </span>
          </div>
        </motion.div>

        {/* Footer marker */}
        <div className="flex items-center justify-between py-5">
          <span className="frame-label">01 / 08</span>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden items-center gap-2 text-muted transition-colors hover:text-ink sm:flex"
          >
            <kbd className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px]">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
            <span className="frame-label">Jump anywhere</span>
          </button>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="frame-label">Scroll</span>
            <span aria-hidden="true" className="block h-8 w-px bg-hairline-strong" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
