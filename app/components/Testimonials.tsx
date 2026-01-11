"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/app/data/testimonials";

export default function Testimonials() {
  return (
    <section
      className="
        relative
        max-w-screen
        mx-auto
        px-6
        py-32
        bg-[#f6f4ef]
        text-[#111]
      "
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-16 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          What Clients Say
        </h2>
        <p className="text-base md:text-lg text-neutral-700">
          Feedback from people I’ve worked with.
        </p>
      </motion.div>

      {/* Testimonials list */}
      <div className="flex flex-col items-center gap-8">
        {testimonials.map((t, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * 0.08,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="
              relative
              w-full
              max-w-2xl
              p-5
              rounded-2xl
              bg-white/70
              backdrop-blur-xl
              border border-white/40
              shadow-[0_20px_40px_rgba(0,0,0,0.12)]
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_30px_60px_rgba(0,0,0,0.18)]
            "
          >
            {/* Glossy highlight */}
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute inset-0
                rounded-2xl
                bg-gradient-to-br
                from-white/60
                via-white/10
                to-transparent
              "
            />

            {/* Noise grain */}
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute inset-0
                rounded-2xl
                bg-[url('/textures/noise.jpg')]
                opacity-[0.05]
                mix-blend-overlay
              "
            />

            {/* Card content */}
            <div className="relative flex flex-col md:flex-row gap-5">
              {/* Image */}
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <img
                  src={t.image}
                  alt={t.name}
                  className="
                    w-20 h-20
                    md:w-24 md:h-24
                    rounded-xl
                    object-cover
                    shadow-md
                  "
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center">
                <p className="text-sm md:text-base leading-relaxed mb-3 text-neutral-800">
                  “{t.feedback}”
                </p>

                <div>
                  <p className="font-medium text-[color:var(--accent)] text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-neutral-600">{t.role}</p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
