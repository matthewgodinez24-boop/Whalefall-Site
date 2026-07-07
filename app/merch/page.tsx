import Link from "next/link";
import { Section } from "@/components/section";
import { SimpleImage } from "@/components/simple-image";
import { formatPrice } from "@/lib/format";
import { getProducts } from "@/lib/sanity";
import type { ProductListItem } from "@/lib/types";

function isSoldOut(product: ProductListItem) {
  if (product.variants?.length) {
    return product.variants.every((variant) => variant.inStock === false);
  }
  return product.inStock === false;
}

export default async function MerchPage() {
  const products = (((await getProducts()) as ProductListItem[] | null) || []).filter(
    (product) => product.slug
  );

  return (
    <div className="main-layout">
      <main>
        <Section title="Merch">
          {products.length === 0 ? (
            <p>nothing in the store yet — check back soon.</p>
          ) : (
            <div className="albums-grid">
              {products.map((product) => (
                <article key={product._id} className="album-card">
                  <Link href={`/merch/${product.slug}`}>
                    <SimpleImage image={product.image} alt={product.title} />
                  </Link>
                  <div className="album-title">
                    <Link href={`/merch/${product.slug}`}>{product.title}</Link>
                  </div>
                  <div className="product-price">{formatPrice(product.price)}</div>
                  {product.category ? (
                    <div className="album-meta">{product.category}</div>
                  ) : null}
                  {isSoldOut(product) ? (
                    <div style={{ marginTop: 6 }}>
                      <span className="sold-out-badge">Sold Out</span>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}
