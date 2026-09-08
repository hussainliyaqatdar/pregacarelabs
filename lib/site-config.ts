export const BUSINESS_NAME = process.env.BUSINESS_NAME || "HomeCareLabs";
export const BOOKING_PHONE = process.env.BOOKING_PHONE || "+91 70197 64500";
export const BOOKING_PHONE_TEL = BOOKING_PHONE.replace(/[^\d+]/g, "");
// Same number handles both calls and WhatsApp chat; wa.me needs digits only, no "+".
export const WHATSAPP_NUMBER = BOOKING_PHONE_TEL.replace(/^\+/, "");
export const WHATSAPP_DEFAULT_MESSAGE = "Hi, I'd like to book a home sample collection.";
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "care@example.com";
export const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export const SERVICE_AREAS = ["JP Nagar", "Jayanagar", "BTM Layout", "Banashankari", "Kanakpura Road"];

export const TRUST_MARKERS = [
  { icon: "shield", label: "NABL-Accredited, Fortis-Partnered", detail: "Every sample is tested in NABL-accredited labs, backed by our partnership with Fortis Hospitals." },
  { icon: "wallet", label: "Pay After Collection", detail: "No advance payment - you only pay once your sample has been safely collected." },
  { icon: "clock", label: "Home Collection Within 60 Minutes", detail: "Our phlebotomist reaches your doorstep within 60 minutes of your confirmed slot." },
  { icon: "report", label: "Reports Within 6 Hours", detail: "Routine reports are ready within 6 hours of your sample being collected." },
];
