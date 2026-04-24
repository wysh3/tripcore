"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookingModal } from "@/components/sections/BookingModal";
import { 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  Check, 
  X, 
  ChevronRight, 
  Calendar,
  Phone,
  Mail,
  Zap,
  Info,
  Camera,
  MessageSquare,
  List as ListIcon,
  Plane,
  History as HistoryIcon,
  Sun,
  Map,
  Mountain,
  Landmark
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

interface Package {
  id: string;
  title: string;
  slug: string;
  destination: string | null;
  durationDays: number | null;
  mainImage: string;
  sellingPrice: number;
  shortDescription: string;
  highlights: string[];
  itinerary: { title: string; duration?: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  cancellationPolicy: string | null;
  flightsIncluded: boolean;
  bestPriceGuarantee: boolean;
  isCustomizable: boolean;
  tourCategory: string | null;
}

export default function PackageDetailClient({ pkg }: { pkg: Package }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "exclusions", label: "Exclusions" },
    { id: "gallery", label: "Gallery" },
    { id: "faq", label: "FAQ" },
    { id: "reviews", label: "Reviews" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map(tab => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tabs[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans selection:bg-black selection:text-white">

      {/* TOP SECTION: Breadcrumbs & Header */}
      <section className="pt-32 pb-12 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 mb-10">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/packages" className="hover:text-black">Packages</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black/80 font-semibold">{pkg.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-block bg-black text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                Bestseller
              </span>
              <h1 className="text-3xl md:text-6xl font-serif text-gray-900 leading-tight mb-4">
                {pkg.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-black" />
                {pkg.destination || "Global Journey"}
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed max-w-md font-jost">
              {pkg.shortDescription}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm">
                  <Calendar className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Duration</p>
                  <p className="text-[11px] text-gray-900 font-bold uppercase tracking-wider">{pkg.durationDays} Days / {pkg.durationDays ? pkg.durationDays - 1 : 0} Nights</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm">
                  <Users className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Trip Type</p>
                  <p className="text-[11px] text-gray-900 font-bold uppercase tracking-wider">Private Trip</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm">
                  <Plane className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Transport</p>
                  <p className="text-[11px] text-gray-900 font-bold uppercase tracking-wider">Private Transfers</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Main Media */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 group">
              <img 
                src={pkg.mainImage} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={pkg.title}
              />
              <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            {/* THUMBNAILS */}
            <div className="grid grid-cols-6 gap-3">
              {pkg.gallery.slice(0, 5).map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-black transition-all duration-300">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
              {pkg.gallery.length > 5 && (
                <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group">
                  <img src={pkg.gallery[5]} className="w-full h-full object-cover blur-[2px]" alt="" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-bold group-hover:bg-black/60 transition-all">
                    +{pkg.gallery.length - 5}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT & SIDEBAR */}
      <section className="px-6 md:px-16 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* STICKY TABS ROW */}
            <div className="sticky top-20 z-40 bg-[#f5f2ed] pt-4 pb-2">
              <div className="flex items-center gap-8 border-b border-black/5 overflow-x-auto scrollbar-hide pb-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`relative py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${
                      activeSection === tab.id ? "text-black" : "text-black/40 hover:text-black/80"
                    }`}
                  >
                    {tab.label}
                    {activeSection === tab.id && (
                      <motion.div 
                        layoutId="active-tab-line"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTIONS */}
            <div className="space-y-24">
              
              {/* OVERVIEW SECTION */}
              <div id="overview" className="space-y-12 scroll-mt-32">
                <div className="space-y-6">
                  <h2 className="text-3xl font-serif text-gray-900">Overview</h2>
                  <p className="text-sm text-gray-600 leading-relaxed font-jost">
                    {pkg.shortDescription}
                  </p>
                </div>

                {/* QUICK STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white border border-black/5 rounded-[2rem]">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center">
                      <Sun className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Best Time</p>
                      <p className="text-[10px] text-gray-900 font-bold uppercase tracking-widest mt-1">Oct — Mar</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 md:border-l border-black/5">
                    <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center">
                      <Map className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Trip Type</p>
                      <p className="text-[10px] text-gray-900 font-bold uppercase tracking-widest mt-1">Cultural</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 border-l border-black/5">
                    <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center">
                      <Users className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Group Size</p>
                      <p className="text-[10px] text-gray-900 font-bold uppercase tracking-widest mt-1">2 — 12 People</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 border-l border-black/5">
                    <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center">
                      <Mountain className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Activity</p>
                      <p className="text-[10px] text-gray-900 font-bold uppercase tracking-widest mt-1">Leisurely</p>
                    </div>
                  </div>
                </div>

                {/* HIGHLIGHTS */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-serif text-gray-900">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {pkg.highlights.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex-shrink-0 flex items-center justify-center shadow-sm">
                          <Landmark className="w-4 h-4 text-black" />
                        </div>
                        <p className="text-xs text-gray-600 font-jost leading-relaxed pt-1 font-medium">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ITINERARY SECTION */}
              <div id="itinerary" className="space-y-12 scroll-mt-32">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-serif text-gray-900">Itinerary</h2>
                  <button className="text-[10px] font-bold uppercase tracking-widest border border-black/10 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all">
                    View Full Itinerary
                  </button>
                </div>

                <div className="space-y-1">
                  {pkg.itinerary.map((day, i) => (
                    <div key={i} className="relative pl-12 pb-12 last:pb-0">
                      {/* LINE */}
                      {i !== pkg.itinerary.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-black/10" />
                      )}
                      {/* DOT */}
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-black border-4 border-[#f5f2ed] flex items-center justify-center text-[10px] font-bold text-white z-10 shadow-sm">
                        {i + 1}
                      </div>
                      <div className="space-y-3 bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Day {i + 1}</span>
                            <h3 className="text-lg font-serif text-gray-900">{day.title}</h3>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-jost">
                          {day.description}
                        </p>
                        <div className="pt-4 flex items-center gap-4 border-t border-black/5 mt-4">
                          <div className="flex items-center gap-2 text-[9px] font-bold text-black uppercase tracking-widest">
                            <HistoryIcon className="w-3.5 h-3.5" />
                            Overnight in {day.title.split(' ')[0]}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GALLERY SECTION */}
              <div id="gallery" className="space-y-8 scroll-mt-32">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-serif text-gray-900">Gallery</h2>
                  <button className="text-[10px] font-bold uppercase tracking-widest border border-black/10 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all">
                    View All Photos
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pkg.gallery.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm">
                      <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ SECTION */}
              <div id="faq" className="space-y-8 scroll-mt-32">
                 <h2 className="text-3xl font-serif text-gray-900">FAQ</h2>
                 <p className="text-sm text-gray-500 font-jost">Frequently asked questions will appear here.</p>
              </div>

              {/* REVIEWS SECTION */}
              <div id="reviews" className="space-y-8 scroll-mt-32">
                 <h2 className="text-3xl font-serif text-gray-900">Reviews</h2>
                 <p className="text-sm text-gray-500 font-jost">Customer reviews will appear here.</p>
              </div>

            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
              {/* BOOKING CARD */}
              <div className="bg-white border border-black/5 rounded-[2.5rem] p-10 shadow-xl shadow-black/5 space-y-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">From</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-sans text-gray-900">₹{pkg.sellingPrice.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-gray-400 font-jost">/ person</span>
                  </div>
                  <p className="text-[9px] text-gray-400 font-jost italic">Price varies by season and group size</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="block w-full bg-black text-white text-center py-5 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                  >
                    Enquire Now
                  </button>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f5f2ed] border border-black/5 flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Best Price Guarantee</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f5f2ed] border border-black/5 flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Customizable itinerary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f5f2ed] border border-black/5 flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">24/7 Travel Support</span>
                    </div>
                  </div>
                </div>

                {/* CUSTOM PLAN BOX */}
                <div className="p-8 bg-[#f5f2ed] rounded-[2rem] border border-black/5 space-y-6">
                  <div className="space-y-2 text-center">
                    <h4 className="text-sm font-serif text-gray-900 font-bold">Need a custom plan?</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-jost">
                      We can personalize this journey according to your preferences.
                    </p>
                  </div>
                  <button className="w-full bg-white border border-black/10 py-4 rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all">
                    Customize This Package
                  </button>
                </div>
              </div>

              {/* WHAT'S INCLUDED CARD */}
              <div id="inclusions" className="bg-[#f5f2ed] border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-6 scroll-mt-32">
                <h3 className="text-xl font-serif text-gray-900 border-b border-black/5 pb-4">What's Included</h3>
                <ul className="space-y-4">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-gray-900 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600 font-jost leading-relaxed">{item}</span>
                  </li>
                ))}
                </ul>
              </div>

              {/* WHAT'S NOT INCLUDED CARD */}
              <div id="exclusions" className="bg-[#f5f2ed] border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-6 scroll-mt-32">
                <h3 className="text-xl font-serif text-gray-900 border-b border-black/5 pb-4">What's Not Included</h3>
                <ul className="space-y-4">
                {pkg.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600 font-jost leading-relaxed">{item}</span>
                  </li>
                ))}
                </ul>
              </div>

              {/* HAVE QUESTIONS CARD */}
              <div className="bg-[#f5f2ed] border border-black/5 rounded-[2.5rem] p-10 shadow-sm space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-gray-900">Have Questions?</h3>
                  <p className="text-xs text-gray-500 font-jost leading-relaxed">
                    Our travel experts are here to help you plan your perfect journey.
                  </p>
                </div>
                <div className="space-y-3">
                  <a href="tel:+919876543210" className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-black/5 hover:border-black/20 transition-colors group">
                    <Phone className="w-4 h-4 text-black" />
                    <span className="text-xs text-gray-900 font-bold font-jost">+91 98765 43210</span>
                  </a>
                  <a href="mailto:hello@tripcore.com" className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-black/5 hover:border-black/20 transition-colors group">
                    <Mail className="w-4 h-4 text-black" />
                    <span className="text-xs text-gray-900 font-bold font-jost">hello@tripcore.com</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        defaultPackage={pkg.title}
      />

      <Footer />
    </main>
  );
}
