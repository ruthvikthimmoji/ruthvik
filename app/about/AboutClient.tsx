"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Coffee, Code2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / Projects.tsx / Contact.tsx / Services.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";
const hairlineStrong = "rgba(199, 162, 92, 0.3)";

const fadeInUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const timeline = [
  {
    year: "2024 — Present",
    role: "Freelance UI/UX Designer",
    company: "Designuru Studio",
    desc: "Helping startups and SaaS teams turn complex ideas into obvious, high-converting digital products.",
  },
  {
    year: "2023",
    role: "Frontend Developer & Designer",
    company: "Freelance",
    desc: "Bridging the gap between aesthetic design and functional code, specializing in React and Next.js.",
  },
  {
    year: "2022",
    role: "Early Exploration",
    company: "Learning & Growth",
    desc: "Mastering the fundamentals of visual hierarchy, typography, and user psychology.",
  },
];

const titleBlock = [
  { label: "Ref", value: "Ruthvik" },
  { label: "Studio", value: "Designuru" },
  { label: "Discipline", value: "Design + Code" },
  { label: "Orientation", value: "Clarity" },
];

function Annotation({
  label,
  className,
  align = "left",
}: {
  label: string;
  className: string;
  align?: "left" | "right";
}) {
  const text = (
    <span
      className="font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap"
      style={{ color: graphite }}
    >
      {label}
    </span>
  );
  return (
    <div className={`absolute hidden md:flex items-center gap-3 ${className}`}>
      {align === "right" && text}
      <span className="w-10 h-px" style={{ backgroundColor: hairlineStrong }} />
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ border: `1px solid ${graphite}` }}
      />
      {align === "left" && text}
    </div>
  );
}

