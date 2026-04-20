"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DESTINATIONS = [
  {
    title: "Tuscany",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop",
    category: "International",
  },
  {
    title: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    category: "International",
  },
  {
    title: "Jaipur",
    image: "/images/rajasthan.png",
    category: "Domestic",
  },
  {
    title: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965&auto=format&fit=crop",
    category: "International",
  },
  {
    title: "Amalfi",
    image: "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=2070&auto=format&fit=crop",
    category: "International",
  },
  {
    title: "Leh",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    category: "Domestic",
  },
];

export const Destinations = () => {
  const [filter, setFilter] = useState("International");
  const filteredDestinations = DESTINATIONS.filter(d => d.category === filter);

  return (
    <section className="py-40 px-6 relative bg-[#f5f2ed] overflow-hidden">
      {/* Actual Ripples Background Image with Seamless Blending */}
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

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="text-6xl md:text-9xl font-serif tracking-tighter">Destinations</h2>
          
          <div className="relative flex bg-white/40 backdrop-blur-md p-1 rounded-full border border-black/5">
            {["Domestic", "International"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative z-10 px-8 py-3 rounded-full font-jost text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest, idx) => (
              <motion.div 
                key={dest.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="group relative rounded-[1rem] overflow-hidden bg-white shadow-sm"
              >
                <img 
                  src={dest.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 pointer-events-none">
                  <h3 className="text-3xl font-serif text-white tracking-wide">{dest.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-20 gap-3">
          <div className="w-8 h-1.5 bg-black rounded-full" />
          <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
          <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
        </div>
      </div>
    </section>
  );
};
