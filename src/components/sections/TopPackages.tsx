"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PACKAGES = [
  {
    id: "201",
    title: "Rajasthan Royal",
    price: "$500",
    location: "Jaipur, India",
    image: "/images/rajasthan.png",
  },
  {
    id: "202",
    title: "Amalfi Coast",
    price: "$350",
    location: "Positano, Italy",
    image: "/images/amalfi.png",
  },
  {
    id: "203",
    title: "Tuscan Hills",
    price: "$450",
    location: "Florence, Italy",
    image: "/images/amalfi.png",
  },
  {
    id: "204",
    title: "Desert Oasis",
    price: "$600",
    location: "Jodhpur, India",
    image: "/images/rajasthan.png",
  },
  {
    id: "205",
    title: "Venice Serenade",
    price: "$300",
    location: "Venice, Italy",
    image: "/images/hero.png",
  },
  {
    id: "206",
    title: "Himalayan Peak",
    price: "$750",
    location: "Leh, India",
    image: "/images/rajasthan.png",
  },
];

export const TopPackages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Smooth scroll function using GSAP for "fluid asf" movement
  const smoothScroll = (distance: number) => {
    if (!sliderRef.current) return;
    const target = sliderRef.current.scrollLeft + distance;
    gsap.to(sliderRef.current, {
      scrollLeft: target,
      duration: 1.2,
      ease: "power3.out",
      overwrite: true
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let velocity = 0;
    let rafId: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      slider.classList.add("cursor-grabbing");
      slider.classList.remove("cursor-grab");
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
      cancelAnimationFrame(rafId);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.5; // Multiplier for sensitivity
      const prevScroll = slider.scrollLeft;
      slider.scrollLeft = scrollLeft.current - walk;
      velocity = slider.scrollLeft - prevScroll;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      slider.classList.remove("cursor-grabbing");
      slider.classList.add("cursor-grab");
      
      // Momentum Scroll
      const momentum = () => {
        if (Math.abs(velocity) < 0.1) return;
        slider.scrollLeft += velocity;
        velocity *= 0.95; // Friction
        rafId = requestAnimationFrame(momentum);
      };
      momentum();
    };

    slider.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    const ctx = gsap.context(() => {
      gsap.from(".package-card", {
        x: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      slider.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-[#f5f2ed] text-black overflow-hidden relative">
      <div className="container mx-auto px-10 md:px-20 mb-16 flex justify-between items-center">
        <div>
          <h2 className="text-6xl md:text-7xl font-serif tracking-tight text-black/90">Top Packages</h2>
        </div>

        <div className="flex gap-10 items-center">
          {/* Left Arrow - Unbreakable single path lengthening */}
          <button
            onClick={() => smoothScroll(-450)}
            className="group flex items-center text-black/40 hover:text-black transition-all duration-500 py-4 px-2"
          >
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
              <path 
                d="M40 12H6M6 12L12 6M6 12L12 18" 
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-all duration-500 [d:path('M60_12H6M6_12L12_6M6_12L12_18')] group-hover:[d:path('M60_12H-10M-10_12L-4_6M-10_12L-4_18')]"
              />
            </svg>
          </button>

          {/* Right Arrow - Unbreakable single path lengthening */}
          <button
            onClick={() => smoothScroll(450)}
            className="group flex items-center text-black/40 hover:text-black transition-all duration-500 py-4 px-2"
          >
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
              <path 
                d="M20 12H54M54 12L48 6M54 12L48 18" 
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-all duration-500 [d:path('M0_12H54M54_12L48_6M54_12L48_18')] group-hover:[d:path('M0_12H70M70_12L64_6M70_12L64_18')]"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-6 px-10 md:px-20 overflow-x-auto no-scrollbar cursor-grab select-none pb-10"
      >
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="package-card group relative flex-shrink-0 w-[320px] md:w-[420px] aspect-[10/16] rounded-[1rem] overflow-hidden bg-white snap-start pointer-events-none md:pointer-events-auto"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black/60 to-transparent backdrop-blur-[2px] pointer-events-none">
              <div className="flex justify-between items-end gap-4 text-white">
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-serif leading-tight">{pkg.title}</h3>
                  <p className="text-[10px] font-jost text-white/60 uppercase tracking-[0.1em] leading-relaxed max-w-[200px]">
                    {pkg.location} — Exclusive journey through hidden architectural gems.
                  </p>
                </div>
                <div className="text-right flex-shrink-0 mb-1">
                  <span className="text-lg font-serif opacity-90">{pkg.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};