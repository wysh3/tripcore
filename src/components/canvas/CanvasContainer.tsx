"use client";

import { Canvas } from "@react-three/fiber";
import { BackgroundShader } from "./BackgroundShader";
import { PostProcessing } from "./PostProcessing";
import { Suspense } from "react";

export const CanvasContainer = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        gl={{ antialias: false, stencil: false, depth: false }}
      >
        <Suspense fallback={null}>
          <BackgroundShader />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
};
