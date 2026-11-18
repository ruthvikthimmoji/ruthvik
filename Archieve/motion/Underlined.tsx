"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* A hand-drawn orange stroke that draws itself under a word.
   Used once per page at most — it's the "signature". */

export default function Underlined({
  children,
  delay = 1,
  trigger = "mount",
}: {
  children: ReactNode;
  delay?: number;
  trigger?: "mount" | "view";
}) {
  const reduced = useReducedMotion();
  const play = trigger === "mount" ? { animate: { pathLength: 1 } } : { whileInView: { pathLength: 1 }, viewport: { once: true } };

  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.08em] left-0 h-[0.16em] w-full overflow-visible text-accent"
      >
        <motion.path
          d="M3 16 C 70 6, 150 4, 220 9 S 290 14, 297 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduced ? 1 : 0 }}
          {...(reduced ? {} : play)}
          transition={{ delay, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}