"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Expand,
  Eye,
  Frame,
  Info,
  LayoutGrid,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

import KineticText from "../components/KineticText";
import Navbar from "../components/Navbar";
import {
  categoriesOf,
  uiDesigns,
  type UIDesignCategory,
} from "../data/ui-designs";

const PAGE_SIZE = 10;

const categoryMeta: Record<UIDesignCategory, { label: string; wing: string }> = {
  mobile: { label: "Mobile", wing: "Mobile Systems Pavilion" },
  web: { label: "Web", wing: "Web Architecture Room" },
  dashboard: { label: "Dashboard", wing: "Financial & SaaS Gallery" },
  components: { label: "Components", wing: "Component Study Room" },
  concept: { label: "Concept", wing: "Experimental Salon" },
  branding: { label: "Branding", wing: "Identity & Signage" },
};

type Filter = "all" | UIDesignCategory;

/* =========================================================
   AUTHENTIC MUSEUM EXHIBIT CANVAS & HANGING PLACARD
========================================================= */

function MuseumPiece({
  design,
  index,
  onOpen,
  label,
}: {
  design: (typeof uiDesigns)[number];
  index: number;
  onOpen: () => void;
  label: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center"
    >
      {/* 1. Overhead Ceiling Track Spotlight Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-36 w-64 -translate-x-1/2 rounded-full bg-radial from-accent/25 via-accent/5 to-transparent blur-2xl opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
      />

      {/* 2. Physical Museum Frame */}
      <div
        onClick={onOpen}
        data-cursor="Inspect"
        className="relative w-full cursor-pointer rounded-xs border-2 border-hairline-strong bg-sunken p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:border-accent/60 group-hover:shadow-[0_35px_70px_-15px_rgba(0,0,0,0.6)] sm:p-6 md:p-8"
      >
        {/* Subtle Hanging Wire Hook Indicator */}
        <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-hairline-strong opacity-40" />

        {/* 3. Wide Museum Matting (Passe-Partout) */}
        <div className="relative rounded-xs border border-hairline/60 bg-paper p-3 shadow-inner sm:p-5">
          {/* 4. Canvas Image with Inner Shadow Depth */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-black/10 shadow-md ring-1 ring-black/15">
            <Image
              src={design.image}
              alt={design.title}
              fill
              className="object-cover object-top filter transition-all duration-700 ease-out group-hover:scale-[1.025]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Subtle Glass Artwork Reflection on Canvas */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-10"
            />

            {/* Accession Catalogue Number */}
            <span className="absolute bottom-2.5 right-2.5 rounded-xs bg-paper/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-ink shadow-xs backdrop-blur-md">
              No. {String(index + 1).padStart(2, "0")}
            </span>

            {/* Quick Inspect Cue */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/80 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white shadow-2xl backdrop-blur-md">
                <Eye size={12} className="text-accent" />
                Inspect Canvas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Authentic Physical Museum Exhibition Placard */}
      <div className="mt-6 flex w-full max-w-md items-start justify-between gap-4 rounded-xs border border-hairline bg-paper/90 px-5 py-4 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-hairline-strong">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent">
              Exhibit {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-muted">·</span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
              {label}
            </span>
          </div>

          <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
            {design.title}
          </h3>

          <p className="font-serif text-xs italic text-muted">
            {design.subtitle || "Original digital interface exploration"}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpen}
          aria-label={`Inspect ${design.title}`}
          className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Expand size={12} />
        </button>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN MUSEUM EXHIBITION PAVILION
========================================================= */

export default function UIDesignsClient() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /* Curatorial Wing Filters */
  const filters = useMemo(() => {
    const present = (Object.keys(categoryMeta) as UIDesignCategory[]).filter((c) =>
      uiDesigns.some((d) => categoriesOf(d).includes(c))
    );
    return [
      {
        value: "all" as const,
        label: "Complete Collection",
        wing: "Main Rotunda",
        count: uiDesigns.length,
      },
      ...present.map((c) => ({
        value: c as Filter,
        label: categoryMeta[c].label,
        wing: categoryMeta[c].wing,
        count: uiDesigns.filter((d) => categoriesOf(d).includes(c)).length,
      })),
    ];
  }, []);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? uiDesigns
        : uiDesigns.filter((d) => categoriesOf(d).includes(activeFilter)),
    [activeFilter]
  );

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  const changeFilter = (value: Filter) => {
    setActiveFilter(value);
    setVisibleCount(PAGE_SIZE);
    setActiveIndex(null);
  };

  /* Lightbox handlers */
  const isOpen = activeIndex !== null;
  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((i) =>
        i === null || filtered.length === 0
          ? i
          : (i + direction + filtered.length) % filtered.length
      );
    },
    [filtered.length]
  );

  /* Scroll lock */
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  /* Keyboard arrows navigation */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const labelFor = (design: (typeof uiDesigns)[number]) =>
    categoriesOf(design)
      .map((c) => categoryMeta[c].label)
      .join(" · ");

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-hidden bg-paper px-6 pb-32 pt-32 text-ink md:px-12 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          {/* ================= ARCHITECTURAL MUSEUM FOYER ================= */}
          <header className="border-b border-hairline pb-14 md:pb-18">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                <Frame size={13} />
                <span>The Design Pavilion · Salon 06</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Curator: Ruthvik Thimmoji · Bengaluru, IN
              </span>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
              <h1
                aria-label="Visual explorations."
                className="text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-8xl"
              >
                <KineticText
                  text="Visual"
                  base={520}
                  peak={800}
                  className="font-display font-medium"
                />{" "}
                <KineticText
                  text="explorations."
                  base={400}
                  peak={800}
                  className="font-serif italic text-accent"
                />
              </h1>

              <p className="font-serif text-lg italic leading-relaxed text-muted md:text-xl">
                A permanent exhibition of non-commercial interface studies, micro-interactions, and visual systems hung for public study.
              </p>
            </div>
          </header>

          {/* ================= CURATORIAL WINGS SELECTOR ================= */}
          <div className="py-10 border-b border-hairline">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Museum Wing Index
              </span>
              <span className="font-mono text-[10px] text-muted">
                {filtered.length} Works in this Gallery
              </span>
            </div>

            <div
              className="flex items-center gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Select Gallery Wing"
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => changeFilter(filter.value)}
                    className={`relative flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ${
                      isActive
                        ? "bg-ink text-paper font-semibold shadow-xs"
                        : "border border-hairline bg-paper/80 text-muted hover:border-hairline-strong hover:text-ink"
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[9px] ${
                        isActive ? "bg-white/20 text-white" : "bg-sunken text-muted"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= THE GALLERY EXHIBITION WALL ================= */}
          {filtered.length === 0 ? (
            <div className="rounded-xs border border-dashed border-hairline py-40 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                This exhibition hall is currently empty.
              </p>
            </div>
          ) : (
            /* 2-Column Spacious Gallery Wall Hanging */
            <section className="grid grid-cols-1 gap-16 py-16 sm:grid-cols-2 md:gap-20 lg:gap-24">
              <AnimatePresence mode="popLayout">
                {visible.map((design, index) => (
                  <MuseumPiece
                    key={design.id}
                    design={design}
                    index={index}
                    label={labelFor(design)}
                    onOpen={() => setActiveIndex(index)}
                  />
                ))}
              </AnimatePresence>
            </section>
          )}

          {/* ================= NEXT PAVILION / LOAD MORE ================= */}
          {remaining > 0 && (
            <div className="flex justify-center pt-16">
              <button
                type="button"
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="group flex items-center gap-3 rounded-full border border-hairline bg-paper px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-accent hover:text-ink"
              >
                <span>Walk into Next Hall</span>
                <span className="rounded-full bg-sunken px-2 py-0.5 font-mono text-[9px] text-accent">
                  +{remaining} Canvases
                </span>
              </button>
            </div>
          )}

          {/* ================= CURATOR'S COLOPHON FOOTER ================= */}
          <footer className="mt-32 border-t border-hairline py-20 text-center">
            <span className="frame-label">Private Commission</span>
            <h2 className="mx-auto mt-4 mb-8 max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Commission bespoke interface work for your{" "}
              <span className="font-serif font-normal italic text-accent">
                next venture.
              </span>
            </h2>

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper shadow-md transition-all hover:opacity-90"
            >
              Contact the Studio
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </footer>
        </div>
      </main>

      {/* ================= PRIVATE VIEWING ROOM MODAL ================= */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[300] flex flex-col bg-black/95 text-white backdrop-blur-2xl"
          >
            {/* Click to dismiss */}
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              onClick={close}
              aria-label="Exit viewing room"
            />

            {/* Gallery Room Toolbar */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-10">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">
                  Exhibit {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </span>
                <span className="hidden rounded-full border border-white/15 px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70 sm:inline-block">
                  {labelFor(active)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-[10px] text-white/40 md:inline-block">
                  [ESC] Exit · [←] [→] Promenade
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close exhibit"
                  autoFocus
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white/10"
                >
                  <X size={17} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* The Illuminated Artwork Canvas */}
            <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 items-center justify-center p-4 md:p-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative flex max-h-full max-w-full items-center justify-center"
                >
                  <Image
                    src={active.image}
                    alt={active.title}
                    width={1800}
                    height={1350}
                    priority
                    sizes="100vw"
                    className="pointer-events-auto h-auto max-h-[75vh] w-auto max-w-full rounded-xs object-contain shadow-2xl ring-2 ring-white/10"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Museum Placard at Bottom of Lightbox */}
            <div className="relative z-10 flex flex-col justify-between gap-4 border-t border-white/10 bg-black/60 px-6 py-5 backdrop-blur-md sm:flex-row sm:items-center md:px-10">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="truncate font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">
                    {active.title}
                  </h3>
                  <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Study on Canvas
                  </span>
                </div>
                {active.subtitle && (
                  <p className="mt-1 font-serif text-xs italic text-white/60 md:text-sm">
                    {active.subtitle}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>Inspect Raw Canvas</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous exhibit"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white/10"
                  >
                    <ArrowLeft size={16} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next exhibit"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white/10"
                  >
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}