"use client";

import { motion } from "framer-motion";
import { Layers, MousePointer2, Layout, Search, ArrowRight, Zap } from "lucide-react";

const services = [
  {
    title: "Product UI/UX Design",
    description: "I design interfaces that are not just beautiful, but conversion-driven. Focused on SaaS platforms and mobile ecosystems.",
    icon: <Layout className="w-6 h-6" />,
    tags: ["SaaS", "Mobile", "Web Apps"],
    color: "from-blue-500/10 to-transparent"
  },
  {
    title: "UX Strategy & Research",
    description: "Deep diving into user behavior to map out journeys that minimize friction and maximize user delight.",
    icon: <Search className="w-6 h-6" />,
    tags: ["User Mapping", "Audit", "IA"],
    color: "from-orange-500/10 to-transparent"
  },
  {
    title: "Design Systems",
    description: "Scaling your product shouldn't break your design. I build modular systems that empower devs to build faster.",
    icon: <Layers className="w-6 h-6" />,
    tags: ["Figma", "Tokens", "Library"],
    color: "from-purple-500/10 to-transparent"
  },
  {
    title: "Interactive Prototyping",
    description: "Bringing designs to life with high-fidelity motion to test flows and secure stakeholder buy-in early.",
    icon: <MousePointer2 className="w-6 h-6" />,
    tags: ["Framer", "Motion", "Lottie"],
    color: "from-emerald-500/10 to-transparent"
  },
];

export default function ServicesClient() {
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a] px-8 py-40 relative selection:bg-[#ff4f21] selection:text-white">
      
      {/* Modern Background: Subtle Radial Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff4f21]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <section className="relative max-w-7xl mx-auto">
        {/* Header - Centered & Bold */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
              <Zap size={12} className="text-[#ff4f21]" />
              Expertise
            </span>
            <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.85] mb-10">
              Elevating products <br /> 
              through <span className="italic font-serif text-[#ff4f21]">design.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              I partner with ambitious founders to turn complex challenges into obvious, high-performance digital products.
            </p>
          </motion.div>
        </div>

        {/* The Bento-Style Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`
                group relative p-8 rounded-[40px] bg-zinc-50/50 border border-zinc-200/50 
                hover:bg-white hover:border-[#ff4f21]/20 transition-all duration-500 
                flex flex-col justify-between overflow-hidden
                ${i === 0 || i === 3 ? "md:col-span-3 lg:col-span-7" : "md:col-span-3 lg:col-span-5"}
              `}
            >
              {/* Subtle Corner Gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="mb-12 p-4 w-fit rounded-3xl bg-white border border-zinc-200 shadow-sm text-zinc-400 group-hover:text-[#ff4f21] group-hover:border-[#ff4f21]/20 transition-all duration-300">
                  {service.icon}
                </div>

                <h3 className="text-3xl font-medium tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>

                <p className="text-zinc-500 font-light leading-relaxed mb-8 max-w-sm">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-auto">
                <div className="flex gap-3">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-400 group-hover:bg-[#1a1a1a] group-hover:text-white group-hover:border-[#1a1a1a] transition-all duration-300">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mt-48 pt-24 border-t border-zinc-100">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { title: "Define", desc: "Strategy & User Research" },
              { title: "Design", desc: "UX Flows & Visual Interface" },
              { title: "Develop", desc: "Design Systems & Tokens" },
              { title: "Deploy", desc: "Handover & Implementation" },
            ].map((item, i) => (
              <div key={item.title} className="group">
                <span className="text-[10px] font-bold text-[#ff4f21] opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                <h4 className="text-lg font-medium mt-2 mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-400 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-60 mb-20 text-center"
        >
          <h2 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12">
            Let’s build something <br /> <span className="italic font-serif">extraordinary.</span>
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center gap-4 px-12 py-6 bg-[#1a1a1a] text-white rounded-full font-medium transition-all hover:bg-[#ff4f21] hover:px-16 active:scale-95 shadow-2xl"
          >
            Start a project
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </section>
    </main>
  );
}