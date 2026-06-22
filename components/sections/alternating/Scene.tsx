'use client';

import FloatingCan from '@/components/three/Floating';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useGSAP } from '@gsap/react';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Group } from 'three';

export default function Scene() {
  const canRef = useRef<Group>(null);
  const bgColors = ['#FFA6B5', '#a79fff', '#CBEF9A'];

  const isDesktop = useMediaQuery('(min-width: 769px)', true);

  useGSAP(() => {
    if (!canRef.current) return;

    const sections = gsap.utils.toArray('.alternating-section');

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.alternating-can-view',
        endTrigger: '.alternating-text-container',
        pin: true,
        start: 'top top',
        end: `bottom ${'bottom' + (isDesktop ? '' : '-=190px')}`,
        scrub: true,
      },
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isTablet: '(min-width: 769px)',
        isBetween: '(min-width: 769px) and (max-width: 1023px)',
      },
      ({ conditions }) => {
        const { isTablet, isBetween, isDesktop } = conditions!;
        if (isBetween) {
          const tabletScale = 0.8;

          gsap.set(canRef.current!.scale, { x: tabletScale, y: tabletScale, z: tabletScale });
          gsap.set(canRef.current!.position, { x: 1 });
        }

        if (isDesktop) gsap.set(canRef.current!.position, { x: 1.5 });

        if (isTablet) {
          sections.forEach((_, index) => {
            if (!index || !canRef.current) return;

            const positionScale = isBetween ? 1 : 1.5;
            const positionX = index % 2 !== 0 ? -positionScale : positionScale;
            const rotationFactor = 1.8;
            const rotationY =
              index % 2 === 0 ? `+=${Math.PI * rotationFactor}` : `-=${Math.PI * rotationFactor}`;

            scrollTl
              .to(canRef.current.rotation, {
                y: rotationY,
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
        }
      },
    );

    // mm.add('(max-width: 1024px)', () => {
    //   const tabletScale = 0.8;

    //   gsap.set(canRef.current!.scale, { x: tabletScale, y: tabletScale, z: tabletScale });
    //   gsap.set(canRef.current!.position, { x: 1 });
    // });

    mm.add('(max-width: 768px)', () => {
      const mobileScale = 0.7;

      gsap.set(canRef.current!.scale, { x: mobileScale, y: mobileScale, z: mobileScale });
      gsap.set(canRef.current!.position, { x: 0, y: 0.4 });

      const continuousRotationY = `+=${Math.PI * 6}`;

      sections.forEach((_, index) => {
        if (!index) return;

        scrollTl.to('.alternating-text-container', {
          backgroundColor: bgColors[index],
        });
      });

      scrollTl.to(
        canRef.current!.rotation,
        {
          y: continuousRotationY,
          ease: 'none',
          duration: 1,
        },
        0,
      );
    });
  }, [isDesktop]);

  return (
    <group ref={canRef} rotation-y={-0.4}>
      <FloatingCan
        ref={canRef}
        flavor="strawberryLemonade"
        rotationIntensity={isDesktop ? 1 : 0.4}
      />
      <Environment files="hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
