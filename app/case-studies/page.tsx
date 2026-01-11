import Image from "next/image";
import { uiDesigns } from "../data/ui-designs";


export const metadata = {
  title: "UI Designs | Product & SaaS Interfaces",
  description:
    "A curated collection of UI designs for SaaS, mobile apps, and web products.",
};

export default function UIDesignsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">UI Design Gallery</h1>

        <p className="text-neutral-400 mb-16 max-w-xl">
          A visual showcase of selected UI screens and interfaces designed for
          SaaS, mobile, and web products.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {uiDesigns.map((ui, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition"
            >
              <Image
                src={ui.image}
                alt={ui.title}
                width={600}
                height={450}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
