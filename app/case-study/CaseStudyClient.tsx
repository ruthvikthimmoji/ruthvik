"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CaseStudy } from "../data/case-studies";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap, Target, CheckCircle2, Award } from "lucide-react";

export default function CaseStudyClient({ project }: { project: CaseStudy }) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  // Parallax effect: Subtle pull for desktop, disabled/reduced for mobile
  const figmaY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-white text-[#1a1a1a] selection:bg-[#ff4f21] selection:text-white pb-20 md:pb-32 overflow-x-hidden"
    >
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-zinc-50/50 opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      {/* DYNAMIC BACK BUTTON - Mobile friendly version included */}
      <nav className="fixed top-8 left-6 md:top-32 md:left-8 z-[60]">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#ff4f21] transition-all bg-white/80 backdrop-blur md:bg-transparent p-2 md:p-0 rounded-full border border-zinc-100 md:border-none shadow-sm md:shadow-none"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="hidden md:inline">Back to Work</span>
        </button>
      </nav>

      {/* PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff4f21] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <article className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-32 md:pt-40">
        {/* HEADER */}
        <header className="relative mb-24 md:mb-40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 md:gap-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6 md:mb-8"
              >
                <span className="px-3 py-1 rounded-full bg-zinc-100 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Case Study
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  {project.duration}
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-9xl font-medium tracking-tighter leading-[1] md:leading-[0.85] mb-8 md:mb-10 font-serif italic">
                {project.title}
              </h1>

              <p className="text-xl md:text-4xl text-zinc-400 font-light leading-snug md:leading-tight max-w-2xl">
                {project.tagline}
              </p>
            </div>

            {/* Project Stats Board - Responsive Grid */}
            <div className="grid grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 rounded-[24px] md:rounded-[32px] overflow-hidden shrink-0 lg:w-80 shadow-sm">
              <div className="bg-white p-5 md:p-6">
                <h4 className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-2">
                  Role
                </h4>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-tight truncate">
                  {project.role}
                </p>
              </div>
              <div className="bg-white p-5 md:p-6">
                <h4 className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-2">
                  Impact
                </h4>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-[#ff4f21]">
                  High Growth
                </p>
              </div>
              <div className="bg-white p-5 md:p-6 col-span-2">
                <h4 className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[8px] md:text-[9px] font-bold uppercase tracking-tighter bg-zinc-50 px-2 py-1 rounded border border-zinc-100 text-zinc-500"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <section className="grid lg:grid-cols-12 gap-16 md:gap-20 mb-32 md:mb-60">
          <div className="lg:col-span-5 space-y-20 md:space-y-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                  <Target className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#ff4f21]" />
                </div>
                <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
                  The Problem
                </h2>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-zinc-600 font-serif italic">
                {project.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                  <Zap className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#ff4f21]" />
                </div>
                <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
                  The Approach
                </h2>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-zinc-600 font-serif italic">
                {project.solution}
              </p>
            </motion.div>
          </div>

          {/* FIGMA: Interactive Window */}
          <motion.div
            style={{
              y:
                typeof window !== "undefined" && window.innerWidth > 1024
                  ? figmaY
                  : 0,
            }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff4f21]/10 rounded-full blur-[80px] -z-10" />
            <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-[32px] md:rounded-[40px] overflow-hidden border border-zinc-200 shadow-2xl bg-white group">
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-3 bg-white/90 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-zinc-200 text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Prototype
              </div>
              <iframe
                src={project.figmaEmbed}
                className="w-full h-full grayscale-[40%] hover:grayscale-0 transition-all duration-700 md:block"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </section>

        {/* OUTCOME */}
        <section className="py-24 md:py-40 border-y border-zinc-100 text-center relative overflow-hidden">
          <Award className="w-8 h-8 md:w-10 md:h-10 text-[#ff4f21]/20 mx-auto mb-8 md:mb-12" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.5em] text-zinc-300 mb-8 md:mb-12">
              Final Outcome
            </h2>
            <p className="text-2xl md:text-6xl text-[#1a1a1a] font-medium tracking-tight italic font-serif leading-tight max-w-4xl mx-auto">
              &quot;{project.outcome}&quot;
            </p>
          </motion.div>
        </section>

        {/* FOOTER CTA */}
        <footer className="mt-32 md:mt-60 text-center">
          <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] md:tracking-[0.5em] text-[#ff4f21] mb-8 md:mb-10 block">
            Ready for the next?
          </span>
          <h3 className="text-3xl sm:text-5xl md:text-8xl font-medium tracking-tighter mb-12 md:mb-20 leading-[1.1] md:leading-[0.9]">
            Let’s build another <br className="hidden sm:block" />{" "}
            <span className="italic font-serif text-[#ff4f21]">
              obvious story.
            </span>
          </h3>
          <button
            onClick={() => router.push("/contact")}
            className="inline-flex items-center gap-4 md:gap-6 px-10 py-5 md:px-14 md:py-7 bg-[#1a1a1a] text-white rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#ff4f21] transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            Start a Project
            <CheckCircle2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          </button>
        </footer>
      </article>
    </motion.main>
  );
}
