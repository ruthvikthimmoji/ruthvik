import { NextResponse } from "next/server";
import { fail, isEmail, istNow, rateLimited, sendMail, text } from "@/app/lib/mail";

/* POST /api/waitlist — "Notify me" for digital products → email to you. */

export const runtime = "nodejs";

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return fail("Invalid request.");
  }
  if (text(b.website, 100)) return NextResponse.json({ ok: true }); // honeypot

  const email = text(b.email, 120);
  const interests = Array.isArray(b.interests) ? (b.interests as unknown[]).map((t) => text(t, 60)).filter(Boolean).slice(0, 6) : [];
  if (!isEmail(email)) return fail("Add a valid email.");
  if (rateLimited(req, "waitlist", 5)) return fail("You’re already on the list!", 429);

  const sent = await sendMail({
    subject: `🛍️ Waitlist: ${email}${interests.length ? ` · ${interests.join(", ")}` : ""}`,
    replyTo: email,
    body: [`Someone joined the shop waitlist`, ``, `Email:      ${email}`, `Interested: ${interests.join(", ") || "Everything"}`, ``, `Joined ${istNow()}`].join("\n"),
  });

  if (!sent) return fail("Couldn’t join right now.", 503);
  return NextResponse.json({ ok: true });
}
