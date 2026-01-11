"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/app/data/testimonials";

export default function Testimonials() {
  return (
    <section
      className="relative max-w-screen mx-auto px-6 py-32 bg-[#f6f4ef]
        text-[#111]"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-12 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#111]">
          What Clients Say
        </h2>
        <p className="text-base md:text-lg text-[#111]">
          Feedback from people I’ve worked with.
        </p>
      </motion.div>

      {/* Testimonials grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="
              p-6 rounded-2xl
              border border-[#707070]
              transition-all duration-300
              hover:border-[color:var(--accent)]
              bg-surface
              max-w-sm w-full
            "
          >
            <div className="h-24 flex items-center justify-center overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="h-full object-contain rounded-xl"
              />
            </div>

            <p className="text-[#111] mb-6 mt-6 leading-relaxed text-center">
              “{t.feedback}”
            </p>

            <div className="text-center">
              <p className="font-medium text-[color:var(--accent)]">{t.name}</p>
              <p className="text-sm text-[color:var(--accent)]">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
