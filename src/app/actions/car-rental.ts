"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCarRental(formData: any) {
  try {
    const newRental = await prisma.carRental.create({
      data: {
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        pickupDrop: formData.pickupDrop,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        adults: Number(formData.adults),
        children: Number(formData.children),
        carType: formData.carType,
        driverLang: formData.driverLang,
        tripType: formData.tripType,
      },
    });

    revalidatePath("/dashboard/car-rentals");
    return { success: true, id: newRental.id };
  } catch (error) {
    console.error("Error creating car rental:", error);
    return { success: false, error: "Failed to create car rental" };
  }
}

export async function deleteCarRental(id: string) {
  try {
    await prisma.carRental.delete({
      where: { id },
    });
    revalidatePath("/dashboard/car-rentals");
    return { success: true };
  } catch (error) {
    console.error("Error deleting car rental:", error);
    return { success: false };
  }
}
