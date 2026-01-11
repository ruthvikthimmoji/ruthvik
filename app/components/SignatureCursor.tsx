"use client";

import { useEffect, useState } from "react";

export default function SignatureCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(
          400px at ${cursor.x}px ${cursor.y}px,
          rgba(249,87,56,0.08),
          transparent 70%
        )`,
        mixBlendMode: "overlay",
        transition: "background 0.1s ease-out",
      }}
    />
  );
}
