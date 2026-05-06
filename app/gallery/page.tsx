import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { getGallery } from "@/lib/sanity";
import type { GalleryImage } from "@/lib/types";

const fallbackImages: GalleryImage[] = [
  { _id: "fallback-one", caption: "Add image captions in Sanity.", category: "studio" },
  { _id: "fallback-two", caption: "Sort by category: shows, studio, flyers, behind the scenes.", category: "shows" }
];

export default async function GalleryPage() {
  const images = ((await getGallery()) as GalleryImage[] | null) || fallbackImages;

  return (
    <main>
      <Section title="Gallery">
        <div className="grid gap-5 sm:grid-cols-2">
          {images.map((item) => (
            <figure key={item._id} className="m-0">
              <SimpleImage image={item.image} alt={item.caption || "Whalefall gallery image"} />
              <figcaption className="mt-2 text-sm">
                {item.caption ? <span>{item.caption}</span> : null}
                {item.category ? <span className="text-faded"> ({item.category})</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </main>
  );
}
