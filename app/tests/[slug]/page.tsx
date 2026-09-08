import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allTests, allPackages, getTestBySlug } from "@/lib/catalog";
import PriceTag from "@/components/PriceTag";
import AddToCartButton from "@/components/AddToCartButton";
import TestCard from "@/components/TestCard";
import PackageCard from "@/components/PackageCard";
import { SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return allTests.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const test = getTestBySlug(params.slug);
  if (!test) return {};
  return {
    title: `${test.name} - Book Home Collection`,
    description: test.description,
    alternates: { canonical: `${SITE_URL}/tests/${test.slug}` },
    openGraph: { title: test.name, description: test.description },
  };
}

export default function TestPage({ params }: { params: { slug: string } }) {
  const test = getTestBySlug(params.slug);
  if (!test) notFound();

  const relatedTests = allTests.filter((t) => t.category === test.category && t.slug !== test.slug).slice(0, 3);
  const inPackages = allPackages.filter((p) => p.constituents.some((c) => c.slug === test.slug)).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: test.name,
    description: test.description,
    usedToDiagnose: test.category,
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link> {" / "}
        <Link href={`/search?q=${encodeURIComponent(test.category)}`} className="hover:text-brand">{test.category}</Link> {" / "}
        <span className="text-gray-700">{test.name}</span>
      </nav>

      <div className="bg-white border rounded-xl p-6 md:p-8 flex flex-col gap-4">
        <span className="text-xs uppercase tracking-wide text-brand font-semibold">{test.category} &middot; Individual Test</span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{test.name}</h1>
        <p className="text-gray-700 leading-relaxed">{test.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span><strong>Sample:</strong> {test.sampleType}</span>
          <span><strong>Test code:</strong> {test.code}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-4 mt-2">
          <PriceTag mrp={test.mrp} price={test.price} size="lg" />
          <AddToCartButton kind="test" slug={test.slug} size="lg" />
        </div>
      </div>

      {inPackages.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">This test is also included in these packages</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {inPackages.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </section>
      )}

      {relatedTests.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related tests in {test.category}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedTests.map((t) => (
              <TestCard key={t.slug} test={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
