"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-60 px-10 relative overflow-hidden">
      {/* Gold Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#d4af37]/20 via-transparent to-transparent blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="space-y-40">
          <h2 className="text-[15vw] font-serif leading-none tracking-tighter text-white/90">
            LET&apos;S CONNECT
          </h2>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-20">
            <div className="space-y-10">
              <h3 className="text-5xl md:text-7xl font-serif text-[#d4af37]">Join the Archive</h3>
              <div className="relative flex items-center max-w-xl w-full">
                <input 
                  type="email" 
                  placeholder="Email newsletter" 
                  className="w-full bg-[#f5f2ed] text-black px-8 py-6 rounded-full font-jost text-sm focus:outline-none placeholder:text-black/30"
                />
                <button className="absolute right-2 bg-[#2a2a2a] text-white px-8 py-4 rounded-full font-jost text-[10px] uppercase tracking-widest hover:bg-black transition-colors">
                  Sign Up
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-20 gap-y-10">
              <div className="space-y-6">
                <h4 className="font-jost uppercase tracking-widest text-[10px] text-white/40">Sitemap</h4>
                <div className="flex flex-col gap-4 font-serif text-sm">
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Home</a>
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Journeys</a>
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Experiences</a>
                  <a href="#" className="hover:text-[#d4af37] transition-colors">About</a>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="font-jost uppercase tracking-widest text-[10px] text-white/40">Info</h4>
                <div className="flex flex-col gap-4 font-serif text-sm">
                  <a href="#" className="hover:text-[#d4af37] transition-colors">About</a>
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Cornboners</a>
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Stay</a>
                  <a href="#" className="hover:text-[#d4af37] transition-colors">Contact</a>
                </div>
              </div>
              <div className="col-span-2 space-y-6">
                <h4 className="font-jost uppercase tracking-widest text-[10px] text-white/40">Socials</h4>
                <div className="flex gap-6">
                  {["Facebook", "Instagram", "Youtube", "Twitter"].map((social) => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white transition-colors">
                      <span className="sr-only">{social}</span>
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[10px] font-jost uppercase tracking-[0.3em] text-white/20">
            <span>Copyright © TCSO vinmar 2026</span>
            <div className="flex gap-10 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
