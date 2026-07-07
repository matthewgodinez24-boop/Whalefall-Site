"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-context";

export function ClearCartOnSuccess() {
  const { hydrated, clearCart } = useCart();

  useEffect(() => {
    // Wait for the provider to load the stored cart first, otherwise the
    // clear runs before hydration and the old cart gets reloaded over it.
    if (hydrated) clearCart();
  }, [hydrated, clearCart]);

  return null;
}
