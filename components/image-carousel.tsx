"use client";

import { useMemo, useState } from "react";
import { SimpleImage } from "@/components/simple-image";
import type { GalleryImage } from "@/lib/types";

const fallbackImages: GalleryImage[] = [
  { _id: "one", caption: "practice room floor, cables everywhere", category: "studio" },
  { _id: "two", caption: "half-finished demo notes", category: "studio" },
  { _id: "three", caption: "late night media folder", category: "studio" }
];

export function ImageCarousel({ images }: { images?: GalleryImage[] }) {
  const items = useMemo(() => (images?.length ? images : fallbackImages), [images]);
  const [index, setIndex] = useState(0);
  const current = items[index];

  function move(amount: number) {
    setIndex((value) => (value + amount + items.length) % items.length);
  }

  return (
    <div className="mt-3">
      <SimpleImage image={current.image} alt={current.caption || "Whalefall media photo"} />
      <div className="mt-2 flex items-center justify-between gap-3 text-sm">
        <button className="border border-line bg-white px-2 py-1" type="button" onClick={() => move(-1)} aria-label="Previous image">
          ‹
        </button>
        <p className="m-0 text-center text-faded">{current.caption || `Photo ${index + 1} of ${items.length}`}</p>
        <button className="border border-line bg-white px-2 py-1" type="button" onClick={() => move(1)} aria-label="Next image">
          ›
        </button>
      </div>
    </div>
  );
}
