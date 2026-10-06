"use client";

import { explorations } from "@/app/data/exploration";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity } from "lucide-react";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

export default function Explorations() {
  return (
    <section
      id="explorations"
      className="border-t"
      style={{
        backgroundColor: paper,
        color: ink,
        borderColor: hairline,
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 border-b py-8 md:flex-row md:items-end md:py-10">
          <div>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: muted }}
            >
              05 / Explorations
            </span>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.035em] md:text-6xl">
              Beyond case studies.
            </h2>
          </div>

          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: muted }}
          >
            A collection of UI explorations, experiments and smaller
            pieces of interface work that reflect how I think visually.
          </p>
        </div>

        {/* EXPLORATION LIST */}

        <div className="py-12 md:py-16">

          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity
                size={15}
                strokeWidth={1.4}
                style={{ color: accent }}
              />

              <span
                className="font-mono text-[9px] uppercase tracking-[0.25em]"
                style={{ color: muted }}
              >
                Things I&apos;m exploring
              </span>
            </div>

            <span
              className="font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ color: muted }}
            >
              {String(explorations.length).padStart(2, "0")} projects
            </span>
          </div>

          <div
            className="border-t"
            style={{
              borderColor: hairline,
            }}
          >
            {explorations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border-b py-8 md:py-10"
                style={{
                  borderColor: hairline,
                }}
              >
                <div className="grid gap-6 md:grid-cols-[70px_1fr_auto] md:items-center">

                  {/* NUMBER */}

                  <span
                    className="font-mono text-[10px] tracking-[0.15em]"
                    style={{
                      color: muted,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* CONTENT */}

                  <div>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                      <h3
                        className="font-serif text-2xl tracking-[-0.025em] md:text-3xl"
                        style={{
                          color: ink,
                        }}
                      >
                        {item.title}
                      </h3>

                      <span
                        className="w-fit border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em]"
                        style={{
                          color: muted,
                          borderColor: hairline,
                        }}
                      >
                        {item.type}
                      </span>
                    </div>

                    <p
                      className="mt-3 max-w-2xl text-sm leading-relaxed md:text-base"
                      style={{
                        color: muted,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* STATUS */}

                  <div className="flex flex-col gap-4 md:min-w-[220px] md:items-end">
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono text-[9px] uppercase tracking-widest"
                        style={{
                          color: accent,
                        }}
                      >
                        {item.status}
                      </span>

                      <span
                        className="font-mono text-[10px]"
                        style={{
                          color: muted,
                        }}
                      >
                        {item.progress}%
                      </span>
                    </div>

                    <div
                      className="h-px w-full overflow-hidden md:w-48"
                      style={{
                        backgroundColor: hairline,
                      }}
                    >
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: `${item.progress}%`,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 0.3,
                          ease: "circOut",
                        }}
                        className="h-full"
                        style={{
                          backgroundColor: accent,
                        }}
                      />
                    </div>
                  </div>

                  {/* ARROW */}

                  <div className="hidden md:block">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.2}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      style={{
                        color: accent,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER NOTE */}

        <div
          className="flex flex-col gap-3 border-t py-8 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: hairline,
          }}
        >
          <span
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{
              color: muted,
            }}
          >
            UI exploration · Systems · Visual experiments
          </span>

          <span
            className="text-xs italic"
            style={{
              color: muted,
            }}
          >
            More work on the UI gallery →
          </span>
        </div>
      </div>
    </section>
  );
}