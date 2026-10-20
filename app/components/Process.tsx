"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Understand users, business goals, and context before touching visual design.",
    ask: "What is quietly losing users today?",
    outputs: ["UX audit", "Friction mapping", "Problem framing"],
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Map flows, information architecture, and interactions before visual execution.",
    ask: "What should the user do next, at every step?",
    outputs: ["User flows", "IA mapping", "Lo-fi wireframes"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "Translate wireframes into responsive systems, design tokens, and dev-ready UI.",
    ask: "What can engineers build without guessing?",
    outputs: ["Design systems", "Component variants", "Hi-fi UI"],
  },
  {
    number: "04",
    title: "Iterate",
    description:
      "Prototype, test with real users, and refine based on feedback and engineering handoff.",
    ask: "What did we get wrong in version one?",
    outputs: ["Interactive prototypes", "Usability rounds", "Dev specs"],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Compact Header */}
        <div className="grid items-baseline gap-4 border-b border-hairline py-8 md:grid-cols-[1fr_2.5fr] md:py-10">
          <div className="flex items-center gap-3">
            <span className="frame-label">04 / Methodology</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              4 Phases
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-baseline">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              From ambiguity to predictable execution.
            </h2>
            <p className="max-w-md text-xs leading-relaxed text-muted sm:text-sm">
              Structured thinking upfront saves engineering cycles downstream.
            </p>
          </div>
        </div>

        {/* Compact 4-Column Pipeline Grid */}
        <div className="grid grid-cols-1 divide-y divide-hairline border-b border-hairline sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between p-6 transition-colors duration-300 hover:bg-sunken/40 md:p-8"
            >
              {/* Top Meta Bar */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <ArrowRight
                      size={13}
                      className="hidden text-hairline-strong opacity-40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100 lg:block"
                    />
                  )}
                </div>

                {/* Step Title */}
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                  {step.title}
                </h3>

                {/* Core Guiding Question */}
                <p className="mt-3 font-serif text-sm italic leading-snug text-accent">
                  “{step.ask}”
                </p>

                {/* Concise Description */}
                <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                  {step.description}
                </p>
              </div>

              {/* Bottom Deliverables Chips */}
              <div className="mt-8 border-t border-hairline pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  Outputs
                </span>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {step.outputs.map((out) => (
                    <li
                      key={out}
                      className="rounded-md border border-hairline bg-paper/60 px-2 py-0.5 font-mono text-[10px] text-muted transition-colors group-hover:border-hairline-strong group-hover:text-ink"
                    >
                      {out}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}