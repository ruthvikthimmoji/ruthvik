"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { AREAS, type Area } from "./content";
import Guestbook from "./Guestbook";
import LabBoard, { LabLink } from "./LabBoard";
import WritingBoard, { WritingLink } from "./WritingBoard";
import { Dropdown, FileMenu, SocialIcons } from "./Menus";
import { AllWorkLink, ContactBody, FrameLabel, HeroBody, openBrief, openResume, ProcessFlow, ProjectCards } from "./Pieces";
import BriefPanel from "./BriefPanel";
import ResumeViewer from "./ResumeViewer";
import Walkthrough from "./Walkthrough";
import StoryMap from "./StoryMap";

/* =========================================================
   DESKTOP CANVAS — pan, zoom, drag stickies, stamp, fly
   between frames, multiplayer cursors.
========================================================= */

type Cam = { x: number; y: number; s: number };
type Tool = "move" | "hand" | "sticky" | "stamp";
type Stamp = { id: string; x: number; y: number; label: string; color: string };
type Doodle = { id: string; x: number; y: number; r: number; color: string; text: string; sub: string };

const STAMPS = [
  { label: "+1", color: "#fd5e02" },
  { label: "Love", color: "#7b61ff" },
  { label: "Hire!", color: "#14ae5c" },
  { label: "Wow", color: "#1d1d1b" },
];
/* Draggable stickies beside the hero ("drag things around ↘") */
const DOODLES: Doodle[] = [
  { id: "d1", x: 590, y: 604, r: -3, color: "y", text: "Figma by day, React by night", sub: "superpower" },
  { id: "d2", x: 795, y: 616, r: 3, color: "v", text: "Learning 3D + motion on the side ✦", sub: "currently" },
];
const OLD_NOTES_KEY = "rt-canvas-visitor-notes";
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const uid = (p: string) => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/* ---------- scripted cursors (own component so they never re-render the board) ---------- */
type Ripple = { id: number; x: number; y: number; color: string };
const PATHS: { name: string; color: string; points: [number, number, boolean?][] }[] = [
  { name: "Recruiter", color: "#7b61ff", points: [[330, 440, true], [1100, 980], [2560, 300, true], [2560, 1000]] },
  { name: "Hiring manager", color: "#14ae5c", points: [[1260, 420, true], [1650, 440], [700, 1120], [2500, 1150, true]] },
];

function Cursors({ reduced }: { reduced: boolean }) {
  const [pos, setPos] = useState<[number, number][]>([[600, 420], [1300, 500]]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (reduced) return;
    const timers: number[] = [];
    PATHS.forEach((p, ci) => {
      let i = 0;
      const step = () => {
        const [x, y, click] = p.points[i];
        setPos((prev) => prev.map((v, k) => (k === ci ? [x, y] : v)));
        if (click) {
          timers.push(
            window.setTimeout(() => {
              const id = Date.now() * 10 + ci + Math.random();
              setRipples((r) => [...r, { id, x, y, color: p.color }]);
              timers.push(window.setTimeout(() => setRipples((r) => r.filter((q) => q.id !== id)), 800));
            }, 1700),
          );
        }
        i = (i + 1) % p.points.length;
        timers.push(window.setTimeout(step, 3200 + Math.random() * 900));
      };
      timers.push(window.setTimeout(step, 2600 + ci * 400));
    });
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <>
      {PATHS.map((p, i) => (
        <div key={p.name} className="cv-mcursor" style={{ left: pos[i][0], top: pos[i][1] }} aria-hidden="true">
          <svg width="20" height="22" viewBox="0 0 20 22">
            <path d="M2 2 L8.5 19 L11 11.5 L18.5 9 Z" fill={p.color} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span className="name" style={{ background: p.color }}>
            {p.name}
          </span>
        </div>
      ))}
      {ripples.map((r) => (
        <div key={r.id} className="cv-ripple" style={{ left: r.x, top: r.y, borderColor: r.color }} aria-hidden="true" />
      ))}
    </>
  );
}

