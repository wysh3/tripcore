"use client";

import { useState } from "react";
import { updateUserRole, deleteUser } from "@/app/actions/user";
import { toast } from "sonner";

interface UserActionsCellProps {
  userId: string;
  userRole: string;
}

import { CustomSelect } from "../../../components/ui/CustomSelect";

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
      <div className="w-32">
        <CustomSelect
          options={[
            { value: "USER", label: "USER" },
            { value: "ADMIN", label: "ADMIN" },
            { value: "SUPERADMIN", label: "SUPERADMIN" },
          ]}
          value={role}
          onChange={handleRoleChange}
          className="!py-1 !px-2 !rounded-md !text-[10px]"
        />
      </div>
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
