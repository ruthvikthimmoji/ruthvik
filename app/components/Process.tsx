"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Understand users, business goals, constraints and the context behind the problem.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Map flows, information architecture and interaction patterns before visual execution.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Turn the structure into clear interfaces, components and responsive experiences.",
  },
  {
    number: "04",
    title: "Iterate",
    description:
      "Test, gather feedback and refine the experience instead of treating the first version as final.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="border-t bg-[#111111] text-[#F7F6F2]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">

        <div className="grid border-b border-white/[0.14] py-8 md:grid-cols-[1fr_2fr] md:py-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
              03 / How I work
            </span>
          </div>

          <div>
            <p className="max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
              I like understanding the problem before jumping into
              polished screens. The process changes with the product,
              but the thinking stays structured.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-b border-white/[0.14] py-10 md:border-r md:px-7 lg:min-h-[280px] lg:py-12"
            >
              <span className="font-mono text-[10px] text-[#C86B3C]">
                {step.number}
              </span>

              <h3 className="mt-8 font-serif text-3xl tracking-[-0.03em]">
                {step.title}
              </h3>

              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}