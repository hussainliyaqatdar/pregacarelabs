export const BUSINESS_NAME = process.env.BUSINESS_NAME || "Prega Care Labs";
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

// Sourced from the business's own Google Business Profile (4.8 stars, 26
// reviews as of the last check). Names and quotes are copied verbatim from
// real, public Google reviews - nothing here is fabricated. No profile
// photos are hotlinked from Google (fragile, and against Maps' reuse terms);
// initials-based avatars are used instead, matching how most of these
// reviewers already appear on Google (default avatars, not custom photos).
export const GMB_RATING = { value: 4.8, count: 26 };
export const GMB_PROFILE_URL = "https://share.google/VaiixSdonP2bUwDJs";

export const CUSTOMER_REVIEWS = [
  { name: "Shilpa Shree S", rating: 5, text: "Best and fast services are delivered. Highly recommended!" },
  { name: "Syed Shabir", rating: 5, text: "Good service and accurate reading. Pain less sample collection, am happy." },
  { name: "Mohammed Afroz Niergad", rating: 5, text: "Good Lab & Quick response! On time sample collection." },
  { name: "Last Bench Productions", rating: 5, text: "Have chosen home collection and this was a good service - the result was on time and very helpful." },
  { name: "KR Ramesh", rating: 5, text: "Very informative about the tests. The charges are economical, and the team is punctual on collection of samples. Very knowledgeable, polite, and patient." },
  { name: "Srikanth Kalyanadurgam", rating: 5, text: "Good and efficient services." },
];
