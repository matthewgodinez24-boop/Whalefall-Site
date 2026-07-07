import { CartLink } from "@/components/cart-link";
import { CartProvider } from "@/components/cart-context";

export default function MerchLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <div className="merch-bar">
        <CartLink />
      </div>
      {children}
    </CartProvider>
  );
}
