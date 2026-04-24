"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsapConfig";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          // Unlock scroll
          document.body.style.overflow = "unset";
        }
      });

      // Initial state
      gsap.set(logoRef.current, { 
        opacity: 0, 
        scale: 0.9,
        letterSpacing: "0.2em"
      });

      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        letterSpacing: "0.5em",
        duration: 2,
        ease: "power2.out"
      })
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.5
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut"
      }, "-=0.2");
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <div 
          ref={containerRef}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center">
            <div 
              ref={logoRef}
              className="text-white text-4xl md:text-6xl font-serif tracking-[0.5em] font-light text-center opacity-0"
            >
              TRIPCORE
            </div>
            
            {/* Minimal Greeting */}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-12 text-white/40 text-[9px] font-jost uppercase tracking-[0.8em] whitespace-nowrap"
            >
              The New Standard of Travel
            </motion.span>
          </div>

          {/* Minimalist Grid Pattern Background (Very faint) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
