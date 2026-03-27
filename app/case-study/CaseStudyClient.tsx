"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CaseStudy } from "../data/case-studies";
import { useRouter } from "next/navigation";
import { ArrowLeft, Maximize2, Zap, Target, CheckCircle2, Award } from "lucide-react";

export default function CaseStudyClient({ project }: { project: CaseStudy }) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for the Figma embed to make it feel "floating"
  const figmaY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-white text-[#1a1a1a] selection:bg-[#ff4f21] selection:text-white pb-32"
    >
      {/* Background: Modern Grain & Grid Hybrid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/textures/grid.png')] bg-repeat opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>
      
      {/* DYNAMIC BACK BUTTON */}
      <nav className="fixed top-32 left-8 z-[60] hidden xl:block">
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#ff4f21] transition-all bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </button>
      </nav>

      {/* PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff4f21] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <article className="relative z-10 max-w-6xl mx-auto px-8 pt-40">
        
        {/* HEADER: Bold & Editorial */}
        <header className="relative mb-40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="px-3 py-1 rounded-full bg-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Case Study
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">{project.duration}</span>
              </motion.div>

              <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.85] mb-10 font-serif italic">
                {project.title}
              </h1>
              
              <p className="text-2xl md:text-4xl text-zinc-400 font-light leading-tight max-w-2xl">
                {project.tagline}
              </p>
            </div>
            
            {/* Project Stats Board */}
            <div className="grid grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 rounded-[32px] overflow-hidden shrink-0 lg:w-80">
               <div className="bg-white p-6">
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Role</h4>
                  <p className="text-xs font-bold uppercase tracking-tight">{project.role}</p>
               </div>
               <div className="bg-white p-6">
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-2">Impact</h4>
                  <p className="text-xs font-bold uppercase tracking-tight text-[#ff4f21]">High Growth</p>
               </div>
               <div className="bg-white p-6 col-span-2">
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-[9px] font-bold uppercase tracking-tighter bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
                        {tool}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <section className="grid lg:grid-cols-12 gap-16 mb-60">
          <div className="lg:col-span-5 space-y-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                   <Target size={18} className="text-[#ff4f21]" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">The Problem</h2>
              </div>
              <p className="text-2xl leading-relaxed text-zinc-600 font-serif italic">
                {project.problem}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                   <Zap size={18} className="text-[#ff4f21]" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">The Approach</h2>
              </div>
              <p className="text-2xl leading-relaxed text-zinc-600 font-serif italic">
                {project.solution}
              </p>
            </motion.div>
          </div>

          {/* FIGMA: Floating Interactive Window */}
          <motion.div 
            style={{ y: figmaY }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff4f21]/10 rounded-full blur-[80px] -z-10" />
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[40px] overflow-hidden border border-zinc-200 shadow-2xl bg-white group">
               <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-zinc-200 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live Prototype
               </div>
               <iframe
                src={project.figmaEmbed}
                className="w-full h-full grayscale-[40%] hover:grayscale-0 transition-all duration-700"
                allowFullScreen
              />
            </div>
          </motion.div>
        </section>

        {/* OUTCOME: Editorial Quote Style */}
        <section className="py-40 border-y border-zinc-100 text-center relative overflow-hidden">
          <Award size={40} className="text-[#ff4f21]/20 mx-auto mb-12" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
             <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-zinc-300 mb-12">Final Outcome</h2>
             <p className="text-4xl md:text-6xl text-[#1a1a1a] font-medium tracking-tight italic font-serif leading-tight max-w-4xl mx-auto">
                &quot;{project.outcome}&quot;
             </p>
          </motion.div>
        </section>

        {/* FOOTER CTA */}
        <footer className="mt-60 text-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#ff4f21] mb-10 block">Ready for the next?</span>
          <h3 className="text-5xl md:text-8xl font-medium tracking-tighter mb-20 leading-[0.9]">
            Let’s build another <br /> <span className="italic font-serif">obvious story.</span>
          </h3>
          <button
            onClick={() => router.push('/#contact')}
            className="inline-flex items-center gap-6 px-14 py-7 bg-[#1a1a1a] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#ff4f21] transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            Start a Project
            <CheckCircle2 size={18} />
          </button>
        </footer>

      </article>
    </motion.main>
  );
}
