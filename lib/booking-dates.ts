// Pure date/window helpers - safe to import from client components.
// (Anything that touches booking storage lives in lib/slots.ts instead.)
function buildDailyWindows() {
  const windows: string[] = [];
  const startMinutes = 7 * 60;
  const endMinutes = 13 * 60;
  const fmt = (mins: number) => {
    const h = Math.floor(mins / 60);
    const mm = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };
  for (let m = startMinutes; m < endMinutes; m += 30) {
    windows.push(`${fmt(m)} - ${fmt(m + 30)}`);
  }
  return windows;
}

export const DAILY_WINDOWS = buildDailyWindows();
export const BOOKING_WINDOW_DAYS = 14;

export function getUpcomingDates(days = BOOKING_WINDOW_DAYS): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export function formatDateLabel(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const weekday = d.toLocaleDateString("en-IN", { weekday: "short" });
  const day = d.getDate();
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  return { weekday, day, month };
}
