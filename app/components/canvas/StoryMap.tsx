"use client";

import Image from "next/image";
import { PROFILE, STORY, STORY_INTRO } from "./content";

/* =========================================================
   02 — MY STORY: a journey map.
   Chapters sit along a hand-drawn line that rises and dips
   with how each chapter felt (the `mood` value in content.ts).
========================================================= */

const CARD_W = 280;
const GAP = 26;
const ROW_H = 470;
const top = (mood: number) => 26 + (100 - mood) * 1.5;

export default function StoryMap({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="cv-story-m">
        <p className="cv-story-intro">{STORY_INTRO}</p>
        <ol>
          {STORY.map((c, i) => (
            <li key={c.title}>
              <span className={`dot${i === STORY.length - 1 ? " now" : ""}`} aria-hidden="true" />
              <span className="when">{c.when}</span>
              <h4>{c.title}</h4>
              <p>{c.happened}</p>
              <div className={`learned cv-${c.color}`}>
                <small>What I learned</small>
                {c.learned}
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const width = STORY.length * CARD_W + (STORY.length - 1) * GAP;
  const pts = STORY.map((c, i) => ({ x: i * (CARD_W + GAP) + CARD_W / 2, y: top(c.mood) - 16 }));
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x - CARD_W / 2} ${p.y + 20} C ${p.x - 60} ${p.y + 10}, ${p.x - 40} ${p.y}, ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const mx = (prev.x + p.x) / 2;
      return `C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <div className="cv-story">
      <div className="cv-story-side">
        <div className="cv-polaroid static" style={{ transform: "rotate(-3deg)" }}>
          <div className="cv-tape" aria-hidden="true" />
          <div className="cv-ph">
            <Image src={PROFILE.photo} alt={PROFILE.fullName} fill sizes="200px" style={{ objectFit: "cover" }} />
          </div>
          <span>that’s me ✦</span>
        </div>
        <p className="cv-story-intro">{STORY_INTRO}</p>
        <p className="cv-hand" style={{ fontSize: 20, marginTop: 8 }}>
          the line = how each chapter felt →
        </p>
      </div>

      <div className="cv-story-row" style={{ width, height: ROW_H }}>
        <svg className="cv-story-line" width={width} height={ROW_H} aria-hidden="true">
          <path d={d} />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 8 : 5} className={i === pts.length - 1 ? "now" : ""} />
          ))}
        </svg>

        {STORY.map((c, i) => (
          <article
            key={c.title}
            className="cv-chapter cv-pop"
            style={{ left: i * (CARD_W + GAP), top: top(c.mood), width: CARD_W, animationDelay: `${0.9 + i * 0.12}s` }}
          >
            <span className={`when${i === STORY.length - 1 ? " now" : ""}`}>{c.when}</span>
            <h4>{c.title}</h4>
            <p>{c.happened}</p>
            <div className={`learned cv-${c.color}`} style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}>
              <small>What I learned</small>
              {c.learned}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
