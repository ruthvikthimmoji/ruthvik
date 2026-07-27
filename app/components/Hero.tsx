"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const roles = ["UI/UX Designer", "Problem Solver", "Product Partner"];

// ---------------------------------------------------------------------------
// Design tokens for this hero. Keep these local to the section so the palette
// stays intentional and isn't quietly inherited by other parts of the site.
// ---------------------------------------------------------------------------
const ink = "#0E0E10"; // near-black background
const paper = "#F3F1EC"; // warm ivory text
const graphite = "#8B8985"; // muted warm grey for secondary text
const brass = "#C7A25C"; // single restrained accent
const brassSoft = "rgba(199, 162, 92, 0.14)"; // grid / hairline tint

export default function Hero() {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLElement>(null);

  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showCoords, setShowCoords] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowCoords(true)}
      onMouseLeave={() => setShowCoords(false)}
      className="relative min-h-[85vh] md:min-h-[90vh] px-6 md:px-8 flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      {/* Fine hairline grid — a design-tool canvas, not a decorative texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${brassSoft} 1px, transparent 1px), linear-gradient(90deg, ${brassSoft} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 30% 40%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 30% 40%, black 0%, transparent 75%)",
        }}
      />

      {/* Live coordinate readout — the one signature flourish, quiet everywhere else */}
      <AnimatePresence>
        {showCoords && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex absolute bottom-10 right-10 items-center gap-2 font-mono text-[11px] tracking-wider"
            style={{ color: graphite }}
          >
            <span style={{ color: brass }}>×</span>
            <span>{String(coords.x).padStart(4, "0")}</span>
            <span style={{ color: brass }}>y</span>
            <span>{String(coords.y).padStart(4, "0")}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative max-w-6xl mx-auto w-full z-10"
      >
        {/* Eyebrow — set in mono, the register a design tool uses for metadata */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="h-[1px] w-8 md:w-12" style={{ backgroundColor: brass, opacity: 0.5 }} />
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-medium"
              style={{ color: brass }}
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Headline — serif display, restrained italic for the one word that matters */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[2.75rem] sm:text-6xl md:text-8xl font-medium tracking-tight leading-[1.02] md:leading-[0.96] max-w-5xl"
        >
          Designing products <br className="hidden sm:block" />
          that feel <span className="italic" style={{ color: brass }}>obvious.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-8 md:mt-12 text-lg md:text-xl max-w-xl leading-relaxed font-light"
          style={{ color: graphite }}
        >
          Turning complex SaaS challenges into clear, high-conversion digital experiences.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-10"
        >
          <a
            href="#work"
            className="group relative text-base md:text-lg font-medium overflow-hidden pb-1"
            style={{ color: paper }}
          >
            <span className="relative z-10">View selected work</span>
            <div
              className="absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-500 -translate-x-full group-hover:translate-x-0"
              style={{ backgroundColor: brass }}
            />
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-2" style={{ color: brass }}>
              →
            </span>
          </a>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: brass }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: brass }} />
            </span>
            <span className="text-xs md:text-sm font-medium" style={{ color: graphite }}>
              Available
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — a still hairline, not a bouncing arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-8 md:bottom-12 left-6 md:left-8 hidden sm:flex flex-col items-center gap-4"
      >
        <span
          className="rotate-90 font-mono text-[9px] uppercase tracking-[0.3em] origin-left"
          style={{ color: graphite }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-10 md:h-12" style={{ backgroundColor: brassSoft }} />
      </motion.div>
    </section>
  );
}