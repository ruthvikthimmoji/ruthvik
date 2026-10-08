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
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutGrid,
  Smartphone,
  Monitor,
  Box,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { uiDesigns } from "../data/ui-designs";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

const PAGE_SIZE = 12;

/* -------------------------------------------------------------------------- */
/* CATEGORY TYPES                                                             */
/* -------------------------------------------------------------------------- */

type UIDesignCategory =
  | "mobile"
  | "web"
  | "dashboard"
  | "components"
  | "concept"
  | "branding";

type CategoryMeta = {
  label: string;
  icon?: ReactNode;
};

const categoryMeta: Record<UIDesignCategory, CategoryMeta> = {
  mobile: {
    label: "Mobile",
    icon: <Smartphone size={13} />,
  },

  web: {
    label: "Web",
    icon: <Monitor size={13} />,
  },

  dashboard: {
    label: "Dashboard",
    icon: <LayoutDashboard size={13} />,
  },

  components: {
    label: "Components",
    icon: <Box size={13} />,
  },

  concept: {
    label: "Concept",
    icon: <Sparkles size={13} />,
  },

  branding: {
    label: "Branding",
    icon: undefined,
  },
};

/* -------------------------------------------------------------------------- */
/* SAFE CATEGORY HELPERS                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Checks whether a value is one of the categories supported by this page.
 *
 * This is important because the data file may contain:
 *
 * category?: string
 *
 * which means TypeScript cannot guarantee that the value exists
 * inside categoryMeta.
 */
function isUIDesignCategory(
  category: unknown
): category is UIDesignCategory {
  return (
    typeof category === "string" &&
    Object.prototype.hasOwnProperty.call(categoryMeta, category)
  );
}

/**
 * Safely returns a readable category label.
 *
 * This prevents:
 *
 * categoryMeta[design.category]
 *
 * from throwing a TypeScript error when design.category is undefined.
 */
