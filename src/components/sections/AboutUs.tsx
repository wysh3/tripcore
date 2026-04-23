"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        innerImageRef.current,
        {
          yPercent: -15,
          scale: 1.2,
        },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-60 px-10 md:px-20 bg-[#f5f2ed] overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* TEXT CONTENT */}
        <div ref={textRef} className="space-y-16 order-2 lg:order-1">
          <div>
            <h2 className="text-[7vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-black/90 uppercase">
              ABOUT US
            </h2>
          </div>

          <div className="space-y-8 max-w-sm">
            <p className="text-[10px] md:text-xs font-jost text-black/50 leading-relaxed uppercase tracking-[0.25em]">
              At TripCore, we curate bespoke <br />
              journeys that transcend ordinary <br />
              travel. Our approach blends deep <br />
              local expertise with uncompromising <br />
              luxury to craft timeless memories.
            </p>
            <p className="text-[10px] md:text-xs font-jost text-black/50 leading-relaxed uppercase tracking-[0.25em]">
              Every itinerary is meticulously <br />
              designed to ensure an immersive <br />
              and extraordinary global escape.
            </p>
          </div>
        </div>

        {/* IMAGE CONTENT */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            ref={imageRef}
            className="relative w-full max-w-[81%] aspect-square filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
              <defs>
                <clipPath id="blob-mask" clipPathUnits="objectBoundingBox">
                  <path d="M0.628509 0.00033666C0.647771 -0.000682815 0.665059 0.000708452 0.684051 0.0032247C0.747935 0.0112259 0.80844 0.0364403 0.859103 0.0761733C0.881688 0.0936358 0.90496 0.116146 0.922232 0.138798C0.954343 0.18093 0.979065 0.244271 0.97928 0.297547C0.979212 0.323228 0.974508 0.348686 0.965393 0.372694C0.957248 0.394419 0.945273 0.415455 0.93516 0.436355C0.920602 0.466456 0.907375 0.500425 0.903708 0.533824C0.897594 0.589424 0.92521 0.635777 0.932588 0.688901C0.93948 0.738498 0.929734 0.795435 0.898564 0.835779C0.876961 0.863729 0.849644 0.881196 0.816484 0.892948C0.776425 0.907143 0.736558 0.905083 0.695168 0.907374C0.664112 0.910122 0.63002 0.91336 0.59972 0.920926C0.533912 0.93736 0.478432 0.981998 0.411249 0.995262C0.401933 0.997101 0.392435 0.99832 0.383019 0.999493C0.381913 0.999595 0.380805 0.999674 0.379695 0.99973C0.329111 1.00216 0.286944 0.988323 0.249819 0.953795C0.194584 0.90242 0.175573 0.833167 0.133207 0.772055C0.109976 0.738537 0.0854802 0.718227 0.0602012 0.688511C0.0474593 0.673673 0.0363752 0.657487 0.0271462 0.640246C-0.0304489 0.531127 0.00645293 0.343781 0.110866 0.272569C0.169251 0.233777 0.243385 0.224396 0.309701 0.205259C0.384474 0.183682 0.422123 0.131837 0.471391 0.076263C0.512106 0.0303358 0.566429 0.00286475 0.628509 0.00033666Z" />
                </clipPath>
              </defs>
            </svg>

            <div 
              className="w-full h-full bg-[#e5e1da] overflow-hidden relative" 
              style={{ clipPath: "url(#blob-mask)", transform: "translateZ(0)" }}
            >
              <img
                ref={innerImageRef}
                src="/images/rajasthan.png"
                alt="Architectural Detail"
                className="w-full h-full object-cover brightness-[0.85] contrast-[1.15] origin-center"
              />
              <div 
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "radial-gradient(circle at center, transparent 20%, rgba(10, 8, 5, 0.7) 100%)",
                  boxShadow: "inset 0 0 100px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.15)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};