export type TestItem = {
  id: string;
  slug: string;
  // Customer-friendly display name (e.g. "Complete Blood Count (CBC)").
  name: string;
  // Other names a customer might search for or have heard from a doctor.
  aliases: string[];
  // The lab's own catalog name (e.g. "CBC-5, EDTA Whole Blood"), title-cased
  // for display. Shown to the lab on orders and searchable by customers.
  labName: string;
  // The lab's catalog name exactly as stored (often ALL CAPS); the key used
  // to match the source data.
  rawName: string;
  code: string;
  price: number;
  mrp: number | null;
  type: "Routine" | "Specialised";
  popular: boolean;
  curated: boolean;
  category: string;
  sampleType: string;
  description: string;
  eta: string;
};

export type PackageConstituent = {
  name: string;
  slug: string | null;
  price: number | null;
};

export type PackageItem = {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: string;
  price: number;
  mrp: number | null;
  tagline: string;
  description: string;
  constituents: PackageConstituent[];
  needsContent: boolean;
  eta: string;
};

export type CartLine = {
  kind: "test" | "package";
  slug: string;
  qty: number;
};

export type BookingPatient = {
  name: string;
  whatsapp: string;
  addressLine: string;
  locality: string;
  pincode: string;
  city: string;
  gender: string;
  age: string;
  notes?: string;
  lat?: number;
  lng?: number;
};

export type BookingLineItem = {
  kind: "test" | "package";
  slug: string;
  name: string;
  // The lab's catalog name for a test, so fulfillment sees what the lab
  // actually knows it as (older bookings won't have this).
  labName?: string;
  qty: number;
  mrp: number;
  price: number;
};

export type Booking = {
  id: string;
  createdAt: string;
  patient: BookingPatient;
  items: BookingLineItem[];
  subtotalMrp: number;
  // Sum of item prices BEFORE any coupon. The amount the customer actually owes
  // is subtotalPrice - couponDiscount; use amountDue() from lib/booking-totals.
  subtotalPrice: number;
  // Total saved versus MRP, including any coupon discount.
  savings: number;
  // Present only when a coupon was applied (older bookings won't have these).
  couponCode?: string;
  couponDiscount?: number;
  date: string;
  slot: string;
  paymentStatus: "due";
};
