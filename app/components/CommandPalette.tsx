"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { caseStudies } from "@/app/data/case-studies";
import { posts } from "@/app/data/writing";
import { toggleTheme } from "@/app/lib/theme";

type Group = "Navigate" | "Case studies" | "Actions";

type Command = {
  id: string;
  label: string;
  group: Group;
  keywords?: string;
  external?: boolean;
  run: () => void;
};

const EMAIL = "thimmojiruthvik@gmail.com";

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /* ---------- command list (order here = display order) ---------- */
  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const ext = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

    return [
      { id: "work", label: "Selected work", group: "Navigate", keywords: "projects portfolio", run: go("/#work") },
      { id: "about", label: "About me", group: "Navigate", run: go("/about") },
      ...(posts.length > 0
        ? [{ id: "writing", label: "Writing", group: "Navigate" as const, keywords: "blog articles", run: go("/writing") }]
        : []),
      { id: "ui", label: "UI designs", group: "Navigate", keywords: "gallery explorations shots", run: go("/ui-designs") },
      { id: "all-cases", label: "All case studies", group: "Navigate", run: go("/case-studies") },

      ...caseStudies.filter((c) => c.published).map<Command>((c) => ({
        id: `cs-${c.slug}`,
        label: c.title,
        group: "Case studies",
        keywords: `${c.tagline} ${c.type}`,
        run: go(`/case-study/${c.slug}`),
      })),

      { id: "theme", label: "Toggle light / dark theme", group: "Actions", keywords: "mode appearance", run: toggleTheme },
      { id: "resume", label: "View résumé", group: "Actions", keywords: "cv pdf", run: () => window.dispatchEvent(new Event("open-resume")) },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        keywords: "contact",
        run: () => {
          navigator.clipboard?.writeText(EMAIL).catch(() => {});
        },
      },
      { id: "email", label: "Send an email", group: "Actions", keywords: "contact hire", run: () => (window.location.href = `mailto:${EMAIL}`) },
      { id: "linkedin", label: "LinkedIn", group: "Actions", external: true, run: ext("https://www.linkedin.com/in/ruthvik-p-thimmoji-200b1a216/") },
      { id: "behance", label: "Behance", group: "Actions", external: true, run: ext("https://www.behance.net/ruthvikthimmoji") },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ""} ${c.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  /* ---------- open / close ---------- */
  const close = () => setOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* keep the highlighted row in view while arrowing through a long list */
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    close();
    cmd.run();
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        setQuery("");
        setActive(0);
      }}
    >
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[14vh]"
        >
          <button
            type="button"
            aria-label="Close command palette"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-hairline-strong bg-paper shadow-2xl"
          >
            {/* Search field */}
            <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
              <Search size={16} strokeWidth={1.5} className="shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages, projects, actions…"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                className="w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
              />
              <kbd className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-muted">
                esc
              </kbd>
            </div>

            {/* Results */}
            <ul
              id="palette-list"
              role="listbox"
              ref={listRef}
              className="max-h-[50vh] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-10 text-center text-sm text-muted">
                  Nothing matches “{query}”.
                </li>
              )}

              {results.map((cmd, i) => {
                const showGroup = i === 0 || results[i - 1].group !== cmd.group;
                const isActive = i === active;
                return (
                  <li key={cmd.id} role="presentation">
                    {showGroup && (
                      <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {cmd.group}
                      </div>
                    )}
                    <button
                      type="button"
                      role="option"
                      id={`cmd-${cmd.id}`}
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(cmd)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-sunken text-ink" : "text-muted"
                      }`}
                    >
                      <span>{cmd.label}</span>
                      {cmd.external ? (
                        <ArrowUpRight size={14} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                      ) : isActive ? (
                        <CornerDownLeft size={14} strokeWidth={1.5} aria-hidden="true" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Footer hints */}
            <div className="flex items-center gap-4 border-t border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="ml-auto">⌘K toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
