import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PackageDetailClient from "./PackageDetailClient";

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

  const serializedPkg = {
    id: pkg.id,
    title: pkg.title,
    slug: pkg.slug,
    destination: pkg.destination,
    durationDays: pkg.durationDays,
    mainImage: pkg.mainImage,
    sellingPrice: pkg.sellingPrice,
    shortDescription: pkg.shortDescription,
    highlights: pkg.highlights ? pkg.highlights.split("\n").filter(Boolean) : [],
    itinerary: Array.isArray(pkg.itinerary) ? (pkg.itinerary as any[]) : [],
    inclusions: pkg.inclusions ? pkg.inclusions.split("\n").filter(Boolean) : [],
    exclusions: pkg.exclusions ? pkg.exclusions.split("\n").filter(Boolean) : [],
    gallery: pkg.galleryImages ? pkg.galleryImages.split(",").map(s => s.trim()).filter(Boolean) : [],
    cancellationPolicy: pkg.cancellationPolicy,
    flightsIncluded: pkg.flightsIncluded,
    bestPriceGuarantee: pkg.bestPriceGuarantee,
    isCustomizable: pkg.isCustomizable,
    tourCategory: pkg.tourCategory,
  };

  return <PackageDetailClient pkg={serializedPkg} />;
}
