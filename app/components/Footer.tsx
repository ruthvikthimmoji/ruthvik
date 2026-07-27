"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, ArrowUp } from "lucide-react";
import { SOCIAL_LINKS } from "../data/socials";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / OngoingWork.tsx / Projects.tsx.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";

// Rows for the spec-sheet footer. Kept as data so adding/removing a fact
// about the studio is a one-line change, not a layout change.
function useSpecRows(email: string, time: string) {
  return [
    { label: "Role", value: "UI/UX Designer" },
    { label: "Location", value: "Bengaluru, India" },
    { label: "Local Time", value: time || "—" },
    { label: "Status", value: "Available" },
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      label: "Phone",
      value: "+91 63619 06550",
      href: "tel:+916361906550",
    },
  ];
}

export default function Contact() {
  const email = "thimmojiruthvik@gmail.com";
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specRows = useSpecRows(email, time);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative pt-20 md:pt-32 pb-10 overflow-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
        style={{ backgroundColor: brass, opacity: 0.05 }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* --- CONTACT CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-28 md:mb-36"
        >
          <div
            className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full w-fit"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: `1px solid ${hairline}`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: brass }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: brass }}
              />
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em] font-medium"
              style={{ color: graphite }}
            >
              Taking on new projects
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-8xl font-medium tracking-tight leading-[1] md:leading-[0.9] mb-10 max-w-4xl font-serif">
            Have an idea? <br />
            Let&rsquo;s make it{" "}
            <span className="italic" style={{ color: brass }}>
              obvious.
            </span>
          </h2>

          <div className="relative group inline-block">
            <a
              href={`mailto:${email}`}
              onClick={handleCopy}
              className="relative inline-block text-xl sm:text-2xl md:text-4xl font-medium overflow-hidden pb-3 cursor-copy"
              style={{ color: paper }}
            >
              <div className="relative overflow-hidden py-1">
                <motion.div className="transition-transform duration-500 group-hover:-translate-y-[120%]">
                  Connect via Email
                </motion.div>
                <motion.div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 font-mono text-sm sm:text-base md:text-xl flex items-center justify-center"
                  style={{ color: brass }}
                >
                  {email}
                </motion.div>
              </div>
              <div
                className="absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ backgroundColor: brass }}
              />
            </a>

            <div className="h-6 mt-2">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1.5"
                    style={{ color: brass }}
                  >
                    <Check size={12} />
                    Copied to Clipboard
                  </motion.span>
                ) : (
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] uppercase tracking-[0.2em] hidden md:block"
                    style={{ color: graphite }}
                  >
                    Click to copy &amp; open mail
                  </span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* --- FOOTER: colophon / spec sheet, not a link grid --- */}
        <div style={{ borderTop: `1px solid ${hairline}` }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-14 md:pt-16 pb-14 md:pb-16">
            {/* Brand statement — the one large element down here */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-5 font-serif">
                  Ruthvik Thimmoji<span style={{ color: brass }}>.</span>
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-xs font-light"
                  style={{ color: graphite }}
                >
                  I design functional, aesthetic digital products that stand the
                  test of time.{" "}
                </p>
              </div>

              <nav className="hidden md:flex flex-wrap gap-x-5 gap-y-2 mt-10">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors"
                    style={{ color: graphite }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = brass)}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = graphite)
                    }
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Spec sheet — the footer's real structure */}
            <div className="md:col-span-7">
              <div style={{ borderTop: `1px solid ${hairline}` }}>
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3.5 md:py-4 gap-6"
                    style={{ borderBottom: `1px solid ${hairline}` }}
                  >
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.25em] shrink-0"
                      style={{ color: brass }}
                    >
                      {row.label}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="text-sm text-right truncate transition-colors"
                        style={{ color: paper }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = brass)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = paper)
                        }
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span
                        className="text-sm text-right truncate"
                        style={{ color: graphite }}
                      >
                        {row.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Socials on mobile — the desktop version lives under the brand column above */}
              <nav className="md:hidden flex flex-wrap gap-x-5 gap-y-2 mt-6">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: graphite }}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Closing line */}
          <div
            className="pt-6 pb-2 flex items-center justify-between gap-6"
            style={{ borderTop: `1px solid ${hairline}` }}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-[0.25em]"
              style={{ color: graphite }}
            >
              © 2026 RUTHVIK THIMMOJI
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] transition-colors group"
              style={{ color: graphite }}
              onMouseEnter={(e) => (e.currentTarget.style.color = brass)}
              onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
            >
              Back to top
              <ArrowUp
                size={11}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
