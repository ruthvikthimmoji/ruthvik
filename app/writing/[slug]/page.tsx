import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fmtDate, getPost, publishedPosts, readMins } from "@/app/data/writing";
import Markdown from "../../components/Markdown";
import "../../components/canvas/canvas.css";
import "../../work/work.css";
import "../writing.css";
import Logo from "../../components/canvas/Logo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedPosts()
    .filter((p) => p.body && !p.href)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} — Ruthvik Thimmoji`, description: post.dek };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post || !post.body) notFound();

  const others = publishedPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="cv is-ready">
      <main className="wk">
        <header className="cv-panel wk-top">
          <Link href="/writing" className="wk-back">
            <Logo />
            <span>
              ← All writing
              <small>Ruthvik — Portfolio</small>
            </span>
          </Link>
          <Link href="/" className="lab-toplink">
            Canvas →
          </Link>
        </header>

        <article className="wr-post">
          <div className="wr-post-meta">
            <span>{fmtDate(post.date)}</span>
            <span>{readMins(post.body)} min read</span>
            {post.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <h1>{post.title}</h1>
          <p className="wr-post-dek">{post.dek}</p>
          <div className="wr-prose">
            <Markdown source={post.body} />
          </div>
        </article>

        <footer className="wr-post-end">
          <div className="wr-sign">
            <span className="cv-hand">— Ruthvik</span>
            <p>Product designer in Bengaluru. If this was useful, I’d love to hear from you.</p>
            <div className="cv-btns" style={{ marginTop: 16 }}>
              <Link href="/#contact" className="cv-btn dark">
                Say hello
              </Link>
              <Link href="/work" className="cv-btn line">
                See my work
              </Link>
            </div>
          </div>
          {others.length > 0 && (
            <div className="wr-more">
              <p className="cv-lbl">Read next</p>
              {others.map((o) => (
                <Link key={o.slug} href={o.href ?? `/writing/${o.slug}`} {...(o.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <b>{o.title}</b>
                  <span>{o.dek}</span>
                </Link>
              ))}
            </div>
          )}
        </footer>
      </main>
    </div>
  );
}
