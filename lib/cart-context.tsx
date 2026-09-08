"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { CartLine } from "./types";

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
