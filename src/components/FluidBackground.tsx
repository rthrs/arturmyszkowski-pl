"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

interface FluidBackgroundProps {
  className?: string;
}

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.PlaneGeometry | null>(null);
  const [material, setMaterial] = useState<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    // Create much larger geometry to cover full hero section
    const planeGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
    setGeometry(planeGeometry);

    // Create fluid shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#007AFF') }, // Apple Blue
        uColor2: { value: new THREE.Color('#AF52DE') }, // Apple Purple
        uColor3: { value: new THREE.Color('#FF3B30') }, // Apple Red
        uColor4: { value: new THREE.Color('#FF9500') }, // Apple Orange
        uColor5: { value: new THREE.Color('#30D158') }, // Apple Green
        uColor6: { value: new THREE.Color('#64D2FF') }, // Apple Cyan
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        varying vec2 vUv;
        
        // Liquid-like gradient function - slowed down
        float liquidGradient(vec2 uv, vec2 center, float radius, float time) {
          vec2 dist = uv - center;
          float wave = sin(length(dist) * 8.0 - time * 0.8) * 0.5 + 0.5;
          float falloff = 1.0 - smoothstep(0.0, radius, length(dist));
          return wave * falloff;
        }
        
        // Smooth liquid flow - slowed down
        vec2 liquidFlow(vec2 uv, float time) {
          return vec2(
            sin(uv.y * 2.0 + time * 0.3) * 0.08,
            cos(uv.x * 2.0 + time * 0.2) * 0.08
          );
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Create liquid-like flowing centers concentrated in center area for smooth blending
          vec2 center1 = vec2(0.4, 0.4) + liquidFlow(uv, uTime * 0.2);
          vec2 center2 = vec2(0.6, 0.6) + liquidFlow(uv, uTime * 0.25);
          vec2 center3 = vec2(0.5, 0.3) + liquidFlow(uv, uTime * 0.15);
          vec2 center4 = vec2(0.3, 0.7) + liquidFlow(uv, uTime * 0.3);
          vec2 center5 = vec2(0.7, 0.3) + liquidFlow(uv, uTime * 0.22);
          vec2 center6 = vec2(0.45, 0.75) + liquidFlow(uv, uTime * 0.18);
          vec2 center7 = vec2(0.65, 0.45) + liquidFlow(uv, uTime * 0.28);
          vec2 center8 = vec2(0.35, 0.55) + liquidFlow(uv, uTime * 0.24);
          
          // Create liquid gradient blobs - slowed down
          float liquid1 = liquidGradient(uv, center1, 0.35, uTime * 0.4);
          float liquid2 = liquidGradient(uv, center2, 0.32, uTime * 0.5);
          float liquid3 = liquidGradient(uv, center3, 0.28, uTime * 0.3);
          float liquid4 = liquidGradient(uv, center4, 0.25, uTime * 0.6);
          float liquid5 = liquidGradient(uv, center5, 0.26, uTime * 0.35);
          float liquid6 = liquidGradient(uv, center6, 0.3, uTime * 0.45);
          float liquid7 = liquidGradient(uv, center7, 0.27, uTime * 0.38);
          float liquid8 = liquidGradient(uv, center8, 0.29, uTime * 0.42);
          
          // Blend liquid gradients smoothly
          float totalLiquid = liquid1 + liquid2 * 0.8 + liquid3 * 0.6 + liquid4 * 0.7 + liquid5 * 0.9 + liquid6 * 0.75 + liquid7 * 0.85 + liquid8 * 0.65;
          totalLiquid = smoothstep(0.0, 1.0, totalLiquid);
          
          // Create liquid color mixing with more colors
          vec3 color1 = mix(uColor1, uColor2, liquid1);
          vec3 color2 = mix(uColor3, uColor4, liquid2);
          vec3 color3 = mix(uColor5, uColor6, liquid3);
          vec3 color4 = mix(uColor1, uColor3, liquid4);
          vec3 color5 = mix(uColor2, uColor5, liquid5);
          vec3 color6 = mix(uColor4, uColor6, liquid6);
          vec3 color7 = mix(uColor1, uColor5, liquid7);
          vec3 color8 = mix(uColor3, uColor6, liquid8);
          
          // Blend colors based on liquid intensity
          vec3 finalColor = mix(color1, color2, liquid2);
          finalColor = mix(finalColor, color3, liquid3 * 0.6);
          finalColor = mix(finalColor, color4, liquid4 * 0.4);
          finalColor = mix(finalColor, color5, liquid5 * 0.5);
          finalColor = mix(finalColor, color6, liquid6 * 0.45);
          finalColor = mix(finalColor, color7, liquid7 * 0.35);
          finalColor = mix(finalColor, color8, liquid8 * 0.3);
          
          // Add liquid-like glow and smoothness
          float glow = sin(totalLiquid * 3.14159) * 0.3 + 0.7;
          finalColor *= glow;
          
          // Create smooth fade-out towards edges for background blending
          float centerDistance = length(uv - vec2(0.5, 0.5));
          float fadeOut = 1.0 - smoothstep(0.3, 0.8, centerDistance);
          
          // Liquid-like opacity with smooth transitions and edge fading
          float alpha = (totalLiquid * 0.15 + 0.05) * fadeOut;
          alpha = clamp(alpha, 0.0, 0.25);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    
    setMaterial(shaderMaterial);
  }, []);

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  if (!geometry || !material) {
    return null;
  }

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, -8]} />
  );
}

export default function FluidBackground({ className = "" }: FluidBackgroundProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || hasError) {
    // Fallback gradient while loading or on error
    return (
      <div className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-orange-500/6" />
      </div>
    );
  }

  return (
    <div className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}>
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]} // Limit pixel ratio for performance
          onError={() => setHasError(true)}
        >
          <FluidPlane />
        </Canvas>
      </div>
      {/* Subtle gradient overlay for smooth blending with background */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-transparent pointer-events-none" 
           style={{
             background: 'radial-gradient(ellipse at center, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)'
           }} />
    </div>
  );
}
