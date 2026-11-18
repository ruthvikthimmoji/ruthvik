"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { GUEST_ROLES, PROFILE } from "./content";

/* =========================================================
   RÉSUMÉ — opens inside the canvas like a file preview.
   Reading is free. Downloading asks for a name (sticky-note
   form), notifies Ruthvik via /api/resume-download, then
   downloads. Returning visitors skip the form.
========================================================= */

const OK_KEY = "rt-resume-identified";
const EASE = [0.16, 1, 0.3, 1] as const;

function download() {
  const a = document.createElement("a");
  a.href = PROFILE.resume;
  a.download = PROFILE.resumeFileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);
  const [asking, setAsking] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-resume", onOpen);
    return () => window.removeEventListener("open-resume", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (asking) window.setTimeout(() => nameRef.current?.focus(), 250);
  }, [asking]);

  const close = () => {
    setOpen(false);
    setAsking(false);
    setDone(false);
    setError("");
  };

  const onDownload = () => {
    let known = false;
    try {
      known = Boolean(localStorage.getItem(OK_KEY));
    } catch {}
    if (known) {
      download();
      setDone(true);
      window.setTimeout(() => setDone(false), 2500);
    } else setAsking(true);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Add your name — that’s all I need.");
      return;
    }
    setSending(true);
    // Never block the download on the network — notify in the background.
    fetch("/api/resume-download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company, role, contact, website }),
    }).catch(() => {});
    try {
      localStorage.setItem(OK_KEY, "1");
    } catch {}
    download();
    setSending(false);
    setAsking(false);
    setDone(true);
    window.setTimeout(() => setDone(false), 3000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cv cv-rv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <button type="button" className="cv-rv-scrim" aria-label="Close résumé" onClick={close} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Résumé"
            className="cv-rv-panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="cv-rv-bar">
              <div className="file">
                <span className="ic" aria-hidden="true">
                  PDF
                </span>
                <div>
                  <b>{PROFILE.resumeFileName}</b>
                  <small>{PROFILE.fullName} · {PROFILE.role}</small>
                </div>
              </div>
              <div className="acts">
                <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="ghost">
                  Open full size ↗
                </a>
                <button type="button" className="cv-btn dark" onClick={onDownload}>
                  {done ? "Downloaded ✓" : "Download"}
                </button>
                <button type="button" className="x" aria-label="Close" onClick={close}>
                  ✕
                </button>
              </div>
            </div>

            <div className="cv-rv-body">
              <iframe src={`${PROFILE.resume}#toolbar=0&view=FitH`} title={`${PROFILE.fullName} résumé`} />

              <AnimatePresence>
                {asking && (
                  <motion.form
                    className="cv-rv-ask cv-y"
                    onSubmit={submit}
                    noValidate
                    initial={{ opacity: 0, x: 40, rotate: 3 }}
                    animate={{ opacity: 1, x: 0, rotate: -1.5 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <p className="cv-gb-title">Quick hello before you go?</p>
                    <p className="cv-help" style={{ marginTop: -4 }}>
                      Just so I know who’s interested. Only your name is needed.
                    </p>

                    <label className="cv-field">
                      <span className="cv-lbl">Your name *</span>
                      <input
                        ref={nameRef}
                        value={name}
                        maxLength={80}
                        onChange={(e) => {
                          setName(e.target.value);
                          setError("");
                        }}
                        aria-invalid={Boolean(error)}
                        placeholder="Priya Sharma"
                      />
                    </label>
                    {error && <p className="cv-err">{error}</p>}

                    <label className="cv-field">
                      <span className="cv-lbl">Company (optional)</span>
                      <input value={company} maxLength={120} onChange={(e) => setCompany(e.target.value)} placeholder="Acme" />
                    </label>

                    <fieldset className="cv-roles">
                      <legend className="cv-lbl">I’m a…</legend>
                      {GUEST_ROLES.map((r) => (
                        <button key={r} type="button" aria-pressed={role === r} className={role === r ? "on" : ""} onClick={() => setRole(role === r ? "" : r)}>
                          {r}
                        </button>
                      ))}
                    </fieldset>

                    <label className="cv-field">
                      <span className="cv-lbl">Email or LinkedIn (optional)</span>
                      <input value={contact} maxLength={120} onChange={(e) => setContact(e.target.value)} placeholder="so I can follow up" />
                    </label>

                    <input className="cv-hp" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} aria-hidden="true" />

                    <div className="cv-gb-foot">
                      <button type="submit" className="cv-btn dark" disabled={sending}>
                        Download résumé ↓
                      </button>
                      <button type="button" className="cv-help" style={{ textDecoration: "underline" }} onClick={() => setAsking(false)}>
                        Cancel
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
