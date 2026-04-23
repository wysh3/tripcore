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

  return <PackagesClient packages={serializedPackages} />;
}
