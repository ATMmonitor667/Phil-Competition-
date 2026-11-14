import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { Media } from "@/lib/content";

// With no approved photograph, show a quiet typographic frame rather than a stand-in image.
export function Portrait({ media, priority = false }: { media?: Media; priority?: boolean }) {
  return (
    <figure>
      <Reveal variant="mask" className="portrait__frame">
        {media ? (
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="(min-width: 900px) 40vw, 100vw"
            priority={priority}
          />
        ) : (
          <span className="portrait__monogram" aria-hidden="true">
            JI
          </span>
        )}
      </Reveal>
      {media ? (
        media.credit && <figcaption className="caption">{media.credit}</figcaption>
      ) : (
        <figcaption className="caption">Portrait forthcoming.</figcaption>
      )}
    </figure>
  );
}
