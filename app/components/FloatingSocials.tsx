"use client";
import React from "react";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../data/socials";

const FloatingSocials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      // Responsive classes: 
      // Mobile: Horizontal bar at bottom center
      // Desktop (lg): Vertical bar at bottom right
      className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-10 z-50 flex lg:flex-col items-center justify-center lg:justify-start gap-6 lg:gap-8 px-6 py-4 lg:p-0"
    >
      <div className="flex flex-row lg:flex-col gap-6 lg:gap-6 mb-0 lg:mb-4 bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none px-6 py-3 lg:p-0 rounded-full lg:rounded-none border border-zinc-200 lg:border-none shadow-xl lg:shadow-none">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-1 text-zinc-400 hover:text-[#ff4f21] transition-all duration-300"
          >
            {/* The Icon */}
            <link.icon
              size={22} // Slightly larger for better mobile touch target
              strokeWidth={1.5}
              className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
            />

            {/* Tooltip - Only visible on desktop (hidden on touch) */}
            <span className="hidden lg:block absolute right-10 scale-0 group-hover:scale-100 transition-all duration-300 origin-right px-2 py-1 rounded bg-zinc-900 text-[10px] text-white uppercase tracking-widest font-bold pointer-events-none">
              {link.name}
            </span>
          </a>
        ))}
      </div>

      {/* The Architectural Anchor Line - Hidden on Mobile */}
      <div className="hidden lg:block w-[1px] h-24 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#ff4f21] to-transparent"
        />
      </div>
    </motion.div>
  );
};

export default FloatingSocials;