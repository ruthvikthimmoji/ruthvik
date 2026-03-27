"use client";

import { projects } from "@/app/data/projects";
import { caseStudies } from "@/app/data/case-studies";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section
      id="work"
      className="relative py-32 bg-[#fcfaf7] text-[#1a1a1a] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between gap-8 flex-wrap"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#ff4f21] mb-4 block">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter italic font-serif">
              Selected Work
            </h2>
          </div>
          <p className="max-w-xs text-zinc-500 text-lg font-light leading-relaxed">
            A curated selection of digital products focused on clarity and
            conversion.
          </p>
        </motion.div>
      </div>

      {/* Modern Projects List */}
      <div className="max-w-6xl mx-auto px-8 space-y-40">
        {projects.map((project, index) => {
          const hasCaseStudy = caseStudies.some(
            (cs) => cs.slug === project.slug,
          );
          const isEven = index % 2 === 0;

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-20 items-center`}
            >
              {/* Image Container with Custom Hover */}
              <div className="w-full md:w-3/5 group relative overflow-hidden rounded-sm bg-zinc-100">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/3] md:aspect-[16/10] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                </motion.div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[#ff4f21]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Project Info */}
              <div className="w-full md:w-2/5 flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff4f21] font-bold mb-4">
                  0{index + 1} — {project.tag}
                </span>

                <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
                  {project.title}
                </h3>

                <p className="text-lg text-zinc-500 font-light leading-relaxed mb-8">
                  {project.description}
                </p>

                {hasCaseStudy && (
                  <Link
                    href={`/case-study/${project.slug.toLowerCase()}`}
                    className="group relative flex items-center gap-4 text-sm font-bold uppercase tracking-widest overflow-hidden"
                  >
                    <span className="relative z-10">Explore Project</span>
                    <div className="w-8 h-px bg-[#1a1a1a] transition-all duration-300 group-hover:w-12 group-hover:bg-[#ff4f21]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Visual Anchor Line */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-zinc-100 -z-10 hidden lg:block" />
    </section>
  );
}
