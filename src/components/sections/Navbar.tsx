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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "py-4" : "py-10"
      }`}
    >
      <div className="max-w-[95%] mx-auto flex items-center justify-between px-10">
        <div className="flex items-center gap-16">
          <a href="#" className="text-3xl font-serif tracking-tighter text-white mix-blend-difference">
            TRIPCORE
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-12">
          {["Journeys", "Experiences", "About", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-jost text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="bg-white/90 backdrop-blur-md text-black px-8 py-3 rounded-sm font-jost text-[10px] uppercase tracking-widest hover:bg-white transition-all">
          Book Now
        </button>
      </div>
    </motion.nav>
  );
};
