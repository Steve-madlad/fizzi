'use client';

import FloatingCan from '@/components/three/Floating';
import { SodaCanProps } from '@/components/three/SodaCan';
import { useGSAP } from '@gsap/react';
import { Environment, View } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Group } from 'three';
import { FizziLogo } from './svg/FizziLogo';
import { WaveDivider } from './svg/WavyDivider';

gsap.registerPlugin(ScrollTrigger);

const FLAVORS = [
  { flavor: 'blackCherry', emoji: '🍒', name: 'Black Cherry' },
  { flavor: 'grape', emoji: '🍇', name: 'Grape Goodness' },
  { flavor: 'lemonLime', emoji: '🍋', name: 'Lemon Lime' },
  { flavor: 'strawberryLemonade', emoji: '🍓', name: 'Strawberry Lemonade' },
  { flavor: 'watermelon', emoji: '🍉', name: 'Watermelon Crush' },
] as const;

type FooterCanLayout = {
  flavor: SodaCanProps['flavor'];
  x: number;
  y: number;
  scale?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
};

const FOOTER_CANS: FooterCanLayout[] = [
  { flavor: 'blackCherry', x: -2.4, y: 0.2, floatIntensity: 1.5, rotationIntensity: 1.5 },
  { flavor: 'grape', x: -0.9, y: 0.55, scale: 0.95, floatIntensity: 1.2, rotationIntensity: 1 },
  { flavor: 'lemonLime', x: 0.9, y: 0.55, scale: 0.95, floatIntensity: 1.2, rotationIntensity: 1 },
  { flavor: 'watermelon', x: 2.4, y: 0.2, floatIntensity: 1.5, rotationIntensity: 1.5 },
];

const RESTING_SCALE = 0.8;

function FooterCansScene({ triggerRef }: { triggerRef: React.RefObject<HTMLElement | null> }) {
  const can1 = useRef<Group>(null);
  const can2 = useRef<Group>(null);
  const can3 = useRef<Group>(null);
  const can4 = useRef<Group>(null);
  const cans = [can1, can2, can3, can4];

  useGSAP(() => {
    if (!triggerRef.current || cans.some((ref) => !ref.current)) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 1.5,
      },
    });

    cans.forEach((ref, index) => {
      const { x, y } = FOOTER_CANS[index];

      tl.fromTo(
        ref.current!.position,
        { x, y: y - 1.5, z: 3 },
        { x, y, z: 0, duration: 1, ease: 'power2.out' },
        0,
      )
        .fromTo(
          ref.current!.rotation,
          { y: 0, x: -1 },
          { y: Math.PI * 6, x: 0, duration: 1, ease: 'power2.out' },
          0,
        )
        .fromTo(
          ref.current!.scale,
          { x: 1.15, y: 1.15, z: 1.15 },
          { x: RESTING_SCALE, y: RESTING_SCALE, z: RESTING_SCALE, duration: 1, ease: 'power2.out' },
          0,
        );
    });
  });

  return (
    <>
      {FOOTER_CANS.map((can, index) => (
        <group key={can.flavor} ref={cans[index]} position={[can.x, can.y, 0]}>
          <FloatingCan
            flavor={can.flavor}
            scale={can.scale}
            floatIntensity={can.floatIntensity}
            rotationIntensity={can.rotationIntensity}
          />
        </group>
      ))}
      <ambientLight intensity={1.5} color="#9DDEFA" />
      <directionalLight position={[2, 4, 3]} intensity={1.5} />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.2} />
    </>
  );
}

