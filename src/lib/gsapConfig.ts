import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Check if we are in a browser environment
if (typeof window !== "undefined") {
  // Register ScrollTrigger and useGSAP
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Disable lag smoothing to prevent easing conflicts with smooth scrolling
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger };
