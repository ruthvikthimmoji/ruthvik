"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const roles = ["UI/UX Designer", "Problem Solver", "Product Partner"];

export default function Hero() {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);

  // Parallax effects: Using smaller values for mobile or disabling if needed
  const y1 = useTransform(scrollY, [0, 500], [0, -60]); // Reduced pull for smoother mobile feel
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] md:min-h-[90vh] bg-[#fcfaf7] text-[#1a1a1a] px-6 md:px-8 flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle Background Grid - Adjusted size for mobile */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
             backgroundSize: '40px 40px md:60px 60px' 
           }}
      />

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative max-w-6xl mx-auto w-full z-10"
      >
        {/* Animated Role Label */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="h-[1px] w-8 md:w-12 bg-[#ff4f21]/30" />
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[#ff4f21]"
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Hero Headline - Fluid typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.75rem] sm:text-6xl md:text-8xl font-medium tracking-tighter leading-[1] md:leading-[0.95] max-w-5xl"
        >
          Designing products <br className="hidden sm:block" />
          that feel <span className="italic font-serif text-[#ff4f21]">obvious.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 md:mt-12 text-lg md:text-2xl text-zinc-500 max-w-xl leading-relaxed font-light"
        >
          Turning complex SaaS challenges into clear, high-conversion digital experiences.
        </motion.p>

        {/* CTA Section - Stacked on small mobile, row on tablet+ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-10"
        >
          <a
            href="#work"
            className="group relative text-base md:text-lg font-medium overflow-hidden pb-1"
          >
            <span className="relative z-10">View selected work</span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1a1a1a] transition-transform duration-500 -translate-x-full group-hover:translate-x-0" />
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-2">→</span>
          </a>

          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs md:text-sm text-zinc-400 font-medium">Available for freelance</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Reveal - Hidden on small mobile to avoid clutter */}
      <motion.div 
        className="absolute bottom-8 md:bottom-12 left-6 md:left-8 hidden sm:flex flex-col items-center gap-4"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="rotate-90 text-[9px] uppercase tracking-widest text-zinc-400 origin-left">Scroll</span>
        <div className="w-[1px] h-10 md:h-12 bg-zinc-200" />
      </motion.div>
    </section>
  );
}