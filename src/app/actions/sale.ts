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

export async function updateSale(id: string, formData: any) {
  try {
    await prisma.sale.update({
      where: { id },
      data: {
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: formData.description || null,
        heroImage: formData.heroImage || null,
        isActive: formData.isActive === true || formData.isActive === "true",
      },
    });
    revalidatePath("/dashboard/sales");
    revalidatePath(`/sales/${formData.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating sale:", error);
    return { success: false };
  }
}

export async function getSale(id: string) {
  try {
    return await prisma.sale.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error fetching sale:", error);
    return null;
  }
}
