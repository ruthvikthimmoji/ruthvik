"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Copy } from "lucide-react";
import { useState } from "react";
import LocalTime from "./motion/LocalTime";
import Magnetic from "./motion/Magnetic";
import RevealText from "./motion/RevealText";

/* =========================================================
   CONTACT + FOOTER — the calm ending, in navy.
   Big headline rises line by line; the email copies on click
   with a small "Copied ✓" confirmation.
========================================================= */

const EMAIL = "thimmojiruthvik@gmail.com";

/* Paste your real profile links here. Empty ones are hidden. */
const LINKS = [
  { label: "LinkedIn", href: "" },
  { label: "Behance", href: "" },
  { label: "Résumé", href: "/Ruthvikresume.pdf" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="theme-navy">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-12 md:pt-36">
        <p className="label-caps">Contact</p>

        <RevealText
          className="display-xxl mt-8"
          lines={[
            "Let’s make",
            <>
              yours <em className="emph">obvious.</em>
            </>,
          ]}
        />

        <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted">
          Hiring a product designer, or have a messy product that needs
          untangling? I usually reply within a day.
        </p>

        {/* Email + copy */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnetic strength={0.15}>
            <a
              href={`mailto:${EMAIL}`}
              className="block rounded-full bg-ink px-7 py-4 text-center text-base font-medium text-paper md:text-lg"
            >
              {EMAIL}
            </a>
          </Magnetic>

          <div className="relative">
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-hairline-strong px-5 py-4 text-sm transition-colors hover:border-ink"
            >
              <Copy size={14} strokeWidth={1.5} aria-hidden="true" />
              Copy email
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-[#023341]"
                >
                  Copied ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Links */}
        <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-hairline pt-8">
          {LINKS.filter((l) => l.href).map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-base transition-colors hover:text-accent"
              >
                {l.label}
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom bar */}
        <div className="mt-24 flex flex-col gap-4 border-t border-hairline py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Ruthvik P Thimmoji</span>
          <LocalTime />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 self-start transition-colors hover:text-ink md:self-auto"
          >
            Back to top{" "}
            <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
