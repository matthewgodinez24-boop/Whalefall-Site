"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export type CartItem = {
  productId: string;
  slug?: string;
  title: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
  image?: string;
};

export const MAX_QUANTITY = 10;

const STORAGE_KEY = "whalefall-cart-v1";

export function cartKey(item: Pick<CartItem, "productId" | "variantLabel">) {
  return `${item.productId}::${item.variantLabel ?? ""}`;
}

function clampQuantity(quantity: number) {
  const rounded = Math.round(Number(quantity));
  if (!Number.isFinite(rounded) || rounded < 1) return 1;
  return Math.min(MAX_QUANTITY, rounded);
}

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is CartItem =>
          Boolean(item) &&
          typeof item.productId === "string" &&
          typeof item.title === "string" &&
          typeof item.unitPrice === "number"
      )
      .map((item) => ({ ...item, quantity: clampQuantity(item.quantity) }));
  } catch {
    return [];
  }
}

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or blocked; the cart still works for this visit
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const key = cartKey(item);
        const existing = prev.find((line) => cartKey(line) === key);
        if (existing) {
          return prev.map((line) =>
            cartKey(line) === key
              ? { ...line, ...item, quantity: clampQuantity(line.quantity + quantity) }
              : line
          );
        }
        return [...prev, { ...item, quantity: clampQuantity(quantity) }];
      });
    },
    []
  );

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      prev.map((line) =>
        cartKey(line) === key ? { ...line, quantity: clampQuantity(quantity) } : line
      )
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((line) => cartKey(line) !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, line) => total + line.quantity, 0);
    const subtotal = items.reduce(
      (total, line) => total + line.unitPrice * line.quantity,
      0
    );
    return { items, hydrated, count, subtotal, addItem, updateQuantity, removeItem, clearCart };
  }, [items, hydrated, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
