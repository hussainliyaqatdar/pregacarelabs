import { NextRequest, NextResponse } from "next/server";

// Extracts lat/lng from a Google Maps URL. Tried in priority order: the
// precise marker position (!3d..!4d..), the viewport-center form (@lat,lng),
// then the search-results form (/search/lat,lng).
function extractCoords(url: string): { lat: number; lng: number } | null {
  const patterns = [
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    /\/search\/(-?\d+\.\d+),\+?(-?\d+\.\d+)/,
    /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
  }
  return null;
}

// Resolves a shortened Google Maps share link (maps.app.goo.gl/..., goo.gl/maps/...)
// server-side by following its redirect chain, then reads coordinates off the
// final URL. Client-side fetch can't do this itself - Maps redirects don't
// allow cross-origin reads of the final URL from the browser.
export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (typeof url !== "string" || !/^https?:\/\//.test(url)) {
    return NextResponse.json({ error: "Please provide a valid link" }, { status: 400 });
  }
  const allowedHosts = ["maps.app.goo.gl", "goo.gl", "google.com", "www.google.com", "maps.google.com"];
  let host: string;
  try {
    host = new URL(url).host;
  } catch {
    return NextResponse.json({ error: "Please provide a valid link" }, { status: 400 });
  }
  if (!allowedHosts.some((h) => host === h || host.endsWith(`.${h}`))) {
    return NextResponse.json({ error: "That doesn't look like a Google Maps link" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const finalUrl = res.url;
    const coords = extractCoords(finalUrl);
    if (!coords) {
      return NextResponse.json(
        { error: "Couldn't find coordinates in that link. Try 'Use current location' instead, or share coordinates directly (long-press the pin in Google Maps to see lat/lng)." },
        { status: 422 }
      );
    }
    return NextResponse.json(coords);
  } catch {
    return NextResponse.json({ error: "Couldn't reach that link. Please check it and try again." }, { status: 502 });
  }
}
