// Razorpay integration point. Until RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are
// set, checkout runs in test mode: no real charge, order is marked "test-mode".
export function isLivePaymentsConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export async function createRazorpayOrder(amountInRupees: number) {
  if (!isLivePaymentsConfigured()) {
    return { id: `test_order_${Date.now()}`, live: false };
  }
  const keyId = process.env.RAZORPAY_KEY_ID!;
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ amount: Math.round(amountInRupees * 100), currency: "INR" }),
  });
  if (!res.ok) throw new Error("Razorpay order creation failed");
  const data = await res.json();
  return { id: data.id as string, live: true };
}
