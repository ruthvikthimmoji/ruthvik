import type { Metadata } from "next";
import Link from "next/link";
import { draftPosts, publishedPosts } from "@/app/data/writing";
import { PostRow } from "../components/canvas/WritingBoard";
import "../components/canvas/canvas.css";
import "../work/work.css";
import "./writing.css";
import Logo from "../components/canvas/Logo";

export const metadata: Metadata = {
  title: "Writing — Ruthvik Thimmoji",
  description: "Notes on product design, code and learning in public by Ruthvik Thimmoji.",
};

export default function WritingPage() {
  const posts = publishedPosts();
  const drafts = draftPosts();
  return (
    <div className="cv is-ready">
      <main className="wk">
        <header className="cv-panel wk-top">
          <Link href="/#writing" className="wk-back">
            <Logo />
            <span>
              ← Back to canvas
              <small>Ruthvik — Portfolio</small>
            </span>
          </Link>
          <Link href="/lab" className="lab-toplink">
            The lab →
          </Link>
        </header>

        <section className="wk-head wr-head">
          <div className="cv-label">
            <i aria-hidden="true" />
            Page — Writing
          </div>
          <h1 className="cv-h1">
            Notes on design, code <em>&amp; learning.</em>
          </h1>
          <p className="cv-lead">Short essays on how I work, what my projects taught me and what I’m picking up along the way.</p>
        </section>

        <section className="wr-page">
          {posts.length ? (
            <div className="wr-rows">
              {posts.map((p) => (
                <PostRow key={p.slug} p={p} />
              ))}
            </div>
          ) : (
            <p className="wr-empty">Nothing published yet. The first essay is close.</p>
          )}

          {drafts.length > 0 && (
            <div className="wr-upnext">
              <p className="cv-hand">coming up ↓</p>
              <ul>
                {drafts.map((d) => (
                  <li key={d.slug}>
                    <b>{d.title}</b>
                    <span>{d.dek}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
