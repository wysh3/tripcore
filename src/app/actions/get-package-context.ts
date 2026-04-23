"use server";

import { prisma } from "@/lib/prisma";

export async function getPackageFormContext() {
  const destinations = await prisma.destination.findMany({
    orderBy: { country: "asc" },
    select: { id: true, country: true, city: true },
  });
  return { destinations };
}
