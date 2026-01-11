import "./globals.css";
import type { Metadata } from "next";
import { AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
import SignatureCursor from "./components/SignatureCursor";

export const metadata: Metadata = {
  title: "Ruthvik P Thimmoji | UI/UX Designer | SaaS & Mobile Apps",
  description:
    "UI/UX designer helping startups and SaaS teams design clean, conversion-focused digital products.",
  icons: {
    icon: "/ruthvikP.ico", // <-- add this line
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
        {/* Signature cursor effect for entire site */}
        <SignatureCursor />

        {/* AnimatePresence ensures page transitions */}
        <AnimatePresence mode="wait" initial={false}>
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}
