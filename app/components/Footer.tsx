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
} from "lucide-react";
import { useEffect, useState } from "react";
import { SOCIAL_LINKS } from "@/app/data/socials";
import KineticText from "./KineticText";

const EMAIL = "thimmojiruthvik@gmail.com";
const PHONE_DISPLAY = "+91 63619 06550";
const PHONE_HREF = "tel:+916361906550";
const RESUME = "/Ruthvikresume.pdf";
const STATUS = "Open to full-time roles";

// Email already has its own row + buttons, so drop it from the socials list
const SOCIALS = SOCIAL_LINKS.filter(
  (link) => link.name.toLowerCase() !== "email"
);

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
    { label: "Role", value: "Product Designer (UI/UX)" },
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
    { label: "Status", value: STATUS },
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
      value: "Download résumé (PDF)",
      href: RESUME,
      download: true,
      icon: <FileDown size={12} className="text-accent" />,
    },
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-hairline bg-paper pt-24 text-ink md:pt-32"
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
          className="mb-20 flex flex-col items-center text-center md:mb-28"
        >
          {/* Availability Status Pill */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-sunken/80 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {STATUS}
            </span>
          </div>

          {/* Kinetic Headline */}
          <h2
            aria-label="Hiring a designer? Let’s make it obvious."
            className="mb-10 max-w-5xl text-4xl leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-8xl md:leading-[0.92]"
          >
            <span className="block" aria-hidden="true">
              <KineticText
                text="Hiring a designer?"
                base={520}
                peak={800}
                className="font-display font-medium"
              />
            </span>
            <span className="block" aria-hidden="true">
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
            I&apos;m looking for a full-time product design role on a team
            building SaaS or mobile products. Email is the fastest way to reach
            me.
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="Say hi"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper shadow-md transition-all duration-300 hover:opacity-90"
            >
              <span>Email me</span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={RESUME}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-paper px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:border-ink"
            >
              <FileDown size={13} aria-hidden="true" className="text-accent" />
              <span>Résumé</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="group inline-flex items-center gap-2 rounded-full px-4 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-ink"
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
                    Copied
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
                    Copy email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* ================= CONTACT DETAILS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="border-t border-hairline py-12 md:py-16"
        >
          {/* Grid order: mobile = bio → table → socials; desktop = bio + socials left, table right */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-16 md:gap-y-10">
            {/* Bio */}
            <div className="md:col-span-5">
              <span className="frame-label">Contact</span>

              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl">
                Ruthvik Thimmoji<span className="text-accent">.</span>
              </h3>

              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
                UI/UX designer with a Computer Science background, designing
                SaaS products, dashboards and design systems.
              </p>
            </div>

            {/* Details table */}
            <div className="md:col-span-7 md:row-span-2">
              <dl className="overflow-hidden rounded-xl border border-hairline bg-sunken/40 shadow-sm">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 border-b border-hairline px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-paper/40 md:px-6"
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
                            className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
            </div>

            {/* Socials (rendered once) */}
            <div className="space-y-3 md:col-span-5 md:self-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Elsewhere
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {SOCIALS.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-hairline bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:border-accent hover:text-accent"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight
                        size={10}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= COPYRIGHT BOTTOM BAR ================= */}
          <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <span className="frame-label">
              © 2026 Ruthvik Thimmoji
            </span>

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
                className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}