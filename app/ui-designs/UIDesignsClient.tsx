"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { uiDesigns } from "../data/ui-designs";
import {
  LayoutGrid,
  Smartphone,
  Monitor,
  Box,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const filters = [
  { label: "All", value: "all", icon: <LayoutGrid size={14} /> },
  { label: "Mobile", value: "mobile", icon: <Smartphone size={14} /> },
  { label: "Web", value: "web", icon: <Monitor size={14} /> },
  { label: "Components", value: "components", icon: <Box size={14} /> },
];

export default function UIDesignsClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Fix Hydration issues
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updateIndicator = () => {
      const index = filters.findIndex((f) => f.value === activeFilter);
      const btn = buttonRefs.current[index];
      if (btn) {
        setIndicatorStyle({ width: btn.offsetWidth, left: btn.offsetLeft });
      }
    };

    updateIndicator();
    // Re-calculate on window resize to keep indicator aligned
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeFilter, isMounted]);

  const filteredDesigns =
    activeFilter === "all"
      ? uiDesigns
      : uiDesigns.filter((d) => d.category === activeFilter);

  const visibleDesigns = filteredDesigns.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] px-4 sm:px-8 py-20 md:py-40 selection:bg-[#ff4f21] selection:text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#ff4f21] mb-4 block">
              Gallery
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-medium tracking-tighter leading-[0.9] italic font-serif">
              Visual <br className="hidden sm:block" /> Exploration.
            </h1>
          </motion.div>
        </header>

        {/* Filter Bar - Responsive Scroll Fix */}
        <div className="flex mb-12 md:mb-20 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <div className="relative flex items-center bg-zinc-50 border border-zinc-200 p-1 rounded-xl md:rounded-2xl min-w-max">
            {/* Animated Indicator - only render when mounted */}
            {isMounted && (
              <motion.span
                className="absolute h-[calc(100%-8px)] rounded-lg md:rounded-xl bg-white shadow-sm border border-zinc-200"
                initial={false}
                animate={{
                  width: indicatorStyle.width,
                  left: indicatorStyle.left,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {filters.map((filter, index) => (
              <button
                key={filter.value}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative z-10 px-4 md:px-6 py-2 flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                  activeFilter === filter.value
                    ? "text-[#ff4f21]"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <span className="shrink-0">{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid - 1 col on small phones, 2 on tablets, 3 on desktop */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {visibleDesigns.map((design, index) => (
              <motion.div
                layout
                key={design.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] md:rounded-[40px] bg-zinc-50 border border-zinc-100 shadow-sm">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-5 px-1 flex justify-between items-start">
                  <div className="truncate pr-4">
                    <h3 className="text-lg font-medium tracking-tight truncate">
                      {design.title}
                    </h3>
                    <p className="text-xs text-zinc-400 italic font-serif truncate">
                      {design.subtitle}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-300 uppercase shrink-0">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* Footer CTA - Adjusted for Mobile */}
        <footer className="mt-32 md:mt-48 text-center py-16 border-t border-zinc-100">
          <h2 className="text-3xl md:text-7xl font-medium tracking-tighter mb-8">
            Want to see{" "}
            <span className="italic font-serif text-[#ff4f21]">more?</span>
          </h2>
          <Link href="/contact">
            <button className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#ff4f21] hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-[0_8px_25px_rgba(255,79,33,0.3)]">
              Get in touch
            </button>
          </Link>
        </footer>
      </div>
    </main>
  );
}
