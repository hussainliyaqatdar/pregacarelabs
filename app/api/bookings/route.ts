import { NextRequest, NextResponse } from "next/server";
import { allTests, allPackages } from "@/lib/catalog";
import { getSlotsForDate } from "@/lib/slots";
import { saveBooking } from "@/lib/store";
import { sendOwnerNotification } from "@/lib/email";
import type { Booking, CartLine } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { patient, cart, date, slot } = body as {
    patient: Booking["patient"];
    cart: CartLine[];
    date: string;
    slot: string;
  };

  if (!patient?.name || !patient?.whatsapp || !patient?.addressLine || !patient?.pincode) {
    return NextResponse.json({ error: "Missing required patient details" }, { status: 400 });
  }
  if (!cart?.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  if (!date || !slot) return NextResponse.json({ error: "Please choose a collection date and time" }, { status: 400 });

  const availableSlots = getSlotsForDate(date);
  const chosen = availableSlots.find((s) => s.slot === slot);
  if (!chosen || !chosen.available) {
    return NextResponse.json({ error: "That slot was just booked, please pick another" }, { status: 409 });
  }

  const items = cart.map((line) => {
    const source = line.kind === "test" ? allTests : allPackages;
    const found = source.find((x) => x.slug === line.slug);
    if (!found) throw new Error(`Unknown ${line.kind} ${line.slug}`);
    const mrp = found.mrp ?? found.price;
    // Tests are shown to customers under a friendly name, but the lab knows
    // them by their catalog name - keep that on the booking for fulfillment.
    const labName = "labName" in found ? found.labName : undefined;
    return { kind: line.kind, slug: found.slug, name: found.name, labName, qty: line.qty, mrp, price: found.price };
  });

  const subtotalMrp = items.reduce((s, i) => s + i.mrp * i.qty, 0);
  const subtotalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  // No payment is collected at booking time - the site's promise is "pay
  // only after sample collection." Payment is taken in person (cash/UPI) or
  // via a link sent after the phlebotomist visit, outside this flow.
  const booking: Booking = {
    id: `BK-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    patient,
    items,
    subtotalMrp,
    subtotalPrice,
    savings: subtotalMrp - subtotalPrice,
    date,
    slot,
    paymentStatus: "due",
  };

  saveBooking(booking);
  await sendOwnerNotification(booking);

  return NextResponse.json({ id: booking.id });
}
