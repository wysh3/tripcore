"use client";

import { useState } from "react";
import { updateUserRole, deleteUser } from "@/app/actions/user";
import { toast } from "sonner";

interface UserActionsCellProps {
  userId: string;
  userRole: string;
}

export function UserActionsCell({ userId, userRole }: UserActionsCellProps) {
  const [role, setRole] = useState(userRole);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    const prevRole = role;
    setRole(newRole);
    setIsUpdatingRole(true);
    const result = await updateUserRole(userId, newRole);
    setIsUpdatingRole(false);
    if (result.success) {
      toast.success("Role updated successfully");
    } else {
      toast.error("Failed to update role");
      setRole(prevRole);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    setIsDeleting(true);
    const result = await deleteUser(userId);
    if (result.success) {
      toast.success("User deleted");
      setDeleted(true);
    } else {
      toast.error("Failed to delete user");
      setIsDeleting(false);
    }
  };

  if (deleted) return null;

  return (
    <div className="flex items-center gap-3 justify-end">
      <select
        value={role}
        onChange={(e) => handleRoleChange(e.target.value)}
        disabled={isUpdatingRole}
        className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 focus:ring-1 focus:ring-gray-900 outline-none disabled:opacity-50 cursor-pointer"
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
        <option value="SUPERADMIN">SUPERADMIN</option>
      </select>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-900 font-medium text-sm disabled:opacity-50 transition-colors"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
