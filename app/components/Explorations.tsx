"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ExternalLink,
  Layers,
  Maximize2,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { activeProjects, type ActiveProject } from "@/app/data/active-projects";

function figmaLink(embed: string) {
  try {
    return new URL(embed).searchParams.get("url") ?? undefined;
  } catch {
    return undefined;
  }
}

/* =========================================================
   CINEMATIC FIGMA STAGE MODAL
========================================================= */

function PreviewDialog({
  project,
  onClose,
}: {
  project: ActiveProject;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const openUrl = project.figmaEmbed ? figmaLink(project.figmaEmbed) : undefined;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10"
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-md"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} preview`}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-hairline-strong bg-paper shadow-2xl"
      >
        {/* Modal Window Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-hairline bg-paper/90 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-medium text-ink">{project.name}</span>
              <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                {project.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {openUrl && (
              <a
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-all hover:border-accent hover:text-accent"
              >
                <span>Figma App</span>
                <ExternalLink size={11} />
              </a>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-hairline-strong hover:text-ink"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Embedded Prototype Frame */}
        <div className="relative min-h-0 flex-1 bg-sunken">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Connecting to Figma Canvas…
              </span>
            </div>
          )}
          <iframe
            src={project.figmaEmbed}
            title={`${project.name} live prototype`}
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="relative h-full w-full border-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   EXPLORATIONS SECTION
========================================================= */

export default function Explorations() {
  const [open, setOpen] = useState<ActiveProject | null>(null);
  const close = useCallback(() => setOpen(null), []);

  if (activeProjects.length === 0) return null;

  return (
    <section id="explorations" className="relative border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="grid border-b border-hairline py-10 md:grid-cols-[1fr_2fr] md:py-16">
          <div>
            <span className="frame-label">06 / Design Lab</span>
            <div className="mt-3 flex items-center gap-2">
              <Activity size={14} className="text-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {String(activeProjects.length).padStart(2, "0")} Work In Progress
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl md:text-5xl">
              Active sprints, prototypes &amp; ongoing experiments.
            </h2>
            <p className="max-w-sm text-xs leading-relaxed text-muted sm:text-sm">
              Live interface concepts currently on my artboard. Click any card to launch the interactive Figma file directly.
            </p>
          </div>
        </div>

        {/* Design Lab Cards Grid */}
        <div className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((item, index) => {
            const canPreview = Boolean(item.figmaEmbed);

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => canPreview && setOpen(item)}
                className={`group relative flex flex-col justify-between rounded-2xl border border-hairline bg-sunken/30 p-6 transition-all duration-300 hover:border-hairline-strong hover:bg-sunken/60 hover:shadow-md sm:p-7 ${
                  canPreview ? "cursor-pointer" : ""
                }`}
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between border-b border-hairline/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold tracking-wider text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-hairline bg-paper px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                        {item.type}
                      </span>
                    </div>

                    {/* Live Status Pulse */}
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
                      {item.status}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.025em] text-ink transition-colors duration-200 group-hover:text-accent">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Progress & Action Row */}
                <div className="mt-8 border-t border-hairline/80 pt-5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                    <span className="uppercase tracking-widest">Progress</span>
                    <span className="font-semibold text-ink">{item.progress}%</span>
                  </div>

                  {/* Segmented Architectural Progress Bar */}
                  <div className="mt-2.5 flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-hairline">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-accent"
                    />
                  </div>

                  {/* Launch Callout */}
                  <div className="mt-5 flex items-center justify-between pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-ink">
                      {canPreview ? "Inspect Prototype" : "Concept Stage"}
                    </span>
                    {canPreview && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-hairline bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        <span>Figma</span>
                        <Maximize2 size={10} />
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footer Link to Archive */}
        <div className="flex flex-col gap-4 border-t border-hairline py-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="frame-label">Raw concepts · Workbenches · Rapid iterations</span>

          <Link
            href="/ui-designs"
            className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:border-accent hover:text-ink"
          >
            <span>Explore full visual gallery</span>
            <ArrowRight
              size={12}
              aria-hidden="true"
              className="text-accent transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Fullscreen Interactive Figma Modal */}
      <AnimatePresence>
        {open && <PreviewDialog project={open} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}