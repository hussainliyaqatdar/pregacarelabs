import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/catalog";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const results = search(q, 12).map((r) => ({
    kind: r.kind,
    slug: r.item.slug,
    name: r.item.name,
    price: r.item.price,
    category: r.kind === "test" ? r.item.category : r.item.category,
    tagline: r.kind === "package" ? r.item.tagline : undefined,
  }));
  return NextResponse.json(results);
}
