"use client";

import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

const o = new THREE.Object3D();

export function Bubbles({
  count = 300,
  speed = 5,
  bubbleSize = 0.05,
  opacity = 0.6,
  repeat = true,
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const bubbleSpeed = useRef(new Float32Array(count));
  const bubbleOffsets = useRef(new Float32Array(count)); 
  const wobbleSpeeds = useRef(new Float32Array(count));  

  const minSpeed = speed * 0.001;
  const maxSpeed = speed * 0.005;

  // Track scroll-induced wind velocity via GSAP
  const windEffect = useRef({ velocity: 0 });

  const geometry = useMemo(() => new THREE.SphereGeometry(bubbleSize, 32, 32), [bubbleSize]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      o.position.set(
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4)
      );

      o.scale.set(1, 1, 1);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);

      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
      bubbleOffsets.current[i] = gsap.utils.random(0, 100); 
      wobbleSpeeds.current[i] = gsap.utils.random(5, 12); // Slightly faster wobble frequency looks better under pressure
    }

    mesh.instanceMatrix.needsUpdate = true;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Map scroll speed to a wind factor
      const targetWind = gsap.utils.clamp(-1.5, 1.5, deltaY * 0.03);

      // Instantly catch the wind, then smoothly ease it back down to 0
      gsap.to(windEffect.current, {
        velocity: targetWind,
        duration: 0.05,
        overwrite: "auto",
        onComplete: () => {
          gsap.to(windEffect.current, {
            velocity: 0,
            duration: 1.2, // Slightly longer duration gives the wobble time to die down organically
            ease: "power2.out",
          });
        },
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      geometry.dispose();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count, minSpeed, maxSpeed, geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsedTime = state.clock.getElapsedTime();
    
    // Calculate the dynamic wobble intensity based on current scroll velocity.
    // Using Math.abs ensures it deforms regardless of scrolling up or down.
    const baseWobbleFactor = Math.abs(windEffect.current.velocity) * 0.15;

    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, o.matrix);
      o.position.setFromMatrixPosition(o.matrix);

      // 1. Vertical Rise + Wind Gust Side Push
      o.position.y += bubbleSpeed.current[i];
      o.position.x += windEffect.current.velocity * (bubbleSpeed.current[i] * 5);

      // 2. Natural Drifting (Subtle organic sway)
      const offset = bubbleOffsets.current[i];
      o.position.x += Math.sin(elapsedTime * 1.5 + offset) * 0.003;
      o.position.z += Math.cos(elapsedTime * 1.2 + offset) * 0.003;

      // 3. Scroll-Only Wobble Effect
      if (baseWobbleFactor > 0.001) {
        const wobbleTime = elapsedTime * wobbleSpeeds.current[i] + offset;
        
        // Give larger individual speeds a slightly higher distortion capacity
        const individualWobble = baseWobbleFactor * (bubbleSpeed.current[i] * 250);

        o.scale.x = 1 + Math.sin(wobbleTime) * individualWobble;
        o.scale.y = 1 + Math.cos(wobbleTime * 1.5) * individualWobble;
        o.scale.z = 1 + Math.sin(wobbleTime * 0.8) * individualWobble;
      } else {
        // Fallback to absolute uniform scale when resting
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
    <instancedMesh
      ref={meshRef}
      args={[geometry, null as any, count]}
      position={[0, 0, 0]}
    >
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