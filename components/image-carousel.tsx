"use client";

import { useMemo, useState } from "react";
import { urlForImage } from "@/lib/sanity";
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
  const src = urlForImage(current.image)?.width(900).height(560).fit("crop").url();

  function move(amount: number) {
    setIndex((value) => (value + amount + items.length) % items.length);
  }

  return (
    <div className="carousel">
      <div className="carousel-image-container">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={current.caption || "Whalefall media photo"} />
        ) : (
          <div className="image-placeholder" style={{ width: "100%", height: "100%" }}>
            image coming soon
          </div>
        )}
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-nav-btn"
          onClick={() => move(-1)}
          aria-label="Previous image"
        >
          ‹
        </button>
        <p className="carousel-caption">
          {current.caption || `Photo ${index + 1} of ${items.length}`}
        </p>
        <button
          type="button"
          className="carousel-nav-btn"
          onClick={() => move(1)}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
}
