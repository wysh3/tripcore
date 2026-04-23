"use client";

import { useState } from "react";
import { deleteReview } from "@/app/actions/review";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface ReviewDeleteButtonProps {
  reviewId: string;
  onDeleted?: () => void;
}

export function ReviewDeleteButton({ reviewId, onDeleted }: ReviewDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setIsDeleting(true);
    const result = await deleteReview(reviewId);
    if (result.success) {
      toast.success("Review deleted");
      setDeleted(true);
      onDeleted?.();
    } else {
      toast.error("Failed to delete review");
      setIsDeleting(false);
    }
  };

  if (deleted) return null;

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete review"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
