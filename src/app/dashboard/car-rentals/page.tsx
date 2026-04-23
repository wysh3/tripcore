import { Plus, Car, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarRentalDeleteButton } from "../components/CarRentalDeleteButton";

export default async function CarRentalsPage() {
  const rentals = await prisma.carRental.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Car Rentals</h1>
          <p className="text-gray-500 text-sm mt-1">Manage private transportation bookings and requests.</p>
        </div>
        <Link 
          href="/dashboard/car-rentals/new" 
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Rental
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trip Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Car Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Dates</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {rentals.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">No rental bookings found.</td></tr>
              ) : (
                rentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rental.fullName}</div>
                      <div className="text-xs text-gray-500">{rental.email}</div>
                      <div className="text-xs text-gray-400">{rental.whatsapp}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {rental.pickupDrop}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        {rental.adults} Adults, {rental.children} Children
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                        {rental.carType}
                      </span>
                      <div className="text-[10px] text-gray-400 mt-1">{rental.tripType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <CarRentalDeleteButton rentalId={rental.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
