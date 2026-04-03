"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "916361906550"; // Replace with your actual number
  const message = encodeURIComponent("Hi Ruthvik! I just saw your portfolio and wanted to connect");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      {/* Tooltip that appears on hover */}
      <span className="absolute right-16 bg-white text-zinc-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl border border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
       connect on WA
      </span>
      
      <MessageCircle size={28} fill="currentColor" />
    </motion.a>
  );
}