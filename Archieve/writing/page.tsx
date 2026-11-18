import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import WritingList, { type PostItem } from "../components/WritingList";
import {
  getPosts,
  readingMinutes,
  formatDate,
} from "../data/writing";

const posts = getPosts();

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on product design, interfaces and the decisions behind them.",
  robots: posts.length === 0 ? { index: false, follow: false } : undefined,
};

export default function WritingPage() {
  const items: PostItem[] = posts.map((post) => ({
    ...post,
    dateLabel: formatDate(post.date),
    minutes: readingMinutes(post),
  }));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-paper text-ink transition-colors duration-300 px-6 pb-28 pt-32 md:px-10 md:pt-40 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          {/* Aligned Header */}
          <header className="border-b border-hairline pb-10 md:pb-14">
            <span className="frame-label">Writing &amp; Thinking</span>

            <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              Notes on <span className="italic text-accent">design.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Short pieces on interfaces, product decisions, and what I&apos;m learning along the way.
            </p>
          </header>

          {/* Clean Writing List */}
          <div className="pt-8">
            <WritingList items={items} />
          </div>
        </div>
      </main>
    </>
  );
}