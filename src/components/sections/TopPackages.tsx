"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PACKAGES = [
  {
    id: "201",
    title: "Rajasthan Royal",
    price: "$500 vero",
    location: "Citra ombrace-chen roem sit kuroense",
    image: "/images/rajasthan.png",
  },
  {
    id: "202",
    title: "Amalfi Coast",
    price: "$350 vero",
    location: "Crilo katone forumeooe rion pollarso tie",
    image: "/images/amalfi.png",
  },
  {
    id: "203",
    title: "Amalfi Coast",
    price: "$250 vero",
    location: "Utunvensleler freneritsoe thr as oers meione hies",
    image: "/images/amalfi.png",
  },
  {
    id: "204",
    title: "Pescara",
    price: "$350 vero",
    location: "Duishi nse ek part",
    image: "/images/hero.png",
  },
];

export const TopPackages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const totalWidth = slider.scrollWidth - window.innerWidth;

      gsap.to(slider, {
        x: -totalWidth - 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${slider.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-[#f5f2ed] text-black overflow-hidden py-20">
      <div className="absolute top-20 left-10 md:left-20 z-10 space-y-2">
        <h2 className="text-5xl md:text-8xl font-serif tracking-tighter">Top Packages</h2>
        <p className="font-jost text-xs uppercase tracking-widest text-black/60">Horizomal GSAP slider</p>
      </div>

      <div className="absolute top-20 right-10 md:right-20 z-10 flex gap-4">
        <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black transition-colors">←</button>
        <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black transition-colors">→</button>
      </div>

      <div 
        ref={sliderRef} 
        className="flex gap-10 px-10 md:px-20 h-full items-center pt-32"
        style={{ width: "max-content" }}
      >
        {PACKAGES.map((pkg) => (
          <div 
            key={pkg.id}
            className="group relative w-[280px] md:w-[380px] aspect-[4/5] rounded-[1rem] overflow-hidden bg-white shadow-xl"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute top-0 right-6">
              <div className="bg-[#d4af37]/80 backdrop-blur-sm text-white px-3 py-6 rounded-b-md font-jost text-[10px] font-medium vertical-text">
                {pkg.id}
              </div>
            </div>

            <div className="absolute bottom-10 left-8 right-8">
              <h3 className="text-2xl font-serif text-white">{pkg.title}</h3>
              <p className="text-[9px] font-jost text-white/50 uppercase tracking-widest mt-2 leading-relaxed max-w-[200px]">
                {pkg.location}
              </p>
              <p className="text-xs font-jost text-[#d4af37] font-medium mt-4 uppercase tracking-widest">
                {pkg.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        <div className="w-8 h-1 bg-black/80 rounded-full" />
        <div className="w-2 h-1 bg-black/10 rounded-full" />
        <div className="w-2 h-1 bg-black/10 rounded-full" />
      </div>
    </section>
  );
};
