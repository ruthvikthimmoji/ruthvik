"use client";

import { projects, workTypeLabels } from "@/app/data/projects";
import { caseStudies } from "@/app/data/case-studies";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

export default function Projects() {
  const selectedProjects = projects.filter(
    (project) => project.featured
  );

  return (
    <section
      id="work"
      className="relative overflow-hidden border-t"
      style={{
        backgroundColor: paper,
        color: ink,
        borderColor: hairline,
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* HEADER */}

        <div
          className="grid border-b py-10 md:grid-cols-[1fr_2fr] md:py-14"
          style={{ borderColor: hairline }}
        >
          <div>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: muted }}
            >
              01 / Selected Work
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-serif text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl md:text-7xl">
              Product design work
              <br />
              across{" "}
              <span className="italic" style={{ color: accent }}>
                SaaS, mobile
              </span>{" "}
              and digital products.
            </h2>

            <span
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: muted }}
            >
              {String(selectedProjects.length).padStart(2, "0")} selected
            </span>
          </div>
        </div>

        {/* PROJECTS */}

        <div>
          {selectedProjects.map((project, index) => {
            const hasCaseStudy = caseStudies.some(
              (caseStudy) => caseStudy.slug === project.slug
            );

            const content = (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group py-12 md:py-20"
              >
                {/* META */}

                <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span
                    className="font-mono text-[10px] tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-px w-8 md:w-12"
                    style={{ backgroundColor: hairline }}
                  />

                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: muted }}
                  >
                    {project.category}
                  </span>

                  <span
                    className="border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{ color: accent, borderColor: hairline }}
                  >
                    {workTypeLabels[project.type]}
                  </span>
                </div>

                {/* TITLE + SINGLE CTA */}

                <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                  <h3 className="font-serif text-4xl tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl md:text-6xl">
                    {project.title}
                  </h3>

                  {hasCaseStudy ? (
                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: muted }}
                    >
                      <span>View case study</span>

                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.3}
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                        style={{ color: accent }}
                      />
                    </div>
                  ) : project.type === "professional" ? (
                    <span className="text-sm" style={{ color: muted }}>
                      Details available on request
                    </span>
                  ) : null}
                </div>

                {/* IMAGE */}

                <div
                  className="relative overflow-hidden border"
                  style={{
                    borderColor: hairline,
                    backgroundColor: "#ECEAE5",
                  }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden md:aspect-[2/1]">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1440px) 100vw, 1440px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />

                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 60%, rgba(17,17,17,0.12))",
                      }}
                    />

                    {/* Hover-only affordance, not a second CTA */}

                    {hasCaseStudy && (
                      <div
                        aria-hidden="true"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border bg-[#F7F6F2]/90 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 md:right-6 md:top-6"
                        style={{ borderColor: hairline }}
                      >
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.3}
                          style={{ color: ink }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* INFORMATION */}

                <div
                  className="mt-6 grid gap-8 border-b pb-12 md:grid-cols-[1fr_2fr] md:pb-16"
                  style={{ borderColor: hairline }}
                >
                  <div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: muted }}
                    >
                      Overview
                    </span>
                  </div>

                  <div>
                    <p
                      className="max-w-2xl text-base leading-relaxed md:text-lg"
                      style={{ color: muted }}
                    >
                      {project.description}
                    </p>

                    {/* PROJECT META */}

                    <div
                      className="mt-10 grid border-t sm:grid-cols-3"
                      style={{ borderColor: hairline }}
                    >
                      <div
                        className="border-b py-4 sm:border-b-0 sm:border-r sm:pr-5"
                        style={{ borderColor: hairline }}
                      >
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.2em]"
                          style={{ color: muted }}
                        >
                          Role
                        </span>
                        <p className="mt-2 text-sm">{project.role}</p>
                      </div>

                      <div
                        className="border-b py-4 sm:border-b-0 sm:border-r sm:px-5"
                        style={{ borderColor: hairline }}
                      >
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.2em]"
                          style={{ color: muted }}
                        >
                          Platform
                        </span>
                        <p className="mt-2 text-sm">{project.platform}</p>
                      </div>

                      <div className="py-4 sm:pl-5">
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.2em]"
                          style={{ color: muted }}
                        >
                          Year
                        </span>
                        <p className="mt-2 text-sm">{project.year}</p>
                      </div>
                    </div>

                    {/* CONTRIBUTION */}

                    <div className="mt-8">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: muted }}
                      >
                        Contribution
                      </span>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.contribution.map((item) => (
                          <span
                            key={item}
                            className="border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                            style={{ color: muted, borderColor: hairline }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );

            if (!hasCaseStudy) {
              return <div key={project.slug}>{content}</div>;
            }

            return (
              <Link
                key={project.slug}
                href={`/case-study/${project.slug.toLowerCase()}`}
                aria-label={`${project.title} case study`}
                className="block"
              >
                {content}
              </Link>
            );
          })}
        </div>

        {/* ALL WORK */}

        {projects.length > selectedProjects.length && (
          <div
            className="flex justify-end border-t py-8 md:py-10"
            style={{ borderColor: hairline }}
          >
            <Link
              href="/ui-designs"
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: muted }}
            >
              <span className="transition-colors duration-300 group-hover:text-[#111111]">
                Explore more work
              </span>

              <ArrowUpRight
                size={13}
                strokeWidth={1.4}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                style={{ color: accent }}
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
