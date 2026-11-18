"use client";

import { useEffect, useState } from "react";

/* Live local time in Bengaluru — a small human detail.
   Renders a placeholder until mounted to avoid hydration mismatch. */

const fmt = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

export default function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <span aria-hidden="true" className="relative flex h-[7px] w-[7px]">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-accent" />
      </span>
      {now ?? "--:--"} in Bengaluru
    </span>
  );
}