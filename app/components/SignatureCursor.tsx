"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SignatureCursor() {
  // Use Motion Values for smooth, hardware-accelerated movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add a "Spring" to create that organic, fluid latency
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothedX = useSpring(cursorX, springConfig);
  const smoothedY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* 1. The Main Soft Glow (The Ambient Light) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(
            600px circle at var(--x) var(--y),
            rgba(255, 79, 33, 0.06),
            transparent 80%
          )`,
          // Using CSS variables to update the position smoothly
          //@ts-expect-ignore
          ["--x" as any]: smoothedX.get() + "px",
          //@ts-expect-ignore
          ["--y" as any]: smoothedY.get() + "px",
        }}
      />

      {/* 2. The "Signature Dot" (The Point of Focus) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#ff4f21] rounded-full z-50 pointer-events-none mix-blend-difference"
        style={{
          x: smoothedX,
          y: smoothedY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* 3. The "Trailing Ring" (The Interactive Feel) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#ff4f21]/30 rounded-full z-50 pointer-events-none"
        style={{
          x: smoothedX,
          y: smoothedY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      />
    </>
  );
}