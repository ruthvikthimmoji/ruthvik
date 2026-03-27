"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/app/data/testimonials";

export default function Testimonials() {
  return (
    <section className="relative py-32 bg-[#fcfaf7] text-[#1a1a1a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Section Header - Matching your Hero/Projects style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#ff4f21] mb-4 block">
            Kind Words
          </span>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter italic font-serif">
            Collaborator Stories
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative flex flex-col items-start"
            >
              {/* Large Stylized Quote Mark */}
              <span className="text-7xl font-serif text-[#ff4f21]/10 absolute -top-8 -left-4 select-none">
                “
              </span>

              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-600 mb-8 italic">
                  {t.feedback}
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 border border-zinc-200"
                    />
                    {/* Subtle Brand Accent Ring */}
                    <div className="absolute inset-0 rounded-full border border-[#ff4f21]/0 group-hover:border-[#ff4f21]/40 transition-all duration-500 scale-125 opacity-0 group-hover:opacity-100" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm tracking-tight text-[#1a1a1a]">
                      {t.name}
                    </h4>
                    <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative bottom line that grows on hover */}
              <div className="w-full h-[1px] bg-zinc-100 mt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#ff4f21] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}