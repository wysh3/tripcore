export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import PackagesClient from "./PackagesClient";

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { id: "desc" },
  });

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

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center font-serif text-2xl">Loading Journeys...</div>}>
      <PackagesClient packages={serializedPackages} />
    </Suspense>
  );
}
