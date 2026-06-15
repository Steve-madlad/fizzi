'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import BunchedCans from '@/public/bunched-cans.png';
import { useAppStore } from '@/store/appStore';
import { useGSAP } from '@gsap/react';
import { View } from '@react-three/drei';
import gsap from 'gsap';
import Image from 'next/image';
import { Container } from '../../Container';
import { TextSplitter } from '../../TextSplitter';
import { Bubbles } from '../../three/Bubbles';
import Scene from './Scene';
import { ScrollTrigger } from 'gsap/all';

export default function Hero() {
  const { isReady } = useAppStore();
  const isDesktop = useMediaQuery('(min-width: 768px)', true);

  useGSAP(() => {
    if (!isReady && isDesktop) return;

    const introTl = gsap.timeline();

    introTl
      .set('.hero', {
        opacity: 1,
      })
      .from('.hero-header-word', {
        scale: 3,
        opacity: 0,
        ease: 'power3.in',
        delay: 0.3,
        stagger: 0.5,
      })
      .from(
        '.hero-subheading',
        {
          opacity: 0,
          y: 30,
        },
        '+=.3',
      )
      .from('.hero-body', {
        opacity: 0,
        y: 10,
      })
      .from('.hero-button', {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    scrollTl
      .fromTo(
        'body',
        {
          backgroundColor: '#FDE047',
        },
        {
          backgroundColor: '#D9F99D',
          overflow: 'auto',
        },
        1,
      )
      .from('.text-side-heading .split-char', {
        scale: 1.3,
        rotate: -25,
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out(3)',
        duration: 0.5,
      })
      .from('.text-side-body', {
        opacity: 0,
        y: 20,
      });
  }, [isReady, isDesktop]);

  return (
    <Container className="hero opacity-0">
      {isDesktop && (
        <View className="hero-scene size-screen pointer-events-none sticky top-0 z-50 mt-[-100vh] hidden md:block">
          <Scene />
          <Bubbles count={100} speed={2} bubbleSize={0.12} opacity={0.5} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header 3xl:text-[13rem] text-7xl leading-[.8] font-black text-orange-500 uppercase md:text-[9rem]">
              <TextSplitter
                text="Live Gutsy"
                className="hero-header-word"
                wordDisplayStyle="block"
              />
            </h1>
            <h2 className="hero-subheading 3xl:text-6xl mt-12 text-5xl font-semibold text-sky-950">
              Soda Perfected
            </h2>
            <p className="hero-body 3xl:text-2xl text-xl font-normal text-sky-950">
              3-5g sugar, 9g fiber, 5 delicious flavors{' '}
            </p>
            <button className="hero-button cursor 3xl:text-2xl mt-12 rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-orange-700">
              Shop now
            </button>
          </div>
        </div>

        <div className="text-side relative z-80 grid h-screen items-center gap-4 md:grid-cols-2">
          <Image className="w-full md:hidden" src={BunchedCans} alt="Bunched Cans" />
          <div>
            <h2 className="text-side-heading text-6xl font-black text-balance text-sky-950 uppercase lg:text-8xl">
              <TextSplitter text="try all five flavours" />
            </h2>
            <p className="text-side-body mt-4 max-w-xl text-xl font-normal text-balance text-sky-950">
              Our soda is made with real fruit juice and a touch of cane sugar. We never use
              artificial sweeteners or high fructose corn syrup. Try all five flavors and find your
              favorite!
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
