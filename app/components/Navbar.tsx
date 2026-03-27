"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "UI's", href: "/ui-designs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState("");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-[100] -translate-x-1/2 w-[90%] max-w-6xl"
    >
      <nav
        className="
          flex items-center justify-between
          px-8 py-4
          rounded-full
          bg-white/70
          backdrop-blur-xl
          border border-zinc-200/50
          shadow-[0_8px_32px_rgba(0,0,0,0.04)]
        "
      >
        {/* Logo - Bold & Tight */}
        <Link href="/" className="group flex items-center gap-1">
          <span className="font-bold text-lg tracking-tighter text-[#1a1a1a]">
            Ruthvik
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4f21] group-hover:scale-150 transition-transform duration-300" />
        </Link>

        {/* Desktop Links - Minimalist with Hover Effect */}
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
              className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#1a1a1a] transition-colors"
            >
              Resume
            </a>

            <Link
              href="#contact"
              className="
                px-6 py-2.5 rounded-full
                bg-[#1a1a1a]
                text-white text-xs font-bold uppercase tracking-widest
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
          className="md:hidden p-2 text-zinc-800"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu - Minimal Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-20 right-0 left-0
              rounded-3xl
              bg-white
              border border-zinc-100
              shadow-2xl
              p-8
              md:hidden
              flex flex-col gap-6
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-medium tracking-tight text-zinc-400 hover:text-[#ff4f21]"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-[1px] bg-zinc-100 my-2" />
            <a href="/resume.pdf" download className="text-zinc-500 font-medium">Download Resume</a>
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-[#1a1a1a] text-white py-4 rounded-2xl text-center font-bold uppercase tracking-widest"
            >
              Start a Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}