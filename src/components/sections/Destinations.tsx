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
  const [direction, setDirection] = useState(0);

  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter) return;
    const newDir = newFilter === "International" ? 1 : -1;
    setDirection(newDir);
    setFilter(newFilter);
  };

  const filteredDestinations = DESTINATIONS.filter(d => d.category === filter);

  return (
    <section className="min-h-screen flex flex-col justify-center py-12 px-10 md:px-20 relative bg-[#f5f2ed] overflow-hidden">
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

      <div className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
          <div>
            <h2 className="text-[7vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-black/90 uppercase">
              DESTINATIONS
            </h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            {filteredDestinations.map((dest) => (
              <motion.div 
                key={dest.title}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? "20%" : "-20%",
                    opacity: 0
                  }),
                  center: {
                    x: 0,
                    opacity: 1
                  },
                  exit: (direction: number) => ({
                    x: direction > 0 ? "-20%" : "20%",
                    opacity: 0
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
                  opacity: { duration: 0.3 }
                }}
                className="group relative rounded-[1rem] overflow-hidden bg-white shadow-sm h-[200px] md:h-[240px]"
              >
                <img 
                  src={dest.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 pointer-events-none">
                  <h3 className="text-xl font-serif text-white tracking-wide">{dest.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
