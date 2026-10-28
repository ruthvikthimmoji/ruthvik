"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { certifications, education, roles } from "@/app/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-hairline bg-paper text-ink"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="grid gap-6 border-b border-hairline py-10 md:grid-cols-[1fr_2fr] md:py-14">
          <div>
            <span className="frame-label">03 / Experience</span>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              UI/UX · Since 2023
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl md:text-5xl">
              Where I&apos;ve worked.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Started in graphic design, moved into UI/UX in 2023 — now focused
              on SaaS workflows, dashboards and design systems.
            </p>
          </div>
        </div>

        {/* Experience Roles Ledger */}
        <div className="divide-y divide-hairline border-b border-hairline">
          {roles.map((role, i) => (
            <motion.article
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative py-7 md:py-9"
            >
              {/* Hover accent on the left edge */}
              <span
                aria-hidden="true"
                className="absolute -left-4 top-7 bottom-7 hidden w-[2px] scale-y-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100 md:block"
              />

              <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
                {/* Left: Company, period, location */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium tracking-[0.14em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">
                      {role.company}
                    </h3>
                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-2 font-mono text-[11px] text-muted">
                    {role.period}
                    {role.duration && <> · {role.duration}</>}
                    {role.location && <> · {role.location}</>}
                  </p>
                </div>

                {/* Right: Title, description, tags */}
                <div>
                  <h4 className="font-display text-lg font-medium tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent sm:text-xl">
                    {role.title}
                  </h4>

                  {role.description && (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                      {role.description}
                    </p>
                  )}

                  {role.tags && role.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-hairline bg-paper/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-200 group-hover:border-hairline-strong"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Education & Certifications */}
        <div className="grid gap-8 py-10 md:grid-cols-[1fr_2fr] md:py-14">
          <div>
            <span className="frame-label">Credentials</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Education */}
            <div className="rounded-xl border border-hairline bg-sunken/30 p-6 transition-colors duration-300 hover:border-hairline-strong">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Education
                </span>
                <GraduationCap size={16} className="text-muted" />
              </div>

              <div className="mt-5">
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

            {/* Certifications */}
            <div className="rounded-xl border border-hairline bg-sunken/30 p-6 transition-colors duration-300 hover:border-hairline-strong">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  Certifications
                </span>
                <Award size={16} className="text-muted" />
              </div>

              <ul className="mt-5 space-y-3">
                {certifications.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
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

        {/* NDA note, framed as an invitation */}
        <div className="border-t border-hairline py-6 text-xs text-muted">
          <p className="max-w-xl">
            Some of my work is under NDA — happy to walk through it in detail
            during an interview.
          </p>
        </div>
      </div>
    </section>
  );
}