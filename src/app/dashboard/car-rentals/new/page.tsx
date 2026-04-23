"use client";
export const dynamic = "force-dynamic";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCarRental } from "@/app/actions/car-rental";
import { toast } from "sonner";

export default function NewCarRentalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    pickupDrop: "",
    startDate: "",
    endDate: "",
    adults: "1",
    children: "0",
    carType: "Sedan",
    driverLang: "English",
    tripType: "Round Trip",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.startDate || !formData.endDate) {
      toast.error("Required fields are missing");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createCarRental(formData);
      if (result.success) {
        toast.success("Car rental booking saved!");
        router.push("/dashboard/car-rentals");
      } else {
        toast.error("Failed to create car rental booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/car-rentals" 
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">New Car Rental</h1>
            <p className="text-gray-500 text-sm mt-1">Record a manual car rental booking or request.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/car-rentals" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Rental"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">WhatsApp Number *</label>
                <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Trip & Vehicle Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Pickup & Drop Location *</label>
                <input type="text" name="pickupDrop" value={formData.pickupDrop} onChange={handleInputChange} required placeholder="e.g. Airport to Hotel" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Start Date *</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">End Date *</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Car Type</label>
                <select name="carType" value={formData.carType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                  <option>Sedan</option>
                  <option>SUV / Innova</option>
                  <option>Tempo Traveller</option>
                  <option>Luxury Car</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Driver Language</label>
                <select name="driverLang" value={formData.driverLang} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Trip Type</label>
                <select name="tripType" value={formData.tripType} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                  <option>One Way</option>
                  <option>Round Trip</option>
                  <option>Multi-City Tour</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Adults</label>
                  <input type="number" name="adults" value={formData.adults} onChange={handleInputChange} min="1" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
                </div>
                <div className="space-y-1 flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Children</label>
                  <input type="number" name="children" value={formData.children} onChange={handleInputChange} min="0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
