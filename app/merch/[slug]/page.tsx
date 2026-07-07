import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/product-purchase";
import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, urlForImage } from "@/lib/sanity";
import type { Product } from "@/lib/types";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getProductBySlug(slug)) as Product | null;

  if (!product) notFound();

  const cartImageUrl =
    urlForImage(product.images?.[0])?.width(200).height(200).fit("crop").url() ||
    undefined;

  return (
    <div className="main-layout">
      <main>
        <p style={{ marginBottom: 8 }}>
          <Link href="/merch" className="btn">
            ← Back to Merch
          </Link>
        </p>
        <Section title={product.title}>
          <div className="merch-detail">
            <div className="product-photos">
              {product.images?.length ? (
                product.images.map((image, index) => (
                  <SimpleImage
                    key={`${product._id}-${index}`}
                    image={image}
                    alt={image.alt || product.title}
                  />
                ))
              ) : (
                <SimpleImage alt={product.title} />
              )}
            </div>
            <div className="product-details">
              <p className="product-price">{formatPrice(product.price)}</p>
              {product.category ? (
                <p className="album-meta">{product.category}</p>
              ) : null}
              {product.description ? (
                <p style={{ whiteSpace: "pre-line" }}>{product.description}</p>
              ) : null}
              <ProductPurchase product={product} cartImageUrl={cartImageUrl} />
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
