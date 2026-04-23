"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  variant?: "light" | "dark";
}

import { BookingModal } from "./BookingModal";

export const Navbar = ({ variant }: NavbarProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Auto-determine variant based on route
  const isDarkPageRoute = pathname.startsWith("/packages") || pathname.startsWith("/services") || pathname.startsWith("/dashboard");
  const isDark = isDarkPageRoute || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
      >
        <div 
          className={`
            mt-6 px-10 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto
            ${isScrolled 
              ? "w-[90%] md:w-[70%] bg-white/80 backdrop-blur-2xl border border-black/5 rounded-full py-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
              : "w-[95%] py-6 bg-transparent border-transparent"
            }
          `}
        >
          <div className="flex items-center gap-16">
            <Link 
              href="/" 
              className="transition-opacity duration-500 hover:opacity-70"
            >
              <img 
                src="/logo.png" 
                alt="TRIPCORE" 
                className={`h-10 md:h-14 w-auto object-contain ${isDark ? "brightness-0" : "brightness-0 invert"}`} 
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            {[
              { name: "Packages", href: "/packages" },
              { name: "Services", href: "/services" },
              { name: "About", href: "/about" },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`font-jost text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors duration-500 ${
                  isDark ? "text-black/60 hover:text-accent-blue" : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setIsBookingOpen(true)}
              className={`font-jost text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors duration-500 ${
                isDark ? "text-black/60 hover:text-accent-blue" : "text-white/70 hover:text-white"
              }`}
            >
              Contact
            </button>
          </div>

          <button 
            onClick={() => setIsBookingOpen(true)}
            className={`hidden md:flex px-8 py-3 rounded-full font-jost text-[11px] font-semibold uppercase tracking-widest transition-all duration-500 shadow-lg ${
              isDark 
                ? "bg-black text-white hover:bg-accent-blue" 
                : "bg-white/90 backdrop-blur-md text-black hover:bg-white"
            }`}
          >
            Book Now
          </button>
        </div>
      </motion.nav>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
};
