"use server";

import { prisma } from "@/lib/prisma";

export async function getReviewFormContext() {
  try {
    const [packages, destinations] = await Promise.all([
      prisma.package.findMany({ select: { id: true, title: true } }),
      prisma.destination.findMany({ select: { id: true, country: true, city: true } }),
    ]);
    return { packages, destinations };
  } catch (error) {
    console.error("Error fetching review context:", error);
    return { packages: [], destinations: [] };
  }
}
