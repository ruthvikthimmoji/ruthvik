"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per browser session so it never slows down navigation
    const hasSeen = sessionStorage.getItem("ruthvik_splash_seen");
    if (hasSeen) return;

    setVisible(true);
    sessionStorage.setItem("ruthvik_splash_seen", "true");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 220);
          return 100;
        }
        return prev + 10;
      });
    }, 75);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-paper text-ink"
        >
          {/* Dot grid background */}
          <div
            aria-hidden="true"
            className="bg-dots pointer-events-none absolute inset-0 opacity-50"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Figma Selection Frame around 3D Avatar */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 border border-accent bg-sunken p-2 shadow-2xl"
            >
              {/* 4 Figma Corner Handles */}
              <span className="absolute -left-1.5 -top-1.5 h-2.5 w-2.5 border border-accent bg-paper" />
              <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 border border-accent bg-paper" />
              <span className="absolute -bottom-1.5 -left-1.5 h-2.5 w-2.5 border border-accent bg-paper" />
              <span className="absolute -bottom-1.5 -right-1.5 h-2.5 w-2.5 border border-accent bg-paper" />

              <div className="relative h-28 w-28 overflow-hidden rounded-lg sm:h-32 sm:w-32">
                <Image
                  src="/avatar-3d.jpg"
                  alt="Ruthvik 3D Avatar"
                  fill
                  sizes="128px"
                  priority
                  className="object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Name & Role Badge */}
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              Ruthvik P. Thimmoji
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Mounting Workspace… {progress}%
            </span>

            {/* Crisp Progress Bar */}
            <div className="mt-4 h-[2px] w-44 overflow-hidden rounded-full bg-hairline">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}