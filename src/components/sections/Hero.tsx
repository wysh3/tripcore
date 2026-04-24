"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  backgroundImage?: string;
}

export const Hero = ({ backgroundImage }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const defaultImage = "https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=2070&auto=format&fit=crop ";

  useEffect(() => {
    if (titleRef.current) {
      // Use a fixed string to avoid splitting already-split HTML
      const rawTitle = "THE ART OF<br />ESCAPE";
      const lines = rawTitle.split(/<br\s*\/?>/i);

      titleRef.current.innerHTML = lines
        .map((line) => {
          return line.trim().split("")
            .map((char) => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
            .join("");
        })
        .join("<br />");

      gsap.fromTo(
        titleRef.current.querySelectorAll(".char"),
        {
          y: 100,
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#f5f2ed]"
    >
      {/* Background with specific texture/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || defaultImage}
          alt="Luxury Escape"
          fill
          priority
          className="object-cover brightness-[0.75] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="container relative z-10 mx-auto px-6 h-full flex items-center">
        <div className="max-w-4xl text-left">
          <h1
            ref={titleRef}
            className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-serif text-white leading-[0.85] tracking-tighter opacity-90"
            style={{ fontWeight: 500 }}
          >
            THE ART OF <br /> ESCAPE
          </h1>
          <p className="mt-8 md:mt-10 text-white/80 text-base md:text-lg max-w-md leading-relaxed">
            Thoughtfully designed experiences that take you beyond the ordinary.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
        <div className="w-px h-16 bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-white"
          />
        </div>
      </div>
    </section>
  );
};