import type { Metadata } from "next";
import Link from "next/link";
import ShopBoard from "../components/canvas/ShopBoard";
import "../components/canvas/canvas.css";
import "../work/work.css";
import Logo from "../components/canvas/Logo";

export const metadata: Metadata = {
  title: "Shop — Ruthvik Thimmoji",
  description: "Free Figma resources and design kits by Ruthvik Thimmoji.",
};

export default function ShopPage() {
  return (
    <div className="cv is-ready">
      <main className="wk">
        <header className="cv-panel wk-top">
          <Link href="/" className="wk-back">
            <Logo />
            <span>
              ← Portfolio
              <small>Ruthvik — Portfolio</small>
            </span>
          </Link>
        </header>
        <section className="wk-head">
          <div className="cv-label">
            <i aria-hidden="true" />
            Page — Shop
          </div>
          <h1 className="cv-h1">
            Tools I wish <em>I’d had.</em>
          </h1>
          <p className="cv-lead">Free resources to take today, and Figma kits built from real client work. Join the list to hear when the kits launch.</p>
        </section>
        <section className="wk-head" style={{ marginTop: 40 }}>
          <ShopBoard />
        </section>
      </main>
    </div>
  );
}
