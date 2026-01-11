"use client";

import { projects } from "@/app/data/projects";
import { caseStudies } from "@/app/data/case-studies";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section className="relative max-w-screen mx-auto px-6 py-32 bg-[#f6f4ef] text-[#111]">
      {/* Section intro */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-20 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Selected Work
        </h2>
        <p className="text-base md:text-lg">
          A few projects where I helped teams design clear, user-friendly
          digital experiences.
        </p>
      </motion.div>

      {/* Projects grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => {
          // check if this project has a case study
          const hasCaseStudy = caseStudies.some(
            (cs) => cs.slug === project.slug
          );

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-white border hover:border-[#f95738] transition max-w-sm w-full"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-48 w-full object-cover rounded-xl mb-6"
              />

              <span className="text-xs uppercase tracking-widest text-neutral-500">
                {project.tag}
              </span>

              <h3 className="text-xl font-semibold mt-3 mb-3 text-center">
                {project.title}
              </h3>

              <p className="text-sm text-neutral-600 mb-6 text-center">
                {project.description}
              </p>

              {hasCaseStudy && (
                <Link
                  href={`./case-study/${project.slug.toLowerCase()}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#f95738]"
                >
                  View Case Study
                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </Link>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
