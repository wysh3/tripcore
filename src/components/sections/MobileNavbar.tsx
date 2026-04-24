"use client";

import { motion } from "framer-motion";
import { Home, Compass, Briefcase, Plus, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookingModal } from "./BookingModal";

export const MobileNavbar = () => {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) return null;
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Packages", href: "/packages", icon: Compass },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Enquire", href: "/enquiry", icon: MessageSquare },
  ];

  // Don't show in dashboard or login
  if (pathname?.startsWith("/dashboard") || pathname === "/login") return null;

  return (
    <>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-6 left-4 right-4 z-[100] lg:hidden flex justify-center"
      >
        <div className="w-full max-w-[420px] bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center">
          <div className="flex-1 flex items-center justify-around px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative p-4 rounded-[1.8rem] transition-colors group"
                >
                  <item.icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? "text-white scale-110" : "text-white/40 group-hover:text-white/70"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-[1.8rem] -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-white text-black p-4 px-6 rounded-[1.8rem] flex items-center gap-2 group transition-all duration-300 active:scale-95 shadow-lg flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest pr-1">Reserve</span>
          </button>
        </div>
      </motion.div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
};
