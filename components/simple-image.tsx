import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import type { SanityImage } from "@/lib/types";

export function SimpleImage({
  image,
  alt,
  className = ""
}: {
  image?: SanityImage;
  alt: string;
  className?: string;
}) {
  const src = urlForImage(image)?.width(900).height(650).fit("max").url();

  if (!src) {
    return (
      <div className={`image-placeholder ${className}`}>image coming soon</div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={900}
      height={650}
      className={className}
      style={{ border: "1px solid #999", display: "block", maxWidth: "100%", height: "auto" }}
      sizes="(max-width: 720px) 90vw, 640px"
    />
  );
}
