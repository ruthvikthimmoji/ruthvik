"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "UI's", href: "/ui-designs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-0"
    >
      <nav
        className="
          flex items-center justify-between
          w-full max-w-6xl
          px-6 md:px-8 py-3 md:py-4
          rounded-full
          bg-white/80
          backdrop-blur-md
          border border-zinc-200/50
          shadow-[0_8px_32px_rgba(0,0,0,0.04)]
        "
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1 shrink-0">
          <span className="font-bold text-base md:text-lg tracking-tighter text-[#1a1a1a]">
            Ruthvik
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4f21] group-hover:scale-150 transition-transform duration-300" />
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
                className="relative text-sm font-medium text-zinc-500 hover:text-[#1a1a1a] transition-colors duration-300"
              >
                {item.label}
                {hoveredPath === item.label && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#ff4f21]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-zinc-200 pl-8 ml-2">
            <a
              href="/resume.pdf"
              download
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#1a1a1a] transition-colors"
            >
              Resume
            </a>
            {/* Link to the new Contact Page */}
            <Link
              href="/contact"
              className="
                px-5 py-2 rounded-full
                bg-[#1a1a1a]
                text-white text-[10px] font-bold uppercase tracking-widest
                hover:bg-[#ff4f21]
                transition-all duration-300
                hover:shadow-[0_8px_20px_rgba(255,79,33,0.3)]
              "
            >
              Hire Me
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-zinc-800 transition-transform active:scale-90"
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
            className="
              absolute top-20 right-4 left-4
              rounded-[2rem]
              bg-white/95
              backdrop-blur-xl
              border border-zinc-100
              shadow-[0_20px_40px_rgba(0,0,0,0.1)]
              p-8
              md:hidden
              flex flex-col gap-8
              z-50
            "
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
                    className="text-3xl font-medium tracking-tight text-zinc-400 active:text-[#ff4f21] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="h-px bg-zinc-100 w-full" />

            <div className="flex flex-col gap-4">
              <a
                href="/resume.pdf"
                download
                className="text-sm font-bold uppercase tracking-widest text-zinc-400"
              >
                Download Resume
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="bg-[#1a1a1a] text-white py-4 rounded-2xl text-center text-xs font-bold uppercase tracking-widest active:bg-[#ff4f21] active:shadow-lg transition-all"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
