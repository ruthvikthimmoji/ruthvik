"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getWalkthrough, projects } from "@/app/data/projects";

/* Plays a project walkthrough in an overlay:
   YouTube / Loom / .mp4 video, or an interactive Figma prototype.
   "live" walkthroughs just open the site in a new tab. */

const EASE = [0.16, 1, 0.3, 1] as const;

function youtubeId(u: URL) {
  if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
  if (u.searchParams.get("v")) return u.searchParams.get("v");
  const m = u.pathname.match(/\/(embed|shorts|live)\/([^/?]+)/);
  return m?.[2] ?? null;
}

export function embedFor(kind: "video" | "figma" | "live", url: string): { type: "iframe" | "video"; src: string } | null {
  if (kind === "figma") return { type: "iframe", src: `https://www.figma.com/embed?embed_host=share&hide-ui=1&url=${encodeURIComponent(url)}` };
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return { type: "video", src: url };
  try {
    const u = new URL(url, "https://x.local");
    if (/youtube\.com|youtu\.be/.test(u.hostname)) {
      const id = youtubeId(u);
      return id ? { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` } : null;
    }
    if (u.hostname.includes("loom.com")) return { type: "iframe", src: url.replace("/share/", "/embed/") + (url.includes("?") ? "&" : "?") + "autoplay=1&hide_owner=true" };
  } catch {}
  return { type: "iframe", src: url };
}

export default function Walkthrough() {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const on = (e: Event) => {
      const s = (e as CustomEvent<string>).detail;
      const wt = getWalkthrough(s);
      if (!wt) return;
      if (wt.kind === "live") window.open(wt.url, "_blank", "noopener,noreferrer");
      else setSlug(s);
    };
    window.addEventListener("open-walkthrough", on);
    return () => window.removeEventListener("open-walkthrough", on);
  }, []);

  useEffect(() => {
    if (!slug) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSlug(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [slug]);

  const project = projects.find((p) => p.slug === slug);
  const wt = project?.walkthrough;
  const media = wt ? embedFor(wt.kind, wt.url) : null;

  return (
    <AnimatePresence>
      {project && wt && media && (
        <motion.div className="cv cv-wt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <button type="button" className="cv-rv-scrim dark" aria-label="Close" onClick={() => setSlug(null)} />
          <motion.figure
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} walkthrough`}
            className={`cv-wt-fig ${wt.kind}`}
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <figcaption>
              <div>
                <b>{project.title}</b>
                <span>
                  {wt.kind === "figma" ? "Interactive prototype · click around" : "Walkthrough"}
                  {wt.duration ? ` · ${wt.duration}` : ""}
                  {wt.note ? ` · ${wt.note}` : ""}
                </span>
              </div>
              <button type="button" className="x" aria-label="Close" onClick={() => setSlug(null)}>
                ✕
              </button>
            </figcaption>
            <div className="cv-wt-media">
              {media.type === "video" ? (
                <video src={media.src} controls autoPlay playsInline />
              ) : (
                <iframe src={media.src} title={`${project.title} walkthrough`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              )}
            </div>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
