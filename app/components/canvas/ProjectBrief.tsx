"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { BUDGETS, PROFILE, PROJECT_TYPES, TIMELINES } from "./content";

/* =========================================================
   06 — START A PROJECT: a FigJam-style brief template.
   Sent to /api/brief → lands in Ruthvik's inbox (reply goes
   straight to the client).
========================================================= */

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Chips({
  label,
  options,
  value,
  multi,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  multi?: boolean;
  onChange: (v: string[]) => void;
}) {
  return (
    <fieldset className="cv-chipset">
      <legend className="cv-lbl">{label}</legend>
      <div>
        {options.map((o) => {
          const on = value.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              className={on ? "on" : ""}
              onClick={() => onChange(multi ? (on ? value.filter((v) => v !== o) : [...value, o]) : on ? [] : [o])}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ProjectBrief() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const clear = (k: keyof Errors) => errors[k] && setErrors((e) => ({ ...e, [k]: undefined }));

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!name.trim()) e.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Add an email so I can reply.";
    if (message.trim().length < 10) e.message = "Tell me a little about the project.";
    setErrors(e);
    if (Object.keys(e).length || status === "sending") return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, types, budget: budget[0], timeline: timeline[0], message, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Couldn’t send the brief.");
      setStatus("sent");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Couldn’t send the brief.");
      setStatus("error");
    }
  };

  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Project brief from ${name || "your portfolio"}`)}&body=${encodeURIComponent(
    [`Name: ${name}`, `Company: ${company}`, `Type: ${types.join(", ")}`, `Budget: ${budget[0] ?? ""}`, `Timeline: ${timeline[0] ?? ""}`, "", message].join("\n"),
  )}`;

  return (
    <div className="cv-brief">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="done" className="cv-brief-done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="cv-sticky-lg cv-g">
              Brief received ✓<small>I’ll reply to {email} within 48 hours.</small>
            </div>
            <button type="button" className="cv-btn line" onClick={() => setStatus("idle")}>
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="cv-brief-title">Tell me what you’re building.</h2>
            <p className="cv-brief-sub">A few quick answers — it takes about a minute.</p>

            <div className="cv-brief-grid">
              <label className="cv-field">
                <span className="cv-lbl">Your name *</span>
                <input value={name} maxLength={80} onChange={(e) => (setName(e.target.value), clear("name"))} aria-invalid={Boolean(errors.name)} placeholder="Aarav Mehta" />
                {errors.name && <span className="cv-err">{errors.name}</span>}
              </label>
              <label className="cv-field">
                <span className="cv-lbl">Email *</span>
                <input type="email" value={email} maxLength={120} onChange={(e) => (setEmail(e.target.value), clear("email"))} aria-invalid={Boolean(errors.email)} placeholder="aarav@studio.com" />
                {errors.email && <span className="cv-err">{errors.email}</span>}
              </label>
              <label className="cv-field span2">
                <span className="cv-lbl">Company or project (optional)</span>
                <input value={company} maxLength={120} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Payments" />
              </label>
            </div>

            <Chips label="What do you need?" options={PROJECT_TYPES} value={types} multi onChange={setTypes} />
            <Chips label="Budget" options={BUDGETS} value={budget} onChange={setBudget} />
            <Chips label="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />

            <label className="cv-field">
              <span className="cv-lbl">About the project *</span>
              <textarea
                rows={4}
                value={message}
                maxLength={1500}
                onChange={(e) => (setMessage(e.target.value), clear("message"))}
                aria-invalid={Boolean(errors.message)}
                placeholder="What are you building, who is it for, and where are you stuck?"
              />
              {errors.message && <span className="cv-err">{errors.message}</span>}
            </label>

            <input className="cv-hp" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} aria-hidden="true" />

            <div className="cv-gb-foot">
              <button type="submit" className="cv-btn dark" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send the brief →"}
              </button>
              <span className="cv-help">Goes straight to {PROFILE.name}’s inbox.</span>
            </div>
            {status === "error" && (
              <p className="cv-err" role="alert">
                {serverError}{" "}
                <a href={mailto} style={{ textDecoration: "underline" }}>
                  Email it instead
                </a>
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
