"use client";

import { useEffect, useRef } from "react";

/**
 * Kinetic type: letters get heavier the closer the cursor is (variable font).
 * Only on devices with a mouse, and never with reduced motion.
 * Pass an aria-label on the parent heading: the letters themselves are aria-hidden.
 */
export default function KineticText({
  text,
  className = "",
  base,
  peak,
  radius = 230,
}: {
  text: string;
  className?: string;
  base: number;
  peak: number;
  radius?: number;
}) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let px = -9999;
    let py = -9999;

    const update = () => {
      raf = 0;
      refs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
        const t = Math.max(0, 1 - d / radius);
        el.style.fontWeight = String(Math.round(base + (peak - base) * t * t));
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      schedule();
    };
    const onLeave = () => {
      px = py = -9999;
      schedule();
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [base, peak, radius]);

  let charIndex = 0;

  return (
    <span aria-hidden="true" className={className}>
      {text.split(" ").map((word, w, all) => (
        <span key={`${word}-${w}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, c) => {
              const i = charIndex++;
              return (
                <span
                  key={`${char}-${c}`}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="inline-block transition-[font-weight] duration-150 ease-out"
                  style={{ fontWeight: base }}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {w < all.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

