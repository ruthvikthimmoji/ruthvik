"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/app/data/testimonials";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / OngoingWork.tsx / Projects.tsx.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";

// Quotes longer than this get clamped with a "Read full story" toggle
// instead of wrapping to 5-6 lines and dominating the section.
const CLAMP_LENGTH = 180;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const total = testimonials.length;

  // Auto-advance, resetting on every change. Skipped entirely if there's
  // only one testimonial — nothing to advance to.
  useEffect(() => {
    if (total <= 1) return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % total);
      setExpanded(false);
    }, 6000);
    return () => clearTimeout(id);
  }, [active, total]);

  const t = testimonials[active];
  const isLong = t.feedback.length > CLAMP_LENGTH;

  return (
    <section
      className="relative py-14 md:py-20 overflow-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10 md:mb-12"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em] font-medium"
            style={{ color: brass }}
          >
            Kind Words
          </span>
          <div className="h-[1px] flex-1" style={{ backgroundColor: hairline }} />
        </motion.div>

        {/* Featured quote — clamped when long, with an explicit expand toggle
            so the section height stays predictable regardless of content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-serif italic text-lg sm:text-xl leading-snug max-w-2xl"
              style={!expanded && isLong ? {
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              } : undefined}
            >
              {t.feedback}
            </p>

            {isLong && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="font-mono text-[10px] uppercase tracking-[0.15em] mt-2 transition-colors"
                style={{ color: graphite }}
                onMouseEnter={(e) => (e.currentTarget.style.color = brass)}
                onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
              >
                {expanded ? "Show less" : "Read full story"}
              </button>
            )}

            <div className="flex items-center gap-3 mt-6">
              <img
                src={t.image}
                alt={t.name}
                className="w-8 h-8 rounded-full object-cover grayscale"
                style={{ border: `1px solid ${hairline}` }}
              />
              <div className="min-w-0">
                <h4
                  className="font-medium text-xs tracking-tight truncate"
                  style={{ color: paper }}
                >
                  {t.name}
                </h4>
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.15em] truncate"
                  style={{ color: graphite }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scrubber — only rendered when there's actually something to
            navigate between. A "01/01" counter with nowhere to go just
            reads as a bug. */}
        {total > 1 && (
          <div className="flex items-center gap-3 mt-8">
            <span className="font-mono text-[9px] tracking-widest" style={{ color: brass }}>
              {String(active + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setExpanded(false);
                  }}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="relative flex-1 h-[2px] overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <motion.span
                    className="absolute inset-0 origin-left"
                    style={{ backgroundColor: brass }}
                    initial={false}
                    animate={{ scaleX: i === active ? 1 : 0 }}
                    transition={{ duration: i === active ? 6 : 0.3, ease: "linear" }}
                  />
                </button>
              ))}
            </div>

            <span className="font-mono text-[9px] tracking-widest" style={{ color: graphite }}>
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}