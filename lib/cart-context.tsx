"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { CartLine } from "./types";
import { allTests, allPackages } from "./catalog";

type CartContextType = {
  lines: CartLine[];
  add: (kind: "test" | "package", slug: string) => void;
  remove: (kind: "test" | "package", slug: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "diagnostics-cart-v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  function add(kind: "test" | "package", slug: string) {
    setLines((prev) => {
      const existing = prev.find((l) => l.kind === kind && l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.kind === kind && l.slug === slug ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { kind, slug, qty: 1 }];
    });
  }

  function remove(kind: "test" | "package", slug: string) {
    setLines((prev) => prev.filter((l) => !(l.kind === kind && l.slug === slug)));
  }

  function clear() {
    setLines([]);
  }

  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  return <CartContext.Provider value={{ lines, add, remove, clear, count }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export type CartSummaryItem = {
  kind: "test" | "package";
  slug: string;
  name: string;
  qty: number;
  price: number;
  mrp: number;
};

// Resolves cart lines (kind+slug+qty) against the catalog, used anywhere the
// cart's contents need to be displayed (drawer, search modal footer, cart page).
export function useCartSummary() {
  const { lines, remove, clear } = useCart();

  const items: CartSummaryItem[] = lines
    .map((l) => {
      const source = l.kind === "test" ? allTests : allPackages;
      const found = source.find((x) => x.slug === l.slug);
      if (!found) return null;
      const mrp = found.mrp ?? found.price;
      return { kind: l.kind, slug: l.slug, name: found.name, qty: l.qty, price: found.price, mrp };
    })
    .filter(Boolean) as CartSummaryItem[];

  const subtotalMrp = items.reduce((s, i) => s + i.mrp * i.qty, 0);
  const subtotalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, subtotalMrp, subtotalPrice, count, remove, clear };
}
