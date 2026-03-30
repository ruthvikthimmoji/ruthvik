"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Coffee, Code2 } from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
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

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a] selection:bg-[#ff4f21] selection:text-white pb-24 md:pb-40 font-serif overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[60%] md:w-[30%] h-[30%] bg-[#ff4f21]/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <article className="max-w-4xl mx-auto px-6 md:px-8 pt-32 md:pt-40 relative z-10">
        {/* ───── THE PROLOGUE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-24 md:mb-32"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold font-sans text-[#ff4f21] mb-6 md:mb-8 block">
            The Story
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-medium tracking-tighter leading-[0.9] md:leading-[0.85] mb-10 md:mb-16 text-[#1a1a1a]">
            Design is <br />
            how it <span className="italic text-[#ff4f21]">works.</span>
          </h1>
          <p className="text-xl md:text-4xl text-zinc-400 font-light leading-snug">
            My journey into design wasn&apos;t just about making things look
            good. It was about finding the shortest path between a user and
            their goal.
          </p>
        </motion.section>

        {/* ───── THE VISUAL ANCHOR (Profile Image) */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 md:mb-52 flex justify-center"
        >
          <div className="relative group w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            {/* Soft Brand Glow behind the image */}
            <div className="absolute -inset-4 bg-[#ff4f21]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Image Wrapper with explicit constraints */}
            <div className="relative w-full h-full rounded-[40px] md:rounded-[60px] overflow-hidden border border-zinc-100 shadow-2xl transition-all duration-1000 grayscale hover:grayscale-0 group-hover:scale-[1.02] bg-zinc-50">
              <Image
                src="/about.png"
                alt="Ruthvik - Founder of Designuru Studio"
                fill
                sizes="(max-width: 768px) 300px, 500px"
                className="object-cover"
                priority
              />
            </div>

            {/* Signature Tag */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white border border-zinc-100 p-4 md:p-6 rounded-2xl shadow-xl hidden sm:block z-20">
              <p className="text-[9px] uppercase font-bold tracking-widest text-[#ff4f21] mb-1">
                Perspective
              </p>
              <p className="text-xs italic text-zinc-400 font-sans">
                UX/UI Designer
              </p>
            </div>
          </div>
        </motion.section>

        {/* ───── THE NARRATIVE: CHAPTER 01 */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-24 md:mb-40 space-y-8 md:space-y-12"
        >
          <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] font-sans text-zinc-300">
            The Beginning
          </h2>
          <div className="space-y-6 md:space-y-8 text-lg md:text-2xl text-zinc-600 font-light leading-relaxed italic">
            <p>
              I started my career at the intersection of logic and creativity.
              As a{" "}
              <span className="text-[#1a1a1a] font-medium not-italic font-sans">
                Frontend Developer
              </span>
              , I learned how to build; but as a{" "}
              <span className="text-[#1a1a1a] font-medium not-italic font-sans">
                UI/UX Designer
              </span>
              , I learned why we build.
            </p>
            <p>
              I realized that most digital products suffer from the same
              problem: noise. Too many features, too much complexity, and not
              enough focus. I decided to dedicate my work to the
              opposite—clarity.
            </p>
          </div>
        </motion.section>

        {/* ───── THE NARRATIVE: CHAPTER 02 (The Philosophy) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-32 md:mb-60 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          <div className="bg-zinc-50 p-8 md:p-12 rounded-[32px] md:rounded-[40px] aspect-square flex flex-col justify-center border border-zinc-100 shadow-sm">
            <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-[#ff4f21] mb-6" />
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 font-sans leading-tight text-[#1a1a1a]">
              Focus on the obvious.
            </h3>
            <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed font-sans">
              If a user has to think twice, the design has failed. My philosophy
              is to create products that don&apos;t just solve problems, but
              feel like they should have always existed.
            </p>
          </div>
          <div className="space-y-8 md:space-y-12 font-sans">
            <div className="flex gap-5 md:gap-6">
              <Coffee className="w-5 h-5 md:w-6 md:h-6 text-[#ff4f21] shrink-0" />
              <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
                I believe in deep work and fewer projects, allowing me to give
                every detail the attention it deserves.
              </p>
            </div>
            <div className="flex gap-5 md:gap-6">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-[#ff4f21] shrink-0" />
              <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
                My technical background means I design with feasibility in mind,
                ensuring a smooth transition to development.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ───── THE TIMELINE (The Career Path) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-32 md:mb-60"
        >
          <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] font-sans text-zinc-300 mb-12 md:mb-20">
            The Career Path
          </h2>

          <div className="space-y-16 md:space-y-20 relative">
            <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-zinc-100" />

            {timeline.map((item, i) => (
              <div key={i} className="relative pl-8 md:pl-12 group">
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-[#ff4f21] transition-colors duration-500" />

                <span className="text-[10px] md:text-xs font-bold font-sans text-[#ff4f21] uppercase tracking-widest mb-2 block">
                  {item.year}
                </span>
                <h3 className="text-xl md:text-3xl font-medium tracking-tight mb-2 font-sans text-[#1a1a1a]">
                  {item.role}
                </h3>
                <p className="text-sm md:text-lg italic text-zinc-400 mb-3 md:mb-4">
                  {item.company}
                </p>
                <p className="text-sm md:text-base text-zinc-500 max-w-xl font-light leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ───── THE EPILOGUE (Final CTA) */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-20 border-t border-zinc-100"
        >
          <h3 className="text-3xl md:text-6xl font-medium tracking-tighter mb-10 md:mb-12 leading-tight text-[#1a1a1a]">
            Ready to start <br />{" "}
            <span className="italic">the next chapter?</span>
          </h3>

          <a
            href="/contact"
            className="
              inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-5 md:py-6
              bg-[#1a1a1a]
              text-white
              text-sm md:text-base
              font-medium font-sans
              rounded-full
              transition-all hover:bg-[#ff4f21] hover:px-10 md:hover:px-16
              group shadow-xl
            "
          >
            Let&apos;s build together
            <ArrowRight className="w-[18px] h-[18px] md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.footer>
      </article>
    </main>
  );
}
