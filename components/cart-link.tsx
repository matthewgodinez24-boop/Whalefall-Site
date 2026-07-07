"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";

export function CartLink() {
  const { count, hydrated } = useCart();

  return (
    <Link href="/merch/cart" className="btn">
      Cart{hydrated ? ` (${count})` : ""}
    </Link>
  );
}
