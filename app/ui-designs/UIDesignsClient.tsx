"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { uiDesigns } from "../data/ui-designs";
import { LayoutGrid, Smartphone, Monitor, Box, ArrowUpRight, Plus } from "lucide-react";

const filters = [
  { label: "All", value: "all", icon: <LayoutGrid size={14} /> },
  { label: "Mobile", value: "mobile", icon: <Smartphone size={14} /> },
  { label: "Web", value: "web", icon: <Monitor size={14} /> },
  { label: "Components", value: "components", icon: <Box size={14} /> },
];

export default function UIDesignsClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12); // Initial items to show
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  // Update sliding indicator
  useEffect(() => {
    const index = filters.findIndex((f) => f.value === activeFilter);
    const btn = buttonRefs.current[index];
    if (btn) {
      setIndicatorStyle({ width: btn.offsetWidth, left: btn.offsetLeft });
    }
    // Reset count when filter changes to keep things fast
    setVisibleCount(12);
  }, [activeFilter]);

  const filteredDesigns = activeFilter === "all" 
    ? uiDesigns 
    : uiDesigns.filter((d) => d.category === activeFilter);

  // Slice the array based on visibleCount
  const visibleDesigns = filteredDesigns.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] px-8 py-40 selection:bg-[#ff4f21] selection:text-white font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#ff4f21] mb-6 block">Gallery</span>
            <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.85] italic font-serif mb-10">
              Visual <br /> Exploration.
            </h1>
          </motion.div>
        </header>

        {/* Filter Bar */}
        <div className="flex justify-start mb-20">
          <div className="relative flex items-center bg-zinc-50 border border-zinc-200 p-1.5 rounded-2xl">
            <motion.span
              className="absolute h-9 rounded-xl bg-white shadow-sm border border-zinc-200"
              animate={{ width: indicatorStyle.width, left: indicatorStyle.left }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            {filters.map((filter, index) => (
              <button
                key={filter.value}
                ref={(el) => { buttonRefs.current[index] = el; }}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative z-10 px-6 h-9 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeFilter === filter.value ? "text-[#ff4f21]" : "text-zinc-400 hover:text-zinc-600"}`}
              >
                {filter.icon} {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {visibleDesigns.map((design, index) => (
              <motion.div
                layout
                key={design.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[40px] bg-zinc-100 border border-zinc-200/60 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#ff4f21]/10">
                  <Image src={design.image} alt={design.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                </div>
                <div className="mt-8 px-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium tracking-tight group-hover:text-[#ff4f21] transition-colors">{design.title}</h3>
                    <p className="text-sm text-zinc-400 font-light mt-1 italic font-serif">{design.subtitle}</p>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-200 uppercase tracking-widest">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* LOAD MORE BUTTON */}
        {visibleCount < filteredDesigns.length && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-3 px-8 py-4 bg-white border border-zinc-200 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#ff4f21] hover:text-[#ff4f21] transition-all duration-300 active:scale-95"
            >
              <Plus size={16} />
              Load More Projects
            </button>
          </div>
        )}

        {/* FOOTER CTA */}
        <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-40 text-center py-24 border-t border-zinc-100">
           {/* ... existing footer cta ... */}
        </motion.footer>
      </div>
    </main>
  );
}