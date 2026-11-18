"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { isVideo, LAB_KINDS, labByKind, labFilled, type LabItem, type LabKind } from "@/app/data/lab";

/* =========================================================
   08 — THE LAB: UI shots, motion studies, 3D.
   Shared media tile + the canvas frame body.
========================================================= */

export function LabMedia({ item, sizes, controls = false }: { item: LabItem; sizes: string; controls?: boolean }) {
  const reduced = useReducedMotion();
  if (!item.src) {
    return (
      <div className="lab-slot" aria-label={`${item.title}, coming soon`}>
        <span>{item.kind === "3d" ? "render" : item.kind === "motion" ? "animating" : "shot"} coming soon</span>
      </div>
    );
  }
  if (isVideo(item.src)) {
    return (
      <video
        className="lab-video"
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        controls={controls}
        preload="metadata"
        aria-label={item.title}
      />
    );
  }
  return <Image src={item.src} alt={item.title} fill sizes={sizes} />;
}

export function LabLink() {
  const n = labFilled().length;
  return (
    <Link href="/lab" className="cv-allwork">
      Open the lab{n ? ` (${n})` : ""} →
    </Link>
  );
}

const KINDS: LabKind[] = ["ui", "motion", "3d"];

export default function LabBoard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`lab-board${compact ? " compact" : ""}`}>
      {KINDS.map((k) => {
        const items = labByKind(k).slice(0, 3);
        const filled = labFilled(k).length;
        return (
          <div key={k} className={`lab-col lab-${k}`}>
            <div className="lab-col-head">
              <h3>{LAB_KINDS[k].label}</h3>
              <span className="lab-status">
                <b aria-hidden="true" />
                {LAB_KINDS[k].status}
              </span>
            </div>
            <p className="lab-blurb">{LAB_KINDS[k].blurb}</p>
            <div className="lab-tiles">
              {items.map((it, i) => (
                <Link
                  key={it.id}
                  href={`/lab?kind=${k}${it.src ? `&item=${it.id}` : ""}`}
                  className={`lab-tile${i === 0 ? " big" : ""}${it.src ? "" : " empty"}`}
                  aria-label={it.title}
                >
                  <div className="lab-media">
                    <LabMedia item={it} sizes={i === 0 ? "520px" : "260px"} />
                  </div>
                  {it.src && <span className="lab-cap">{it.title}</span>}
                </Link>
              ))}
            </div>
            <Link href={`/lab?kind=${k}`} className="lab-more">
              {filled ? `See all ${filled} →` : "Follow along →"}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
