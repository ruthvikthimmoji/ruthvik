import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WritingList, { type PostItem } from "../components/WritingList";
import {
  getPosts,
  readingMinutes,
  formatDate,
} from "../data/writing";

const ink = "#111111";
const paper = "#F7F6F2";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

const posts = getPosts();

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on product design, interfaces and the decisions behind them.",
  // Keep the page out of search results until there is something to read.
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

      <main
        className="min-h-svh px-6 pb-24 pt-32 md:px-10 md:pt-44 lg:px-12"
        style={{ backgroundColor: paper, color: ink }}
      >
        <div className="mx-auto max-w-[1440px]">
          <header
            className="grid gap-8 border-b pb-12 md:grid-cols-[1fr_2fr] md:pb-16"
            style={{ borderColor: hairline }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: muted }}
            >
              Writing
            </span>

            <div>
              <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-8xl">
                Notes on{" "}
                <span className="italic" style={{ color: accent }}>
                  design.
                </span>
              </h1>

              <p
                className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
                style={{ color: muted }}
              >
                Short pieces on interfaces, product decisions and what
                I&apos;m learning along the way.
              </p>
            </div>
          </header>

          <WritingList items={items} />
        </div>
      </main>
    </>
  );
}