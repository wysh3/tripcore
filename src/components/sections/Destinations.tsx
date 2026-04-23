"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface DestinationItem {
  title: string;
  image: string;
  category: string;
}

interface DestinationsProps {
  destinations: DestinationItem[];
}

export const Destinations = ({ destinations }: DestinationsProps) => {
  const [filter, setFilter] = useState("International");
  const [direction, setDirection] = useState(0);

  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter) return;
    const newDir = newFilter === "International" ? 1 : -1;
    setDirection(newDir);
    setFilter(newFilter);
  };

  const filteredDestinations = destinations.filter(d => d.category === filter);

  return (
    <section className="min-h-screen flex flex-col justify-center py-24 px-10 md:px-20 relative bg-[#f5f2ed] overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
        }}
      >
        <img 
          src="/images/ripples.png" 
          alt="Water Ripples Background" 
          className="w-full h-full object-cover mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <Link 
              href="/packages" 
              className="group inline-flex items-center gap-4 hover:text-black/60 transition-all duration-500"
            >
              <h2 className="text-[7vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-black/90 uppercase">
                DESTINATIONS
              </h2>
              <ArrowUpRight className="w-[4vw] h-[4vw] text-black/10 stroke-[1px] group-hover:text-black group-hover:stroke-[2.5px] group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500" />
            </Link>
          </div>
          
          <div className="relative flex bg-white/40 backdrop-blur-md p-1 rounded-full border border-black/5 mb-4">
            {["Domestic", "International"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`relative z-10 px-6 py-2 rounded-full font-jost font-semibold text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                  filter === cat ? "text-white" : "text-black/40 hover:text-black"
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-black rounded-full -z-10 shadow-lg"
                    transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full relative h-[480px] md:h-[580px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
              {filteredDestinations.map((dest) => (
                <Link 
                  key={dest.title}
                  href={`/packages?destination=${encodeURIComponent(dest.title)}`}
                  className="group relative rounded-[1rem] overflow-hidden bg-white shadow-sm h-[200px] md:h-[260px] cursor-pointer"
                >
                  <img 
                    src={dest.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={dest.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 pointer-events-none">
                    <h3 className="text-xl font-serif text-white tracking-wide">{dest.title}</h3>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
