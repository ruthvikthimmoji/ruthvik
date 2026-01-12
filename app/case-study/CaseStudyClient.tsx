"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "../data/case-studies";

export default function CaseStudyClient({ project }: { project: CaseStudy }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        relative min-h-screen
        bg-[#f7f5f2] text-[#111]
        px-6 py-24
        font-serif
      "
    >
      {/* PAPER TEXTURE */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.15]
          bg-[url('/textures/newsprint.jpg')]
          bg-repeat
          bg-[length:500px_500px]
        "
      />

      <article className="relative z-10 max-w-5xl mx-auto">
        {/* HEADLINE */}
        <header className="mb-10">
          <span className="uppercase tracking-[0.35em] text-xs text-[#f95738]">
            Case Study
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {project.title}
          </h1>

          <p className="text-xl mt-4 text-neutral-700 max-w-3xl">
            {project.tagline}
          </p>

          <div className="mt-6 text-sm uppercase tracking-widest text-neutral-600">
            Role: {project.role} · {project.duration}
          </div>
        </header>

        <hr className="border-neutral-300 mb-10" />

        {/* BODY */}
        <section className="grid md:grid-cols-2 gap-x-12 gap-y-16 text-[17px] leading-[1.85] text-justify">
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
              The Problem
            </h2>
            <p>{project.problem}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
              The Approach
            </h2>
            <p>{project.solution}</p>
          </div>
        </section>

        <hr className="border-neutral-300 my-16" />

        {/* FIGMA */}
        <section className="mb-20">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6">
            Design Work
          </h2>

          <div className="relative h-[70vh] md:h-[80vh] rounded-xl overflow-hidden border border-neutral-300 shadow-lg">
            <iframe
              src={project.figmaEmbed}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        </section>

        <hr className="border-neutral-300 my-16" />

        {/* OUTCOME */}
        <section className="grid md:grid-cols-2 gap-x-12 text-[17px] leading-[1.85] text-justify">
          <div>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">
              Results
            </h2>
            <p>{project.outcome}</p>
          </div>

          <div className="text-sm text-neutral-600 uppercase tracking-widest">
            Tools Used
            <p className="mt-2 normal-case tracking-normal text-neutral-800">
              {project.tools.join(", ")}
            </p>
          </div>
        </section>

        <hr className="border-neutral-300 my-20" />

        <footer className="text-center text-sm uppercase tracking-widest">
          Want a case study like this?
          <br />
          <a href="#contact" className="inline-block mt-4 font-bold underline">
            Contact Me
          </a>
        </footer>
      </article>
    </motion.main>
  );
}
