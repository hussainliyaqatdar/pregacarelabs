import { BOOKING_PHONE_TEL, WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site-config";

export default function MoreWaysToBook() {
  return (
    <div className="relative bg-white border rounded-xl px-6 pt-5 pb-4">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs font-semibold uppercase tracking-wide text-gray-400 whitespace-nowrap">
        More ways to book
      </span>
      <div className="flex items-center justify-center gap-10">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 text-gray-800 hover:text-brand-accent transition"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" style={{ color: "#FF7A45" }} aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22a7.47 7.47 0 0 1-1.38-1.71c-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.24-.86.85-.86 2.06 0 1.22.88 2.4 1.01 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.28Z" />
          </svg>
          <span className="text-sm font-medium">WhatsApp</span>
        </a>

        <a
          href={`tel:${BOOKING_PHONE_TEL}`}
          className="flex flex-col items-center gap-1.5 text-gray-800 hover:text-brand-accent transition"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" style={{ color: "#FF7A45" }} aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.94 21 3 13.06 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
          </svg>
          <span className="text-sm font-medium">Call Us</span>
        </a>
      </div>
    </div>
  );
}
