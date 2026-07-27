"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { activeProjects } from "@/app/data/active-projects";

// ---------------------------------------------------------------------------
// Same tokens as Hero.tsx / Navbar.tsx / OngoingWork.tsx / CaseStudyClient.tsx.
// ---------------------------------------------------------------------------
const ink = "#0E0E10";
const paper = "#F3F1EC";
const graphite = "#8B8985";
const brass = "#C7A25C";
const hairline = "rgba(199, 162, 92, 0.16)";

export default function LiveWorkPage() {
  const { id } = useParams();
  const router = useRouter();

  const project = activeProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-serif italic text-lg"
        style={{ backgroundColor: ink, color: graphite }}
      >
        Project not found.
      </div>
    );
  }

  const specRows = [
    { label: "Status", value: project.status },
    { label: "Type", value: project.type },
    { label: "Progress", value: `${project.progress}%` },
  ];

  return (
    <main
      className="min-h-screen p-4 md:p-8 pt-24 md:pt-32"
      style={{ backgroundColor: ink, color: paper }}
    >
      <style>{`::selection { background: ${brass}; color: ${ink}; }`}</style>

      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] mb-10 md:mb-12 transition-colors"
          style={{ color: graphite }}
          onMouseEnter={(e) => (e.currentTarget.style.color = brass)}
          onMouseLeave={(e) => (e.currentTarget.style.color = graphite)}
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          Back to Studio
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: brass }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: brass }} />
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.25em] font-medium"
                style={{ color: brass }}
              >
                Live Figma Feed
              </span>
            </div>

            <h1 className="font-serif italic text-4xl md:text-6xl tracking-tight leading-[0.95] mb-4">
              Live Sprint:{" "}
              <span className="not-italic font-sans uppercase tracking-tight" style={{ color: brass }}>
                {project.name}
              </span>
            </h1>

            <p
              className="font-serif italic text-sm md:text-base leading-relaxed max-w-xl"
              style={{ color: graphite }}
            >
              {project.description}
            </p>
          </div>
        </div>

        {/* Spec sheet — reuses the Footer/CaseStudy colophon pattern, and
            the progress bar mirrors OngoingWork exactly */}
        <div className="mb-10 md:mb-14 max-w-2xl" style={{ borderTop: `1px solid ${hairline}` }}>
          {specRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-6 py-3.5"
              style={{ borderBottom: `1px solid ${hairline}` }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.25em] shrink-0"
                style={{ color: brass }}
              >
                {row.label}
              </span>
              {row.label === "Progress" ? (
                <div className="flex items-center gap-3 flex-1 max-w-[240px]">
                  <div
                    className="flex-1 h-[2px] rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "circOut" }}
                      className="h-full"
                      style={{ backgroundColor: brass }}
                    />
                  </div>
                  <span className="font-mono text-xs" style={{ color: paper }}>
                    {row.value}
                  </span>
                </div>
              ) : (
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: paper }}>
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Prototype embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden"
          style={{ backgroundColor: "#161616", border: `1px solid ${hairline}` }}
        >
          {/* Click shield over the Figma watermark / file-link area */}
          <div className="absolute bottom-0 left-0 right-0 h-[60px] z-50 bg-transparent pointer-events-auto cursor-default" />

          {/* Loading state, behind the iframe */}
          <div className="absolute inset-0 flex items-center justify-center z-0" style={{ backgroundColor: "#161616" }}>
            <p
              className="font-mono text-[10px] uppercase font-medium tracking-[0.5em] animate-pulse"
              style={{ color: graphite }}
            >
              Initializing Canvas
            </p>
          </div>

          {project.figmaEmbed ? (
            <iframe
              src={project.figmaEmbed}
              className="relative z-10 w-full h-full border-none grayscale-[15%] hover:grayscale-0 transition-all duration-1000"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div
              className="relative z-10 flex items-center justify-center h-full font-serif italic"
              style={{ color: graphite }}
            >
              Embed link not available.
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <footer
          className="mt-12 py-10 flex flex-col items-center gap-4"
          style={{ borderTop: `1px solid ${hairline}` }}
        >
          <p
            className="font-mono text-[9px] uppercase font-medium tracking-[0.4em] text-center"
            style={{ color: graphite }}
          >
            Designuru Studio &copy; 2026 — Proprietary Design Sprint
          </p>
        </footer>
      </div>
    </main>
  );
}