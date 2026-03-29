"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { activeProjects } from "@/app/data/active-projects";

export default function LiveWorkPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // Find project based on dynamic ID
  const project = activeProjects.find((p) => p.id === id);

  if (!project) return <div className="p-20 text-center font-serif italic text-zinc-400">Project not found.</div>;

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] p-4 md:p-8 pt-24 md:pt-32 selection:bg-[#ff4f21] selection:text-white">
      
      {/* Header Info */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8 hover:text-[#ff4f21] transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Studio
          </button>
          
          <h1 className="text-4xl md:text-7xl font-medium tracking-tighter font-serif italic mb-4 leading-[0.9]">
            Live Sprint: <span className="not-italic font-sans text-[#ff4f21] uppercase tracking-tighter">{project.name}</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base italic font-serif leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-3xl shrink-0">
           <div className="relative flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-green-500 z-10" />
             <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-40" />
           </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Live Figma Feed</span>
        </div>
      </div>

      {/* THE FIGMA CONTAINER WITH CLICK PROTECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-[70vh] md:h-[80vh] bg-[#1e1e1e] rounded-[32px] md:rounded-[48px] overflow-hidden border border-zinc-200 shadow-2xl"
      >
        {/* CLICK SHIELD: 
            This invisible div sits over the bottom ~60px of the iframe 
            to prevent users from clicking the Figma logo/file link. 
        */}
        <div className="absolute bottom-0 left-0 right-0 h-[60px] z-50 bg-transparent pointer-events-auto cursor-default" />

        {/* LOADING SKELETON (Behind the iframe) */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-0">
          <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-zinc-700 animate-pulse">Initializing Canvas</p>
        </div>

        {/* THE IFRAME */}
        {project.figmaEmbed ? (
          <iframe
            src={project.figmaEmbed}
            className="relative z-10 w-full h-full border-none grayscale-[15%] hover:grayscale-0 transition-all duration-1000"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 italic">Embed link not available.</div>
        )}
      </motion.div>

      <footer className="max-w-7xl mx-auto mt-12 py-10 flex flex-col items-center gap-4 border-t border-zinc-100">
         <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300 text-center">
           Designuru Studio &copy; 2026 — Proprietary Design Sprint
         </p>
      </footer>
    </main>
  );
}