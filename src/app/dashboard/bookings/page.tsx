import { CalendarDays, DollarSign, CheckCircle2, Clock, CheckSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { EnquiryStatusSelect } from "../components/EnquiryStatusSelect";

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      package: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const confirmedBookings = bookings.filter(b => b.status === "CONFIRMED").length;
  const pendingBookings = bookings.filter(b => b.status === "PENDING").length;
  const completedBookings = bookings.filter(b => b.status === "COMPLETED").length;

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => e.status === "NEW").length;
  const contactedEnquiries = enquiries.filter(e => e.status === "CONTACTED").length;
  const convertedEnquiries = enquiries.filter(e => e.status === "CONVERTED").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-20">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Bookings &amp; Enquiries</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all your customer reservations and inbound queries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 p-2 rounded-lg"><CalendarDays className="w-5 h-5 text-blue-600" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Bookings</p>
          <h3 className="text-2xl font-semibold text-gray-900">{totalBookings}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-emerald-50 p-2 rounded-lg"><DollarSign className="w-5 h-5 text-emerald-600" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Total Revenue</p>
          <h3 className="text-2xl font-semibold text-gray-900">${totalRevenue.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-50 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Confirmed</p>
          <h3 className="text-2xl font-semibold text-gray-900">{confirmedBookings}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-yellow-50 p-2 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Pending</p>
          <h3 className="text-2xl font-semibold text-gray-900">{pendingBookings}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-50 p-2 rounded-lg"><CheckSquare className="w-5 h-5 text-purple-600" /></div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Completed</p>
          <h3 className="text-2xl font-semibold text-gray-900">{completedBookings}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookings Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center shrink-0">
            <h2 className="font-semibold text-gray-900">All Bookings</h2>
            <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-medium">{totalBookings} Total</span>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white sticky top-0 z-10 shadow-sm">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Package</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {bookings.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-500">No bookings yet.</td></tr>
                ) : bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{b.user.name || "Unknown"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[150px]">{b.package.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${b.totalAmount}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        b.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                        b.status === "COMPLETED" ? "bg-purple-100 text-purple-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enquiries Overview */}
        <div className="space-y-6 flex flex-col">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total</p>
              <h3 className="text-xl font-semibold text-gray-900">{totalEnquiries}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs text-blue-500 font-medium uppercase tracking-wider mb-1">New</p>
              <h3 className="text-xl font-semibold text-blue-600">{newEnquiries}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs text-orange-500 font-medium uppercase tracking-wider mb-1">Contacted</p>
              <h3 className="text-xl font-semibold text-orange-600">{contactedEnquiries}</h3>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
              <p className="text-xs text-green-500 font-medium uppercase tracking-wider mb-1">Converted</p>
              <h3 className="text-xl font-semibold text-green-600">{convertedEnquiries}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[395px]">
            <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center shrink-0">
              <h2 className="font-semibold text-gray-900">Recent Enquiries</h2>
            </div>
            <div className="overflow-y-auto flex-1 p-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {enquiries.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500">No enquiries found.</td></tr>
                  ) : enquiries.map(e => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{e.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-[200px]">{e.message}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <EnquiryStatusSelect enquiryId={e.id} currentStatus={e.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
