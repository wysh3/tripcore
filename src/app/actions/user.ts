"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUser(formData: any) {
  try {
    await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        role: formData.role || "USER",
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "User Created",
        details: `New user ${formData.name} was added manually.`,
      },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function updateUserRole(id: string, role: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update role" };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    await prisma.activityLog.create({
      data: {
        action: "User Deleted",
        details: `User with ID ${id} was removed.`,
      },
    });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

