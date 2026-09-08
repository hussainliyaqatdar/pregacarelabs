export default function PriceTag({ mrp, price, size = "md" }: { mrp: number | null; price: number; size?: "sm" | "md" | "lg" }) {
  const showStrike = mrp !== null && mrp > price;
  const pct = showStrike ? Math.round(((mrp! - price) / mrp!) * 100) : 0;
  const priceClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`${priceClass} font-bold text-brand-dark`}>Rs. {price.toLocaleString("en-IN")}</span>
      {showStrike && (
        <>
          <span className="text-sm text-gray-400 line-through">Rs. {mrp!.toLocaleString("en-IN")}</span>
          <span className="text-xs font-semibold text-brand-accent">{pct}% off</span>
        </>
      )}
    </div>
  );
}
