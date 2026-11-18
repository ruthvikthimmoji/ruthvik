import type { MetadataRoute } from "next";
import { getPublishedCaseStudies } from "@/app/data/case-studies";
import { publishedPosts } from "@/app/data/writing";

/* /sitemap.xml — tells search engines which pages exist. Updates itself
   whenever you publish a case study. */

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/lab`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/shop`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...publishedPosts()
      .filter((p) => p.body && !p.href)
      .map((p) => ({ url: `${SITE}/writing/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...getPublishedCaseStudies().map((c) => ({
      url: `${SITE}/case-studies/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
