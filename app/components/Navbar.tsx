"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "UI's", href: "/ui-designs" },
];

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx — kept in sync so the nav reads as one system with
// the section beneath it, not a separate light-mode component on a dark page.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.18)";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Escape-to-close + body scroll lock while the resume modal is open
  useEffect(() => {
    if (!resumeOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResumeOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [resumeOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-0"
      >
        <nav
          className="flex items-center justify-between w-full max-w-6xl px-6 md:px-8 py-3 md:py-4 rounded-full backdrop-blur-md"
          style={{
            backgroundColor: "rgba(14, 14, 16, 0.75)",
            border: `1px solid ${hairline}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5 shrink-0">
            <span className="font-serif text-base md:text-lg tracking-tight" style={{ color: paper }}>
              Ruthvik
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform duration-300"
              style={{ backgroundColor: brass }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8 relative">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.label)}
                  onMouseLeave={() => setHoveredPath("")}
                  className="relative font-mono text-[11px] uppercase tracking-[0.15em] font-medium transition-colors duration-300"
                  style={{ color: hoveredPath === item.label ? paper : graphite }}
                >
                  {item.label}
                  {hoveredPath === item.label && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 w-full h-[1px]"
                      style={{ backgroundColor: brass }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5 pl-8 ml-2" style={{ borderLeft: `1px solid ${hairline}` }}>
              {/* Resume now opens a preview modal instead of downloading directly */}
              <button
                onClick={() => setResumeOpen(true)}
                className="font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
                style={{ color: graphite }}
                onMouseEnter={(e) => (e.currentTarget.style.color = paper)}
                onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
              >
                Resume
              </button>
              <Link
                href="/contact"
                className="px-5 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
                style={{ backgroundColor: paper, color: ink }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = brass;
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(199,162,92,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = paper;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Hire Me
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 transition-transform active:scale-90"
            style={{ color: paper }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute top-20 right-4 left-4 rounded-[2rem] backdrop-blur-xl p-8 md:hidden flex flex-col gap-8 z-50"
              style={{
                backgroundColor: "rgba(14, 14, 16, 0.92)",
                border: `1px solid ${hairline}`,
                boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
              }}
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-3xl tracking-tight transition-colors"
                      style={{ color: graphite }}
                      onTouchStart={(e) => (e.currentTarget.style.color = brass)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="h-px w-full" style={{ backgroundColor: hairline }} />

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    setResumeOpen(true);
                  }}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-left"
                  style={{ color: graphite }}
                >
                  Preview Resume
                </button>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="py-4 rounded-2xl text-center font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all"
                  style={{ backgroundColor: paper, color: ink }}
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Resume preview modal */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(14, 14, 16, 0.85)" }}
              onClick={() => setResumeOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl h-[85vh] rounded-2xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: ink,
                border: `1px solid ${hairline}`,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* Modal header */}
              <div
                className="flex items-center justify-between px-5 md:px-6 py-4 shrink-0"
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.25em] font-medium"
                  style={{ color: brass }}
                >
                  Resume Preview
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="/Ruthvikresume.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300"
                    style={{ backgroundColor: paper, color: ink }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brass)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = paper)}
                  >
                    Download
                    <Download size={13} />
                  </a>
                  <button
                    onClick={() => setResumeOpen(false)}
                    aria-label="Close resume preview"
                    className="p-2 rounded-full transition-colors"
                    style={{ color: graphite }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = paper)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF preview */}
              <div className="flex-1 bg-white">
                <iframe
                  src="/Ruthvikresume.pdf#toolbar=0"
                  title="Resume preview"
                  className="w-full h-full border-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}