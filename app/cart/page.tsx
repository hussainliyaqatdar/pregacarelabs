"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { allTests, allPackages } from "@/lib/catalog";
import PriceTag from "@/components/PriceTag";

export default function CartPage() {
  const { lines, remove, clear } = useCart();

  const items = lines
    .map((l) => {
      const source = l.kind === "test" ? allTests : allPackages;
      const found = source.find((x) => x.slug === l.slug);
      if (!found) return null;
      const mrp = found.mrp ?? found.price;
      return { ...found, kind: l.kind, qty: l.qty, mrp };
    })
    .filter(Boolean) as { kind: "test" | "package"; slug: string; name: string; qty: number; price: number; mrp: number }[];

  const subtotalMrp = items.reduce((s, i) => s + i.mrp * i.qty, 0);
  const subtotalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link href="/search" className="text-brand font-medium hover:underline">Browse tests and packages →</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Your cart</h1>
      <div className="flex flex-col gap-3">
        {items.map((i) => (
          <div key={`${i.kind}-${i.slug}`} className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wide text-gray-400">{i.kind}</span>
              <Link href={i.kind === "test" ? `/tests/${i.slug}` : `/packages/${i.slug}`} className="block font-semibold text-gray-900 hover:text-brand">
                {i.name}
              </Link>
              <p className="text-xs text-gray-500">Qty: {i.qty}</p>
            </div>
            <div className="flex items-center gap-4">
              <PriceTag mrp={i.mrp * i.qty} price={i.price * i.qty} size="sm" />
              <button
                onClick={() => remove(i.kind, i.slug)}
                aria-label={`Remove ${i.name} from cart`}
                title="Remove"
                className="text-gray-400 hover:text-red-500 transition p-1"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-light rounded-lg p-4 flex flex-col gap-1">
        <div className="flex justify-between text-sm text-gray-600">
          <span>MRP total</span>
          <span className="line-through">Rs. {subtotalMrp.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between font-bold text-brand-dark text-lg">
          <span>You pay</span>
          <span>Rs. {subtotalPrice.toLocaleString("en-IN")}</span>
        </div>
        {subtotalMrp > subtotalPrice && (
          <div className="flex justify-between text-sm text-brand-accent font-medium">
            <span>Total savings</span>
            <span>Rs. {(subtotalMrp - subtotalPrice).toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button onClick={clear} className="text-sm text-gray-500 hover:underline">Clear cart</button>
        <Link href="/checkout" className="bg-brand text-white px-6 py-3 rounded-md font-medium hover:bg-brand-dark transition">
          Proceed to book collection →
        </Link>
      </div>
    </div>
  );
}
