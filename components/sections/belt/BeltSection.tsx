'use client';

import { WaveDivider } from '@/components/svg/WavyDivider';
import FloatingCan from '@/components/three/Floating';
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import { Environment, View } from '@react-three/drei';
import gsap from 'gsap';
import { useRef } from 'react';
import { Group } from 'three';

function RotatingCan({ canRef }: { canRef: React.RefObject<Group | null> }) {
  useGSAP(() => {
    if (!canRef.current) return;

    gsap.to(canRef.current.rotation, {
      y: `+=${Math.PI * 2}`,
      duration: 4,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <group ref={canRef}>
      <FloatingCan flavor="blackCherry" />
      <Environment files={'/hdr/lobby.hdr'} environmentIntensity={1.5} />
    </group>
  );
}

export default function BeltSection() {
  const topTrack = useRef<HTMLDivElement>(null);
  const bottomTrack = useRef<HTMLDivElement>(null);

  const canRef = useRef<Group>(null);

  const isMobile = useMediaQuery({query: '(max-width: 768px)'});

  useGSAP(() => {
    const top = topTrack.current;
    const bottom = bottomTrack.current;

    if (!top || !bottom) return;

    gsap.to(top, {
      xPercent: -25,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    gsap.set(bottom, {
      xPercent: -45,
    });

    gsap.to(bottom, {
      xPercent: 0,
      duration: isMobile ? 40 : 18,
      ease: 'none',
      repeat: -1,
    });

    gsap.to('.belt', {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2,
    });

    gsap.to('.circles', {
      y: -10,
      duration: 4,
      stagger: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, [isMobile]);

  const topItems = Array(24).fill('LIVE GUTSY ✦ REAL FRUIT ✦ PROBIOTIC SODA ✦ LOW SUGAR ✦');
  const bottomItems = Array(24).fill('BOLD FLAVOR ✦ HAPPY GUT ✦ NATURAL INGREDIENTS ✦');

  return (
    <>
      <div className="bg-[#CBEF9A]">
        <WaveDivider animate={false} className="belt-wave-divider h-15 md:h-45" fill='#FDE047' />
      </div>
      <section className="relative h-[105vh] overflow-hidden bg-[#FDE047]">
        <div className="pointer-events-none absolute top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] leading-none font-black tracking-[-0.08em] whitespace-nowrap text-[#8C0413]/10 select-none sm:text-[28vw] lg:top-[30%] lg:text-[30vw]">
          FIZZI
        </div>

        <div className="circles absolute top-[15%] left-[8%] h-24 w-24 rounded-full border-12 border-[#18243D]/10" />

        <div className="circles absolute right-[10%] bottom-[12%] h-40 w-40 rounded-full border-16 border-[#18243D]/10" />

        <div className="belt absolute top-[29%] left-[-25vw] z-10 h-18 w-[150vw] rotate-[8deg] overflow-hidden border-y-4 border-[#FFF8E7]/20 bg-[#ff4a68] shadow-[0_20px_40px_rgba(0,0,0,0.15)] lg:top-[34%] lg:h-24">
          <div ref={topTrack} className="flex h-full w-max items-center">
            {topItems.map((item, i) => (
              <span
                key={i}
                className="shrink-0 px-8 text-2xl font-black tracking-[0.25em] text-[#FFF8E7] uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="belt absolute z-20 top-[53%] left-[-25vw] h-18 w-[150vw] -rotate-12 overflow-hidden border-y-4 border-[#FFF8E7]/20 bg-[#52b717] shadow-[0_20px_40px_rgba(0,0,0,0.15)] lg:top-[58%] lg:h-28">
          <div ref={bottomTrack} className="flex h-full w-max items-center">
            {bottomItems.map((item, i) => (
              <span
                key={i}
                className="shrink-0 px-8 text-3xl font-black tracking-[0.25em] text-[#FFF8E7] uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute right-1/2 bottom-10 flex translate-x-1/2 md:-bottom-50 md:translate-x-3/5 lg:-right-50 lg:translate-x-0">
          <div className="mt-4 w-[80vw] text-center sm:w-auto">
            <h2 className="text-4xl font-black tracking-tight text-[#ff3456] uppercase md:text-5xl">
              Live Gutsy
            </h2>

            <p className="mt-4 text-lg font-medium text-[#ff3456]/80 md:text-xl lg:max-w-sm lg:px-6">
              Real fruit. Low sugar. Probiotic soda with bold flavor and a happier gut.
            </p>
          </div>

          <View className="hidden size-100 -translate-x-10 -translate-y-30 md:block lg:-translate-x-30">
            <RotatingCan canRef={canRef} />
          </View>
        </div>
      </section>
    </>
  );
}
