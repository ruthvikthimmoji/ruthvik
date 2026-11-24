"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { hasCaseStudy } from "@/app/data/case-studies";
import { projects, workTypeLabels, type WorkType } from "@/app/data/projects";
import { PROFILE } from "../components/canvas/content";
import "../components/canvas/canvas.css";
import "./work.css";
import Logo from "../components/Logo";

/* /work — the whole library, laid out like a FigJam page of frames. */

type Filter = "all" | WorkType;
const FILTERS: Filter[] = ["all", "client", "professional", "personal"];

export default function WorkLibrary() {
  const [filter, setFilter] = useState<Filter>("all");
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    projects.forEach((p) => (c[p.type] = (c[p.type] ?? 0) + 1));
    return c;
  }, []);
  const list =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div className="cv is-ready">
      <main className="wk">
        <header className="cv-panel wk-top">
          <Link href="/" className="wk-back">
            <Logo />
            <span>
              ← Back to canvas
              <small>{PROFILE.name} — Portfolio</small>
            </span>
          </Link>
          <Link href="/#contact" className="cv-hire">
            Hire me
          </Link>
        </header>

        <section className="wk-head">
          <div className="cv-label">
            <i aria-hidden="true" />
            Page — All work
          </div>
          <h1 className="cv-h1">
            Everything I’ve <em>shaped.</em>
          </h1>
          <p className="cv-lead">
            Client work, in-house product work and the concepts I build to
            learn. Open any card with a case study for the full story.
          </p>

          <div className="wk-filters" role="tablist" aria-label="Filter work">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? "on" : ""}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : workTypeLabels[f]}
                <span>{counts[f] ?? 0}</span>
              </button>
            ))}
          </div>
        </section>

        <motion.ul layout className="wk-grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const linked = hasCaseStudy(p.slug);
              const body = (
                <>
                  <div className="wk-img">
                    <Image
                      src={p.image}
                      alt={`${p.title} preview`}
                      fill
                      sizes="(max-width: 700px) 100vw, 420px"
                      priority={i < 2}
                    />
                    {!linked && (
                      <span className="wk-flag">
                        {p.type === "professional"
                          ? "NDA · on request"
                          : "Case study soon"}
                      </span>
                    )}
                  </div>
                  <div className="wk-meta">
                    <span>{workTypeLabels[p.type]}</span>
                    <span>{p.year}</span>
                  </div>
                  <h2>{p.title}</h2>
                  <p>{p.description}</p>
                  <div className="wk-foot">
                    <span>{p.category}</span>
                    {linked && <b>Read case study →</b>}
                  </div>
                </>
              );
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {linked ? (
                    <Link
                      href={`/case-studies/${p.slug}`}
                      className="wk-card linked"
                    >
                      {body}
                    </Link>
                  ) : (
                    <article className="wk-card">{body}</article>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        <footer className="wk-end">
          <p className="cv-hand">more frames on the way ✦</p>
          <Link href="/" className="cv-btn dark">
            Back to the canvas
          </Link>
        </footer>
      </main>
    </div>
  );
}
