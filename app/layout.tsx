import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SignatureCursor from "./components/SignatureCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

/* Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://yourdomain.com).
   Needed so OpenGraph images resolve to absolute URLs. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title =
  "Ruthvik P Thimmoji | UI/UX Designer | SaaS & Mobile Apps";

const description =
  "UI/UX designer helping startups and SaaS teams design clean, conversion-focused digital products.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Ruthvik",
  },
  description,
  icons: {
    icon: "/ruthvikP.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Ruthvik P Thimmoji",
    title,
    description,
    url: "/",
    images: [
      {
        url: "/og.png", // add a 1200x630 image to /public
        width: 1200,
        height: 630,
        alt: "Ruthvik P Thimmoji — UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable}`}
    >
      <body className="relative overflow-x-hidden bg-paper font-sans text-ink">
        <SignatureCursor />

        {children}

        <Analytics />
      </body>
    </html>
  );
}
