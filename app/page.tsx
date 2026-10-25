import Contact from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";

import Capabilities from "./components/Capabilities";
import Explorations from "./components/Explorations";
import Process from "./components/Process";
import Experience from "./components/Experience";

export default function Home() {
  return (
    <main className="bg-paper text-ink">
      
      <Navbar />

      {/* 01 / Hero */}
      <Hero />

      {/* 02 / Selected work */}
      <Projects />

      {/* 03 / Experience */}
      <Experience />

      {/* 04 / How I work */}
      <Process />

      {/* 05 / Capabilities */}
      <Capabilities />

      {/* 06 / Explorations */}
      <Explorations />

      {/* 07 / About */}
      <section
        id="about"
        className="border-t border-hairline bg-sunken text-ink"
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
          <div className="grid gap-12 py-16 md:grid-cols-[1fr_2fr] md:py-24">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                07 / About
              </span>
            </div>

            <div>
              <h2 className="max-w-4xl font-display text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">
                I care about the details that make a product feel effortless.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                I&apos;m a UI/UX designer focused on product interfaces, SaaS
                experiences and design systems. My approach sits between visual
                craft and practical problem solving — creating interfaces that
                are clear for users and useful for the teams building them.
              </p>

              <a
                href="/about"
                className="group mt-10 inline-flex items-center gap-3 border-b border-hairline-strong pb-2 text-sm"
              >
                <span>More about me</span>
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 08 / Contact + footer */}
      <Contact />
    </main>
  );
}
