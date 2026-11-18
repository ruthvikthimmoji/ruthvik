"use client";

import { motion } from "framer-motion";
import ImageReveal from "./motion/ImageReveal";
import RevealText from "./motion/RevealText";

/* =========================================================
   ABOUT — compact.
   Small photo + one short paragraph, then the path as a
   single row of four steps.
========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Your real photo lives in /public. Swap the file name if needed. */
const PHOTO = "/about.png";

const path = [
  { year: "2018", title: "Computer science" },
  { year: "2023", title: "Graphic design" },
  { year: "2023", title: "Freelance UI/UX" },
  { year: "2026", title: "Studycrux" },
];

export default function About() {
  return (
    <section id="about" className="border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-16 lg:grid-cols-[320px_1fr]">
          <ImageReveal
            src={PHOTO}
            alt="Ruthvik P Thimmoji"
            sizes="(max-width: 768px) 60vw, 320px"
            className="aspect-[4/5] w-2/3 max-w-[320px] md:w-full"
          />

          <div>
            <p className="label-caps">About</p>
            <RevealText
              className="display-l mt-5"
              lines={[
                <>
                  Hi, I’m <em className="emph">Ruthvik.</em>
                </>,
              ]}
            />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              I studied computer science, started out building front-ends, and moved into design to
              shape <em>what</em> gets built — not just how. I design in Figma, think in React, and
              I’m learning 3D on the side.
            </p>
            <a
              href="/Ruthvikresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 border-b border-hairline-strong pb-2 text-sm"
            >
              <span>Download résumé</span>
              <span className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* The path, as one row */}
        <ol className="mt-16 grid grid-cols-2 gap-y-8 border-t border-hairline pt-8 md:mt-20 md:grid-cols-4">
          {path.map((p, i) => (
            <motion.li
              key={`${p.year}-${p.title}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
            >
              <span
                className={`font-display text-3xl leading-none ${
                  i === path.length - 1 ? "text-accent" : "text-ink"
                }`}
              >
                {p.year}
              </span>
              <p className="mt-2 text-sm text-muted">{p.title}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}