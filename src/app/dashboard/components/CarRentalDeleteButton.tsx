"use client";

import { useState } from "react";
import { deleteCarRental } from "@/app/actions/car-rental";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export function CarRentalDeleteButton({ rentalId }: { rentalId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this rental booking? This cannot be undone.")) return;
    setIsDeleting(true);
    const result = await deleteCarRental(rentalId);
    if (result.success) {
      toast.success("Rental deleted");
      setDeleted(true);
    } else {
      toast.error("Failed to delete rental");
      setIsDeleting(false);
    }
  };

  if (deleted) return null;

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete rental"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