function getCategoryLabel(category: unknown): string {
  if (isUIDesignCategory(category)) {
    return categoryMeta[category].label;
  }

  if (typeof category === "string" && category.trim().length > 0) {
    return category;
  }

  return "Design";
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function UIDesignsClient() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | UIDesignCategory
  >("all");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /* ------------------------------------------------------------------------ */
  /* FILTERS                                                                  */
  /* ------------------------------------------------------------------------ */

  /**
   * Only show filters that actually contain designs.
   */
  const filters = useMemo(() => {
    const present = (Object.keys(categoryMeta) as UIDesignCategory[]).filter(
      (category) =>
        uiDesigns.some((design) => design.category === category)
    );

    return [
      {
        value: "all" as const,
        label: "All",
        icon: <LayoutGrid size={13} />,
        count: uiDesigns.length,
      },

      ...present.map((category) => ({
        value: category,
        label: categoryMeta[category].label,
        icon: categoryMeta[category].icon,
        count: uiDesigns.filter(
          (design) => design.category === category
        ).length,
      })),
    ];
  }, []);

  /* ------------------------------------------------------------------------ */
  /* FILTERED DESIGNS                                                         */
  /* ------------------------------------------------------------------------ */

  const filtered =
    activeFilter === "all"
      ? uiDesigns
      : uiDesigns.filter(
          (design) => design.category === activeFilter
        );

  const visible = filtered.slice(0, visibleCount);

  const remaining = filtered.length - visible.length;

  /* ------------------------------------------------------------------------ */
  /* FILTER CHANGE                                                            */
  /* ------------------------------------------------------------------------ */

  const changeFilter = (
    value: "all" | UIDesignCategory
  ) => {
    setActiveFilter(value);
    setVisibleCount(PAGE_SIZE);
    setActiveIndex(null);
  };

  /* ------------------------------------------------------------------------ */
  /* LIGHTBOX                                                                 */
  /* ------------------------------------------------------------------------ */

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((index) => {
        if (index === null) {
          return index;
        }

        if (filtered.length === 0) {
          return null;
        }

        return (
          (index + direction + filtered.length) %
          filtered.length
        );
      });
    },
    [filtered.length]
  );

  /* ------------------------------------------------------------------------ */
  /* KEYBOARD CONTROLS                                                        */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowRight") {
        step(1);
      }

      if (event.key === "ArrowLeft") {
        step(-1);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, step]);

  const active =
    activeIndex !== null
      ? filtered[activeIndex]
      : null;

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen overflow-x-hidden px-6 pb-24 pt-32 md:px-10 md:pt-44 lg:px-12"
        style={{
          backgroundColor: paper,
          color: ink,
        }}
      >
        <style>{`
          ::selection {
            background: ${accent};
            color: ${paper};
          }
        `}</style>

        <div className="mx-auto max-w-[1440px]">

          {/* ================================================================ */}
          {/* HEADER                                                           */}
          {/* ================================================================ */}

          <header
            className="grid gap-8 border-b pb-12 md:grid-cols-[1fr_2fr] md:pb-16"
            style={{
              borderColor: hairline,
            }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{
                color: muted,
              }}
            >
              UI Gallery
            </span>

            <div>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-8xl"
              >
                Visual{" "}
                <span
                  className="italic"
                  style={{
                    color: accent,
                  }}
                >
                  explorations.
                </span>
              </motion.h1>

              <p
                className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
                style={{
                  color: muted,
                }}
              >
                Interfaces, components and smaller experiments that sit
                outside the case studies.
              </p>
            </div>
          </header>

          {/* ================================================================ */}
          {/* FILTERS                                                          */}
          {/* ================================================================ */}

          <div
            className="flex items-center gap-8 overflow-x-auto border-b md:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              borderColor: hairline,
            }}
            role="tablist"
            aria-label="Filter designs by category"
          >
            {filters.map((filter) => {
              const isActive =
                activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() =>
                    changeFilter(filter.value)
                  }
                  className="relative flex items-center gap-2 whitespace-nowrap py-5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
                  style={{
                    color: isActive ? ink : muted,
                  }}
                >
                  <span
                    style={{
                      color: isActive ? accent : muted,
                    }}
                  >
                    {filter.icon}
                  </span>

                  {filter.label}

                  <span
                    style={{
                      color: muted,
                    }}
                  >
                    {String(filter.count).padStart(2, "0")}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="ui-filter-underline"
                      className="absolute -bottom-px left-0 h-px w-full"
                      style={{
                        backgroundColor: accent,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ================================================================ */}
          {/* GRID                                                             */}
          {/* ================================================================ */}

          {filtered.length === 0 ? (
            <p
              className="py-24 text-center text-sm"
              style={{
                color: muted,
              }}
            >
              Nothing in this category yet.
            </p>
          ) : (
            <section className="grid grid-cols-1 gap-x-6 gap-y-12 py-12 sm:grid-cols-2 md:gap-x-10 md:py-16 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((design, index) => (
                  <motion.button
                    layout
                    key={design.id}
                    type="button"
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    className="group flex flex-col text-left"
                    aria-label={`View ${design.title}`}
                  >
                    {/* IMAGE */}

                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden border"
                      style={{
                        borderColor: hairline,
                        backgroundColor: "#ECEAE5",
                      }}
                    >
                      <Image
                        src={design.image}
                        alt={design.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <span
                        className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.15em]"
                        style={{
                          color: paper,
                          mixBlendMode: "difference",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* INFO */}

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-xl tracking-[-0.02em] md:text-2xl">
                          {design.title}
                        </h3>

                        <p
                          className="mt-1 truncate text-sm"
                          style={{
                            color: muted,
                          }}
                        >
                          {design.subtitle}
                        </p>
                      </div>

                      <span
                        className="mt-1 shrink-0 border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em]"
                        style={{
                          color: muted,
                          borderColor: hairline,
                        }}
                      >
                        {getCategoryLabel(
                          design.category
                        )}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </section>
          )}

          {/* ================================================================ */}
          {/* LOAD MORE                                                        */}
          {/* ================================================================ */}

          {remaining > 0 && (
            <div className="flex justify-center pb-4">
              <button
                onClick={() =>
                  setVisibleCount(
                    (value) => value + PAGE_SIZE
                  )
                }
                className="border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[#111111]"
                style={{
                  color: muted,
                  borderColor: hairline,
                }}
              >
                Load more · {remaining} remaining
              </button>
            </div>
          )}

          {/* ================================================================ */}
          {/* CTA                                                              */}
          {/* ================================================================ */}

          <footer
            className="mt-24 border-t py-16 text-center md:mt-32"
            style={{
              borderColor: hairline,
            }}
          >
            <h2 className="mb-10 font-serif text-4xl tracking-[-0.035em] md:text-6xl">
              Have a product that needs{" "}
              <span
                className="italic"
                style={{
                  color: accent,
                }}
              >
                clearer design?
              </span>
            </h2>

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[#C86B3C]"
              style={{
                backgroundColor: ink,
                color: paper,
              }}
            >
              Get in touch

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </footer>
        </div>
      </main>

      {/* ================================================================== */}
      {/* LIGHTBOX                                                          */}
      {/* ================================================================== */}

      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[300] flex flex-col"
            style={{
              backgroundColor: "rgba(17,17,17,0.92)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            {/* BACKDROP */}

            <button
              className="absolute inset-0 cursor-default"
              onClick={close}
              aria-label="Close preview"
            />

            {/* TOP BAR */}

            <div
              className="relative z-10 flex items-center justify-between px-5 py-4 md:px-8"
              style={{
                color: paper,
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                {String(
                  (activeIndex ?? 0) + 1
                ).padStart(2, "0")}{" "}
                /{" "}
                {String(
                  filtered.length
                ).padStart(2, "0")}
              </span>

              <button
                onClick={close}
                aria-label="Close preview"
                className="flex h-9 w-9 items-center justify-center"
                autoFocus
              >
                <X
                  size={20}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* IMAGE */}

            <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 md:px-16">
              <Image
                src={active.image}
                alt={active.title}
                width={1600}
                height={1200}
                sizes="100vw"
                className="pointer-events-auto h-auto max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* BOTTOM BAR */}

            <div
              className="relative z-10 flex items-center justify-between gap-6 px-5 py-5 md:px-8"
              style={{
                color: paper,
              }}
            >
              <div className="min-w-0">
                <h3 className="truncate font-serif text-2xl tracking-[-0.02em]">
                  {active.title}
                </h3>

                <p className="mt-1 truncate text-sm opacity-60">
                  {active.subtitle}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-5">

                {/* EXTERNAL LINK */}

                {/* {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] sm:flex"
                  >
                    Open

                    <ArrowUpRight
                      size={13}
                      style={{
                        color: accent,
                      }}
                    />
                  </a>
                )} */}

                {/* PREVIOUS */}

                <button
                  onClick={() => step(-1)}
                  aria-label="Previous design"
                  className="flex h-9 w-9 items-center justify-center border border-white/20"
                >
                  <ArrowLeft
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

                {/* NEXT */}

                <button
                  onClick={() => step(1)}
                  aria-label="Next design"
                  className="flex h-9 w-9 items-center justify-center border border-white/20"
                >
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}