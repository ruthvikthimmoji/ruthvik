import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  clean,
  getCaseStudy,
  getNextCaseStudy,
  getPublishedCaseStudies,
} from "@/app/data/case-studies";
import CaseStudyClient from "./[slug]/CaseStudyClient";


type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project?.published) return { title: "Case study not found" };

  const description = clean(project.context) ?? project.tagline;

  return {
    title: `${project.title} — Case Study`,
    description,
    openGraph: {
      type: "article",
      title: `${project.title} — Case Study`,
      description,
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description,
      images: [project.image],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project || !project.published) notFound();

  const nextStudy = getNextCaseStudy(slug);
  const next = nextStudy
    ? {
        slug: nextStudy.slug,
        title: nextStudy.title,
        tagline: nextStudy.tagline,
        image: nextStudy.image,
      }
    : undefined;

  return <CaseStudyClient project={project} next={next} />;
}
