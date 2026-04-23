"use client";

import { useState } from "react";
import { deleteSale, toggleSaleStatus } from "@/app/actions/sale";
import { toast } from "sonner";
import { Trash2, Power } from "lucide-react";

interface SaleCardActionsProps {
  saleId: string;
  isActive: boolean;
}

export function SaleCardActions({ saleId, isActive: initialActive }: SaleCardActionsProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    setIsTogglingStatus(true);
    const newStatus = !isActive;
    setIsActive(newStatus);
    const result = await toggleSaleStatus(saleId, newStatus);
    setIsTogglingStatus(false);
    if (result.success) {
      toast.success(newStatus ? "Sale activated" : "Sale deactivated");
    } else {
      toast.error("Failed to update status");
      setIsActive(!newStatus);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this sale campaign? This cannot be undone.")) return;
    setIsDeleting(true);
    const result = await deleteSale(saleId);
    if (result.success) {
      toast.success("Sale deleted");
      setIsDeleted(true);
    } else {
      toast.error("Failed to delete sale");
      setIsDeleting(false);
    }
  };

  if (isDeleted) return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={handleToggle}
        disabled={isTogglingStatus}
        title={isActive ? "Deactivate" : "Activate"}
        className={`p-2 transition-colors disabled:opacity-50 ${
          isActive ? "text-green-600 hover:text-gray-500" : "text-gray-400 hover:text-green-600"
        }`}
      >
        <Power className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete sale"
        className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
