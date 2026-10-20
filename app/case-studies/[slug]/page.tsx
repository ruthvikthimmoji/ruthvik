import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/app/data/case-studies";
import CaseStudyClient from "./CaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const study = getCaseStudy(slug);

  if (!study || !study.published) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${study.title} — Case Study`,
    description: study.headline || study.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const study = getCaseStudy(slug);

  if (!study || !study.published) {
    notFound();
  }

  return <CaseStudyClient project={study} />;
}