"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { activeProjects } from "../data/active-projects";

export default function OngoingWork() {
  return (
    <section className="py-24 md:py-40 px-6 max-w-6xl mx-auto overflow-hidden">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex items-center justify-center">
              <Activity size={16} className="text-[#ff4f21] z-10" />
              <div className="absolute w-4 h-4 bg-[#ff4f21] blur-md opacity-40 animate-pulse" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400">
              Live Feed
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter leading-[0.95] md:leading-[0.85] font-serif italic text-[#1a1a1a]">
            Currently on <br className="hidden sm:block" />
            the{" "}
            <span className="text-[#ff4f21] not-italic font-sans">
              drawing board.
            </span>
          </h2>
        </div>

        <p className="text-zinc-400 text-sm md:text-base font-light max-w-xs italic leading-relaxed border-l border-zinc-100 pl-6">
          A real-time look at the projects moving through Designuru Studio this
          week.
        </p>
      </div>

      {/* PROJECTS LIST */}
      <div className="space-y-4">
        {activeProjects.map((project, index) => (
          <Link href={`/live/${project.id}`} key={project.id || project.name} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative bg-zinc-50 border border-zinc-100 rounded-[32px] md:rounded-[40px] p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:border-[#ff4f21]/20 transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-zinc-200/40"
            >
              {/* Project Info */}
              <div className="flex items-center gap-6">
                <span className="hidden sm:block text-[10px] font-bold text-zinc-300 font-sans tracking-widest uppercase">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <div>
                  <h3 className="text-2xl md:text-4xl font-medium tracking-tight mb-1 text-[#1a1a1a] group-hover:text-[#ff4f21] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold">
                    {project.type}
                  </p>
                </div>
              </div>

              {/* Status & Progress */}
              <div className="flex flex-col md:items-end gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#ff4f21] bg-[#ff4f21]/5 px-4 py-1.5 rounded-full border border-[#ff4f21]/10">
                    {project.status}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold font-sans text-zinc-400">
                    {project.progress}%
                  </span>
                </div>

                {/* Refined Progress Bar */}
                <div className="w-full md:w-56 h-[3px] bg-zinc-200/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    className="h-full bg-[#ff4f21] shadow-[0_0_8px_rgba(255,79,33,0.4)]"
                  />
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-zinc-300" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}