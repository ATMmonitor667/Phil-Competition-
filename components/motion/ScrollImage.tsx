"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Media } from "@/lib/content";

// Single feature image: scale 1.03 → 1 by mid-travel, ±8px drift, never touches scroll position.
export function ScrollImage({ media, sizes, priority = false }: { media: Media; sizes: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.03, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <figure>
      <div ref={ref} className="media__frame" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
        <motion.div className="media__inner" style={reduce ? undefined : { scale, y }}>
          <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} />
        </motion.div>
      </div>
      {media.credit && <figcaption className="caption">{media.credit}</figcaption>}
    </figure>
  );
}
