import Image from "next/image";
import type { ReactNode } from "react";

/* Tiny markdown renderer for blog posts — no packages needed.
   Supports: ## / ### headings, paragraphs, - lists, 1. lists,
   > quotes, ![alt](src) images, **bold**, *italic*, `code`, [links](url). */

function inline(s: string, k = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    const key = `${k}-${i++}`;
    if (m[2]) out.push(<strong key={key}>{m[2]}</strong>);
    else if (m[3]) out.push(<em key={key}>{m[3]}</em>);
    else if (m[4]) out.push(<code key={key}>{m[4]}</code>);
    else if (m[5]) {
      const ext = /^https?:/.test(m[6]);
      out.push(
        <a key={key} href={m[6]} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {m[5]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

export default function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((raw, bi) => {
        const b = raw.trim();
        const lines = b.split("\n").map((l) => l.trim());
        if (b.startsWith("### ")) return <h3 key={bi}>{inline(b.slice(4), bi)}</h3>;
        if (b.startsWith("## ")) return <h2 key={bi}>{inline(b.slice(3), bi)}</h2>;
        if (lines.every((l) => l.startsWith("> ")))
          return <blockquote key={bi}>{inline(lines.map((l) => l.slice(2)).join(" "), bi)}</blockquote>;
        if (lines.every((l) => /^[-*] /.test(l)))
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.slice(2), bi * 100 + li)}</li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\d+\. /.test(l)))
          return (
            <ol key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\d+\. /, ""), bi * 100 + li)}</li>
              ))}
            </ol>
          );
        const img = b.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
        if (img)
          return (
            <figure key={bi}>
              <Image src={img[2]} alt={img[1]} width={1600} height={1000} sizes="(max-width: 760px) 100vw, 720px" style={{ width: "100%", height: "auto" }} />
              {img[1] && <figcaption>{img[1]}</figcaption>}
            </figure>
          );
        return <p key={bi}>{inline(lines.join(" "), bi)}</p>;
      })}
    </>
  );
}
