"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Search,
  X,
} from "lucide-react";
import type { Post } from "../data/writing";
import PostBody from "./PostBody";

export type PostItem = Post & { dateLabel: string; minutes: number };

export default function WritingList({ items }: { items: PostItem[] }) {
  const [active, setActive] = useState<PostItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  const isOpen = active !== null;

  /* Unique tags */
  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["all", ...Array.from(set)];
  }, [items]);

  /* Filtered articles */
  const filtered = useMemo(() => {
    return items.filter((post) => {
      const matchesTag =
        selectedTag === "all" || post.tags.includes(selectedTag);
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [items, selectedTag, searchQuery]);

  /* Modal scroll progress */
  const handleModalScroll = () => {
    if (!modalContentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
    const progress = Math.min(
      100,
      Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100)
    );
    setReadingProgress(isNaN(progress) ? 0 : Math.round(progress));
  };

  /* Copy URL */
  const handleCopyLink = async (slug: string) => {
    const url = `${window.location.origin}/writing/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  /* Lock scroll & escape */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-hairline py-28 text-center text-muted">
        <p className="font-mono text-xs uppercase tracking-widest">
          The first essay is currently in editorial draft.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full text-ink">
      {/* ================= CONTROLS BAR ================= */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-center">
        {/* Rounded Topic Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filter essays by topic"
        >
          {allTags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-paper font-semibold shadow-xs"
                    : "border border-hairline bg-paper text-muted hover:border-hairline-strong hover:text-ink"
                }`}
              >
                {tag === "all" ? "All Essays" : tag}
              </button>
            );
          })}
        </div>

        {/* Clean Search Input */}
        <div className="relative min-w-[220px]">
          <Search
            size={13}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search essays..."
            className="w-full rounded-full border border-hairline bg-sunken/40 py-1.5 pl-9 pr-4 font-mono text-xs text-ink placeholder:text-muted/60 focus:border-accent focus:outline-hidden"
          />
        </div>
      </div>

      {/* ================= EDITORIAL ESSAY LEDGER ================= */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center font-mono text-xs uppercase tracking-widest text-muted">
          No articles match your criteria.
        </div>
      ) : (
        <ul className="divide-y divide-hairline border-b border-hairline">
          {filtered.map((post, index) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              onClick={() => setActive(post)}
              className="group relative -mx-4 rounded-xl p-5 transition-all duration-300 hover:bg-sunken/40 cursor-pointer sm:-mx-6 sm:p-7 md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-10">
                {/* Meta column */}
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5">
                  <span className="font-mono text-xs font-semibold tracking-widest text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <time dateTime={post.date} className="font-mono text-[11px] text-muted">
                    {post.dateLabel}
                  </time>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted">
                    <Clock size={10} />
                    {post.minutes}m read
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                    {post.title}
                  </h2>

                  <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {post.summary}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline bg-paper px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action Button */}
                <div className="hidden shrink-0 self-center md:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-paper text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}

      {/* ================= READING MODAL ================= */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 lg:p-10"
          >
            <button
              type="button"
              aria-label="Close reader"
              onClick={() => setActive(null)}
              className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden border border-hairline-strong bg-paper text-ink shadow-2xl md:h-[88vh] md:rounded-2xl"
            >
              {/* Reading Progress Line */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-[2.5px] w-full bg-hairline"
              >
                <div
                  style={{ width: `${readingProgress}%` }}
                  className="h-full bg-accent transition-all duration-150"
                />
              </div>

              {/* Modal Toolbar Header */}
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-hairline bg-paper/90 px-6 py-4 backdrop-blur-md">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  {readingProgress}% Read · {active.minutes} min read
                </span>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(active.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-all hover:border-hairline-strong hover:text-ink"
                  >
                    {copied ? (
                      <>
                        <Check size={11} className="text-accent" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={11} /> Share
                      </>
                    )}
                  </button>

                  <Link
                    href={`/writing/${active.slug}`}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-all hover:border-accent hover:text-accent"
                  >
                    <span>Full Page</span>
                    <ArrowUpRight size={11} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    aria-label="Close reading view"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-hairline-strong hover:text-ink"
                  >
                    <X size={15} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Scrollable Article Content */}
              <div
                ref={modalContentRef}
                onScroll={handleModalScroll}
                className="min-h-0 flex-1 overflow-y-auto px-6 py-10 sm:px-12 md:py-14"
              >
                <div className="mx-auto max-w-2xl">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <time dateTime={active.date}>{active.dateLabel}</time>
                    <span>·</span>
                    <span>{active.minutes} min read</span>
                  </div>

                  <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
                    {active.title}
                  </h1>

                  <p className="mt-5 border-l-2 border-accent pl-4 font-serif text-lg italic leading-relaxed text-muted">
                    {active.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 border-t border-hairline pt-8 text-ink">
                    <PostBody blocks={active.body} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}