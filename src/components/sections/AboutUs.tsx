"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the image
      gsap.to(imageRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text fade-up
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
    <section ref={sectionRef} className="py-60 px-6 bg-[#f5f2ed] overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div ref={textRef} className="space-y-12 order-2 lg:order-1">
          <h2 className="text-[10vw] lg:text-[8vw] font-serif leading-[0.9] tracking-tighter text-black/90">
            ABOUT US
          </h2>
          
          <div className="space-y-8 max-w-md">
            <p className="text-sm font-jost text-black/60 leading-relaxed uppercase tracking-widest">
              Lorem ipsum dolor sit amet, consect <br />
              duispeee que-saessmetat <br />
              euismod amper sssuisi.antfla <br />
              edlamnoom stai oenvel dbi rvilterssac <br />
              asese lass al sar cermoess.
            </p>
            <p className="text-sm font-jost text-black/60 leading-relaxed uppercase tracking-widest">
              Balnao-sem excet socila flrar- dinia <br />
              exceterne meda examadation abiass <br />
              anucatlat ii ouftaen.
            </p>
            <p className="text-sm font-jost text-black/60 leading-relaxed uppercase tracking-widest">
              Saooou ecrentas mitsaamim riakra <br />
              tobiaocsa sa iia paitaa sul tu suss deta <br />
              cenlaala.
            </p>
          </div>
        </div>

        <div 
          ref={imageRef} 
          className="relative aspect-square order-1 lg:order-2"
          style={{
            clipPath: "path('M444.5,232.5C444.5,335.5,361,419,258,419C155,419,71.5,335.5,71.5,232.5C71.5,129.5,155,46,258,46C361,46,444.5,129.5,444.5,232.5Z')",
            transform: "scale(1.2)"
          }}
        >
          {/* Custom SVG mask for organic shape as seen in UI */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            <defs>
              <clipPath id="blob">
                <path d="M418.5,250C418.5,343.1,343.1,418.5,250,418.5C156.9,418.5,81.5,343.1,81.5,250C81.5,156.9,156.9,81.5,250,81.5C343.1,81.5,418.5,156.9,418.5,250Z" />
              </clipPath>
            </defs>
          </svg>
          <div className="w-full h-full bg-[#e5e1da] overflow-hidden" style={{ clipPath: "url(#blob)" }}>
            <img
              src="/images/rajasthan.png"
              alt="Architectural Detail"
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
