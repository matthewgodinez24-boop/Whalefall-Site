import Link from "next/link";
import { CartContents } from "@/components/cart-contents";
import { Section } from "@/components/section";

export default function CartPage() {
  return (
    <div className="main-layout">
      <main>
        <p style={{ marginBottom: 8 }}>
          <Link href="/merch" className="btn">
            ← Back to Merch
          </Link>
        </p>
        <Section title="Cart">
          <CartContents />
        </Section>
      </main>
    </div>
  );
}
