import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostBody from "../../components/PostBody";
import {
  posts,
  getPost,
  readingMinutes,
  formatDate,
} from "../../data/writing";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/writing/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.date,
      tags: post.tags,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />

      <main
        className="px-6 pb-24 pt-32 md:px-10 md:pt-44"
        style={{ backgroundColor: paper, color: ink }}
      >
        <article className="mx-auto max-w-3xl">
          <Link
            href="/writing"
            className="group mb-12 flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: muted }}
          >
            <ArrowLeft
              size={13}
              strokeWidth={1.4}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All writing
          </Link>

          <header
            className="border-b pb-10"
            style={{ borderColor: hairline }}
          >
            <div
              className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: muted }}
            >
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="mx-2">·</span>
              {readingMinutes(post)} min read
            </div>

            <h1 className="font-serif text-4xl leading-[1] tracking-[-0.04em] md:text-6xl">
              {post.title}
            </h1>

            <p
              className="mt-6 text-lg leading-relaxed md:text-xl"
              style={{ color: muted }}
            >
              {post.summary}
            </p>
          </header>

          <div className="pt-6">
            <PostBody blocks={post.body} />
          </div>

          <div
            className="mt-16 border-t pt-8"
            style={{ borderColor: hairline }}
          >
            <Link
              href="/#contact"
              className="font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[#C86B3C]"
              style={{ color: muted }}
            >
              Want to talk about this? Get in touch →
            </Link>
          </div>
        </article>
      </main>


    </>
  );
}