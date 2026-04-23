"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const lenis = useSmoothScroll();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
      return;
    }

    // When route changes, scroll to top immediately via Lenis for smoothness
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis, isFirstMount]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.32, 0.72, 0, 1], // Custom cinematic easing
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
