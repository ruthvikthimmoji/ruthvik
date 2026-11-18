"use client";

import Link from "next/link";
import { draftPosts, fmtDate, publishedPosts, type Post } from "@/app/data/writing";

/* 09 — WRITING: published posts on the left, drafts as stickies on the right. */

export const postHref = (p: Post) => p.href ?? `/writing/${p.slug}`;
const isExternal = (p: Post) => Boolean(p.href);

export function WritingLink() {
  const n = publishedPosts().length;
  return (
    <Link href="/writing" className="cv-allwork">
      All writing{n ? ` (${n})` : ""} →
    </Link>
  );
}

export function PostRow({ p }: { p: Post }) {
  const inner = (
    <>
      <span className="wr-date">{fmtDate(p.date)}</span>
      <span className="wr-main">
        <b>{p.title}</b>
        <small>{p.dek}</small>
      </span>
      <span className="wr-go" aria-hidden="true">
        {isExternal(p) ? "↗" : "→"}
      </span>
    </>
  );
  return isExternal(p) ? (
    <a href={postHref(p)} target="_blank" rel="noopener noreferrer" className="wr-row">
      {inner}
    </a>
  ) : (
    <Link href={postHref(p)} className="wr-row">
      {inner}
    </Link>
  );
}

const COLORS = ["y", "p", "b", "g", "v"];

export default function WritingBoard({ compact = false }: { compact?: boolean }) {
  const posts = publishedPosts().slice(0, 4);
  const drafts = draftPosts().slice(0, 3);
  return (
    <div className={`wr-board${compact ? " compact" : ""}`}>
      <div className="wr-list">
        <h3 className="wr-title">
          Notes on design, code <em>&amp; learning.</em>
        </h3>
        {posts.length ? (
          <div className="wr-rows">
            {posts.map((p) => (
              <PostRow key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <p className="wr-empty">
            The first essay is on its way. I’m writing about the switch from engineering to design, the work behind my case studies and what I’m
            learning in motion and 3D.
          </p>
        )}
      </div>
      {drafts.length > 0 && (
        <div className="wr-drafts">
          <p className="cv-hand">in my drafts ↓</p>
          {drafts.map((d, i) => (
            <div key={d.slug} className={`wr-draft cv-${COLORS[i % COLORS.length]}`} style={{ transform: `rotate(${[-2.5, 1.8, -1.2][i % 3]}deg)` }}>
              <span>{d.title}</span>
              <small>{d.tags.join(" · ")}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
