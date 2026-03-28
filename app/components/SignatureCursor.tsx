"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useTransform,
} from "framer-motion";

export default function SignatureCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Core Motion Values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Smoothed Values (Spring Physics)
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothedX = useSpring(cursorX, springConfig);
  const smoothedY = useSpring(cursorY, springConfig);

  // 3. The "Pro" Fix: Transform the x/y values into a valid CSS background string
  // This avoids CSS variables and the 'any' type altogether.
  const backgroundValue = useTransform(
    [smoothedX, smoothedY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 79, 33, 0.08), transparent 80%)`
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        {/* 1. The Main Soft Glow (Now using backgroundValue) */}
        <motion.div
          className="fixed inset-0 z-30 opacity-40"
          style={{
            background: backgroundValue,
          }}
        />

        {/* 2. The "Signature Dot" */}
        <motion.div
          className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#ff4f21] rounded-full z-[1001] pointer-events-none mix-blend-difference"
          style={{
            x: smoothedX,
            y: smoothedY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* 3. The "Trailing Ring" */}
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 border border-[#ff4f21]/40 rounded-full z-[1000] pointer-events-none"
          style={{
            x: smoothedX,
            y: smoothedY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}