"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], [0, -70]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: paper,
        color: ink,
      }}
    >
      {/* ============================================================
          HAIRLINE GRID
          ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              ${hairline} 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              ${hairline} 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 78%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 78%)",
          opacity: 0.32,
        }}
      />

      {/* ============================================================
          MAIN CONTAINER
          ============================================================ */}

      <motion.div
        style={{
          y,
          opacity,
        }}
        className="
          relative z-10 mx-auto flex min-h-screen
          w-full max-w-[1440px] flex-col
          px-6 md:px-10 lg:px-12
        "
      >
        {/* ============================================================
            TOP META
            ============================================================ */}

        <div
          className="
            flex items-center justify-between
            border-b py-4 md:py-5
          "
          style={{
            borderColor: hairline,
          }}
        >
          {/* Role */}

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: accent,
              }}
            />

            <span
              className="
                font-mono text-[9px]
                uppercase tracking-[0.22em]
                md:text-[10px]
              "
              style={{
                color: muted,
              }}
            >
              UI/UX Designer · Product Design
            </span>
          </div>

          {/* Location */}

          <span
            className="
              hidden font-mono text-[9px]
              uppercase tracking-[0.22em]
              sm:block md:text-[10px]
            "
            style={{
              color: muted,
            }}
          >
            Bengaluru · India
          </span>
        </div>

        {/* ============================================================
            HERO CONTENT
            ============================================================ */}

        <div
          className="
            flex flex-1 flex-col
            justify-center
            py-20 md:py-24 lg:py-28
          "
        >
          {/* Eyebrow */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mb-7 flex items-center gap-3
              md:mb-9
            "
          >
            <span
              className="
                font-mono text-[9px]
                uppercase tracking-[0.28em]
                md:text-[10px]
              "
              style={{
                color: muted,
              }}
            >
              SaaS · Web · Mobile · Systems
            </span>
          </motion.div>

          {/* ============================================================
              MAIN HEADLINE
              ============================================================ */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              max-w-[1120px]
              font-serif font-medium
              text-[3.5rem]
              leading-[0.92]
              tracking-[-0.045em]
              sm:text-6xl
              md:text-8xl
              lg:text-[9rem]
            "
          >
            Designing products
            <br />

            <span
              className="italic"
              style={{
                color: accent,
              }}
            >
              that feel obvious.
            </span>
          </motion.h1>

          {/* ============================================================
              DESCRIPTION
              ============================================================ */}

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mt-8 max-w-[650px]
              text-base leading-relaxed
              md:mt-10 md:text-lg
              lg:text-xl
            "
            style={{
              color: muted,
            }}
          >
            I design clear, scalable digital experiences for SaaS,
            web and mobile products — with a strong focus on UI,
            interaction and systems thinking.
          </motion.p>

          {/* ============================================================
              CTA
              ============================================================ */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.7,
            }}
            className="
              mt-10 flex flex-wrap
              items-center gap-7
              md:mt-12 md:gap-9
            "
          >
            {/* Selected Work */}

            <a
              href="#work"
              className="
                group flex items-center
                gap-3 text-sm font-medium
                md:text-base
              "
            >
              <span>View selected work</span>

              <span
                aria-hidden="true"
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                style={{
                  color: accent,
                }}
              >
                →
              </span>
            </a>

            {/* Divider */}

            <span
              aria-hidden="true"
              className="hidden h-5 w-px sm:block"
              style={{
                backgroundColor: hairline,
              }}
            />

            {/* Resume */}

            <a
              href="/Ruthvikresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center
                gap-2 text-sm md:text-base
              "
              style={{
                color: muted,
              }}
            >
              <span
                className="
                  transition-colors
                  group-hover:text-[#111111]
                "
              >
                View résumé
              </span>

              <span
                aria-hidden="true"
                className="
                  text-xs transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
                style={{
                  color: accent,
                }}
              >
                ↗
              </span>
            </a>
          </motion.div>
        </div>

        {/* ============================================================
            CURRENT ROLE
            ============================================================ */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.65,
            duration: 0.8,
          }}
          className="
            grid border-t
            md:grid-cols-2
          "
          style={{
            borderColor: hairline,
          }}
        >
          {/* Current Role */}

          <div
            className="
              flex flex-col gap-2
              border-b py-5
              md:border-b-0
              md:border-r md:pr-8
            "
            style={{
              borderColor: hairline,
            }}
          >
            <span
              className="
                font-mono text-[8px]
                uppercase tracking-[0.25em]
                md:text-[9px]
              "
              style={{
                color: muted,
              }}
            >
              Currently
            </span>

            <div
              className="
                flex flex-wrap
                items-center
                gap-x-2 gap-y-1
                text-sm md:text-base
              "
            >
              <span className="font-medium">
                UX/UI Designer
              </span>

              <span
                style={{
                  color: muted,
                }}
              >
                @
              </span>

              <span className="font-medium">
                Studycrux
              </span>

              <span
                className="
                  font-mono text-[9px]
                  md:text-[10px]
                "
                style={{
                  color: muted,
                }}
              >
                · Jun 2026 — Present
              </span>
            </div>
          </div>

          {/* Focus */}

          <div
            className="
              flex flex-col gap-2
              py-5 md:pl-8
            "
          >
            <span
              className="
                font-mono text-[8px]
                uppercase tracking-[0.25em]
                md:text-[9px]
              "
              style={{
                color: muted,
              }}
            >
              Focus
            </span>

            <span className="text-sm md:text-base">
              SaaS · Product UI · Design Systems · Mobile
            </span>
          </div>
        </motion.div>

        {/* ============================================================
            FOOTER MARKER
            ============================================================ */}

        <div
          className="
            flex items-center
            justify-between py-5
          "
        >
          <span
            className="
              font-mono text-[8px]
              uppercase tracking-[0.25em]
              md:text-[9px]
            "
            style={{
              color: muted,
            }}
          >
            01 / 05
          </span>

          <div
            className="
              hidden items-center gap-3
              sm:flex
            "
          >
            <span
              className="
                font-mono text-[8px]
                uppercase tracking-[0.25em]
                md:text-[9px]
              "
              style={{
                color: muted,
              }}
            >
              Scroll
            </span>

            <span
              aria-hidden="true"
              className="block h-8 w-px"
              style={{
                backgroundColor: hairline,
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}