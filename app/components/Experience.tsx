"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Briefcase, GraduationCap } from "lucide-react";
import { certifications, education, roles } from "@/app/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="grid border-b border-hairline py-10 md:grid-cols-[1fr_2fr] md:py-16">
          <div>
            <span className="frame-label">03 / Experience</span>
            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Available
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
              Career progression, leadership &amp; craft.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Designing digital products since 2023 — focusing on complex SaaS workflows,
              interactive systems, and end-to-end design architectures.
            </p>
          </div>
        </div>

        {/* Experience Roles Ledger */}
        <div className="divide-y divide-hairline border-b border-hairline">
          {roles.map((role, i) => (
            <motion.article
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative -mx-4 rounded-xl px-4 py-8 transition-colors duration-300 hover:bg-sunken/40 sm:mx-0 sm:px-6 md:py-12"
            >
              {/* Subtle hover accent indicator on the left edge */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 bottom-6 w-[2px] scale-y-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
              />

              <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
                {/* Left Column: Company, Period & Status */}
                <div className="flex flex-col justify-between space-y-4 md:space-y-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-medium tracking-[0.14em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                        {role.company}
                      </h4>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] text-muted">
                        {role.period}
                      </span>
                      {role.duration && (
                        <span className="font-mono text-[11px] text-muted">
                          ({role.duration})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">{role.location}</span>
                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Column: Title, Responsibilities, Tags */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                      {role.title}
                    </h3>
                  </div>

                  {role.description && (
                    <p className="mt-4 text-base leading-relaxed text-muted md:text-[17px]">
                      {role.description}
                    </p>
                  )}

                  {role.tags && role.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-hairline bg-paper/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-200 group-hover:border-hairline-strong"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Education & Certifications Split Grid */}
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_2fr] md:py-16">
          <div>
            <span className="frame-label">Credentials</span>
            <p className="mt-2 text-xs text-muted">
              Academic foundation and continuous industry certifications.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Education Card */}
            <div className="rounded-xl border border-hairline bg-sunken/30 p-6 transition-colors duration-300 hover:border-hairline-strong">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Education
                </span>
                <GraduationCap size={16} className="text-muted" />
              </div>

              <div className="mt-6">
                <h4 className="font-display text-lg font-medium tracking-tight">
                  {education.school}
                </h4>
                <p className="mt-1 text-sm text-ink/80">{education.degree}</p>
                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3 font-mono text-xs text-muted">
                  <span>{education.period}</span>
                  <span>{education.location}</span>
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="rounded-xl border border-hairline bg-sunken/30 p-6 transition-colors duration-300 hover:border-hairline-strong">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Certifications
                </span>
                <Award size={16} className="text-muted" />
              </div>

              <ul className="mt-6 space-y-3">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Note Footer */}
        <div className="flex flex-col justify-between gap-4 border-t border-hairline py-6 text-xs text-muted sm:flex-row sm:items-center">
          <p className="max-w-xl">
            Selected professional engagements are shown above. Internal metrics and proprietary product artifacts remain under NDA.
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
            Verified Experience
          </span>
        </div>
      </div>
    </section>
  );
}