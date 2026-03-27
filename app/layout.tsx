import "./globals.css";
import type { Metadata } from "next";
import { AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
import SignatureCursor from "./components/SignatureCursor";
import FloatingSocials from "./components/FloatingSocials";

export const metadata: Metadata = {
  title: "Ruthvik P Thimmoji | UI/UX Designer | SaaS & Mobile Apps",
  description:
    "UI/UX designer helping startups and SaaS teams design clean, conversion-focused digital products.",
  icons: {
    icon: "/ruthvikP.ico",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white font-sans relative overflow-x-hidden">
        {/* Cursor stays global */}
        <SignatureCursor />

        {/* Socials stay global and fixed */}
        <FloatingSocials />

        {/* Note: In Next.js App Router, AnimatePresence in layout 
           often requires a template.tsx or a specific keying strategy.
        */}
        <AnimatePresence mode="wait">
           {children}
        </AnimatePresence>
      </body>
    </html>
  );
}