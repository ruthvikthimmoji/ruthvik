"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useTransform,
} from "framer-motion";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / OngoingWork.tsx.
// ---------------------------------------------------------------------------
const brass = "#C7A25C";
const paper = "#F3F1EC";

export default function SignatureCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Core motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoothed values — slightly stiffer spring than before so the reticle
  // reads as precise rather than floaty, which suits a "design tool" feel
  const springConfig = { damping: 30, stiffness: 220, mass: 0.4 };
  const smoothedX = useSpring(cursorX, springConfig);
  const smoothedY = useSpring(cursorY, springConfig);

  // Ambient glow, tied to the same spring so it trails the reticle, not the raw cursor
  const backgroundValue = useTransform(
    [smoothedX, smoothedY],
    ([x, y]) => `radial-gradient(480px circle at ${x}px ${y}px, rgba(199, 162, 92, 0.06), transparent 80%)`
  );

  useEffect(() => {
    setMounted(true);

    const checkDevice = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkDevice();

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
    }

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", checkDevice);
    };
  }, [cursorX, cursorY, isMobile]);

  if (!mounted || isMobile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-[999]"
      >
        {/* Ambient glow */}
        <motion.div
          className="fixed inset-0 z-30"
          style={{ background: backgroundValue }}
        />

        {/* Reticle — horizontal + vertical hairlines crossing at the cursor,
            like a selection tool. mix-blend-difference keeps it legible
            over both the ink background and any lighter content. */}
        <motion.div
          className="fixed top-0 left-0 z-[1000] pointer-events-none mix-blend-difference"
          style={{
            x: smoothedX,
            y: smoothedY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <div className="relative w-6 h-6">
            <div
              className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2"
              style={{ backgroundColor: paper }}
            />
            <div
              className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2"
              style={{ backgroundColor: paper }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: brass }}
            />
          </div>
        </motion.div>

        {/* Coordinate readout — trails just below/right of the reticle */}
        <motion.div
          className="fixed top-0 left-0 z-[1001] pointer-events-none font-mono text-[10px] tracking-wider whitespace-nowrap"
          style={{
            x: smoothedX,
            y: smoothedY,
            translateX: "14px",
            translateY: "10px",
            color: brass,
          }}
        >
          {String(coords.x).padStart(4, "0")}
          <span style={{ color: paper, opacity: 0.4 }}> / </span>
          {String(coords.y).padStart(4, "0")}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}