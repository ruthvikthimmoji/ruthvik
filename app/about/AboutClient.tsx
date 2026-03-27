"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Coffee, Code2 } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      // Add 'as const' here to lock the array as a tuple
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  },
};

const timeline = [
  {
    year: "2024 — Present",
    role: "Freelance UI/UX Designer",
    company: "Designuru Studio",
    desc: "Helping startups and SaaS teams turn complex ideas into obvious, high-converting digital products."
  },
  {
    year: "2023",
    role: "Frontend Developer & Designer",
    company: "Freelance",
    desc: "Bridging the gap between aesthetic design and functional code, specializing in React and Next.js."
  },
  {
    year: "2022",
    role: "Early Exploration",
    company: "Learning & Growth",
    desc: "Mastering the fundamentals of visual hierarchy, typography, and user psychology."
  }
];

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a] selection:bg-[#ff4f21] selection:text-white pb-40 font-serif">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-[#ff4f21]/5 rounded-full blur-[120px]" />
      </div>

      <article className="max-w-4xl mx-auto px-8 pt-40 relative z-10">
        
        {/* ───── THE PROLOGUE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-60"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold font-sans text-[#ff4f21] mb-8 block">
            The Story
          </span>
          <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.85] mb-16">
            Design is <br /> 
            how it <span className="italic text-[#ff4f21]">works.</span>
          </h1>
          <p className="text-2xl md:text-4xl text-zinc-400 font-light leading-snug">
            My journey into design wasn&apos;t just about making things look good. It was about finding the shortest path between a user and their goal.
          </p>
        </motion.section>

        {/* ───── THE NARRATIVE: CHAPTER 01 */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-40 space-y-12"
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] font-sans text-zinc-300">The Beginning</h2>
          <div className="space-y-8 text-xl md:text-2xl text-zinc-600 font-light leading-relaxed italic">
            <p>
              I started my career at the intersection of logic and creativity. As a <span className="text-[#1a1a1a] font-medium not-italic font-sans">Frontend Developer</span>, I learned how to build; but as a <span className="text-[#1a1a1a] font-medium not-italic font-sans">UI/UX Designer</span>, I learned why we build.
            </p>
            <p>
              I realized that most digital products suffer from the same problem: noise. Too many features, too much complexity, and not enough focus. I decided to dedicate my work to the opposite—clarity.
            </p>
          </div>
        </motion.section>

        {/* ───── THE NARRATIVE: CHAPTER 02 (The Philosophy) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-60 grid md:grid-cols-2 gap-20 items-center"
        >
          <div className="bg-zinc-50 p-12 rounded-[40px] aspect-square flex flex-col justify-center border border-zinc-100">
             <Sparkles className="text-[#ff4f21] mb-6" size={32} />
             <h3 className="text-3xl font-medium tracking-tight mb-4 font-sans">Focus on the obvious.</h3>
             <p className="text-zinc-500 font-light leading-relaxed">
               If a user has to think twice, the design has failed. My philosophy is to create products that don&apos;t just solve problems, but feel like they should have always existed.
             </p>
          </div>
          <div className="space-y-12">
             <div className="flex gap-6">
                <Coffee className="text-[#ff4f21] shrink-0" size={24} />
                <p className="text-lg text-zinc-500 font-light">I believe in deep work and fewer projects, allowing me to give every detail the attention it deserves.</p>
             </div>
             <div className="flex gap-6">
                <Code2 className="text-[#ff4f21] shrink-0" size={24} />
                <p className="text-lg text-zinc-500 font-light">My technical background means I design with feasibility in mind, ensuring a smooth transition to development.</p>
             </div>
          </div>
        </motion.section>

        {/* ───── THE TIMELINE (The Career Path) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-60"
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] font-sans text-zinc-300 mb-20">The Career Path</h2>
          
          <div className="space-y-20 relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-zinc-100" />

            {timeline.map((item, i) => (
              <div key={i} className="relative pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-[#ff4f21] transition-colors duration-500" />
                
                <span className="text-xs font-bold font-sans text-[#ff4f21] uppercase tracking-widest mb-2 block">{item.year}</span>
                <h3 className="text-3xl font-medium tracking-tight mb-2 font-sans">{item.role}</h3>
                <p className="text-lg italic text-zinc-400 mb-4">{item.company}</p>
                <p className="text-zinc-500 max-w-xl font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ───── THE EPILOGUE (Final CTA) */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-20 border-t border-zinc-100"
        >
          <h3 className="text-4xl md:text-6xl font-medium tracking-tighter mb-12">
            Ready to start <br /> <span className="italic">the next chapter?</span>
          </h3>

          <a
            href="#contact"
            className="
              inline-flex items-center gap-4 px-12 py-6
              bg-[#1a1a1a]
              text-white
              font-medium font-sans
              rounded-full
              transition-all hover:bg-[#ff4f21] hover:px-16
              group shadow-xl
            "
          >
            Let&apos;s build together
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.footer>

      </article>
    </main>
  );
}