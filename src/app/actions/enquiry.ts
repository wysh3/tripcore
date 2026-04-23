"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}) {
  try {
    await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
        status: "NEW",
      },
    });
    revalidatePath("/dashboard/enquiries");
    revalidatePath("/dashboard/bookings");
    return { success: true };
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return { success: false };
  }
}

export async function updateEnquiryStatus(id: string, status: string) {
  try {
    await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/dashboard/bookings");
    revalidatePath("/dashboard/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    return { success: false };
  }
}

export async function deleteEnquiry(id: string) {
  try {
    await prisma.enquiry.delete({ where: { id } });
    revalidatePath("/dashboard/bookings");
    revalidatePath("/dashboard/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return { success: false };
  }
}
