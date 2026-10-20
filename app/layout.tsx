import "./globals.css";
import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Fraunces,
  Geist_Mono,
  Inter,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import CommandPalette from "./components/CommandPalette";
import SignatureCursor from "./components/SignatureCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* Display font: variable weight, used for big kinetic headlines */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

/* Legacy: still used by sections that haven't been migrated yet.
   Remove once nothing uses `font-serif`. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

/* Absolute URL base for OpenGraph images.
   Priority: your own NEXT_PUBLIC_SITE_URL, then the Vercel production URL
   (set automatically on Vercel), then localhost for local dev. This is what
   fixes the localhost:3000 links in your social previews. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Ruthvik P Thimmoji | UI/UX Designer | SaaS & Mobile Apps";

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
  themeColor: "#0D0D0E",
};

/* Runs before first paint so there is no light-to-dark flash.
   Dark is the default; a saved choice in localStorage wins. */
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    document.documentElement.dataset.theme = t === "light" ? "light" : "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable} ${fraunces.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative overflow-x-hidden bg-paper font-sans text-ink">
        <SignatureCursor />
        <CommandPalette />

        {children}

        <Analytics />
      </body>
    </html>
  );
}
