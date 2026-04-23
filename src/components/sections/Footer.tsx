"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
  };

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

      {/* Top Blending Gradient */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#f5f2ed] via-[#f5f2ed]/80 to-transparent z-[1]" />

      {/* Noise Texture Overlay */}
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

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center max-w-2xl w-full"
          >
            <div className="relative w-full group">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="Email newsletter"
                required
                className="w-full bg-[#eeeae3]/40 backdrop-blur-md border border-black/5 px-10 py-8 rounded-full font-sans text-xl focus:outline-none placeholder:text-black/20 focus:border-black/10 transition-all duration-700 shadow-sm"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <motion.div
                  animate={isHovered ? { scale: [1, 1.2, 1], opacity: [0, 0.5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-black/10 rounded-full blur-xl pointer-events-none"
                />
                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative bg-[#1a1a1a] hover:bg-black text-white px-12 py-6 rounded-full font-sans text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-500 shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.form>
        </div>

        {/* Bottom Section: Links & Branding */}
        <div className="w-full text-white/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 items-end">
            {/* Brand */}
            <div className="lg:col-span-4">
              <h1 className="text-4xl md:text-5xl font-serif leading-tight text-white font-medium uppercase tracking-tighter">
                Art of Escape<br />Travel
              </h1>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-10 font-jost">
              <div className="space-y-6">
                <div className="flex flex-col gap-3 text-base text-white/60">
                  <Link href="/" className="hover:text-white transition-all duration-300">Home</Link>
                  <Link href="/packages" className="hover:text-white transition-all duration-300">Packages</Link>
                  <Link href="/services" className="hover:text-white transition-all duration-300">Services</Link>
                  <Link href="/about" className="hover:text-white transition-all duration-300">About</Link>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-3 text-base text-white/60">
                  <Link href="/packages" className="hover:text-white transition-all duration-300">Destinations</Link>
                  <Link href="/services" className="hover:text-white transition-all duration-300">Experiences</Link>
                  <Link href="/enquiry" className="hover:text-white transition-all duration-300">Enquiry</Link>
                  <Link href="/enquiry" className="hover:text-white transition-all duration-300">Contact</Link>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="lg:col-span-3 flex justify-start lg:justify-end gap-6 pb-2">
              {[
                { name: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { name: "Instagram", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3z" },
                { name: "Youtube", icon: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98l5.75 3.02-5.75 3.02z" },
                { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[9px] uppercase tracking-[0.5em] text-white/30 font-jost">
            <span>Copyright © wysh3 2026</span>
            <div className="flex gap-10 mt-6 md:mt-0">
              <span className="hover:text-white cursor-default transition-colors">Art of Escape Travel</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};