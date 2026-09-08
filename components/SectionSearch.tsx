"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

// A search box that filters the current listing page (Tests or Packages) in
// place, rather than navigating to the global /search page. Preserves other
// query params (e.g. ?category=) already on the URL, and resets pagination.
export default function SectionSearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");

  function apply(q: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (q.trim()) params.set("q", q.trim());
    else params.delete("q");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        apply(value);
      }}
      className="flex gap-2 max-w-xl"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <button type="submit" className="bg-brand text-white rounded-lg px-5 text-sm font-medium hover:bg-brand-dark transition">
        Search
      </button>
      {searchParams.get("q") && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            apply("");
          }}
          className="text-sm text-gray-500 hover:text-brand px-2"
        >
          Clear
        </button>
      )}
    </form>
  );
}
