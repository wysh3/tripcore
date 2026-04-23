import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { DepartureDate } from "@prisma/client";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;

  const pkg = await prisma.package.findUnique({
    where: { slug },
    include: { departures: true },
  });

  if (!pkg) notFound();

  const gallery: string[] = pkg.galleryImages
    ? pkg.galleryImages.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  const inclusions: string[] = pkg.inclusions
    ? pkg.inclusions.split("\n").filter(Boolean)
    : [];

  const exclusions: string[] = pkg.exclusions
    ? pkg.exclusions.split("\n").filter(Boolean)
    : [];

  const highlights: string[] = pkg.highlights
    ? pkg.highlights.split("\n").filter(Boolean)
    : [];

  const itinerary: { title: string; duration: string; description: string }[] =
    Array.isArray(pkg.itinerary) ? (pkg.itinerary as any[]) : [];

  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans">
      {/* Hero */}
      <div className="relative h-[65vh] overflow-hidden">
        <img
          src={pkg.mainImage}
          alt={pkg.title}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-12 left-10 md:left-20 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
            {pkg.destination} · {pkg.durationDays} Days
          </p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-none">
            {pkg.title}
          </h1>
          <div className="flex gap-4 mt-6 flex-wrap">
            {pkg.flightsIncluded && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-xs">
                ✈ Flights Included
              </span>
            )}
            {pkg.bestPriceGuarantee && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-xs">
                ✦ Best Price Guarantee
              </span>
            )}
            {pkg.isCustomizable && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-xs">
                ⚙ Customizable
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
          {/* About */}
          <section>
            <h2 className="text-2xl font-serif mb-4">About This Tour</h2>
            <p className="text-black/60 leading-relaxed">{pkg.shortDescription}</p>
            {highlights.length > 0 && (
              <ul className="mt-6 space-y-2">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-black/70">
                    <span className="text-black/30 mt-0.5">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {pkg.specialNotes && (
              <div className="mt-6 p-4 bg-black/5 rounded-xl text-xs text-black/50 leading-relaxed">
                <strong>Note:</strong> {pkg.specialNotes}
              </div>
            )}
          </section>

          {/* Itinerary */}
          {itinerary.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-6">
                {itinerary.map((day, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-black/80">{day.title}</p>
                      {day.duration && (
                        <p className="text-xs text-black/40 mt-0.5">{day.duration}</p>
                      )}
                      <p className="text-sm text-black/60 mt-2 leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Inclusions & Exclusions */}
          {(inclusions.length > 0 || exclusions.length > 0) && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inclusions.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif mb-4 text-green-800">Inclusions</h3>
                  <ul className="space-y-2">
                    {inclusions.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-black/60">
                        <span className="text-green-600 mt-0.5">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exclusions.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif mb-4 text-red-800">Exclusions</h3>
                  <ul className="space-y-2">
                    {exclusions.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-black/60">
                        <span className="text-red-500 mt-0.5">✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Cancellation Policy */}
          {pkg.cancellationPolicy && (
            <section>
              <h2 className="text-2xl font-serif mb-4">Cancellation Policy</h2>
              <p className="text-sm text-black/60 leading-relaxed">
                {pkg.cancellationPolicy}
              </p>
            </section>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Pricing + Departures + Enquiry CTA */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="sticky top-8 bg-white rounded-2xl p-8 shadow-sm border border-black/5 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-black/40 mb-1">
                Starting from
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-serif text-black">
                  ₹{pkg.sellingPrice.toLocaleString("en-IN")}
                </span>
                {pkg.originalPrice && (
                  <span className="text-base line-through text-black/30">
                    ₹{pkg.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {pkg.discountLabel && (
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                  {pkg.discountLabel}
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm text-black/60 border-t border-black/5 pt-4">
              {pkg.durationDays && (
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="text-black font-medium">{pkg.durationDays} Days</span>
                </div>
              )}
              {pkg.maxPersons && (
                <div className="flex justify-between">
                  <span>Max Persons</span>
                  <span className="text-black font-medium">{pkg.maxPersons}</span>
                </div>
              )}
              {pkg.ageRange && (
                <div className="flex justify-between">
                  <span>Age Range</span>
                  <span className="text-black font-medium">{pkg.ageRange}</span>
                </div>
              )}
              {pkg.tourCategory && (
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="text-black font-medium">{pkg.tourCategory}</span>
                </div>
              )}
            </div>

            {/* Upcoming Departures */}
            {pkg.departures.length > 0 && (
              <div className="border-t border-black/5 pt-4">
                <p className="text-xs uppercase tracking-widest text-black/40 mb-3">
                  Upcoming Departures
                </p>
                <div className="space-y-2">
                  {pkg.departures.slice(0, 4).map((dep: DepartureDate) => (
                    <div
                      key={dep.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-black/70">
                        {new Date(dep.startDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-black/40 text-xs">
                        {dep.seatsLeft} seats left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={`/enquiry?package=${pkg.slug}`}
              className="block w-full text-center bg-black text-white py-4 rounded-xl font-semibold text-sm tracking-wide hover:bg-black/80 transition-colors"
            >
              Enquire Now
            </Link>

            {pkg.pdfBrochure && (
              <a
                href={pkg.pdfBrochure}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border border-black/20 text-black py-3 rounded-xl font-medium text-sm tracking-wide hover:bg-black/5 transition-colors"
              >
                Download Brochure
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
