"use client";

import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPackage } from "@/app/actions/package";
import { getPackageFormContext } from "@/app/actions/get-package-context";
import { toast } from "sonner";

const TOUR_TYPE_OPTIONS = [
  "Group Tour",
  "Private Tour",
  "Solo Tour",
  "Family Tour",
  "Honeymoon Tour",
  "Adventure Tour",
  "Cultural Tour",
  "Luxury Tour",
];

export default function NewPackagePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destinations, setDestinations] = useState<{ id: string; country: string; city: string | null }[]>([]);
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "", destination: "", durationDays: "", maxPersons: "", tourCategory: "", 
    accommodation: "", citiesRoute: "", ageRange: "", 
    isCustomizable: false, flightsIncluded: false, bestPriceGuarantee: false,
    mainImage: "", mapImage: "", shortDescription: "", highlights: "", specialNotes: "", tags: "",
    sellingPrice: "", originalPrice: "", discountLabel: "",
    pdfBrochure: "", inclusions: "", exclusions: "", cancellationPolicy: "", galleryImages: "",
    departureType: "fixed", departurePoints: ""
  });

  const [itineraryDays, setItineraryDays] = useState([
    { title: "", duration: "", description: "" }
  ]);

  const [departures, setDepartures] = useState([
    { startDate: "", seatsLeft: "", priceOverride: "" }
  ]);

  useEffect(() => {
    async function loadContext() {
      const { destinations: dests } = await getPackageFormContext();
      setDestinations(dests);
    }
    loadContext();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value
    }));
  };

  const toggleTourType = (type: string) => {
    setSelectedTourTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async () => {
    if (!formData.title) { toast.error("Package title is required"); return; }
    if (!formData.durationDays) { toast.error("Duration is required"); return; }
    if (!formData.sellingPrice) { toast.error("Selling price is required"); return; }

    try {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        tourTypes: selectedTourTypes.join(", "),
        itineraryDays,
        departures
      };
      const result = await createPackage(payload);
      if (result.success) {
        toast.success("Package published successfully!");
        router.push("/dashboard/packages");
      } else {
        toast.error("Failed to create package");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addItineraryDay = () => setItineraryDays([...itineraryDays, { title: "", duration: "", description: "" }]);
  const removeItineraryDay = (index: number) => setItineraryDays(itineraryDays.filter((_, i) => i !== index));
  const updateItineraryDay = (index: number, field: string, value: string) => {
    const newDays = [...itineraryDays];
    newDays[index] = { ...newDays[index], [field]: value };
    setItineraryDays(newDays);
  };

  const addDeparture = () => setDepartures([...departures, { startDate: "", seatsLeft: "", priceOverride: "" }]);
  const removeDeparture = (index: number) => setDepartures(departures.filter((_, i) => i !== index));
  const updateDeparture = (index: number, field: string, value: string) => {
    const newDepartures = [...departures];
    newDepartures[index] = { ...newDepartures[index], [field]: value };
    setDepartures(newDepartures);
  };

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm";
  const labelCls = "text-sm font-medium text-gray-900";

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/packages" 
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Create Package</h1>
            <p className="text-gray-500 text-sm mt-1">Add a new travel destination package.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Save Draft
          </button>
          <button 
            type="button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Publishing..." : "Publish Package"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50 flex overflow-x-auto no-scrollbar">
          {["basic", "content", "pricing", "itinerary", "departures"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* ── BASIC INFO TAB ── */}
            <div className={`space-y-6 ${activeTab === "basic" ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelCls}>Package Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" name="title" value={formData.title} onChange={handleInputChange}
                    placeholder="e.g. Amalfi Coast Luxury Retreat"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>URL Slug</label>
                  <input 
                    type="text" 
                    value={formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm focus:outline-none"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className={labelCls}>Destination</label>
                  <select name="destination" value={formData.destination} onChange={handleInputChange} className={`${inputCls} bg-white`}>
                    <option value="">Select Destination</option>
                    {destinations.length === 0 ? (
                      <option disabled>No destinations yet — add one first</option>
                    ) : (
                      destinations.map(d => (
                        <option key={d.id} value={d.city ? `${d.city}, ${d.country}` : d.country}>
                          {d.city ? `${d.city}, ${d.country}` : d.country}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Duration (Days) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" name="durationDays" value={formData.durationDays} onChange={handleInputChange}
                    placeholder="7"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Max Persons</label>
                  <input 
                    type="number" name="maxPersons" value={formData.maxPersons} onChange={handleInputChange}
                    placeholder="12"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tour Types — multi-select chip group */}
                <div className="space-y-2">
                  <label className={labelCls}>Tour Types</label>
                  <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg min-h-[44px]">
                    {TOUR_TYPE_OPTIONS.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleTourType(type)}
                        className={`text-xs px-3 py-1 rounded-full border font-medium transition-all ${
                          selectedTourTypes.includes(type)
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {selectedTourTypes.length > 0 && (
                    <p className="text-xs text-gray-400">Selected: {selectedTourTypes.join(", ")}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Tour Category</label>
                  <select name="tourCategory" value={formData.tourCategory} onChange={handleInputChange} className={`${inputCls} bg-white`}>
                    <option value="">Select Category</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Family">Family</option>
                    <option value="Budget">Budget</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className={labelCls}>Accommodation</label>
                  <input 
                    type="text" name="accommodation" value={formData.accommodation} onChange={handleInputChange}
                    placeholder="e.g. 5 Star Hotels"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Cities/Route</label>
                  <input 
                    type="text" name="citiesRoute" value={formData.citiesRoute} onChange={handleInputChange}
                    placeholder="e.g. Rome - Florence - Venice"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Age Range</label>
                  <input 
                    type="text" name="ageRange" value={formData.ageRange} onChange={handleInputChange}
                    placeholder="e.g. 18-65+"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Package Features</h3>
                <div className="flex flex-wrap gap-6">
                  {[
                    { name: "isCustomizable", label: "Trip Customizable" },
                    { name: "flightsIncluded", label: "Flights Included" },
                    { name: "bestPriceGuarantee", label: "Best Price Guarantee" },
                  ].map(({ name, label }) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name as keyof typeof formData] as boolean}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CONTENT TAB ── */}
            <div className={`space-y-6 ${activeTab === "content" ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelCls}>Main Package Image URL</label>
                  <input 
                    type="text" name="mainImage" value={formData.mainImage} onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Map/Route Image URL</label>
                  <input 
                    type="text" name="mapImage" value={formData.mapImage} onChange={handleInputChange}
                    placeholder="https://example.com/map.jpg"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Short Description</label>
                <textarea 
                  rows={3} name="shortDescription" value={formData.shortDescription} onChange={handleInputChange}
                  placeholder="Briefly describe the tour experience..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Highlights</label>
                <textarea 
                  rows={4} name="highlights" value={formData.highlights} onChange={handleInputChange}
                  placeholder="Enter highlights, one per line..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Special Notes</label>
                <textarea 
                  rows={2} name="specialNotes" value={formData.specialNotes} onChange={handleInputChange}
                  placeholder="Any specific instructions or requirements..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Tags (Comma separated)</label>
                <input 
                  type="text" name="tags" value={formData.tags} onChange={handleInputChange}
                  placeholder="Luxury, Honeymoon, Summer"
                  className={inputCls}
                />
              </div>
            </div>

            {/* ── PRICING TAB ── */}
            <div className={`space-y-6 ${activeTab === "pricing" ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelCls}>Selling Price ($) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange}
                    placeholder="4500"
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Original Price ($) — Optional</label>
                  <input 
                    type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange}
                    placeholder="5000"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Discount/Savings Label</label>
                <input 
                  type="text" name="discountLabel" value={formData.discountLabel} onChange={handleInputChange}
                  placeholder="Save $500!"
                  className={inputCls}
                />
              </div>
            </div>

            {/* ── ITINERARY TAB ── */}
            <div className={`space-y-8 ${activeTab === "itinerary" ? "block" : "hidden"}`}>
              <div className="space-y-2">
                <label className={labelCls}>Package PDF Brochure URL</label>
                <input 
                  type="text" name="pdfBrochure" value={formData.pdfBrochure} onChange={handleInputChange}
                  placeholder="https://example.com/brochure.pdf"
                  className={inputCls}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900">Day-wise Itinerary</h3>
                  <button 
                    type="button" 
                    onClick={addItineraryDay}
                    className="text-xs font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Day
                  </button>
                </div>
                
                {itineraryDays.map((day, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50 relative group">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        type="button"
                        onClick={() => removeItineraryDay(index)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700">Day {index + 1} Title</label>
                        <input 
                          type="text" 
                          value={day.title}
                          onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                          placeholder="e.g. Arrival in Rome"
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700">Duration</label>
                        <input 
                          type="text" 
                          value={day.duration}
                          onChange={(e) => updateItineraryDay(index, 'duration', e.target.value)}
                          placeholder="e.g. Full Day"
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Description</label>
                      <textarea 
                        rows={3}
                        value={day.description}
                        onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                        placeholder="Describe the activities for this day..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelCls}>Inclusions</label>
                  <textarea 
                    rows={4} name="inclusions" value={formData.inclusions} onChange={handleInputChange}
                    placeholder="What is included (one per line)..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Exclusions</label>
                  <textarea 
                    rows={4} name="exclusions" value={formData.exclusions} onChange={handleInputChange}
                    placeholder="What is NOT included (one per line)..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Cancellation Policy</label>
                <textarea 
                  rows={3} name="cancellationPolicy" value={formData.cancellationPolicy} onChange={handleInputChange}
                  placeholder="Enter cancellation terms..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Gallery Images (Comma separated URLs)</label>
                <textarea 
                  rows={3} name="galleryImages" value={formData.galleryImages} onChange={handleInputChange}
                  placeholder="https://img1.jpg, https://img2.jpg"
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            {/* ── DEPARTURES TAB ── */}
            <div className={`space-y-8 ${activeTab === "departures" ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelCls}>Departure Type</label>
                  <select name="departureType" value={formData.departureType} onChange={handleInputChange} className={`${inputCls} bg-white`}>
                    <option value="fixed">Fixed Dates</option>
                    <option value="daily">Daily Departures</option>
                    <option value="weekly">Weekly Departures</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Departure Points</label>
                  <input 
                    type="text" name="departurePoints" value={formData.departurePoints} onChange={handleInputChange}
                    placeholder="e.g. Rome, Milan, Venice"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900">Upcoming Departure Dates</h3>
                  <button 
                    type="button" 
                    onClick={addDeparture}
                    className="text-xs font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Date
                  </button>
                </div>
                
                {departures.map((dep, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50 items-end">
                    <div className="space-y-2 flex-1 w-full">
                      <label className="text-xs font-medium text-gray-700">Start Date</label>
                      <input 
                        type="date" 
                        value={dep.startDate}
                        onChange={(e) => updateDeparture(index, 'startDate', e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2 w-full sm:w-32">
                      <label className="text-xs font-medium text-gray-700">Seats Left</label>
                      <input 
                        type="number" 
                        value={dep.seatsLeft}
                        onChange={(e) => updateDeparture(index, 'seatsLeft', e.target.value)}
                        placeholder="12"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2 w-full sm:w-40">
                      <label className="text-xs font-medium text-gray-700">Price Override ($)</label>
                      <input 
                        type="number" 
                        value={dep.priceOverride}
                        onChange={(e) => updateDeparture(index, 'priceOverride', e.target.value)}
                        placeholder="Leave blank for default"
                        className={inputCls}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeDeparture(index)}
                      className="px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
