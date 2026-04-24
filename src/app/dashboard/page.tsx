export const dynamic = "force-dynamic";
import { 
  Package, 
  MapPin, 
  CalendarDays, 
  Users, 
  Tag, 
  Star, 
  Car,
  TrendingUp,
  ArrowUpRight,
  Activity,
  DollarSign,
  Clock
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardOverview() {
  const [
    packagesCount,
    destinationsCount,
    bookingsCount,
    usersCount,
    salesCount,
    reviewsCount,
    rentalsCount,
    pendingBookingsCount,
    revenueAgg,
    recentLogs
  ] = await Promise.all([
    prisma.package.count(),
    prisma.destination.count(),
    prisma.booking.count(),
    prisma.user.count(),
    prisma.sale.count(),
    prisma.review.count(),
    prisma.carRental.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.aggregate({ _sum: { totalAmount: true } }),
    prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  const totalRevenue = revenueAgg._sum.totalAmount ?? 0;

  const stats = [
    { name: "Total Users", value: usersCount, icon: Users, color: "bg-orange-500" },
    { name: "Total Bookings", value: bookingsCount, icon: CalendarDays, color: "bg-purple-500" },
    { name: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-emerald-500" },
    { name: "Total Packages", value: packagesCount, icon: Package, color: "bg-blue-500" },
    { name: "Destinations", value: destinationsCount, icon: MapPin, color: "bg-cyan-500" },
    { name: "Pending Bookings", value: pendingBookingsCount, icon: Clock, color: "bg-yellow-500" },
  ];

  const secondaryStats = [
    { name: "Active Sales", value: salesCount, icon: Tag, color: "text-blue-600" },
    { name: "Reviews", value: reviewsCount, icon: Star, color: "text-yellow-600" },
    { name: "Car Rentals", value: rentalsCount, icon: Car, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8 font-sans pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-sans">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
            <TrendingUp className="w-3 h-3" />
            System Live
          </div>
        </div>
      </div>

      {/* Main Stats Grid — all 6 spec-required stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-110 ${stat.color}`} />
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl text-white ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold text-gray-900 tabular-nums">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Secondary Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h2 className="font-bold text-gray-900 font-sans">Activity Overview</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {secondaryStats.map((item) => (
                <div key={item.name} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">Quick Actions</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">Jump to common tasks quickly.</p>
              <div className="flex flex-col gap-2">
                <Link href="/dashboard/packages/new" className="inline-block bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors text-center">
                  New Package
                </Link>
                <Link href="/dashboard/destinations/new" className="inline-block bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors text-center">
                  New Destination
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity Logs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
            <h2 className="font-bold text-gray-900 font-sans">System Activity</h2>
          </div>
          <div className="p-6 space-y-6 flex-1">
            {recentLogs.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-xs text-gray-400">No recent activity found.</p>
              </div>
            ) : recentLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{log.action}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{log.details}</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">
              View All Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
