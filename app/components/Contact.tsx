"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const email = "thimmojiruthvik@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    // This allows the user to copy without immediately 
    // launching their mail app if they prefer to just have the address.
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-[#fcfaf7] text-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4f21]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mb-8 bg-white border border-zinc-200 px-4 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
              Taking on new projects
            </span>
          </div>

          {/* Large Editorial Heading */}
          <h2 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-10 max-w-4xl">
            Have an idea? <br />
            Let’s make it{" "}
            <span className="italic font-serif text-[#ff4f21]">obvious.</span>
          </h2>

          <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-2xl mb-16 leading-relaxed">
            Currently available for freelance UI/UX design and frontend
            development for SaaS startups.
          </p>

          {/* Refined Action Area */}
          <div className="flex flex-col items-center gap-12">
            
            {/* Reveal & Copy Email Action */}
            <div className="relative group flex flex-col items-center">
              <a
                href={`mailto:${email}`}
                onClick={handleCopy}
                className="relative text-2xl md:text-4xl font-medium overflow-hidden pb-3 cursor-copy"
              >
                <div className="relative h-8 md:h-12 overflow-hidden">
                  {/* "Connect via Email" - Slides Up */}
                  <motion.div className="transition-transform duration-500 ease-[0.16, 1, 0.3, 1] group-hover:-translate-y-full">
                    Connect via Email
                  </motion.div>

                  {/* Actual Email - Slides Up from below */}
                  <motion.div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] text-[#ff4f21] font-mono text-xs md:text-xl">
                    {email}
                  </motion.div>
                </div>

                {/* Animated Underline */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff4f21] transition-transform duration-500 translate-x-[-101%] group-hover:translate-x-0" />
              </a>

              {/* Interaction Feedback */}
              <div className="h-4 mt-2">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-500"
                    >
                      Email Copied to Clipboard
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hint"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400"
                    >
                      Click to copy & open mail
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-10 mt-4">
              <a
                href="https://www.linkedin.com/in/ruthvik-p-thimmoji-200b1a216/"
                target="_blank"
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#ff4f21] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="tel:+916361906550"
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#ff4f21] transition-colors"
              >
                Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding Overlay */}
      <div className="mt-32 border-t border-zinc-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 px-8 max-w-6xl mx-auto text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-medium">
        <p>© 2026 Designuru Studio</p>
        <p>Bengaluru, India</p>
      </div>
    </section>
  );
}