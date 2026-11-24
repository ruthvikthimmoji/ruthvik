import { NextResponse } from "next/server";
import { fail, isEmail, istNow, logLead, rateLimited, sendMail, text } from "@/app/lib/mail";

/* POST /api/brief — "Start a project" form → email to you. */

export const runtime = "nodejs";

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return fail("Invalid request.");
  }
  if (text(b.website, 100)) return NextResponse.json({ ok: true }); // honeypot

  const name = text(b.name, 80);
  const email = text(b.email, 120);
  const company = text(b.company, 120);
  const types = Array.isArray(b.types) ? (b.types as unknown[]).map((t) => text(t, 40)).filter(Boolean).slice(0, 6) : [];
  const budget = text(b.budget, 40);
  const timeline = text(b.timeline, 40);
  const message = typeof b.message === "string" ? b.message.trim().slice(0, 1500) : "";

  if (!name) return fail("Add your name.");
  if (!isEmail(email)) return fail("Add an email so I can reply.");
  if (message.length < 10) return fail("Tell me a little about the project.");
  if (rateLimited(req, "brief", 3)) return fail("You’ve sent a few briefs already — I’ll be in touch!", 429);

  const logged = await logLead("Project briefs", { name, email, company, types: types.join(", "), budget, timeline, message });
  const sent = await sendMail({
    subject: `🧩 New project brief from ${name}${company ? ` · ${company}` : ""}`,
    replyTo: email,
    body: [
      `New project brief from your portfolio`,
      ``,
      `Name:      ${name}`,
      `Email:     ${email}`,
      `Company:   ${company || "—"}`,
      `Type:      ${types.join(", ") || "—"}`,
      `Budget:    ${budget || "—"}`,
      `Timeline:  ${timeline || "—"}`,
      ``,
      `About the project:`,
      message,
      ``,
      `Sent ${istNow()} — just hit Reply to answer them.`,
    ].join("\n"),
  });

  if (!sent && !logged) return fail("Couldn’t send the brief right now.", 503);
  return NextResponse.json({ ok: true });
}
