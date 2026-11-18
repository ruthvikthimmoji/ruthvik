"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  clean,
  getNextCaseStudy,
  type CaseStudy,
  type CaseStudyImage,
  type CaseStudySection,
  type CompareImages,
} from "@/app/data/case-studies";
import { getWalkthrough, workTypeLabels } from "@/app/data/projects";
import BriefPanel from "@/app/components/canvas/BriefPanel";
import { Dropdown } from "@/app/components/canvas/Menus";
import { openBrief, openResume, openWalkthrough } from "@/app/components/canvas/Pieces";
import ResumeViewer from "@/app/components/canvas/ResumeViewer";
import Walkthrough from "@/app/components/canvas/Walkthrough";
import "@/app/components/canvas/canvas.css";
import "./case-study.css";
import Logo from "@/app/components/canvas/Logo";

/* =========================================================
   CASE STUDY — canvas style, normal scrolling.
   Reads everything from app/data/case-studies.ts.
   Anything still containing "TODO" is hidden automatically.
========================================================= */

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL = "thimmojiruthvik@gmail.com";
const STICKY_COLORS = ["cs-y", "cs-p", "cs-g", "cs-b", "cs-v"];

const ok = (s?: string) => Boolean(clean(s));
const list = (arr?: string[]) => (arr ?? []).map((s) => clean(s)).filter(Boolean) as string[];

/* "Title — rest" or "Title: rest" → bold title + rest */
function Item({ text }: { text: string }) {
  const m = text.match(/^(.{2,60}?)\s(?:—|–)\s(.+)$/) ?? text.match(/^(.{2,48}?):\s(.+)$/);
  return m ? (
    <span>
      <strong>{m[1]}</strong> — {m[2]}
    </span>
  ) : (
    <span>{text}</span>
  );
}

/* Fade-up wrapper for each block */
function Block({ id, label, children }: { id: string; label?: ReactNode; children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className="cs-block"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {label && (
        <div className="cs-label">
          <i aria-hidden="true" />
          {label}
        </div>
      )}
      {children}
    </motion.section>
  );
}

