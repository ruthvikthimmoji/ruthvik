"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { hasCaseStudy } from "@/app/data/case-studies";
import {
  projects,
  workTypeLabels,
  type ProjectCard,
} from "@/app/data/projects";

/* =========================================================
   ONE PROJECT ITEM
========================================================= */

function WorkItem({
  project,
  index,
}: {
  project: ProjectCard;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Only published case studies are linkable
  const linked = hasCaseStudy(project.slug);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);

  const article = (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative -mx-4 rounded-2xl p-4 transition-colors duration-500 hover:bg-sunken/30 sm:-mx-6 sm:p-6 md:-mx-8 md:p-8"
    >
      {/* Top Meta Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-hairline-strong md:w-10" />
          <span className="frame-label">{project.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
            {workTypeLabels[project.type]}
          </span>
        </div>
      </div>

      {/* Title & Interactive Action */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink transition-colors duration-300 group-hover:text-accent sm:text-5xl md:text-6xl">
            {project.title}
          </h3>
        </div>

        <div className="shrink-0">
          {linked ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-4 py-2 text-xs font-medium tracking-wide text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white sm:text-sm">
              <span>View Case Study</span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          ) : project.type === "professional" ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-3.5 py-1.5 font-mono text-[11px] text-muted">
              <Lock size={12} aria-hidden="true" />
              Under NDA · Details on request
            </span>
          ) : null}
        </div>
      </div>

      {/* Showcase Device Frame */}
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-sunken shadow-sm transition-all duration-500 group-hover:border-hairline-strong group-hover:shadow-md">
        {/* Mockup Frame Header */}
        <div className="flex items-center justify-between border-b border-hairline bg-paper/60 px-4 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-hairline-strong/60" />
            <span className="h-2 w-2 rounded-full bg-hairline-strong/60" />
            <span className="h-2 w-2 rounded-full bg-hairline-strong/60" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {project.platform} Showcase
          </span>
          <span className="font-mono text-[10px] text-muted">{project.year}</span>
        </div>

        {/* Image with Parallax & Hover Scaling */}
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-[2.1/1]">
          <motion.div
            className="absolute inset-x-0 -inset-y-[3%]"
            style={reduced ? undefined : { y: imageY }}
          >
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              fill
              priority={index === 0}
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </motion.div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </div>

      {/* Information Ledger */}
      <div className="mt-8 grid gap-8 border-b border-hairline pb-10 md:grid-cols-[1fr_2.2fr] md:pb-14">
        <div>
          <span className="frame-label">Overview &amp; Scope</span>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Key product objectives and design contributions executed during this engagement.
          </p>
        </div>

        <div className="space-y-8">
          <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {project.description}
          </p>

          {/* Metadata Specs */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-hairline bg-paper/50 p-4 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                Role
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                Platform
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{project.platform}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                Timeline
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{project.year}</dd>
            </div>
          </div>

          {/* Contribution Tags */}
          {project.contribution && project.contribution.length > 0 && (
            <div>
              <span className="frame-label">Key Deliverables</span>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.contribution.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-200 group-hover:border-hairline-strong group-hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );

  if (!linked) return <div>{article}</div>;

  return (
    <Link
      href={`/case-studies/${project.slug}`}
      aria-label={`${project.title} case study`}
      data-cursor="Open"
      className="block"
    >
      {article}
    </Link>
  );
}

/* =========================================================
   PROJECTS SECTION
========================================================= */

export default function Projects() {
  const selected = projects.filter((p) => p.featured);

  return (
    <section id="work" className="relative overflow-hidden border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="grid border-b border-hairline py-12 md:grid-cols-[1fr_2fr] md:py-16">
          <div>
            <span className="frame-label">02 / Selected work</span>
            <div className="mt-3 flex items-center gap-2">
              <Sparkles size={14} className="text-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Shipped &amp; Conceptual
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl md:text-7xl">
              Product design work across{" "}
              <span className="font-serif font-normal italic text-accent">
                SaaS, mobile
              </span>{" "}
              and digital systems.
            </h2>

            <span className="frame-label shrink-0">
              {String(selected.length).padStart(2, "0")} selected works
            </span>
          </div>
        </div>

        {/* Project Items List */}
        <div className="py-6 sm:py-10">
          {selected.map((project, index) => (
            <WorkItem key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Explore More Archive Link */}
        {projects.length > selected.length && (
          <div className="flex justify-end border-t border-hairline py-10">
            <Link
              href="/ui-designs"
              className="group flex items-center gap-3 rounded-full border border-hairline bg-paper px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:border-accent hover:text-ink"
            >
              <span>Explore design archive</span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}