import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/clear-cart-on-success";
import { Section } from "@/components/section";

export default function MerchSuccessPage() {
  return (
    <div className="main-layout">
      <main>
        <Section title="Order received">
          <ClearCartOnSuccess />
          <p>thanks — your order is in. check your email for a receipt.</p>
          <p>we pack and ship everything ourselves, so give it a few days.</p>
          <p>
            <Link href="/merch">← back to the store</Link>
          </p>
        </Section>
      </main>
    </div>
  );
}
