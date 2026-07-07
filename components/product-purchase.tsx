"use client";

import Link from "next/link";
import { useState } from "react";
import { MAX_QUANTITY, useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductPurchase({
  product,
  cartImageUrl
}: {
  product: Product;
  cartImageUrl?: string;
}) {
  const { addItem } = useCart();
  const variants = product.variants || [];
  const hasVariants = variants.length > 0;
  const [variantLabel, setVariantLabel] = useState(
    () => variants.find((variant) => variant.inStock !== false)?.label ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const soldOut = hasVariants
    ? variants.every((variant) => variant.inStock === false)
    : product.inStock === false;

  if (soldOut) {
    return (
      <p>
        <span className="sold-out-badge">Sold Out</span>
      </p>
    );
  }

  const selected = variants.find((variant) => variant.label === variantLabel);
  const unitPrice =
    typeof selected?.priceOverride === "number" ? selected.priceOverride : product.price;
  const canAdd = !hasVariants || (selected && selected.inStock !== false);

  function handleAdd() {
    if (!canAdd) return;
    addItem(
      {
        productId: product._id,
        slug: product.slug,
        title: product.title,
        variantLabel: hasVariants ? variantLabel : undefined,
        unitPrice,
        image: cartImageUrl
      },
      quantity
    );
    setAdded(true);
  }

  return (
    <div>
      <div className="purchase-row">
        {hasVariants ? (
          <label className="purchase-field">
            Size / style
            <select
              className="variant-select"
              value={variantLabel}
              onChange={(event) => {
                setVariantLabel(event.target.value);
                setAdded(false);
              }}
            >
              {variants.map((variant) => (
                <option
                  key={variant.label}
                  value={variant.label}
                  disabled={variant.inStock === false}
                >
                  {variant.label}
                  {typeof variant.priceOverride === "number"
                    ? ` — ${formatPrice(variant.priceOverride)}`
                    : ""}
                  {variant.inStock === false ? " (sold out)" : ""}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="purchase-field">
          Qty
          <input
            className="qty-input"
            type="number"
            min={1}
            max={MAX_QUANTITY}
            value={quantity}
            onChange={(event) => {
              const next = Number(event.target.value);
              setQuantity(
                Number.isFinite(next) ? Math.max(1, Math.min(MAX_QUANTITY, Math.round(next))) : 1
              );
              setAdded(false);
            }}
          />
        </label>
        <button type="button" className="btn" onClick={handleAdd} disabled={!canAdd}>
          Add to cart
        </button>
      </div>
      {added ? (
        <p className="added-note">
          added to cart — <Link href="/merch/cart">view cart</Link>
        </p>
      ) : null}
    </div>
  );
}
