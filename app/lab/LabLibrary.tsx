"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LAB, LAB_KINDS, type LabKind } from "@/app/data/lab";
import { PROFILE } from "../components/canvas/content";
import { LabMedia } from "../components/canvas/LabBoard";
import "../components/canvas/canvas.css";
import "../work/work.css";
import "./lab.css";
import Logo from "../components/canvas/Logo";

/* /lab — every UI shot, motion study and 3D piece, with a lightbox. */

type Filter = "all" | LabKind;
const FILTERS: Filter[] = ["all", "ui", "motion", "3d"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function LabLibrary() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  /* read ?kind=&item= once on load */
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const k = q.get("kind") as Filter | null;
    if (k && FILTERS.includes(k)) setFilter(k);
    const it = q.get("item");
    if (it && LAB.some((x) => x.id === it && x.src)) setOpenId(it);
  }, []);

  /* keep the URL shareable */
  useEffect(() => {
    const q = new URLSearchParams();
    if (filter !== "all") q.set("kind", filter);
    if (openId) q.set("item", openId);
    const s = q.toString();
    history.replaceState(null, "", s ? `/lab?${s}` : "/lab");
  }, [filter, openId]);

  const filled = useMemo(() => LAB.filter((i) => i.src), []);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: filled.length };
    filled.forEach((i) => (c[i.kind] = (c[i.kind] ?? 0) + 1));
    return c;
  }, [filled]);

  const kinds: LabKind[] = filter === "all" ? ["ui", "motion", "3d"] : [filter];
  const viewable = filled.filter((i) => filter === "all" || i.kind === filter);
  const idx = viewable.findIndex((i) => i.id === openId);
  const current = idx >= 0 ? viewable[idx] : null;

  const step = useCallback(
    (d: number) => {
      if (idx < 0 || !viewable.length) return;
      setOpenId(viewable[(idx + d + viewable.length) % viewable.length].id);
    },
    [idx, viewable],
  );

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [current, step]);

  return (
    <div className="cv is-ready">
      <main className="wk">
        <header className="cv-panel wk-top">
          <Link href="/#lab" className="wk-back">
            <Logo />
            <span>
              ← Back to canvas
              <small>{PROFILE.name} — Portfolio</small>
            </span>
          </Link>
          <Link href="/work" className="lab-toplink">
            Case studies →
          </Link>
        </header>

        <section className="wk-head">
          <div className="cv-label">
            <i aria-hidden="true" />
            Page — The lab
          </div>
          <h1 className="cv-h1">
            Things I’m <em>trying.</em>
          </h1>
          <p className="cv-lead">
            UI explorations, motion studies in Figma and my first steps in 3D.
            Unpolished on purpose: this is where I learn in public.
          </p>

          <div
            className="wk-filters"
            role="tablist"
            aria-label="Filter the lab"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? "on" : ""}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "Everything" : LAB_KINDS[f].label}
                <span>{counts[f] ?? 0}</span>
              </button>
            ))}
          </div>
        </section>

        {kinds.map((k) => {
          const items = LAB.filter((i) => i.kind === k);
          const shown = items.filter((i) => i.src);
          return (
            <section
              key={k}
              className="lab-sec"
              aria-label={LAB_KINDS[k].label}
            >
              <div className="lab-sec-head">
                <h2>{LAB_KINDS[k].label}</h2>
                <span className="lab-status">
                  <b aria-hidden="true" />
                  {LAB_KINDS[k].status}
                </span>
                <p>{LAB_KINDS[k].blurb}</p>
              </div>

              <ul className="lab-grid">
                {(shown.length ? shown : items.slice(0, 3)).map((it, i) => (
                  <motion.li
                    key={it.id}
                    className={`r-${it.ratio ?? "wide"}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: (i % 3) * 0.06,
                      ease: EASE,
                    }}
                  >
                    {it.src ? (
                      <button
                        type="button"
                        className="lab-card"
                        onClick={() => setOpenId(it.id)}
                      >
                        <div className="lab-media">
                          <LabMedia
                            item={it}
                            sizes="(max-width: 700px) 100vw, 420px"
                          />
                        </div>
                        <div className="lab-card-meta">
                          <b>{it.title}</b>
                          <span>
                            {it.tool} · {it.date}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="lab-card empty">
                        <div className="lab-media">
                          <LabMedia item={it} sizes="420px" />
                        </div>
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
              {!shown.length && (
                <p className="cv-hand lab-soon">first pieces landing soon ✦</p>
              )}
            </section>
          );
        })}

        <footer className="wk-end">
          <p className="cv-hand">want something like this for your product?</p>
          <Link href="/#brief" className="cv-btn dark">
            Start a project →
          </Link>
        </footer>
      </main>

      <AnimatePresence>
        {current && (
          <motion.div
            className="lab-lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="lab-lb-scrim"
              aria-label="Close"
              onClick={() => setOpenId(null)}
            />
            <motion.figure
              key={current.id}
              role="dialog"
              aria-modal="true"
              aria-label={current.title}
              className={`lab-lb-fig r-${current.ratio ?? "wide"}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="lab-lb-media">
                <LabMedia item={current} sizes="90vw" controls />
              </div>
              <figcaption>
                <div>
                  <b>{current.title}</b>
                  {current.note && <p>{current.note}</p>}
                  <span>
                    {LAB_KINDS[current.kind].label} · {current.tool} ·{" "}
                    {current.date}
                  </span>
                </div>
                {current.href && (
                  <a
                    href={current.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-btn line"
                  >
                    View original ↗
                  </a>
                )}
              </figcaption>
            </motion.figure>
            {viewable.length > 1 && (
              <>
                <button
                  type="button"
                  className="lab-lb-nav prev"
                  aria-label="Previous"
                  onClick={() => step(-1)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="lab-lb-nav next"
                  aria-label="Next"
                  onClick={() => step(1)}
                >
                  →
                </button>
              </>
            )}
            <button
              type="button"
              className="lab-lb-x"
              aria-label="Close"
              onClick={() => setOpenId(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
