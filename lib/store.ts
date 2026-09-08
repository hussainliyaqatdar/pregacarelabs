import fs from "fs";
import path from "path";
import type { Booking } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const EMAILS_FILE = path.join(DATA_DIR, "emails.json");

function ensureFile(file: string) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf-8");
}

export function readBookings(): Booking[] {
  ensureFile(BOOKINGS_FILE);
  return JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
}

export function saveBooking(booking: Booking) {
  const bookings = readBookings();
  bookings.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export function getBooking(id: string): Booking | undefined {
  return readBookings().find((b) => b.id === id);
}

export type SentEmail = {
  id: string;
  to: string;
  toLabel: "patient" | "owner";
  subject: string;
  html: string;
  sentAt: string;
};

export function readEmails(): SentEmail[] {
  ensureFile(EMAILS_FILE);
  return JSON.parse(fs.readFileSync(EMAILS_FILE, "utf-8"));
}

export function saveEmail(email: SentEmail) {
  const emails = readEmails();
  emails.push(email);
  fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2), "utf-8");
}
