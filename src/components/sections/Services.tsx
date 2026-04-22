"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const SERVICES = [
  {
    id: "01",
    title: "Domestic & International Tours",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Hotel & Flight Bookings",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Visa Assistance",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Leisure Packages (Family, Honeymoon, Group/Bachelor)",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Corporate Travel",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
  },
];

export const Services = () => {
  const [activeImage, setActiveImage] = useState(SERVICES[0].image);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const floatingRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!floatingRef.current || !listContainerRef.current) return;
    const floating = floatingRef.current;
    const container = listContainerRef.current;
    gsap.set(floating, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(floating, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(floating, "y", { duration: 0.4, ease: "power3.out" });
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!floatingRef.current) return;
    if (isHovering) {
      gsap.to(floatingRef.current, {
        scale: 1,
        autoAlpha: 1,
        z: 100,
        duration: 0.5,
        ease: "expo.out",
      });
    } else {
      gsap.to(floatingRef.current, {
        scale: 0.4,
        autoAlpha: 0,
        z: 0,
        duration: 0.4,
        ease: "expo.in",
      });
    }
  }, [isHovering]);

  useEffect(() => {
    if (!floatingRef.current || !isHovering) return;
    const tilts = [10, -10, 10, -10, 10];
    const targetTilt = tilts[currentIndex] || 0;
    const tl = gsap.timeline({ overwrite: "auto" });
    tl.to(floatingRef.current, {
      rotation: targetTilt,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    }).to(floatingRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.75)",
    });
    return () => tl.kill();
  }, [currentIndex, isHovering]);

  return (
    <section className="min-h-screen flex flex-col justify-center py-20 px-10 md:px-20 bg-[#f5f2ed] text-black relative overflow-hidden perspective-2000">
      <div className="relative preserve-3d" ref={listContainerRef}>
        <div
          ref={floatingRef}
          className="absolute top-0 left-0 w-44 aspect-[4/3] pointer-events-none z-[100] opacity-0 invisible scale-0 origin-center preserve-3d"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="w-full h-full rounded-lg overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/30 bg-white">
            <img src={activeImage} className="w-full h-full object-cover" alt="Floating Preview" loading="lazy" />
          </div>
        </div>

        <div className="space-y-10">
          <div onMouseEnter={() => setIsHovering(false)}>
            <h2 className="text-[7vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-black/90 uppercase">
              SERVICES
            </h2>
          </div>

          <div className="space-y-0 max-w-5xl" onMouseLeave={() => setIsHovering(false)}>
            {SERVICES.map((service, idx) => (
              <div
                key={service.id}
                className="group py-6 border-b border-black/10 flex justify-between items-center relative z-10"
                onMouseEnter={() => {
                  setActiveId(service.id);
                  setActiveImage(service.image);
                  setCurrentIndex(idx);
                  setIsHovering(true);
                }}
              >
                <h3 className={`text-xl md:text-3xl font-serif transition-all duration-700 cursor-pointer w-fit leading-tight ${activeId === service.id && isHovering ? "text-black translate-x-6" : "text-black/40 translate-x-0"}`}>
                  {service.title}
                </h3>
                <div className={`flex items-center gap-4 transition-all duration-700 ${activeId === service.id && isHovering ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
                  <span className="text-[9px] font-jost uppercase tracking-[0.2em] font-semibold text-black/60">DISCOVER</span>
                  <div className="w-6 h-px bg-black/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};