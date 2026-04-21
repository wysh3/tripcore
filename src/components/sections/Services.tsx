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

  // Floating Cursor Preview Logic
  useEffect(() => {
    if (!floatingRef.current || !listContainerRef.current) return;

    const floating = floatingRef.current;
    const container = listContainerRef.current;

    const xTo = gsap.quickTo(floating, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(floating, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      xTo(x);
      yTo(y);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating Card Entrance/Exit
  useEffect(() => {
    if (!floatingRef.current) return;

    if (isHovering) {
      gsap.to(floatingRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(floatingRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isHovering]);

  // Alternating Tilt & transition
  useEffect(() => {
    if (!floatingRef.current || !isHovering) return;

    const tilts = [6, -6, 6, -6, 6];
    const targetTilt = tilts[currentIndex] || 0;

    const tl = gsap.timeline({ overwrite: "auto" });

    tl.to(floatingRef.current, {
      scale: 0.3,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
    }).to(floatingRef.current, {
      rotation: targetTilt,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.4)",
    });

    return () => {
      tl.kill();
    };
  }, [currentIndex, isHovering]);

  return (
    <section
      className="py-40 px-6 bg-[#f5f2ed] text-black relative overflow-hidden"
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto">
        <div className="relative" ref={listContainerRef}>
          {/* Floating Preview Card */}
          <div
            ref={floatingRef}
            className="absolute top-0 left-0 w-40 aspect-[4/3] pointer-events-none z-20 opacity-0 scale-0 origin-center"
            style={{
              transform: "translate(-50%, -50%)",
              willChange: "transform",
            }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src={activeImage}
                className="w-full h-full object-cover"
                alt="Floating Preview"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-7xl md:text-9xl font-serif tracking-tighter">
              Services
            </h2>

            <div className="space-y-0">
              {SERVICES.map((service, idx) => (
                <div
                  key={service.id}
                  className="group py-6 border-b border-black/10 flex justify-between items-center relative z-10"
                >
                  <h3
                    onMouseEnter={() => {
                      setActiveId(service.id);
                      setActiveImage(service.image);
                      setCurrentIndex(idx);
                      setIsHovering(true);
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`text-2xl md:text-4xl font-serif transition-all duration-500 cursor-pointer w-fit ${
                      activeId === service.id ? "text-black" : "text-black/40"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};