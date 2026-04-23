"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDestination(formData: any) {
  try {
    const newDestination = await prisma.destination.create({
      data: {
        country: formData.country,
        city: formData.city || null,
        region: formData.region || null,
        description: formData.description || null,
        image: formData.image || null,
      },
    });

    revalidatePath("/dashboard/destinations");
    return { success: true, id: newDestination.id };
  } catch (error) {
    console.error("Error creating destination:", error);
    return { success: false, error: "Failed to create destination" };
  }
}
