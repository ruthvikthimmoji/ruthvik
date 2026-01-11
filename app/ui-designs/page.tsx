import Image from "next/image";
import { uiDesigns } from "../data/ui-designs";

export const metadata = {
  title: "UI Design Gallery | Ruthvik",
  description:
    "A curated collection of UI designs, dashboards, mobile apps, and web interfaces crafted with a focus on clarity and conversion.",
};

/* ---------------------------------------------
   ROTATION HELPER (AUTOMATIC)
--------------------------------------------- */
function getRotation(index: number) {
  const rotations = [-3, -2, -1, 1, 2, 3];
  return rotations[index % rotations.length];
}

export default function UIDesignsPage() {
  return (
    <main className="relative min-h-screen bg-[#fdfdfd] px-6 py-32 font-sans">
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

        {/* Whiteboard Grid */}
        <section className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-12 p-12 bg-[#f6f6f6] rounded-3xl shadow-xl">
          {uiDesigns.map((design, index) => {
            const rotation = getRotation(index);

            return (
              <div
                key={design.id}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="
                  relative
                  bg-[#fff8dc]
                  p-4
                  rounded-xl
                  shadow-xl
                  transition-all
                  duration-300
                  hover:rotate-0
                  hover:scale-105
                  hover:shadow-2xl
                  cursor-pointer
                "
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
              </div>
            );
          })}
        </section>
      </div>

      {/* Grain Overlay */}
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
