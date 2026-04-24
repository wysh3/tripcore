"use client";

import { useState } from "react";
import { updateEnquiryStatus } from "@/app/actions/enquiry";
import { toast } from "sonner";

interface EnquiryStatusSelectProps {
  enquiryId: string;
  currentStatus: string;
}

import { CustomSelect } from "../../../components/ui/CustomSelect";

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

  const statusOptions = [
    { value: "NEW", label: "New" },
    { value: "CONTACTED", label: "Contacted" },
    { value: "CONVERTED", label: "Converted" },
  ];

  return (
    <div className="w-32">
      <CustomSelect
        options={statusOptions}
        value={status}
        onChange={handleChange}
        className="!py-1.5 !px-3 !rounded-lg !text-[10px]"
      />
    </div>
  );
}
