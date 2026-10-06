"use client";

import type { CaseStudy } from "@/app/data/case-studies";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const accent = "#C86B3C";
const hairline = "rgba(17, 17, 17, 0.14)";

const typeLabels: Record<CaseStudy["type"], string> = {
  professional: "Professional Work",
  client: "Client Project",
  concept: "Personal Concept",
};

export default function CaseStudyClient({
  project,
}: {
  project: CaseStudy;
}) {
  const { scrollYProgress } = useScroll();

  const imageY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -20]
  );

  /*
   * Only show process sections that have real content
   * (images or items).
   *
   * Text-only placeholder sections stay hidden until
   * material is added.
   */
  const visibleSections = project.sections.filter(
    (section) =>
      (section.images?.length ?? 0) > 0 ||
      (section.items?.length ?? 0) > 0
  );

  /*
   * Numbering is computed from what is actually rendered,
   * so labels never skip or clash when a section is hidden.
   */
  const order = [
    "overview",
    project.problem ? "problem" : null,
    project.responsibilities.length > 0
      ? "contribution"
      : null,
    ...visibleSections.map(
      (section) => `section:${section.id}`
    ),
    project.outcome ? "outcome" : null,
    project.learnings?.length ? "learnings" : null,
  ].filter(Boolean) as string[];

  const num = (key: string) =>
    String(order.indexOf(key) + 1).padStart(2, "0");

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: paper,
        color: ink,
      }}
    >
      <style>{`
        ::selection {
          background: ${accent};
          color: ${paper};
        }
      `}</style>

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b bg-[#F7F6F2]/90 px-5 py-4 backdrop-blur-md md:px-8"
        style={{
          borderColor: hairline,
        }}
      >
        <Link
          href="/#work"
          className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{
            color: muted,
          }}
          aria-label="Back to work"
        >
          <ArrowLeft
            size={13}
            strokeWidth={1.4}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span className="hidden sm:inline">
            Back to work
          </span>
        </Link>

        <span
          className="font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{
            color: muted,
          }}
        >
          {typeLabels[project.type]}
        </span>
      </div>

      {/* =====================================================
          READING PROGRESS
      ===================================================== */}

      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX: scrollYProgress,
          backgroundColor: accent,
        }}
      />

      <article className="mx-auto max-w-[1440px] px-5 pt-28 md:px-10 md:pt-36 lg:px-12">

        {/* ===================================================
            HERO
        =================================================== */}

        <header
          className="border-b pb-16 md:pb-24"
          style={{
            borderColor: hairline,
          }}
        >
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">

            <div>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.25em]"
                style={{
                  color: muted,
                }}
              >
                {project.year} / {typeLabels[project.type]}
              </span>
            </div>

            <div>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-8xl"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                }}
                className="mt-8 max-w-2xl text-xl leading-relaxed md:text-2xl"
                style={{
                  color: muted,
                }}
              >
                {project.tagline}
              </motion.p>
            </div>
          </div>

          {/* PROJECT META */}

          <div
            className="mt-14 grid border-t sm:grid-cols-2 md:grid-cols-4"
            style={{
              borderColor: hairline,
            }}
          >
            <Meta
              label="Role"
              value={project.role}
            />

            <Meta
              label="Duration"
              value={project.duration}
            />

            <Meta
              label="Platform"
              value={project.platform}
            />

            <Meta
              label="Tools"
              value={project.tools.join(" · ")}
            />
          </div>
        </header>

        {/* ===================================================
            HERO IMAGE
        =================================================== */}

        <motion.div
          style={{
            y: imageY,
          }}
          className="py-12 md:py-20"
        >
          <div
            className="overflow-hidden border"
            style={{
              borderColor: hairline,
              backgroundColor: "#ECEAE5",
            }}
          >
            <img
              src={project.image}
              alt={`${project.title} project`}
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        <section
          className="grid gap-10 border-t py-16 md:grid-cols-[1fr_2fr] md:py-24"
          style={{
            borderColor: hairline,
          }}
        >
          <SectionLabel
            number={num("overview")}
            label="Overview"
          />

          <p className="max-w-3xl font-serif text-2xl leading-relaxed tracking-[-0.02em] md:text-4xl">
            {project.overview}
          </p>
        </section>

        {/* ===================================================
            PROBLEM
        =================================================== */}

        {project.problem && (
          <section
            className="grid gap-10 border-t py-16 md:grid-cols-[1fr_2fr] md:py-24"
            style={{
              borderColor: hairline,
            }}
          >
            <SectionLabel
              number={num("problem")}
              label="Problem"
            />

            <p className="max-w-3xl font-serif text-2xl leading-relaxed md:text-4xl">
              {project.problem}
            </p>
          </section>
        )}

        {/* ===================================================
            CONTRIBUTION
        =================================================== */}

        {project.responsibilities.length > 0 && (
          <section
            className="grid gap-10 border-t py-16 md:grid-cols-[1fr_2fr] md:py-24"
            style={{
              borderColor: hairline,
            }}
          >
            <SectionLabel
              number={num("contribution")}
              label="My Contribution"
            />

            <div className="grid sm:grid-cols-2">
              {project.responsibilities.map(
                (item, index) => (
                  <div
                    key={item}
                    className="border-b py-5 first:border-t sm:nth-[2]:border-t sm:nth-[3]:border-t"
                    style={{
                      borderColor: hairline,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono text-[9px]"
                        style={{
                          color: accent,
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm md:text-base">
                        {item}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* ===================================================
            PROCESS SECTIONS
            Only sections with images or items are rendered.
        =================================================== */}

        {visibleSections.map((section) => (
          <section
            key={section.id}
            className="border-t py-16 md:py-24"
            style={{
              borderColor: hairline,
            }}
          >
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">

              <SectionLabel
                number={num(`section:${section.id}`)}
                label={section.label.replace(
                  /^\d+\s*\/\s*/,
                  ""
                )}
              />

              <div>

                {/* SECTION TITLE */}

                {section.title && (
                  <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
                    {section.title}
                  </h2>
                )}

                {/* SECTION DESCRIPTION */}

                {section.description && (
                  <p
                    className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
                    style={{
                      color: muted,
                    }}
                  >
                    {section.description}
                  </p>
                )}

                {/* SECTION IMAGES */}

                {section.images?.map(
                  (image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="mt-10 overflow-hidden border"
                      style={{
                        borderColor: hairline,
                      }}
                    >
                      <img
                        src={image}
                        alt={`${project.title} — ${
                          section.title ?? "design"
                        }`}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )
                )}

                {/* SECTION ITEMS */}

                {section.items &&
                  section.items.length > 0 && (
                    <div
                      className="mt-10 border-t"
                      style={{
                        borderColor: hairline,
                      }}
                    >
                      {section.items.map(
                        (item, index) => (
                          <div
                            key={item}
                            className="flex gap-5 border-b py-5"
                            style={{
                              borderColor: hairline,
                            }}
                          >
                            <span
                              className="font-mono text-[9px]"
                              style={{
                                color: accent,
                              }}
                            >
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span>{item}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            </div>
          </section>
        ))}

        {/* ===================================================
            OUTCOME
        =================================================== */}

        {project.outcome && (
          <section
            className="border-y py-20 md:py-32"
            style={{
              borderColor: hairline,
            }}
          >
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">

              <SectionLabel
                number={num("outcome")}
                label="Outcome"
              />

              <p className="max-w-4xl font-serif text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
                {project.outcome}
              </p>

            </div>
          </section>
        )}

        {/* ===================================================
            LEARNINGS
        =================================================== */}

        {project.learnings &&
          project.learnings.length > 0 && (
            <section
              className="grid gap-10 border-b py-16 md:grid-cols-[1fr_2fr] md:py-24"
              style={{
                borderColor: hairline,
              }}
            >
              <SectionLabel
                number={num("learnings")}
                label="Learnings"
              />

              <div>
                {project.learnings.map(
                  (learning, index) => (
                    <div
                      key={learning}
                      className="flex gap-6 border-b py-6 first:border-t"
                      style={{
                        borderColor: hairline,
                      }}
                    >
                      <span
                        className="font-mono text-[9px]"
                        style={{
                          color: accent,
                        }}
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p className="max-w-2xl text-base leading-relaxed md:text-lg">
                        {learning}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

        {/* ===================================================
            FIGMA PROTOTYPE
        =================================================== */}

        {project.figmaEmbed && (
          <section className="py-20 md:py-32">
            <div className="mb-10 flex items-end justify-between gap-6">

              <div>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{
                    color: accent,
                  }}
                >
                  Prototype
                </span>

                <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em] md:text-5xl">
                  Explore the design
                </h2>
              </div>

              <ExternalLink
                size={18}
                strokeWidth={1.2}
                aria-hidden="true"
                style={{
                  color: muted,
                }}
              />
            </div>

            <div
              className="aspect-video overflow-hidden border"
              style={{
                borderColor: hairline,
              }}
            >
              <iframe
                src={project.figmaEmbed}
                title={`${project.title} Figma prototype`}
                className="h-full w-full"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer
          className="border-t py-20 md:py-32"
          style={{
            borderColor: hairline,
          }}
        >
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <div>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{
                  color: muted,
                }}
              >
                More work
              </span>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
                Explore more product design work.
              </h2>
            </div>

            <Link
              href="/#work"
              className="group flex shrink-0 items-center gap-3 border-b pb-2 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                borderColor: hairline,
              }}
            >
              View selected work

              <ArrowRight
                size={14}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{
                  color: accent,
                }}
              />
            </Link>

          </div>
        </footer>
      </article>
    </motion.main>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="font-mono text-[9px]"
        style={{
          color: accent,
        }}
      >
        {number}
      </span>

      <span
        className="font-mono text-[9px] uppercase tracking-[0.25em]"
        style={{
          color: muted,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Meta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="border-b py-5 sm:nth-[odd]:border-r sm:nth-[even]:border-r md:border-b-0 md:border-r md:last:border-r-0 md:px-6 md:first:pl-0"
      style={{
        borderColor: hairline,
      }}
    >
      <span
        className="block font-mono text-[9px] uppercase tracking-[0.2em]"
        style={{
          color: muted,
        }}
      >
        {label}
      </span>

      <span className="mt-2 block text-sm">
        {value}
      </span>
    </div>
  );
}