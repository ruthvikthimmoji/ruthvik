"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* Line-by-line masked reveal: each line slides up from behind an
   invisible edge. The signature text motion used for every heading. */

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  delay?: number;
  /** "mount" = plays on page load (hero). "view" = plays when scrolled into view. */
  trigger?: "mount" | "view";
};

export default function RevealText({
  lines,
  as: Tag = "h2",
  className,
  id,
  delay = 0,
  trigger = "view",
}: Props) {
  const reduced = useReducedMotion();

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        // pb/-mb keeps descenders (g, p, y) from being clipped by the mask
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          {reduced ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              {...(trigger === "mount"
                ? { animate: { y: "0%" } }
                : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-10% 0px" } })}
              transition={{ delay: delay + i * 0.09, duration: 0.95, ease: EASE }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}