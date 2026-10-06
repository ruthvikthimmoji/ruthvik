import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/app/data/case-studies";
import CaseStudyClient from "../CaseStudyClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const findProject = (slug: string) =>
  caseStudies.find(
    (cs) => cs.slug.toLowerCase() === slug.toLowerCase()
  );

/* Pre-render every case study at build time. */
export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = project.overview;
  const url = `/case-study/${project.slug}`;

  return {
    title, // layout template adds "| Ruthvik"
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) notFound();

  return <CaseStudyClient project={project} />;
}
