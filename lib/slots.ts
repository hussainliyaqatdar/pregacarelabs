import { readBookings } from "./store";
import { DAILY_WINDOWS } from "./booking-dates";

export { DAILY_WINDOWS, BOOKING_WINDOW_DAYS, getUpcomingDates } from "./booking-dates";

// Placeholder capacity model: 1 collection team/day, one booking per window.
// Adjust once real team count is confirmed.
export function getSlotsForDate(date: string) {
  const bookings = readBookings();
  const takenToday = new Set(bookings.filter((b) => b.date === date).map((b) => b.slot));
  return DAILY_WINDOWS.map((slot) => ({
    slot,
    available: !takenToday.has(slot),
    bookedCount: takenToday.has(slot) ? 1 : 0,
  }));
}
