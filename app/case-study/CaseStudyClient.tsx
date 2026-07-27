"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CaseStudy } from "../data/case-studies";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / Projects.tsx / Contact.tsx / Services.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";

export default function CaseStudyClient({ project }: { project: CaseStudy }) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const figmaY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  // Media-query state instead of reading window.innerWidth inline during
  // render — the old version could mismatch between server and client paint.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const specRows = [
    { label: "Role", value: project.role },
    { label: "Duration", value: project.duration },
    { label: "Impact", value: "High Growth" },
    { label: "Tools", value: project.tools.join(" / ") },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen pb-20 md:pb-32 overflow-x-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      <style>{`::selection { background: ${brass}; color: ${ink}; }`}</style>

      {/* Ambient glow, single + restrained, consistent with the rest of the site */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[10%] right-[-10%] w-[45%] h-[35%] rounded-full blur-[120px]"
          style={{ backgroundColor: brass, opacity: 0.04 }}
        />
      </div>

      {/* Back button */}
      <nav className="fixed top-6 left-6 md:top-28 md:left-8 z-[60]">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 rounded-full backdrop-blur-md transition-colors"
          style={{
            color: graphite,
            backgroundColor: "rgba(14,14,16,0.8)",
            border: `1px solid ${hairline}`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = brass)}
          onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:inline">Back to Work</span>
        </button>
      </nav>

      {/* Scroll progress — brass hairline, not a thick orange bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
        style={{ scaleX: scrollYProgress, backgroundColor: brass }}
      />

      <article className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-28 md:pt-40">
        {/* HEADER */}
        <header className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em] font-medium"
              style={{ color: brass }}
            >
              Case Study
            </span>
            <div className="h-[1px] flex-1 max-w-24" style={{ backgroundColor: hairline }} />
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: graphite }}
            >
              {project.duration}
            </span>
          </motion.div>

          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95] mb-6 md:mb-8 max-w-4xl">
            {project.title}
          </h1>

          <p
            className="text-lg md:text-2xl font-light leading-snug max-w-2xl"
            style={{ color: graphite }}
          >
            {project.tagline}
          </p>

          {/* Spec sheet — same key/value pattern as the Footer colophon */}
          <div className="mt-14 md:mt-16 max-w-xl" style={{ borderTop: `1px solid ${hairline}` }}>
            {specRows.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-6 py-3.5"
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.25em] shrink-0 pt-0.5"
                  style={{ color: brass }}
                >
                  {row.label}
                </span>
                <span className="text-sm text-right" style={{ color: paper }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* PROBLEM / APPROACH + PROTOTYPE */}
        <section className="grid lg:grid-cols-12 gap-16 md:gap-20 mb-32 md:mb-52">
          <div className="lg:col-span-5 space-y-16 md:space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-baseline gap-4 mb-5 md:mb-6">
                <span className="font-mono text-[11px]" style={{ color: brass }}>01</span>
                <h2
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: graphite }}
                >
                  The Problem
                </h2>
              </div>
              <p className="font-serif italic text-xl md:text-2xl leading-relaxed" style={{ color: paper }}>
                {project.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-baseline gap-4 mb-5 md:mb-6">
                <span className="font-mono text-[11px]" style={{ color: brass }}>02</span>
                <h2
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: graphite }}
                >
                  The Approach
                </h2>
              </div>
              <p className="font-serif italic text-xl md:text-2xl leading-relaxed" style={{ color: paper }}>
                {project.solution}
              </p>
            </motion.div>
          </div>

          {/* Prototype embed */}
          <motion.div style={{ y: isDesktop ? figmaY : 0 }} className="lg:col-span-7 relative">
            <div
              className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] overflow-hidden group"
              style={{ border: `1px solid ${hairline}` }}
            >
              <div
                className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2 backdrop-blur px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-widest"
                style={{ backgroundColor: "rgba(14,14,16,0.85)", border: `1px solid ${hairline}`, color: graphite }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ backgroundColor: brass }}
                  />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: brass }} />
                </span>
                Live Prototype
              </div>
              <iframe
                src={project.figmaEmbed}
                className="w-full h-full grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </section>

        {/* OUTCOME */}
        <section
          className="py-20 md:py-32 text-center"
          style={{ borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em] font-medium block mb-8 md:mb-10"
              style={{ color: brass }}
            >
              Final Outcome
            </span>
            <p className="font-serif italic text-2xl md:text-5xl leading-tight max-w-4xl mx-auto" style={{ color: paper }}>
              {project.outcome}
            </p>
          </motion.div>
        </section>

        {/* CLOSING CTA — same button as Services / Contact, not a third style */}
        <footer className="mt-28 md:mt-44 text-center">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.35em] font-medium block mb-6 md:mb-8"
            style={{ color: brass }}
          >
            Ready for the next?
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl md:text-7xl tracking-tight mb-10 md:mb-14 leading-[1.05]">
            Let&rsquo;s build another <br className="hidden sm:block" />{" "}
            <span className="italic" style={{ color: brass }}>obvious story.</span>
          </h3>
          <button
            onClick={() => router.push("/contact")}
            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300"
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
            Start a Project
            <ArrowRight size={16} />
          </button>
        </footer>
      </article>
    </motion.main>
  );
}