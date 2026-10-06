"use client";

import { motion } from "framer-motion";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

const areas = [
  "CMS",
  "SaaS Products",
  "UX Flows",
  "Design Systems",
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t"
      style={{
        backgroundColor: paper,
        borderColor: hairline,
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">

        {/* HEADER */}

        <div
          className="grid border-b py-8 md:grid-cols-[1fr_2fr] md:py-10"
          style={{ borderColor: hairline }}
        >
          <div>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: muted }}
            >
              02 / Experience
            </span>
          </div>

          <div>
            <p
              className="max-w-xl text-sm leading-relaxed md:text-base"
              style={{ color: muted }}
            >
              Currently designing digital products at the intersection
              of UX, visual design and scalable systems.
            </p>
          </div>
        </div>

        {/* ROLE */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid py-12 md:grid-cols-[1fr_2fr] md:py-20"
        >
          <div className="mb-8 md:mb-0">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: muted }}
            >
              2026 — Present
            </span>
          </div>

          <div>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div>
                <h2
                  className="font-serif text-4xl tracking-[-0.035em] md:text-5xl"
                  style={{ color: ink }}
                >
                  UI/UX Designer
                </h2>

                <p
                  className="mt-2 text-base"
                  style={{ color: muted }}
                >
                  Studycrux
                </p>
              </div>

              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: muted }}
              >
                Bengaluru · India
              </span>
            </div>

            <p
              className="mt-8 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: muted }}
            >
              Working across CMS experiences, dashboards, SaaS
              workflows and product interfaces — translating complex
              requirements into clearer user flows, scalable UI and
              reusable design patterns.
            </p>

            <div
              className="mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-4"
              style={{ borderColor: hairline }}
            >
              {areas.map((item) => (
                <div
                  key={item}
                  className="border-b py-4 text-sm sm:border-r sm:px-5 lg:border-b-0"
                  style={{
                    color: muted,
                    borderColor: hairline,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* NOTE */}

        <div
          className="border-t py-6"
          style={{ borderColor: hairline }}
        >
          <p
            className="max-w-2xl text-xs leading-relaxed"
            style={{ color: muted }}
          >
            Selected professional experience is presented at a high
            level. Product-specific details and internal work remain
            private.
          </p>
        </div>
      </div>
    </section>
  );
}