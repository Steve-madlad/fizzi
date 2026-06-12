'use client';

import { useAppStore } from '@/store/appStore';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const o = new THREE.Object3D();

export function Bubbles({
  count = 300,
  speed = 5,
  bubbleSize = 0.05,
  opacity = 0.6,
  repeat = true,
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Connect to your Zustand store
  const isReady = useAppStore((state) => state.isReady);
  console.log({isReady});
  

  const bubbleSpeed = useRef(new Float32Array(count));
  const bubbleOffsets = useRef(new Float32Array(count));
  const wobbleSpeeds = useRef(new Float32Array(count));

  const minSpeed = speed * 0.001;
  const maxSpeed = speed * 0.005;

  const wind = useRef({ target: 0, current: 0 });
  const geometry = useMemo(() => new THREE.SphereGeometry(bubbleSize, 32, 32), [bubbleSize]);

  // Handle initialization and window scroll events
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
      bubbleOffsets.current[i] = gsap.utils.random(0, 100);
      wobbleSpeeds.current[i] = gsap.utils.random(5, 12);
      
      // Initial state before ready: park them completely scale-0 or hidden out of view
      o.position.set(0, -10, 0); 
      o.scale.set(0, 0, 0);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      wind.current.target = THREE.MathUtils.clamp(deltaY * 0.03, -1.5, 1.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      geometry.dispose();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [count, minSpeed, maxSpeed, geometry]);

  // Effect: When isReady flips to true, reset all bubble positions to the bottom floor
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || !isReady) return;

    for (let i = 0; i < count; i++) {
      // Start them spread across X and Z, but anchored at the bottom (Y = -4)
      o.position.set(
        gsap.utils.random(-4, 4), 
        gsap.utils.random(-4, -3.5), // Gives a slight staggered entry right at the floor
        gsap.utils.random(-4, 4)
      );

      o.scale.set(1, 1, 1);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [isReady, count]);

  useFrame((state) => {
    // 1. EARLY RETURN: If not ready, freeze the loop execution entirely
    if (!meshRef.current || !isReady) return;

    const elapsedTime = state.clock.getElapsedTime();

    wind.current.current = THREE.MathUtils.lerp(wind.current.current, wind.current.target, 0.1);
    wind.current.target = THREE.MathUtils.lerp(wind.current.target, 0, 0.05);

    const baseWobbleFactor = Math.abs(wind.current.current) * 0.15;

    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, o.matrix);
      o.position.setFromMatrixPosition(o.matrix);

      o.position.y += bubbleSpeed.current[i];
      o.position.x += wind.current.current * (bubbleSpeed.current[i] * 5);

      const offset = bubbleOffsets.current[i];
      o.position.x += Math.sin(elapsedTime * 1.5 + offset) * 0.003;
      o.position.z += Math.cos(elapsedTime * 1.2 + offset) * 0.003;

      if (baseWobbleFactor > 0.001) {
        const wobbleTime = elapsedTime * wobbleSpeeds.current[i] + offset;
        const individualWobble = baseWobbleFactor * (bubbleSpeed.current[i] * 250);

        o.scale.x = 1 + Math.sin(wobbleTime * 1.5) * individualWobble;
        o.scale.y = 1 + Math.cos(wobbleTime) * individualWobble;
        o.scale.z = 1 + Math.sin(wobbleTime * 0.8) * individualWobble;
      } else {
        o.scale.set(1, 1, 1);
      }

      // Recycle boundaries
      if (o.position.y > 4 && repeat) {
        o.position.y = -4;
        o.position.x = gsap.utils.random(-4, 4);
        o.position.z = gsap.utils.random(-4, 4);
      }

      if (o.position.x > 5) o.position.x = -5;
      if (o.position.x < -5) o.position.x = 5;

      o.updateMatrix();
      meshRef.current.setMatrixAt(i, o.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, null as any, count]} position={[0, 0, 0]}>
      <meshPhysicalMaterial
        transparent
        opacity={opacity}
        roughness={0.05}
        metalness={0.1}
        transmission={0.7}
        ior={1.333}
        thickness={0.2}
        clearcoat={1.0}
        clearcoatRoughness={0.0}
        iridescence={1.0}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[100, 400]}
        color="#cdcdcd"
      />
    </instancedMesh>
  );
}