export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import PackagesClient from "./PackagesClient";

export default async function PackagesPage() {
  const [packages, destinations] = await Promise.all([
    prisma.package.findMany({
      orderBy: { id: "desc" },
    }),
    prisma.destination.findMany({
      orderBy: { country: "asc" }
    })
  ]);

  // Map Prisma data to simpler client types if needed, though they match here
  const serializedPackages = packages.map(pkg => ({
    id: pkg.id,
    title: pkg.title,
    slug: pkg.slug,
    destination: pkg.destination,
    durationDays: pkg.durationDays,
    mainImage: pkg.mainImage,
    sellingPrice: pkg.sellingPrice,
    shortDescription: pkg.shortDescription,
    tourCategory: pkg.tourCategory,
  }));

  const serializedDestinations = destinations.map(d => 
    d.city ? `${d.city}, ${d.country}` : d.country
  );

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center font-serif text-2xl">Loading Journeys...</div>}>
      <PackagesClient 
        packages={serializedPackages} 
        destinations={Array.from(new Set(serializedDestinations))} 
      />
    </Suspense>
  );
}
