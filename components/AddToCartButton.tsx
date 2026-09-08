"use client";
import { useCart } from "@/lib/cart-context";

const SIZES = {
  sm: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3 font-medium",
};

export default function AddToCartButton({
  kind,
  slug,
  size = "sm",
}: {
  kind: "test" | "package";
  slug: string;
  size?: "sm" | "lg";
}) {
  const { add, lines } = useCart();
  const line = lines.find((l) => l.kind === kind && l.slug === slug);
  const sizeClasses = SIZES[size];

  if (line) {
    return (
      <button
        onClick={() => add(kind, slug)}
        title="Already in your cart - click to add another"
        className={`${sizeClasses} rounded-md transition flex items-center gap-1.5 bg-brand-light text-brand-dark border border-brand hover:bg-white`}
      >
        <span aria-hidden>✓</span> In Cart{line.qty > 1 ? ` (${line.qty})` : ""}
      </button>
    );
  }

  return (
    <button
      onClick={() => add(kind, slug)}
      className={`${sizeClasses} rounded-md transition bg-brand text-white hover:bg-brand-dark`}
    >
      Add to cart
    </button>
  );
}
