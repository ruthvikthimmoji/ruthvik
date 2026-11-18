"use client";

import { motion } from "framer-motion";
import { sendEmail } from "../actions/sendEmail";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / Projects.tsx / Services / About.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.2)";

// Shared input treatment — underline field instead of a boxed pill input,
// consistent with the hairline/document language used across the site.
const inputBaseStyle = {
  backgroundColor: "transparent",
  borderBottom: `1px solid ${hairline}`,
  color: paper,
};

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await sendEmail(formData);
    setIsPending(false);
    if (result.success) setIsSuccess(true);
  }

  const fieldFocusStyle = (name: string) =>
    focusedField === name ? { borderBottomColor: brass } : {};

  return (
    <main
      className="min-h-screen pt-40 pb-20 px-6"
      style={{ backgroundColor: ink, color: paper }}
    >
      <style>{`::selection { background: ${brass}; color: ${ink}; }`}</style>

      <div className="max-w-3xl mx-auto">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ backgroundColor: brass, opacity: 0.5 }} />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em] font-medium"
              style={{ color: brass }}
            >
              Contact
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-[0.9] mb-4">
            Let&rsquo;s build <br className="hidden sm:block" />
            something{" "}
            <span className="italic" style={{ color: brass }}>
              obvious.
            </span>
          </h1>
        </header>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-2xl text-center"
            style={{ backgroundColor: "rgba(255,255,255,0.02)", border: `1px solid ${hairline}` }}
          >
            <CheckCircle2 className="mx-auto mb-6" size={40} style={{ color: brass }} />
            <h2 className="font-serif text-2xl font-medium mb-2" style={{ color: paper }}>
              Message Sent!
            </h2>
            <p style={{ color: graphite }}>I&apos;ll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="space-y-3">
              <label
                className="font-mono text-[10px] uppercase font-medium tracking-[0.2em]"
                style={{ color: graphite }}
              >
                Full Name
              </label>
              <input
                name="senderName"
                required
                onFocus={() => setFocusedField("senderName")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-1 py-3 outline-none transition-colors duration-300"
                style={{ ...inputBaseStyle, ...fieldFocusStyle("senderName") }}
              />
            </div>

            <div className="space-y-3">
              <label
                className="font-mono text-[10px] uppercase font-medium tracking-[0.2em]"
                style={{ color: graphite }}
              >
                Email Address
              </label>
              <input
                name="senderEmail"
                type="email"
                required
                onFocus={() => setFocusedField("senderEmail")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-1 py-3 outline-none transition-colors duration-300"
                style={{ ...inputBaseStyle, ...fieldFocusStyle("senderEmail") }}
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label
                className="font-mono text-[10px] uppercase font-medium tracking-[0.2em]"
                style={{ color: graphite }}
              >
                Project Details
              </label>
              <textarea
                name="message"
                rows={5}
                required
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-1 py-3 outline-none transition-colors duration-300 resize-none"
                style={{ ...inputBaseStyle, ...fieldFocusStyle("message") }}
              />
            </div>

            <button
              disabled={isPending}
              className="md:col-span-2 group flex items-center justify-center gap-3 py-5 rounded-full font-mono font-medium uppercase tracking-[0.2em] text-xs transition-all duration-300 disabled:opacity-50 mt-6"
              style={{ backgroundColor: paper, color: ink }}
              onMouseEnter={(e) => {
                if (!isPending) {
                  e.currentTarget.style.backgroundColor = brass;
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(199,162,92,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = paper;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isPending ? "Sending..." : "Send Inquiry"}
              <Send
                size={15}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </form>
        )}
      </div>
    </main>
  );
}