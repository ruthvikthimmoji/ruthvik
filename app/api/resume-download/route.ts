import { NextResponse } from "next/server";
import { fail, istNow, logLead, rateLimited, sendMail, text } from "@/app/lib/mail";

/* POST /api/resume-download — tells you who downloaded your résumé.
   Never blocks the download: the client downloads either way. */

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
  const company = text(b.company, 120);
  const role = text(b.role, 40);
  const contact = text(b.contact, 120);
  const repeat = b.repeat === true;
  if (!name) return fail("Add your name.");
  if (rateLimited(req, "resume", 10)) return NextResponse.json({ ok: true });

  const [logged, sent] = await Promise.all([
    logLead("Resume downloads", { name, company, role, contact: repeat ? `${contact} (repeat download)`.trim() : contact }),
    sendMail({
    subject: `📄 ${name}${company ? ` (${company})` : ""} ${repeat ? "downloaded your résumé again" : "downloaded your résumé"}`,
    replyTo: contact,
    body: [
      `Someone downloaded your résumé`,
      ``,
      `Name:     ${name}`,
      `Company:  ${company || "—"}`,
      `Role:     ${role || "—"}`,
      `Contact:  ${contact || "—"}`,
      ``,
      `When: ${istNow()}`,
    ].join("\n"),
    }),
  ]);

  return NextResponse.json({ ok: true, emailed: sent, logged });
}
