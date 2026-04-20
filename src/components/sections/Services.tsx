"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    id: "01",
    title: "Travel through Photos",
    image: "https://images.unsplash.com/photo-1449156001931-828332764303?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Cinematic Masoury",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Typographic Services",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Filhay film Textures",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Travel & Services",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: "06",
    title: "Femeroff Flights",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
  },
];

export const Services = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  return (
    <section className="py-40 px-6 bg-[#f5f2ed] text-black border-t border-black/5">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2 space-y-12">
            <h2 className="text-7xl md:text-9xl font-serif tracking-tighter">Services</h2>

            <div className="space-y-0">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveId(service.id)}
                  className="group py-6 border-b border-black/10 cursor-pointer flex justify-between items-center"
                >
                  <h3 className={`text-2xl md:text-4xl font-serif transition-all duration-500 ${
                    activeId === service.id ? "text-black translate-x-2" : "text-black/40"
                  }`}>
                    {service.title}
                  </h3>
                  <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square rounded-[1rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-[1rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-[1rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="relative aspect-video rounded-[1rem] overflow-hidden group">
              <img
                src={SERVICES.find(s => s.id === activeId)?.image}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