function FooterCans({ triggerRef }: { triggerRef: React.RefObject<HTMLElement | null> }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[400px] lg:block">
      <View className="absolute inset-0 h-full w-full">
        <FooterCansScene triggerRef={triggerRef} />
      </View>
    </div>
  );
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('.footer-bubble', {
        y: -50,
        duration: () => gsap.utils.random(4, 8),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.15,
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <div className="flip-x bg-[#FDE047]">
        <WaveDivider animate={false} className="belt-wave-divider h-15 md:h-45" fill="#8C0413" />
      </div>
      <footer ref={containerRef} className="relative overflow-hidden bg-[#8C0413] text-white">
        {/* Giant background word */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[30vw] font-black tracking-[-0.08em] text-white/5 select-none">
          FIZZI
        </div>

        {/* Bubbles */}
        <div className="footer-bubble absolute top-[20%] left-[10%] size-10 rounded-full bg-white/10" />
        <div className="footer-bubble absolute top-[65%] left-[20%] size-20 rounded-full bg-white/10" />
        <div className="footer-bubble absolute top-[30%] right-[10%] size-16 rounded-full bg-white/10" />
        <div className="footer-bubble absolute top-[75%] right-[25%] size-8 rounded-full bg-white/15" />
        <div className="footer-bubble absolute top-[15%] left-[60%] size-12 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
          {/* Rendered Modular 3D Layer */}
          <FooterCans triggerRef={containerRef} />

          {/* Hero Content Area */}
          <div className="relative z-10 mt-12 flex flex-col items-center text-center">
            <FizziLogo className="h-24 text-[#FDE047]" />

            <h2 className="mt-8 max-w-4xl text-5xl font-black uppercase md:text-7xl">
              Stay Gutsy.
            </h2>

            <p className="mt-6 max-w-2xl text-xl text-white/80">
              Real fruit. Low sugar. Gut-friendly soda that actually tastes amazing.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="rounded-full bg-[#FDE047] px-8 py-4 font-black text-[#8C0413] transition-transform hover:scale-105">
                SHOP NOW
              </button>

              <button className="rounded-full border-2 border-white/30 px-8 py-4 font-black transition-transform hover:scale-105">
                EXPLORE FLAVORS
              </button>
            </div>
          </div>

          {/* Flavor Ticker */}
          <div className="mt-32 w-full overflow-hidden select-none">
            {/* The wrapper container */}
            <div className="animate-convey-fw flex w-max">
              {/* Track 1 */}
              <div className="flex shrink-0 items-center">
                {FLAVORS.map((item, index) => (
                  <div
                    key={`track1-${index}`}
                    className="mx-4 flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur"
                  >
                    <span className="text-xl leading-none">{item.emoji}</span>
                    <span className="text-sm font-bold tracking-wide uppercase">{item.name}</span>
                  </div>
                ))}
              </div>

              {/* Track 2 (Exact Duplicate for Seamless Loop) */}
              <div className="flex shrink-0 items-center">
                {FLAVORS.map((item, index) => (
                  <div
                    key={`track2-${index}`}
                    className="mx-4 flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur"
                  >
                    <span className="text-xl leading-none">{item.emoji}</span>
                    <span className="text-sm font-bold tracking-wide uppercase">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation & Footer Links */}
          <div className="align-center mt-24 flex-wrap justify-between gap-12 border-t border-white/10 pt-12">
            <div>
              <h3 className="text-sm font-black tracking-wider uppercase">Products</h3>
              <ul className="mt-4 space-y-2 text-sm font-medium text-white/70">
                <li className="cursor-pointer transition-colors hover:text-white">All Flavors</li>
                <li className="cursor-pointer transition-colors hover:text-white">Variety Packs</li>
                <li className="cursor-pointer transition-colors hover:text-white">Subscriptions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2 text-sm font-medium text-white/70">
                <li className="cursor-pointer transition-colors hover:text-white">About</li>
                <li className="cursor-pointer transition-colors hover:text-white">Our Story</li>
                <li className="cursor-pointer transition-colors hover:text-white">Careers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black tracking-wider uppercase">Social</h3>
              <ul className="mt-4 space-y-2 text-sm font-medium text-white/70">
                <li className="cursor-pointer transition-colors hover:text-white">Instagram</li>
                <li className="cursor-pointer transition-colors hover:text-white">TikTok</li>
                <li className="cursor-pointer transition-colors hover:text-white">YouTube</li>
              </ul>
            </div>

            <div className="w-full sm:w-auto">
              <h3 className="text-sm font-black tracking-wider uppercase">Stay Gutsy</h3>
              <p className="mt-2 text-sm text-white/70">Subscribe to our newsletter</p>
              <div className="relative mt-4 flex w-full rounded-full bg-white p-1 shadow-sm sm:min-w-60">
                <input
                  placeholder="Email address"
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-black outline-none"
                />
                <button className="abs-y-center right-1 rounded-full bg-[#FDE047] px-5 py-2 text-sm font-black text-[#8C0413] transition-colors hover:bg-[#ebd03b]">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center text-base tracking-wide text-white/40">
            <p>Copyright © 2023 Fizzi, Inc. All rights reserved.</p>
            <p>Stay Gutsy.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
