"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import {
  ButtonFragment,
  ChartFragment,
  ListFragment,
  StatFragment,
  ToggleFragment,
} from "./Fragments";

/* =========================================================
   CHAPTER 03 — HOW A MESS BECOMES CLEAR
   One artboard (Parity) evolves in place:
   research notes → flow → wireframe → final UI.
   Desktop: pinned, 4 scroll steps, clickable tabs.
   Mobile: swipe carousel. Reduced motion: static stack.
========================================================= */

/* Where "Try the prototype" goes. Paste your Figma prototype link here,
   or leave empty to send people to the Parity case study. */
const PROTOTYPE_URL = "";
const PROTOTYPE_FALLBACK = "/case-studies/parity-b2b";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- the four artboard states ---------- */

function NotesArt({ compact = false }: { compact?: boolean }) {
  const notes = [
    { text: "“I can’t see how much FX ate.”", tone: "bg-warning", r: "-rotate-3" },
    { text: "Compliance holds feel like a punishment", tone: "bg-sunken", r: "rotate-2" },
    { text: "Too much jargon: collar? forward?", tone: "bg-warning", r: "-rotate-2" },
    { text: "“Where is my money right now?”", tone: "bg-sunken", r: "rotate-3" },
    { text: "SWIFT fees at every leg", tone: "bg-warning", r: "-rotate-1" },
    { text: "Founders fear auto-hedging", tone: "bg-sunken", r: "rotate-1" },
  ];
  const shown = compact ? notes.slice(0, 4) : notes;
  return (
    <div className={`grid h-full content-center gap-4 p-6 md:gap-6 md:p-10 ${compact ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3"}`}>
      {shown.map((n) => (
        <div
          key={n.text}
          className={`${n.tone} ${n.r} flex aspect-[4/3] items-start p-3 text-sm font-medium leading-snug text-[#023341] shadow-sm md:p-4 md:text-[15px]`}
        >
          {n.text}
        </div>
      ))}
    </div>
  );
}

