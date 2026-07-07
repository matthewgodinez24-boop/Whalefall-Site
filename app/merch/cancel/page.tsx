import Link from "next/link";
import { Section } from "@/components/section";

export default function MerchCancelPage() {
  return (
    <div className="main-layout">
      <main>
        <Section title="Checkout canceled">
          <p>no charge went through. your cart is still saved.</p>
          <p>
            <Link href="/merch/cart">back to your cart</Link> ·{" "}
            <Link href="/merch">keep browsing</Link>
          </p>
        </Section>
      </main>
    </div>
  );
}
