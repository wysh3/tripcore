"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVIEWS = [
  {
    name: "Alara Vossen",
    role: "Collector",
    content: "The attention to detail in the Rajasthan journey was unparalleled. It felt less like a tour and more like being invited into a private world.",
  },
  {
    name: "Julian Thorne",
    role: "Architect",
    content: "A masterclass in spatial choreography. The way they handle transitions between locations is as fluid as their digital interface.",
  },
  {
    name: "Elena Rossi",
    role: "Director",
    content: "They don't just book hotels; they curate moments. The Amalfi experience was a symphony of light, taste, and absolute serenity.",
  },
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      Array.from(cards).forEach((card, i) => {
        if (i === 0) return;

        gsap.fromTo(
          card,
          {
            y: 100 * i,
            scale: 1 - 0.05 * i,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * 300} center`,
              end: `top+=${(i + 1) * 300} center`,
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-60 px-6 relative bg-[#f5f2ed] border-t border-black/5">
      <div className="container mx-auto text-center mb-32">
        <h2 className="text-7xl md:text-9xl font-serif tracking-tighter">Testimonials</h2>
      </div>

      <div ref={cardsRef} className="max-w-4xl mx-auto relative h-[600px]">
        {REVIEWS.map((review, i) => (
          <div
            key={review.name}
            className="absolute inset-0 p-16 bg-white/40 backdrop-blur-3xl border border-black/5 rounded-[2rem] flex flex-col justify-center items-center text-center space-y-10 shadow-2xl"
            style={{ zIndex: REVIEWS.length - i }}
          >
            <div className="text-black/20 text-8xl font-serif leading-none h-10 flex items-end">“</div>
            <p className="text-2xl md:text-4xl font-serif leading-tight text-black/90 max-w-2xl">
              {review.content}
            </p>
            <div className="pt-4 border-t border-black/5 w-40">
              <h4 className="font-jost uppercase tracking-[0.3em] text-[10px] text-black/80">{review.name}</h4>
              <p className="font-jost text-[8px] uppercase tracking-[0.2em] text-black/40 mt-1">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-20 gap-3">
        <div className="w-10 h-0.5 bg-black rounded-full" />
        <div className="w-2 h-0.5 bg-black/10 rounded-full" />
        <div className="w-2 h-0.5 bg-black/10 rounded-full" />
      </div>
    </section>
  );
};
