"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { 
  ChevronDown, 
  MapPin, 
  Clock, 
  Check,
  LayoutGrid,
  List,
  History,
  Crown,
  Plane,
  Search,
  X
} from "lucide-react";

interface Package {
  id: string;
  title: string;
  slug: string;
  destination: string | null;
  durationDays: number | null;
  mainImage: string | null;
  sellingPrice: number;
  shortDescription?: string | null;
  tourCategory?: string | null;
}

interface PackagesClientProps {
  packages: Package[];
  destinations: string[];
}

import { CustomSelect } from "@/components/ui/CustomSelect";

export default function PackagesClient({ packages, destinations }: PackagesClientProps) {
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState(3000);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [selectedDestination, setSelectedDestination] = useState<string>("All Destinations");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [duration, setDuration] = useState("Any Duration");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const dest = searchParams.get("destination");
    if (dest) {
      setSelectedDestination(dest);
    }
  }, [searchParams]);

  const filteredPackages = packages
    .filter(pkg => {
      const matchesPrice = pkg.sellingPrice <= (priceRange * 100);
      const matchesDest = selectedDestination === "All Destinations" || 
                          pkg.destination?.toLowerCase().includes(selectedDestination.toLowerCase());
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pkg.destination?.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesDuration = true;
      if (duration === "1-5 Days") matchesDuration = (pkg.durationDays || 0) <= 5;
      if (duration === "5-10 Days") matchesDuration = (pkg.durationDays || 0) > 5 && (pkg.durationDays || 0) <= 10;
      if (duration === "10+ Days") matchesDuration = (pkg.durationDays || 0) > 10;

      return matchesPrice && matchesDest && matchesSearch && matchesDuration;
    })
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.sellingPrice - b.sellingPrice;
      if (sortBy === "Price: High to Low") return b.sellingPrice - a.sellingPrice;
      return 0; // Popular (Default)
    });

  const clearFilters = () => {
    setPriceRange(3000);
    setSelectedDestination("All Destinations");
    setSearchTerm("");
    setSortBy("Popular");
    setDuration("Any Duration");
  };

  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans selection:bg-black selection:text-white">

      {/* HEADER SECTION */}
      <section className="relative pt-44 pb-20 px-10 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                Packages
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-[1.1] tracking-tight">
                Handpicked Journeys, <br />
                Crafted for You
              </h1>
              <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed font-jost">
                Curated travel packages blending timeless destinations, 
                exclusive experiences, and seamless comfort.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end relative">
              {/* RIPPLE BACKGROUND - BEHIND BLOB ONLY AS REQUESTED */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square z-0 opacity-[0.12] pointer-events-none"
                style={{
                  maskImage: "radial-gradient(circle at center, black 20%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 70%)"
                }}
              >
                <img 
                  src="/images/ripples.png" 
                  alt="" 
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              <div className="relative w-full max-w-[480px] aspect-square z-10">
                <svg style={{ position: "absolute", width: 0, height: 0 }}>
                  <defs>
                    <clipPath id="blob-mask-final" clipPathUnits="objectBoundingBox">
                      <path d="M0.628509 0.00033666C0.647771 -0.000682815 0.665059 0.000708452 0.684051 0.0032247C0.747935 0.0112259 0.80844 0.0364403 0.859103 0.0761733C0.881688 0.0936358 0.90496 0.116146 0.922232 0.138798C0.954343 0.18093 0.979065 0.244271 0.97928 0.297547C0.979212 0.323228 0.974508 0.348686 0.965393 0.372694C0.957248 0.394419 0.945273 0.415455 0.93516 0.436355C0.920602 0.466456 0.907375 0.500425 0.903708 0.533824C0.897594 0.589424 0.92521 0.635777 0.932588 0.688901C0.93948 0.738498 0.929734 0.795435 0.898564 0.835779C0.876961 0.863729 0.849644 0.881196 0.816484 0.892948C0.776425 0.907143 0.736558 0.905083 0.695168 0.907374C0.664112 0.910122 0.63002 0.91336 0.59972 0.920926C0.533912 0.93736 0.478432 0.981998 0.411249 0.995262C0.401933 0.997101 0.392435 0.99832 0.383019 0.999493C0.381913 0.999595 0.380805 0.999674 0.379695 0.99973C0.329111 1.00216 0.286944 0.988323 0.249819 0.953795C0.194584 0.90242 0.175573 0.833167 0.133207 0.772055C0.109976 0.738537 0.0854802 0.718227 0.0602012 0.688511C0.0474593 0.673673 0.0363752 0.657487 0.0271462 0.640246C-0.0304489 0.531127 0.00645293 0.343781 0.110866 0.272569C0.169251 0.233777 0.243385 0.224396 0.309701 0.205259C0.384474 0.183682 0.422123 0.131837 0.471391 0.076263C0.512106 0.0303358 0.566429 0.00286475 0.628509 0.00033666Z" />
                    </clipPath>
                  </defs>
                </svg>
                <div 
                  className="w-full h-full bg-white overflow-hidden shadow-2xl shadow-black/10"
                  style={{ clipPath: "url(#blob-mask-final)" }}
                >
                  <Image 
                    src={packages[0]?.mainImage || "/images/hero.png"} 
                    alt="" 
                    fill
                    className="object-cover scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="px-10 md:px-20 pb-40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* MOBILE FILTER TOGGLE */}
          <div className="lg:hidden w-full mb-8">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-white border border-black/5 p-4 rounded-2xl flex justify-between items-center text-[10px] font-bold uppercase tracking-widest"
            >
              Filter & Sort
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* SIDEBAR FILTER */}
          <aside className={`w-full lg:w-[280px] flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-3xl sticky top-32 space-y-8">
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <h2 className="text-base font-serif text-gray-900">Filter Packages</h2>
                <button 
                  onClick={clearFilters}
                  className="text-[10px] text-gray-400 uppercase tracking-wider font-bold hover:text-black transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Search Bar */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Search</label>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border border-black/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-black/30 pr-10"
                  />
                  {searchTerm ? (
                    <X 
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-black" 
                      onClick={() => setSearchTerm("")}
                    />
                  ) : (
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  )}
                </div>
              </div>

              {/* Destination Dropdown */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Destination</label>
                <CustomSelect 
                  options={["All Destinations", ...destinations].map(d => ({ value: d, label: d }))}
                  value={selectedDestination}
                  onChange={(val) => setSelectedDestination(val)}
                  className="!rounded-xl !py-3"
                />
              </div>

              {/* Duration Dropdown */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Duration</label>
                <CustomSelect 
                  options={[
                    { value: "Any Duration", label: "Any Duration" },
                    { value: "1-5 Days", label: "1-5 Days" },
                    { value: "5-10 Days", label: "5-10 Days" },
                    { value: "10+ Days", label: "10+ Days" },
                  ]}
                  value={duration}
                  onChange={(val) => setDuration(val)}
                  className="!rounded-xl !py-3"
                />
              </div>

              {/* Price Range Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Price Range</label>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] text-gray-400 font-jost">
                    <span>₹20,000</span>
                    <span>₹3,00,000+</span>
                  </div>
                  <input 
                    type="range" 
                    min="200" 
                    max="3000" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-black h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Theme Checkboxes */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Theme</label>
                <div className="space-y-3">
                  {["Luxury Escapes", "Cultural Heritage", "Nature & Adventure", "Romantic Getaways", "Family Holidays"].map((theme) => (
                    <label key={theme} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-black/10 rounded flex items-center justify-center transition-colors group-hover:border-black/30">
                        <Check className="w-2 h-2 text-transparent group-hover:text-black/40 transition-colors" />
                      </div>
                      <span className="text-[11px] text-gray-500 font-jost group-hover:text-gray-900 transition-colors">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-black/10">
                View Packages
              </button>
            </div>
          </aside>

          {/* RESULTS AREA */}
          <div className="flex-1 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-gray-400 font-jost">
                <span className="text-gray-900 font-bold">{filteredPackages.length} Packages</span> Found
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative min-w-[180px]">
                  <CustomSelect 
                    options={[
                      { value: "Popular", label: "Sort by: Popular" },
                      { value: "Price: Low to High", label: "Price: Low to High" },
                      { value: "Price: High to Low", label: "Price: High to Low" },
                    ]}
                    value={sortBy}
                    onChange={(val) => setSortBy(val)}
                  />
                </div>
                
                <div className="flex bg-white/50 border border-black/5 rounded-xl p-1">
                  <button 
                    onClick={() => setViewType("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewType === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-lg transition-colors ${viewType === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* PACKAGE GRID */}
            <div className={`grid ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2 gap-8" : "grid-cols-1 gap-6"}`}>
              {filteredPackages.map((pkg) => (
                <Link 
                  key={pkg.id} 
                  href={`/packages/${pkg.slug}`}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-700"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={pkg.mainImage || "/images/rajasthan.png"} 
                      alt={pkg.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* CARD BADGES */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-black text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        Bestseller
                      </span>
                    </div>
                    
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                          {pkg.durationDays || 5} Days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif text-gray-900 group-hover:text-gray-600 transition-colors duration-500">
                        {pkg.title}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-300" />
                        {pkg.destination || "Global Journey"}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed font-jost line-clamp-2">
                      {pkg.shortDescription || "Experience royal palaces, vibrant bazaars, and timeless heritage in this curated escape."}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 border-t border-black/5">
                      <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        <History className="w-3.5 h-3.5 text-gray-300" />
                        Heritage
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        <Crown className="w-3.5 h-3.5 text-gray-300" />
                        Luxury
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        <Plane className="w-3.5 h-3.5 text-gray-300" />
                        Transfers
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">From</p>
                        <p className="text-lg font-sans text-gray-900">
                          ₹{pkg.sellingPrice.toLocaleString("en-IN")} <span className="text-[10px] text-gray-400 font-sans font-normal lowercase">/ person</span>
                        </p>
                      </div>
                      <button className="bg-black text-white px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all duration-500 shadow-lg shadow-black/10">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
