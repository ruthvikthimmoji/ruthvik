import Link from "next/link";

/* 404 — "this frame doesn't exist", in the canvas style. */

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#f4f3ef",
        backgroundImage: "radial-gradient(#d6d3cb 1.2px, transparent 1.2px)",
        backgroundSize: "24px 24px",
        color: "#1d1d1b",
        fontFamily: "var(--font-geist, system-ui), system-ui, sans-serif",
      }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 13, fontWeight: 500, color: "#77746c" }}>
          <i style={{ width: 8, height: 8, borderRadius: 2, background: "#fd5e02", display: "inline-block" }} />
          404 — Frame not found
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "44px 40px",
            boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 8px 30px rgba(0,0,0,.05)",
          }}
        >
          <h1 style={{ font: "400 56px/1 var(--font-instrument-serif, Georgia), Georgia, serif", letterSpacing: "-0.02em", margin: 0 }}>
            This frame doesn’t <em style={{ color: "#fd5e02" }}>exist.</em>
          </h1>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: "#77746c" }}>
            Maybe it was moved, renamed, or never left the sketchbook.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              marginTop: 28,
              padding: "13px 20px",
              borderRadius: 999,
              background: "#1d1d1b",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            ← Back to the canvas
          </Link>
        </div>

        <div
          style={{
            position: "absolute",
            right: -28,
            bottom: -46,
            width: 170,
            padding: "16px 14px",
            borderRadius: 4,
            background: "#fff1a8",
            color: "#3a3627",
            transform: "rotate(4deg)",
            boxShadow: "0 2px 4px rgba(0,0,0,.06), 0 10px 20px rgba(0,0,0,.06)",
            font: "600 21px/1.15 var(--font-caveat, cursive), cursive",
          }}
        >
          note to self: check the link ✦
        </div>
      </div>
    </main>
  );
}
