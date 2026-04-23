"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Hotel,
  Map as MapIcon,
  Car,
  ShieldCheck,
  Plane,
  Camera,
  Gift,
  ArrowRight,
  UserCheck,
  Handshake,
  Headphones,
  Target
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import Link from "next/link";

const services = [
  {
    title: "Trip Planning & Consultation",
    description: "Personalized itineraries crafted by travel experts, tailored to your needs and preferences.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    icon: Compass
  },
  {
    title: "Accommodation Assistance",
    description: "Handpicked stays from boutique retreats to luxury hotels for a perfect stay.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
    icon: Hotel
  },
  {
    title: "Experience Curations",
    description: "Unique local experiences and activities that bring you closer to the culture.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80",
    icon: MapIcon
  },
  {
    title: "Transport & Transfers",
    description: "Seamless airport transfers, private cabs, and luxury transport options.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
    icon: Car
  },
  {
    title: "Travel Insurance & Support",
    description: "Comprehensive travel insurance and 24/7 support for your peace of mind.",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80",
    icon: ShieldCheck
  },
  {
    title: "Flights & Ticket Bookings",
    description: "Domestic and international flight bookings with the best routes and fares.",
    image: "https://images.unsplash.com/photo-1539612793508-4539a972242b?auto=format&fit=crop&q=80",
    icon: Plane
  },
  {
    title: "Photography Services",
    description: "Professional travel photography to capture your special moments.",
    image: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?auto=format&fit=crop&q=80",
    icon: Camera
  },
  {
    title: "Special Requests & Customization",
    description: "From celebrations to specific needs, we personalize every detail for you.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
    icon: Gift
  }
];

const features = [
  {
    title: "Expert Travel Designers",
    description: "Crafted by experienced travel specialists",
    icon: UserCheck
  },
  {
    title: "Trusted Partnerships",
    description: "Working with the best in hospitality & travel",
    icon: Handshake
  },
  {
    title: "24/7 Support",
    description: "We're with you at every step of your journey",
    icon: Headphones
  },
  {
    title: "Tailored Experiences",
    description: "Personalized to match your travel style",
    icon: Target
  }
];

export default function ServicesPage() {
  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans selection:bg-black selection:text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-32 px-10 md:px-20 overflow-hidden">
        {/* Ripple Background Pattern - Repositioned and stylized */}
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
                Services
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-[1] tracking-tight">
                Thoughtful Services, <br />
                Seamless Journeys
              </h1>
              <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed font-jost">
                From travel planning to on-ground experiences, our services
                are designed to make every moment of your journey effortless
                and unforgettable.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-square">
                {/* REUSING BLOB FROM ABOUT US */}
                <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                  <defs>
                    <clipPath id="blob-mask-services" clipPathUnits="objectBoundingBox">
                      <path d="M0.628509 0.00033666C0.647771 -0.000682815 0.665059 0.000708452 0.684051 0.0032247C0.747935 0.0112259 0.80844 0.0364403 0.859103 0.0761733C0.881688 0.0936358 0.90496 0.116146 0.922232 0.138798C0.954343 0.18093 0.979065 0.244271 0.97928 0.297547C0.979212 0.323228 0.974508 0.348686 0.965393 0.372694C0.957248 0.394419 0.945273 0.415455 0.93516 0.436355C0.920602 0.466456 0.907375 0.500425 0.903708 0.533824C0.897594 0.589424 0.92521 0.635777 0.932588 0.688901C0.93948 0.738498 0.929734 0.795435 0.898564 0.835779C0.876961 0.863729 0.849644 0.881196 0.816484 0.892948C0.776425 0.907143 0.736558 0.905083 0.695168 0.907374C0.664112 0.910122 0.63002 0.91336 0.59972 0.920926C0.533912 0.93736 0.478432 0.981998 0.411249 0.995262C0.401933 0.997101 0.392435 0.99832 0.383019 0.999493C0.381913 0.999595 0.380805 0.999674 0.379695 0.99973C0.329111 1.00216 0.286944 0.988323 0.249819 0.953795C0.194584 0.90242 0.175573 0.833167 0.133207 0.772055C0.109976 0.738537 0.0854802 0.718227 0.0602012 0.688511C0.0474593 0.673673 0.0363752 0.657487 0.0271462 0.640246C-0.0304489 0.531127 0.00645293 0.343781 0.110866 0.272569C0.169251 0.233777 0.243385 0.224396 0.309701 0.205259C0.384474 0.183682 0.422123 0.131837 0.471391 0.076263C0.512106 0.0303358 0.566429 0.00286475 0.628509 0.00033666Z" />
                    </clipPath>
                  </defs>
                </svg>

                <div
                  className="w-full h-full bg-[#e5e1da] overflow-hidden relative shadow-2xl shadow-black/10"
                  style={{ clipPath: "url(#blob-mask-services)", transform: "translateZ(0) scale(1.1)" }}
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

      {/* OUR SERVICES SECTION */}
      <section className="px-10 md:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight">Our Services</h2>
              <p className="text-gray-400 font-jost text-[10px] uppercase tracking-[0.3em]">
                Everything you need for a perfectly curated journey.
              </p>
            </div>
            <Link
              href="/enquiry"
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 group"
            >
              Enquire for Custom Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-sm group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-700">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Icon Badge - Top Left as in mockup */}
                  <div className="absolute top-6 left-6 w-10 h-10 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 transition-transform">
                    <service.icon className="w-4 h-4 text-black" />
                  </div>
                </div>

                <div className="pt-8 space-y-3">
                  <h3 className="text-lg font-serif text-gray-900 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-jost">
                    {service.description}
                  </p>
                  <button className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-black/30 group-hover:text-black transition-colors pt-2">
                    Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HAVE SOMETHING SPECIFIC IN MIND? */}
      <section className="px-10 md:px-20 py-40 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16 w-full">
            <div className="hidden lg:block h-72 rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700">
              <img src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
            </div>

            <div className="text-center space-y-10">
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                Have something specific in mind?
              </h2>
              <p className="text-xs text-gray-400 font-jost max-w-[280px] mx-auto uppercase tracking-widest leading-loose">
                Tell us your needs and we'll create a journey just for you.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/50 border border-black/5 px-8 py-5 rounded-full text-xs font-jost focus:outline-none focus:border-black/20 shadow-inner"
                />
                <button className="whitespace-nowrap bg-black text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                  Get in Touch
                </button>
              </div>
            </div>

            <div className="hidden lg:block h-72 rounded-[3rem] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER FEATURES */}
      <section className="px-10 md:px-20 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {features.map((feature, i) => (
            <div key={feature.title} className="flex flex-col items-center text-center gap-6">
              <div className="w-14 h-14 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm text-black">
                <feature.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900">{feature.title}</h4>
                <p className="text-[10px] text-gray-400 font-jost uppercase tracking-widest leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
