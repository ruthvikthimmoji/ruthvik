"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Download, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { posts } from "@/app/data/writing";
import { useIsMac } from "@/app/lib/use-is-mac";
import ThemeToggle from "./ThemeToggle";

// "/#work" (not "#work") so the link also works from case study and other pages
const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  ...(posts.length > 0 ? [{ label: "Writing", href: "/writing" }] : []),
  { label: "UI", href: "/ui-designs" },
];

const openPalette = () =>
  window.dispatchEvent(new Event("open-command-palette"));

export default function Navbar() {
  const pathname = usePathname();
  const isMac = useIsMac();

  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  /* Close mobile menu when resizing to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Command palette can ask the navbar to open the résumé */
  useEffect(() => {
    const onOpenResume = () => setResumeOpen(true);
    window.addEventListener("open-resume", onOpenResume);
    return () => window.removeEventListener("open-resume", onOpenResume);
  }, []);

  /* Lock body scroll + Esc to close while menu / résumé is open */
  useEffect(() => {
    if (!open && !resumeOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setResumeOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, resumeOpen]);

  const closeMenu = () => setOpen(false);
  const openResume = () => {
    setOpen(false);
    setResumeOpen(true);
  };

  const isActive = (href: string) =>
    !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300 ${
          scrolled
            ? "border-hairline bg-paper/80 backdrop-blur-xl"
            : "border-transparent bg-paper"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 md:h-[80px] md:px-10 lg:px-12"
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Ruthvik, home"
            className="group flex items-center gap-2"
          >
            <span className="font-display text-[20px] font-semibold tracking-[-0.03em] text-ink md:text-[22px]">
              Ruthvik
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-[1.7]"
            />
          </Link>

          {/* Desktop links: hover pill slides between items, like a Figma toolbar */}
          <ul
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.label)}
                    onFocus={() => setHovered(item.label)}
                    onBlur={() => setHovered(null)}
                    className="relative block rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
                  >
                    {hovered === item.label && (
                      <motion.span
                        layoutId="nav-hover"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-sunken"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative transition-colors ${
                        active || hovered === item.label ? "text-ink" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </span>
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              className="hidden items-center gap-3 rounded-full border border-hairline bg-sunken/60 py-2 pl-4 pr-2 text-muted transition-colors hover:border-hairline-strong hover:text-ink lg:flex"
            >
              <Search size={14} strokeWidth={1.5} aria-hidden="true" />
              <span className="font-mono text-[11px]">Jump to…</span>
              <kbd className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px]">
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            </button>

            <ThemeToggle className="hidden md:flex" />

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              aria-label="Open résumé"
              className="group hidden items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-opacity hover:opacity-85 md:flex"
            >
              Résumé
              <ArrowUpRight
                size={12}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-hairline bg-paper md:hidden"
            >
              <div className="px-6 pb-8 pt-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between border-b border-hairline py-5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] tracking-[0.15em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-3xl font-medium tracking-[-0.03em] text-ink transition-transform duration-300 group-hover:translate-x-1">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.2}
                      aria-hidden="true"
                      className="text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={openResume}
                  className="flex w-full items-center justify-between border-b border-hairline py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-accent">
                      {String(navItems.length + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-medium tracking-[-0.03em] text-ink">
                      Résumé
                    </span>
                  </div>
                  <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" className="text-muted" />
                </button>

                <div className="mt-8 flex items-end justify-between gap-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      Currently
                    </span>
                    <p className="mt-2 text-sm font-medium text-ink">UX/UI Designer</p>
                    <p className="mt-1 text-xs text-muted">Studycrux</p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Résumé preview */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            <button
              type="button"
              aria-label="Close résumé preview"
              onClick={() => setResumeOpen(false)}
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Ruthvik résumé"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-hairline-strong bg-paper shadow-2xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-hairline px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="frame-label">Résumé / Ruthvik</span>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="/Ruthvikresume.pdf"
                    download
                    className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
                  >
                    Download
                    <Download size={12} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setResumeOpen(false)}
                    aria-label="Close résumé preview"
                    className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-ink"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-white">
                <iframe
                  src="/Ruthvikresume.pdf#toolbar=0"
                  title="Ruthvik résumé"
                  className="h-full w-full border-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
