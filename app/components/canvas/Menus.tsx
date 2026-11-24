"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { activeSocials, PROFILE } from "./content";
import { openResume } from "./Pieces";
import Logo from "../Logo";

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
    const onDown = (e: PointerEvent) =>
      !ref.current?.contains(e.target as Node) && setOpen(false);
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
      <button
        type="button"
        className="cv-dd-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
      >
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

export function FileMenu() {
  const [copied, setCopied] = useState(false);
  const socials = activeSocials();
  return (
    <Dropdown
      label="Portfolio menu"
      className="cv-ui cv-panel cv-tl"
      trigger={
        <>
          <Logo />
          <span className="file">
            {PROFILE.name} — Portfolio <span>/ {PROFILE.role}</span>
          </span>
          <span className="chev" aria-hidden="true">
            ▾
          </span>
        </>
      }
    >
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
            View résumé <kbd>R</kbd>
          </button>
          <Link role="menuitem" href="/work" onClick={close}>
            All work →
          </Link>
          <Link role="menuitem" href="/lab" onClick={close}>
            The lab — UI, motion, 3D →
          </Link>
          <Link role="menuitem" href="/writing" onClick={close}>
            Writing →
          </Link>
          {socials.length > 0 && <div className="sep" role="separator" />}
          {socials.map((s) => (
            <a
              key={s.label}
              role="menuitem"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              {s.label} ↗
            </a>
          ))}
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
            Shop · digital products, soon
          </Link>
        </>
      )}
    </Dropdown>
  );
}
