"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { MagneticCursor } from "../ui/MagneticCursor";
import { TransitionProvider } from "./TransitionProvider";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SmoothScrollProvider>
        <MagneticCursor />
        <div className="relative z-10">
          {children}
        </div>
      </SmoothScrollProvider>
    </SessionProvider>
  );
};
