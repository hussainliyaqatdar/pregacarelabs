import { saveEmail } from "./store";
import { amountDue } from "./booking-totals";
import type { Booking } from "./types";

const OWNER_EMAIL = process.env.OWNER_EMAIL || "owner@example.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "bookings@example.com";

function money(n: number) {
  return `Rs. ${n.toLocaleString("en-IN")}`;
}

function itemsRows(booking: Booking) {
  return booking.items
    .map(
      (i) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #eee;">${i.name} ${i.qty > 1 ? `x ${i.qty}` : ""}${
        i.labName && i.labName.toLowerCase() !== i.name.toLowerCase()
          ? `<br><span style="color:#777;font-size:12px;">Lab test name: ${i.labName}</span>`
          : ""
      }</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">
        <span style="color:#999;text-decoration:line-through;margin-right:6px;">${money(i.mrp * i.qty)}</span>
        <strong>${money(i.price * i.qty)}</strong>
      </td>
    </tr>`
    )
    .join("");
}

// There is no patient email in the checkout flow anymore - the on-screen
// confirmation page is the patient's confirmation, and report delivery is via
// WhatsApp (handled manually by the team, per current process). This owner
// notification is what actually kicks off fulfillment.
export function renderOwnerNotification(booking: Booking) {
  const subject = `New order - ${booking.patient.name} - ${booking.date} ${booking.slot}`;
  const mapsLink =
    booking.patient.lat != null && booking.patient.lng != null
      ? `<p><strong>Pinned location:</strong> <a href="https://www.google.com/maps?q=${booking.patient.lat},${booking.patient.lng}">Open in Google Maps</a></p>`
      : "";
  const html = `
  <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#222;">
    <h2 style="color:#FF7A45;">New booking - start fulfillment</h2>
    <p><strong>Patient:</strong> ${booking.patient.name} (${booking.patient.age}, ${booking.patient.gender})</p>
    <p><strong>WhatsApp:</strong> ${booking.patient.whatsapp}</p>
    <p><strong>Address:</strong> ${booking.patient.addressLine}, ${booking.patient.locality}, ${booking.patient.city} - ${booking.patient.pincode}</p>
    ${mapsLink}
    <p><strong>Collection window:</strong> ${booking.date}, ${booking.slot}</p>
    ${booking.patient.notes ? `<p><strong>Notes:</strong> ${booking.patient.notes}</p>` : ""}
    <h3>Tests / packages ordered</h3>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">${itemsRows(booking)}</table>
    ${
      booking.couponCode && booking.couponDiscount
        ? `<p style="text-align:right;margin:0;">Subtotal: ${money(booking.subtotalPrice)}</p>
    <p style="text-align:right;margin:0;color:#0F6E6E;">Coupon ${booking.couponCode}: -${money(booking.couponDiscount)}</p>`
        : ""
    }
    <p style="text-align:right;font-weight:bold;">Amount due on collection: ${money(amountDue(booking))}</p>
    <p style="color:#999;font-size:12px;">Booking ID: ${booking.id}</p>
  </div>`;
  return { subject, html };
}

async function deliver(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    });
  } catch (err) {
    console.error("Email delivery failed, kept in dev inbox only:", err);
  }
}

export async function sendOwnerNotification(booking: Booking) {
  const { subject, html } = renderOwnerNotification(booking);
  saveEmail({ id: `${booking.id}-owner`, to: OWNER_EMAIL, toLabel: "owner", subject, html, sentAt: new Date().toISOString() });
  await deliver(OWNER_EMAIL, subject, html);
}
