"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code,
  MessageCircle,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "@/app/components/ThemeToggle";
import {
  clean,
  type CaseStudy,
  type CaseStudyImage,
  type CaseStudySection,
  type CompareImages,
  type DesignTokens,
  type Insight,
  type Pin,
} from "@/app/data/case-studies";
import { workTypeLabels } from "@/app/data/projects";

/* =========================================================
   DATA PREP
   Unfinished "TODO" text is stripped here, so a half-written
   case study degrades gracefully instead of showing placeholders.
========================================================= */

type NextProject = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
};

type PreparedSection = {
  id: string;
  label: string;
  title?: string;
  description?: string;
  items: string[];
  insights: Insight[];
  insightLabels: { from: string; to: string };
  images: CaseStudyImage[];
  compare?: CompareImages;
  callout?: string;
};

const cleanList = (list?: string[]) =>
  (list ?? []).map(clean).filter((s): s is string => Boolean(s));

function prepareSection(s: CaseStudySection): PreparedSection | null {
  const prepared: PreparedSection = {
    id: s.id,
    label: s.label.replace(/^\d+\s*\/\s*/, ""),
    title: clean(s.title),
    description: clean(s.description),
    items: cleanList(s.items),
    insights: (s.insights ?? []).flatMap((i) => {
      const finding = clean(i.finding);
      const decision = clean(i.decision);
      return finding && decision ? [{ finding, decision }] : [];
    }),
    images: (s.images ?? []).map((img) => ({
      ...img,
      caption: clean(img.caption),
    })),
    compare: s.compare,
    insightLabels: s.insightLabels ?? { from: "Finding", to: "Decision" },
    callout: clean(s.callout),
  };

  const hasContent =
    prepared.description ||
    prepared.callout ||
    prepared.compare ||
    prepared.items.length > 0 ||
    prepared.insights.length > 0 ||
    prepared.images.length > 0;

  return hasContent ? prepared : null;
}

function prepare(project: CaseStudy) {
  const tldr = (
    [
      ["Problem", clean(project.tldr.problem)],
      ["Solution", clean(project.tldr.solution)],
      ["Result", clean(project.tldr.result)],
    ] as const
  ).flatMap(([label, text]) => (text ? [{ label, text }] : []));

  return {
    headline: clean(project.headline) ?? project.tagline,
    team: clean(project.team),
    tldr,
    context: clean(project.context),
    problem: clean(project.problem),
    goals: cleanList(project.goals),
    sections: project.sections
      .map(prepareSection)
      .filter((s): s is PreparedSection => s !== null),
    metrics: (project.metrics ?? []).filter(
      (m) => clean(m.value) && clean(m.label)
    ),
    outcome: clean(project.outcome),
    reflection: cleanList(project.reflection),
  };
}

function figmaLink(embed: string) {
  try {
    return new URL(embed).searchParams.get("url") ?? undefined;
  } catch {
    return undefined;
  }
}

/* =========================================================
   MAIN
========================================================= */

