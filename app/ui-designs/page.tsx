import Image from "next/image";
import { uiDesigns } from "../data/ui-designs";

export const metadata = {
  title: "UI Design Gallery | Ruthvik",
  description:
    "A curated collection of UI designs, dashboards, mobile apps, and web interfaces crafted with a focus on clarity and conversion.",
};

export default function UIDesignsPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfd] px-6 py-32 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#111]">
            UI Design Gallery
          </h1>
          <p className="text-[#555] max-w-2xl mx-auto">
            A playful whiteboard-inspired showcase of UI designs. Each sticky
            note contains a design snapshot, title, and description.
          </p>
        </header>

        {/* Whiteboard / sticky notes grid */}
        <section className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-12 p-12 bg-[#f6f6f6] rounded-3xl shadow-xl">
          {uiDesigns.map((design, index) => {
            // Slight rotation for sticky note effect
            const rotateClasses = [
              "rotate-1",
              "-rotate-2",
              "rotate-2",
              "rotate-3",
            ];
            const rotateClass = rotateClasses[index % rotateClasses.length];

            return (
              <div
                key={design.id}
                className={`
                  relative bg-[#fff8dc] p-4 rounded-xl shadow-xl
                  ${rotateClass} transition-transform duration-300
                  hover:scale-105 hover:shadow-2xl
                  cursor-pointer
                `}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Sticky Note Info */}
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-[#111]">
                    {design.title}
                  </h3>
                  {design.subtitle && (
                    <p className="text-sm text-[#555] mt-1">
                      {design.subtitle}
                    </p>
                  )}
                </div>

                {/* Optional: subtle hover overlay (commented out) */}
                {/* <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 rounded-xl flex items-center justify-center transition">
                  <span className="text-white font-medium text-sm">
                    View Case Study →
                  </span>
                </div> */}
              </div>
            );
          })}
        </section>
      </div>

      {/* Grain overlay for whiteboard texture */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/textures/noise.jpg')]
          opacity-[0.03]
          mix-blend-overlay
        "
      />
    </main>
  );
}