export default function AboutClient() {
  return (
    <main
      className="min-h-screen pb-24 md:pb-40 overflow-x-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      <style>{`::selection { background: ${brass}; color: ${ink}; }`}</style>

      {/* Faint ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[10%] right-[-10%] w-[45%] h-[35%] rounded-full blur-[120px]"
          style={{ backgroundColor: brass, opacity: 0.04 }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-6 md:px-8 pt-28 md:pt-36 relative z-10">
        {/* ───── HERO */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-14 md:mb-20"
        >
          <span
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.35em] mb-6 block"
            style={{ color: brass }}
          >
            Doc — About / 01
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-[0.9] mb-8 md:mb-10">
            Design is <br />
            how it <span className="italic" style={{ color: brass }}>works.</span>
          </h1>
          <p
            className="font-serif text-xl md:text-3xl font-light leading-snug max-w-2xl"
            style={{ color: graphite }}
          >
            My journey into design wasn&apos;t about making things look good. It was about finding the shortest path between a user and their goal.
          </p>
        </motion.section>

        {/* ───── TITLE BLOCK — spec sheet */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-24 md:mb-36 rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${hairline}`, backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {titleBlock.map((field, i) => (
              <div
                key={field.label}
                className="px-5 md:px-6 py-4 md:py-5"
                style={{
                  borderLeft: i !== 0 ? `1px solid ${hairline}` : undefined,
                  borderTop: i >= 2 ? `1px solid ${hairline}` : undefined,
                }}
              >
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.25em] mb-1.5"
                  style={{ color: graphite }}
                >
                  {field.label}
                </p>
                <p className="font-sans text-sm md:text-base font-medium" style={{ color: paper }}>
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ───── ANNOTATED PORTRAIT */}
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-28 md:mb-44 flex justify-center"
        >
          <div className="relative w-[280px] h-[340px] md:w-[420px] md:h-[500px]">
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ border: `1px solid ${hairline}`, backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <Image
                src="/about.png"
                alt="Ruthvik - Founder of Designuru Studio"
                fill
                sizes="(max-width: 768px) 280px, 420px"
                className="object-cover"
                priority
              />
            </div>

            <Annotation label="Est. 2022" className="top-8 -right-4 translate-x-full" align="left" />
            <Annotation label="Design + Code" className="top-1/2 -left-4 -translate-x-full" align="right" />
            <Annotation label="Founder, Designuru" className="bottom-10 -right-4 translate-x-full" align="left" />
          </div>
        </motion.section>

        {/* ───── CHAPTER: THE BEGINNING */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-24 md:mb-36 space-y-8"
        >
          <h2
            className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: graphite }}
          >
            Note — The Beginning
          </h2>
          <div
            className="space-y-6 font-serif text-lg md:text-2xl font-light leading-relaxed italic max-w-2xl"
            style={{ color: graphite }}
          >
            <p>
              I started my career at the intersection of logic and creativity. As a{" "}
              <span className="font-medium not-italic font-sans" style={{ color: paper }}>
                Frontend Developer
              </span>
              , I learned how to build; but as a{" "}
              <span className="font-medium not-italic font-sans" style={{ color: paper }}>
                UI/UX Designer
              </span>
              , I learned why we build.
            </p>
            <p>
              Most digital products suffer from the same problem: noise. Too many features, too much complexity, not enough focus. I dedicated my work to the opposite — clarity.
            </p>
          </div>
        </motion.section>

        {/* ───── CHAPTER: PHILOSOPHY */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-28 md:mb-44"
        >
          <h2
            className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] mb-10 md:mb-14"
            style={{ color: graphite }}
          >
            Note — Working Principles
          </h2>

          <div
            className="border border-dashed rounded-2xl p-8 md:p-12 mb-10"
            style={{ borderColor: hairlineStrong }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-4 h-4" style={{ color: brass }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: graphite }}>
                Fig. 01
              </span>
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-medium tracking-tight mb-4 leading-tight">
              Focus on the obvious.
            </h3>
            <p
              className="font-sans text-sm md:text-base font-light leading-relaxed max-w-lg"
              style={{ color: graphite }}
            >
              If a user has to think twice, the design has failed. My philosophy is to create products that don&apos;t just solve problems, but feel like they should have always existed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex gap-4 pl-5" style={{ borderLeft: `2px solid ${hairline}` }}>
              <Coffee className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-1" style={{ color: brass }} />
              <div>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.25em] block mb-2"
                  style={{ color: graphite }}
                >
                  Fig. 02
                </span>
                <p className="font-sans text-sm md:text-base font-light leading-relaxed" style={{ color: graphite }}>
                  Deep work over more projects — every detail gets the attention it deserves.
                </p>
              </div>
            </div>
            <div className="flex gap-4 pl-5" style={{ borderLeft: `2px solid ${hairline}` }}>
              <Code2 className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-1" style={{ color: brass }} />
              <div>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.25em] block mb-2"
                  style={{ color: graphite }}
                >
                  Fig. 03
                </span>
                <p className="font-sans text-sm md:text-base font-light leading-relaxed" style={{ color: graphite }}>
                  A technical background means designing with feasibility in mind, for a smooth handoff to development.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── CHANGELOG (career path) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-28 md:mb-44"
        >
          <h2
            className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] mb-12 md:mb-16"
            style={{ color: graphite }}
          >
            Changelog — Career Path
          </h2>

          <div className="space-y-14 md:space-y-16 relative">
            <div className="absolute left-0 top-2 bottom-2 w-px" style={{ backgroundColor: hairline }} />

            {timeline.map((item, i) => (
              <div key={i} className="relative pl-8 md:pl-12">
                <span
                  className="absolute left-[-3px] top-1 w-[7px] h-px"
                  style={{ backgroundColor: graphite }}
                />
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] md:text-xs font-medium tracking-wide" style={{ color: brass }}>
                    REV. {String(timeline.length - i).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-[10px] md:text-xs uppercase tracking-widest"
                    style={{ color: graphite }}
                  >
                    {item.year}
                  </span>
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-medium tracking-tight mb-1.5" style={{ color: paper }}>
                  {item.role}
                </h3>
                <p className="font-serif text-sm md:text-base italic mb-3" style={{ color: graphite }}>
                  {item.company}
                </p>
                <p
                  className="font-sans text-sm md:text-base max-w-xl font-light leading-relaxed"
                  style={{ color: graphite }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ───── CTA */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative text-center pt-16"
          style={{ borderTop: `1px solid ${hairline}` }}
        >
          <div
            className="hidden md:flex items-center gap-2 absolute right-0 top-10 -rotate-6 rounded-lg px-4 py-2"
            style={{ border: `1px solid ${hairline}` }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: brass }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: graphite }}>
              Approved — Designuru
            </span>
          </div>

          <h3 className="font-serif text-3xl md:text-6xl font-medium tracking-tight mb-10 md:mb-12 leading-tight">
            Ready to start <br /> <span className="italic" style={{ color: brass }}>the next chapter?</span>
          </h3>

          <a
            href="/contact"
            className="inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-5 md:py-6 text-sm md:text-base font-sans font-medium rounded-full transition-all duration-300 group"
            style={{ backgroundColor: paper, color: ink }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = brass;
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(199,162,92,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = paper;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Let&apos;s build together
            <ArrowRight className="w-[18px] h-[18px] md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.footer>
      </article>
    </main>
  );
}