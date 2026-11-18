"use client";

import { useState } from "react";

/* Your logo in every top bar.
   Uses /logo.svg if you put one in /public, otherwise falls back to
   app/icon.svg (Next.js serves that at /icon.svg automatically). */
export default function Logo({ size = 30 }: { size?: number }) {
  const [src, setSrc] = useState("/logo.svg");
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="logo" aria-hidden="true" style={{ width: size, height: size }}>
        R
      </span>
    );
  }
  return (
    <span className="logo has-img" aria-hidden="true" style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        onError={() => (src === "/logo.svg" ? setSrc("/icon.svg") : setFailed(true))}
      />
    </span>
  );
}
