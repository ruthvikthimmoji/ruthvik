import { NextResponse } from "next/server";

/* =========================================================
   POST /api/guestbook
   Receives a sticky note from the canvas and emails it to you
   via Resend (https://resend.com — free tier is plenty).

   Add these to .env.local (and to Vercel → Settings → Environment Variables):
     RESEND_API_KEY=re_xxxxxxxx
     GUESTBOOK_TO=thimmojiruthvik@gmail.com
     # optional, once you verify your own domain in Resend:
     # GUESTBOOK_FROM="Portfolio guestbook <notes@yourdomain.com>"
========================================================= */

export const runtime = "nodejs";

const ROLES = ["Recruiter", "Hiring manager", "Founder", "Designer", "Just visiting"];

/* Best-effort rate limit: 5 notes per 10 minutes per IP (per server instance) */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function text(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.");
  }

  // Honeypot: bots fill every field. Pretend it worked.
  if (text(body.website, 100)) return NextResponse.json({ ok: true });

  const message = text(body.message, 220);
  const name = text(body.name, 60);
  const role = ROLES.includes(String(body.role)) ? String(body.role) : "";
  const contact = text(body.contact, 120);

  if (message.length < 3) return fail("Write a short note first.");
  if (!name) return fail("Add your name so I know who it’s from.");
  const isEmail = /^\S+@\S+\.\S+$/.test(contact);
  if (contact && !isEmail && !/linkedin\.com\//i.test(contact)) return fail("Use an email or a LinkedIn link.");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return fail("That’s a lot of notes! Try again in a few minutes.", 429);
  hits.set(ip, [...recent, now]);

  const key = process.env.RESEND_API_KEY;
  const to = process.env.GUESTBOOK_TO;
  if (!key || !to) return fail("The guestbook isn’t connected yet.", 503);

  const lines = [
    `New sticky note on your portfolio`,
    ``,
    `“${message}”`,
    ``,
    `From: ${name}${role ? ` (${role})` : ""}`,
    `Reach them: ${contact || "not provided"}`,
    `Sent: ${new Date(now).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.GUESTBOOK_FROM || "Portfolio guestbook <onboarding@resend.dev>",
        to: [to],
        subject: `📌 New note from ${name}${role ? ` · ${role}` : ""}`,
        text: lines.join("\n"),
        ...(isEmail ? { reply_to: contact } : {}),
      }),
    });
    if (!res.ok) return fail("Couldn’t send your note right now.", 502);
  } catch {
    return fail("Couldn’t send your note right now.", 502);
  }

  return NextResponse.json({ ok: true });
}
