"use client";

import { useState } from "react";
import { updateEnquiryStatus } from "@/app/actions/enquiry";
import { toast } from "sonner";

interface EnquiryStatusSelectProps {
  enquiryId: string;
  currentStatus: string;
}

export function EnquiryStatusSelect({ enquiryId, currentStatus }: EnquiryStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (newStatus: string) => {
    const prev = status;
    setStatus(newStatus);
    setIsUpdating(true);
    const result = await updateEnquiryStatus(enquiryId, newStatus);
    setIsUpdating(false);
    if (result.success) {
      toast.success("Status updated");
    } else {
      toast.error("Failed to update status");
      setStatus(prev);
    }
  };

  const colorMap: Record<string, string> = {
    NEW: "text-blue-600",
    CONTACTED: "text-orange-600",
    CONVERTED: "text-green-600",
  };

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={isUpdating}
      className={`text-xs font-semibold border-0 bg-transparent focus:ring-0 cursor-pointer disabled:opacity-50 ${colorMap[status] ?? "text-gray-600"}`}
    >
      <option value="NEW">New</option>
      <option value="CONTACTED">Contacted</option>
      <option value="CONVERTED">Converted</option>
    </select>
  );
}
