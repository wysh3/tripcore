export const dynamic = "force-dynamic";
import { Plus, Star, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ReviewDeleteButton } from "../components/ReviewDeleteButton";

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
    : 0;
  const fiveStarReviews = reviews.filter(r => r.rating === 5).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Review Management</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor and manage customer testimonials and feedback.</p>
        </div>
        <Link 
          href="/dashboard/reviews/new" 
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium mb-1">Total Reviews</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalReviews}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium mb-1">Average Rating</p>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-bold text-gray-900">{averageRating}</h3>
            <div className="flex text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium mb-1">5-Star Reviews</p>
          <h3 className="text-3xl font-bold text-gray-900">{fiveStarReviews}</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Recent Reviews</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {reviews.length === 0 ? (
            <div className="py-12 text-center text-gray-500">No reviews found.</div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors flex gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm flex-shrink-0 relative overflow-hidden">
                  {review.image ? (
                    <Image src={review.image} alt="" fill className="object-cover" />
                  ) : (
                    review.customerName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-gray-900">{review.customerName}</h4>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {review.videoUrl && <Video className="w-4 h-4 text-blue-500" />}
                      <Link
                        href={`/dashboard/reviews/${review.id}/edit`}
                        className="text-xs text-gray-500 hover:text-gray-900 font-medium border border-gray-200 px-2 py-0.5 rounded transition-colors"
                      >
                        Edit
                      </Link>
                      <ReviewDeleteButton reviewId={review.id} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {review.text || "No review text provided."}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-3 uppercase tracking-wider font-semibold">
                    {new Date(review.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
