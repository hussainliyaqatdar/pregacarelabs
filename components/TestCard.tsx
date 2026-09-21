import Link from "next/link";
import PriceTag from "./PriceTag";
import AddToCartButton from "./AddToCartButton";
import { displayAliases } from "@/lib/catalog";
import type { TestItem } from "@/lib/types";

export default function TestCard({ test }: { test: TestItem }) {
  const aliases = displayAliases(test);
  return (
    <div className="bg-white border rounded-lg p-4 flex flex-col gap-2 shadow-sm">
      <span className="text-xs uppercase tracking-wide text-brand font-semibold">Test</span>
      <div>
        <Link href={`/tests/${test.slug}`} className="font-semibold text-gray-900 hover:text-brand">
          {test.name}
        </Link>
        {aliases.length > 0 && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            <span className="font-medium">Also known as:</span> {aliases.join(", ")}
          </p>
        )}
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">{test.description}</p>
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
        </svg>
        <span>Reports in {test.eta}</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <PriceTag mrp={test.mrp} price={test.price} size="sm" />
        <AddToCartButton kind="test" slug={test.slug} />
      </div>
    </div>
  );
}
