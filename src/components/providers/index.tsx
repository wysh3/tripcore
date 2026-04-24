"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { CanvasContainer } from "../canvas/CanvasContainer";
import { MagneticCursor } from "../ui/MagneticCursor";
import { TransitionProvider } from "./TransitionProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SmoothScrollProvider>
      <CanvasContainer />
      <MagneticCursor />
      <div className="relative z-10">
        {children}
      </div>
    </SmoothScrollProvider>
  );
};
