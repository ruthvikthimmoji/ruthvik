"use client";

import { motion } from "framer-motion";

const pageTurn = {
  hidden: {
    opacity: 0,
    x: -40,
    rotateY: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function AboutClient() {
  return (
    <main
      className="
        min-h-screen
        bg-[#f6f4ef]
        text-[#111]
        px-6 py-32
        font-serif
      "
    >
      {/* Paper grain texture */}
      <div
        aria-hidden
        className="
    pointer-events-none
    absolute inset-0
    z-0
    opacity-[0.06]
    mix-blend-multiply
    bg-[url('/textures/paper-grain.png')]
    bg-repeat
    bg-[length:300px_300px]
  "
      />
      <article className="max-w-3xl mx-auto">
        {/* ───── COVER */}
        <motion.section
          variants={pageTurn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="
    mb-32
    relative
    bg-[#f6f4ef]
    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    p-8 md:p-12
  "
        >
          <p className="uppercase tracking-[0.4em] text-sm text-neutral-500">
            About
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
            Designing with
            <br /> clarity & intent
          </h1>

          <p className="mt-8 text-lg text-neutral-700 max-w-xl mx-auto">
            A short story about how I think, design, and work with people.
          </p>
        </motion.section>

        <hr className="border-neutral-300 mb-24" />

        {/* ───── CHAPTER 01 */}
        <motion.section
          variants={pageTurn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="
    mb-32
    relative
    bg-[#f6f4ef]
    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    p-8 md:p-12
  "
        >
          <p className="uppercase tracking-widest text-sm text-neutral-500 mb-4">
            Chapter 01
          </p>

          <h2 className="text-3xl font-bold mb-8">Who I Am</h2>

          <p className="text-lg leading-[1.9] text-justify">
            <span className="float-left text-6xl font-bold mr-3 mt-2">I</span>
            am a UI/UX designer focused on building interfaces that feel simple,
            intentional, and human. I enjoy solving messy problems and turning
            them into clear systems people enjoy using.
          </p>
        </motion.section>

        <hr className="border-neutral-300 mb-24" />

        {/* ───── CHAPTER 02 */}
        <motion.section
          variants={pageTurn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="
    mb-32
    relative
    bg-[#f6f4ef]
    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    p-8 md:p-12
  "
        >
          <p className="uppercase tracking-widest text-sm text-neutral-500 mb-4">
            Chapter 02
          </p>

          <h2 className="text-3xl font-bold mb-8">How I Work</h2>

          <p className="text-lg leading-[1.9] text-justify">
            My process starts with understanding users deeply — not assumptions,
            not trends. I collaborate closely with founders and teams, focusing
            on clarity, usability, and outcomes.
          </p>
        </motion.section>

        <hr className="border-neutral-300 mb-24" />

        {/* ───── CHAPTER 03 */}
        <motion.section
          variants={pageTurn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="
    mb-32
    relative
    bg-[#f6f4ef]
    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    p-8 md:p-12
  "
        >
          <p className="uppercase tracking-widest text-sm text-neutral-500 mb-4">
            Chapter 03
          </p>

          <h2 className="text-3xl font-bold mb-8">What I Believe</h2>

          <blockquote className="border-l-4 border-[#f95738] pl-6 italic text-xl leading-relaxed">
            Good design is quiet.
            <br />
            It helps without asking for attention.
          </blockquote>
        </motion.section>

        <hr className="border-neutral-300 mb-24" />

        {/* ───── FINAL PAGE */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-lg mb-6">
            If this resonates, we might work well together.
          </p>

          <a
            href="#contact"
            className="
              inline-block px-8 py-4
              bg-[#f95738]
              text-black
              font-medium
              rounded-xl
              transition hover:scale-105
            "
          >
            Get in Touch →
          </a>
        </motion.footer>
      </article>
    </main>
  );
}
