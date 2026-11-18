"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import KineticText from "../components/KineticText";
import Navbar from "../components/Navbar";

export type CaseStudyListItem = {
  slug: string;
  title: string;
  tagline: string;
  headline: string;
  image: string;
  year: string;
  role: string;
  platform: string;
  typeLabel: string;
};

export default function CaseStudiesClient({
  items,
}: {
  items: CaseStudyListItem[];
}) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-hidden bg-paper px-6 pb-24 pt-32 text-ink md:px-10 md:pt-44 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}
          <header className="grid gap-8 border-b border-hairline pb-12 md:grid-cols-[1fr_2fr] md:pb-16">
            <div>
              <span className="frame-label">Case studies</span>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {String(items.length).padStart(2, "0")} published
              </p>
            </div>

            <div>
              <motion.h1
                aria-label="Work, explained."
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl leading-[0.95] tracking-[-0.05em] md:text-8xl"
              >
                <KineticText text="Work," base={520} peak={800} className="font-display" />{" "}
                <KineticText
                  text="explained."
                  base={400}
                  peak={800}
                  className="font-serif italic text-accent"
                />
              </motion.h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                The thinking behind selected projects: the problem, the decisions
                and what I&apos;d test next.
              </p>
            </div>
          </header>

          {items.length === 0 ? (
            <p className="py-24 text-center text-sm text-muted">
              Case studies are on their way.
            </p>
          ) : (
            <ul>
              {items.map((item, index) => (
                <motion.li
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-hairline"
                >
                  <Link
                    href={`/case-study/${item.slug}`}
                    data-cursor="Open"
                    aria-label={`${item.title} case study`}
                    className="group block py-12 md:py-20"
                  >
                    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="h-px w-8 bg-hairline-strong md:w-12" />
                      <span className="frame-label">{item.platform}</span>
                      <span className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                        {item.typeLabel}
                      </span>
                      <span className="frame-label">{item.year}</span>
                    </div>

                    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                      <div>
                        <h2 className="font-display text-5xl font-semibold leading-none tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-1 sm:text-6xl md:text-7xl">
                          {item.title}
                        </h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                          {item.headline}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 text-sm text-muted">
                        <span>Read case study</span>
                        <ArrowRight
                          size={16}
                          strokeWidth={1.3}
                          aria-hidden="true"
                          className="text-accent transition-transform duration-500 group-hover:translate-x-1"
                        />
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-hairline bg-sunken transition-colors duration-500 group-hover:border-hairline-strong md:aspect-[2/1]">
                      <Image
                        src={item.image}
                        alt={`${item.title} preview`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1440px) 100vw, 1440px"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
