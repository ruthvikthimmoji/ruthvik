"use client";

import Link from "next/link";
import { useState } from "react";
import { activeSocials, NAV, PROFILE, type Area } from "./content";
import { openResume } from "./Pieces";
import Logo from "./Logo";

/* Figma-style left panel: always visible on wide screens so visitors
   can see every frame, page and social link without hunting for a menu.
   Collapses into a small pill (state remembered per visitor). */

const PanelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M9 4v16" />
  </svg>
);
const FrameIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <path d="M5 2v12M11 2v12M2 5h12M2 11h12" />
  </svg>
);

export default function Sidebar({
  open,
  onToggle,
  active,
  onFly,
}: {
  open: boolean;
  onToggle: () => void;
  active: Area;
  onFly: (a: Area) => void;
}) {
  const [copied, setCopied] = useState(false);
  const socials = activeSocials();

  if (!open)
    return (
      <button type="button" className="cv-ui cv-panel cv-side-pill" onClick={onToggle} aria-label="Show sidebar" aria-expanded={false}>
        <Logo />
        <span className="file">
          {PROFILE.name} — Portfolio <span>/ {PROFILE.role}</span>
        </span>
        <span className="tg">
          <PanelIcon />
        </span>
      </button>
    );

  return (
    <aside className="cv-ui cv-panel cv-side" aria-label="Portfolio navigation">
      <header className="cv-side-head">
        <Logo />
        <div className="who">
          <b>{PROFILE.name}</b>
          <span>{PROFILE.role}</span>
        </div>
        <button type="button" className="tg" onClick={onToggle} aria-label="Hide sidebar" aria-expanded={true} title="Hide sidebar">
          <PanelIcon />
        </button>
      </header>

      <div className="cv-side-status">
        <i aria-hidden="true" /> Open to full-time roles
      </div>

      <div className="cv-side-scroll">
        <section>
          <h3>Frames</h3>
          {NAV.map((n) => (
            <button key={n.area} type="button" className={`row${active === n.area ? " on" : ""}`} aria-current={active === n.area ? "true" : undefined} onClick={() => onFly(n.area)}>
              <FrameIcon />
              {n.label.replace(/^\d+ — /, "")}
              <em>{n.label.slice(0, 2)}</em>
            </button>
          ))}
        </section>

        <section>
          <h3>Pages</h3>
          <button type="button" className="row" onClick={openResume}>
            Résumé <kbd>R</kbd>
          </button>
          <Link className="row" href="/work">
            All work <span>→</span>
          </Link>
          <Link className="row" href="/lab">
            The lab <span>→</span>
          </Link>
          <Link className="row" href="/writing">
            Writing <span>→</span>
          </Link>
          <Link className="row" href="/shop">
            Shop · free resources <span>→</span>
          </Link>
        </section>

        {socials.length > 0 && (
          <section>
            <h3>Find me</h3>
            {socials.map((s) => (
              <a key={s.label} className="row" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} <span>↗</span>
              </a>
            ))}
          </section>
        )}
      </div>

      <footer className="cv-side-foot">
        <button
          type="button"
          className="mail"
          onClick={() =>
            navigator.clipboard?.writeText(PROFILE.email).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            })
          }
        >
          <span>{copied ? "Copied ✓" : "Copy email"}</span>
          <small>{PROFILE.email}</small>
        </button>
        <span className="cv-keys" tabIndex={0} aria-label="Keyboard shortcuts">
          ?
          <span className="pop" role="tooltip">
            Drag to pan · <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + scroll to zoom
            <br />
            <kbd>S</kbd> note · <kbd>E</kbd> stamp · <kbd>R</kbd> résumé · <kbd>⇧1</kbd> fit
          </span>
        </span>
      </footer>
    </aside>
  );
}
