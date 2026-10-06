import Image from "next/image";
import type { Block } from "../data/writing";

const ink = "#111111";
const muted = "#6F6D68";
const hairline = "rgba(17, 17, 17, 0.14)";
const accent = "#C86B3C";

function Render({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-5 mt-14 font-serif text-3xl tracking-[-0.03em] md:text-4xl">
          {block.text}
        </h2>
      );

    case "quote":
      return (
        <blockquote
          className="my-10 border-l-2 pl-6 font-serif text-2xl italic leading-snug md:text-3xl"
          style={{ borderColor: accent, color: ink }}
        >
          {block.text}
        </blockquote>
      );

    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed md:text-lg"
              style={{ color: muted }}
            >
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className="my-10">
          <div
            className="overflow-hidden border"
            style={{ borderColor: hairline }}
          >
            <Image
              src={block.src}
              alt={block.alt}
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
          {block.caption && (
            <figcaption
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em]"
              style={{ color: muted }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return (
        <p
          className="my-6 text-base leading-[1.85] md:text-lg"
          style={{ color: muted }}
        >
          {block.text}
        </p>
      );
  }
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Render key={i} block={block} />
      ))}
    </>
  );
}