/* Screenshot with numbered comment pins */
function Shot({ image, priority }: { image: CaseStudyImage; priority?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const caption = clean(image.caption);
  return (
    <figure className="cs-figure">
      <div className="cs-shot">
        <Image
          src={image.src}
          alt={image.alt}
          width={1600}
          height={1000}
          sizes="(max-width: 1024px) 100vw, 960px"
          priority={priority}
          style={{ width: "100%", height: "auto" }}
        />
        {image.pins?.map((p, i) => (
          <div key={i} className={`cs-pin${open === i ? " open" : ""}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <button type="button" aria-label={`Note ${i + 1}: ${p.title}`} onClick={() => setOpen(open === i ? null : i)}>
              {i + 1}
            </button>
            <div className="tip" role="note">
              <b>{p.title}</b>
              {p.note}
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* Drag (or arrow keys) to compare before / after */
function Compare({ compare }: { compare: CompareImages }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  const caption = clean(compare.caption);
  return (
    <figure className="cs-figure">
      <div
        ref={ref}
        className="cs-compare"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        <Image src={compare.before.src} alt={compare.before.alt} width={1600} height={1000} sizes="960px" style={{ width: "100%", height: "auto" }} />
        <div className="after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={compare.after.src} alt={compare.after.alt} width={1600} height={1000} sizes="960px" style={{ width: "100%" }} />
        </div>
        <span className="tag" style={{ left: 12 }}>Before</span>
        <span className="tag" style={{ right: 12 }}>After</span>
        <div className="handle" style={{ left: `${pos}%` }}>
          <span
            className="knob"
            role="slider"
            tabIndex={0}
            aria-label="Compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
            }}
          >
            ← drag →
          </span>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Callout({ text }: { text: string }) {
  return (
    <div className="cs-callout">
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
        <path d="M2 4c8 0 18 2 24 14" stroke="#fd5e02" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 16l6 4 3-7" stroke="#fd5e02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p>{text}</p>
    </div>
  );
}

function Section({ s, isPrivate, first }: { s: CaseStudySection; isPrivate?: boolean; first: boolean }) {
  const title = clean(s.title);
  const desc = clean(s.description);
  const items = list(s.items);
  const insights = (s.insights ?? []).filter((x) => ok(x.finding) && ok(x.decision));
  const images = (s.images ?? []).filter((im) => im.src);
  const callout = clean(s.callout);
  const from = s.insightLabels?.from ?? "Finding";
  const to = s.insightLabels?.to ?? "Decision";

  if (!title && !desc && !items.length && !insights.length && !images.length && !s.compare) return null;

  return (
    <Block id={s.id} label={s.label.replace(/^\d+\s*\/\s*/, (m) => m.replace("/", "—"))}>
      <div className="cs-frame">
        {title && <h2 className="cs-title">{title}</h2>}
        {desc && <p className="cs-desc">{desc}</p>}

        {items.length > 0 && (
          <ol className="cs-items">
            {items.map((t) => (
              <li key={t}>
                <Item text={t} />
              </li>
            ))}
          </ol>
        )}

        {insights.length > 0 && (
          <div className="cs-insights">
            {insights.map((x, i) => (
              <div key={i} className="cs-insight">
                <div className="f">
                  <span>{from}</span>
                  {clean(x.finding)}
                </div>
                <div className="arrow" aria-hidden="true">
                  <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
                    <path d="M1 7h22M17 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="d">
                  <span>{to}</span>
                  {clean(x.decision)}
                </div>
              </div>
            ))}
          </div>
        )}

        {isPrivate && (images.length > 0 || s.compare) ? (
          <p className="cs-private">Screens from this project are under NDA — happy to walk through them in a call.</p>
        ) : (
          <>
            {s.compare && <Compare compare={s.compare} />}
            {images.map((im, i) => (
              <Shot key={im.src + i} image={im} priority={first && i === 0} />
            ))}
          </>
        )}

        {callout && <Callout text={callout} />}
      </div>
    </Block>
  );
}

/* ---------- page ---------- */

export default function CaseStudyClient({ project: p }: { project: CaseStudy }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  const next = getNextCaseStudy(p.slug);

  const tldr = [
    { k: "The problem", v: clean(p.tldr.problem), c: "cs-y" },
    { k: "What I did", v: clean(p.tldr.solution), c: "cs-p" },
    { k: "The result", v: clean(p.tldr.result), c: "cs-g" },
  ].filter((x) => x.v);
  const goals = list(p.goals);
  const resp = list(p.responsibilities);
  const metrics = (p.metrics ?? []).filter((m) => ok(m.value) && ok(m.label));
  const reflection = list(p.reflection);
  const team = clean(p.team);
  const headline = clean(p.headline);
  const context = clean(p.context);
  const problem = clean(p.problem);
  const outcome = clean(p.outcome);
  const hasTokens = Boolean(p.tokens?.colors?.length || p.tokens?.type?.length || p.tokens?.spacing?.length);
  const sections = p.sections.filter((s) => ok(s.title) || ok(s.description));

  /* layers panel */
  const layers = [
    { id: "overview", label: "Overview" },
    ...(tldr.length ? [{ id: "tldr", label: "TL;DR" }] : []),
    ...(context || problem ? [{ id: "context", label: "Context" }] : []),
    ...sections.map((s) => ({ id: s.id, label: s.label.replace(/^\d+\s*\/\s*/, "") })),
    ...(outcome || metrics.length ? [{ id: "outcome", label: "Outcome" }] : []),
    ...(hasTokens ? [{ id: "specs", label: "Specs" }] : []),
    ...(p.figmaEmbed ? [{ id: "figma", label: "Figma file" }] : []),
  ];
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const els = layers.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.slug]);

  return (
    <div className="cs">
      <motion.div className="cs-progress" style={{ scaleX: progress }} aria-hidden="true" />

      {/* top bar */}
      <header className="cs-top">
        <Link href="/" className="cs-panel cs-file">
          <Logo />
          Ruthvik — Portfolio <span className="crumb">/ {p.title}</span>
        </Link>
        <nav className="cs-panel cs-actions" aria-label="Case study">
          <Link href="/" className="back-txt">
            ← Back to canvas
          </Link>
          {getWalkthrough(p.slug) && (
            <button type="button" className="cs-wt" onClick={() => openWalkthrough(p.slug)}>
              ▶ {getWalkthrough(p.slug)?.kind === "figma" ? "Prototype" : getWalkthrough(p.slug)?.kind === "live" ? "Live demo" : "Walkthrough"}
            </button>
          )}
          <span className="cv cs-hire-wrap">
            <Dropdown label="Hire me" menuClass="right" trigger={<span className="cv-hire">Hire me ▾</span>}>
              {(close) => (
                <>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      close();
                      openResume();
                    }}
                  >
                    Hiring for a full-time role
                    <small>View my résumé</small>
                  </button>
                  <a role="menuitem" href={`mailto:${EMAIL}`} onClick={close}>
                    Email me
                    <small>{EMAIL}</small>
                  </a>
                  <Link role="menuitem" href="/#contact" onClick={close}>
                    All contact options
                    <small>Socials & more</small>
                  </Link>
                  <div className="sep" role="separator" />
                  <button
                    type="button"
                    role="menuitem"
                    className="quiet"
                    onClick={() => {
                      close();
                      openBrief();
                    }}
                  >
                    Freelance project? Send a brief
                  </button>
                </>
              )}
            </Dropdown>
          </span>
        </nav>
      </header>
      <ResumeViewer />
      <BriefPanel />
      <Walkthrough />

      <div className="cs-wrap">
        {/* layers */}
        <aside className="cs-panel cs-layers" aria-label="On this page">
          <p>Layers</p>
          {layers.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "on" : ""}>
              <i aria-hidden="true" />
              {l.label}
            </a>
          ))}
        </aside>

        <main className="cs-main">
          {/* hero */}
          <Block id="overview" label={`Case study — ${workTypeLabels[p.type]}`}>
            <div className="cs-frame">
              <span className="cs-kicker">
                <b aria-hidden="true" />
                {p.tagline}
              </span>
              <h1 className="cs-h1">{p.title}</h1>
              {headline && <p className="cs-headline">{headline}</p>}
              <dl className="cs-meta">
                {[
                  ["Role", p.role],
                  ["Timeline", [p.year, p.duration].filter(Boolean).join(" · ")],
                  ["Team", team],
                  ["Platform", p.platform],
                  ["Tools", p.tools.join(", ")],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>
              {!p.isPrivate && p.image && (
                <div className="cs-cover">
                  <Image src={p.image} alt={`${p.title} cover`} fill priority sizes="(max-width: 1024px) 100vw, 960px" style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
              )}
            </div>
          </Block>

          {/* TL;DR stickies */}
          {tldr.length > 0 && (
            <Block id="tldr" label="TL;DR — 60 seconds">
              <div className="cs-stickies">
                {tldr.map((t, i) => (
                  <motion.div
                    key={t.k}
                    className={`cs-sticky ${t.c}`}
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: [-1.5, 1, -0.5][i] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                  >
                    <h3>{t.k}</h3>
                    <p>{t.v}</p>
                  </motion.div>
                ))}
              </div>
            </Block>
          )}

          {/* context + problem + goals */}
          {(context || problem) && (
            <Block id="context" label="01 — Context">
              <div className="cs-frame">
                <div className="cs-cols">
                  {context && (
                    <div>
                      <p className="cs-sub">Context</p>
                      <p>{context}</p>
                    </div>
                  )}
                  {problem && (
                    <div>
                      <p className="cs-sub">The problem</p>
                      <p>{problem}</p>
                    </div>
                  )}
                </div>
                {(goals.length > 0 || resp.length > 0) && (
                  <div className="cs-cols" style={{ marginTop: 36 }}>
                    {goals.length > 0 && (
                      <div>
                        <p className="cs-sub">Goals</p>
                        <ul className="cs-goals">
                          {goals.map((g) => (
                            <li key={g}>{g}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {resp.length > 0 && (
                      <div>
                        <p className="cs-sub">What I owned</p>
                        <ul className="cs-chips">
                          {resp.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Block>
          )}

          {/* sections */}
          {sections.map((s, i) => (
            <Section key={s.id} s={s} isPrivate={p.isPrivate} first={i === 0} />
          ))}

          {/* outcome */}
          {(outcome || metrics.length > 0 || reflection.length > 0) && (
            <Block id="outcome" label="Outcome">
              {metrics.length > 0 && (
                <div className="cs-metrics" style={{ marginBottom: 22 }}>
                  {metrics.map((m) => (
                    <div key={m.label} className="cs-metric">
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {outcome && (
                <div className="cs-frame">
                  <h2 className="cs-title">Where it landed.</h2>
                  <p className="cs-desc">{outcome}</p>
                </div>
              )}
              {reflection.length > 0 && (
                <>
                  <p className="cs-hand" style={{ margin: "34px 0 14px" }}>
                    what I’d tell myself next time ↓
                  </p>
                  <div className="cs-stickies">
                    {reflection.map((r, i) => (
                      <motion.div
                        key={r}
                        className={`cs-sticky ${STICKY_COLORS[(i + 3) % STICKY_COLORS.length]}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, rotate: [1, -1.5, 0.8][i % 3] }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                      >
                        <p style={{ marginTop: 0 }}>{r}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </Block>
          )}

          {/* specs / dev mode */}
          {hasTokens && (
            <Block id="specs" label="Specs — inspect mode">
              <div className="cs-frame dark">
                <h2 className="cs-title">The system underneath.</h2>
                <div className="cs-specs">
                  {p.tokens?.colors?.length ? (
                    <div>
                      <p className="cs-sub" style={{ color: "#a3a097", marginBottom: 12 }}>
                        Colour — click to copy
                      </p>
                      <div className="cs-swatches">
                        {p.tokens.colors.map((c) => (
                          <Swatch key={c.name} name={c.name} hex={c.hex} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div>
                    {p.tokens?.type?.length ? (
                      <>
                        <p className="cs-sub" style={{ color: "#a3a097" }}>
                          Type
                        </p>
                        <ul className="cs-typelist">
                          {p.tokens.type.map((t) => (
                            <li key={t.role}>
                              <span>
                                {t.role} <small>· {t.font}</small>
                              </span>
                              <small>{t.spec}</small>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                    {p.tokens?.spacing?.length ? (
                      <>
                        <p className="cs-sub" style={{ color: "#a3a097", marginTop: 24 }}>
                          Spacing
                        </p>
                        <div className="cs-spacing">
                          {p.tokens.spacing.map((s) => {
                            const n = parseInt(s, 10) || 4;
                            return (
                              <span key={s}>
                                <i style={{ width: Math.min(n, 64), height: Math.min(n, 64) }} />
                                {s}
                              </span>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </Block>
          )}

          {/* figma embed */}
          {p.figmaEmbed && (
            <Block id="figma" label="The actual Figma file">
              <div className="cs-frame">
                <h2 className="cs-title">Poke around the real file.</h2>
                <div className="cs-embed">
                  <iframe src={p.figmaEmbed} title={`${p.title} — Figma file`} loading="lazy" allowFullScreen />
                </div>
              </div>
            </Block>
          )}

          {/* next */}
          {next && (
            <Block id="next" label="Next case study">
              <Link href={`/case-studies/${next.slug}`} className="cs-next">
                <div className="img">
                  <Image src={next.image} alt={`${next.title} cover`} fill sizes="480px" style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
                <div>
                  <span className="cs-sub">{workTypeLabels[next.type]}</span>
                  <h3>{next.title} →</h3>
                  <p className="cs-desc" style={{ fontSize: 15 }}>
                    {next.tagline}
                  </p>
                </div>
              </Link>
            </Block>
          )}

          <footer className="cs-foot">
            <span>© {new Date().getFullYear()} Ruthvik P Thimmoji</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <Link href="/">← Back to the canvas</Link>
          </footer>
        </main>
      </div>
    </div>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="cs-swatch"
      onClick={() => {
        navigator.clipboard?.writeText(hex).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        });
      }}
    >
      <div className="chip" style={{ background: hex }} />
      <div className="txt">
        {name}
        <small>{copied ? "Copied ✓" : hex}</small>
      </div>
    </button>
  );
}
