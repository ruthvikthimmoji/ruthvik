/* =========================================================
   Shared helpers for the canvas forms (brief, résumé, guestbook).
   Sends email through Resend's API — no package needed.
   Env: RESEND_API_KEY, GUESTBOOK_TO (your inbox), optional GUESTBOOK_FROM.
========================================================= */

import { NextResponse } from "next/server";

export function text(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);

export function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

/* Best-effort rate limit per IP (per server instance) */
const buckets = new Map<string, number[]>();
export function rateLimited(req: Request, scope: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) return true;
  buckets.set(key, [...recent, now]);
  return false;
}

export const istNow = () =>
  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";

/** Returns true when sent, false when not configured or failed. */
export async function sendMail({ subject, body, replyTo }: { subject: string; body: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.GUESTBOOK_TO;
  if (!key || !to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.GUESTBOOK_FROM || "Portfolio <onboarding@resend.dev>",
        to: [to],
        subject,
        text: body,
        ...(replyTo && isEmail(replyTo) ? { reply_to: replyTo } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ---------------------------------------------------------
   LEADS LOG — every form also lands as a row in your Google
   Sheet (one tab per form). Setup: see LEADS-SETUP.md.
     LEADS_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
     LEADS_SECRET=any-long-random-string (same as in the script)
--------------------------------------------------------- */
export type LeadType = "Resume downloads" | "Project briefs" | "Guestbook" | "Shop waitlist";

/** Returns true when logged, false when not configured or failed. */
export async function logLead(type: LeadType, fields: Record<string, string>) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.LEADS_SECRET ?? "", type, when: istNow(), ...fields }),
      redirect: "manual", // Apps Script answers with a 302 after saving the row
    });
    return res.status < 400 || res.type === "opaqueredirect";
  } catch {
    return false;
  }
}
