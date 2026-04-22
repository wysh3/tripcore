"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float noise = snoise(uv * 2.0 + uTime * 0.1 + uScroll * 0.5);
    float noise2 = snoise(uv * 4.0 - uTime * 0.05);
    float finalNoise = noise * 0.5 + noise2 * 0.25;
    float mixFactor = smoothstep(-1.0, 1.0, finalNoise + uScroll);
    vec3 color = mix(uColorA, uColorB, mixFactor);
    float dist = distance(uv, vec2(0.5));
    color *= 1.0 - dist * 0.2;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const BackgroundShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const lenis = useSmoothScroll();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color("#f5f2ed") },
      uColorB: { value: new THREE.Color("#5B8A9C") },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Use Lenis's internal scroll value for perfect frame-sync
      const currentScroll = lenis?.scroll || 0;
      const limit = lenis?.limit || 1;
      const progress = currentScroll / limit;
      
      // Interpolate the uniform to smooth out micro-jitters
      material.uniforms.uScroll.value = THREE.MathUtils.lerp(
        material.uniforms.uScroll.value,
        progress,
        0.1
      );
      
      // Dynamic color morphing
      const targetColor = progress > 0.8 ? "#1a1a2e" : "#5B8A9C";
      material.uniforms.uColorB.value.lerp(new THREE.Color(targetColor), 0.02);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};
