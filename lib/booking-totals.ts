import type { Booking } from "./types";

// What the customer owes on collection. Bookings made before coupons existed
// have no couponDiscount, so this falls back to the plain subtotal.
export function amountDue(booking: Pick<Booking, "subtotalPrice" | "couponDiscount">): number {
  return booking.subtotalPrice - (booking.couponDiscount ?? 0);
}
