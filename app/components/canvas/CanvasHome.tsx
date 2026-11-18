"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import CanvasBoard from "./CanvasBoard";
import CanvasMobile from "./CanvasMobile";
import "./canvas.css";

/* Desktop / laptop (≥ 900px wide, with a mouse) → the interactive canvas.
   Phones and small tablets → the stacked version. */

export default function CanvasHome() {
  const reduced = useReducedMotion() ?? false;
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Until we know the screen size, render the plain page background (no flash of the wrong layout)
  if (desktop === null) return <div className="cv" style={{ minHeight: "100vh", background: "#f4f3ef" }} />;

  return desktop ? <CanvasBoard reduced={reduced} /> : <CanvasMobile />;
}
