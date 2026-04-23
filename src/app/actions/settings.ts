"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSetting(key: string, value: string) {
  try {
    await prisma.homepageSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error(`Error updating setting ${key}:`, error);
    return { success: false, error: "Failed to update setting" };
  }
}

export async function getSettings() {
  try {
    const settings = await prisma.homepageSetting.findMany();
    return settings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}
