"use client";
import { useState } from "react";
import { useCartSummary } from "@/lib/cart-context";

const rs = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;

const TagIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
  </svg>
);

export default function CouponField() {
  const { coupon, discount, couponShortfall, applyCoupon, removeCoupon } = useCartSummary();
  const [code, setCode] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || checking) return;
    setChecking(true);
    setError("");
    const result = await applyCoupon(code);
    setChecking(false);
    if (result.ok) setCode("");
    else setError(result.message);
  }

  // A coupon has been entered: show its state instead of the input.
  if (coupon) {
    const saving = discount > 0;
    return (
      <div
        className={`rounded-lg border px-3 py-2 flex items-center gap-2 text-sm ${
          saving ? "bg-green-50 border-green-200 text-green-900" : "bg-amber-50 border-amber-200 text-amber-950"
        }`}
      >
        <TagIcon />
        <div className="flex-1 min-w-0">
          <p className="font-semibold leading-snug">
            {coupon.code} {saving ? "applied" : "added"}
          </p>
          <p className="text-xs leading-snug opacity-80">
            {saving ? `You saved ${rs(discount)}` : `Add ${rs(couponShortfall)} more to unlock it`}
          </p>
        </div>
        <button onClick={removeCoupon} className="shrink-0 text-xs font-medium underline underline-offset-2 hover:opacity-70">
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1">
      <label htmlFor="coupon-code" className="text-xs font-medium text-gray-600">
        Have a coupon code?
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1 min-w-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <TagIcon />
          </span>
          <input
            id="coupon-code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (error) setError("");
            }}
            placeholder="Enter code"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={20}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "coupon-error" : undefined}
            className={`w-full rounded-lg border pl-9 pr-3 py-2.5 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand ${
              error ? "border-red-400" : "border-gray-300"
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={!code.trim() || checking}
          className="shrink-0 bg-brand text-white text-sm font-medium px-4 rounded-lg hover:bg-brand-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {checking ? "Checking…" : "Apply"}
        </button>
      </div>
      {error && (
        <p id="coupon-error" role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
