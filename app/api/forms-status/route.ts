import { NextResponse } from "next/server";
import { logLead, sendMail } from "@/app/lib/mail";

/* GET /api/forms-status — shows which form settings are set (never their values).
   GET /api/forms-status?test=1 — also sends one test email and one test sheet row. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const env = {
    RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
    GUESTBOOK_TO: Boolean(process.env.GUESTBOOK_TO),
    LEADS_WEBHOOK_URL: Boolean(process.env.LEADS_WEBHOOK_URL),
    LEADS_SECRET: Boolean(process.env.LEADS_SECRET),
    NEXT_PUBLIC_SITE_URL: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  };
  const out: Record<string, unknown> = { env };
  if (new URL(req.url).searchParams.get("test") === "1") {
    const [emailSent, sheetRowAdded] = await Promise.all([
      sendMail({ subject: "✅ Portfolio form test", body: "If you can read this, résumé / brief / guestbook / waitlist emails will reach you." }),
      logLead("Resume downloads", { name: "TEST — delete me", company: "forms-status", role: "", contact: "" }),
    ]);
    out.test = { emailSent, sheetRowAdded };
  }
  return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });
}
