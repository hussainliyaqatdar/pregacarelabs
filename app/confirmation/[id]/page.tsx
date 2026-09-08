import Link from "next/link";
import { getBooking } from "@/lib/store";

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const booking = getBooking(params.id);

  if (!booking) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Booking not found.</p>
        <Link href="/search" className="text-brand hover:underline">Browse tests →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <div className="text-center">
        <div className="text-4xl mb-2">✅</div>
        <h1 className="text-2xl font-bold text-gray-900">Booking confirmed!</h1>
        <p className="text-gray-600">Booking ID: {booking.id}</p>
      </div>

      <div className="bg-white border rounded-lg p-4 flex flex-col gap-3">
        <h2 className="font-semibold text-gray-900">What you booked</h2>
        {booking.items.map((i) => (
          <div key={`${i.kind}-${i.slug}`} className="flex justify-between text-sm">
            <span>{i.name} {i.qty > 1 ? `× ${i.qty}` : ""}</span>
            <span>
              {i.mrp > i.price && <span className="line-through text-gray-400 mr-1">Rs. {(i.mrp * i.qty).toLocaleString("en-IN")}</span>}
              <strong>Rs. {(i.price * i.qty).toLocaleString("en-IN")}</strong>
            </span>
          </div>
        ))}
        <div className="border-t pt-2 flex justify-between font-bold text-brand-dark">
          <span>Amount due on collection</span>
          <span>Rs. {booking.subtotalPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center -mt-4">No payment has been taken yet - pay only after your sample is collected.</p>

      <div className="bg-brand-light rounded-lg p-4 flex flex-col gap-1">
        <h2 className="font-semibold text-gray-900 mb-1">Collection details</h2>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time window:</strong> {booking.slot}</p>
        <p><strong>Address:</strong> {booking.patient.addressLine}, {booking.patient.locality}, {booking.patient.city} - {booking.patient.pincode}</p>
      </div>

      <p className="text-sm text-gray-600 text-center">
        Our phlebotomist will arrive within 60 minutes of your slot start time, and your report
        will be sent via WhatsApp to <strong>{booking.patient.whatsapp}</strong> - typically within
        6 hours for routine tests.
      </p>

      <Link href="/search" className="text-center text-brand font-medium hover:underline">Book another test →</Link>
    </div>
  );
}
