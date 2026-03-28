"use client";

import { motion } from "framer-motion";
// Ensure your testimonials data is correctly exported from this path
import { testimonials } from "@/app/data/testimonials";

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-32 bg-[#fcfaf7] text-[#1a1a1a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[#ff4f21] mb-3 md:mb-4 block">
            Kind Words
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tighter italic font-serif leading-tight">
            Collaborator Stories
          </h2>
        </motion.div>

        {/* Testimonials Grid - Stacked on mobile, 2 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-20">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative flex flex-col items-start"
            >
              {/* Large Stylized Quote Mark - Adjusted for mobile position */}
              <span className="text-6xl md:text-7xl font-serif text-[#ff4f21]/10 absolute -top-6 -left-2 md:-top-8 md:-left-4 select-none">
                “
              </span>

              <div className="relative z-10 w-full">
                {/* Feedback Text - Fluid Typography */}
                <p className="text-lg md:text-2xl font-light leading-relaxed text-zinc-600 mb-8 italic">
                  {t.feedback}
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 border border-zinc-200"
                    />
                    {/* Subtle Brand Accent Ring */}
                    <div className="absolute inset-0 rounded-full border border-[#ff4f21]/40 transition-all duration-500 scale-125 opacity-0 group-hover:opacity-100 hidden md:block" />
                  </div>
                  
                  <div className="min-w-0"> {/* min-w-0 prevents text overflow in flex */}
                    <h4 className="font-bold text-xs md:text-sm tracking-tight text-[#1a1a1a] truncate">
                      {t.name}
                    </h4>
                    <p className="text-[9px] md:text-xs text-zinc-400 font-medium uppercase tracking-widest truncate">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative bottom line */}
              <div className="w-full h-[1px] bg-zinc-100 mt-10 md:mt-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#ff4f21] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}