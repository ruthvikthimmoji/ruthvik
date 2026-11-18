"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { hasCaseStudy } from "@/app/data/case-studies";
import { getFeaturedProjects, workTypeLabels, type ProjectCard } from "@/app/data/projects";

/* =========================================================
   SELECTED WORK — clean and readable.
   One project per row: details on the left, large image on
   the right. Each row simply fades in once. No pinning.
========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

function CaseAction({ project }: { project: ProjectCard }) {
  if (hasCaseStudy(project.slug)) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-transform duration-300 ease-snap group-hover:-translate-y-0.5">
        Read the case study
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    );
  }
  if (project.type === "professional") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-hairline-strong px-4 py-2.5 text-sm text-muted">
        <Lock size={13} aria-hidden="true" />
        Under NDA · walkthrough on request
      </span>
    );
  }
  return null;
}

function ProjectRow({ project, index }: { project: ProjectCard; index: number }) {
  const linked = hasCaseStudy(project.slug);

  const row = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid gap-8 border-t border-hairline py-12 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:py-16 lg:gap-20"
    >
      {/* Details */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-3xl leading-none text-accent">{pad(index + 1)}</span>
          <span className="label-caps">
            {project.category} · {workTypeLabels[project.type]}
          </span>
        </div>

        <h3 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent md:text-5xl">
          {project.title}
        </h3>

        {project.problem && project.resolution ? (
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="label-caps">The problem</dt>
              <dd className="mt-2 max-w-md text-[17px] leading-relaxed text-ink">{project.problem}</dd>
            </div>
            <div>
              <dt className="label-caps">What I did</dt>
              <dd className="mt-2 max-w-md text-[17px] leading-relaxed text-ink">{project.resolution}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">{project.description}</p>
        )}

        {project.result && (
          <div className="mt-8 flex items-baseline gap-4 border-t border-hairline pt-6">
            <span className="font-display text-5xl leading-none text-accent">{project.result.value}</span>
            <span className="max-w-[220px] text-sm leading-snug text-muted">
              {project.result.label}
              <span className="ml-2 rounded-full border border-hairline-strong px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                {project.result.status === "measured" ? "Measured" : "Target"}
              </span>
            </span>
          </div>
        )}

        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {[
            ["Role", project.role],
            ["Platform", project.platform],
            ["Year", project.year],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label-caps">{k}</dt>
              <dd className="mt-1 font-normal text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 md:mt-auto md:pt-10">
          <CaseAction project={project} />
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/11] overflow-hidden rounded-md border border-hairline bg-sunken md:order-none">
        <Image
          src={project.image}
          alt={`${project.title} — project preview`}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </motion.article>
  );

  if (!linked) return <div className="group">{row}</div>;

  return (
    <Link
      href={`/case-studies/${project.slug}`}
      aria-label={`${project.title} — read the case study`}
      className="group block"
    >
      {row}
    </Link>
  );
}

export default function Projects() {
  const selected = getFeaturedProjects();

  return (
    <section id="work" className="relative border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <header className="flex flex-col gap-6 pb-12 pt-24 md:flex-row md:items-end md:justify-between md:pb-16 md:pt-32">
          <div>
            <p className="label-caps">Selected work</p>
            <h2 className="display-l mt-6 max-w-3xl">
              Three projects, from problem to <em className="emph">solution.</em>
            </h2>
          </div>
          <p className="label-caps">{pad(selected.length)} projects</p>
        </header>

        <div className="border-b border-hairline">
          {selected.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
