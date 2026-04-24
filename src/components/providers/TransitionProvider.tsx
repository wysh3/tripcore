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
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3, 
          ease: "easeOut",
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
