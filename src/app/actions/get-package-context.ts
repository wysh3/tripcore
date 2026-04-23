"use server";

import { prisma } from "@/lib/prisma";

export async function getPackageFormContext() {
  const [destinations, packages] = await Promise.all([
    prisma.destination.findMany({
      orderBy: { country: "asc" },
      select: { id: true, country: true, city: true },
    }),
    prisma.package.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    })
  ]);
  return { destinations, packages };
}
