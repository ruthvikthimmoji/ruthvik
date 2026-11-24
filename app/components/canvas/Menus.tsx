"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { activeSocials, PROFILE, type Area } from "./content";
import { openResume } from "./Pieces";
import Logo from "./Logo";

/* Small FigJam-style dropdowns: file menu (top-left), hire menu (top-right),
   frames menu (toolbar). Close on outside click and Esc. */

export function Dropdown({
  trigger,
  className,
  menuClass,
  children,
  label,
}: {
  trigger: ReactNode;
  className?: string;
  menuClass?: string;
  label: string;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={ref} className={`cv-dd ${className ?? ""}`}>
      <button type="button" className="cv-dd-trigger" aria-haspopup="menu" aria-expanded={open} aria-label={label} onClick={() => setOpen((o) => !o)}>
        {trigger}
      </button>
      {open && (
        <div role="menu" className={`cv-dd-menu cv-panel ${menuClass ?? ""}`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function FileMenu({ active, onFly }: { active: Area; onFly: (a: Area) => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <Dropdown
      label="Portfolio menu"
      className="cv-tl"
      trigger={
        <>
          <Logo />
          <span className="file">
            {PROFILE.name} — Portfolio <span>/ {PROFILE.role}</span>
          </span>
          <span className="chev" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </span>
        </>
      }
    >
      {(close) => (
        <>
          <div className="lbl">Jump to</div>
          {LINKS.map((l) => {
            const on = !!l.area && active === l.area;
            return (
              <button
                key={l.label}
                type="button"
                role="menuitem"
                className={`row${on ? " cur" : ""}`}
                aria-current={on ? "true" : undefined}
                onClick={() => {
                  close();
                  if (l.resume) openResume();
                  else if (l.area) onFly(l.area);
                }}
              >
                {l.label}
                {l.resume ? <kbd>R</kbd> : on ? <kbd>●</kbd> : null}
              </button>
            );
          })}
          <div className="sep" role="separator" />
          <div className="lbl">Pages</div>
          <Link role="menuitem" className="row" href="/work" onClick={close}>
            All work <span>→</span>
          </Link>
          <Link role="menuitem" className="row" href="/lab" onClick={close}>
            The lab · UI, motion, 3D <span>→</span>
          </Link>
          <Link role="menuitem" className="row" href="/writing" onClick={close}>
            Writing <span>→</span>
          </Link>
          <div className="sep" role="separator" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              navigator.clipboard?.writeText(PROFILE.email).then(() => {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1400);
              });
            }}
          >
            {copied ? "Copied ✓" : `Copy email`}
            <small>{PROFILE.email}</small>
          </button>
          <div className="sep" role="separator" />
          <Link role="menuitem" href="/shop" onClick={close} className="quiet">
            Shop · free resources
          </Link>
        </>
      )}
    </Dropdown>
  );
}

/* Section links shown in the name menu */
const LINKS: { label: string; area?: Area; resume?: true }[] = [
  { label: "Home", area: "Hero" },
  { label: "Work", area: "Work" },
  { label: "Story", area: "Story" },
  { label: "Lab", area: "Lab" },
  { label: "Writing", area: "Writing" },
  { label: "Contact", area: "Contact" },
  { label: "Résumé", resume: true },
];

/* Social icons (top-right). Simple monogram glyphs, full name on hover. */
const GLYPH: Record<string, ReactNode> = {
  LinkedIn: <b>in</b>,
  Behance: <b>Bē</b>,
  Medium: <b>M</b>,
  Dribbble: <b>Dr</b>,
  GitHub: <b>GH</b>,
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor" />
    </svg>
  ),
};

export function SocialIcons() {
  return (
    <div className="cv-socicons" aria-label="Social links">
      {activeSocials().map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-tip={s.label}>
          {GLYPH[s.label] ?? <b>{s.label.slice(0, 2)}</b>}
        </a>
      ))}
    </div>
  );
}
