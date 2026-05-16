import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { getGallery } from "@/lib/sanity";
import type { GalleryImage } from "@/lib/types";

const fallbackImages: GalleryImage[] = [
  { _id: "fallback-one", caption: "Add image captions in Sanity.", category: "studio" },
  {
    _id: "fallback-two",
    caption: "Sort by category: shows, studio, flyers, behind the scenes.",
    category: "shows"
  }
];

export default async function GalleryPage() {
  const images = ((await getGallery()) as GalleryImage[] | null) || fallbackImages;

  return (
    <div className="main-layout">
      <main>
        <Section title="Gallery">
          <div className="gallery-grid">
            {images.map((item) => (
              <figure key={item._id} className="gallery-item" style={{ margin: 0 }}>
                <SimpleImage
                  image={item.image}
                  alt={item.caption || "Whalefall gallery image"}
                />
                <figcaption className="item-info">
                  {item.caption ? (
                    <p className="item-title">{item.caption}</p>
                  ) : null}
                  {item.category ? (
                    <p className="item-description">({item.category})</p>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
