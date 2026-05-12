"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Contact() {
  const email = "thimmojiruthvik@gmail.com";
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  // Update local time for that "Studio" feel
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

  return (
    <section
      id="contact"
      className="relative pt-20 md:pt-32 pb-12 bg-[#fcfaf7] text-[#1a1a1a] overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ff4f21]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-32"
        >
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mb-8 bg-white border border-zinc-200 px-4 py-1.5 rounded-full shadow-sm w-fit">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
              Taking on new projects
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-8xl font-medium tracking-tighter leading-[1] md:leading-[0.9] mb-10 max-w-4xl">
            Have an idea? <br />
            Let’s make it{" "}
            <span className="italic font-serif text-[#ff4f21]">obvious.</span>
          </h2>

          <p className="text-lg md:text-2xl text-zinc-500 font-light max-w-2xl mb-16 leading-relaxed">
            Currently available for freelance UI/UX design and frontend
            development for SaaS startups.
          </p>

          {/* Email Action */}
          <div className="relative group inline-block">
            <a
              href={`mailto:${email}`}
              onClick={handleCopy}
              className="relative inline-block text-xl sm:text-2xl md:text-4xl font-medium overflow-hidden pb-3 cursor-copy"
            >
              <div className="relative overflow-hidden py-1">
                <motion.div className="transition-transform duration-500 ease-[0.16, 1, 0.3, 1] group-hover:-translate-y-[120%]">
                  Connect via Email
                </motion.div>
                <motion.div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] text-[#ff4f21] font-mono text-sm sm:text-base md:text-xl flex items-center justify-center">
                  {email}
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#ff4f21] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
            </a>

            <div className="h-6 mt-2">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-600 block"
                  >
                    Copied to Clipboard
                  </motion.span>
                ) : (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 hidden md:block">
                    Click to copy & open mail
                  </span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* --- PROFESSIONAL FOOTER SECTION --- */}
        <div className="mt-20 border-t border-zinc-200/60 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-20">
            
            {/* Brand Column */}
            <div className="md:col-span-5">
              <h3 className="text-2xl font-medium tracking-tighter mb-6">
                Designuru<span className="text-[#ff4f21]">.</span>
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                A design-driven studio focused on building functional, 
                aesthetic digital products that stand the test of time.
              </p>
            </div>

            {/* Socials Column */}
            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-6">Socials</p>
              <nav className="flex flex-col gap-3">
                {[
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/ruthvik-p-thimmoji-200b1a216/" },
                  { name: "Twitter", href: "https://x.com/RuthvikThimmoji" },
                   { name: "Youtube", href: "https://www.youtube.com/@RuthvikDesigns" },
                  { name: "Instagram", href: "https://www.instagram.com/designurustudio/?hl=en" }
                 
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-600 hover:text-[#ff4f21] transition-colors w-fit"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-6">Inquiries</p>
              <a href={`mailto:${email}`} className="text-sm text-zinc-600 hover:text-[#ff4f21] transition-colors block mb-2 font-medium">
                {email}
              </a>
              <a href="tel:+916361906550" className="text-sm text-zinc-600 hover:text-[#ff4f21] transition-colors block mb-4">
                +91 63619 06550
              </a>
              <p className="text-xs text-zinc-400 font-light italic">Available for remote work worldwide.</p>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
              <span>© 2026 Designuru Studio</span>
              <span>Bengaluru, India</span>
            </div>
            
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
              <span className="text-zinc-800">Local Time: {time}</span>
              <button className="hover:text-[#1a1a1a] transition-colors uppercase">Privacy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}