function FlowArt({ compact = false }: { compact?: boolean }) {
  const nodes = ["Raise invoice", "Choose protection", "Review payout", "Send"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className={`flex items-center gap-2 md:gap-3 ${compact ? "flex-col" : "flex-col lg:flex-row"}`}>
        {nodes.map((n, i) => (
          <div key={n} className={`flex items-center gap-2 md:gap-3 ${compact ? "flex-col" : "flex-col lg:flex-row"}`}>
            <span
              className={`border px-4 py-3 text-sm text-ink ${
                i === 1 ? "border-accent bg-paper" : "border-hairline-strong bg-paper"
              }`}
            >
              {n}
            </span>
            {i < nodes.length - 1 && (
              <span aria-hidden="true" className="text-accent">
                {compact ? "↓" : <span className="lg:hidden">↓</span>}
                {!compact && <span className="hidden lg:inline">→</span>}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span aria-hidden="true">↳</span>
        <span className="border border-dashed border-danger px-3 py-2 text-ink">
          Compliance hold → tell them exactly what’s needed
        </span>
      </div>
    </div>
  );
}

function WireframeArt() {
  const block = "bg-hairline";
  return (
    <div className="grid h-full grid-cols-[22%_1fr] gap-4 p-6 md:gap-5 md:p-10">
      <div className="flex flex-col gap-3 border-r border-hairline pr-4">
        {[60, 80, 70, 50, 75].map((w, i) => (
          <span key={i} className={`h-3 ${block}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <span className={`h-5 w-1/3 ${block}`} />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="aspect-[4/3] border border-hairline-strong" />
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-3 ${block}`} style={{ width: `${90 - i * 12}%` }} />
          ))}
        </div>
        <span className="mt-auto h-9 w-32 self-end border border-hairline-strong" />
      </div>
    </div>
  );
}

function FinalArt({ compact = false }: { compact?: boolean }) {
  const href = PROTOTYPE_URL || PROTOTYPE_FALLBACK;
  const external = Boolean(PROTOTYPE_URL);
  return (
    <div className="relative flex h-full flex-col justify-center p-5 md:p-8">
      {compact ? (
        <div className="flex origin-top-left scale-[0.85] flex-col gap-3">
          <StatFragment />
          <ToggleFragment />
          <ButtonFragment />
        </div>
      ) : (
        <div className="flex origin-center scale-[0.78] flex-wrap items-start justify-center gap-5 xl:scale-90">
          <StatFragment />
          <ChartFragment />
          <ListFragment />
          <ToggleFragment />
          <ButtonFragment />
        </div>
      )}
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-transform duration-300 ease-snap hover:-translate-y-0.5 md:bottom-6 md:right-6 md:px-5 md:py-3"
      >
        ▶ Try the prototype
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

/* ---------- step data (kept from your old Process) ---------- */

type Step = {
  number: string;
  title: string;
  description: string;
  ask: string;
  outputs: string[];
  caption: string;
  art: (compact?: boolean) => ReactNode;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Understand",
    description: "Understand users, business goals and context before touching visual design.",
    ask: "What is quietly losing users today?",
    outputs: ["UX audit", "Friction mapping", "Problem framing"],
    caption: "What founders actually said",
    art: (c) => <NotesArt compact={c} />,
  },
  {
    number: "02",
    title: "Structure",
    description: "Map flows, information architecture and interactions before visual execution.",
    ask: "What should the user do next, at every step?",
    outputs: ["User flows", "IA mapping", "Lo-fi wireframes"],
    caption: "The invoice flow, including the unhappy path",
    art: (c) => <FlowArt compact={c} />,
  },
  {
    number: "03",
    title: "Design",
    description: "Turn wireframes into responsive systems, design tokens and dev-ready UI.",
    ask: "What can engineers build without guessing?",
    outputs: ["Design systems", "Component variants", "Hi-fi UI"],
    caption: "Structure first, pixels second",
    art: () => <WireframeArt />,
  },
  {
    number: "04",
    title: "Iterate",
    description: "Prototype, test with real users and refine based on feedback and engineering handoff.",
    ask: "What did we get wrong in version one?",
    outputs: ["Interactive prototypes", "Usability rounds", "Dev specs"],
    caption: "Tested, refined, handed off",
    art: (c) => <FinalArt compact={c} />,
  },
];

/* ---------- shared bits ---------- */

function StepText({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-5">
      <span className="font-display text-6xl leading-none text-accent">{step.number}</span>
      <h3 className="font-display text-4xl leading-none">{step.title}</h3>
      <p className="font-display text-2xl italic leading-snug text-accent">“{step.ask}”</p>
      <p className="max-w-sm leading-relaxed text-muted">{step.description}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Outputs">
        {step.outputs.map((o) => (
          <li key={o} className="rounded-full border border-hairline-strong px-3 py-1 text-xs text-muted">
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
  return (
    <header className="pb-10 pt-24 md:pb-14 md:pt-32">
      <p className="label-caps">How I work · one artboard, four moves</p>
      <h2 className="display-l mt-6 max-w-4xl">
        How a mess becomes <em className="emph">clear.</em>
      </h2>
    </header>
  );
}

/* ---------- desktop: pinned ---------- */

function PinnedProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  // Clicking a tab scrolls to that step
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.5) / steps.length), behavior: "smooth" });
  };

  const step = steps[active];

  return (
    <div ref={ref} className="relative h-[400vh]">
      <div className="sticky top-[88px] flex h-[calc(100vh-88px)] flex-col justify-center gap-8 pb-8">
        {/* Tabs + progress */}
        <div>
          <div role="tablist" aria-label="Process steps" className="flex gap-10">
            {steps.map((s, i) => (
              <button
                key={s.number}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => goTo(i)}
                className={`text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  i === active ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {s.number} {s.title}
              </button>
            ))}
          </div>
          <div className="mt-3 h-px w-full bg-hairline">
            <motion.div style={{ width: lineWidth }} className="h-px bg-accent" />
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[0.75fr_1.25fr] items-center gap-12 lg:gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <StepText step={step} />
            </motion.div>
          </AnimatePresence>

          <figure className="flex h-full max-h-[620px] min-h-0 flex-col gap-3">
            <div className="relative min-h-0 flex-1 overflow-hidden border border-hairline-strong bg-paper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-0"
                >
                  {step.art()}
                </motion.div>
              </AnimatePresence>
            </div>
            <figcaption className="label-caps flex justify-between">
              <span>Parity · {step.caption}</span>
              <span>
                Step {active + 1} of {steps.length}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

/* ---------- mobile: swipe carousel ---------- */

function CarouselProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="pb-20">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Process steps — swipe"
      >
        {steps.map((s) => (
          <article key={s.number} className="flex w-full shrink-0 snap-center flex-col gap-6 px-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-hairline-strong bg-paper">
              {s.art(true)}
            </div>
            <StepText step={s} />
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s.number}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to step ${i + 1}: ${s.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-accent" : "w-2 bg-hairline-strong"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- reduced motion: static ---------- */

function StaticProcess() {
  return (
    <div className="grid gap-16 pb-24">
      {steps.map((s) => (
        <div key={s.number} className="grid grid-cols-[0.75fr_1.25fr] items-center gap-12">
          <StepText step={s} />
          <div className="relative aspect-[16/11] overflow-hidden border border-hairline-strong bg-paper">
            {s.art()}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- section ---------- */

export default function Process() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="relative border-t border-hairline bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <Header />
        <div className="hidden md:block">{reduced ? <StaticProcess /> : <PinnedProcess />}</div>
        <div className="md:hidden">
          <CarouselProcess />
        </div>
      </div>
    </section>
  );
}
