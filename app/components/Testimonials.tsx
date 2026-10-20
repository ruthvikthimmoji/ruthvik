"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { testimonials } from "@/app/data/testimonials";

// Quotes longer than this are clamped with a "Read full story" toggle
const CLAMP_LENGTH = 180;
const INTERVAL_MS = 7000;

export default function Testimonials() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  /* Auto-advance. Stops while hovered/focused (so it can be read),
     while a long quote is expanded, and for reduced-motion users. */
  useEffect(() => {
    if (total <= 1 || paused || expanded || reduced) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % total), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [active, total, paused, expanded, reduced]);

  // Nothing to show (empty data) -> render nothing instead of crashing
  if (total === 0) return null;

  const t = testimonials[active];
  const isLong = t.feedback.length > CLAMP_LENGTH;

  const go = (i: number) => {
    setActive(i);
    setExpanded(false);
  };

  return (
    <section
      aria-label="Testimonials"
      className="relative overflow-hidden border-t border-hairline bg-sunken py-14 text-ink md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center gap-4 md:mb-14"
        >
          <span className="frame-label text-accent">Kind words</span>
          <div className="h-px flex-1 bg-hairline-strong" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.figure
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              aria-hidden="true"
              className="block font-serif text-7xl leading-none text-accent"
            >
              “
            </span>

            <blockquote
              className={`-mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-[-0.02em] md:text-4xl ${
                !expanded && isLong ? "line-clamp-4" : ""
              }`}
            >
              {t.feedback}
            </blockquote>

            {isLong && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-accent"
              >
                {expanded ? "Show less" : "Read full story"}
              </button>
            )}

            <figcaption className="mt-8 flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="h-10 w-10 rounded-full border border-hairline object-cover grayscale transition-[filter] duration-300 hover:grayscale-0"
              />
              <div className="min-w-0">
                <span className="block truncate text-sm font-medium">{t.name}</span>
                <span className="frame-label block truncate">{t.role}</span>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        {/* Scrubber: only when there is something to navigate between */}
        {total > 1 && (
          <div className="mt-10 flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest text-accent">
              {String(active + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-1 gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === active}
                  className="group flex-1 py-3"
                >
                  <span
                    className={`block h-[2px] transition-colors duration-300 ${
                      i === active
                        ? "bg-accent"
                        : "bg-hairline-strong group-hover:bg-muted"
                    }`}
                  />
                </button>
              ))}
            </div>

            <span className="font-mono text-[10px] tracking-widest text-muted">
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
