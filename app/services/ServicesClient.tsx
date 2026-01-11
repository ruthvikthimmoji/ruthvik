"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Product UI/UX Design",
    description:
      "Designing clean, scalable interfaces for web & mobile products.",
    color: "bg-[#fff3b0]",
    rotate: "-rotate-2",
  },
  {
    title: "UX Strategy & Research",
    description: "User flows, IA, wireframes, and clarity before pixels.",
    color: "bg-[#ffd6a5]",
    rotate: "rotate-1",
  },
  {
    title: "Design Systems",
    description: "Reusable components & scalable systems for growing teams.",
    color: "bg-[#fdffb6]",
    rotate: "-rotate-1",
  },
  {
    title: "Redesigns & Audits",
    description: "Fixing usability issues and improving conversion.",
    color: "bg-[#caffbf]",
    rotate: "rotate-2",
  },
];

export default function ServicesClient() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] px-6 py-32 relative">
      {/* cork board texture */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[url('/textures/newsprint.jpg')]
          opacity-[0.4
          0]
         
        "
      />

      <section className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-24 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6  text-neutral-900">
            Services
          </h1>
          <p className="text-lg text-neutral-900 max-w-xl mx-auto">
            What I help teams and founders with — presented as notes from my
            design desk.
          </p>
        </motion.header>

        {/* Sticky notes grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
              className={`
                relative p-6 rounded-md
                ${service.color}
                ${service.rotate}
                shadow-[0_12px_30px_rgba(0,0,0,0.15)]
                cursor-pointer
                transition-transform
              `}
            >
              {/* pin */}
              <span
                className="
                  absolute -top-3 left-1/2 -translate-x-1/2
                  w-4 h-4 rounded-full
                  bg-red-500
                  shadow-md
                "
              />

              <h3 className="text-lg font-bold text-black mb-3">
                {service.title}
              </h3>

              <p className="text-sm text-neutral-700 leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <a
            href="#contact"
            className="
              inline-block px-10 py-4
              bg-[#f95738]
              text-white font-medium
              rounded-xl
              transition hover:scale-105
            "
          >
            Let’s Work Together →
          </a>
        </motion.footer>
      </section>
    </main>
  );
}
