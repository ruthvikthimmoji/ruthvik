import type { Metadata } from "next";
import Link from "next/link";
import ShopBoard from "../components/canvas/ShopBoard";
import "../components/canvas/canvas.css";
import "../work/work.css";
import Logo from "../components/Logo";

export const metadata: Metadata = {
  title: "Shop — Ruthvik Thimmoji",
  description:
    "Figma templates and UI kits by Ruthvik Thimmoji. Opening soon — join the waitlist.",
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
            Page — Shop · opening soon
          </div>
          <h1 className="cv-h1">
            Tools I wish <em>I’d had.</em>
          </h1>
          <p className="cv-lead">
            Figma templates and kits built from real client work. The first one
            is in progress.
          </p>
        </section>
        <section className="wk-head" style={{ marginTop: 40 }}>
          <ShopBoard />
        </section>
      </main>
    </div>
  );
}
