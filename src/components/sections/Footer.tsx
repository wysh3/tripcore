"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <footer className="relative min-h-screen flex flex-col justify-between px-10 py-16 overflow-hidden text-[#1a1a1a]">
      {/* Wide Background Image Layer (21:9) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/footer-bg-wide.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Top Blending Gradient - Smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#f5f2ed] via-[#f5f2ed]/80 to-transparent z-[1]" />

      {/* Noise Texture Overlay - Soft multiply for light theme */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply z-[2]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto h-full flex flex-col justify-between grow">

        {/* Top Section */}
        <div className="pt-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13vw] font-serif leading-none tracking-[-0.02em] text-[#1a1a1a] uppercase font-medium whitespace-nowrap"
          >
            LET&apos;S CONNECT
          </motion.h2>
        </div>

        {/* Middle Section: Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full py-20">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-serif text-[#1a1a1a] tracking-tight md:ml-[88px]"
          >
            Join the Archive
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center max-w-2xl w-full"
          >
            <div className="relative w-full group">
              <input
                type="email"
                placeholder="Email newsletter"
                className="w-full bg-[#eeeae3]/40 backdrop-blur-md border border-black/5 px-10 py-8 rounded-full font-sans text-xl focus:outline-none placeholder:text-black/20 focus:border-black/10 transition-all duration-700 shadow-sm"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <motion.div
                  animate={isHovered ? { scale: [1, 1.2, 1], opacity: [0, 0.5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-black/10 rounded-full blur-xl pointer-events-none"
                />
                <button
                  ref={buttonRef}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative bg-[#1a1a1a] hover:bg-black text-white px-12 py-6 rounded-full font-sans text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-500 shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Links & Branding */}
        <div className="w-full text-white/90 font-roboto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 items-end">
            {/* Brand */}
            <div className="lg:col-span-4">
              <h1 className="text-4xl md:text-5xl font-roboto leading-tight text-white font-medium">
                Art of Escape<br />Travel
              </h1>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex flex-col gap-3 text-base text-white/60">
                  <a href="#" className="hover:text-white transition-all duration-300">Home</a>
                  <a href="#" className="hover:text-white transition-all duration-300">Journeys</a>
                  <a href="#" className="hover:text-white transition-all duration-300">Experiences</a>
                  <a href="#" className="hover:text-white transition-all duration-300">About</a>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-3 text-base text-white/60">
                  <a href="#" className="hover:text-white transition-all duration-300">About</a>
                  <a href="#" className="hover:text-white transition-all duration-300">Archive</a>
                  <a href="#" className="hover:text-white transition-all duration-300">Stay</a>
                  <a href="#" className="hover:text-white transition-all duration-300">Contact</a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="lg:col-span-3 flex justify-start lg:justify-end gap-6 pb-2">
              {["Facebook", "Instagram", "Youtube", "Twitter"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                  <span className="sr-only">{social}</span>
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[9px] uppercase tracking-[0.5em] text-white/30">
            <span>Copyright © TCSO Vinmar 2026</span>
            <div className="flex gap-10 mt-6 md:mt-0">
              <span className="hover:text-white cursor-default transition-colors">Art of Escape Travel</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};



