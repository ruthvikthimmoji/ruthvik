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

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-5xl"
    >
      <nav
        className="
          flex items-center justify-between
          px-6 py-3
          rounded-full
          bg-[color:var(--surface)]
          backdrop-blur-md
          border border-[color:var(--border)]
          shadow-[0_10px_40px_rgba(0,0,0,0.4)]
        "
      >
        {/* Logo */}
        <Link href="/" className="font-semibold text-base text-[#111]">
          Ruthvik<span className="text-[color:var(--accent)]">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-[#111] hover:text-[color:var(--accent)] transition"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="/resume.pdf"
            download
            className="px-4 py-2 rounded-full border border-[color:var(--primary)]
            text-sm font-medium text-[color:var(--primary)]
            hover:bg-[color:var(--primary-hover)] transition"
          >
            Resume
          </a>

          <a
            href="#contact"
            className="
              px-4 py-2 rounded-full
              bg-[color:var(--primary)]
              text-black text-sm font-medium
              hover:bg-[color:var(--primary-hover)]
              transition"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#111]"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="
              mt-3 rounded-2xl
              bg-[color:var(--surface)]
              border border-[color:var(--border)]
              backdrop-blur-md
              shadow-xl
              p-6
              md:hidden
            "
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[#111] text-sm hover:text-[color:var(--accent)]"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="/resume.pdf"
                download
                className="text-sm font-medium text-[color:var(--primary)]"
              >
                Download Resume
              </a>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="
                  mt-2 px-4 py-2 rounded-full
                  bg-[color:var(--primary)]
                  text-black text-sm font-medium text-center
                "
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
