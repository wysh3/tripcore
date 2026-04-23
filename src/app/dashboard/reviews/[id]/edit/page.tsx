"use client";

import { ArrowLeft, Save, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateReview, getReview } from "@/app/actions/review";
import { getReviewFormContext } from "@/app/actions/get-review-context";
import { toast } from "sonner";

export default function EditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const reviewId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [context, setContext] = useState<{packages: any[], destinations: any[]}>({ packages: [], destinations: [] });

  const [formData, setFormData] = useState({
    customerName: "",
    rating: "5",
    text: "",
    videoUrl: "",
    packageId: "",
    destinationId: "",
  });

  useEffect(() => {
    async function load() {
      const [reviewData, contextData] = await Promise.all([
        getReview(reviewId),
        getReviewFormContext(),
      ]);
      if (reviewData) {
        setFormData({
          customerName: reviewData.customerName,
          rating: reviewData.rating.toString(),
          text: reviewData.text ?? "",
          videoUrl: reviewData.videoUrl ?? "",
          packageId: reviewData.packageId ?? "",
          destinationId: reviewData.destinationId ?? "",
        });
      }
      setContext(contextData);
      setIsLoading(false);
    }
    load();
  }, [reviewId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName) {
      toast.error("Customer name is required");
      return;
    }
    try {
      setIsSubmitting(true);
      const result = await updateReview(reviewId, formData);
      if (result.success) {
        toast.success("Review updated successfully!");
        router.push("/dashboard/reviews");
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto font-sans pt-16 text-center text-gray-500 text-sm">
        Loading review...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto font-sans pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/reviews" 
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Edit Review</h1>
            <p className="text-gray-500 text-sm mt-1">Update the customer review details.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/reviews" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Customer Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              placeholder="e.g. John Doe"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Link to Package</label>
              <select 
                name="packageId" 
                value={formData.packageId} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm bg-white"
              >
                <option value="">None / All Packages</option>
                {context.packages.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Link to Destination</label>
              <select 
                name="destinationId" 
                value={formData.destinationId} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm bg-white"
              >
                <option value="">None / All Destinations</option>
                {context.destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.city ? `${d.city}, ${d.country}` : d.country}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Rating (1-5 Stars)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star.toString() }))}
                  className={`p-2 rounded-lg border transition-all ${
                    Number(formData.rating) >= star 
                      ? "border-yellow-400 bg-yellow-50 text-yellow-500" 
                      : "border-gray-200 text-gray-300 hover:border-gray-300"
                  }`}
                >
                  <Star className={`w-6 h-6 ${Number(formData.rating) >= star ? "fill-current" : ""}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Review Text</label>
            <textarea 
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              rows={5}
              placeholder="Enter the customer testimonial here..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Video URL (Optional)</label>
            <input 
              type="text" 
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="https://youtube.com/..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
