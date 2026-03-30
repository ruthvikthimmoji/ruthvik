"use client";

import { motion } from "framer-motion";
import { sendEmail } from "../actions/sendEmail";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await sendEmail(formData);
    setIsPending(false);
    if (result.success) setIsSuccess(true);
  }

  return (
    <main className="min-h-screen bg-[#fcfaf7] pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#ff4f21] mb-6 block">
            Contact
          </span>
          <h1 className="text-[#1a1a1a] text-5xl sm:text-7xl md:text-9xl font-medium tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 font-serif italic">
            Let’s build <br className="hidden sm:block" />
            something{" "}
            <span className="text-[#ff4f21] not-italic font-sans">
              obvious.
            </span>
          </h1>
        </header>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[40px] border border-zinc-200 text-center"
          >
            <CheckCircle2 className="mx-auto text-green-500 mb-6" size={48} />
            <h2 className="text-2xl font-medium mb-2 text-[#1a1a1a]">Message Sent!</h2>
            <p className="text-zinc-500">
              I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form
            action={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 ml-4">
                Full Name
              </label>
              <input
                name="senderName"
                required
                /* Added text-[#1a1a1a] */
                className="w-full bg-white border border-zinc-200 rounded-3xl px-6 py-4 outline-none focus:border-[#ff4f21] text-[#1a1a1a] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 ml-4">
                Email Address
              </label>
              <input
                name="senderEmail"
                type="email"
                required
                /* Added text-[#1a1a1a] */
                className="w-full bg-white border border-zinc-200 rounded-3xl px-6 py-4 outline-none focus:border-[#ff4f21] text-[#1a1a1a] transition-all"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 ml-4">
                Project Details
              </label>
              <textarea
                name="message"
                rows={5}
                required
                /* Added text-[#1a1a1a] */
                className="w-full bg-white border border-zinc-200 rounded-[32px] px-6 py-6 outline-none focus:border-[#ff4f21] text-[#1a1a1a] transition-all resize-none"
              />
            </div>
            <button
              disabled={isPending}
              className="md:col-span-2 group flex items-center justify-center gap-4 bg-[#1a1a1a] text-white py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#ff4f21] transition-all active:scale-95 disabled:opacity-50"
            >
              {isPending ? "Sending..." : "Send Inquiry"}
              <Send
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </form>
        )}
      </div>
    </main>
  );
}