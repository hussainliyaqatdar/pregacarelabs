"use client";
import { useUI } from "@/lib/ui-context";

export default function HeroSearchCTA() {
  const { openSearchModal } = useUI();
  return (
    <button
      onClick={openSearchModal}
      className="w-full flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-5 py-4 text-left hover:border-brand transition shadow-sm"
    >
      <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
      <span className="text-gray-500 flex-1">Search Tests and Packages</span>
      <span className="bg-brand text-white rounded-md px-4 py-2 font-medium text-sm shrink-0">Search</span>
    </button>
  );
}
