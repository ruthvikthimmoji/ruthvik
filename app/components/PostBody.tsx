import Image from "next/image";
import type { Block } from "../data/writing";

function Render({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-5 mt-14 font-display text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
          {block.text}
        </h2>
      );

    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-accent pl-6 font-serif text-2xl italic leading-snug text-ink md:text-3xl">
          {block.text}
        </blockquote>
      );

    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed text-ink/80 md:text-lg"
            >
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-xl border border-hairline bg-sunken">
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
            <figcaption className="frame-label mt-3">{block.caption}</figcaption>
          )}
        </figure>
      );

    default:
      // Long-form reading: slightly brighter than "muted" for comfort in dark mode
      return (
        <p className="my-6 text-base leading-[1.85] text-ink/80 md:text-lg">
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