export default function CaseStudyClient({
  project,
  next,
}: {
  project: CaseStudy;
  next?: NextProject;
}) {
  const d = useMemo(() => prepare(project), [project]);
  const { scrollYProgress } = useScroll();

  const [dev, setDev] = useState(false);
  const [comments, setComments] = useState(true);
  const [activeKey, setActiveKey] = useState("top");

  /* Layers (also drive the numbering of every block) */
  const layers = useMemo(() => {
    const l: { key: string; label: string }[] = [{ key: "top", label: "Cover" }];
    if (d.tldr.length) l.push({ key: "tldr", label: "TL;DR" });
    if (d.context) l.push({ key: "context", label: "Context" });
    if (d.problem) l.push({ key: "problem", label: "Problem" });
    if (d.goals.length) l.push({ key: "goals", label: "Goals" });
    if (project.responsibilities.length)
      l.push({ key: "role", label: "My role" });
    d.sections.forEach((s) => l.push({ key: `s-${s.id}`, label: s.label }));
    if (d.outcome || d.metrics.length)
      l.push({ key: "outcome", label: "Outcome" });
    if (d.reflection.length) l.push({ key: "reflection", label: "Reflection" });
    if (project.figmaEmbed) l.push({ key: "prototype", label: "Prototype" });
    return l;
  }, [d, project.responsibilities.length, project.figmaEmbed]);

  const layerKeys = layers.map((l) => l.key).join("|");
  const num = (key: string) =>
    String(layers.findIndex((l) => l.key === key)).padStart(2, "0");

  /* Scroll spy for the layers panel */
  useEffect(() => {
    const els = layerKeys
      .split("|")
      .map((k) => document.getElementById(`layer-${k}`))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveKey(e.target.id.replace("layer-", ""));
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [layerKeys]);

  /* Shortcuts: D = dev mode, C = comments */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))
        return;
      const k = e.key.toLowerCase();
      if (k === "d") setDev((v) => !v);
      else if (k === "c") setComments((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const typeLabel = workTypeLabels[project.type];
  const figmaUrl = project.figmaEmbed ? figmaLink(project.figmaEmbed) : undefined;

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* ---------- Reading progress ---------- */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[95] h-[2px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ---------- Toolbar ---------- */}
      <header className="fixed inset-x-0 top-0 z-[90] border-b border-hairline bg-paper/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/#work"
              aria-label="Back to work"
              className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span className="hidden sm:inline">Work</span>
            </Link>
            <span aria-hidden="true" className="text-hairline-strong">
              /
            </span>
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.16em]">
              {project.title}
              <span className="hidden text-muted md:inline"> — case study</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ToolbarToggle
              pressed={comments}
              onClick={() => setComments((v) => !v)}
              label="Comments"
              shortcut="C"
            >
              <MessageCircle size={14} strokeWidth={1.5} aria-hidden="true" />
            </ToolbarToggle>
            <ToolbarToggle
              pressed={dev}
              onClick={() => setDev((v) => !v)}
              label="Dev mode"
              shortcut="D"
            >
              <Code size={14} strokeWidth={1.5} aria-hidden="true" />
            </ToolbarToggle>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              aria-label="Open command palette"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-hairline-strong hover:text-ink"
            >
              <Search size={15} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ---------- Three-column workspace ---------- */}
      <div className="mx-auto grid max-w-[1440px] gap-x-10 px-4 pt-14 md:px-8 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_280px]">
        <LayersPanel layers={layers} activeKey={activeKey} />

        <article className="min-w-0 pb-10">
          {/* ===== COVER ===== */}
          <header id="layer-top" className="pb-14 pt-12 md:pb-20 md:pt-16">
            <span className="frame-label">
              {project.year} · {typeLabel}
              {project.isPrivate ? " · Under NDA" : ""}
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 break-words font-display text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl md:text-7xl xl:text-8xl"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-xl leading-snug text-muted md:text-2xl"
            >
              {d.headline}
            </motion.p>

            {/* Meta: shown here below xl, where the properties panel is hidden */}
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-4 xl:hidden">
              {[
                ["Role", project.role],
                ["Duration", project.duration],
                ["Platform", project.platform],
                ["Tools", project.tools.join(" · ")],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper p-4">
                  <dt className="frame-label">{k}</dt>
                  <dd className="mt-1.5 text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            {dev && (
              <div className="mt-6 rounded-xl border border-dashed border-accent p-5 xl:hidden">
                <span className="frame-label text-accent">Inspect</span>
                <div className="mt-4">
                  <TokenList tokens={project.tokens} />
                </div>
              </div>
            )}

            <div className="mt-10">
              <Shot
                image={{ src: project.image, alt: `${project.title} cover` }}
                dev={dev}
                comments={false}
              />
            </div>
          </header>

          {/* ===== TL;DR ===== */}
          {d.tldr.length > 0 && (
            <Block id="tldr" number={num("tldr")} label="TL;DR">
              <div className="grid gap-4 md:grid-cols-3">
                {d.tldr.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-hairline bg-sunken/50 p-5"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      {item.label}
                    </span>
                    <p className="mt-3 text-base leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {/* ===== CONTEXT ===== */}
          {d.context && (
            <Block id="context" number={num("context")} label="Context">
              <p className="max-w-3xl font-display text-2xl leading-snug tracking-[-0.02em] md:text-4xl">
                {d.context}
              </p>
            </Block>
          )}

          {/* ===== PROBLEM ===== */}
          {d.problem && (
            <Block id="problem" number={num("problem")} label="Problem">
              <p className="max-w-3xl font-display text-2xl leading-snug tracking-[-0.02em] md:text-4xl">
                {d.problem}
              </p>
            </Block>
          )}

          {/* ===== GOALS ===== */}
          {d.goals.length > 0 && (
            <Block id="goals" number={num("goals")} label="Goals">
              <ol className="border-t border-hairline">
                {d.goals.map((goal, i) => (
                  <li
                    key={goal}
                    className="flex gap-5 border-b border-hairline py-5"
                  >
                    <span className="font-mono text-[10px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="max-w-2xl text-base leading-relaxed md:text-lg">
                      {goal}
                    </span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {/* ===== MY ROLE ===== */}
          {project.responsibilities.length > 0 && (
            <Block id="role" number={num("role")} label="My role">
              <ul className="flex flex-wrap gap-2">
                {project.responsibilities.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-hairline px-4 py-2 text-sm"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {/* ===== PROCESS SECTIONS ===== */}
          {d.sections.map((section) => (
            <Block
              key={section.id}
              id={`s-${section.id}`}
              number={num(`s-${section.id}`)}
              label={section.label}
            >
              {section.title && (
                <h2 className="max-w-3xl font-display text-3xl font-medium leading-tight tracking-[-0.03em] md:text-5xl">
                  {section.title}
                </h2>
              )}

              {section.description && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                  {section.description}
                </p>
              )}

              {section.items.length > 0 && (
                <ol className="mt-8 border-t border-hairline">
                  {section.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-5 border-b border-hairline py-4"
                    >
                      <span className="font-mono text-[10px] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              )}

              {section.insights.length > 0 && (
                <div className="mt-10 space-y-4">
                  {section.insights.map((ins) => (
                    <div
                      key={ins.finding}
                      className="grid gap-4 rounded-xl border border-hairline p-5 md:grid-cols-[1fr_24px_1fr] md:gap-6"
                    >
                      <div>
                        <span className="frame-label">{section.insightLabels.from}</span>
                        <p className="mt-2 text-base leading-relaxed">
                          {ins.finding}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="mt-6 hidden text-accent md:block"
                      />
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          {section.insightLabels.to}
                        </span>
                        <p className="mt-2 text-base leading-relaxed">
                          {ins.decision}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.callout && (
                <blockquote className="mt-10 border-l-2 border-accent pl-6 font-display text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
                  {section.callout}
                </blockquote>
              )}

              {section.compare && (
                <div className="mt-10">
                  <Compare data={section.compare} />
                </div>
              )}

              {section.images.length > 0 && (
                <div className="mt-10 space-y-10">
                  {section.images.map((image) => (
                    <Shot
                      key={image.src}
                      image={image}
                      dev={dev}
                      comments={comments}
                    />
                  ))}
                </div>
              )}
            </Block>
          ))}

          {/* ===== OUTCOME ===== */}
          {(d.outcome || d.metrics.length > 0) && (
            <Block id="outcome" number={num("outcome")} label="Outcome">
              {d.metrics.length > 0 && (
                <dl className="mb-10 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
                  {d.metrics.map((m) => (
                    <div key={m.label} className="bg-paper p-6">
                      <dd className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                        {m.value}
                      </dd>
                      <dt className="mt-2 text-sm text-muted">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
              {d.outcome && (
                <p className="max-w-4xl font-display text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
                  {d.outcome}
                </p>
              )}
            </Block>
          )}

          {/* ===== REFLECTION ===== */}
          {d.reflection.length > 0 && (
            <Block id="reflection" number={num("reflection")} label="Reflection">
              <ol className="border-t border-hairline">
                {d.reflection.map((r, i) => (
                  <li
                    key={r}
                    className="flex gap-6 border-b border-hairline py-6"
                  >
                    <span className="font-mono text-[10px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-2xl text-base leading-relaxed md:text-lg">
                      {r}
                    </p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {/* ===== PROTOTYPE ===== */}
          {project.figmaEmbed && (
            <Block id="prototype" number={num("prototype")} label="Prototype">
              <h2 className="mb-8 font-display text-3xl font-medium tracking-[-0.03em] md:text-5xl">
                Explore the design
              </h2>
              <div className="overflow-hidden rounded-xl border border-hairline-strong bg-sunken">
                <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                    <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                    <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                  </div>
                  <span className="frame-label">Figma prototype</span>
                  {figmaUrl ? (
                    <a
                      href={figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
                    >
                      Open <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="w-10" />
                  )}
                </div>
                <div className="aspect-video">
                  <iframe
                    src={project.figmaEmbed}
                    title={`${project.title} Figma prototype`}
                    className="h-full w-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </Block>
          )}

          {/* ===== NEXT PROJECT ===== */}
          {next && (
            <Link
              href={`/case-study/${next.slug}`}
              data-cursor="Open"
              className="group block border-t border-hairline py-16 md:py-24"
            >
              <span className="frame-label">Next project</span>
              <div className="mt-4 flex items-end justify-between gap-6">
                <h2 className="break-words font-display text-5xl font-semibold leading-none tracking-[-0.045em] transition-colors duration-300 group-hover:text-accent md:text-7xl xl:text-8xl">
                  {next.title}
                </h2>
                <ArrowRight
                  size={40}
                  strokeWidth={1.2}
                  aria-hidden="true"
                  className="mb-2 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent"
                />
              </div>
              <p className="mt-5 max-w-xl text-muted">{next.tagline}</p>
            </Link>
          )}

          <div className="flex items-center justify-between border-t border-hairline py-8">
            <Link
              href="/#work"
              className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              All work
            </Link>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
              D dev mode · C comments · ⌘K jump
            </span>
          </div>
        </article>

        <PropertiesPanel
          project={project}
          team={d.team}
          typeLabel={typeLabel}
          dev={dev}
        />
      </div>
    </main>
  );
}

/* =========================================================
   LAYOUT PIECES
========================================================= */

function Block({
  id,
  number,
  label,
  children,
}: {
  id: string;
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={`layer-${id}`} className="border-t border-hairline py-14 md:py-20">
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-[10px] text-accent">{number}</span>
        <span className="frame-label">{label}</span>
      </div>
      {children}
    </section>
  );
}

function ToolbarToggle({
  pressed,
  onClick,
  label,
  shortcut,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  shortcut: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      title={`${label} (${shortcut})`}
      className={`flex h-9 items-center gap-2 rounded-full border px-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
        pressed
          ? "border-accent bg-accent text-paper"
          : "border-hairline text-muted hover:border-hairline-strong hover:text-ink"
      }`}
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function LayersPanel({
  layers,
  activeKey,
}: {
  layers: { key: string; label: string }[];
  activeKey: string;
}) {
  return (
    <aside
      aria-label="Case study sections"
      className="sticky top-[56px] hidden h-[calc(100vh-56px)] self-start overflow-y-auto py-10 lg:block"
    >
      <span className="frame-label mb-3 block">Layers</span>
      <ul className="space-y-0.5">
        {layers.map((l, i) => {
          const active = l.key === activeKey;
          return (
            <li key={l.key}>
              <a
                href={`#layer-${l.key}`}
                aria-current={active ? "location" : undefined}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                  active ? "bg-sunken text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${active ? "text-accent" : ""}`}
                >
                  {String(i).padStart(2, "0")}
                </span>
                <span className="truncate">{l.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function PropertiesPanel({
  project,
  team,
  typeLabel,
  dev,
}: {
  project: CaseStudy;
  team?: string;
  typeLabel: string;
  dev: boolean;
}) {
  return (
    <aside
      aria-label="Project properties"
      className="sticky top-[56px] hidden h-[calc(100vh-56px)] self-start overflow-y-auto py-10 xl:block"
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="frame-label">{dev ? "Inspect" : "Properties"}</span>
        <span className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {typeLabel}
        </span>
      </div>

      <div className="mt-3">
        <Prop label="Role">{project.role}</Prop>
        {team && <Prop label="Team">{team}</Prop>}
        <Prop label="Duration">{project.duration}</Prop>
        <Prop label="Platform">{project.platform}</Prop>
        <Prop label="Year">{project.year}</Prop>
        <Prop label="Tools">
          <div className="flex flex-wrap gap-1.5">
            {project.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-hairline px-2.5 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </Prop>
      </div>

      <AnimatePresence initial={false}>
        {dev && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 rounded-xl border border-dashed border-accent p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Dev mode
              </span>
              <div className="mt-4">
                <TokenList tokens={project.tokens} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

function Prop({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-hairline py-3">
      <span className="frame-label block">{label}</span>
      <div className="mt-1.5 text-sm">{children}</div>
    </div>
  );
}

function TokenList({ tokens }: { tokens?: DesignTokens }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (value: string) => {
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        setCopied(value);
        setTimeout(() => setCopied((c) => (c === value ? null : c)), 1200);
      })
      .catch(() => {});
  };

  const hasAny =
    tokens &&
    ((tokens.colors?.length ?? 0) > 0 ||
      (tokens.type?.length ?? 0) > 0 ||
      (tokens.spacing?.length ?? 0) > 0);

  if (!hasAny) {
    return (
      <p className="text-sm leading-relaxed text-muted">
        No tokens documented for this project yet. Dashed outlines on the page
        show each frame&apos;s pixel size.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {tokens.colors && tokens.colors.length > 0 && (
        <div>
          <span className="frame-label mb-2 block">Colour</span>
          <div className="grid grid-cols-2 gap-2">
            {tokens.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => copy(c.hex)}
                aria-label={`Copy ${c.name} ${c.hex}`}
                className="flex items-center gap-2 rounded-lg border border-hairline p-2 text-left transition-colors hover:border-hairline-strong"
              >
                <span
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 rounded border border-hairline"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="min-w-0">
                  <span className="block truncate text-xs">{c.name}</span>
                  <span className="block font-mono text-[10px] text-muted">
                    {copied === c.hex ? "Copied" : c.hex}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {tokens.type && tokens.type.length > 0 && (
        <div>
          <span className="frame-label mb-2 block">Type</span>
          <ul className="space-y-2">
            {tokens.type.map((t) => (
              <li key={t.role} className="text-xs">
                <span className="block">{t.role}</span>
                <span className="font-mono text-[10px] text-muted">
                  {t.font} · {t.spec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tokens.spacing && tokens.spacing.length > 0 && (
        <div>
          <span className="frame-label mb-2 block">Spacing</span>
          <div className="flex flex-wrap gap-1.5">
            {tokens.spacing.map((s) => (
              <span
                key={s}
                className="rounded border border-hairline px-2 py-0.5 font-mono text-[10px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   IMAGE WITH DEV-MODE FRAME + COMMENT PINS
========================================================= */

function Shot({
  image,
  dev,
  comments,
}: {
  image: CaseStudyImage;
  dev: boolean;
  comments: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [failed, setFailed] = useState(false);

  /* Cached images can finish loading before React attaches onLoad */
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setSize({ w: el.naturalWidth, h: el.naturalHeight });
    }
  }, []);

  // Missing image file: hide the frame instead of showing a broken icon
  if (failed) return null;

  return (
    <figure>
      <div
        className={`relative rounded-xl border bg-sunken transition-colors ${
          dev ? "border-dashed border-accent" : "border-hairline"
        }`}
      >
        <img
          ref={imgRef}
          src={image.src}
          alt={image.alt}
          decoding="async"
          onLoad={(e) =>
            setSize({
              w: e.currentTarget.naturalWidth,
              h: e.currentTarget.naturalHeight,
            })
          }
          onError={() => setFailed(true)}
          className="block h-auto w-full rounded-[inherit]"
        />

        {dev && size && (
          <span className="absolute -top-3 left-3 rounded bg-accent px-2 py-0.5 font-mono text-[10px] text-paper">
            {size.w} × {size.h}
          </span>
        )}

        {comments && image.pins && image.pins.length > 0 && (
          <Pins pins={image.pins} />
        )}
      </div>

      {image.caption && (
        <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Pins({ pins }: { pins: Pin[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      {pins.map((p, i) => {
        const isOpen = open === i;
        const flipX = p.x > 60;
        const flipY = p.y > 60;
        return (
          <div
            key={`${p.x}-${p.y}-${i}`}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-label={`Comment ${i + 1}: ${p.title}`}
              className="relative -ml-3.5 -mt-3.5 flex h-7 w-7 items-center justify-center rounded-full rounded-bl-none bg-accent font-mono text-[11px] font-medium text-paper shadow-lg transition-transform hover:scale-110"
            >
              {i + 1}
              {!isOpen && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full rounded-bl-none bg-accent/40"
                />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: flipY ? 6 : -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute z-20 w-64 rounded-xl border border-hairline-strong bg-paper p-4 text-left shadow-2xl ${
                    flipX ? "right-0" : "left-0"
                  } ${flipY ? "bottom-full mb-3" : "top-full mt-3"}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {i + 1} · {p.title}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed">{p.note}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}

/* =========================================================
   BEFORE / AFTER SLIDER
========================================================= */

function Compare({ data }: { data: CompareImages }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <figure>
      <div
        ref={ref}
        className="relative touch-pan-y select-none overflow-hidden rounded-xl border border-hairline bg-sunken"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromX(e.clientX);
        }}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img
          src={data.after.src}
          alt={data.after.alt}
          draggable={false}
          className="block h-auto w-full"
        />
        <img
          src={data.before.src}
          alt={data.before.alt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">
          After
        </span>

        <div
          className="absolute inset-y-0 w-px bg-accent"
          style={{ left: `${pos}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Before and after comparison"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
            className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-accent text-paper shadow-lg"
          >
            <span aria-hidden="true">↔</span>
          </button>
        </div>
      </div>

      {data.caption && (
        <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
}
