"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { uiDesigns } from "../data/ui-designs";

function getRotation(index: number) {
  const rotations = [-3, -2, -1, 1, 2, 3];
  return rotations[index % rotations.length];
}

function getCategoryColor(category: string) {
  switch (category) {
    case "mobile":
      return "bg-[#c24919] text-white";
    case "web":
      return "bg-[#1c5fbd] text-white";
    case "components":
      return "bg-[#7c3aed] text-white";
    default:
      return "bg-black text-white";
  }
}

const filters = [
  { label: "All", value: "all" },
  { label: "Mobile", value: "mobile" },
  { label: "Web", value: "web" },
  { label: "Components", value: "components" },
];

export default function UIDesignsClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const filteredDesigns =
    activeFilter === "all"
      ? uiDesigns
      : uiDesigns.filter((d) => d.category === activeFilter);

  useEffect(() => {
    const index = filters.findIndex((f) => f.value === activeFilter);
    const btn = buttonRefs.current[index];

    if (btn) {
      setIndicatorStyle({
        width: btn.offsetWidth,
        left: btn.offsetLeft,
      });
    }
  }, [activeFilter]);

  return (
    <main className="relative min-h-screen bg-[#fdfdfd] px-6 py-32 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#111]">
            UI Design Gallery
          </h1>
          <p className="text-[#555] max-w-2xl mx-auto">
            A playful whiteboard-inspired showcase of mobile, web, and component UI designs.
          </p>
        </header>

        {/* SEGMENTED TOGGLE */}
        <div className="flex justify-center mb-20">
          <div className="relative flex items-center bg-white border border-neutral-300 rounded-full p-1 shadow-sm">
            {/* Sliding indicator */}
            <span
              className="absolute h-9 rounded-full bg-black transition-all duration-300"
              style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
            />

            {filters.map((filter, index) => {
              const active = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  ref={(el) => {
                    buttonRefs.current[index] = el; // ✅ THIS IS SAFE NOW
                  }}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`relative z-10 px-5 h-9 text-sm font-medium rounded-full transition-colors duration-300 ${
                    active ? "text-white" : "text-[#111] hover:text-black"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* STICKY NOTE GRID */}
        <section className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-12 p-12 bg-[#f6f6f6] rounded-3xl shadow-xl">
          {filteredDesigns.map((design, index) => {
            const rotation = getRotation(index);

            return (
              <div
                key={design.id}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="relative bg-[#fff8dc] p-4 rounded-xl shadow-xl transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                {/* PRICE TAG CATEGORY */}
                <div
                  className={`absolute top-4 right-4 flex items-center gap-2 text-[11px] uppercase tracking-wide font-medium px-3 py-1.5 rounded-md shadow-md rotate-2 ${getCategoryColor(
                    design.category
                  )}`}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  {design.category}
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-2">
                  <h3 className="text-lg font-semibold text-[#111]">{design.title}</h3>
                  {design.subtitle && <p className="text-sm text-[#555] mt-1">{design.subtitle}</p>}
                </div>
              </div>
            );
          })}
        </section>
      </div>

      {/* GRAIN OVERLAY */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/textures/noise.jpg')] opacity-[0.03] mix-blend-overlay"
      />
    </main>
  );
}
