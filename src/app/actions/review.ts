"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getReview(id: string) {
  return prisma.review.findUnique({ where: { id } });
}

export async function createReview(formData: any) {
  try {
    const newReview = await prisma.review.create({
      data: {
        customerName: formData.customerName,
        rating: Number(formData.rating),
        text: formData.text || null,
        videoUrl: formData.videoUrl || null,
        packageId: formData.packageId || null,
        destinationId: formData.destinationId || null,
        image: formData.image || null,
      },
    });

    revalidatePath("/dashboard/reviews");
    return { success: true, id: newReview.id };
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, error: "Failed to create review" };
  }
}

export async function deleteReview(id: string) {
  try {
    await prisma.review.delete({
      where: { id },
    });
    revalidatePath("/dashboard/reviews");
    return { success: true };
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false };
  }
}

export async function updateReview(id: string, formData: any) {
  try {
    await prisma.review.update({
      where: { id },
      data: {
        customerName: formData.customerName,
        rating: Number(formData.rating),
        text: formData.text || null,
        videoUrl: formData.videoUrl || null,
        packageId: formData.packageId || null,
        destinationId: formData.destinationId || null,
        image: formData.image || null,
      },
    });
    revalidatePath("/dashboard/reviews");
    return { success: true };
  } catch (error) {
    console.error("Error updating review:", error);
    return { success: false };
  }
}
