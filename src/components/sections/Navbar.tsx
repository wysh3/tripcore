"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
          <a 
            href="#" 
            className={`text-3xl font-serif tracking-tighter transition-colors duration-500 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            TRIPCORE
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-12">
          {["Journeys", "Experiences", "About", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`font-jost text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${
                isScrolled ? "text-black/60 hover:text-accent-blue" : "text-white/70 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <button 
          className={`px-8 py-3 rounded-full font-jost text-[10px] uppercase tracking-widest transition-all duration-500 shadow-lg ${
            isScrolled 
              ? "bg-black text-white hover:bg-accent-blue" 
              : "bg-white/90 backdrop-blur-md text-black hover:bg-white"
          }`}
        >
          Book Now
        </button>
      </div>
    </motion.nav>
  );
};
