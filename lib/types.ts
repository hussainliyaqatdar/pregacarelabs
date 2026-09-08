export type TestItem = {
  id: string;
  slug: string;
  name: string;
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
  subtotalPrice: number;
  savings: number;
  date: string;
  slot: string;
  paymentStatus: "due";
};
