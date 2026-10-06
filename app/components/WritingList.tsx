"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Post } from "../data/writing";
import PostBody from "./PostBody";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

export type PostItem = Post & { dateLabel: string; minutes: number };

export default function WritingList({ items }: { items: PostItem[] }) {
  const [active, setActive] = useState<PostItem | null>(null);

  /* Lock scroll + Esc to close while the preview is open */

  useEffect(() => {
    if (!active) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (items.length === 0) {
    return (
      <p className="py-24 text-center text-sm" style={{ color: muted }}>
        The first piece is on its way.
      </p>
    );
  }

  return (
    <>
      <ul>
        {items.map((post) => (
          <li
            key={post.slug}
            className="border-b"
            style={{ borderColor: hairline }}
          >
            {/* A real link: ctrl/cmd-click, middle-click and crawlers still
                go to the full page. A plain click opens the preview. */}
            <Link
              href={`/writing/${post.slug}`}
              onClick={(e) => {
                if (
                  e.metaKey ||
                  e.ctrlKey ||
                  e.shiftKey ||
                  e.button !== 0
                )
                  return;
                e.preventDefault();
                setActive(post);
              }}
              className="group grid gap-4 py-10 md:grid-cols-[1fr_2fr_auto] md:items-start md:gap-12 md:py-14"
            >
              <div
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: muted }}
              >
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span className="mx-2">·</span>
                {post.minutes} min read
              </div>

              <div>
                <h2 className="font-serif text-3xl tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-1 md:text-5xl">
                  {post.title}
                </h2>

                <p
                  className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg"
                  style={{ color: muted }}
                >
                  {post.summary}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                        style={{ color: muted, borderColor: hairline }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <ArrowUpRight
                aria-hidden="true"
                size={20}
                strokeWidth={1.2}
                className="hidden transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:block"
                style={{ color: accent }}
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* PREVIEW */}

      <AnimatePresence>
        {active && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8"
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setActive(null)}
              className="absolute inset-0 cursor-default"
              style={{ backgroundColor: "rgba(17, 17, 17, 0.78)" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden md:h-[88vh]"
              style={{
                backgroundColor: paper,
                color: ink,
                border: "1px solid rgba(247, 246, 242, 0.2)",
                boxShadow: "0 30px 100px rgba(0,0,0,0.35)",
              }}
            >
              {/* Toolbar */}

              <div
                className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-6"
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <span
                    className="truncate font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: muted }}
                  >
                    Writing / {active.title}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <Link
                    href={`/writing/${active.slug}`}
                    className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-[#111111]"
                    style={{ color: muted }}
                  >
                    <span className="hidden sm:inline">Open full page</span>
                    <span className="sm:hidden">Open</span>
                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: accent }}
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    aria-label="Close preview"
                    autoFocus
                    className="flex h-8 w-8 items-center justify-center"
                    style={{ color: muted }}
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Content */}

              <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-16 pt-10 md:px-12">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: muted }}
                >
                  {active.dateLabel} · {active.minutes} min read
                </div>

                <h2 className="mt-5 font-serif text-4xl leading-[1] tracking-[-0.04em] md:text-5xl">
                  {active.title}
                </h2>

                <p
                  className="mt-5 text-lg leading-relaxed"
                  style={{ color: muted }}
                >
                  {active.summary}
                </p>

                <div
                  className="mt-8 border-t pt-2"
                  style={{ borderColor: hairline }}
                >
                  <PostBody blocks={active.body} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}