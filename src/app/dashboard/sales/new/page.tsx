"use client";
export const dynamic = "force-dynamic";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSale } from "@/app/actions/sale";
import { toast } from "sonner";

import { CustomSelect } from "@/components/ui/CustomSelect";

export default function NewSalePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    heroImage: "",
    isActive: "true",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Sale name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createSale(formData);
      if (result.success) {
        toast.success("Sale campaign published!");
        router.push("/dashboard/sales");
      } else {
        toast.error("Failed to create sale");
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
            href="/dashboard/sales" 
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Create Sale Campaign</h1>
            <p className="text-gray-500 text-sm mt-1">Design a new promotional offer or seasonal sale.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/sales" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Publishing..." : "Publish Sale"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Sale Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Summer Bonanza 2026"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">URL Slug</label>
            <input 
              type="text" 
              value={formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm focus:outline-none"
              readOnly
            />
            <p className="text-[11px] text-gray-400">The URL slug is automatically generated from the sale name.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Explain the terms and duration of the sale..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Hero Image URL</label>
              <input 
                type="text" 
                name="heroImage"
                value={formData.heroImage}
                onChange={handleInputChange}
                placeholder="https://example.com/banner.jpg"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Status</label>
              <CustomSelect 
                options={[
                  { value: "true", label: "Active (Published)" },
                  { value: "false", label: "Draft (Hidden)" },
                ]}
                value={formData.isActive}
                onChange={(val) => handleValueChange("isActive", val)}
                placeholder="Select Status"
                className="!rounded-lg !py-2"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
