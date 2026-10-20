"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Code2,
  Compass,
  Cpu,
  GraduationCap,
  Layers,
  MapPin,
  Radio,
  Sparkles,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import KineticText from "../components/KineticText";
import Navbar from "../components/Navbar";
import { education, roles } from "../data/experience";

/* =========================================================
   3D TILT PORTRAIT WITH GLOSS SHEEN
========================================================= */

function TiltPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="relative flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-2xl border border-hairline bg-sunken p-2.5 shadow-2xl transition-all duration-300 hover:border-hairline-strong md:max-w-[380px]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-paper">
          <Image
            src="/about.png"
            alt="Portrait of Ruthvik P. Thimmoji"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover object-top grayscale filter transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            priority
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="absolute left-3 top-3 font-mono text-[9px] text-white/70 backdrop-blur-md">
            + 12.9716° N, 77.5946° E
          </span>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/80 backdrop-blur-md">
            Plate 01
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   ROTATING MONOGRAPH SEAL (SVG)
========================================================= */

function MonographSeal() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
        className="h-full w-full"
        viewBox="0 0 100 100"
      >
        <path
          id="sealPath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="font-mono text-[8.5px] uppercase tracking-[0.24em] fill-accent">
          <textPath href="#sealPath" startOffset="0%">
            · RUTHVIK THIMMOJI · DESIGN &amp; CODE ·
          </textPath>
        </text>
      </motion.svg>
      <span className="font-serif text-lg italic text-ink">R</span>
    </div>
  );
}

/* =========================================================
   DUAL MINDSET INTERACTIVE BLUEPRINT
========================================================= */

