"use client";

import { EffectComposer, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export const PostProcessing = () => {
  return (
    <EffectComposer>
      <Noise 
        opacity={0.03} 
        premultiply 
        blendFunction={BlendFunction.OVERLAY} 
      />
      <ChromaticAberration
        offset={[0.0015, 0.0015] as any}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};
