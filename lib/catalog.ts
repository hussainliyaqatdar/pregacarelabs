import testsData from "@/data/tests.json";
import packagesData from "@/data/packages.json";
import type { TestItem, PackageItem } from "./types";
import { aliasMatchSlugs } from "./aliases";

// Strikethrough reference price for individual tests: +20%, rounded up to
// the next multiple of 50, minus 1 (e.g. 100 -> 120 -> 150 -> 149). The
// actual charged price is untouched - this only sets the crossed-out MRP.
function computeStrikethroughMrp(price: number): number {
  const inflated = price * 1.2;
  const roundedUp = Math.ceil(inflated / 50) * 50;
  return roundedUp - 1;
}

export const allTests = (testsData as TestItem[]).map((t) => ({
  ...t,
  mrp: t.mrp ?? computeStrikethroughMrp(t.price),
}));
export const allPackages = packagesData as PackageItem[];

// Categories a business wants surfaced first (e.g. a current marketing push),
// in priority order; everything else follows alphabetically.
const PRIORITY_CATEGORIES = ["Women's Health"];
function sortWithPriority(categories: string[]): string[] {
  const priority = PRIORITY_CATEGORIES.filter((c) => categories.includes(c));
  const rest = categories.filter((c) => !PRIORITY_CATEGORIES.includes(c)).sort();
  return [...priority, ...rest];
}

export function getTestBySlug(slug: string): TestItem | undefined {
  return allTests.find((t) => t.slug === slug);
}

export function getPackageBySlug(slug: string): PackageItem | undefined {
  return allPackages.find((p) => p.slug === slug);
}

export function getTestCategories(): string[] {
  return Array.from(new Set(allTests.map((t) => t.category))).sort();
}

export function getPackageCategories(): string[] {
  return sortWithPriority(Array.from(new Set(allPackages.map((p) => p.category))));
}

export type SearchResult =
  | { kind: "test"; item: TestItem; score: number }
  | { kind: "package"; item: PackageItem; score: number };

// Simple, fast relevance score: exact match > starts-with > contains > word overlap.
function scoreName(name: string, query: string): number {
  const n = name.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  if (n === q) return 100;
  if (n.startsWith(q)) return 80;
  if (n.includes(q)) return 60;
  const qWords = q.split(/\s+/).filter(Boolean);
  const matched = qWords.filter((w) => n.includes(w)).length;
  if (matched === 0) return 0;
  return 20 + (matched / qWords.length) * 30;
}

export function search(query: string, limit = 20): SearchResult[] {
  const q = query.trim();
  if (!q) return [];
  const results: SearchResult[] = [];

  // Abbreviations and lay terms (e.g. "FBS", "HbA1c") that don't literally
  // appear in the catalog's own test names get a top-tier score so they
  // surface first, ahead of loose text matches.
  const aliasSlugs = new Set(aliasMatchSlugs(q));

  for (const p of allPackages) {
    let score = Math.max(scoreName(p.name, q), scoreName(p.tagline, q) * 0.6, scoreName(p.category, q) * 0.5);
    if (aliasSlugs.has(p.slug)) score = Math.max(score, 95);
    if (score > 0) results.push({ kind: "package", item: p, score });
  }
  for (const t of allTests) {
    let score = scoreName(t.name, q) * (t.popular ? 1.1 : 1);
    if (aliasSlugs.has(t.slug)) score = Math.max(score, 95);
    if (score > 0) results.push({ kind: "test", item: t, score });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

// Used by the search bar: if there's one clearly best match, we can send the
// user straight to its product page instead of a results list.
export function findConfidentMatch(query: string): SearchResult | null {
  const results = search(query, 5);
  if (results.length === 0) return null;
  const [best, second] = results;
  if (best.score >= 80 && (!second || best.score - second.score >= 15)) return best;
  return null;
}
