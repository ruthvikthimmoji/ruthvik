"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative max-w-screen mx-auto px-6 py-32 bg-black"
    >
      {/* Accent Glow */}
      <div
        aria-hidden
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(500px_circle_at_50%_50%,rgba(249,87,56,0.12),transparent_65%)]
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-[color:var(--text-primary)]">
          Let’s work together
        </h2>

        {/* Copy */}
        <p className="text-base md:text-lg text-[color:var(--text-secondary)] mb-12">
          Have a project in mind or need help improving your product’s user
          experience? Let’s talk.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="phone:+91 6361906550"
            className="
              px-7 py-3 min-h-[44px] rounded-xl
              border border-[color:var(--secondary)]
              text-[color:var(--primary)]
              font-medium
              transition-all duration-200
              hover:border-[color:var(--primary-hover)]
              hover:scale-[1.04]
              active:scale-[0.96]
              
            "
          >
            📞 Contact
          </a>
          <a
            href="mailto:thimmojiruthvik@gmail.com"
            className="
              px-7 py-3 min-h-[44px] rounded-xl
              bg-[color:var(--primary)]
              text-black
              font-medium
              transition-all duration-200
              hover:bg-[color:var(--primary-hover)]
              hover:scale-[1.04]
              active:scale-[0.96]
              shadow-[0_10px_40px_rgba(249,87,56,0.35)]
            "
          >
             📨 Email Me
          </a>

          <a
            href="https://www.linkedin.com/in/ruthvik-p-thimmoji-200b1a216/"
            className="
              px-7 py-3 min-h-[44px] rounded-xl
              border border-[color:var(--primary)]
              text-[color:var(--primary)]
              font-medium
              transition-all duration-200
              hover:border-[color:var(--primary-hover)]
              hover:scale-[1.04]
              active:scale-[0.96]
              shadow-[0_10px_40px_rgba(249,87,56,0.35)]
            "
          >
            Linkedin
          </a>

          {/* <a
            href="https://calendly.com/yourname"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-7 py-3 min-h-[44px] rounded-xl
              border border-[color:var(--border)]
              bg-[color:var(--surface)]
              backdrop-blur-md
              text-[color:var(--text-primary)]
              transition-all duration-200
              hover:border-[color:var(--accent)]
              hover:text-[color:var(--accent)]
            "
          >
            Book a Call
          </a> */}
        </div>
      </motion.div>
    </section>
  );
}
