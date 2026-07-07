import { NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/lib/sanity";

const MAX_QUANTITY = 10;
// Flat shipping charged once per order. Matthew sets the rate + regions here.
const SHIPPING_AMOUNT_CENTS = 500; // $5
const ALLOWED_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ["US"];

type CartItem = { productId: string; variantLabel?: string; quantity: number };

type CheckoutProduct = {
  _id: string;
  title: string;
  price?: number;
  inStock?: boolean;
  variants?: { label?: string; priceOverride?: number; inStock?: boolean }[];
  image?: string | null;
};

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Checkout is not set up yet. Try again later." },
      { status: 500 }
    );
  }
  const stripe = new Stripe(secretKey);

  let items: CartItem[];
  try {
    const body = (await req.json()) as { items?: CartItem[] };
    items = Array.isArray(body.items) ? body.items : [];
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  items = items.filter((item) => item && typeof item.productId === "string");
  if (items.length === 0) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }

  // One server-side lookup for all products in the cart — source of truth is
  // Sanity. Skip the CDN so just-edited prices and stock flags are respected.
  const ids = [...new Set(items.map((item) => item.productId))];
  const products = await client.withConfig({ useCdn: false }).fetch<CheckoutProduct[]>(
    `*[_type == "product" && _id in $ids]{
      _id, title, price, inStock,
      variants[]{ label, priceOverride, inStock },
      "image": images[0].asset->url
    }`,
    { ids }
  );
  const byId = new Map(products.map((product) => [product._id, product]));

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const product = byId.get(item.productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const quantity = Math.max(1, Math.min(MAX_QUANTITY, Number(item.quantity) || 1));
    let unitDollars = product.price;
    let name = product.title;

    if (item.variantLabel) {
      const variant = (product.variants || []).find(
        (candidate) => candidate.label === item.variantLabel
      );
      if (!variant || variant.inStock === false) {
        return NextResponse.json(
          { error: `Unavailable: ${product.title} (${item.variantLabel})` },
          { status: 409 }
        );
      }
      if (typeof variant.priceOverride === "number") unitDollars = variant.priceOverride;
      name = `${product.title} — ${item.variantLabel}`;
    } else if ((product.variants?.length ?? 0) > 0) {
      // A sized/styled product must be bought as a specific variant.
      return NextResponse.json(
        { error: `Pick a size or style for ${product.title}` },
        { status: 400 }
      );
    } else if (product.inStock === false) {
      return NextResponse.json({ error: `Sold out: ${product.title}` }, { status: 409 });
    }

    if (typeof unitDollars !== "number" || Number.isNaN(unitDollars)) {
      return NextResponse.json(
        { error: `Unavailable: ${product.title}` },
        { status: 409 }
      );
    }

    line_items.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(unitDollars * 100),
        product_data: { name, images: product.image ? [product.image] : [] }
      }
    });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (!origin) {
    return NextResponse.json(
      { error: "Checkout is not set up yet. Try again later." },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: SHIPPING_AMOUNT_CENTS, currency: "usd" },
            display_name: "Standard shipping"
          }
        }
      ],
      success_url: `${origin}/merch/success`,
      cancel_url: `${origin}/merch/cancel`
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session failed:", error);
    return NextResponse.json(
      { error: "Checkout did not go through. Try again." },
      { status: 500 }
    );
  }
}
