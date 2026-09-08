import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS_NAME, SITE_URL, BOOKING_PHONE, SERVICE_AREAS } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_NAME} - At-Home Blood Test Collection in Bangalore`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: `Book NABL-accredited blood tests and health checkup packages with home sample collection across ${SERVICE_AREAS.join(", ")}, Bangalore. Partnered with Fortis Hospitals and Agilus Diagnostics. Home collection within 60 minutes, reports within 6 hours.`,
  openGraph: {
    type: "website",
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} - At-Home Blood Test Collection in Bangalore`,
    description: `NABL-accredited home sample collection across Bangalore. Partnered with Fortis Hospitals and Agilus Diagnostics.`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: BUSINESS_NAME,
    telephone: BOOKING_PHONE,
    areaServed: SERVICE_AREAS.map((a) => ({ "@type": "Place", name: `${a}, Bangalore` })),
    url: SITE_URL,
    medicalSpecialty: "Pathology",
    parentOrganization: [{ "@type": "MedicalOrganization", name: "Agilus Diagnostics" }, { "@type": "Hospital", name: "Fortis Hospitals" }],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <CartProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-8 min-h-[70vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
