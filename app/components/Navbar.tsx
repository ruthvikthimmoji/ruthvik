"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  // { label: "Work", href: "#work" }, // homepage section
  { label: "Services", href: "/services" }, // homepage section
  { label: "About", href: "./about" }, // homepage section
  { label: "UI's", href: "/ui-designs" }, // separate page
  // { label: "Case Studies", href: "/case-studies" }, // separate page
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
    >
      <nav
        aria-label="Primary navigation"
        className="
          flex items-center gap-8
          px-6 py-3
          rounded-full
          text-[#111]
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

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                text-sm
                text-[#111]
                transition-colors duration-200
                hover:text-[color:var(--accent)]
              "
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            download
            className=" px-4 py-2 rounded-full  border border-[color:var(--primary)]
              text-[color:var(--primary)]font-medium 
            transition hover:bg-[color:var(--primary-hover)]
  "
          >
            Download Resume
          </a>

          {/* CTA */}
          <a
            href="#contact"
            className="
              ml-2 px-4 py-2 rounded-full
              bg-[color:var(--primary)]
              text-black
              text-sm font-medium
              transition-all duration-200
              hover:bg-[color:var(--primary-hover)]
              hover:scale-[1.05]
              active:scale-[0.96]
            "
          >
            Hire Me
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
