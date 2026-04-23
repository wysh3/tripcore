"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Leaf, 
  Stars, 
  Users, 
  ArrowRight,
  Target,
  Trophy,
  Globe,
  Smile
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";

const values = [
  {
    title: "Authentic Experiences",
    description: "We create genuine connections with local cultures and communities.",
    icon: Heart
  },
  {
    title: "Responsible Travel",
    description: "We promote sustainable tourism that respects people and the planet.",
    icon: Leaf
  },
  {
    title: "Curated with Care",
    description: "Every detail is thoughtfully planned to ensure a seamless and memorable experience.",
    icon: Stars
  },
  {
    title: "Customer First",
    description: "Your happiness is our priority. We're with you at every step of the journey.",
    icon: Users
  }
];

const stats = [
  { label: "Years of Experience", value: "15+", icon: Trophy },
  { label: "Happy Travelers", value: "10K+", icon: Smile },
  { label: "Curated Journeys", value: "250+", icon: Target },
  { label: "Countries Explored", value: "50+", icon: Globe }
];

export default function AboutPage() {
  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans selection:bg-black selection:text-white overflow-hidden">
      <Navbar variant="dark" />

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-32 px-10 md:px-20 overflow-hidden">
        {/* Ripple Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.08] pointer-events-none z-0">
          <img 
            src="/images/ripples.png" 
            alt="" 
            className="w-full h-full object-cover origin-top-right scale-125 mix-blend-multiply" 
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                About Us
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-[1] tracking-tight">
                Crafting Meaningful <br />
                Journeys Since 2008
              </h1>
              <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed font-jost">
                At TripCore, we believe travel is more than visiting 
                new places—it&apos;s about creating memories that last a lifetime. 
                We curate exceptional journeys that connect you with 
                cultures, people, and places in the most authentic way.
              </p>
              <button className="bg-black text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center gap-3 group">
                Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-square">
                {/* SIGNATURE BLOB */}
                <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                  <defs>
                    <clipPath id="blob-mask-about" clipPathUnits="objectBoundingBox">
                      <path d="M0.628509 0.00033666C0.647771 -0.000682815 0.665059 0.000708452 0.684051 0.0032247C0.747935 0.0112259 0.80844 0.0364403 0.859103 0.0761733C0.881688 0.0936358 0.90496 0.116146 0.922232 0.138798C0.954343 0.18093 0.979065 0.244271 0.97928 0.297547C0.979212 0.323228 0.974508 0.348686 0.965393 0.372694C0.957248 0.394419 0.945273 0.415455 0.93516 0.436355C0.920602 0.466456 0.907375 0.500425 0.903708 0.533824C0.897594 0.589424 0.92521 0.635777 0.932588 0.688901C0.93948 0.738498 0.929734 0.795435 0.898564 0.835779C0.876961 0.863729 0.849644 0.881196 0.816484 0.892948C0.776425 0.907143 0.736558 0.905083 0.695168 0.907374C0.664112 0.910122 0.63002 0.91336 0.59972 0.920926C0.533912 0.93736 0.478432 0.981998 0.411249 0.995262C0.401933 0.997101 0.392435 0.99832 0.383019 0.999493C0.381913 0.999595 0.380805 0.999674 0.379695 0.99973C0.329111 1.00216 0.286944 0.988323 0.249819 0.953795C0.194584 0.90242 0.175573 0.833167 0.133207 0.772055C0.109976 0.738537 0.0854802 0.718227 0.0602012 0.688511C0.0474593 0.673673 0.0363752 0.657487 0.0271462 0.640246C-0.0304489 0.531127 0.00645293 0.343781 0.110866 0.272569C0.169251 0.233777 0.243385 0.224396 0.309701 0.205259C0.384474 0.183682 0.422123 0.131837 0.471391 0.076263C0.512106 0.0303358 0.566429 0.00286475 0.628509 0.00033666Z" />
                    </clipPath>
                  </defs>
                </svg>

                <div 
                  className="w-full h-full bg-[#e5e1da] overflow-hidden relative shadow-2xl shadow-black/10"
                  style={{ clipPath: "url(#blob-mask-about)", transform: "translateZ(0) scale(1.1)" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80" 
                    alt="" 
                    className="w-full h-full object-cover scale-110"
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES & STATS SECTION */}
      <section className="px-10 md:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* LEFT: VALUES */}
            <div className="lg:col-span-8 space-y-16">
              <h2 className="text-3xl font-serif text-gray-900">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {values.map((value, i) => (
                  <div key={value.title} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <value.icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-serif text-gray-900 leading-tight">{value.title}</h4>
                      <p className="text-[11px] text-gray-500 font-jost leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: STATS */}
            <div className="lg:col-span-4 bg-white/50 border border-black/5 rounded-[2.5rem] p-12 space-y-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center text-black">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-serif text-gray-900">{stat.value}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="px-10 md:px-20 py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10">
              <img 
                src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Our Story" 
              />
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                  Born from a Passion <br />
                  for Exploration
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed font-jost">
                  Founded in 2008 by a group of passionate travelers, TripCore 
                  began with a simple mission: to design journeys that inspire 
                  and enrich lives. Today, we&apos;re proud to be a trusted travel 
                  partner for thousands of explorers around the world.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12">
                <button className="bg-black text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                  Learn More About Us
                </button>

                <div className="flex gap-4 p-6 bg-white border border-black/5 rounded-[2rem] max-w-xs shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#f5f2ed] flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-black" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Our Vision</h4>
                    <p className="text-[9px] text-gray-400 leading-relaxed font-jost uppercase tracking-wider">
                      To be the world&apos;s most trusted travel brand, inspiring meaningful connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
