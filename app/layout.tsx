import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

/* Body + labels */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

/* Headlines (normal + italic for the orange emphasis words) */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

/* Handwriting for sticky notes on the canvas */
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
});

/* Kept for any old component that still uses font-mono */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

/* Absolute URL base for OpenGraph images. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Ruthvik P Thimmoji — Product Designer";

const description =
  "Product designer for SaaS, fintech and admin tools. I turn complex products into obvious ones.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Ruthvik",
  },
  description,
  icons: {
    icon: "icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Ruthvik P Thimmoji",
    title,
    description,
    url: "/",
    // preview image comes from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image", // uses app/opengraph-image.tsx
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FCF5E3",
};

/* Runs before first paint so there is no flash.
   Light (cream) is the default; a saved "dark" choice wins. */
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    document.documentElement.dataset.theme = t === "dark" ? "dark" : "light";
  } catch (e) {
    document.documentElement.dataset.theme = "light";
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
      data-theme="light"
      suppressHydrationWarning
      className={`${geist.variable} ${instrumentSerif.variable} ${caveat.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative overflow-x-clip bg-paper font-sans text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