/* ---------- the board ---------- */
export default function CanvasBoard({ reduced }: { reduced: boolean }) {
  const vpRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const cam = useRef<Cam>({ x: 0, y: 0, s: 1 });
  const target = useRef<Cam | null>(null);

  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<Area>("Hero");
  const [tool, setToolState] = useState<Tool>("move");
  const toolRef = useRef<Tool>("move");
  const [stampIdx, setStampIdx] = useState(0);
  const [doodles, setDoodles] = useState<Doodle[]>(DOODLES);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const spaceDown = useRef(false);


  const setTool = useCallback((t: Tool) => {
    toolRef.current = t;
    setToolState(t);
  }, []);

  /* camera */
  const apply = useCallback(() => {
    const w = worldRef.current;
    if (!w) return;
    const c = cam.current;
    w.style.transform = `translate(${c.x}px, ${c.y}px) scale(${c.s})`;
    if (zoomRef.current) zoomRef.current.textContent = `${Math.round(c.s * 100)}%`;
  }, []);

  const fitTo = useCallback((name: Area, maxS = 1): Cam => {
    const [x, y, w, h] = AREAS[name];
    const pad = 110;
    const s = clamp(Math.min((innerWidth - pad * 2) / w, (innerHeight - pad * 2 - 40) / h), 0.15, maxS);
    return { s, x: innerWidth / 2 - (x + w / 2) * s, y: (innerHeight - 40) / 2 - (y + h / 2) * s };
  }, []);

  const flyTo = useCallback(
    (name: Area) => {
      const t = fitTo(name);
      if (reduced) {
        cam.current = t;
        apply();
      } else target.current = t;
      if (name !== "All") setActive(name);
    },
    [fitTo, reduced, apply],
  );

  const zoomAt = useCallback(
    (f: number, cx = innerWidth / 2, cy = innerHeight / 2) => {
      target.current = null;
      const c = cam.current;
      const ns = clamp(c.s * f, 0.15, 2.5);
      c.x = cx - (cx - c.x) * (ns / c.s);
      c.y = cy - (cy - c.y) * (ns / c.s);
      c.s = ns;
      apply();
    },
    [apply],
  );

  /* camera flight loop */
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = target.current;
      if (t) {
        const c = cam.current;
        c.x += (t.x - c.x) * 0.09;
        c.y += (t.y - c.y) * 0.09;
        c.s += (t.s - c.s) * 0.09;
        if (Math.abs(t.x - c.x) < 0.3 && Math.abs(t.y - c.y) < 0.3 && Math.abs(t.s - c.s) < 0.0005) {
          cam.current = { ...t };
          target.current = null;
        }
        apply();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [apply]);

  /* intro: overview → fly into the hero */
  useEffect(() => {
    const HASH: Record<string, Area> = { story: "Story", work: "Work", process: "Process", contact: "Contact", guestbook: "Guestbook", lab: "Lab", writing: "Writing" };
    const first: Area = HASH[location.hash.slice(1)] ?? "Hero";
    cam.current = fitTo(reduced ? first : "All");
    apply();
    try {
      localStorage.removeItem(OLD_NOTES_KEY);
    } catch {}
    const t1 = window.setTimeout(() => setReady(true), 120);
    if (reduced) setActive(first);
    const t2 = reduced ? 0 : window.setTimeout(() => flyTo(first), first === "Hero" ? 1700 : 900);
    const onResize = () => flyTo("Hero");
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openGuestbook = useCallback(() => {
    setTool("move");
    flyTo("Guestbook");
    window.setTimeout(() => window.dispatchEvent(new Event("guestbook-focus")), reduced ? 0 : 900);
  }, [setTool, flyTo, reduced]);

  /* wheel: pan, or zoom with ⌘/Ctrl */
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("textarea")) return; // let long text scroll
      e.preventDefault();
      target.current = null;
      if (e.ctrlKey || e.metaKey) zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX, e.clientY);
      else {
        cam.current.x -= e.deltaX;
        cam.current.y -= e.deltaY;
        apply();
      }
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
  }, [apply, zoomAt]);

  /* keyboard shortcuts */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
      if (document.querySelector(".cv-rv")) return; // résumé open
      if (e.code === "Space") {
        spaceDown.current = true;
        vpRef.current?.classList.add("is-pan");
        e.preventDefault();
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "v" || k === "escape") setTool("move");
      if (k === "h") setTool("hand");
      if (k === "s") openGuestbook();
      if (k === "e") setTool("stamp");
      if (k === "r") openResume();
      if (k === "=" || k === "+") zoomAt(1.2);
      if (k === "-") zoomAt(1 / 1.2);
      if (k === "1" && e.shiftKey) flyTo("All");
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        spaceDown.current = false;
        vpRef.current?.classList.remove("is-pan");
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [setTool, zoomAt, flyTo, openGuestbook]);

  /* pointer: pan / drag doodles / stamp */
  const drag = useRef({ mode: null as "pan" | "drag" | "place" | null, sx: 0, sy: 0, ox: 0, oy: 0, el: null as HTMLElement | null, id: null as string | null, moved: false });
  const toWorld = (cx: number, cy: number) => ({ x: (cx - cam.current.x) / cam.current.s, y: (cy - cam.current.y) / cam.current.s });

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement;
    if (t.closest("a, button, input, textarea, select, label, form, .cv-pin")) return;
    target.current = null;
    const d = drag.current;
    d.sx = e.clientX;
    d.sy = e.clientY;
    d.moved = false;
    if (toolRef.current === "stamp") {
      d.mode = "place";
      return;
    }
    const noteEl = t.closest<HTMLElement>("[data-note]");
    if (noteEl && toolRef.current === "move" && !spaceDown.current) {
      d.mode = "drag";
      d.el = noteEl;
      d.id = noteEl.dataset.note ?? null;
      d.ox = noteEl.offsetLeft;
      d.oy = noteEl.offsetTop;
      noteEl.classList.add("cv-dragging");
      setSelectedId(d.id);
    } else {
      d.mode = "pan";
      d.ox = cam.current.x;
      d.oy = cam.current.y;
      vpRef.current?.classList.add("is-pan");
      setSelectedId(null);
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    const you = youRef.current;
    if (you && e.pointerType === "mouse") {
      you.style.opacity = "1";
      you.style.left = `${e.clientX}px`;
      you.style.top = `${e.clientY}px`;
    }
    const d = drag.current;
    if (!d.mode) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    if (d.mode === "pan") {
      cam.current.x = d.ox + dx;
      cam.current.y = d.oy + dy;
      apply();
    } else if (d.mode === "drag" && d.el) {
      d.el.style.left = `${d.ox + dx / cam.current.s}px`;
      d.el.style.top = `${d.oy + dy / cam.current.s}px`;
    }
  };

  const onPointerUp = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.mode === "place" && !d.moved) {
      const p = toWorld(e.clientX, e.clientY);
      const s = STAMPS[stampIdx];
      setStamps((st) => [...st, { id: uid("s"), x: p.x, y: p.y, label: s.label, color: s.color }]);
    }
    if (d.mode === "drag" && d.el && d.id) {
      const { id, el } = d;
      el.classList.remove("cv-dragging");
      if (d.moved) setDoodles((n) => n.map((x) => (x.id === id ? { ...x, x: el.offsetLeft, y: el.offsetTop } : x)));
    }
    if (!spaceDown.current) vpRef.current?.classList.remove("is-pan");
    d.mode = null;
    d.el = null;
    d.id = null;
  };

  const tools: [Tool, string, ReactNode][] = [
    ["move", "Move · V", <path key="m" d="M5 3l14 7-6 2-2 6z" />],
    ["hand", "Hand · H", <path key="h" d="M8 13V5.5a1.5 1.5 0 013 0V12M11 11.5v-7a1.5 1.5 0 013 0V12M14 12V6.5a1.5 1.5 0 013 0V15a6 6 0 01-6 6h-1a6 6 0 01-5.2-3L3.5 14.5a1.5 1.5 0 012.6-1.5L8 15" />],
    ["sticky", "Leave a note · S", <g key="s"><path d="M4 4h16v10l-6 6H4z" /><path d="M14 20v-6h6" /></g>],
    ["stamp", "Stamp · E", <g key="e"><circle cx="12" cy="12" r="8.5" /><path d="M8.5 13.5c.8 1.4 2 2.1 3.5 2.1s2.7-.7 3.5-2.1" /><circle cx="9" cy="10" r=".8" fill="currentColor" /><circle cx="15" cy="10" r=".8" fill="currentColor" /></g>],
  ];

  return (
    <div className={`cv${ready ? " is-ready" : ""}`}>
      <div
        ref={vpRef}
        className={`cv-viewport tool-${tool}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          if (youRef.current) youRef.current.style.opacity = "0";
        }}
      >
        <div ref={worldRef} className="cv-world">
          {/* connectors */}
          <svg className="cv-wires" width="3200" height="3100" aria-hidden="true">
            <defs>
              <marker id="cv-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#b9b5ab" />
              </marker>
            </defs>
            <path className="wire" d="M 830 250 C 900 250, 900 250, 960 250" markerEnd="url(#cv-ah)" />
            <path className="wire" d="M 2170 320 C 2240 320, 2240 320, 2305 320" markerEnd="url(#cv-ah)" />
            <path className="wire" d="M 2640 570 C 2640 600, 2640 610, 2640 625" markerEnd="url(#cv-ah)" />
            <path className="wire" d="M 300 590 C 300 640, 300 680, 300 722" markerEnd="url(#cv-ah)" />
            <path className="wire" d="M 590 1370 C 590 1410, 590 1430, 590 1462" markerEnd="url(#cv-ah)" />
            <path className="wire" d="M 1190 1680 C 1230 1680, 1250 1680, 1290 1680" markerEnd="url(#cv-ah)" />
            <path className="wire" d="M 590 1870 C 590 2000, 590 2120, 590 2222" markerEnd="url(#cv-ah)" />
          </svg>

          {/* 01 Hello */}
          <section className="cv-frame cv-pop" style={{ left: 0, top: 0, width: 820, height: 580, padding: "56px 60px", animationDelay: "0.1s" }} aria-label="Hello">
            <FrameLabel>01 — Hello</FrameLabel>
            <HeroBody onWork={() => flyTo("Work")} />
            <div className="cv-hand" style={{ position: "absolute", right: 36, bottom: 30, transform: "rotate(-4deg)" }}>
              drag the stickies ↘
            </div>
          </section>

          {/* draggable stickies */}
          {doodles.map((n, i) => (
            <div
              key={n.id}
              data-note={n.id}
              className={`cv-sticky cv-${n.color} cv-pop${selectedId === n.id ? " cv-selected" : ""}`}
              style={{ left: n.x, top: n.y, transform: `rotate(${n.r}deg)`, animationDelay: `${0.6 + i * 0.1}s`, minHeight: 140 }}
            >
              <span className="cv-text">{n.text}</span>
              <small>{n.sub}</small>
            </div>
          ))}

          {/* 02 My story */}
          <section className="cv-frame cv-pop" style={{ left: 0, top: 760, width: 2160, height: 600, padding: 34, animationDelay: "0.4s" }} aria-label="My story">
            <FrameLabel>02 — My story</FrameLabel>
            <StoryMap />
          </section>

          {/* 03 Work */}
          <section className="cv-frame cv-work cv-pop" style={{ left: 980, top: 0, width: 1180, height: 640, animationDelay: "0.3s" }} aria-label="Selected work">
            <FrameLabel right={<AllWorkLink />}>03 — Selected work</FrameLabel>
            <ProjectCards />
          </section>

          {/* 04 Process */}
          <section className="cv-frame cv-process cv-pop" style={{ left: 0, top: 1500, width: 1180, height: 360, animationDelay: "0.5s" }} aria-label="How I work">
            <FrameLabel>04 — How I work</FrameLabel>
            <ProcessFlow />
          </section>

          {/* 05 Say hello */}
          <section className="cv-frame cv-contact cv-pop" style={{ left: 2320, top: 0, width: 640, height: 560, animationDelay: "0.6s" }} aria-label="Contact">
            <FrameLabel>05 — Say hello</FrameLabel>
            <ContactBody />
          </section>

          {/* 06 Writing */}
          <section className="cv-frame cv-pop" style={{ left: 2320, top: 660, width: 640, height: 660, padding: "36px 36px 30px", animationDelay: "0.7s" }} aria-label="Writing">
            <FrameLabel right={<WritingLink />}>06 — Writing</FrameLabel>
            <WritingBoard compact />
          </section>

          {/* 07 Guestbook */}
          <section className="cv-frame cv-guest cv-pop" style={{ left: 1300, top: 1500, width: 1180, height: 620, animationDelay: "0.8s" }} aria-label="Guestbook">
            <FrameLabel>07 — Guestbook · leave me a note</FrameLabel>
            <Guestbook />
          </section>

          {/* 08 The lab */}
          <section className="cv-frame cv-pop" style={{ left: 0, top: 2260, width: 1760, height: 700, padding: 34, animationDelay: "0.9s" }} aria-label="The lab">
            <FrameLabel right={<LabLink />}>08 — The lab · UI, motion & 3D</FrameLabel>
            <LabBoard />
          </section>

          {/* stamps */}
          {stamps.map((s) => (
            <div key={s.id} className="cv-stampmark" style={{ left: s.x, top: s.y, background: s.color }} aria-hidden="true">
              {s.label}
            </div>
          ))}

          <Cursors reduced={reduced} />
        </div>
      </div>

      {/* top-left: name menu + always-visible section links */}
      <div className="cv-ui cv-panel cv-topbar">
        <FileMenu active={active} onFly={flyTo} />
      </div>

      {/* top-right */}
      <div className="cv-ui cv-panel cv-tr">
        <SocialIcons />
        <div className="cv-avs" aria-hidden="true">
          <span style={{ background: "#fd5e02" }}>You</span>
          <span style={{ background: "#7b61ff" }}>R</span>
          <span style={{ background: "#14ae5c" }}>H</span>
        </div>
        <span ref={zoomRef} className="cv-zoom">
          100%
        </span>
        <Dropdown label="Hire me" className="cv-hire-dd" menuClass="right" trigger={<span className="cv-hire">Hire me ▾</span>}>
          {(close) => (
            <>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  openResume();
                }}
              >
                Hiring for a full-time role
                <small>View my résumé</small>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  flyTo("Contact");
                }}
              >
                Just say hello
                <small>Email & socials</small>
              </button>
              <div className="sep" role="separator" />
              <button
                type="button"
                role="menuitem"
                className="quiet"
                onClick={() => {
                  close();
                  openBrief();
                }}
              >
                Freelance project? Send a brief
              </button>
            </>
          )}
        </Dropdown>
      </div>

      {/* stamp picker */}
      <div className={`cv-ui cv-panel cv-stamps${tool === "stamp" ? " open" : ""}`} role="radiogroup" aria-label="Stamp">
        {STAMPS.map((s, i) => (
          <button key={s.label} type="button" role="radio" aria-checked={i === stampIdx} className={i === stampIdx ? "on" : ""} style={{ background: s.color }} onClick={() => setStampIdx(i)}>
            {s.label}
          </button>
        ))}
      </div>

      {/* toolbar */}
      <nav className="cv-ui cv-panel cv-toolbar" aria-label="Canvas tools">
        {tools.map(([t, tip, icon]) => (
          <button key={t} type="button" className={`cv-tool${tool === t ? " on" : ""}`} aria-label={tip} aria-pressed={tool === t} onClick={() => (t === "sticky" ? openGuestbook() : setTool(t))}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
            <span className="tip">{tip}</span>
          </button>
        ))}
      </nav>

      {/* zoom */}
      <div className="cv-ui cv-panel cv-zoomctl">
        <button type="button" aria-label="Zoom out" onClick={() => zoomAt(1 / 1.2)}>
          −
        </button>
        <button type="button" className="fit" onClick={() => flyTo("All")}>
          Fit all
        </button>
        <button type="button" aria-label="Zoom in" onClick={() => zoomAt(1.2)}>
          +
        </button>
        <span className="cv-keys" tabIndex={0} aria-label="Keyboard shortcuts">
          ?
          <span className="pop" role="tooltip">
            Drag to pan · <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + scroll to zoom
            <br />
            <kbd>S</kbd> note · <kbd>E</kbd> stamp · <kbd>R</kbd> résumé · <kbd>⇧1</kbd> fit
          </span>
        </span>
      </div>


      <div ref={youRef} className="cv-you" aria-hidden="true">
        You
      </div>

      <ResumeViewer />
      <BriefPanel />
      <Walkthrough />
    </div>
  );
}
