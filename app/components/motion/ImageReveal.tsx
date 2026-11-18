"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

/* Project image that wipes in from the bottom when it enters view,
   with a soft settle (scale 1.12 → 1). On hover (mouse only) a small
   label follows the cursor, e.g. "View case study ↗". */

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  label?: string;
  className?: string;
};

export default function ImageReveal({ src, alt, sizes, priority, label, className = "" }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 32 });
  const sy = useSpring(y, { stiffness: 380, damping: 32 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-md border border-hairline bg-sunken ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && label && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onPointerMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {hover && label && (
          <motion.span
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute left-0 top-0 z-10"
          >
            {/* plain inner span centres the pill on the cursor; motion owns the outer transform */}
            <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper">
              {label}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}