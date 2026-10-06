"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, Copy, ArrowUp } from "lucide-react";
import { SOCIAL_LINKS } from "../data/socials";

/* Dark closing section — same ink + terracotta as the Process section. */
const ink = "#111111";
const paper = "#F7F6F2";
const muted = "rgba(247, 246, 242, 0.55)";
const accent = "#C86B3C";
const hairline = "rgba(247, 246, 242, 0.14)";

const EMAIL = "thimmojiruthvik@gmail.com";
const PHONE_DISPLAY = "+91 63619 06550";
const PHONE_HREF = "tel:+916361906550";
const RESUME = "/Ruthvikresume.pdf";

type SpecRow = {
  label: string;
  value: string;
  href?: string;
  download?: boolean;
};

const buildRows = (time: string): SpecRow[] => [
  { label: "Role", value: "UI/UX Designer" },
  { label: "Location", value: "Bengaluru, India" },
  { label: "Local Time", value: time || "—" },
  { label: "Status", value: "Available" },
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Phone", value: PHONE_DISPLAY, href: PHONE_HREF },
  { label: "Resume", value: "Download PDF", href: RESUME, download: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions / insecure context): open mail instead
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const rows = buildRows(time);

  return (
    <section
      id="contact"
      className="relative overflow-hidden pb-10 pt-20 md:pt-32"
      style={{ backgroundColor: ink, color: paper }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] md:h-[600px] md:w-[600px] md:blur-[120px]"
        style={{ backgroundColor: accent, opacity: 0.07 }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-28 flex flex-col items-center text-center md:mb-36"
        >
          <span
            className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: muted }}
          >
            07 / Contact
          </span>

          <div
            className="mb-8 flex w-fit items-center gap-2 border px-4 py-1.5"
            style={{ borderColor: hairline }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: accent }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: muted }}
            >
              Taking on new projects
            </span>
          </div>

          <h2 className="mb-10 max-w-4xl font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] sm:text-5xl md:text-8xl md:leading-[0.92]">
            Have an idea? <br />
            Let&rsquo;s make it{" "}
            <span className="italic" style={{ color: accent }}>
              obvious.
            </span>
          </h2>

          {/* Primary action: always opens the mail client */}

          <a
            href={`mailto:${EMAIL}`}
            className="group relative inline-block pb-3 text-xl font-medium sm:text-2xl md:text-4xl"
            style={{ color: paper }}
          >
            <span className="relative block overflow-hidden py-1">
              <span className="block transition-transform duration-500 group-hover:-translate-y-[120%]">
                Connect via Email
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 hidden translate-y-full items-center justify-center font-mono text-sm transition-transform duration-500 group-hover:translate-y-0 md:flex md:text-xl"
                style={{ color: accent }}
              >
                {EMAIL}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ backgroundColor: accent }}
            />
          </a>

          {/* Secondary action: copy */}

          <div className="mt-6 flex h-6 items-center">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[#C86B3C]"
              style={{ color: copied ? accent : muted }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={12} aria-hidden="true" />
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    <Copy size={12} aria-hidden="true" />
                    Copy email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <span className="sr-only" aria-live="polite">
              {copied ? "Email copied to clipboard" : ""}
            </span>
          </div>
        </motion.div>

        {/* COLOPHON */}

        <div style={{ borderTop: `1px solid ${hairline}` }}>
          <div className="grid grid-cols-1 gap-10 pb-14 pt-14 md:grid-cols-12 md:gap-16 md:pb-16 md:pt-16">
            <div className="flex flex-col justify-between md:col-span-5">
              <div>
                <h3 className="mb-5 font-serif text-3xl font-medium tracking-[-0.03em] md:text-4xl">
                  Ruthvik Thimmoji
                  <span style={{ color: accent }}>.</span>
                </h3>
                <p
                  className="max-w-xs text-sm leading-relaxed"
                  style={{ color: muted }}
                >
                  I design functional, aesthetic digital products that
                  stand the test of time.
                </p>
              </div>

              <nav
                aria-label="Social links"
                className="mt-10 hidden flex-wrap gap-x-5 gap-y-2 md:flex"
              >
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:text-[#C86B3C]"
                    style={{ color: muted }}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-7">
              <div style={{ borderTop: `1px solid ${hairline}` }}>
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 py-3.5 md:py-4"
                    style={{ borderBottom: `1px solid ${hairline}` }}
                  >
                    <span
                      className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: accent }}
                    >
                      {row.label}
                    </span>

                    {row.href ? (
                      <a
                        href={row.href}
                        download={row.download ? true : undefined}
                        className="truncate text-right text-sm transition-colors hover:text-[#C86B3C]"
                        style={{ color: paper }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span
                        className="truncate text-right text-sm"
                        style={{ color: muted }}
                      >
                        {row.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <nav
                aria-label="Social links"
                className="mt-6 flex flex-wrap gap-x-5 gap-y-2 md:hidden"
              >
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: muted }}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* CLOSING LINE */}

          <div
            className="flex items-center justify-between gap-6 pb-2 pt-6"
            style={{ borderTop: `1px solid ${hairline}` }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: muted }}
            >
              © 2026 Ruthvik Thimmoji
            </span>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0 })}
              aria-label="Back to top"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors hover:text-[#C86B3C]"
              style={{ color: muted }}
            >
              Back to top
              <ArrowUp
                size={11}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
