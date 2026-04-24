"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Package,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  Tag,
  Star,
  Car,
  MessageSquare
} from "lucide-react";
import clsx from "clsx";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Packages", href: "/dashboard/packages", icon: Package },
  { name: "Destinations", href: "/dashboard/destinations", icon: MapPin },
  { name: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  { name: "Enquiries", href: "/dashboard/enquiries", icon: MessageSquare },
  { name: "Sales", href: "/dashboard/sales", icon: Tag },
  { name: "Reviews", href: "/dashboard/reviews", icon: Star },
  { name: "Car Rentals", href: "/dashboard/car-rentals", icon: Car },
  { name: "Users", href: "/dashboard/users", icon: Users },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex h-full shadow-sm font-sans">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-gray-900">
          TripCore Admin
        </Link>
      </div>

      <div className="px-4 py-6 overflow-y-auto flex-1" data-lenis-prevent>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ml-2">Menu</p>
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-gray-900" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-4 py-4 border-t border-gray-200">
        <div className="flex flex-col gap-1">
          <Link
            href="/dashboard/settings"
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <Settings className="w-5 h-5 text-gray-400" />
            Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-red-600 hover:bg-red-50 w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
