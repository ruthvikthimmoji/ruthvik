"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Download, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

/* "/#work" (not "#work") so links also work from case study pages */
const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const RESUME = "/Ruthvikresume.pdf";
const EMAIL = "thimmojiruthvik@gmail.com";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  /* Close mobile menu when resizing to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Other components (e.g. the hero) can open the résumé preview */
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300 ${
          scrolled || open ? "border-hairline bg-paper/85 backdrop-blur-xl" : "border-transparent bg-paper"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 md:h-[88px] md:px-12"
        >
          {/* Wordmark */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Ruthvik, home"
            className="font-display text-[24px] leading-none tracking-[-0.01em] md:text-[28px]"
          >
            Ruthvik<span className="text-accent">.</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[15px] font-normal text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="group hidden items-center gap-1 text-[15px] font-normal text-ink transition-colors hover:text-accent md:flex"
            >
              Résumé
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>

            <Link
              href="/#contact"
              onClick={closeMenu}
              className="rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-paper transition-transform duration-300 ease-snap hover:-translate-y-0.5 md:px-[22px] md:py-3 md:text-sm"
            >
              Let’s talk
            </Link>

            {/* Mobile menu button: two lines that cross into an X */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-hairline-strong md:hidden"
            >
              <span
                className={`h-[1.5px] w-[18px] bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-[18px] bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-[90] flex flex-col justify-between bg-paper px-5 pb-10 md:hidden"
          >
            <ul>
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-hairline"
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-baseline justify-between py-4 font-display text-[44px] leading-none"
                  >
                    {item.label}
                    <span className="text-[11px] uppercase tracking-[0.12em] text-accent">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-hairline"
              >
                <button
                  type="button"
                  onClick={openResume}
                  className="flex w-full items-baseline justify-between py-4 text-left font-display text-[44px] leading-none"
                >
                  Résumé →<span className="text-[11px] uppercase tracking-[0.12em] text-accent">04</span>
                </button>
              </motion.li>
            </ul>

            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-muted">
                  <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" />
                  Available for full-time roles
                </p>
                <a href={`mailto:${EMAIL}`} className="block text-sm font-medium text-ink">
                  {EMAIL}
                </a>
              </div>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Résumé preview (kept from the old navbar) */}
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
              className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
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
                <span className="label-caps">Résumé · Ruthvik</span>
                <div className="flex items-center gap-4">
                  <a
                    href={RESUME}
                    download
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    Download
                    <Download size={14} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
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
                <iframe src={`${RESUME}#toolbar=0`} title="Ruthvik résumé" className="h-full w-full border-none" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
