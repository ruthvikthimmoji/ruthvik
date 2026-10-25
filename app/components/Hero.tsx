"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Compass, Layers, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import KineticText from "./KineticText";
import { useIsMac } from "@/app/lib/use-is-mac";

/* =========================================================
   INTERACTIVE MULTIPLAYER CURSORS (Recruiter & Founder)
========================================================= */

function MultiplayerCursor({
  name,
  hint,
  color,
  left,
  top,
  duration,
  delay,
  onClick,
}: {
  name: string;
  hint: string;
  color: string;
  left: string[];
  top: string[];
  duration: number;
  delay: number;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  const loop = {
    duration,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${name} shortcut: ${hint}`}
      className="group pointer-events-auto absolute z-30 hidden cursor-pointer text-left focus:outline-none lg:block"
      initial={{ opacity: 0, left: left[0], top: top[0] }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, left, top }}
      whileHover={{ scale: 1.06 }}
      transition={{ opacity: { delay, duration: 0.4 }, left: loop, top: loop }}
    >
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        fill="none"
        className="drop-shadow-md transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path
          d="M2 2L9.5 20L12.2 12.2L20 9.5L2 2Z"
          fill={color}
          stroke="white"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>

      <span
        className="-mt-1.5 ml-4 flex items-center gap-2 rounded-full rounded-tl-none px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white shadow-lg transition-all duration-200 group-hover:brightness-110"
        style={{ backgroundColor: color }}
      >
        <span className="font-semibold">{name}</span>
        <span className="hidden border-l border-white/30 pl-2 text-[9px] opacity-90 group-hover:inline">
          {hint}
        </span>
      </span>
    </motion.button>
  );
}

/* =========================================================
   3D CHARACTER HERO SHOWCASE (Interactive Tilt & Floating Chips)
========================================================= */

function CharacterShowcase() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const badgeX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const badgeY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1100 }}
      className="relative mx-auto flex w-full max-w-[360px] items-center justify-center lg:max-w-[390px]"
    >
      {/* Ambient Dual-Tone Backdrop Glow matching the character's teal & terracotta palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-accent/25 via-emerald-400/15 to-transparent blur-3xl"
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative w-full"
      >
        {/* Figma Node Top Label Bar */}
        <div className="mb-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            <Sparkles size={11} />
            <span>Ruthvik_Avatar · 3D</span>
          </div>
          <span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] text-accent">
            380 × 460
          </span>
        </div>

        {/* Main Architectural Figma Selection Frame */}
        <div className="relative rounded-2xl border border-accent/60 bg-paper/80 p-2.5 shadow-[0_28px_70px_-15px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors duration-300 group-hover:border-accent">
          {/* 4 Figma Selection Corner Handles */}
          <span className="absolute -left-1.5 -top-1.5 z-20 h-2.5 w-2.5 border border-accent bg-paper" />
          <span className="absolute -right-1.5 -top-1.5 z-20 h-2.5 w-2.5 border border-accent bg-paper" />
          <span className="absolute -bottom-1.5 -left-1.5 z-20 h-2.5 w-2.5 border border-accent bg-paper" />
          <span className="absolute -bottom-1.5 -right-1.5 z-20 h-2.5 w-2.5 border border-accent bg-paper" />

          {/* Character Image Viewport */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-sunken">
            <Image
              src="/avatar-3d.jpg"
              alt="Ruthvik 3D Explorer Character"
              fill
              priority
              sizes="(max-width: 768px) 340px, 390px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Subtle Bottom Vignette for Contrast */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
            />

            {/* Interactive Glossy Light Sweep */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Inside-Frame Bottom Identity Overlay */}
            <div className="absolute inset-x-3.5 bottom-3.5 flex items-end justify-between text-white">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/75">
                  Product Designer
                </span>
                <p className="mt-0.5 font-display text-lg font-semibold leading-tight tracking-tight">
                  Ruthvik P. Thimmoji
                </p>
              </div>
              <span className="rounded-full border border-white/25 bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                Lvl · 2026
              </span>
            </div>
          </div>
        </div>

        {/* Floating Parallax Chip 1 (Top-Left) */}
        <motion.div
          style={{ x: badgeX, y: badgeY }}
          className="pointer-events-none absolute -left-5 top-10 z-30 hidden items-center gap-2 rounded-full border border-hairline-strong bg-paper/95 px-3.5 py-1.5 shadow-xl backdrop-blur-md sm:flex"
        >
          <Compass size={13} className="text-accent" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-ink">
            CS + Product UX
          </span>
        </motion.div>

        {/* Floating Parallax Chip 2 (Bottom-Left) */}
        <motion.div
          style={{ x: badgeX, y: badgeY }}
          className="pointer-events-none absolute -bottom-4 -left-4 z-30 hidden items-center gap-2 rounded-xl border border-hairline-strong bg-paper/95 px-3.5 py-2 shadow-xl backdrop-blur-md sm:flex"
        >
          <Layers size={13} className="text-emerald-400" />
          <span className="font-serif text-xs italic text-ink">
            &ldquo;Zero-guesswork handoff&rdquo;
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isMac = useIsMac();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -70]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-paper text-ink"
    >
      {/* Dot-grid canvas */}
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[130px]"
      />

      {/* Interactive Figma Multiplayer Cursors */}
      <MultiplayerCursor
        name="Recruiter"
        hint="View Résumé ↗"
        color="#6C8CFF"
        left={["44%", "52%", "48%", "44%"]}
        top={["18%", "28%", "22%", "18%"]}
        duration={18}
        delay={1.0}
        onClick={() => window.dispatchEvent(new Event("open-resume"))}
      />
      <MultiplayerCursor
        name="Founder"
        hint="See SaaS Work ↓"
        color="#2FA37A"
        left={["10%", "24%", "16%", "10%"]}
        top={["76%", "68%", "82%", "76%"]}
        duration={20}
        delay={1.5}
        onClick={() => {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 pt-[72px] md:px-10 md:pt-[80px] lg:px-12"
      >
        {/* Frame label row */}
        <div className="flex items-center justify-between border-b border-hairline py-4 md:py-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            <span className="frame-label">Frame 01 — Hero</span>
          </div>
          <span className="frame-label hidden sm:block">Bengaluru · India</span>
        </div>

        {/* 2-Column Hero Grid: Copy on Left, 3D Character Showcase on Right */}
        <div className="grid flex-1 items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          {/* Left Column: Headline, Subheadline & CTAs */}
          <div>
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-3 md:mb-9"
            >
              <span className="flex items-center gap-2 rounded-full border border-hairline bg-sunken/60 px-3 py-1.5">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                  Available for new projects
                </span>
              </span>
              <span className="frame-label">SaaS · Web · Mobile · Systems</span>
            </motion.div>

            {/* Accessible H1 */}
            <h1
              aria-label="Designing digital products that feel obvious."
              className="text-[2.85rem] leading-[0.94] tracking-[-0.05em] sm:text-6xl md:text-7xl xl:text-[6.5rem]"
            >
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                <KineticText
                  text="Designing digital products"
                  base={520}
                  peak={800}
                  className="font-display"
                />
              </motion.span>
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                <KineticText
                  text="that"
                  base={520}
                  peak={800}
                  className="font-display"
                />{" "}
                <KineticText
                  text="feel obvious."
                  base={400}
                  peak={800}
                  className="font-serif italic text-accent"
                />
              </motion.span>
            </h1>

            {/* Verbatim Subheadline Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-[560px] text-base leading-relaxed text-muted md:mt-9 md:text-lg"
            >
              I redesign the parts of SaaS products that quietly lose users —
              confusing onboarding, cluttered dashboards, hesitant checkouts —
              from first wireframe to dev-ready Figma.
            </motion.p>

            {/* Primary CTA Pair */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-4 md:mt-11 md:gap-5"
            >
              <a
                href="#work"
                data-cursor="Scroll"
                className="group flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-85 md:text-base"
              >
                Explore Selected Work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-resume"))}
                className="group flex items-center gap-1.5 px-2 py-3 text-sm text-muted transition-colors hover:text-ink md:text-base"
              >
                View Résumé
                <span
                  aria-hidden="true"
                  className="text-xs text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Character Centerpiece */}
          <CharacterShowcase />
        </div>

        {/* Current role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="grid border-t border-hairline md:grid-cols-2"
        >
          <div className="flex flex-col gap-2 border-b border-hairline py-5 md:border-b-0 md:border-r md:pr-8">
            <span className="frame-label">Currently</span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm md:text-base">
              <span className="font-medium">UX/UI Designer</span>
              <span className="text-muted">@</span>
              <span className="font-medium">Studycrux</span>
              <span className="font-mono text-[10px] text-muted">
                · May 2026 — Present
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-5 md:pl-8">
            <span className="frame-label">Focus</span>
            <span className="text-sm md:text-base">
              SaaS · Product UI · Design Systems · Mobile
            </span>
          </div>
        </motion.div>

        {/* Footer marker */}
        <div className="flex items-center justify-between py-5">
          <span className="frame-label">01 / 08</span>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
            className="hidden items-center gap-2 text-muted transition-colors hover:text-ink sm:flex"
          >
            <kbd className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px]">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
            <span className="frame-label">Jump anywhere</span>
          </button>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="frame-label">Scroll</span>
            <span
              aria-hidden="true"
              className="block h-8 w-px bg-hairline-strong"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}