function DualMindset() {
  const [mode, setMode] = useState<"engineering" | "design">("design");

  return (
    <div className="my-10 rounded-2xl border border-hairline bg-sunken/40 p-6 md:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-hairline/80 pb-6 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Interactive Lens
          </span>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
            The Dual Perspective
          </h3>
        </div>

        <div className="inline-flex rounded-full border border-hairline bg-paper p-1">
          <button
            type="button"
            onClick={() => setMode("design")}
            className={`relative rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              mode === "design" ? "text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {mode === "design" && (
              <motion.span
                layoutId="mindsetTab"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Compass size={11} /> Interface Mindset
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMode("engineering")}
            className={`relative rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              mode === "engineering" ? "text-paper" : "text-muted hover:text-ink"
            }`}
          >
            {mode === "engineering" && (
              <motion.span
                layoutId="mindsetTab"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Code2 size={11} /> Technical Mindset
            </span>
          </button>
        </div>
      </div>

      <div className="pt-6">
        <AnimatePresence mode="wait">
          {mode === "design" ? (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-3"
            >
              {[
                { label: "Goal", value: "Cognitive Ease", desc: "Shortest route from user intent to task completion." },
                { label: "Medium", value: "Figma & Design Tokens", desc: "Scalable component libraries, auto-layout, atomic variants." },
                { label: "Priority", value: "Hierarchy & Rhythm", desc: "Clarity through typography, scannability and calm negative space." },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-hairline bg-paper/60 p-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent">{item.label}</span>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="engineering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-3"
            >
              {[
                { label: "Goal", value: "Build Feasibility", desc: "Zero guesswork handoff: responsive bounds and edge cases accounted for." },
                { label: "Medium", value: "Next.js / CSS Grid", desc: "Deep empathy for DOM rendering, component props, and API boundaries." },
                { label: "Priority", value: "Deterministic State", desc: "Explicit loading, error, empty and disabled conditions." },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-hairline bg-paper/60 p-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent">{item.label}</span>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================
   ANIMATED JOURNEY TRAJECTORY SECTION
========================================================= */

function JourneyTrajectory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative mt-8">
      {/* Background static line */}
      <div
        aria-hidden="true"
        className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-hairline sm:left-[23px]"
      />

      {/* Dynamic Animated Laser Beam that follows scroll */}
      <motion.div
        aria-hidden="true"
        style={{ height: lineHeight }}
        className="absolute left-[19px] top-6 w-[2px] bg-gradient-to-b from-accent via-accent to-emerald-400 shadow-[0_0_12px_rgba(26,79,214,0.6)] sm:left-[23px]"
      />

      <div className="space-y-10 sm:space-y-12">
        {roles.map((r, idx) => {
          const isCurrent = r.current || idx === 0;

          return (
            <motion.div
              key={`${r.company}-${r.period}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex items-start gap-6 sm:gap-8"
            >
              {/* Journey Station Node */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-paper bg-sunken shadow-md sm:h-12 sm:w-12">
                {isCurrent ? (
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                  </span>
                ) : (
                  <Briefcase size={14} className="text-muted" />
                )}
              </div>

              {/* Journey Station Card */}
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="group flex-1 rounded-2xl border border-hairline bg-sunken/30 p-6 transition-all duration-300 hover:border-hairline-strong hover:bg-sunken/70 hover:shadow-lg sm:p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold tracking-wider text-accent">
                      {r.period}
                    </span>
                    {r.duration && (
                      <span className="font-mono text-[10px] text-muted">
                        ({r.duration})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted">
                      {r.location}
                    </span>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                        <Radio size={10} className="animate-pulse" /> Live Station
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {r.title}
                  </h3>
                  <span className="font-serif text-sm italic text-muted sm:text-base">
                    {r.company}
                  </span>
                </div>

                {r.description && (
                  <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                    {r.description}
                  </p>
                )}

                {r.tags && r.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5 pt-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-hairline bg-paper/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted transition-colors group-hover:border-hairline-strong group-hover:text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Academic Origin Station */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex items-start gap-6 sm:gap-8"
        >
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-paper bg-sunken shadow-md sm:h-12 sm:w-12">
            <GraduationCap size={15} className="text-accent" />
          </div>

          <motion.div
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
            className="group flex-1 rounded-2xl border border-hairline bg-sunken/30 p-6 transition-all duration-300 hover:border-hairline-strong hover:bg-sunken/70 hover:shadow-lg sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/80 pb-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-ink">
                {education.period}
              </span>
              <span className="font-mono text-[10px] text-muted">
                {education.location}
              </span>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                {education.degree}
              </h3>
              <span className="font-serif text-sm italic text-muted">
                {education.school}
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
              Theoretical foundation in computation, system models, algorithmic logic, and modern software design patterns.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN EXPORT
========================================================= */

const chapters = [
  {
    roman: "I",
    title: "The Obvious is Hardest",
    body: "Most digital products fail not from lack of features, but from excessive noise. The greatest design work rarely calls attention to itself — it simply creates the shortest, least taxing path between a human and their intention.",
  },
  {
    roman: "II",
    title: "Code Empathy & Feasibility",
    body: "Having a Computer Science foundation means I don't treat Figma as an insulated artboard. I design with layout engines, component reusability, token structures, and edge states in mind from day one.",
  },
  {
    roman: "III",
    title: "Ruthless Reduction",
    body: "Simplicity is not the starting point; it is what remains after you have questioned every input, removed redundant controls, and structured cognitive hierarchy until nothing further can be subtracted.",
  },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <Navbar />

      {/* Top reading progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <main
        ref={containerRef}
        className="min-h-screen overflow-x-hidden bg-paper pb-28 text-ink md:pb-40"
      >
        <article className="mx-auto max-w-4xl px-6 pt-32 md:px-10 md:pt-40">
          {/* ================= HEADER WITH ROTATING SEAL ================= */}
          <header className="border-b border-hairline pb-12 md:pb-16">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                <BookOpen size={13} />
                <span>Monograph · Vol. 01</span>
              </div>
              <MonographSeal />
            </div>

            <h1
              aria-label="Design is how it works."
              className="mt-6 text-5xl leading-[0.94] tracking-[-0.05em] sm:text-7xl md:mt-10 md:text-8xl"
            >
              <span className="block">
                <KineticText text="Design is" base={520} peak={800} className="font-display font-medium" />
              </span>
              <span className="block">
                <KineticText text="how it" base={520} peak={800} className="font-display font-medium" />{" "}
                <KineticText text="works." base={400} peak={800} className="font-serif italic text-accent" />
              </span>
            </h1>

            <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-muted md:text-2xl">
              An inquiry into product craft, cognitive simplicity, and the space between software engineering and interface architecture.
            </p>
          </header>

          {/* ================= PROLOGUE: 3D TILT PORTRAIT & ESSAY ================= */}
          <section className="grid gap-12 border-b border-hairline py-16 md:grid-cols-12 md:gap-16 md:py-24">
            <div className="md:col-span-5">
              <TiltPortrait />
              <div className="mt-4 border-l-2 border-hairline pl-4 text-xs text-muted">
                <p className="font-mono uppercase tracking-wider text-ink">Ruthvik P. Thimmoji</p>
                <p className="mt-0.5">Product Designer · Bengaluru, India</p>
                <p className="mt-0.5 font-mono text-[10px] text-accent">Currently: Studycrux · Studio: Designuru</p>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6 md:col-span-7">
              <span className="frame-label">Prologue / Origin</span>

              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Bridging computation and intuition.
              </h2>

              <p className="text-base leading-relaxed text-muted md:text-lg">
                <span className="float-left mr-3 font-serif text-5xl font-normal leading-none text-ink">
                  I
                </span>
                began inside the world of algorithms and system constraints. With a background in Computer Science, my early discipline was grounded in how systems execute: data structures, relational schemas, and compilation speed.
              </p>

              <p className="text-base leading-relaxed text-muted md:text-lg">
                Yet I consistently noticed that digital platforms almost never fail because of technical execution. They fail because of cognitive friction. Software loses users when it forces people to parse internal engineering logic rather than helping them complete a goal.
              </p>

              <p className="text-base leading-relaxed text-muted md:text-lg">
                That realization shifted my entire craft. I moved to the front lines of interaction design to ensure that complex business engines are translated into calm, obvious, and human interfaces.
              </p>
            </div>
          </section>

          {/* ================= INTERACTIVE DUAL LENS ================= */}
          <section className="border-b border-hairline py-12 md:py-16">
            <DualMindset />
          </section>

          {/* ================= CHAPTER 01: THREE CONVICTIONS ================= */}
          <section className="border-b border-hairline py-16 md:py-24">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="frame-label">Chapter 01</span>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  Three Core Convictions
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Principles of Practice
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {chapters.map((ch) => (
                <div
                  key={ch.roman}
                  className="group relative rounded-xl border border-hairline bg-sunken/30 p-6 transition-all duration-300 hover:border-hairline-strong hover:bg-sunken/60 hover:shadow-md"
                >
                  <span className="font-mono text-xs font-semibold tracking-widest text-accent">
                    § {ch.roman}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {ch.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                    {ch.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CHAPTER 02: FIELD NOTES & TRAJECTORY ================= */}
          <section className="border-b border-hairline py-16 md:py-24">
            <div className="mb-12">
              <span className="frame-label">Chapter 02</span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Field Notes &amp; Trajectory
              </h2>
              <p className="mt-2 text-sm text-muted">
                Follow the live expedition path below — tracing roles, engagements, and academic grounding.
              </p>
            </div>

            {/* Studio Metrics Ribbon */}
            <div className="mb-14 grid grid-cols-2 gap-4 rounded-xl border border-hairline bg-sunken/40 p-4 sm:grid-cols-4 sm:p-6">
              {[
                { label: "Design Experience", value: "3+ Years" },
                { label: "Primary Discipline", value: "SaaS & Systems" },
                { label: "Code Fluency", value: "React & Next.js" },
                { label: "Origin", value: "Computer Science" },
              ].map((m) => (
                <div key={m.label} className="text-center sm:text-left">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-accent">{m.label}</span>
                  <p className="mt-1 font-display text-lg font-semibold text-ink">{m.value}</p>
                </div>
              ))}
            </div>

            {/* The Animated Trajectory Pipeline */}
            <JourneyTrajectory />
          </section>

          {/* ================= EPILOGUE & CTA ================= */}
          <footer className="pt-16 md:pt-24">
            <div className="rounded-2xl border border-hairline bg-sunken/40 p-8 md:p-14 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                Epilogue / Colophon
              </span>

              <h3 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl md:text-5xl">
                Ready to author <br />
                <span className="font-serif font-normal italic text-accent">
                  the next chapter together?
                </span>
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
                Currently open for senior product design roles, SaaS architectures, and high-stakes freelance contracts.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper shadow-md transition-all hover:opacity-90"
                >
                  <span>Start Conversation</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="/Ruthvikresume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-all hover:border-accent hover:text-ink"
                >
                  <span>Download Résumé</span>
                  <ArrowUpRight size={13} className="text-accent" />
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-hairline/80 pt-8 font-mono text-[10px] text-muted">
                <span>Typeset in Display &amp; Serif</span>
                <span>·</span>
                <span>Crafted with Next.js &amp; Tailwind</span>
                <span>·</span>
                <span>Figma Systems</span>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}