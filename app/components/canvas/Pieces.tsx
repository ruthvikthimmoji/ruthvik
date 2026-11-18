"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { hasCaseStudy } from "@/app/data/case-studies";
import { getFeaturedProjects, getWalkthrough, projects, workTypeLabels } from "@/app/data/projects";
import { activeSocials, CARD_LINES, PROFILE, STEPS, WORK_COMMENT } from "./content";

/* Pieces shared by the desktop board and the mobile stack. */

export const openResume = () => window.dispatchEvent(new Event("open-resume"));
export const openBrief = () => window.dispatchEvent(new Event("open-brief"));
export const openWalkthrough = (slug: string) => window.dispatchEvent(new CustomEvent("open-walkthrough", { detail: slug }));

/* Social links as a visible row (hero, contact, footers). */
export function SocialRow({ tone = "light", label = "Find me on" }: { tone?: "light" | "dark"; label?: string }) {
  const s = activeSocials();
  if (!s.length) return null;
  return (
    <div className={`cv-socials ${tone}`}>
      {label && <span className="lbl">{label}</span>}
      {s.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

export function FrameLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="cv-label">
      <i aria-hidden="true" />
      {children}
      {right && <span className="cv-label-right">{right}</span>}
    </div>
  );
}

export function HeroBody({ onWork }: { onWork: () => void }) {
  return (
    <>
      <span className="cv-chip">
        <b aria-hidden="true" />
        {PROFILE.availability}
      </span>
      <h1 className="cv-h1">
        I design products
        <br />
        that feel <em>obvious.</em>
      </h1>
      <p className="cv-lead">
        Product designer for SaaS, fintech and admin tools. I design in Figma and build in React — so
        what you see is what gets shipped.
      </p>
      <div className="cv-btns">
        <button type="button" className="cv-btn dark" onClick={onWork}>
          See the work →
        </button>
        <button type="button" className="cv-btn line" onClick={openResume}>
          View résumé
        </button>
      </div>
      <SocialRow />
    </>
  );
}

/* "All case studies (N) →" link shown on the Work frame */
export function AllWorkLink() {
  return (
    <Link href="/work" className="cv-allwork">
      All work ({projects.length}) →
    </Link>
  );
}

export function ProjectCards({ withComment = true }: { withComment?: boolean }) {
  const projects = getFeaturedProjects().slice(0, 3);
  return (
    <>
      {projects.map((p, i) => {
        const linked = hasCaseStudy(p.slug);
        const body = (
          <>
            <div className="cv-img">
              <Image src={p.image} alt={`${p.title} preview`} fill sizes="360px" priority={i === 0} />
            </div>
            <h3>{p.title}</h3>
            <p>{CARD_LINES[p.slug] ?? p.description}</p>
            <div className="cv-meta">
              <span className="cv-tag">
                {workTypeLabels[p.type]} · {p.year}
              </span>
              {linked ? (
                <span className="go">Case study ↗</span>
              ) : p.type === "professional" ? (
                <span style={{ color: "var(--cv-muted)" }}>NDA · on request</span>
              ) : null}
            </div>
          </>
        );
        const wt = getWalkthrough(p.slug);
        const card = linked ? (
          <Link href={`/case-studies/${p.slug}`} className="cv-proj">
            {body}
          </Link>
        ) : (
          <article className="cv-proj">{body}</article>
        );
        return (
          <div key={p.slug} className="cv-proj-w">
            {card}
            {wt && (
              <button type="button" className="cv-wt-btn" onClick={() => openWalkthrough(p.slug)}>
                <span className="play" aria-hidden="true">▶</span>
                {wt.kind === "live" ? "Live demo" : wt.kind === "figma" ? "Try prototype" : "Watch walkthrough"}
                {wt.duration && <small>{wt.duration}</small>}
              </button>
            )}
          </div>
        );
      })}
      {withComment && WORK_COMMENT && (
        <div className="cv-pin" style={{ left: 300, top: 40 }} tabIndex={0}>
          <div className="av" aria-hidden="true">
            R
          </div>
          <div className="bubble" role="note">
            <b>{PROFILE.name}</b>
            {WORK_COMMENT.text}
          </div>
        </div>
      )}
    </>
  );
}

function Arrow() {
  return (
    <div className="cv-arrow" aria-hidden="true">
      <svg viewBox="0 0 100 16" preserveAspectRatio="none">
        <path d="M0 8 H96" stroke="#1d1d1b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" fill="none" />
        <path d="M90 3 L98 8 L90 13" fill="none" stroke="#1d1d1b" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export function ProcessFlow() {
  return (
    <>
      <div className="cv-hand">four moves, every project ↓</div>
      <ol className="cv-flow">
        {STEPS.map((s, i) => (
          <li key={s.k} style={{ display: "contents" }}>
            <div className={`cv-node${i === STEPS.length - 1 ? " last" : ""}`}>
              <div className="k">{s.k}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
            {i < STEPS.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
    </>
  );
}

export function ContactBody({ onBrief = openBrief, hint = true }: { onBrief?: () => void; hint?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return (
    <>
      <h2 className="cv-h1">
        Let’s make yours <em>obvious.</em>
      </h2>
      <div className="cv-mail">
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <button type="button" onClick={copy} aria-live="polite">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <div className="cv-paths">
        <button type="button" onClick={openResume}>
          <b>Hiring for a role?</b>
          <span>View my résumé →</span>
        </button>
      </div>
      <button type="button" className="cv-freelance" onClick={onBrief}>
        Freelance project? <u>Send a short brief</u>
      </button>
      <SocialRow tone="dark" label="" />
      {hint && (
        <div className="cv-hand" style={{ position: "absolute", left: 50, bottom: 30, color: "#f4f3ef", opacity: 0.7, fontSize: 20 }}>
          or pin a note in the guestbook — press S
        </div>
      )}
    </>
  );
}
