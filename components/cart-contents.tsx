"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartKey, useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/format";

export function CartContents() {
  const { items, hydrated, subtotal, updateQuantity, removeItem } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            variantLabel: item.variantLabel,
            quantity: item.quantity
          }))
        })
      });
      const data = await response.json();
      if (!response.ok || !data.url) {
        setError(data.error || "Checkout did not go through. Try again.");
        setBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout did not go through. Try again.");
      setBusy(false);
    }
  }

  if (!hydrated) {
    return <p className="cart-note">loading cart…</p>;
  }

  if (items.length === 0) {
    return (
      <p>
        your cart is empty. <Link href="/merch">back to the store</Link>
      </p>
    );
  }

  return (
    <div>
      <table className="cart-table">
        <thead>
          <tr>
            <th aria-hidden="true"></th>
            <th>Item</th>
            <th className="cart-col-unit">Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th aria-hidden="true"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const key = cartKey(item);
            return (
              <tr key={key}>
                <td>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      width={48}
                      height={48}
                      className="cart-thumb"
                    />
                  ) : (
                    <div className="cart-thumb" aria-hidden="true" />
                  )}
                </td>
                <td>
                  {item.slug ? (
                    <Link href={`/merch/${item.slug}`}>{item.title}</Link>
                  ) : (
                    item.title
                  )}
                  {item.variantLabel ? (
                    <span className="cart-variant">{item.variantLabel}</span>
                  ) : null}
                </td>
                <td className="cart-col-unit">{formatPrice(item.unitPrice)}</td>
                <td>
                  <div className="cart-qty">
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(key, item.quantity - 1)}
                      aria-label={`One fewer ${item.title}`}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(key, item.quantity + 1)}
                      aria-label={`One more ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{formatPrice(item.unitPrice * item.quantity)}</td>
                <td>
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => removeItem(key)}
                  >
                    remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="cart-summary">
        <div className="cart-subtotal">Subtotal: {formatPrice(subtotal)}</div>
        <p className="cart-note">shipping is added at checkout.</p>
        {error ? <p className="cart-error">{error}</p> : null}
        <button type="button" className="btn" onClick={handleCheckout} disabled={busy}>
          {busy ? "taking you to checkout…" : "Checkout"}
        </button>
      </div>
    </div>
  );
}
