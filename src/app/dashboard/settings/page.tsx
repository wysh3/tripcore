"use client";

import { Save, Image as ImageIcon, Layout } from "lucide-react";
import { useState, useEffect } from "react";
import { updateSetting, getSettings } from "@/app/actions/settings";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    hero_bg: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      const data = await getSettings();
      setSettings({
        hero_bg: data.hero_bg || "",
      });
    }
    fetchSettings();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (key: string) => {
    try {
      setIsSubmitting(true);
      const result = await updateSetting(key, settings[key as keyof typeof settings]);
      if (result.success) {
        toast.success(`${key.replace('_', ' ').toUpperCase()} updated successfully`);
      } else {
        toast.error(`Failed to update ${key}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans pb-20">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Site Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure homepage visuals and global configurations.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
            <Layout className="w-4 h-4 text-gray-400" />
            <h2 className="font-semibold text-gray-900">Hero Section</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Background Image URL</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    name="hero_bg"
                    value={settings.hero_bg}
                    onChange={handleInputChange}
                    placeholder="https://example.com/hero.jpg"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gray-900"
                  />
                </div>
                <button 
                  onClick={() => handleSave("hero_bg")}
                  disabled={isSubmitting}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Update
                </button>
              </div>
            </div>
            {settings.hero_bg && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                <img src={settings.hero_bg} alt="Hero Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
