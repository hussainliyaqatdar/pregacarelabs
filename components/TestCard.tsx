import Link from "next/link";
import PriceTag from "./PriceTag";
import AddToCartButton from "./AddToCartButton";
import type { TestItem } from "@/lib/types";

export default function TestCard({ test }: { test: TestItem }) {
  return (
    <div className="bg-white border rounded-lg p-4 flex flex-col gap-2 shadow-sm">
      <span className="text-xs uppercase tracking-wide text-brand font-semibold">Test</span>
      <Link href={`/tests/${test.slug}`} className="font-semibold text-gray-900 hover:text-brand">
        {test.name}
      </Link>
      <p className="text-sm text-gray-600 line-clamp-3">{test.description}</p>
      <div className="flex items-center justify-between mt-2">
        <PriceTag mrp={test.mrp} price={test.price} size="sm" />
        <AddToCartButton kind="test" slug={test.slug} />
      </div>
    </div>
  );
}
