"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { GUEST_ROLES, PROFILE, type NoteColor } from "./content";

/* =========================================================
   GUESTBOOK — a structured sticky note composer + a wall.
   Notes are emailed to Ruthvik via /api/guestbook and pinned
   on the visitor's own wall (saved on their device).
========================================================= */

type GuestNote = {
  id: string;
  message: string;
  name: string;
  role: string;
  color: NoteColor;
  date: string;
};

const COLORS: { id: NoteColor; label: string }[] = [
  { id: "y", label: "Yellow" },
  { id: "p", label: "Pink" },
  { id: "g", label: "Green" },
  { id: "b", label: "Blue" },
  { id: "v", label: "Violet" },
];
const STORE = "rt-guestbook-notes";
const MAX = 220;
const SLOTS = 4;
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Guestbook({ compact = false }: { compact?: boolean }) {
  const [color, setColor] = useState<NoteColor>("y");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real people never see it
  const [errors, setErrors] = useState<{ message?: string; name?: string; contact?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [notes, setNotes] = useState<GuestNote[]>([]);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  /* restore this visitor's own notes (idempotent) */
  useEffect(() => {
    try {
      setNotes(JSON.parse(localStorage.getItem(STORE) || "[]"));
    } catch {}
  }, []);

  /* the Sticky tool / "S" key asks us to focus the composer */
  useEffect(() => {
    const focus = () => msgRef.current?.focus({ preventScroll: true });
    window.addEventListener("guestbook-focus", focus);
    return () => window.removeEventListener("guestbook-focus", focus);
  }, []);

  const validate = () => {
    const e: typeof errors = {};
    if (message.trim().length < 3) e.message = "Write a short note first.";
    if (!name.trim()) e.name = "Add your name so I know who it’s from.";
    const c = contact.trim();
    if (c && !/^\S+@\S+\.\S+$/.test(c) && !/linkedin\.com\//i.test(c)) e.contact = "Use an email or a LinkedIn link.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "sending" || !validate()) return;
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, name, role, contact, color, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Couldn’t send your note.");
      const note: GuestNote = {
        id: `g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        message: message.trim(),
        name: name.trim(),
        role,
        color,
        date: new Date().toISOString(),
      };
      const next = [note, ...notes].slice(0, 12);
      setNotes(next);
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {}
      setMessage("");
      setStatus("sent");
      window.setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Couldn’t send your note.");
      setStatus("error");
    }
  };

  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Note from ${name || "your portfolio"}`)}&body=${encodeURIComponent(
    `${message}\n\n— ${name}${role ? ` (${role})` : ""}${contact ? `\n${contact}` : ""}`,
  )}`;
  const empty = Math.max(0, SLOTS - notes.length);

  return (
    <div className={`cv-gb${compact ? " compact" : ""}`}>
      {/* composer */}
      <form className={`cv-composer cv-${color}`} onSubmit={submit} noValidate>
        <div className="cv-gb-head">
          <span className="cv-gb-title">Leave a note for {PROFILE.name}</span>
          <div className="cv-swatches" role="radiogroup" aria-label="Sticky colour">
            {COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={color === c.id}
                aria-label={c.label}
                className={`cv-${c.id}${color === c.id ? " on" : ""}`}
                onClick={() => setColor(c.id)}
              />
            ))}
          </div>
        </div>

        <label className="cv-field">
          <span className="sr-only">Your note</span>
          <textarea
            ref={msgRef}
            value={message}
            maxLength={MAX}
            rows={4}
            placeholder="Loved the Parity case study — are you open to a chat about our fintech team?"
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((x) => ({ ...x, message: undefined }));
            }}
            aria-invalid={Boolean(errors.message)}
          />
          <span className="cv-count">
            {message.length}/{MAX}
          </span>
        </label>
        {errors.message && <p className="cv-err">{errors.message}</p>}

        <div className="cv-row">
          <label className="cv-field">
            <span className="cv-lbl">Your name</span>
            <input
              value={name}
              maxLength={60}
              placeholder="Priya Sharma"
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((x) => ({ ...x, name: undefined }));
              }}
              aria-invalid={Boolean(errors.name)}
            />
          </label>
        </div>
        {errors.name && <p className="cv-err">{errors.name}</p>}

        <fieldset className="cv-roles">
          <legend className="cv-lbl">I’m a…</legend>
          {GUEST_ROLES.map((r) => (
            <button key={r} type="button" className={role === r ? "on" : ""} aria-pressed={role === r} onClick={() => setRole(role === r ? "" : r)}>
              {r}
            </button>
          ))}
        </fieldset>

        <label className="cv-field">
          <span className="cv-lbl">How can I reach you? (optional)</span>
          <input
            value={contact}
            maxLength={120}
            placeholder="you@company.com or linkedin.com/in/…"
            onChange={(e) => {
              setContact(e.target.value);
              if (errors.contact) setErrors((x) => ({ ...x, contact: undefined }));
            }}
            aria-invalid={Boolean(errors.contact)}
          />
          <span className="cv-help">Only {PROFILE.name} sees this — it’s used just to reply to you.</span>
        </label>
        {errors.contact && <p className="cv-err">{errors.contact}</p>}

        {/* honeypot */}
        <input className="cv-hp" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} aria-hidden="true" />

        <div className="cv-gb-foot">
          <button type="submit" className="cv-btn dark" disabled={status === "sending"}>
            {status === "sending" ? "Pinning…" : "Pin it to the wall"}
          </button>
          <AnimatePresence>
            {status === "sent" && (
              <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="cv-ok" role="status">
                Sent to {PROFILE.name} ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {status === "error" && (
          <p className="cv-err" role="alert">
            {serverError}{" "}
            <a href={mailto} style={{ textDecoration: "underline" }}>
              Email it instead
            </a>
          </p>
        )}
      </form>

      {/* wall */}
      <div className="cv-wall">
        <p className="cv-hand" style={{ fontSize: 22 }}>
          {notes.length ? "your notes on the wall ↓" : "the wall — your note lands here ↓"}
        </p>
        <div className="cv-wall-grid">
          <AnimatePresence initial={false}>
            {notes.map((n, i) => (
              <motion.div
                key={n.id}
                layout
                className={`cv-wall-note cv-${n.color}`}
                initial={{ opacity: 0, scale: 0.6, rotate: -8, y: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: [-2, 1.5, -1, 2][i % 4], y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="pin" aria-hidden="true" />
                <p>{n.message}</p>
                <small>
                  — {n.name}
                  {n.role ? ` · ${n.role}` : ""}
                </small>
                <em>Sent ✓</em>
              </motion.div>
            ))}
          </AnimatePresence>
          {Array.from({ length: empty }).map((_, i) => (
            <div key={`slot-${i}`} className="cv-wall-slot" aria-hidden="true">
              {i === 0 && notes.length === 0 ? "your note goes here" : ""}
            </div>
          ))}
        </div>
        <p className="cv-help" style={{ marginTop: 12 }}>
          Notes go privately to {PROFILE.name}. The ones you leave stay pinned here on your device.
        </p>
      </div>
    </div>
  );
}
