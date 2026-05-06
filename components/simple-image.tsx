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
    return <div className={`flex min-h-44 items-center justify-center border border-dashed border-line bg-white text-sm text-faded ${className}`}>image coming soon</div>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={900}
      height={650}
      className={`border border-line bg-white ${className}`}
      sizes="(max-width: 720px) 90vw, 640px"
    />
  );
}
