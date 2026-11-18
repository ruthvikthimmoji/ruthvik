"use client";

import { motion, useReducedMotion } from "framer-motion";
import LocalTime from "./motion/LocalTime";
import Magnetic from "./motion/Magnetic";
import RevealText from "./motion/RevealText";
import Underlined from "./motion/Underlined";

/* =========================================================
   HERO — "Quiet craft"
   - Headline rises line by line from behind a mask
   - An orange stroke draws itself under "obvious"
   - Buttons lean toward the cursor (magnetic)
   - Live Bengaluru time in the at-a-glance row
========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.8, ease: EASE },
        };

  const facts = [
    { label: "Currently", value: "UI/UX Designer at Studycrux" },
    { label: "Focus", value: "SaaS · Fintech · Admin tools" },
    { label: "Toolkit", value: "Figma → React / Next.js" },
    { label: "Local time", value: <LocalTime /> },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative bg-paper pt-[72px] text-ink md:pt-[88px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="pb-16 pt-12 md:pb-24 md:pt-20">
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-hairline-strong px-3.5 py-2 text-[13px] font-normal"
          >
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" />
            Available for full-time product roles
          </motion.p>

          <RevealText
            as="h1"
            id="hero-title"
            trigger="mount"
            delay={0.1}
            className="display-xxl mt-8 md:mt-10"
            lines={[
              "I turn complex",
              "products into",
              <>
                <Underlined delay={1.05}>
                  <em className="emph">obvious</em>
                </Underlined>{" "}
                ones.
              </>,
            ]}
          />

          <motion.div
            {...fade(0.55)}
            className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-[560px] text-lg leading-relaxed text-muted md:text-xl">
              Product designer for SaaS, fintech and admin tools. I design in Figma and build in
              React — so what you see is what gets shipped.
            </p>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <Magnetic>
                <a
                  href="#work"
                  className="block rounded-full bg-ink px-7 py-4 text-center text-[15px] font-medium text-paper"
                >
                  See the work ↓
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("open-resume"))}
                  className="block w-full rounded-full border border-hairline-strong px-7 py-[15px] text-center text-[15px] font-normal transition-colors hover:border-ink"
                >
                  View résumé ↗
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* At a glance */}
        <motion.dl
          {...fade(0.7)}
          className="grid grid-cols-2 gap-y-6 border-t border-hairline py-8 md:grid-cols-4 md:py-10"
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="label-caps">{f.label}</dt>
              <dd className="mt-2 text-[15px] font-normal text-ink md:text-base">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
