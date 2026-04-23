"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

  // Velocity and Smoothing Variables
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);

  useEffect(() => {
    if (!floatingRef.current || !listContainerRef.current) return;
    const floating = floatingRef.current;
    const container = listContainerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const ticker = (time: number, deltaTime: number) => {
      // Lerp for smooth position
      const lerpFactor = 0.08;
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * lerpFactor;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * lerpFactor;

      // Velocity based rotation (The "Tilt" effect from the video)
      const diffX = mouse.current.x - delayedMouse.current.x;
      const targetRotation = gsap.utils.clamp(-20, 20, diffX * 0.4);
      rotationRef.current += (targetRotation - rotationRef.current) * 0.1;

      gsap.set(floating, {
        x: delayedMouse.current.x,
        y: delayedMouse.current.y,
        xPercent: -50,
        yPercent: -50,
        rotation: rotationRef.current,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(ticker);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  // Entrance/Exit Animations (Matching the video's snappiness)
  useEffect(() => {
    if (!floatingRef.current) return;
    if (isHovering) {
      gsap.to(floatingRef.current, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power4.out",
      });
    } else {
      gsap.to(floatingRef.current, {
        scale: 0,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isHovering]);

  return (
    <section id="services" className="min-h-screen flex flex-col justify-center py-20 px-10 md:px-20 bg-[#f5f2ed] text-black relative overflow-hidden perspective-2000">
      <div className="relative preserve-3d" ref={listContainerRef}>
        {/* Floating Preview Card - Optimized as per Video Analysis */}
        <div
          ref={floatingRef}
          className="absolute top-0 left-0 w-56 aspect-[4/3] pointer-events-none z-[100] opacity-0 invisible scale-0 origin-center preserve-3d"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.35)] bg-white">
            {/* Smooth transition between images using cross-fade technique if needed, or simple update */}
            <img 
              src={activeImage} 
              className="w-full h-full object-cover transition-all duration-300" 
              alt="Floating Preview" 
              loading="lazy" 
            />
          </div>
        </div>

        <div className="space-y-10">
          <div onMouseEnter={() => setIsHovering(false)}>
            <Link 
              href="/services" 
              className="group inline-flex items-center gap-4 hover:text-black/60 transition-all duration-500"
            >
              <h2 className="text-[7vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-black/90 uppercase">
                SERVICES
              </h2>
              <ArrowUpRight className="w-[4vw] h-[4vw] text-black/10 stroke-[1px] group-hover:text-black group-hover:stroke-[2.5px] group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500" />
            </Link>
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
                  
                  // Small rotational jolt when switching (as seen in high-end implementations)
                  if (floatingRef.current) {
                    gsap.fromTo(floatingRef.current, 
                      { scale: 0.95 }, 
                      { scale: 1, duration: 0.4, ease: "back.out(1.7)" }
                    );
                  }
                }}
              >
                <h3 className={`text-xl md:text-4xl font-serif transition-all duration-500 cursor-pointer w-fit leading-tight  ${activeId === service.id && isHovering ? "text-black translate-x-6" : "text-black/40 translate-x-0"}`}>
                  {service.title}
                </h3>
                <div className={`flex items-center gap-4 transition-all duration-700 ${activeId === service.id && isHovering ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
                  <span className="text-[9px] font-jost uppercase tracking-[0.2em] font-semibold text-black/60 ">DISCOVER</span>
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