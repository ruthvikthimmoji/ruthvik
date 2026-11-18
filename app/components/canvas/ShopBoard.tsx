"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { PRODUCTS, STATUS_LABEL } from "@/app/data/shop";

/* 10 — SHOP: digital products, coming soon, with a waitlist. */

export default function ShopBoard({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [picks, setPicks] = useState<string[]>([]);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const toggle = (name: string) => setPicks((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Add a valid email.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interests: picks, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Couldn’t join right now.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn’t join right now.");
      setStatus("error");
    }
  };

  return (
    <div className={`sh-board${compact ? " compact" : ""}`}>
      <div className="sh-products">
        {PRODUCTS.map((p) => {
          const live = p.status === "live" && p.href;
          const body = (
            <>
              <div className={`sh-thumb cv-${p.color}`}>
                <span className="sh-kind">{p.kind}</span>
                <span className="sh-name">{p.name}</span>
              </div>
              <div className="sh-meta">
                <span className={`sh-status ${p.status}`}>
                  <b aria-hidden="true" />
                  {STATUS_LABEL[p.status]}
                </span>
                {p.price && <span className="sh-price">{p.price}</span>}
              </div>
              <p>{p.pitch}</p>
            </>
          );
          return live ? (
            <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="sh-card live">
              {body}
            </a>
          ) : (
            <article key={p.id} className="sh-card">
              {body}
            </article>
          );
        })}
      </div>

      <div className="sh-wait">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div key="ok" className="sh-done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              <span className="cv-hand">You’re on the list ✓</span>
              <p>I’ll email {email} once, when the first product launches. No spam.</p>
            </motion.div>
          ) : (
            <motion.form key="f" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3>Get first access.</h3>
              <p className="sh-sub">Early-bird pricing for people on the list.</p>
              <fieldset className="cv-chipset">
                <legend className="cv-lbl">Interested in (optional)</legend>
                <div>
                  {PRODUCTS.filter((p) => p.status !== "live").map((p) => (
                    <button key={p.id} type="button" aria-pressed={picks.includes(p.name)} className={picks.includes(p.name) ? "on" : ""} onClick={() => toggle(p.name)}>
                      {p.name}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="sh-row">
                <input
                  type="email"
                  value={email}
                  maxLength={120}
                  placeholder="you@email.com"
                  aria-label="Email"
                  aria-invalid={Boolean(error)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
                <button type="submit" className="cv-btn dark" disabled={status === "sending"}>
                  {status === "sending" ? "Joining…" : "Notify me"}
                </button>
              </div>
              <input className="cv-hp" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} aria-hidden="true" />
              {error && (
                <p className="cv-err" role="alert">
                  {error}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
