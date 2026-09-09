"use client";
import { useCart } from "@/lib/cart-context";

const SIZES = {
  sm: { addBtn: "text-sm px-3 py-2", stepperBtn: "w-8 h-8", stepperText: "text-sm", icon: "w-3.5 h-3.5" },
  lg: { addBtn: "text-base px-5 py-3 font-medium", stepperBtn: "w-10 h-10", stepperText: "text-base", icon: "w-4 h-4" },
};

const PlusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const MinusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14" />
  </svg>
);

export default function AddToCartButton({
  kind,
  slug,
  size = "sm",
}: {
  kind: "test" | "package";
  slug: string;
  size?: "sm" | "lg";
}) {
  const { add, decrement, lines } = useCart();
  const line = lines.find((l) => l.kind === kind && l.slug === slug);
  const s = SIZES[size];

  if (line) {
    return (
      <div className={`inline-flex items-center rounded-md border border-brand bg-brand-light overflow-hidden shrink-0 ${s.stepperText}`}>
        <button
          onClick={() => decrement(kind, slug)}
          aria-label="Decrease quantity"
          className={`${s.stepperBtn} flex items-center justify-center text-brand-dark hover:bg-white transition`}
        >
          <MinusIcon className={s.icon} />
        </button>
        <span className="min-w-[1.5rem] text-center font-semibold text-brand-dark tabular-nums">{line.qty}</span>
        <button
          onClick={() => add(kind, slug)}
          aria-label="Increase quantity"
          className={`${s.stepperBtn} flex items-center justify-center text-brand-dark hover:bg-white transition`}
        >
          <PlusIcon className={s.icon} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => add(kind, slug)}
      className={`${s.addBtn} rounded-md transition bg-brand text-white hover:bg-brand-dark inline-flex items-center gap-1 shrink-0`}
    >
      <PlusIcon className={s.icon} />
      Add
    </button>
  );
}
