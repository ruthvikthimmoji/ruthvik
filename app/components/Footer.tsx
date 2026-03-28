"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const email = "thimmojiruthvik@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-[#fcfaf7] text-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle Background Glow - Scaled down for mobile */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ff4f21]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mb-6 md:mb-8 bg-white border border-zinc-200 px-4 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
              Taking on new projects
            </span>
          </div>

          {/* Large Editorial Heading - Adjusted text sizes */}
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-medium tracking-tighter leading-[1] md:leading-[0.9] mb-8 md:mb-10 max-w-4xl">
            Have an idea? <br />
            Let’s make it{" "}
            <span className="italic font-serif text-[#ff4f21]">obvious.</span>
          </h2>

          <p className="text-lg md:text-2xl text-zinc-500 font-light max-w-2xl mb-12 md:mb-16 leading-relaxed">
            Currently available for freelance UI/UX design and frontend
            development for SaaS startups.
          </p>

          {/* Refined Action Area */}
          <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
            
            {/* Reveal & Copy Email Action */}
            <div className="relative group flex flex-col items-center w-full">
              <a
                href={`mailto:${email}`}
                onClick={handleCopy}
                className="relative inline-block text-xl sm:text-2xl md:text-4xl font-medium overflow-hidden pb-2 md:pb-3 cursor-copy"
              >
                {/* Removed fixed heights to allow natural text scaling */}
                <div className="relative overflow-hidden py-1">
                  {/* "Connect via Email" */}
                  <motion.div className="transition-transform duration-500 ease-[0.16, 1, 0.3, 1] group-hover:-translate-y-[120%]">
                    Connect via Email
                  </motion.div>

                  {/* Actual Email - Responsive font size for long emails */}
                  <motion.div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] text-[#ff4f21] font-mono text-sm sm:text-base md:text-xl flex items-center justify-center">
                    {email}
                  </motion.div>
                </div>

                {/* Animated Underline */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] md:h-[2px] bg-[#ff4f21] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
              </a>

              {/* Interaction Feedback */}
              <div className="h-6 mt-2">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-green-600"
                    >
                      Email Copied to Clipboard
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hint"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 hidden md:block"
                    >
                      Click to copy & open mail
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-8 md:gap-10 mt-2">
              <a
                href="https://www.linkedin.com/in/ruthvik-p-thimmoji-200b1a216/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#ff4f21] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="tel:+916361906550"
                className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#ff4f21] transition-colors"
              >
                Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding Overlay - Stack on mobile, row on desktop */}
      <div className="mt-24 md:mt-32 border-t border-zinc-100 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 px-8 max-w-6xl mx-auto text-zinc-400 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium">
        <p>© 2026 Designuru Studio</p>
        <div className="flex gap-4">
            <p>Bengaluru, India</p>
        </div>
      </div>
    </section>
  );
}