"use client";

import { useRef, useState, useEffect, memo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import Image from "next/image";

const REVIEWS = [
  {
    id: 1,
    name: "Alexander Davies",
    role: "Explorer & Philanthropist",
    location: "Rajasthan, India",
    content: "A truly bespoke design experience. The studio's meticulous approach brought concepts to life with a fresh and impactful vision.",
    image: "/images/rajasthan.png",
  },
  {
    id: 2,
    name: "Eleanor Vance",
    role: "Creative Director",
    location: "Amalfi Coast, Italy",
    content: "Their vision completely transformed our brand identity. The depth and precision in their design work are unmatched.",
    image: "/images/hero.png",
  },
  {
    id: 3,
    name: "Chen Wei",
    role: "Architectural Visionary",
    location: "Kyoto, Japan",
    content: "Professionalism, creativity, and incredible execution. They did not just design a space, they designed an experience.",
    image: "/images/amalfi.png",
  },
  {
    id: 4,
    name: "Chloe Isabella",
    role: "Cultural Curator",
    location: "Florence, Italy",
    content: "Professional execution and collision of ideas that brought our vision to life in ways we never imagined.",
    image: "/images/rajasthan.png",
  },
  {
    id: 5,
    name: "Marcus Webb",
    role: "Principal Architect",
    location: "Santorini, Greece",
    content: "An extraordinary collaboration. Every detail was considered, every moment crafted with intentionality and grace.",
    image: "/images/hero.png",
  },
];

const TestimonialCard = memo(({ review, isActive, onClick, cardRef }: any) => {
  const activeContentRef = useRef<HTMLDivElement>(null);
  const inactiveContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="absolute will-change-transform preserve-3d"
      style={{
        width: "clamp(240px, 25vw, 400px)",
        aspectRatio: "1 / 1.1",
        top: "50%",
        left: "50%",
        marginLeft: "calc(clamp(240px, 25vw, 400px) / -2)",
        marginTop: "calc(clamp(240px, 25vw, 400px) * 1.1 / -2)",
        cursor: isActive ? "default" : "pointer",
        backfaceVisibility: "hidden",
      }}
    >
      {/* ── Active View (Image Card) ── */}
      <div 
        ref={activeContentRef} 
        className="absolute inset-0 rounded-[1.5rem] overflow-hidden pointer-events-none" 
        style={{ opacity: 0, boxShadow: "0 32px 80px -8px rgba(0,0,0,0.35)", backfaceVisibility: "hidden" }}
      >
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <Image src={review.image} alt={review.name} fill className="object-cover" sizes="(max-width: 768px) 80vw, 35vw" priority />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.9) 100%)" }} />
        <div ref={textRef} className="absolute inset-0 z-10 flex flex-col justify-between p-7 antialiased">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/70 mb-4 font-semibold">{review.location}</p>
            <p className="font-serif text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ fontSize: "clamp(14px, 1.4vw, 22px)", fontWeight: 500 }}>{review.content}</p>
          </div>
          <div className="footer-content">
            <div className="w-8 h-px bg-white/40 mb-3" />
            <p className="font-serif text-white/90" style={{ fontSize: "clamp(11px, 0.9vw, 15px)" }}>— {review.name}</p>
            <p className="font-sans text-[8px] uppercase tracking-widest text-white/40 mt-1">{review.role}</p>
          </div>
        </div>
      </div>

      {/* ── Inactive View (Glass Card) ── */}
      <div 
        ref={inactiveContentRef} 
        className="absolute inset-0 rounded-[1.5rem] flex flex-col justify-between overflow-hidden" 
        style={{ 
          padding: "clamp(20px, 2vw, 32px)", 
          background: "rgba(255,255,255,0.06)", 
          border: "1px solid rgba(255,255,255,0.1)", 
          backdropFilter: "blur(2px)", // SIGNIFICANTLY REDUCED BLUR FROM 12px
          WebkitBackdropFilter: "blur(2px)", 
          backfaceVisibility: "hidden" 
        }}
      >
        <div className="antialiased">
          <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-black/30 mb-3">{review.location}</p>
          <p className="font-serif leading-snug text-black/50" style={{ fontSize: "clamp(11px, 1vw, 15px)" }}>{review.content}</p>
        </div>
        <div>
          <div className="w-6 h-px mb-2" style={{ background: "rgba(0,0,0,0.1)" }} />
          <p className="font-serif text-black/35" style={{ fontSize: "clamp(10px, 0.8vw, 13px)" }}>— {review.name}</p>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = "TestimonialCard";

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (isAnimating.current || index === activeIndex) return;
    setActiveIndex(index);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);
  };

  useEffect(() => {
    resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      y: 50, opacity: 0, duration: 1.2, ease: "power4.out"
    });
  }, { scope: containerRef });

  useGSAP(() => {
    const total = REVIEWS.length;
    const isMobile = window.innerWidth < 768;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      let offset = i - activeIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      const abs = Math.abs(offset);
      const sign = offset < 0 ? -1 : 1;
      if (abs > 2) {
        gsap.to(card, { autoAlpha: 0, scale: 0.5, x: sign * 800, duration: 0.8, ease: "power2.inOut", overwrite: true });
        return;
      }
      const activeView = card.children[0];
      const inactiveView = card.children[1];
      const isActive = i === activeIndex;
      const stepX = isMobile ? 160 : 340;
      const xPos = sign * (abs === 0 ? 0 : abs === 1 ? stepX : stepX + 200);
      const scale = abs === 0 ? 1 : abs === 1 ? 0.8 : 0.6;
      const rotationY = sign * (abs === 0 ? 0 : abs === 1 ? 25 : 45);
      const z = abs === 0 ? 100 : abs === 1 ? -100 : -300;
      
      // SIGNIFICANTLY REDUCED GSAP BLUR FROM [4, 10] TO [1, 2]
      const blurValue = abs === 0 ? 0 : abs === 1 ? 1 : 2;
      
      const tl = gsap.timeline({ overwrite: true, onStart: () => { isAnimating.current = true; }, onComplete: () => { isAnimating.current = false; } });
      tl.to(card, { x: xPos, y: abs * 10, z: z, scale: scale, rotationY: rotationY, autoAlpha: abs === 0 ? 1 : abs === 1 ? 0.9 : 0.5, filter: abs === 0 ? "blur(0px)" : `blur(${blurValue}px)`, zIndex: 10 - abs, duration: 0.6, ease: "back.out(1.2)", onComplete: () => { if (abs === 0) gsap.set(card, { filter: "none" }); } });
      tl.to(activeView, { opacity: isActive ? 1 : 0, duration: 0.35, ease: "power2.out" }, "<");
      tl.to(inactiveView, { opacity: isActive ? 0 : 1, duration: 0.35, ease: "power2.out" }, "<");
      if (isActive) {
        const image = activeView.querySelector("div > div");
        tl.to(image, { scale: 1, duration: 1.2, ease: "power2.out" }, 0);
      } else {
        const image = activeView.querySelector("div > div");
        gsap.set(image, { scale: 1.15 });
      }
    });
  }, { dependencies: [activeIndex], scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center py-20 bg-[#f5f2ed] overflow-hidden">
      <div ref={headerRef} className="px-10 md:px-20 mb-8 flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <h2 className="text-[7vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-black/90 uppercase">TESTIMONIALS</h2>
        </div>
        <div className="hidden md:block max-w-[240px] mt-4">
          <p className="font-serif leading-relaxed text-black/40 text-[13px]">Kind words from our clients. We partner with ambitious brands to build timeless experiences.</p>
        </div>
      </div>
      <div className="relative w-full flex-1 flex items-center justify-center perspective-2000" style={{ minHeight: "350px" }}>
        {REVIEWS.map((review, i) => (
          <TestimonialCard key={review.id} review={review} isActive={i === activeIndex} onClick={() => goTo(i)} cardRef={(el: any) => { cardRefs.current[i] = el; }} />
        ))}
      </div>
    </section>
  );
};