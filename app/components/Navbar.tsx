"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { posts } from "@/app/data/writing";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "/about" },
...(posts.length > 0 ? [{ label: "Writing", href: "/writing" }] : []),
  { label: "UI", href: "/ui" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ================================================================
     SCROLL STATE
  ================================================================ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================================================================
     CLOSE MOBILE MENU ON DESKTOP
  ================================================================ */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ================================================================
     LOCK BODY WHEN MENU / RESUME IS OPEN
  ================================================================ */

  useEffect(() => {
    if (!open && !resumeOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setResumeOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, resumeOpen]);

  /* ================================================================
     HELPERS
  ================================================================ */

  const closeMenu = () => {
    setOpen(false);
  };

  const openResume = () => {
    setOpen(false);
    setResumeOpen(true);
  };

  return (
    <>
      {/* ================================================================
          NAVBAR
      ================================================================ */}

      <motion.header
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed inset-x-0 top-0 z-[100]"
        style={{
          backgroundColor: scrolled
            ? "rgba(247, 246, 242, 0.92)"
            : paper,
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${hairline}`,
        }}
      >
        <nav
          className="
            mx-auto flex h-[72px] w-full max-w-[1440px]
            items-center justify-between
            px-6
            md:h-[80px] md:px-10
            lg:px-12
          "
          aria-label="Main navigation"
        >
          {/* ============================================================
              LOGO
          ============================================================ */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-2"
            aria-label="Ruthvik — Home"
          >
            <span
              className="
                font-serif text-[18px]
                tracking-[-0.02em]
                md:text-[20px]
              "
              style={{
                color: ink,
              }}
            >
              Ruthvik
            </span>

            <span
              aria-hidden="true"
              className="
                h-1.5 w-1.5 rounded-full
                transition-transform duration-300
                group-hover:scale-[1.7]
              "
              style={{
                backgroundColor: accent,
              }}
            />
          </Link>

          {/* ============================================================
              DESKTOP NAVIGATION
          ============================================================ */}

          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="
                    group relative
                    py-2
                    font-mono text-[10px]
                    uppercase tracking-[0.18em]
                  "
                  style={{
                    color: muted,
                  }}
                >
                  <span
                    className="
                      transition-colors duration-300
                      group-hover:text-[#111111]
                    "
                  >
                    {item.label}
                  </span>

                  {/* Hairline hover indicator */}

                  <span
                    aria-hidden="true"
                    className="
                      absolute bottom-0 left-0
                      h-px w-full
                      origin-left scale-x-0
                      transition-transform duration-300
                      group-hover:scale-x-100
                    "
                    style={{
                      backgroundColor: accent,
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Divider */}

            <span
              aria-hidden="true"
              className="mx-7 h-6 w-px"
              style={{
                backgroundColor: hairline,
              }}
            />

            {/* Resume */}

            <button
              onClick={() => setResumeOpen(true)}
              className="
                group flex items-center gap-2
                py-2
                font-mono text-[10px]
                uppercase tracking-[0.18em]
              "
              style={{
                color: muted,
              }}
              aria-label="Open resume"
            >
              <span
                className="
                  transition-colors duration-300
                  group-hover:text-[#111111]
                "
              >
                Resume
              </span>

              <ArrowUpRight
                size={12}
                strokeWidth={1.5}
                aria-hidden="true"
                className="
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
                style={{
                  color: accent,
                }}
              />
            </button>
          </div>

          {/* ============================================================
              MOBILE MENU BUTTON
          ============================================================ */}

          <button
            onClick={() => setOpen((value) => !value)}
            className="
              flex h-9 w-9
              items-center justify-center
              md:hidden
            "
            style={{
              color: ink,
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {open ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -45,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 45,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <X
                    size={20}
                    strokeWidth={1.5}
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 45,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -45,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Menu
                    size={20}
                    strokeWidth={1.5}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* ================================================================
            MOBILE MENU
        ================================================================ */}

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden md:hidden"
              style={{
                borderTop: `1px solid ${hairline}`,
                backgroundColor: paper,
              }}
            >
              <div className="px-6 pb-8 pt-2">
                {/* Navigation links */}

                <div>
                  {navItems.map((item, index) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className="
                        group flex items-center
                        justify-between
                        border-b py-5
                      "
                      style={{
                        borderColor: hairline,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="
                            font-mono text-[9px]
                            tracking-[0.15em]
                          "
                          style={{
                            color: accent,
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className="
                            font-serif text-3xl
                            tracking-[-0.03em]
                            transition-transform duration-300
                            group-hover:translate-x-1
                          "
                          style={{
                            color: ink,
                          }}
                        >
                          {item.label}
                        </span>
                      </div>

                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.2}
                        aria-hidden="true"
                        className="
                          transition-transform duration-300
                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                        "
                        style={{
                          color: muted,
                        }}
                      />
                    </Link>
                  ))}
                </div>

                {/* Resume */}

                <button
                  onClick={openResume}
                  className="
                    mt-0 flex w-full
                    items-center justify-between
                    border-b py-5 text-left
                  "
                  style={{
                    borderColor: hairline,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="
                        font-mono text-[9px]
                        tracking-[0.15em]
                      "
                      style={{
                        color: accent,
                      }}
                    >
                      05
                    </span>

                    <span
                      className="
                        font-serif text-3xl
                        tracking-[-0.03em]
                      "
                      style={{
                        color: ink,
                      }}
                    >
                      Resume
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.2}
                    aria-hidden="true"
                    style={{
                      color: muted,
                    }}
                  />
                </button>

                {/* ========================================================
                    CURRENT STATUS
                ======================================================== */}

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <span
                      className="
                        font-mono text-[8px]
                        uppercase tracking-[0.2em]
                      "
                      style={{
                        color: muted,
                      }}
                    >
                      Currently
                    </span>

                    <p className="mt-2 text-sm font-medium">
                      UX/UI Designer
                    </p>

                    <p
                      className="mt-1 text-xs"
                      style={{
                        color: muted,
                      }}
                    >
                      Studycrux
                    </p>
                  </div>

                  <div>
                    <span
                      className="
                        font-mono text-[8px]
                        uppercase tracking-[0.2em]
                      "
                      style={{
                        color: muted,
                      }}
                    >
                      Focus
                    </span>

                    <p
                      className="
                        mt-2 text-xs
                        leading-relaxed
                      "
                      style={{
                        color: muted,
                      }}
                    >
                      SaaS · Product UI
                      <br />
                      Design Systems · Mobile
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ================================================================
          RESUME PREVIEW
      ================================================================ */}

      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0 z-[200]
              flex items-center
              justify-center
              p-4 md:p-8
            "
          >
            {/* Backdrop */}

            <motion.button
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              aria-label="Close resume preview"
              onClick={() => setResumeOpen(false)}
              className="
                absolute inset-0
                cursor-default
              "
              style={{
                backgroundColor: "rgba(17, 17, 17, 0.78)",
              }}
            />

            {/* Resume window */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative flex
                h-[88vh] w-full
                max-w-4xl
                flex-col overflow-hidden
              "
              style={{
                backgroundColor: paper,
                border:
                  "1px solid rgba(247, 246, 242, 0.2)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.35)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Ruthvik resume"
            >
              {/* Resume toolbar */}

              <div
                className="
                  flex shrink-0
                  items-center
                  justify-between
                  px-5 py-4
                  md:px-6
                "
                style={{
                  borderBottom: `1px solid ${hairline}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: accent,
                    }}
                  />

                  <span
                    className="
                      font-mono text-[9px]
                      uppercase tracking-[0.22em]
                    "
                    style={{
                      color: muted,
                    }}
                  >
                    Resume / Ruthvik
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Download */}

                  <a
                    href="/Ruthvikresume.pdf"
                    download
                    className="
                      group flex items-center gap-2
                      font-mono text-[9px]
                      uppercase tracking-[0.18em]
                    "
                    style={{
                      color: muted,
                    }}
                  >
                    <span
                      className="
                        transition-colors
                        group-hover:text-[#111111]
                      "
                    >
                      Download
                    </span>

                    <Download
                      size={12}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      style={{
                        color: accent,
                      }}
                    />
                  </a>

                  {/* Close */}

                  <button
                    onClick={() => setResumeOpen(false)}
                    aria-label="Close resume preview"
                    className="
                      flex h-8 w-8
                      items-center
                      justify-center
                    "
                    style={{
                      color: muted,
                    }}
                  >
                    <X
                      size={18}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>

              {/* Resume */}

              <div className="min-h-0 flex-1 bg-white">
                <iframe
                  src="/Ruthvikresume.pdf#toolbar=0"
                  title="Ruthvik resume"
                  className="
                    h-full w-full
                    border-none
                  "
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}