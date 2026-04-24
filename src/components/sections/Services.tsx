"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Map, Plane, Calendar, Heart, Briefcase } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "01",
    title: "Domestic & International Tours",
    image: "/images/service-1.png",
    icon: Map,
  },
  {
    id: "02",
    title: "Hotel & Flight Bookings",
    image: "/images/service-2.png",
    icon: Plane,
  },
  {
    id: "03",
    title: "Visa Assistance",
    image: "/images/service-3.png",
    icon: Calendar,
  },
  {
    id: "04",
    title: "Leisure Packages (Family, Honeymoon, Group/Bachelor)",
    image: "/images/service-4.png",
    icon: Heart,
  },
  {
    id: "05",
    title: "Corporate Travel",
    image: "/images/service-5.png",
    icon: Briefcase,
  },
];

export const Services = () => {
  const [activeImage, setActiveImage] = useState(SERVICES[0].image);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const floatingRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse tracking variables
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!floatingRef.current || !listContainerRef.current) return;
    const floating = floatingRef.current;
    const container = listContainerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const ticker = () => {
      // Lerp for smooth position following
      const lerpFactor = 0.15;
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * lerpFactor;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * lerpFactor;

      gsap.set(floating, {
        // Offset by 15px to sit precisely at the bottom right of the cursor
        x: delayedMouse.current.x + 15,
        y: delayedMouse.current.y + 15,
        xPercent: 0,
        yPercent: 0,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(ticker);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  // Entrance/Exit Animations & Fixed Tilt
  useEffect(() => {
    if (!floatingRef.current) return;

    if (isHovering) {
      // Fixed tilt to the right (+6 deg)
      const targetRotation = 6;

      gsap.to(floatingRef.current, {
        scale: 1,
        autoAlpha: 1,
        rotation: targetRotation,
        duration: 0.3,
        ease: "back.out(1.5)", // Snappy bounce open
      });
    } else {
      gsap.to(floatingRef.current, {
        scale: 0.5,
        autoAlpha: 0,
        duration: 0.2, // Fast close
        ease: "power2.in",
      });
    }
  }, [isHovering, currentIndex]);

  return (
    <section id="services" className="min-h-screen flex flex-col justify-center py-20 px-10 md:px-20 bg-[#f5f2ed] text-black relative overflow-hidden perspective-2000">
      <div className="relative preserve-3d" ref={listContainerRef}>

        {/* Floating Preview Card - Sized down, bottom-right offset, origin-top-left */}
        <div
          ref={floatingRef}
          className="absolute top-0 left-0 w-48 aspect-[4/3] pointer-events-none z-[100] opacity-0 invisible scale-50 origin-top-left preserve-3d"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-black relative">
            {/* Direct image swap */}
            <img
              src={activeImage}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt="Floating Preview"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Centered White Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {SERVICES[currentIndex]?.icon && (() => {
                const Icon = SERVICES[currentIndex].icon;
                const isHeart = Icon === Heart;
                return (
                  <Icon
                    className="w-10 h-10 text-white"
                    fill={isHeart ? "white" : "none"}
                    strokeWidth={isHeart ? 0 : 1.5}
                  />
                );
              })()}
            </div>
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
              <Link
                key={service.id}
                href="/services"
                className="group py-6 border-b border-black/10 flex justify-between items-center relative z-10"
                onMouseEnter={() => {
                  setActiveId(service.id);
                  setActiveImage(service.image);
                  setCurrentIndex(idx);
                  setIsHovering(true);
                }}
              >
                <h3 className={`text-xl md:text-4xl font-serif transition-all duration-500 cursor-pointer w-fit leading-tight  ${activeId === service.id && isHovering ? "text-black translate-x-6" : "text-black/40 translate-x-0"}`}>
                  {service.title}
                </h3>
                <div className={`flex items-center gap-4 transition-all duration-700 ${activeId === service.id && isHovering ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
                  <span className="text-[9px] font-jost uppercase tracking-[0.2em] font-semibold text-black/60 ">DISCOVER</span>
                  <div className="w-6 h-px bg-black/20" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};