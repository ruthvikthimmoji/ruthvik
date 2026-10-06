"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Target,
  Coffee,
  Code2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const accent = "#C86B3C";
const hairline = "rgba(17, 17, 17, 0.14)";
const hairlineStrong = "rgba(17, 17, 17, 0.28)";

const fadeInUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* Newest first. Keep in sync with the homepage Experience section. */
const timeline = [
  {
    year: "2026 — Present",
    role: "UI/UX Designer",
    company: "Studycrux",
    desc: "Working across CMS experiences, dashboards, SaaS workflows and product interfaces — translating complex requirements into clearer user flows, scalable UI and reusable design patterns.",
  },
  {
    year: "2024 — Present",
    role: "Freelance UI/UX Designer",
    company: "Designuru Studio",
    desc: "Helping startups and SaaS teams turn complex ideas into obvious, usable digital products.",
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
  { label: "Currently", value: "Studycrux" },
  { label: "Studio", value: "Designuru" },
  { label: "Discipline", value: "Design + Code" },
];

const tools = ["Figma", "React", "Next.js"];

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
      className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em]"
      style={{ color: muted }}
    >
      {label}
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className={`absolute hidden items-center gap-3 md:flex ${className}`}
    >
      {align === "right" && text}
      <span className="h-px w-10" style={{ backgroundColor: hairlineStrong }} />
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ border: `1px solid ${muted}` }}
      />
      {align === "left" && text}
    </div>
  );
}

