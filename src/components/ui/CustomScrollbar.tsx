"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const CustomScrollbar = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  // Spring for smoother movement
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show if mouse is within 40px of the right edge
      if (window.innerWidth - e.clientX < 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 w-10 z-[9999] pointer-events-none flex justify-center py-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-1.5 h-full bg-black/5 rounded-full overflow-hidden"
      >
        <motion.div
          style={{ 
            scaleY,
            transformOrigin: "top"
          }}
          className="absolute inset-x-0 top-0 h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        />
      </motion.div>
    </div>
  );
};
