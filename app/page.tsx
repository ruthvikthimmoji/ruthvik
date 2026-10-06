import Contact from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";

import Capabilities from "./components/Capabilities";
import Explorations from "./components/Explorations";
import Experience from "./components/Expierence";
import Process from "./components/Process";

export default function Home() {
  return (
    <main className="bg-[#F7F6F2] text-[#111111]">

      {/* ================================================================
          NAVIGATION
          ================================================================ */}

      <Navbar />

      {/* ================================================================
          01 — HERO
          ================================================================ */}

      <Hero />

      {/* ================================================================
          02 — SELECTED WORK
          ================================================================ */}

      <Projects />

      {/* ================================================================
          03 — EXPERIENCE
          ================================================================ */}

      <Experience />

      {/* ================================================================
          04 — HOW I WORK
          ================================================================ */}

      <Process />

      {/* ================================================================
          05 — CAPABILITIES
          ================================================================ */}

      <Capabilities />

      {/* ================================================================
          06 — EXPLORATIONS
          ================================================================ */}

      <Explorations />

      {/* ================================================================
          07 — ABOUT
          ================================================================ */}

      <section
        id="about"
        className="border-t border-black/[0.14] bg-[#111111] text-[#F7F6F2]"
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">

          <div className="grid gap-12 py-16 md:grid-cols-[1fr_2fr] md:py-24">

            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                07 / About
              </span>
            </div>

            <div>
              <h2 className="max-w-4xl font-serif text-4xl leading-[1] tracking-[-0.04em] md:text-6xl">
                I care about the details that make a product feel
                effortless.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
                I&apos;m a UI/UX designer focused on product interfaces,
                SaaS experiences and design systems. My approach sits
                between visual craft and practical problem solving —
                creating interfaces that are clear for users and useful
                for the teams building them.
              </p>

              <a
                href="/about"
                className="group mt-10 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-sm"
              >
                <span>More about me</span>

                <span className="text-[#C86B3C] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          08 — CONTACT / FOOTER
          ================================================================ */}

      <Contact />
    </main>
  );
}