export default function AboutClient() {
  return (
    <>
      <Navbar />

      <main
        className="min-h-screen overflow-x-hidden pb-24 md:pb-40"
        style={{ backgroundColor: paper, color: ink }}
      >
        <style>{`::selection { background: ${accent}; color: ${paper}; }`}</style>

        <article className="relative mx-auto max-w-4xl px-6 pt-32 md:px-8 md:pt-44">
          {/* HERO */}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 md:mb-20"
          >
            <span
              className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              Doc — About / 01
            </span>

            <h1 className="mb-8 font-serif text-5xl font-medium leading-[0.9] tracking-[-0.045em] sm:text-7xl md:mb-10 md:text-8xl">
              Design is <br />
              how it{" "}
              <span className="italic" style={{ color: accent }}>
                works.
              </span>
            </h1>

            <p
              className="max-w-2xl font-serif text-xl leading-snug md:text-3xl"
              style={{ color: muted }}
            >
              My journey into design wasn&apos;t about making things look
              good. It was about finding the shortest path between a user
              and their goal.
            </p>
          </motion.section>

          {/* SPEC SHEET */}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-24 overflow-hidden border md:mb-36"
            style={{ borderColor: hairline }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {titleBlock.map((field, i) => (
                <div
                  key={field.label}
                  className="px-5 py-4 md:px-6 md:py-5"
                  style={{
                    borderLeft: i !== 0 ? `1px solid ${hairline}` : undefined,
                    borderTop: i >= 2 ? `1px solid ${hairline}` : undefined,
                  }}
                >
                  <p
                    className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: muted }}
                  >
                    {field.label}
                  </p>
                  <p className="text-sm font-medium md:text-base">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* PORTRAIT */}

          <motion.section
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-28 flex justify-center md:mb-44"
          >
            <div className="relative h-[340px] w-[280px] md:h-[500px] md:w-[420px]">
              <div
                className="relative h-full w-full overflow-hidden border transition-all duration-1000 md:grayscale md:hover:grayscale-0"
                style={{ borderColor: hairline, backgroundColor: "#ECEAE5" }}
              >
                <Image
                  src="/about.png"
                  alt="Portrait of Ruthvik, UI/UX designer"
                  fill
                  sizes="(max-width: 768px) 280px, 420px"
                  className="object-cover"
                  priority
                />
              </div>

              <Annotation
                label="Est. 2022"
                className="-right-4 top-8 translate-x-full"
              />
              <Annotation
                label="Design + Code"
                className="-left-4 top-1/2 -translate-x-full"
                align="right"
              />
              <Annotation
                label="Founder, Designuru"
                className="-right-4 bottom-10 translate-x-full"
              />
            </div>
          </motion.section>

          {/* THE BEGINNING */}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-24 space-y-8 md:mb-36"
          >
            <h2
              className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] md:text-xs"
              style={{ color: muted }}
            >
              Note — The Beginning
            </h2>

            <div
              className="max-w-2xl space-y-6 font-serif text-lg italic leading-relaxed md:text-2xl"
              style={{ color: muted }}
            >
              <p>
                I started my career at the intersection of logic and
                creativity. As a{" "}
                <span
                  className="font-sans font-medium not-italic"
                  style={{ color: ink }}
                >
                  Frontend Developer
                </span>
                , I learned how to build; but as a{" "}
                <span
                  className="font-sans font-medium not-italic"
                  style={{ color: ink }}
                >
                  UI/UX Designer
                </span>
                , I learned why we build.
              </p>

              <p>
                Most digital products suffer from the same problem: noise.
                Too many features, too much complexity, not enough focus.
                I dedicated my work to the opposite — clarity.
              </p>
            </div>
          </motion.section>

          {/* PRINCIPLES */}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-28 md:mb-44"
          >
            <h2
              className="mb-10 font-mono text-[10px] font-medium uppercase tracking-[0.3em] md:mb-14 md:text-xs"
              style={{ color: muted }}
            >
              Note — Working Principles
            </h2>

            <div
              className="mb-10 border border-dashed p-8 md:p-12"
              style={{ borderColor: hairlineStrong }}
            >
              <div className="mb-5 flex items-center gap-2">
                <Target
                  className="h-4 w-4"
                  style={{ color: accent }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: muted }}
                >
                  Fig. 01
                </span>
              </div>

              <h3 className="mb-4 font-serif text-3xl leading-tight tracking-[-0.03em] md:text-4xl">
                Focus on the obvious.
              </h3>

              <p
                className="max-w-lg text-sm leading-relaxed md:text-base"
                style={{ color: muted }}
              >
                If a user has to think twice, the design has failed. My
                philosophy is to create products that don&apos;t just solve
                problems, but feel like they should have always existed.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {[
                {
                  icon: Coffee,
                  fig: "Fig. 02",
                  text: "Deep work over more projects — every detail gets the attention it deserves.",
                },
                {
                  icon: Code2,
                  fig: "Fig. 03",
                  text: "A technical background means designing with feasibility in mind, for a smooth handoff to development.",
                },
              ].map(({ icon: Icon, fig, text }) => (
                <div
                  key={fig}
                  className="flex gap-4 pl-5"
                  style={{ borderLeft: `2px solid ${hairline}` }}
                >
                  <Icon
                    className="mt-1 h-4 w-4 shrink-0 md:h-5 md:w-5"
                    style={{ color: accent }}
                    aria-hidden="true"
                  />
                  <div>
                    <span
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: muted }}
                    >
                      {fig}
                    </span>
                    <p
                      className="text-sm leading-relaxed md:text-base"
                      style={{ color: muted }}
                    >
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOOLS */}

            <div
              className="mt-12 flex flex-wrap items-center gap-3 border-t pt-8"
              style={{ borderColor: hairline }}
            >
              <span
                className="mr-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: muted }}
              >
                Tools
              </span>
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: muted, borderColor: hairline }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.section>

          {/* CHANGELOG */}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-28 md:mb-44"
          >
            <h2
              className="mb-12 font-mono text-[10px] font-medium uppercase tracking-[0.3em] md:mb-16 md:text-xs"
              style={{ color: muted }}
            >
              Changelog — Career Path
            </h2>

            <div className="relative space-y-14 md:space-y-16">
              <div
                className="absolute bottom-2 left-0 top-2 w-px"
                style={{ backgroundColor: hairline }}
              />

              {timeline.map((item, i) => (
                <div key={item.role + item.year} className="relative pl-8 md:pl-12">
                  <span
                    className="absolute left-[-3px] top-1 h-px w-[7px]"
                    style={{ backgroundColor: muted }}
                  />

                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className="font-mono text-[10px] font-medium tracking-wide md:text-xs"
                      style={{ color: accent }}
                    >
                      REV. {String(timeline.length - i).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest md:text-xs"
                      style={{ color: muted }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <h3 className="mb-1.5 font-serif text-2xl tracking-[-0.025em] md:text-3xl">
                    {item.role}
                  </h3>

                  <p
                    className="mb-3 font-serif text-sm italic md:text-base"
                    style={{ color: muted }}
                  >
                    {item.company}
                  </p>

                  <p
                    className="max-w-xl text-sm leading-relaxed md:text-base"
                    style={{ color: muted }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}

          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t pt-16 text-center"
            style={{ borderColor: hairline }}
          >
            <h3 className="mb-10 font-serif text-4xl font-medium leading-tight tracking-[-0.035em] md:mb-12 md:text-6xl">
              Ready to start <br />
              <span className="italic" style={{ color: accent }}>
                the next chapter?
              </span>
            </h3>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[#C86B3C] md:px-10 md:py-5"
                style={{ backgroundColor: ink, color: paper }}
              >
                Let&apos;s build together
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <a
                href="/Ruthvikresume.pdf"
                download
                className="group inline-flex items-center gap-2 border-b pb-1 font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: muted, borderColor: hairline }}
              >
                Download resume
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: accent }}
                />
              </a>
            </div>
          </motion.footer>
        </article>
      </main>
    </>
  );
}
