import { TRUST_MARKERS } from "@/lib/site-config";

const ICONS: Record<string, string> = {
  shield: "\u{1F6E1}\u{FE0F}",
  hospital: "\u{1F3E5}",
  clock: "\u{23F1}\u{FE0F}",
  report: "\u{1F4C4}",
  wallet: "\u{1F4B3}",
};

export default function TrustMarkers({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${compact ? "" : "py-6"}`}>
      {TRUST_MARKERS.map((m) => (
        <div key={m.label} className="bg-white border rounded-lg p-4 flex flex-col gap-1 text-center items-center">
          <span className="text-2xl" aria-hidden>{ICONS[m.icon]}</span>
          <span className="font-semibold text-gray-900 text-sm">{m.label}</span>
          {!compact && <span className="text-xs text-gray-500">{m.detail}</span>}
        </div>
      ))}
    </div>
  );
}
