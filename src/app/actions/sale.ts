"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSale(formData: any) {
  try {
    await prisma.sale.create({
      data: {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        heroImage: formData.heroImage || null,
        isActive: formData.isActive === true || formData.isActive === "true",
      },
    });
    revalidatePath("/dashboard/sales");
    return { success: true };
  } catch (error) {
    console.error("Error creating sale:", error);
    return { success: false };
  }
}

export async function deleteSale(id: string) {
  try {
    await prisma.sale.delete({ where: { id } });
    revalidatePath("/dashboard/sales");
    return { success: true };
  } catch (error) {
    console.error("Error deleting sale:", error);
    return { success: false };
  }
}

export async function toggleSaleStatus(id: string, isActive: boolean) {
  try {
    await prisma.sale.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/dashboard/sales");
    return { success: true };
  } catch (error) {
    console.error("Error toggling sale status:", error);
    return { success: false };
  }
}
