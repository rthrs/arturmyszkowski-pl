"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveBackgroundProps {
  className?: string;
}

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.PlaneGeometry | null>(null);
  const [material, setMaterial] = useState<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    // Create geometry
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 64, 64);
    setGeometry(planeGeometry);

    // Create shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#3B82F6') }, // Blue
        uColor2: { value: new THREE.Color('#8B5CF6') }, // Purple
        uColor3: { value: new THREE.Color('#1E40AF') }, // Dark Blue
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Create wave pattern (subtle)
          float elevation = sin(modelPosition.x * 0.5 + uTime * 1.2) * 0.08;
          elevation += sin(modelPosition.y * 0.3 + uTime * 0.9) * 0.06;
          elevation += sin(modelPosition.x * 0.8 + modelPosition.y * 0.6 + uTime * 1.5) * 0.04;
          
          modelPosition.z = elevation;
          vElevation = elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          // Create flowing color pattern (subtle)
          vec3 color = mix(uColor1, uColor2, sin(vElevation * 8.0 + uTime * 1.2) * 0.25 + 0.35);
          color = mix(color, uColor3, sin(vUv.y * 2.0 + uTime * 0.6) * 0.15 + 0.15);
          color *= 0.8;
          
          // Subtle transparency
          float alpha = 0.12 + vElevation * 0.18;
          alpha = clamp(alpha, 0.08, 0.22);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
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
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, -8]} rotation={[-Math.PI / 2, 0, 0]} />
  );
}

function FlowingLines() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Flowing line 1 */}
      <mesh position={[0, 0, -6]}>
        <cylinderGeometry args={[0.003, 0.003, 15]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
      </mesh>
      
      {/* Flowing line 2 */}
      <mesh position={[0, 0, -7]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.003, 0.003, 12]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
      </mesh>
      
      {/* Flowing line 3 */}
      <mesh position={[0, 0, -5]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.003, 0.003, 18]} />
        <meshBasicMaterial color="#1E40AF" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function WaveBackground({ className = "" }: WaveBackgroundProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || hasError) {
    // Fallback gradient while loading or on error
    return (
      <div className={`absolute inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-blue-900/10" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]} // Limit pixel ratio for performance
          onError={() => setHasError(true)}
        >
          <ambientLight intensity={0.2} />
          <WaveMesh />
          <FlowingLines />
        </Canvas>
      </div>
    </div>
  );
}
