"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Figma-style "multiplayer" name tag that trails your real cursor.
 * - Native cursor stays visible (nothing is hidden or replaced).
 * - Only on devices with a fine pointer + hover (so never on touch).
 * - Off when the user prefers reduced motion.
 * - Add data-cursor="Some label" to any element to change the tag text on hover.
 */
const DEFAULT_LABEL = "You";

export default function SignatureCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState(DEFAULT_LABEL);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { stiffness: 420, damping: 36, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX + 14);
      y.set(e.clientY + 16);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setLabel(target?.dataset.cursor ?? DEFAULT_LABEL);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[400]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.92 : 1 }}
        transition={{ duration: 0.18 }}
        className="whitespace-nowrap rounded-full rounded-tl-none bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper shadow-lg"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
