"use client";

import { motion } from "framer-motion";
import { projects } from "@/app/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section
      id="work"
      className="relative max-w-screen mx-auto px-6 py-32 bg-[#f6f4ef]
        text-[#111]"
    >
      {/* Section intro */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-20 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#111]">
          Selected Work
        </h2>

        <p className="text-base md:text-lg  text-[#111]">
          A few projects where I helped teams design clear, user-friendly
          digital experiences that drive real results.
        </p>
      </motion.div>

      {/* Projects grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="
              group
              p-6 rounded-2xl
              bg-[color:var(--surface)]
              border border-[#707070]
              transition-all duration-300
              hover:border-[color:var(--accent)]
              hover:-translate-y-1
              max-w-sm
              w-full
            "
          >
            {/* Project Preview */}
            <div className="h-48 rounded-xl mb-6 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                width={400} // approximate width
                height={192} // approximate height
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Tag */}
            <span className="text-xs uppercase tracking-[0.3em] text-[#707070]">
              {project.tag}
            </span>

            {/* Title */}
            <h3 className="text-xl font-semibold mt-3 mb-3 text-[#111] text-center">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-[#111] mb-6 text-center">
              {project.description}
            </p>

            <Link
              href={`/case-study/${project.slug}`}
              className="
                inline-flex items-center gap-2
                text-sm font-medium
                text-[color:var(--accent)]
                transition-colors
                group-hover:text-[color:var(--primary-hover)]
              "
            >
              View Case Study
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
      <div className="relative max-w-screen mx-auto px-6 py-12 flex items-center justify-center">
        <Link
          href="./ui-designs"
          className="
      group
      inline-flex items-center gap-2
      font-medium
      text-[color:var(--accent)]
      hover:text-[color:var(--primary)]
      transition
    "
        >
          View More
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/textures/noise.jpg')]
          opacity-[0.04]
          mix-blend-overlay
        "
      />
    </section>
  );
}
