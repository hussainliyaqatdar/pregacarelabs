import { NextRequest, NextResponse } from "next/server";
import { getSlotsForDate } from "@/lib/slots";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date is required" }, { status: 400 });
  return NextResponse.json(getSlotsForDate(date));
}
