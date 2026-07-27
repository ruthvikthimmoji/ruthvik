"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, MousePointer2, Layout, Search, ArrowRight, ArrowUpRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / OngoingWork.tsx / Projects.tsx / Contact.tsx.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";

const services = [
  {
    title: "Product UI/UX Design",
    description:
      "Interfaces that are not just beautiful, but conversion-driven — focused on SaaS platforms and mobile ecosystems.",
    icon: Layout,
    tags: ["SaaS", "Mobile", "Web Apps"],
  },
  {
    title: "UX Strategy & Research",
    description:
      "Deep diving into user behavior to map out journeys that minimize friction and maximize user delight.",
    icon: Search,
    tags: ["User Mapping", "Audit", "IA"],
  },
  {
    title: "Design Systems",
    description:
      "Scaling your product shouldn't break your design — modular systems that empower devs to build faster.",
    icon: Layers,
    tags: ["Figma", "Tokens", "Library"],
  },
  {
    title: "Interactive Prototyping",
    description:
      "Bringing designs to life with high-fidelity motion to test flows and secure stakeholder buy-in early.",
    icon: MousePointer2,
    tags: ["Framer", "Motion", "Lottie"],
  },
];

const process = [
  { title: "Define", desc: "Strategy & user research" },
  { title: "Design", desc: "UX flows & visual interface" },
  { title: "Develop", desc: "Design systems & tokens" },
  { title: "Deploy", desc: "Handover & implementation" },
];

export default function ServicesClient() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main
      className="min-h-screen px-6 md:px-8 py-24 md:py-40 relative overflow-x-hidden"
      style={{ backgroundColor: ink, color: paper }}
    >
      <style>{`::selection { background: ${brass}; color: ${ink}; }`}</style>

      {/* Single restrained ambient glow, same treatment as OngoingWork / Contact */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-5%] left-[-10%] w-[60%] md:w-[35%] h-[40%] rounded-full blur-[100px] md:blur-[130px]"
          style={{ backgroundColor: brass, opacity: 0.05 }}
        />
      </div>

      <section className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8" style={{ backgroundColor: brass, opacity: 0.5 }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em] font-medium"
                style={{ color: brass }}
              >
                Expertise
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] mb-8 md:mb-10">
              Elevating products <br className="hidden sm:block" />
              through <span className="italic" style={{ color: brass }}>design.</span>
            </h1>

            <p
              className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
              style={{ color: graphite }}
            >
              I partner with ambitious founders to turn complex challenges into obvious, high-performance digital products.
            </p>
          </motion.div>
        </div>

        {/* Services — a numbered list, not a bento grid */}
        <div style={{ borderTop: `1px solid ${hairline}` }}>
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = hovered === index;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 md:py-10"
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                {/* Index + icon */}
                <div className="flex items-center gap-4 md:gap-6 md:w-40 shrink-0">
                  <span
                    className="font-mono text-[11px] tracking-widest"
                    style={{ color: isActive ? brass : graphite }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300"
                    style={{
                      border: `1px solid ${isActive ? "rgba(199,162,92,0.4)" : hairline}`,
                      color: isActive ? brass : graphite,
                    }}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title + description */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-serif text-2xl md:text-3xl tracking-tight mb-2 transition-colors duration-300"
                    style={{ color: isActive ? brass : paper }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm md:text-base font-light leading-relaxed max-w-md mb-4 md:mb-0"
                    style={{ color: graphite }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:w-56 shrink-0">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ color: graphite, border: `1px solid ${hairline}` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Reveal-on-hover CTA */}
                <a
                  href="/contact"
                  className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: brass }}
                >
                  Discuss
                  <ArrowUpRight size={13} />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Process — horizontal stepper, same visual language as a progress track */}
        <div className="mt-28 md:mt-40">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.35em] font-medium block mb-10 md:mb-14"
            style={{ color: brass }}
          >
            How it runs
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {process.map((item, i) => (
              <div key={item.title} className="relative">
                <div
                  className="h-[2px] mb-5 w-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="h-full" style={{ width: "100%", backgroundColor: brass, opacity: 0.7 }} />
                </div>
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: brass }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-serif text-lg md:text-xl mt-2 mb-1.5" style={{ color: paper }}>
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm font-light leading-snug" style={{ color: graphite }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA — same interaction language as Contact.tsx, not a third button style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 md:mt-52 mb-10 md:mb-20 text-center"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-10 md:mb-12 leading-tight">
            Let&rsquo;s build something <br />
            <span className="italic" style={{ color: brass }}>extraordinary.</span>
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300"
            style={{ backgroundColor: paper, color: ink }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = brass;
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(199,162,92,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = paper;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start a project
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </section>
    </main>
  );
}