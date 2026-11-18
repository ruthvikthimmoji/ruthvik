import { ImageResponse } from "next/og";

/* =========================================================
   Link preview image (LinkedIn, WhatsApp, Slack, X …).
   Next.js generates it automatically at /opengraph-image —
   no design file needed. Edit the text below to change it.
========================================================= */

export const alt = "Ruthvik P Thimmoji — Product designer. I design products that feel obvious.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#f4f3ef",
          backgroundImage: "radial-gradient(#d6d3cb 2px, transparent 2px)",
          backgroundSize: "32px 32px",
          fontFamily: "sans-serif",
          color: "#1d1d1b",
        }}
      >
        {/* frame label */}
        <div style={{ position: "absolute", left: 80, top: 78, display: "flex", alignItems: "center", gap: 10, fontSize: 22, color: "#77746c" }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#fd5e02" }} />
          01 — Hello
        </div>

        {/* white frame */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 116,
            width: 760,
            height: 430,
            background: "#fff",
            borderRadius: 20,
            padding: "56px 60px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 22, color: "#77746c" }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#fd5e02" }} />
            Product designer · Bengaluru
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 26, fontSize: 76, lineHeight: 1, letterSpacing: -2, fontWeight: 600 }}>
            <span>I design products</span>
            <span style={{ display: "flex" }}>
              that feel&nbsp;<span style={{ color: "#fd5e02" }}>obvious.</span>
            </span>
          </div>
          <div style={{ marginTop: "auto", fontSize: 28, color: "#77746c" }}>Ruthvik P Thimmoji — SaaS · Fintech · Admin tools</div>
        </div>

        {/* stickies */}
        <div
          style={{
            position: "absolute",
            left: 880,
            top: 150,
            width: 240,
            height: 210,
            background: "#fff1a8",
            borderRadius: 6,
            padding: 26,
            fontSize: 30,
            lineHeight: 1.15,
            transform: "rotate(4deg)",
            boxShadow: "0 12px 26px rgba(0,0,0,0.1)",
            display: "flex",
          }}
        >
          Figma by day, React by night
        </div>
        <div
          style={{
            position: "absolute",
            left: 900,
            top: 380,
            width: 220,
            height: 170,
            background: "#ffd3e0",
            borderRadius: 6,
            padding: 24,
            fontSize: 28,
            lineHeight: 1.15,
            transform: "rotate(-3deg)",
            boxShadow: "0 12px 26px rgba(0,0,0,0.1)",
            display: "flex",
          }}
        >
          Open to full-time roles
        </div>

        {/* cursor */}
        <div style={{ position: "absolute", left: 770, top: 470, display: "flex", alignItems: "flex-start" }}>
          <svg width="30" height="33" viewBox="0 0 20 22">
            <path d="M2 2 L8.5 19 L11 11.5 L18.5 9 Z" fill="#7b61ff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <div style={{ marginTop: 22, padding: "6px 12px", borderRadius: 8, background: "#7b61ff", color: "#fff", fontSize: 20 }}>Recruiter</div>
        </div>
      </div>
    ),
    size,
  );
}
