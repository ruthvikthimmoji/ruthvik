"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const roles = ["UI/UX Designer", "Problem Solver", "Product Partner"];

export default function Hero() {
  const { scrollY } = useScroll();

  /* ───────── Animated word */
  const obviousY = useTransform(scrollY, [0, 200], [0, -24]);
  const obviousOpacity = useTransform(scrollY, [0, 160], [1, 0.6]);

  /* ───────── Role switch */
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  /* ───────── Cursor glow */
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <section
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="
        relative min-h-screen
     bg-[#f6f4ef]
        text-[#111]
        px-6
        flex items-center
        overflow-hidden
      "
    >
      {/* Cursor Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            500px at ${cursor.x}px ${cursor.y}px,
            rgba(249,87,56,0.08),
            transparent 70%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto">
        {/* Role Switch */}
        <motion.p
          key={roleIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="
            text-xs uppercase
            tracking-[0.35em]
            text-neutral-500
            mb-10
          "
        >
          {roles[roleIndex]}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="
            text-4xl md:text-6xl lg:text-7xl
            font-medium
            leading-[1.1]
            text-[#111]
            max-w-4xl
          "
        >
          Designing products
          <br />
          that feel{" "}
          <motion.span
            style={{ y: obviousY, opacity: obviousOpacity }}
            className="text-[color:var(--primary)] inline-block"
          >
            obvious
          </motion.span>
          .
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="
            mt-10
            text-lg md:text-xl
            text-neutral-400
            max-w-2xl
          "
        >
          I help startups and teams turn complex ideas into clear, usable, and
          human digital experiences.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex items-center gap-8"
        >
          <a
            href="#work"
            className="
              inline-flex items-center
              text-lg font-medium
             text-[color:var(--primary)]
              group
            "
          >
            View selected work
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#contact"
            className="
              text-sm text-neutral-500
              hover:text-[#111]
              transition
            "
          >
            Available for freelance
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollY.get() > 40 ? 0 : 1 }}
        className="
          absolute bottom-10 left-1/2
          -translate-x-1/2
          text-m tracking-widest
          text-neutral-500
        "
      >
        Scroll ↓
      </motion.div>

      {/* Grain */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/textures/noise.jpg')]
          opacity-[0.04]
          mix-blend-overlay
        "
      />
    </section>
  );
}
