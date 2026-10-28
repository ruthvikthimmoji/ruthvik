"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { hasCaseStudy } from "@/app/data/case-studies";
import {
  projects,
  workTypeLabels,
  type ProjectCard,
} from "@/app/data/projects";

const MAX_TAGS = 4;

/* =========================================================
   ONE PROJECT ITEM (compact row: image left, details right)
========================================================= */

function WorkItem({
  project,
  index,
}: {
  project: ProjectCard;
  index: number;
}) {
  // Only published case studies are linkable
  const linked = hasCaseStudy(project.slug);

  const tags = project.contribution ?? [];
  const visibleTags = tags.slice(0, MAX_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  const article = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group grid gap-6 border-b border-hairline py-8 transition-colors duration-500 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10 md:py-10 lg:gap-14"
    >
      {/* Preview Image */}
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-sunken shadow-sm transition-all duration-500 group-hover:border-hairline-strong group-hover:shadow-md">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Floating type badge */}
        <span className="absolute left-3 top-3 rounded-full border border-hairline bg-paper/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
          {workTypeLabels[project.type]}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col">
        {/* Index + category */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
          <span className="frame-label">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink transition-colors duration-300 group-hover:text-accent md:text-4xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {project.description}
        </p>

        {/* Role · Platform · Year (single line) */}
        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div className="flex items-baseline gap-2">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Role
            </dt>
            <dd className="font-medium text-ink">{project.role}</dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Platform
            </dt>
            <dd className="font-medium text-ink">{project.platform}</dd>
          </div>
          <div className="flex items-baseline gap-2">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Year
            </dt>
            <dd className="font-medium text-ink">{project.year}</dd>
          </div>
        </dl>

        {/* Deliverable tags (capped so rows stay compact) */}
        {visibleTags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key deliverables">
            {visibleTags.map((item) => (
              <li
                key={item}
                className="rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-200 group-hover:border-hairline-strong group-hover:text-ink"
              >
                {item}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                +{hiddenCount} more
              </li>
            )}
          </ul>
        )}

        {/* Action */}
        <div className="mt-7">
          {linked ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-4 py-2 text-xs font-medium tracking-wide text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white sm:text-sm">
              View Case Study
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          ) : project.type === "professional" ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-3.5 py-1.5 font-mono text-[11px] text-muted">
              <Lock size={12} aria-hidden="true" />
              Under NDA · Details on request
            </span>
          ) : null}
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
    <section
      id="work"
      className="relative overflow-hidden border-t border-hairline bg-paper text-ink"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="grid gap-6 border-b border-hairline py-10 md:grid-cols-[1fr_2fr] md:py-14">
          <div>
            <span className="frame-label">02 / Selected work</span>
            <div className="mt-3 flex items-center gap-2">
              <Sparkles size={14} className="text-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Shipped &amp; Conceptual
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl md:text-6xl">
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
        <div>
          {selected.map((project, index) => (
            <WorkItem key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Explore More Archive Link */}
        {projects.length > selected.length && (
          <div className="flex justify-end py-10">
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