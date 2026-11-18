"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { activeSocials, PROFILE } from "./content";
import Guestbook from "./Guestbook";
import LabBoard, { LabLink } from "./LabBoard";
import WritingBoard, { WritingLink } from "./WritingBoard";
import { AllWorkLink, ContactBody, FrameLabel, HeroBody, openBrief, openResume, ProcessFlow, ProjectCards } from "./Pieces";
import BriefPanel from "./BriefPanel";
import ResumeViewer from "./ResumeViewer";
import Walkthrough from "./Walkthrough";
import StoryMap from "./StoryMap";
import Logo from "./Logo";

/* =========================================================
   MOBILE — the same board, stacked into a normal scrolling
   page (an infinite canvas is awkward on a phone).
========================================================= */

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function CanvasMobile() {
  const [menu, setMenu] = useState(false);
  const socials = activeSocials();
  useEffect(() => {
    const h = location.hash.slice(1);
    if (h) window.setTimeout(() => go(`m-${h}`), 150);
  }, []);
  const pick = (fn: () => void) => () => {
    setMenu(false);
    fn();
  };

  return (
    <div className="cv is-ready">
      <main className="cv-mobile">
        <div className="cv-panel cv-mtop">
          <span className="cv-mbrand">
            <Logo />
            {PROFILE.name} — Portfolio
          </span>
          <button type="button" className="cv-hire cv-mbtn" aria-expanded={menu} aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu((m) => !m)}>
            <span className={`burger${menu ? " x" : ""}`} aria-hidden="true">
              <i />
              <i />
            </span>
            {menu ? "Close" : "Menu"}
          </button>
          {menu && (
            <div className="cv-mmenu cv-panel" role="menu">
              <button type="button" role="menuitem" onClick={pick(() => go("m-story"))}>My story</button>
              <button type="button" role="menuitem" onClick={pick(() => go("m-work"))}>Selected work</button>
              <Link role="menuitem" href="/work" onClick={() => setMenu(false)}>All work →</Link>
              <button type="button" role="menuitem" onClick={pick(openResume)}>View résumé</button>
              <Link role="menuitem" href="/lab" onClick={() => setMenu(false)}>The lab — UI, motion, 3D</Link>
              <Link role="menuitem" href="/writing" onClick={() => setMenu(false)}>Writing</Link>
              <button type="button" role="menuitem" onClick={pick(() => go("m-guestbook"))}>Leave a note</button>
              <button type="button" role="menuitem" onClick={pick(() => go("m-contact"))}>Say hello</button>
              <button type="button" role="menuitem" className="quiet" onClick={pick(openBrief)}>Freelance project? Send a brief</button>
              {socials.length > 0 && <div className="sep" />}
              {socials.map((s) => (
                <a key={s.label} role="menuitem" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        <section className="cv-section" id="m-hello">
          <FrameLabel>01 — Hello</FrameLabel>
          <div className="cv-frame">
            <HeroBody onWork={() => go("m-work")} />
          </div>
        </section>

        <section className="cv-section" id="m-story">
          <FrameLabel>02 — My story</FrameLabel>
          <div className="cv-frame" style={{ padding: "24px 18px" }}>
            <StoryMap compact />
          </div>
        </section>

        <section className="cv-section" id="m-work">
          <FrameLabel right={<AllWorkLink />}>03 — Selected work</FrameLabel>
          <div className="cv-frame cv-work" style={{ padding: 14 }}>
            <ProjectCards withComment={false} />
          </div>
        </section>

        <section className="cv-section" id="m-process">
          <FrameLabel>04 — How I work</FrameLabel>
          <div className="cv-frame cv-process">
            <ProcessFlow />
          </div>
        </section>

        <section className="cv-section" id="m-contact">
          <FrameLabel>05 — Say hello</FrameLabel>
          <div className="cv-frame cv-contact">
            <ContactBody hint={false} />
          </div>
        </section>

        <section className="cv-section" id="m-writing">
          <FrameLabel right={<WritingLink />}>06 — Writing</FrameLabel>
          <div className="cv-frame" style={{ padding: "24px 18px" }}>
            <WritingBoard compact />
          </div>
        </section>

        <section className="cv-section" id="m-lab">
          <FrameLabel right={<LabLink />}>07 — The lab</FrameLabel>
          <div className="cv-frame" style={{ padding: "22px 16px" }}>
            <LabBoard compact />
          </div>
        </section>

        <section className="cv-section" id="m-guestbook">
          <FrameLabel>08 — Guestbook</FrameLabel>
          <div className="cv-frame" style={{ padding: 16 }}>
            <Guestbook compact />
          </div>
        </section>
      </main>
      <ResumeViewer />
      <BriefPanel />
      <Walkthrough />
    </div>
  );
}
