"use client";
export const dynamic = "force-dynamic";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/user";
import { toast } from "sonner";

import { CustomSelect } from "@/components/ui/CustomSelect";

export default function NewUserPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "USER",
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
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createUser(formData);
      if (result.success) {
        toast.success("User created successfully!");
        router.push("/dashboard/users");
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto font-sans pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/users" 
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Add New User</h1>
            <p className="text-gray-500 text-sm mt-1">Manually grant access to the platform.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save User"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Jane Smith"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="e.g. jane@example.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">System Role</label>
            <CustomSelect 
              options={[
                { value: "USER", label: "User (Traveler)" },
                { value: "ADMIN", label: "Admin (Staff)" },
                { value: "SUPERADMIN", label: "Super Admin (Manager)" },
              ]}
              value={formData.role}
              onChange={(val) => handleValueChange("role", val)}
              placeholder="Select Role"
              className="!rounded-lg !py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
