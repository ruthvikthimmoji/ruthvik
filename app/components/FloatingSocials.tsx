"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../data/socials";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / OngoingWork.tsx / Projects.tsx.
// ---------------------------------------------------------------------------
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.2)";

// Desktop-only by design: on small screens this would eat scarce space and
// compete with thumb-reach content, so mobile visitors find these socials
// in the Footer instead. Nothing here needs a button, a card, or a state —
// it's just text, quiet in the corner, always there.
export default function FloatingSocials() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="hidden md:flex fixed bottom-8 left-8 z-40 flex-col items-start gap-2.5"
    >
      <span
        className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1"
        style={{ color: brass }}
      >
        Elsewhere
      </span>

      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group font-mono text-[10px] uppercase tracking-[0.15em] transition-colors"
          style={{ color: graphite }}
          onMouseEnter={(e) => (e.currentTarget.style.color = paper)}
          onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
        >
          <span className="inline-flex items-center gap-1.5">
            <span
              className="w-2 h-[1px] transition-all duration-300 group-hover:w-3"
              style={{ backgroundColor: brass }}
            />
            {link.name}
          </span>
        </a>
      ))}

      <div className="w-[1px] h-8 mt-1" style={{ backgroundColor: hairline }} />
    </motion.div>
  );
}