"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectBrief from "./ProjectBrief";

/* Freelance brief as a side panel — kept off the main canvas so the
   portfolio reads "product designer for hire", not "agency". */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BriefPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("open-brief", on);
    if (location.hash === "#brief") setOpen(true);
    return () => window.removeEventListener("open-brief", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cv cv-bp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <button type="button" className="cv-rv-scrim" aria-label="Close" onClick={() => setOpen(false)} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Start a freelance project"
            className="cv-bp-panel"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="cv-bp-bar">
              <span className="cv-lbl">Freelance · limited slots</span>
              <button type="button" className="x" aria-label="Close" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            <ProjectBrief />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
