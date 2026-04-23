"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, Compass, Briefcase, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BookingModal } from "./BookingModal";

export const MobileNavbar = () => {
  const pathname = usePathname();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up for better immersion
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Packages", href: "/packages", icon: Compass },
    { name: "Services", href: "/services", icon: Briefcase },
  ];

  // Don't show in dashboard
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] lg:hidden w-[90%] max-w-[400px]"
          >
            <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between">
              <div className="flex items-center gap-1 px-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative p-4 rounded-2xl transition-colors group"
                    >
                      <item.icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive ? "text-white scale-110" : "text-white/40 group-hover:text-white/70"
                        }`}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white/10 rounded-2xl -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-white text-black p-4 rounded-2xl flex items-center gap-2 group transition-all duration-300 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest pr-2">Book</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
};
