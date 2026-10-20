"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  FileDown,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SOCIAL_LINKS } from "@/app/data/socials";
import KineticText from "./KineticText";

const EMAIL = "thimmojiruthvik@gmail.com";
const PHONE_DISPLAY = "+91 63619 06550";
const PHONE_HREF = "tel:+916361906550";
const RESUME = "/Ruthvikresume.pdf";

type SpecRow = {
  label: string;
  value: string;
  href?: string;
  download?: boolean;
  icon?: React.ReactNode;
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  /* Local time (Bengaluru) */
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
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const rows: SpecRow[] = [
    { label: "Role", value: "Product / UI/UX Designer" },
    {
      label: "Location",
      value: "Bengaluru, India",
      icon: <MapPin size={12} className="text-accent" />,
    },
    {
      label: "Local Time",
      value: time ? `${time} IST` : "—",
      icon: <Clock size={12} className="text-accent" />,
    },
    { label: "Status", value: "Available for Roles & Contracts" },
    {
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      icon: <Mail size={12} className="text-accent" />,
    },
    {
      label: "Phone",
      value: PHONE_DISPLAY,
      href: PHONE_HREF,
      icon: <Phone size={12} className="text-accent" />,
    },
    {
      label: "Résumé",
      value: "Download Curriculum Vitae",
      href: RESUME,
      download: true,
      icon: <FileDown size={12} className="text-accent" />,
    },
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-hairline bg-paper pt-24 text-ink md:pt-36"
    >
      {/* Ambient background atmosphere glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-100px] top-[100px] h-[350px] w-[350px] rounded-full bg-accent/10 blur-[120px] md:right-[-120px] md:h-[500px] md:w-[500px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[15%] left-[-150px] h-[350px] w-[350px] rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        {/* ================= HERO CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col items-center text-center md:mb-32"
        >
          {/* Availability Status Pill */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-sunken/80 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Available for Q1 2027 Opportunities
            </span>
          </div>

          {/* Kinetic Headline */}
          <h2
            aria-label="Have an idea? Let’s make it obvious."
            className="mb-10 max-w-5xl text-4xl leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-8xl md:leading-[0.92]"
          >
            <span className="block">
              <KineticText
                text="Have an idea?"
                base={520}
                peak={800}
                className="font-display font-medium"
              />
            </span>
            <span className="block">
              <KineticText
                text="Let’s make it"
                base={520}
                peak={800}
                className="font-display font-medium"
              />{" "}
              <KineticText
                text="obvious."
                base={400}
                peak={800}
                className="font-serif italic text-accent"
              />
            </span>
          </h2>

          <p className="mb-10 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Whether you need a full SaaS redesign, a cohesive mobile experience, or an early-stage design partner — let’s build something impactful.
          </p>

          {/* Connected Action Box */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Primary Email Launch Button */}
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="Say hi"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper shadow-md transition-all duration-300 hover:opacity-90"
            >
              <span>Send Message</span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Quick Copy Email Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-hairline-strong hover:text-ink"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="flex items-center gap-2 text-accent"
                  >
                    <Check size={14} aria-hidden="true" />
                    Copied to clipboard
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="flex items-center gap-2"
                  >
                    <Copy size={13} aria-hidden="true" />
                    Copy Email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* ================= SPECIFICATIONS & DOSSIER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="border-t border-hairline py-12 md:py-16"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            {/* Left Bio Column */}
            <div className="flex flex-col justify-between md:col-span-5">
              <div>
                <span className="frame-label">Design Dossier</span>

                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl">
                  Ruthvik Thimmoji<span className="text-accent">.</span>
                </h3>

                <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
                  Product Designer crafting rigorous, usable digital systems that solve real business problems without unnecessary friction.
                </p>
              </div>

              {/* Desktop Social Links */}
              <div className="mt-10 hidden space-y-3 md:block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Network &amp; Socials
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:border-accent hover:text-accent"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight
                        size={10}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Specifications Table */}
            <div className="md:col-span-7">
              <dl className="overflow-hidden rounded-xl border border-hairline bg-sunken/40 shadow-sm">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 border-b border-hairline px-5 py-4 transition-colors duration-200 hover:bg-paper/40 last:border-b-0 md:px-6 md:py-4.5"
                  >
                    <dt className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      {row.icon}
                      {row.label}
                    </dt>

                    <dd className="min-w-0 text-right text-sm">
                      {row.href ? (
                        <a
                          href={row.href}
                          download={row.download ? true : undefined}
                          className="group inline-flex max-w-full items-center gap-2 font-medium text-ink transition-colors duration-200 hover:text-accent"
                        >
                          <span className="truncate">{row.value}</span>
                          <ArrowUpRight
                            size={13}
                            aria-hidden="true"
                            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent"
                          />
                        </a>
                      ) : (
                        <span className="block truncate font-medium text-muted">
                          {row.value}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Mobile Social Links */}
              <div className="mt-8 space-y-3 md:hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Network &amp; Socials
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-all hover:border-accent hover:text-accent"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight size={10} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= COPYRIGHT BOTTOM BAR ================= */}
          <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="frame-label">© 2026 Ruthvik Thimmoji</span>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="group flex items-center gap-2 self-start rounded-full border border-hairline bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-accent hover:text-ink sm:self-auto"
            >
              Back to top
              <ArrowUp
                size={12}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 text-accent"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}