'use client';

import FloatingCan from '@/components/three/Floating';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useGSAP } from '@gsap/react';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import { Group } from 'three';

export default function Scene() {
  const canRef = useRef<Group>(null);
  const bgColors = ['#FFA6B5', '#cff6e9', '#CBEF9A'];

  const isDesktop = useMediaQuery('(min-width: 768px)', true);

  useGSAP(() => {
    if (!canRef.current) return;

    const sections = gsap.utils.toArray('.alternating-section');

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.alternating-can-view',
        endTrigger: '.alternating-text-container',
        pin: true,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    sections.forEach((_, index) => {
      if (!canRef.current || !index) return;

      const positionX = isDesktop ? index % 2 !== 0 ? -1.5 : 1.5 : 0;
      scrollTl
        .to(canRef.current.rotation, {
          y: index % 2 !== 0 ? `-=${Math.PI * 1.8}` : `+=${Math.PI * 1.8}`,
          ease: 'circ.inOut',
        })
        .to(
          canRef.current.position,
          {
            x: positionX,
            ease: 'circ.inOut',
          },
          '<',
        )
        .to(
          '.alternating-text-container',
          {
            backgroundColor: bgColors[index],
          },
          '<',
        );
    });
  }, [isDesktop]);

  return (
    <group ref={canRef} position-x={isDesktop ? 1.5 : 0} rotation-y={-0.4}>
      <FloatingCan ref={canRef} flavor="strawberryLemonade" />
      <Environment files="hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
