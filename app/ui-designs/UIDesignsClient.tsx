"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { uiDesigns } from "../data/ui-designs";
import { caseStudies } from "../data/case-studies";
import {
  LayoutGrid,
  Smartphone,
  Monitor,
  Box,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / Projects.tsx / Contact.tsx / Services.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";

const PAGE_SIZE = 12;

const filters = [
  { label: "All", value: "all", icon: <LayoutGrid size={13} /> },
  { label: "Mobile", value: "mobile", icon: <Smartphone size={13} /> },
  { label: "Web", value: "web", icon: <Monitor size={13} /> },
  { label: "Components", value: "components", icon: <Box size={13} /> },
];

export default function UIDesignsClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination whenever the filter changes, so switching categories
  // doesn't carry over a "loaded more" count from a different filter.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter]);

  const filteredDesigns =
    activeFilter === "all"
      ? uiDesigns
      : uiDesigns.filter((d) => d.category === activeFilter);

  const visibleDesigns = filteredDesigns.slice(0, visibleCount);
  const remaining = filteredDesigns.length - visibleDesigns.length;

  return (
    <main
      className="min-h-screen px-4 sm:px-8 py-20 md:py-40 overflow-x-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      <style>{`::selection { background: ${brass}; color: ${ink}; }`}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="h-[1px] w-8" style={{ backgroundColor: brass, opacity: 0.5 }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em] font-medium"
                style={{ color: brass }}
              >
                Gallery
              </span>
            </div>
            <h1 className="font-serif italic text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95]">
              Visual <br className="hidden sm:block" /> Exploration.
            </h1>
          </motion.div>
        </header>

        {/* Filter bar — underline tabs, same mechanic as the Navbar's hover
            underline, instead of a boxed pill with a manually-measured indicator */}
        <div
          className="flex items-center gap-8 md:gap-10 mb-14 md:mb-20 overflow-x-auto scrollbar-hide"
          style={{ borderBottom: `1px solid ${hairline}` }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="relative flex items-center gap-2 pb-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium whitespace-nowrap transition-colors"
                style={{ color: isActive ? brass : graphite }}
              >
                <span className="shrink-0">{filter.icon}</span>
                {filter.label}
                {isActive && (
                  <motion.div
                    layoutId="ui-filter-underline"
                    className="absolute -bottom-[1px] left-0 w-full h-[1px]"
                    style={{ backgroundColor: brass }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {visibleDesigns.map((design, index) => {
              // const hasCaseStudy = Boolean(
              //   design.slug && caseStudies.some((cs) => cs.slug === design.slug)
              // );
              // const Wrapper = hasCaseStudy ? Link : "div";
              // const wrapperProps = hasCaseStudy
              //   ? { href: `/case-study/${design.slug!.toLowerCase()}` }
              //   : {};

              return (
                <motion.div
                  layout
                  key={design.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="group flex flex-col"
                >
                  {/* @ts-expect-error — Wrapper is either Link or div depending on hasCaseStudy
                  <Wrapper {...wrapperProps} className="block"> */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ border: `1px solid ${hairline}` }}
                    >
                      <Image
                        src={design.image}
                        alt={design.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Index watermark */}
                      <span
                        className="absolute top-3 left-3 font-mono text-[10px] tracking-widest"
                        style={{ color: paper, opacity: 0.6 }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Hover reveal — only for designs with a matching case study */}
                      {/* {hasCaseStudy && (
                        <div
                          className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(14,14,16,0.85), transparent 60%)",
                          }}
                        >
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.15em] flex items-center gap-1.5"
                            style={{ color: brass }}
                          >
                            View Case Study
                            <ArrowUpRight size={13} />
                          </span>
                        </div>
                      )} */}
                    </div>

                    <div className="mt-4 px-0.5 flex justify-between items-start gap-3">
                      <div className="truncate">
                        <h3 className="text-base md:text-lg font-medium tracking-tight truncate" style={{ color: paper }}>
                          {design.title}
                        </h3>
                        <p
                          className="text-xs italic font-serif truncate"
                          style={{ color: graphite }}
                        >
                          {design.subtitle}
                        </p>
                      </div>
                    </div>
                  </Wrapper>
                // </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

        {/* Load more — functional now; the old page had this state but no
            control that ever changed it */}
        {remaining > 0 && (
          <div className="flex justify-center mt-16 md:mt-20">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] font-medium px-6 py-3 rounded-full transition-colors"
              style={{ color: graphite, border: `1px solid ${hairline}` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = brass)}
              onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
            >
              Load More · {remaining} remaining
            </button>
          </div>
        )}

        {/* Footer CTA — same button language as Services / Contact / About */}
        <footer
          className="mt-32 md:mt-48 text-center py-16"
          style={{ borderTop: `1px solid ${hairline}` }}
        >
          <h2 className="font-serif text-3xl md:text-6xl font-medium tracking-tight mb-10">
            Want to see{" "}
            <span className="italic" style={{ color: brass }}>more?</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300"
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
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </footer>
      </div>
    </main>
  );
}