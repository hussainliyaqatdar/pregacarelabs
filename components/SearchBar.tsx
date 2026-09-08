"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Result = {
  kind: "test" | "package";
  slug: string;
  name: string;
  price: number;
  category?: string;
  tagline?: string;
};

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((data) => {
          setResults(data);
          setOpen(true);
        })
        .catch(() => {});
    }, 200);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goToResult(r: Result) {
    setOpen(false);
    router.push(r.kind === "test" ? `/tests/${r.slug}` : `/packages/${r.slug}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results.length > 0) {
      goToResult(results[0]);
    } else if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="search"
          placeholder="Search for a test or package (e.g. Thyroid, Vitamin D, Full Body Checkup)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          className={`flex-1 rounded-lg border border-gray-300 px-4 ${large ? "py-4 text-base" : "py-2.5 text-sm"} focus:outline-none focus:ring-2 focus:ring-brand`}
          aria-label="Search for a diagnostic test or package"
        />
        <button
          type="submit"
          className={`bg-brand text-white rounded-lg px-5 font-medium hover:bg-brand-dark transition ${large ? "text-base" : "text-sm"}`}
        >
          Search
        </button>
      </form>
      {open && results.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((r) => (
            <button
              key={`${r.kind}-${r.slug}`}
              onClick={() => goToResult(r)}
              className="w-full text-left px-4 py-3 hover:bg-brand-light border-b last:border-0 flex items-center justify-between gap-3"
            >
              <span>
                <span className="text-xs uppercase tracking-wide text-brand font-semibold mr-2">
                  {r.kind === "package" ? "Package" : "Test"}
                </span>
                <span className="text-gray-900">{r.name}</span>
                {r.tagline && <span className="block text-xs text-gray-500">{r.tagline}</span>}
              </span>
              <span className="text-sm font-semibold text-brand-dark whitespace-nowrap">Rs. {r.price.toLocaleString("en-IN")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
