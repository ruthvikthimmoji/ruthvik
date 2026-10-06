"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Product UI",
    items: [
      "Web applications",
      "Mobile interfaces",
      "SaaS dashboards",
      "Responsive UI",
    ],
  },
  {
    title: "UX Design",
    items: [
      "User flows",
      "Wireframes",
      "Information architecture",
      "Usability thinking",
    ],
  },
  {
    title: "Design Systems",
    items: [
      "Components",
      "Variants",
      "Tokens",
      "Interaction patterns",
    ],
  },
  {
    title: "Prototyping",
    items: [
      "High-fidelity prototypes",
      "Micro-interactions",
      "Design iteration",
      "Developer handoff",
    ],
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="border-t border-black/[0.14] bg-[#F7F6F2]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">

        <div className="grid border-b border-black/[0.14] py-8 md:grid-cols-[1fr_2fr] md:py-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6F6D68]">
              04 / Capabilities
            </span>
          </div>

          <div>
            <p className="max-w-xl text-sm leading-relaxed text-[#6F6D68] md:text-base">
              The areas I currently work across as a UI/UX and product
              designer.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-b border-black/[0.14] py-10 md:border-r md:px-7 lg:min-h-[300px]"
            >
              <h3 className="font-serif text-3xl tracking-[-0.03em]">
                {capability.title}
              </h3>

              <ul className="mt-8 space-y-3">
                {capability.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#6F6D68]"
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{
                        backgroundColor: "#C86B3C",
                      }}
                    />

                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}