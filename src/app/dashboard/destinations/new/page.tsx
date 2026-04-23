"use client";
export const dynamic = "force-dynamic";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDestination } from "@/app/actions/destination";
import { toast } from "sonner";

export default function NewDestinationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    region: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createDestination(formData);
      if (result.success) {
        toast.success("Destination added successfully!");
        router.push("/dashboard/destinations");
      } else {
        toast.error("Failed to create destination");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto font-sans pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/destinations" 
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Add Destination</h1>
            <p className="text-gray-500 text-sm mt-1">Create a new location for your packages.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/destinations" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Destination"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Country <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                placeholder="e.g. Italy"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">City/State (Optional)</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g. Rome"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Region (Optional)</label>
            <select 
              name="region" 
              value={formData.region} 
              onChange={handleInputChange} 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm bg-white"
            >
              <option value="">Select Region</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
              <option value="Middle East">Middle East</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe what makes this destination special..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Destination Image URL</label>
            <input 
              type="text" 
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
