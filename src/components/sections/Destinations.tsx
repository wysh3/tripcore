"use client";

import { motion } from "framer-motion";

const DESTINATIONS = [
  {
    title: "Tuscany",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop",
    size: "small",
  },
  {
    title: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    size: "large",
  },
  {
    title: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1965&auto=format&fit=crop",
    size: "small",
  },
  {
    title: "Kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    size: "small",
  },
  {
    title: "Amalfi",
    image: "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=2070&auto=format&fit=crop",
    size: "small",
  },
];

export const Destinations = () => {
  return (
    <section className="py-40 px-6 relative bg-[#f5f2ed] overflow-hidden">
      {/* Organic Wavy Background */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none scale-150">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <path d="M0,500 C150,400 350,600 500,500 C650,400 850,600 1000,500 L1000,1000 L0,1000 Z" fill="none" stroke="black" strokeWidth="20" />
          <path d="M0,450 C150,350 350,550 500,450 C650,350 850,550 1000,450" fill="none" stroke="black" strokeWidth="20" />
          <path d="M0,400 C150,300 350,500 500,400 C650,300 850,500 1000,400" fill="none" stroke="black" strokeWidth="20" />
          <path d="M0,350 C150,250 350,450 500,350 C650,250 850,450 1000,350" fill="none" stroke="black" strokeWidth="20" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="text-6xl md:text-9xl font-serif tracking-tighter">Destinations</h2>
          
          <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-full border border-black/5">
            <button className="px-6 py-2 rounded-full bg-black text-white font-jost text-[10px] uppercase tracking-widest shadow-lg">Domestic</button>
            <button className="px-6 py-2 rounded-full text-black/40 font-jost text-[10px] uppercase tracking-widest hover:text-black transition-all">International</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Specific Grid Layout to match reference image exactly */}
          <motion.div className="row-span-1 col-span-1 rounded-[1rem] overflow-hidden">
            <img src={DESTINATIONS[0].image} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="row-span-3 col-span-1 rounded-[1rem] overflow-hidden">
            <img src={DESTINATIONS[1].image} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="row-span-1 col-span-1 rounded-[1rem] overflow-hidden">
            <img src={DESTINATIONS[2].image} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="row-span-2 col-span-1 rounded-[1rem] overflow-hidden">
            <img src={DESTINATIONS[3].image} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="row-span-2 col-span-1 rounded-[1rem] overflow-hidden">
            <img src={DESTINATIONS[4].image} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="row-span-2 col-span-1 rounded-[1rem] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-20 gap-2">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
          <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
          <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
          <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
        </div>
      </div>
    </section>
  );
};
